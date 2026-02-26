// Passing test suite — triggers the Wow sound via npm test exit 0.
const assert = require('assert');

let passed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}: ${e.message}`);
    process.exit(1);
  }
}

console.log('\nRunning tests...\n');

test('addition', () => assert.strictEqual(1 + 1, 2));
test('string equality', () => assert.strictEqual('faah', 'faah'));
test('array length', () => assert.strictEqual([1, 2, 3].length, 3));
test('boolean true', () => assert.ok(true));
test('object property', () => assert.strictEqual({ name: 'faah' }.name, 'faah'));

console.log(`\n${passed} passed, 0 failed\n`);
