var fs=require('fs');
eval(fs.readFileSync('../src/functions.js')+'');
var assert=require('assert');

function testCallSection(ctx,fn){
	var called=false;
	ctx.callSection(function(){
		called=true;
		fn.apply(null,arguments);
	});
	assert(called,"section fn wasn't called");
}

assert.throws(function(){
	var ctx=FormulaContext(['invalid','invalid'],['invalid','invalid']);
},/invalid function template/);

testCallSection(
	FormulaContext(['x(t)','y(t)'],['X(f)','Y(f)']),
	function(t,T,x,X){
		assert.equal(t,'{t}');
		assert.equal(x('#'),'{x}(#)');
		assert.equal(x('#','*'),'{x^*}(#)');
	}
);

testCallSection(
	FormulaContext(['x(t)','y(t)'],['X(f)','Y(f)']),
	function(t,T,x,X){
		assert.equal(T,'{f}');
		assert.equal(X('#'),'{X}(#)');
		assert.equal(X('#','*'),'{X^*}(#)');
	}
);

testCallSection(
	FormulaContext(['x(t)','y(t)'],['X(omega)','Y(omega)']),
	function(t,T,x,X){
		assert.equal(T,'{\\omega}');
		assert.equal(X('#'),'{X}(#)');
		assert.equal(X('#','*'),'{X^*}(#)');
	}
);

testCallSection(
	FormulaContext(['x[n]','y[n]'],['X(e^(i*phi))','Y(e^(i*phi))']),
	function(t,T,x,X){
		assert.equal(t,'{n}');
		assert.equal(x('#'),'{x}[#]');
		assert.equal(x('#','*'),'{x^*}[#]');
	}
);

testCallSection(
	FormulaContext(['x[n]','y[n]'],['a_k','b_k']),
	function(t,T,x,X){
		assert.equal(T,'{k}');
		assert.equal(X('#'),'{a}_{#}');
		assert.equal(X('#','*'),'{a^*}_{#}');
	}
);

testCallSection(
	FormulaContext(['x[n]','y[n]'],['X(e^(i*phi))','Y(e^(i*phi))']),
	function(t,T,x,X){
		assert.equal(T,'{\\phi}');
		assert.equal(X('#'),'{X}(e^{j#})');
		assert.equal(X('-#'),'{X}(e^{-j#})');
		assert.equal(X('#','*'),'{X^*}(e^{j#})');
	}
);

testCallSection(
	FormulaContext(['x(t)','y(t)'],['X(i*omega)','Y(i*omega)']),
	function(t,T,x,X){
		assert.equal(T,'{\\omega}');
		assert.equal(X('#'),'{X}(j#)');
		assert.equal(X('-#'),'{X}(-j#)');
		assert.equal(X('#','*'),'{X^*}(j#)');
	}
);

var ctx=FormulaContext(['x(t)','y(t)'],['X(j*omega)','Y(j*omega)']);
assert.equal(ctx.letter(['a','A','alpha']),'{a}');

var ctx=FormulaContext(['x(t)','y(t)'],['a_k','b_k']);
assert.equal(ctx.letter(['a','A','alpha']),'{A}');

var ctx=FormulaContext(['a(t)','b(t)'],['A_k','B_k']);
assert.equal(ctx.letter(['a','A','alpha']),'{\\alpha}');

var ctx=FormulaContext(['a(t)','b(t)'],['A_k','B_k']);
assert.equal(ctx.letter(['a','A']),'\\tilde{a}');

console.log('tests ok');
