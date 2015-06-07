$.fn.signalsTransformsTable.transforms.CTFS={
	name:'Continuous-time Fourier series (CTFS)',
	wikipedia:'http://en.wikipedia.org/wiki/Fourier_series',
	timeFnTemplate:['x(t)','y(t)'],
	freqFnTemplate:['a_k','b_k'],
	sections:{
		definitions:function(t,T,x,X,y,Y,ctx){return{
			time:[
				{formula:{
					item:x(t)+' = \\sum_{'+T+'=-\\infty}^{+\\infty} '+X(T)+' e^{j'+T+' \\omega_0 '+t+'}',
					notes:{b:'periodic function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)<br /> with period \\(T\\);<br /> \\(\\omega_0=\\frac{2\\pi}{T}\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\frac{1}{T} '+ctx.int(x(t)+'e^{-j'+T+'\\omega_0'+t+'}',t,'\\langle T \\rangle'),
					notes:{b:'function \\('+X(T)+'\\) of discrete variable \\('+T+'\\);<br /> \\(\\omega_0=\\frac{2\\pi}{T}\\)'}
				}}
			]
		}},
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['k','l']);
		return{
			time:[
				{},{},{},
				{formula:{
					item:ctx.int(x(t1)+y(t+'-'+t1),t1,'\\langle T \\rangle'),
					notes:{b:'periodic convolution'}
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{},{},{},
				{formula:{item:'T \\, '+X(T)+' \\cdot '+Y(T)}},
				{formula:{
					item:'\\sum_{'+T1+'=-\\infty}^{+\\infty} '+X(T1)+Y(T+'-'+T1),
					notes:{b:'linear convolution'}
				}}
			]
		}},
		duality:function(t,T,x,X,y,Y,ctx){
			var xd=ctx.letter(['n']);
			var Xd=ctx.letter(['omega']);
		return{
			time:[
				{formula:{
					item:X('-'+xd)+' \\overset{\\mathtt{DTFT}}{\\longleftrightarrow}'
				}},
				{formula:{
					item:x(t),
					notes:{b:'period \\(T\\)'}
				}},
				{formula:{
					item:X(xd)+' \\overset{\\mathtt{DTFT}}{\\longleftrightarrow}'
				}}
			],
			freq:[
				{formula:{
					item:'\\overset{\\mathtt{DTFT}}{\\longleftrightarrow} '+x('\\tfrac{'+Xd+'}{\\omega_0}'),
					notes:{b:'period \\(2\\pi\\)'}
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'\\overset{\\mathtt{DTFT}}{\\longleftrightarrow} '+x('-\\tfrac{'+Xd+'}{\\omega_0}'),
					notes:{b:'period \\(2\\pi\\)'}
				}}
			]
		}},
		conjrev:function(){return{
		}},
		modshift:function(t,T,x,X){return{
			time:[
				{formula:{item:x(t+'+'+t+'_0')}},
				{formula:{item:'e^{-j'+T+'_0 \\omega_0 '+t+'}'+x(t)}},
				{formula:{item:x(t)}},
				{formula:{item:'e^{j'+T+'_0 \\omega_0 '+t+'}'+x(t)}},
				{formula:{item:x(t+'-'+t+'_0')}}
			],
			freq:[
				{formula:{item:'e^{j'+T+'\\omega_0 '+t+'_0}'+X(T)}},
				{formula:{item:X(''+T+'+'+T+'_0')}},
				{formula:{item:X(T)}},
				{formula:{item:X(''+T+'-'+T+'_0')}},
				{formula:{item:'e^{-j'+T+'\\omega_0 '+t+'_0}'+X(T)}}
			]
		}},
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['k','l']);
			var ti=ctx.letter(['n','m']);
		return{
			cells:[
				'.|+|.',
				'+|+|+',
				'.|+|.'
			],
			time:[
				{formula:{
					//item:'\\tfrac{'+x(t)+'}{1-e^{j\\omega_0'+t+'}}+\\pi'+x('0')+'\\tilde\\delta('+t+')',
					//notes:{b:'\\(\\tilde\\delta('+t+') = \\sum_{'+ti+'=-\\infty}^{+\\infty} \\delta(\\omega_0'+t+'-2\\pi'+ti+')\\)'}
					item:'\\tfrac{'+x(t)+'}{1-e^{j\\omega_0'+t+'}}+\\tfrac{\\pi'+x('0')+'}{\\omega_0} \\tilde\\delta('+t+')',
					notes:{b:
						'\\(\\tilde\\delta('+t+')\\) is an impulse train'+Wiki('http://en.wikipedia.org/wiki/Dirac_comb')+' with period \\(T\\): '+
						'\\(\\tilde\\delta('+t+') = \\sum_{'+ti+'=-\\infty}^{+\\infty} \\delta('+t+'-'+ti+'T)\\)'
					}
				}},
				{formula:{
					item:ctx.int(x(t1),t1,'-\\infty',t)
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)
				}},
				{formula:{
					item:'(1-e^{j\\omega_0'+t+'})'+x(t)
				}}
			],
			freq:[
				{formula:{
					item:'\\sum_{'+T1+'=-\\infty}^'+T+X(T1),
					notes:{b:'running sum'}
				}},
				{formula:{
					item:'\\frac{1}{j'+T+'\\omega_0}'+X(T),
					notes:{b:'only if \\('+X('0')+'=0\\)'}
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'j'+T+' \\omega_0 '+X(T)
				}},
				{formula:{
					item:X(T)+'-'+X(T+'-1'),
					notes:{b:'first difference'}
				}}
			]
		}}
	}
};
