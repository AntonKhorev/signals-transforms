function FormulaContext(timeFnTemplate,freqFnTemplate){
	function texLetter(s){
		if (s.length>1) {
			return '\\'+s;
		} else {
			return s;
		}
	}

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

	function parseTemplate(s){
		var m=s.match(/([a-zA-Z]+)(\(|\[)([a-zA-Z]+)(\)|\])/);
		if (m) {
			var x=texLetter(m[1]);
			var t=texLetter(m[3]);
			return [
				function(arg,opts){
					var o=parseFunctionOptions(arg,opts);
					return '{'+x+o.fnConj+'}'+m[2]+arg+m[4];
				},
				'{'+t+'}',m[1],m[3]
			];
		}
		var m=s.match(/([a-zA-Z]+)(\(|\[)[ij]\*([a-zA-Z]+)(\)|\])/);
		if (m) {
			var x=texLetter(m[1]);
			var t=texLetter(m[3]);
			return [
				function(arg,opts){
					var o=parseFunctionOptions(arg,opts);
					return '{'+x+o.fnConj+'}('+o.argSign+'j'+o.argRest+')';
				},
				'{'+t+'}',m[1],m[3]
			];
		}
		var m=s.match(/([a-zA-Z]+)(\(|\[)e\^\([ij]\*([a-zA-Z]+)\)(\)|\])/);
		if (m) {
			var x=texLetter(m[1]);
			var t=texLetter(m[3]);
			return [
				function(arg,opts){
					var o=parseFunctionOptions(arg,opts);
					return '{'+x+o.fnConj+'}(e^{'+o.argSign+'j'+o.argRest+'})';
				},
				'{'+t+'}',m[1],m[3]
			];
		}
		var m=s.match(/([a-zA-Z]+)_([a-zA-Z]+)/);
		if (m) {
			var x=texLetter(m[1]);
			var t=texLetter(m[2]);
			return [
				function(arg,opts){
					var o=parseFunctionOptions(arg,opts);
					return '{'+x+o.fnConj+'}_{'+arg+'}';
				},
				'{'+t+'}',m[1],m[2]
			];
		}
		throw 'invalid function template';
	};

	var ctx={letters:{}}
	var r=parseTemplate(timeFnTemplate[0]);
	var x=r[0]; ctx.letters.x=r[2];
	var t=r[1]; ctx.letters.t=r[3];
	var r=parseTemplate(freqFnTemplate[0]);
	var X=r[0]; ctx.letters.X=r[2];
	var T=r[1]; ctx.letters.T=r[3];
	var r=parseTemplate(timeFnTemplate[1]);
	var y=r[0]; ctx.letters.y=r[2];
	var r=parseTemplate(freqFnTemplate[1]);
	var Y=r[0]; ctx.letters.Y=r[2];
	ctx.letter=function(letters){
		outer: for (var i=0;i<letters.length;i++) {
			for (var k in ctx.letters) {
				if (letters[i]==ctx.letters[k]) continue outer;
			}
			return '{'+texLetter(letters[i])+'}';
		}
		return '\\tilde{'+texLetter(letters[0])+'}';
	}
	ctx.callSection=function(sectionFn){
		return sectionFn(t,T,x,X,y,Y,ctx);
	};

	// TODO decide (not) to put those under ctx.letters
	ctx.a=ctx.letter(['a','A','alpha']); // factor 1
	ctx.b=ctx.letter(['b','B','beta']); // factor 2
	// TODO continuous time/freq options OR just base it off the domain var letter
	//ctx.t1=ctx.letter(['t','tau','u']); // continuous time var w/o index
	return ctx;
}
