function FormulaContext(timeFnTemplate,freqFnTemplate){
	function texLetter(s){
		if (s.length>1) {
			return '\\'+s;
		} else {
			return s;
		}
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

	function parseTemplate(s){
		var reLetter='([a-zA-Z]+)';
		var reOpen='([\\[({<])';
		var reOpen0=reOpen.slice(0,-1)+'?)';
		var reClose='([\\])}>])';
		var reClose0=reClose.slice(0,-1)+'?)';
		var texOpen={
			'':'',
			'[':'[',
			'(':'(',
			'{':'\\{',
			'<':'\\langle '
		};
		var texClose={
			'':'',
			']':']',
			')':')',
			'}':'\\}',
			'>':' \\rangle'
		};
		var templateSyntaxVariants=[
			[
				reLetter+reOpen+reLetter+reClose,
				function(x,arg,argSign,argRest,open,close){
					return '{'+x+'}'+open+arg+close;
				}
			],[
				reLetter+reOpen+'[ij]\\*'+reLetter+reClose,
				function(x,arg,argSign,argRest,open,close){
					return '{'+x+'}'+open+arg+close;
				}
			],[
				reLetter+reOpen+'e\\^\\([ij]\\*'+reLetter+'\\)'+reClose,
				function(x,arg,argSign,argRest,open,close){
					return '{'+x+'}'+open+'e^{'+argSign+'j'+argRest+'}'+close;
				}
			],[
				reLetter+'_'+reOpen0+reLetter+reClose0,
				function(x,arg,argSign,argRest,open,close){
					return '{'+x+'}_{'+open+arg+close+'}';
				}
			]
		];
		for (var i=0;i<templateSyntaxVariants.length;i++) {
			var re=templateSyntaxVariants[i][0];
			var fn=templateSyntaxVariants[i][1];
			var m=s.match(re);
			if (!m) continue;
			return [
				function(arg,options){
					if (options===undefined) options='';
					var x=texLetter(m[1]);
					if (options=='*') x+='^*';
					if (options.charAt(0)=="'") x+=options;
					if (options.charAt(0)=='(') x+='^{'+options+'}';
					var startsWithMinus = arg.charAt(0)=='-';
					if (startsWithMinus) {
						var argWithoutMinus=arg.substr(1);
					} else {
						var argWithoutMinus=arg;
					}
					if (needsBrackets(argWithoutMinus)) {
						var argSign='';
						var argRest='('+arg+')';
					} else {
						if (startsWithMinus) {
							var argSign='-';
							var argRest=argWithoutMinus;
						} else {
							var argSign='';
							var argRest=arg;
						}
					}
					return fn(x,arg,argSign,argRest,texOpen[m[2]],texClose[m[4]]);
				},
				'{'+texLetter(m[3])+'}',m[1],m[3]
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
	ctx.int=function(fx,x,x0,x1){
		var r='\\int\\limits_{'+x0+'}';
		if (x1!==undefined) r+='^{'+x1+'}';
		r+='\\!'+fx+'\\,\\mathrm{d}'+x;
		return r;
	};
	//ctx.diff=function(fx,x,n){
	//	var p='';
	//	if (n!==undefined) p='^{'+n+'}'
	//	return '\\frac{\\mathrm{d}'+p+'}{\\mathrm{d}'+x+p+'} '+fx
	//};

	// TODO decide (not) to put those under ctx.letters
	ctx.a=ctx.letter(['a','A','alpha']); // factor 1
	ctx.b=ctx.letter(['b','B','beta']); // factor 2
	// TODO continuous time/freq options OR just base it off the domain var letter
	//ctx.t1=ctx.letter(['t','tau','u']); // continuous time var w/o index
	return ctx;
}
