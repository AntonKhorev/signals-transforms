var transforms=[{
	name:'Continuous-time Fourier transform (CTFT)', // angular frequency, non-unitary
	wikipedia:'http://en.wikipedia.org/wiki/Fourier_transform',
	timeVar:'t',
	freqVar:'\\omega',
	timeFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'x'+o.fnConj+'('+arg+')';
	},
	freqFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'X'+o.fnConj+'('+o.argSign+'j'+o.argRest+')';
	},
	sections:{
		definitions:function(x,X,t,T){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
					notes:{b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\int\\limits_{-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'} \\,\\mathrm{d}'+t,
					notes:{b:'function \\('+X(T)+'\\) of continuous variable \\('+T+'\\)'}
				}}
			]
		}},
		duality:function(x,X,t,T){return{
			time:[
				{formula:{item:'\\frac{1}{2\\pi} '+X('-'+t)}},
				{formula:{item:x(t)}},
				{formula:{item:X(t)}}
			],
			freq:[
				{formula:{item:x(T)}},
				{formula:{item:X(T)}},
				{formula:{item:'2\\pi '+x('-'+T)}}
			]
		}},
		conjrev:function(x,X,t,T){return{
		}},
		modshift:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t+'+'+t+'_0')}},
				{formula:{item:'e^{-j'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t)}},
				{formula:{item:'e^{j'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t+'-'+t+'_0')}}
			],
			freq:[
				{formula:{item:'e^{j'+T+' '+t+'_0}'+X(T)}},
				{formula:{item:X(''+T+'+'+T+'_0')}},
				{formula:{item:X(T)}},
				{formula:{item:X(''+T+'-'+T+'_0')}},
				{formula:{item:'e^{-j'+T+' '+t+'_0}'+X(T)}}
			]
		}},
		intdiff:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t)}},
				{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}},
				{formula:{item:'-j '+t+' '+x(t)}}
			],
			freq:[
				{formula:{item:X(T)}},
				{formula:{item:'j'+T+' '+X(T)}},
				{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)}}
			]
		}}
	}
},{
	name:'Discrete-time Fourier transform (DTFT)',
	wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
	timeVar:'n',
	freqVar:'\\omega',
	timeFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'x'+o.fnConj+'['+arg+']';
	},
	freqFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'X'+o.fnConj+'(e^{'+o.argSign+'j'+o.argRest+'})';
	},
	sections:{
		definitions:function(x,X,t,T){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
					notes:{b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\sum_{'+t+'=-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'}',
					notes:{b:'periodic function \\('+X(T)+'\\) of continuous variable \\('+T+'\\)<br /> with period \\(2\\pi\\)'}
				}}
			]
		}},
		conjrev:function(x,X,t,T){return{
		}},
		modshift:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t+'+'+t+'_0')}},
				{formula:{item:'e^{-j'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t)}},
				{formula:{item:'e^{j'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t+'-'+t+'_0')}}
			],
			freq:[
				{formula:{item:'e^{j'+T+' '+t+'_0}'+X(T)}},
				{formula:{item:X(''+T+'+'+T+'_0')}},
				{formula:{item:X(T)}},
				{formula:{item:X(''+T+'-'+T+'_0')}},
				{formula:{item:'e^{-j'+T+' '+t+'_0}'+X(T)}}
			]
		}},
		intdiff:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t)}},
				{formula:{item:x(t)+'-'+x(t+'-1')}},
				{formula:{item:'-j '+t+' '+x(t)}}
			],
			freq:[
				{formula:{item:X(T)}},
				{formula:{item:'(1-e^{-j'+T+'}) '+X(T)}},
				{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)}}
			]
		}}
	}
},{
	name:'Discrete Fourier transform (DFT)',
	wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
	timeVar:'n',
	freqVar:'k',
	timeFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'x'+o.fnConj+'['+arg+']';
	},
	freqFn:function(arg,opts){
		var o=parseFunctionOptions(arg,opts);
		return 'X'+o.fnConj+'['+arg+']';
	},
	sections:{
		definitions:function(x,X,t,T){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac 1 N \\sum_{'+T+'=0}^{N-1} '+X(T)+' W_N^{-'+T+' '+t+'}',
					notes:{b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\sum_{'+t+'=0}^{N-1} '+x(t)+' W_N^{'+T+' '+t+'}',
					notes:{b:'function \\('+X(T)+'\\) of discrete variable \\('+T+'\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)'}
				}}
			]
		}},
		duality:function(x,X,t,T){return{
			time:[
				{formula:{item:'\\frac{1}{N} '+X('-'+t)}},
				{formula:{item:x(t)}},
				{formula:{item:X(t)}}
			],
			freq:[
				{formula:{item:x(T)}},
				{formula:{item:X(T)}},
				{formula:{item:'N '+x('-'+T)}}
			]
		}},
		conjrev:function(x,X,t,T){return{
		}},
		modshift:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t+'+'+t+'_0')}},
				{formula:{item:'W_N^{'+T+'_0 n}'+x(t)}},
				{formula:{item:x(t)}},
				{formula:{item:'W_N^{-'+T+'_0 n}'+x(t)}},
				{formula:{item:x(t+'-'+t+'_0')}}
			],
			freq:[
				{formula:{item:'W_N^{-'+T+' '+t+'_0}'+X(T)}},
				{formula:{item:X(T+'+'+T+'_0')}},
				{formula:{item:X(T)}},
				{formula:{item:X(T+'-'+T+'_0')}},
				{formula:{item:'W_N^{'+T+' '+t+'_0}'+X(T)}}
			]
		}},
		intdiff:function(x,X,t,T){return{
			time:[
				{formula:{item:x(t)}},
				{formula:{item:x(t)+'-'+x(t+'-1')}},
				{formula:{item:'(1-W_N^{-'+t+'}) '+x(t)}}
			],
			freq:[
				{formula:{item:X(T)}},
				{formula:{item:'(1-W_N^'+T+') '+X(T)}},
				{formula:{item:X(T)+'-'+X(T+'-1')}}
			]
		}}
	}
}];