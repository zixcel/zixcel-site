import copy
import hashlib
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch
from site_release import select, pack, unpack, admit, deploy, verify_assets
from subprocess import CompletedProcess


class SiteReleaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'site.json').write_text('{"origin":"https://example.org"}')
        self.site = {'id':'example','version':'0.1.0','account':'a'*32,'zone':'c'*32,'worker':'example-site',
            'environment':'site-production-example','origin':'https://example.org','domain':'example.org',
            'siteConfig':'site.json','appDirectory':'.','assetDirectory':'public','documentDirectory':'site','buildKind':'single'}
        self.contract = {'schemaVersion':1,'repository':'example/site','defaultBranch':'main',
                         'requiredWorkflows':['ci.yml'],'sites':[self.site]}
        self.env = {'GITHUB_SHA':'b'*40,'GITHUB_REPOSITORY':'example/site','GITHUB_REF_TYPE':'tag'}

    def test_exact_site_version_and_owned_origin(self):
        self.assertEqual(select(self.root,self.contract,'site/example/v0.1.0'),self.site)
        for tag in ['v0.1.0','site/other/v0.1.0','site/example/v0.2.0']:
            with self.assertRaises(ValueError): select(self.root,self.contract,tag)
        (self.root / 'site.json').write_text('{"origin":"https://other.example"}')
        with self.assertRaises(ValueError):select(self.root,self.contract,'site/example/v0.1.0')

    def test_output_traversal_symlink_and_environment_output_injection_rejected(self):
        for key,value in [('assetDirectory','../public'),('appDirectory','./\nother=bad'),('environment','site-production-x\nother=bad')]:
            contract=copy.deepcopy(self.contract);contract['sites'][0][key]=value
            with self.assertRaises(ValueError):select(self.root,contract,'site/example/v0.1.0')
        (self.root/'public').mkdir();(self.root/'public/index.html').symlink_to(self.root/'site.json')
        with self.assertRaises(ValueError):pack(self.root,self.site,'b'*40,self.root/'archive')

    def prepare(self):
        (self.root/'public').mkdir();(self.root/'public/index.html').write_text('<h1>Approved</h1>')
        with patch('site_release.build_worker', return_value={'source':'export default {fetch(){return new Response("fixture")}}', 'origin':'https://example.org','routes':['/']}):
            digest=pack(self.root,self.site,'b'*40,self.root/'archive')
        return self.root/'archive/site.tgz',digest

    def test_archive_binds_all_asset_bytes_to_immutable_source_and_target(self):
        archive,digest=self.prepare();receipt=unpack(archive,digest,self.root/'verified')
        self.assertEqual(receipt['source'],'b'*40);self.assertEqual(receipt['site'],self.site)
        self.assertIn('.well-known/release.json',receipt['files'])
        self.assertEqual(receipt['worker']['routes'], ['/'])
        self.assertEqual(receipt['worker']['sha256'], hashlib.sha256((self.root/'verified/worker.mjs').read_bytes()).hexdigest())
        with self.assertRaises(ValueError):unpack(archive,'c'*64,self.root/'bad')
        with self.assertRaises(ValueError):unpack(archive,digest,self.root/'verified')

    def test_archive_links_and_traversal_rejected_before_extraction(self):
        for name in ['../outside','assets/../../outside','/outside']:
            archive=self.root/'bad.tgz'
            with tarfile.open(archive,'w:gz') as out:
                info=tarfile.TarInfo(name);info.size=1;out.addfile(info,io.BytesIO(b'x'))
            digest=hashlib.sha256(archive.read_bytes()).hexdigest()
            with self.assertRaises(ValueError):unpack(archive,digest,self.root/'never-created')
            self.assertFalse((self.root/'never-created').exists())

    def test_source_admission_rejects_foreign_owner_before_git_or_network(self):
        with patch('site_release.subprocess.run') as run,patch('site_release.request') as request:
            with self.assertRaises(ValueError):admit(self.root,self.contract,{**self.env,'GITHUB_REPOSITORY':'fork/site'})
            run.assert_not_called();request.assert_not_called()

    def test_unprotected_environment_cannot_reach_cloudflare_or_deployment(self):
        _,digest=self.prepare()
        with patch.dict('os.environ',{**self.env,'GH_TOKEN':'synthetic-test-token'}),patch('site_release.request',return_value={'protection_rules':[]}) as request,patch('site_release.subprocess.run') as run:
            with self.assertRaises(ValueError):deploy(self.root,self.contract,self.site,self.root/'archive',digest)
            self.assertEqual(request.call_count,1);run.assert_not_called()

    def provider(self, already):
        def response(url, token=None):
            if '/environments/' in url:
                return {'protection_rules':[{'type':'required_reviewers','reviewers':[{'id':1}]}]}
            if url.endswith('/zones/'+'c'*32):
                return {'success':True,'result':{'name':'example.org','account':{'id':'a'*32},'status':'active'}}
            if '/dns_records?' in url:
                return {'success':True,'result':[],'result_info':{'total_pages':1}}
            if url.endswith('/domains'):
                return {'success':True,'result':[{'id':'domain','hostname':'example.org','service':'example-site','environment':'production'}]}
            if url.endswith('/deployments'):
                return {'success':True,'result':{'deployments':[{'versions':[{'version_id':'version','percentage':100}]}]}}
            if url.endswith('/subdomain'):
                return {'success':True,'result':{'enabled':False,'previews_enabled':False}}
            if url=='https://example.org/.well-known/release.json':
                return {'site':'example','purpose':'production','source_sha':'b'*40 if already else 'a'*40,**({'version':'0.1.0'} if already else {})}
            raise AssertionError('Unexpected API: '+url)
        return response

    def test_rerun_with_old_remote_marker_cannot_repeat_unknown_deployment(self):
        _,digest=self.prepare()
        env={**self.env,'GH_TOKEN':'synthetic-test-token','CLOUDFLARE_API_TOKEN':'synthetic-fixture-token','GITHUB_EVENT_NAME':'push','GITHUB_RUN_ATTEMPT':'2'}
        with patch.dict('os.environ',env),patch('site_release.request',side_effect=self.provider(False)),patch('site_release.subprocess.run') as run:
            with self.assertRaises(ValueError):deploy(self.root,self.contract,self.site,self.root/'archive',digest)
            run.assert_not_called()

    @patch('site_release.verify_delivery')
    def test_matching_production_is_verified_without_redeployment_on_manual_recovery(self, verify_delivery):
        _,digest=self.prepare()
        env={**self.env,'GH_TOKEN':'synthetic-test-token','CLOUDFLARE_API_TOKEN':'synthetic-fixture-token','GITHUB_EVENT_NAME':'workflow_dispatch','GITHUB_RUN_ATTEMPT':'2'}
        with patch.dict('os.environ',env),patch('site_release.request',side_effect=self.provider(True)),patch('site_release.verify_assets') as verify,patch('site_release.subprocess.run') as run:
            deploy(self.root,self.contract,self.site,self.root/'archive',digest)
            verify.assert_called_once();run.assert_not_called()
        self.assertTrue(json.loads((self.root/'archive/acceptance.json').read_text())['verify_only'])
        verify_delivery.assert_called_once()

    def test_asset_readback_accepts_only_prepared_bytes_after_bounded_stale_reads(self):
        expected={'404.html':hashlib.sha256(b'approved fallback').hexdigest()}
        responses=[CompletedProcess([],0,b'stale page')]*6+[CompletedProcess([],0,b'approved fallback')]
        with patch('site_release.subprocess.run',side_effect=responses) as run,patch('site_release.time.sleep'):
            verify_assets('https://example.org',expected)
            self.assertEqual(run.call_count,7)
        with patch('site_release.subprocess.run',return_value=CompletedProcess([],0,b'wrong bytes')) as run,patch('site_release.time.sleep'):
            with self.assertRaises(ValueError):verify_assets('https://example.org',expected)
            self.assertEqual(run.call_count,20)

    def test_readback_deadline_never_accepts_an_unobserved_asset(self):
        expected={'index.html':hashlib.sha256(b'approved').hexdigest()}
        with patch('site_release.time.monotonic',side_effect=[0,121]),patch('site_release.subprocess.run') as run:
            with self.assertRaises(ValueError):verify_assets('https://example.org',expected)
            run.assert_not_called()


class AgentDeliveryTests(unittest.TestCase):
    def test_entry_builder_refuses_wrong_origin_and_platform_rule_overflow(self):
        from site_release import build_worker
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            site = {'appDirectory':'.', 'documentDirectory':'site', 'origin':'https://example.org'}
            good = {'source':'export default {}', 'origin':'https://example.org', 'routes':['/']}
            for value in [dict(good, origin='https://other.example'), dict(good, routes=['/p'+str(n) for n in range(101)])]:
                with patch('site_release.subprocess.run', return_value=CompletedProcess([],0,json.dumps(value),'')):
                    with self.assertRaises(ValueError):build_worker(root, site)

    def test_inner_entry_hash_is_required_even_if_outer_archive_hash_matches(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);(root/'public').mkdir();(root/'public/index.html').write_text('approved')
            site={'id':'example','domain':'example.org','version':'0.1.0','assetDirectory':'public'}
            with patch('site_release.build_worker',return_value={'source':'reviewed entry','routes':['/']}):
                pack(root,site,'b'*40,root/'release')
            modified=root/'modified.tgz'
            with tarfile.open(root/'release/site.tgz') as original, tarfile.open(modified,'w:gz') as target:
                for member in original:
                    content=b'changed entry' if member.name=='worker.mjs' else original.extractfile(member).read() if member.isfile() else None
                    if content is not None:member.size=len(content)
                    target.addfile(member,io.BytesIO(content) if content is not None else None)
            with self.assertRaises(ValueError):unpack(modified,hashlib.sha256(modified.read_bytes()).hexdigest(),root/'verified')

    def test_negotiated_readback_rejects_html_and_stale_markdown(self):
        from site_release import verify_delivery
        body=b'# Public guide'
        receipt={'files':{'raw/index.md':hashlib.sha256(body).hexdigest()},'worker':{'routes':['/']}}
        class Reply:
            status=200
            def __init__(self,url,text,mime):
                self.url=url;self.text=text;self.headers={'Content-Type':mime,'Vary':'Accept','Content-Signal':'ai-train=yes'}
            def read(self,_limit):return self.text
            def __enter__(self):return self
            def __exit__(self,*args):return False
        for text,mime,accepted in [(body,'text/markdown',True),(b'<html>fallback</html>','text/html',False),(b'stale','text/markdown',False)]:
            def read(request,timeout):
                return Reply(request.full_url,b'User-agent: *\nAllow: /\nContent-Signal: ai-train=yes' if request.full_url.endswith('/robots.txt') else text,'text/plain' if request.full_url.endswith('/robots.txt') else mime)
            with patch('site_release.urllib.request.urlopen',side_effect=read):
                if accepted:verify_delivery('https://example.org',receipt)
                else:
                    with self.assertRaises(ValueError):verify_delivery('https://example.org',receipt)


if __name__ == '__main__':
    # The same tests also validate the real owner contract after copying into a repo.
    contract_path = Path('.github/site-release.json')
    if contract_path.exists():
        contract = json.loads(contract_path.read_text())
        for site in contract['sites']:
            select(Path.cwd(), contract, f"site/{site['id']}/v{site['version']}")
    unittest.main()
