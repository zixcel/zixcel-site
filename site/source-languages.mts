import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, lstatSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import inventory from './source-languages.json' with { type: 'json' }
interface Entry { path: string; sha256: string }
export function validateLanguages(entries: readonly Entry[]): void {
  const retained = new Map(inventory.retained.map(entry => [entry.path, entry]))
  for (const entry of entries) {
    if (!/\.(?:c|m)?js$/.test(entry.path)) continue
    const allowed = retained.get(entry.path)
    assert.ok(allowed, `Unclassified JavaScript source: ${entry.path}`)
    assert.equal(entry.sha256, allowed.sha256, `Upstream fixture changed: ${entry.path}`)
    assert.match(allowed.source, /^https:\/\/github.com\/nuxtjp\/site-builder\/blob\/[a-f0-9]{40}\//)
    retained.delete(entry.path)
  }
  assert.equal(retained.size, 0, 'Stale retained-source inventory')
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const paths = execFileSync('git', ['--no-optional-locks', '-c', 'core.fsmonitor=false', '-c', 'core.hooksPath=/dev/null', 'ls-files', '-z'], { cwd: root, encoding: 'utf8', timeout: 5000, maxBuffer: 1048576 }).split('\0').filter(Boolean)
  validateLanguages(paths.filter(path => /\.(?:c|m)?js$/.test(path)).map(path => {
    if (!inventory.retained.some(entry => entry.path === path)) return { path, sha256: '' }
    const file = new URL('../' + path, import.meta.url), info = lstatSync(file)
    assert.ok(info.isFile() && !info.isSymbolicLink() && info.size <= 1048576, 'Unsafe fixture input')
    return { path, sha256: createHash('sha256').update(readFileSync(file)).digest('hex') }
  }))
  console.log('Typed first-party source; unchanged upstream verification fixture accepted.')
}
