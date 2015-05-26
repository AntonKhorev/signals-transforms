var fs=require('fs');
eval(fs.readFileSync('../src/functions.js')+'');

var assert=require('assert');

assert.throws(function(){
	generateFunctionAndArgumentFromString('invalid');
},/invalid function template/);

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

var r=generateFunctionAndArgumentFromString('x[n]');
assert.equal(r[1],'n');
assert.equal(r[0]('#'),'x[#]');
assert.equal(r[0]('#','*'),'x^*[#]');

console.log('tests ok');
