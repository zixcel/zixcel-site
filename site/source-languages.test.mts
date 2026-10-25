import assert from 'node:assert/strict'
import test from 'node:test'
import { validateLanguages } from './source-languages.mts'
import inventory from './source-languages.json' with { type: 'json' }
test('no retained JavaScript remains and unknown entrypoints are refused', () => {
  assert.deepEqual(inventory.retained, [])
  validateLanguages(inventory.retained)
  assert.throws(() => validateLanguages([...inventory.retained, { path: 'site/unchecked.mjs', sha256: '0'.repeat(64) }]), /Unclassified/)
})
