$.fn.signalsTransformsTable.transforms.CTFT={
	name:'Continuous-time Fourier transform (CTFT)', // angular frequency, non-unitary
	wikipedia:'http://en.wikipedia.org/wiki/Fourier_transform',
	timeFnTemplate:['x(t)','y(t)'],
	freqFnTemplate:['X(j*omega)','Y(j*omega)'],
	sections:{
		definitions:function(t,T,x,X,y,Y,ctx){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac{1}{2\\pi} '+ctx.int(X(T)+'e^{j'+T+t+'}',T,'-\\infty','+\\infty'),
					notes:{b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = '+ctx.int(x(t)+'e^{-j'+T+t+'}',t,'-\\infty','+\\infty'),
					notes:{b:'function \\('+X(T)+'\\) of continuous variable \\('+T+'\\)'}
				}}
			]
		}},
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['omega','theta','xi']);
		return{
			time:[
				{},{},{},
				{formula:{
					item:x(t)+'*'+y(t)+' = '+ctx.int(x(t1)+y(t+'-'+t1),t1,'-\\infty','+\\infty'),
					notes:{b:'linear convolution'}
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{},{},{},
				{formula:{item:X(T)+' \\cdot '+Y(T)}},
				{formula:{
					item:'\\frac{1}{2\\pi} '+X(T)+'*'+Y(T)+' = \\frac{1}{2\\pi} '+ctx.int(X(T1)+Y(T+'-'+T1),T1,'-\\infty','+\\infty'),
					notes:{b:'linear convolution'}
				}}
			]
		}},
		duality:function(t,T,x,X){return{
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
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['omega','theta','xi']);
		return{
			cells:[
				'.|+|.',
				'+|+|+',
				'.|+|.'
			],
			time:[
				{formula:{
					item:'-\\frac{'+x(t)+'}{j'+t+'}+\\pi'+x('0')+'\\delta('+t+')'
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
					item:'-j '+t+' '+x(t)
				}}
			],
			freq:[
				{formula:{
					item:ctx.int(X(T1),T1,'-\\infty',T)
				}},
				{formula:{
					item:'\\frac{'+X(T)+'}{j'+T+'}+\\pi'+X('0')+'\\delta('+T+')'
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'j'+T+' '+X(T)
				}},
				{formula:{
					item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)
				}}
			]
		}},
		impstep:function(t,T,x,X){return{
			cells:[
				'+|+|+',
				'.|+|+'
			],
			time:[
				{formula:{
					item:'1'
				}},
				{formula:{
					item:'\\delta('+t+')',
					notes:{b:'Dirac delta'+Wiki('http://en.wikipedia.org/wiki/Dirac_delta_function')}
				}},
				{formula:{
					item:'\\frac{1}{2\\pi}'
				}},
				{formula:{
					item:'u('+t+')',
					notes:{b:'unit step'+Wiki('http://en.wikipedia.org/wiki/Heaviside_step_function')}
				}},
				{formula:{
					item:'-\\frac{1}{2\\pi j'+t+'}+\\frac{\\delta('+t+')}{2}' // maybe put '-' before delta - that's what comes out of duality derivation
				}}
			],
			freq:[
				{formula:{
					item:'2\\pi\\delta('+T+')'
				}},
				{formula:{
					item:'1'
				}},
				{formula:{
					item:'\\delta('+T+')',
					notes:{b:'Dirac delta'+Wiki('http://en.wikipedia.org/wiki/Dirac_delta_function')}
				}},
				{formula:{
					item:'\\frac{1}{j'+T+'}+\\pi\\delta('+T+')'
				}},
				{formula:{
					item:'u('+T+')',
					notes:{b:'unit step'+Wiki('http://en.wikipedia.org/wiki/Heaviside_step_function')}
				}}
			]
		}}
	}
};
