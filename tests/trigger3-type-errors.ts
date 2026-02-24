// Trigger 3: Diagnostic errors on save
// Open this file in VS Code (with the TypeScript language server active),
// then save it. The language server will report the errors below,
// and the Faah extension should play the sound within ~5 seconds.

// Error 1: type mismatch
const name: string = 42;

// Error 2: calling a non-function
const value = "hello";
value();

// Error 3: property does not exist
const obj = { x: 1 };
console.log(obj.y.z);
