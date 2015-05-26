var fs=require('fs');
eval(fs.readFileSync('../src/functions.js')+'');

var assert=require('assert');
var r=generateFunctionAndArgumentFromString('x(t)');
assert.equal(r[1],'t');
assert.equal(r[0]('#'),'x(#)');
assert.equal(r[0]('#','*'),'x^*(#)');

console.log('tests ok');
