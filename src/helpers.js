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

var nDomainCols=3;
var iDefaultTransform=2;
