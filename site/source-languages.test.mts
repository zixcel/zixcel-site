import assert from 'node:assert/strict'
import test from 'node:test'
import { validateLanguages } from './source-languages.mts'
import inventory from './source-languages.json' with { type: 'json' }
test('unchanged upstream fixture is allowed, unknown entrypoints and drift are refused', () => {
  validateLanguages(inventory.retained)
  assert.throws(() => validateLanguages([...inventory.retained, { path: 'site/unchecked.mjs', sha256: '0'.repeat(64) }]), /Unclassified/)
  assert.throws(() => validateLanguages(inventory.retained.map(entry => ({ ...entry, sha256: '0'.repeat(64) }))), /changed/)
  assert.throws(() => validateLanguages([]), /Stale/)
})
