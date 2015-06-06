$.fn.signalsTransformsTable.transforms.DTFS={
	name:'Discrete-time Fourier series (DTFS)',
	timeFnTemplate:['x[n]','y[n]'],
	freqFnTemplate:['a_k','b_k'],
	sections:{
		definitions:function(t,T,x,X){return{
			time:[
				{formula:{
					item:x(t)+' = \\sum_{'+T+'=\\langle N \\rangle} '+X(T)+' e^{j'+T+' \\omega_0 '+t+'}',
					notes:{b:'periodic function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)<br /> with period \\(N\\);<br /> \\(\\omega_0=\\frac{2\\pi}{N}\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\sum_{'+t+'=\\langle N \\rangle} '+x(t)+' e^{-j'+T+' \\omega_0 '+t+'}',
					notes:{b:'periodic function \\('+X(T)+'\\) of discrete variable \\('+T+'\\)<br /> with period \\(N\\);<br /> \\(\\omega_0=\\frac{2\\pi}{N}\\)'}
				}}
			]
		}},
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['k','l']);
		return{
			time:[
				{},{},{},
				{formula:{
					item:'\\sum_{'+t1+'=\\langle N \\rangle} '+x(t1)+y(t+'-'+t1),
					notes:{b:'periodic convolution'}
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{},{},{},
				{formula:{item:'N \\, '+X(T)+' \\cdot '+Y(T)}},
				{formula:{
					item:'\\sum_{'+T1+'=\\langle N \\rangle} '+X(T1)+Y(T+'-'+T1),
					notes:{b:'periodic convolution'}
				}}
			]
		}},
		duality:function(t,T,x,X){return{
			time:[
				{formula:{item:'N'+X('-'+t)}},
				{formula:{item:x(t)}},
				{formula:{item:X(t)}}
			],
			freq:[
				{formula:{item:x(T)}},
				{formula:{item:X(T)}},
				{formula:{item:'\\frac{1}{N}'+x('-'+T)}}
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
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['k','l']);
		return{
			cells:[
				'.|+|.',
				'+|+|+',
				'.|+|.'
			],
			time:[
				{formula:{
					item:'\\frac{1}{1-e^{j\\omega_0'+t+'}}'+x(t),
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
					item:'(1-e^{j\\omega_0'+t+'})'+x(t)
				}}
			],
			freq:[
				{formula:{
					item:'\\sum_{'+T1+'=-\\infty}^'+T+X(T1),
					notes:{b:'running sum'}
				}},
				{formula:{
					item:'\\frac{1}{1-e^{-j'+T+'\\omega_0}}'+X(T),
					notes:{b:'only if \\('+X('0')+'=0\\)'}
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'(1-e^{-j'+T+'\\omega_0}) '+X(T)
				}},
				{formula:{
					item:X(T)+'-'+X(T+'-1'),
					notes:{b:'first difference'}
				}}
			]
		}}
	}
};
