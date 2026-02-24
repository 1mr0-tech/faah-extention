// Trigger 2: Test Explorer failure
// Run with:  npx jest tests/trigger2-failing-test.test.js
// (or open in VS Code with the Jest extension installed — it will show failures in Test Explorer)

test('this test always passes', () => {
  expect(1 + 1).toBe(2);
});

test('this test always fails', () => {
  expect(true).toBe(false);
});

test('this test throws an error', () => {
  throw new Error('Something went wrong');
});
