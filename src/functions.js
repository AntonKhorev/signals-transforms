function parseFunctionOptions(argument,options){
	if (typeof(options)==='undefined') options='';
	var startsWithMinus = argument.charAt(0)=='-';
	if (startsWithMinus) {
		var argWithoutMinus=argument.substr(1);
	} else {
		var argWithoutMinus=argument;
	}
	function needsBrackets(arg){
		if (arg.indexOf('+')<0 && (arg.indexOf('-')<0)) {
			return false; // will be wrong for expressions like a*(b+c)
		}
		if (arg.charAt(0)=='(' && arg.charAt(arg.length-1)==')' && arg.substr(1).indexOf('(')<0) {
			return false; // will be wrong for expressions like (a*b)*(c*d)
		}
		return true;
	}
	var o={}
	o.fnConj = options.indexOf('*')>=0?'^*':'';
	if (needsBrackets(argWithoutMinus)) {
		o.argSign='';
		o.argRest='('+argument+')';
	} else {
		if (startsWithMinus) {
			o.argSign='-';
			o.argRest=argWithoutMinus;
		} else {
			o.argSign='';
			o.argRest=argument;
		}
	}
	return o;
};

function generateFnAndVarFromTemplate(s){
	function letter(s){
		if (s.length>1) {
			return '\\'+s;
		} else {
			return s;
		}
	}
	var m=s.match(/([a-zA-Z]+)(\(|\[)([a-zA-Z]+)(\)|\])/);
	if (m) {
		var x=letter(m[1]);
		var t=letter(m[3]);
		return [
			function(arg,opts){
				var o=parseFunctionOptions(arg,opts);
				return x+o.fnConj+m[2]+arg+m[4];
			},
			t
		];
	}
	var m=s.match(/([a-zA-Z]+)(\(|\[)[ij]\*([a-zA-Z]+)(\)|\])/);
	if (m) {
		var x=letter(m[1]);
		var t=letter(m[3]);
		return [
			function(arg,opts){
				var o=parseFunctionOptions(arg,opts);
				return x+o.fnConj+'('+o.argSign+'j'+o.argRest+')';
			},
			t
		];
	}
	var m=s.match(/([a-zA-Z]+)(\(|\[)e\^\([ij]\*([a-zA-Z]+)\)(\)|\])/);
	if (m) {
		var x=letter(m[1]);
		var t=letter(m[3]);
		return [
			function(arg,opts){
				var o=parseFunctionOptions(arg,opts);
				return x+o.fnConj+'(e^{'+o.argSign+'j'+o.argRest+'})';
			},
			t
		];
	}
	var m=s.match(/([a-zA-Z]+)_([a-zA-Z]+)/);
	if (m) {
		var x=letter(m[1]);
		var t=letter(m[2]);
		return [
			function(arg,opts){
				var o=parseFunctionOptions(arg,opts);
				return x+o.fnConj+'_{'+arg+'}';
			},
			t
		];
	}
	throw 'invalid function template';
};
