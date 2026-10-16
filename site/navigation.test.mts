import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { validateIntroduction, type Content } from './navigation.mts'

const data = JSON.parse(readFileSync(new URL('./content.json', import.meta.url), 'utf8'))
for (const locale of ['ja', 'en']) {
  const original = data.locales[locale]
  test(`${locale}: ordinary entry reaches the guide and repository`, () => {
    validateIntroduction(original)
  })
  test(`${locale}: sitemap-only entry is rejected`, () => {
    const content = structuredClone(original)
    for (const page of content.pages) {
      if (page.path === '/sitemap') continue
      for (const section of page.sections) {
        section.links = section.links?.filter(link => link.href !== '/docs/getting-started')
      }
    }
    assert.throws(() => validateIntroduction(content), /unreachable/)
  })
  test(`${locale}: a reachable cycle cannot hide the missing entry`, () => {
    const content = structuredClone(original)
    const docs = content.pages.find(page => page.path === '/docs')!
    docs.sections = [{ links: [{ href: '/docs' }] }]
    assert.throws(() => validateIntroduction(content), /unreachable/)
  })
  test(`${locale}: returning to overview is not a repository exit`, () => {
    const content = structuredClone(original)
    const guide = content.pages.find(page => page.path === '/docs/getting-started')!
    guide.sections = [{ links: [{ href: '/docs' }] }]
    assert.throws(() => validateIntroduction(content), /repository destination/)
  })
  test(`${locale}: duplicate repository destinations are rejected`, () => {
    const content = structuredClone(original)
    const guide = content.pages.find(page => page.path === '/docs/getting-started')!
    const link = { href: content.resources[0].href }
    guide.sections = [{ links: [link, link] }]
    assert.throws(() => validateIntroduction(content), /duplicate/)
  })
}
