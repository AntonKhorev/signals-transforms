$.fn.signalsTransformsTable.transforms.DTFT={
	name:'Discrete-time Fourier transform',
	abbr:'DTFT',
	wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
	timeFnTemplate:['x[n]','y[n]'],
	freqFnTemplate:['X(e^(j*omega))','Y(e^(j*omega))'],
	sections:{
		definitions:function(t,T,x,X,y,Y,ctx){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac{1}{2\\pi} '+ctx.int(X(T)+'e^{j'+T+t+'}',T,'\\langle 2\\pi \\rangle'),
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
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['omega','theta','xi']);
		return{
			time:[
				{},{},{},
				{formula:{
					item:x(t)+'*'+y(t)+' = \\sum_{'+t1+'=-\\infty}^{+\\infty} '+x(t1)+y(t+'-'+t1),
					notes:{b:'linear convolution'}
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{},{},{},
				{formula:{item:X(T)+' \\cdot '+Y(T)}},
				{formula:{
					item:'\\frac{1}{2\\pi} '+ctx.int(X(T1)+Y(T+'-'+T1),T1,'\\langle 2\\pi \\rangle'),
					notes:{b:'periodic convolution'}
				}}
			]
		}},
		duality:function(t,T,x,X,y,Y,ctx){
			var xd=ctx.letter(['t']);
			var Xd=ctx.letter(['k']);
		return{
			transforms:[
				'CTFS',null,'CTFS'
			],
			time:[
				{formula:{
					item:X('-\\omega_0'+xd),
					notes:{b:'period \\(T\\);<br />\\(\\omega_0=\\frac{2\\pi}{T}\\)'}
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:X('\\omega_0'+xd),
					notes:{b:'period \\(T\\);<br />\\(\\omega_0=\\frac{2\\pi}{T}\\)'}
				}}
			],
			freq:[
				{formula:{
					item:x(Xd)
				}},
				{formula:{
					item:X(T),
					notes:{b:'period \\(2\\pi\\)'}
				}},
				{formula:{
					item:x('-'+Xd)
				}}
			]
		}},
		conjrev:function(){return{
		}},
		modshift:function(t,T,x,X){return{
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
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['omega','theta','xi']);
			var Ti=ctx.letter(['k','l']);
		return{
			cells:
				'.|+|.'+'/'+
				'+|*|+'+'/'+
				'.|+|.',
			time:[
				{formula:{
					item:'-\\frac{1}{j'+t+'}'+x(t),
					notes:{b:'only if \\('+x('0')+'=0\\)'}
				}},
				{formula:{
					item:'\\sum_{'+t1+'=-\\infty}^'+t+x(t1),
					notes:{b:'running sum'}
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:x(t)+'-'+x(t+'-1'),
					notes:{b:'first difference'}
				}},
				{formula:{
					item:'-j'+t+x(t)
				}}
			],
			freq:[
				{formula:{
					item:ctx.int(X(T1),T1,'-\\infty',T)
				}},
				{formula:{
					item:'\\tfrac{'+X(T)+'}{1-e^{-j'+T+'}}+\\pi'+X('0')+'\\tilde\\delta('+T+')',
					notes:{b:
						'\\(\\tilde\\delta('+T+')\\) is an impulse train'+Wiki('http://en.wikipedia.org/wiki/Dirac_comb')+' with period \\(2\\pi\\): '+
						'\\(\\tilde\\delta('+T+') = \\sum_{'+Ti+'=-\\infty}^{+\\infty} \\delta('+T+'-2\\pi'+Ti+')\\)'
					}
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'(1-e^{-j'+T+'})'+X(T)
				}},
				{formula:{
					item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'}'+X(T)
				}}
			]
		}}
	}
};
