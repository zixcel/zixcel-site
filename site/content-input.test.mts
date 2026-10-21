import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { decodeContent } from './content-input.mts'
import { validateContent } from './check.mts'
const value: unknown = JSON.parse(readFileSync(new URL('./content.json', import.meta.url), 'utf8'))
const valid = decodeContent(value)
test('typed decoder preserves the admitted bilingual site and rejects malformed input', () => {
  assert.deepEqual(valid, value)
  assert.equal(validateContent(valid).brokenInternalLinks, 0)
  for (const invalid of [null, [], { ...valid, origin: 1 }, { ...valid, locales: { ja: [] } }, { ...valid, defaultLocale: 'unknown' }]) {
    assert.throws(() => validateContent(invalid))
  }
})
test('typed verifier rejects broken routes, translated-page drift and credentials in external URLs', () => {
  const bad = structuredClone(valid); bad.locales.ja.navigation[0]!.href = '/missing'
  assert.throws(() => validateContent(bad), /broken internal|unreachable/)
  const drift = structuredClone(valid); drift.locales.en.pages.pop()
  assert.throws(() => validateContent(drift), /translation routes differ/)
  const credentials = structuredClone(valid); credentials.locales.ja.resources[0]!.href = 'https://user:password@example.invalid'
  assert.throws(() => validateContent(credentials))
})
