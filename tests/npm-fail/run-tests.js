// Simple test runner using Node's built-in assert — no dependencies needed.
const assert = require('assert');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${e.message}`);
    failed++;
  }
}

console.log('\nRunning tests...\n');

test('addition works', () => {
  assert.strictEqual(1 + 1, 2);
});

test('this assertion fails', () => {
  assert.strictEqual('expected', 'actual');
});

test('this throws', () => {
  throw new Error('Something went wrong in production logic');
});

console.log(`\n${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
