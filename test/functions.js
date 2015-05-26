var fs=require('fs');
eval(fs.readFileSync('../src/functions.js')+'');

var assert=require('assert');

assert.throws(function(){
	generateFnAndVarFromTemplate('invalid');
},/invalid function template/);

var r=generateFnAndVarFromTemplate('x(t)');
assert.equal(r[1],'t');
assert.equal(r[0]('#'),'x(#)');
assert.equal(r[0]('#','*'),'x^*(#)');

var r=generateFnAndVarFromTemplate('X(f)');
assert.equal(r[1],'f');
assert.equal(r[0]('#'),'X(#)');
assert.equal(r[0]('#','*'),'X^*(#)');

var r=generateFnAndVarFromTemplate('X(omega)');
assert.equal(r[1],'\\omega');
assert.equal(r[0]('#'),'X(#)');
assert.equal(r[0]('#','*'),'X^*(#)');

var r=generateFnAndVarFromTemplate('x[n]');
assert.equal(r[1],'n');
assert.equal(r[0]('#'),'x[#]');
assert.equal(r[0]('#','*'),'x^*[#]');

var r=generateFnAndVarFromTemplate('a_k');
assert.equal(r[1],'k');
assert.equal(r[0]('#'),'a_{#}');
assert.equal(r[0]('#','*'),'a^*_{#}');

var r=generateFnAndVarFromTemplate('X(i*omega)');
assert.equal(r[1],'\\omega');
assert.equal(r[0]('#'),'X(j#)');
assert.equal(r[0]('-#'),'X(-j#)');
assert.equal(r[0]('#','*'),'X^*(j#)');

var r=generateFnAndVarFromTemplate('X(e^(i*phi))');
assert.equal(r[1],'\\phi');
assert.equal(r[0]('#'),'X(e^{j#})');
assert.equal(r[0]('-#'),'X(e^{-j#})');
assert.equal(r[0]('#','*'),'X^*(e^{j#})');

console.log('tests ok');
