var fs=require('fs');
eval(fs.readFileSync('../src/functions.js')+'');

var assert=require('assert');

var r=generateFunctionAndArgumentFromString('x(t)');
assert.equal(r[1],'t');
assert.equal(r[0]('#'),'x(#)');
assert.equal(r[0]('#','*'),'x^*(#)');

var r=generateFunctionAndArgumentFromString('X(f)');
assert.equal(r[1],'f');
assert.equal(r[0]('#'),'X(#)');
assert.equal(r[0]('#','*'),'X^*(#)');

var r=generateFunctionAndArgumentFromString('X(omega)');
assert.equal(r[1],'\\omega');
assert.equal(r[0]('#'),'X(#)');
assert.equal(r[0]('#','*'),'X^*(#)');

console.log('tests ok');
