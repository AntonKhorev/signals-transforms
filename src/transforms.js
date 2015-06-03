$.fn.signalsTransformsTable.allTransforms=
$.fn.signalsTransformsTable.includedTransforms=[
	'CTFT',
	'CTFS',
	'DTFT',
	'DTFS',
	'DFT',
	'Laplace1',
	'Laplace2',
	'Z1',
	'Z2'
];

$.fn.signalsTransformsTable.selectedTransform='DTFT';

$.fn.signalsTransformsTable.transformCommon={
	timeDomainName:'Time domain',
	freqDomainName:'Frequency domain'
	// TODO options for:
	// omega_0 in series
	// W_N in DFT (N is a period)
	// T and N periods
};

// TODO synthesis formula equality caveats for CTFT and Laplace (esp. Unilateral)
var RoC="<abbr title='region of convergence'>RoC</abbr>";
$.fn.signalsTransformsTable.transforms={
	CTFT:{
		name:'Continuous-time Fourier transform (CTFT)', // angular frequency, non-unitary
		wikipedia:'http://en.wikipedia.org/wiki/Fourier_transform',
		timeFnTemplate:['x(t)','y(t)'],
		freqFnTemplate:['X(j*omega)','Y(j*omega)'],
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty}\\! '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
						notes:{b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\int\\limits_{-\\infty}^{+\\infty}\\! '+x(t)+' e^{-j'+T+' '+t+'} \\,\\mathrm{d}'+t,
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
						item:x(t)+'*'+y(t)+' = \\int\\limits_{-\\infty}^{+\\infty}\\! '+x(t1)+y(t+'-'+t1)+'\\,\\mathrm{d}'+t1,
						notes:{b:'linear convolution'}
					}},
					{formula:{item:x(t)+' \\cdot '+y(t)}}
				],
				freq:[
					{},{},{},
					{formula:{item:X(T)+' \\cdot '+Y(T)}},
					{formula:{
						item:'\\frac{1}{2\\pi} '+X(T)+'*'+Y(T)+' = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty}\\! '+X(T1)+Y(T+'-'+T1)+'\\,\\mathrm{d}'+T1,
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
			intdiff:function(t,T,x,X){return{
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
	},
	CTFS:{
		name:'Continuous-time Fourier series (CTFS)',
		wikipedia:'http://en.wikipedia.org/wiki/Fourier_series',
		timeFnTemplate:['x(t)','y(t)'],
		freqFnTemplate:['a_k','b_k'],
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\sum_{'+T+'=-\\infty}^{+\\infty} '+X(T)+' e^{j'+T+' \\omega_0 '+t+'}',
						notes:{b:'periodic function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)<br /> with period \\(T\\);<br /> \\(\\omega_0=\\frac{2\\pi}{T}\\)'}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\frac{1}{T} \\int\\limits_{\\langle T \\rangle}\\! '+x(t)+' e^{-j'+T+' \\omega_0 '+t+'} \\,\\mathrm{d}'+t,
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
						item:'\\int\\limits_{\\langle T \\rangle}\\! '+x(t1)+y(t+'-'+t1)+'\\,\\mathrm{d}'+t1,
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
			intdiff:function(t,T,x,X){return{
				cells:[
					'.|+|+',
					'.|.|.'
				],
				time:[
					{formula:{item:x(t)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'j'+T+' \\omega_0 '+X(T)}}
				]
			}}
		}
	},
	DTFT:{
		name:'Discrete-time Fourier transform (DTFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
		timeFnTemplate:['x[n]','y[n]'],
		freqFnTemplate:['X(e^(j*omega))','Y(e^(j*omega))'],
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle}\\! '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
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
						item:'\\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle}\\! '+X(T1)+Y(T+'-'+T1)+'\\,\\mathrm{d}'+T1,
						notes:{b:'periodic convolution'}
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
			intdiff:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{
						item:x(t)+'-'+x(t+'-1'),
						notes:{b:'first difference'}
					}},
					{formula:{item:'-j '+t+' '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'(1-e^{-j'+T+'}) '+X(T)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)}}
				]
			}}
		}
	},
	DTFS:{
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
			intdiff:function(t,T,x,X){return{
				cells:[
					'.|+|+',
					'.|.|.'
				],
				time:[
					{formula:{item:x(t)}},
					{formula:{
						item:x(t)+'-'+x(t+'-1'),
						notes:{b:'first difference'}
					}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'(1-e^{-j'+T+'\\omega_0}) '+X(T)}}
				]
			}}
		}
	},
	DFT:{
		name:'Discrete Fourier transform (DFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
		timeFnTemplate:['x[n]','y[n]'],
		freqFnTemplate:['X[k]','Y[k]'],
		sections:{
			definitions:function(t,T,x,X){return{
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
			linearity:function(t,T,x,X,y,Y,ctx){
				var t1=ctx.letter(['n','m']);
				var T1=ctx.letter(['k','l']);
			return{
				time:[
					{},{},{},
					{formula:{
						item:'\\sum_{'+t1+'=0}^{N-1} '+x(t1)+y(t+'-'+t1),
						notes:{b:'circular convolution'}
					}},
					{formula:{item:x(t)+' \\cdot '+y(t)}}
				],
				freq:[
					{},{},{},
					{formula:{item:X(T)+' \\cdot '+Y(T)}},
					{formula:{
						item:'\\frac{1}{N} \\sum_{'+T1+'=0}^{N-1} '+X(T1)+Y(T+'-'+T1),
						notes:{b:'circular convolution'}
					}}
				]
			}},
			duality:function(t,T,x,X){return{
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
			conjrev:function(){return{
			}},
			modshift:function(t,T,x,X){return{
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
			intdiff:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{
						item:x(t)+'-'+x(t+'-1'),
						notes:{b:'first difference'}
					}},
					{formula:{item:'(1-W_N^{-'+t+'}) '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'(1-W_N^'+T+') '+X(T)}},
					{formula:{
						item:X(T)+'-'+X(T+'-1'),
						notes:{b:'first difference'}
					}}
				]
			}}
		}
	},
	Laplace1:{
		name:'Unilateral Laplace transform',
		wikipedia:'http://en.wikipedia.org/wiki/Laplace_transform',
		timeFnTemplate:['x(t)','y(t)'],
		freqFnTemplate:['X(s)','Y(s)'],
		freqDomainName:'S-domain',
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						// but we can't restore stuff before 0
						item:x(t)+' = \\frac{1}{2\\pi j} \\lim_{\\omega\\to\\infty} \\int\\limits_{\\sigma-j\\omega}^{\\sigma+j\\omega}\\! '+X(T)+' e^{'+T+' '+t+'} \\,\\mathrm{d}'+T,
						notes:{
							t:'synthesis formula;<br /> the contour path of integration is in the '+RoC+' of \\('+X(T)+'\\)',
							b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\);<br />\\('+x(t)+'=0\\) for \\('+t+'&lt;0\\) usually assumed'
						}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\int\\limits_{0^-}^{+\\infty}\\! '+x(t)+' e^{-'+T+' '+t+'} \\,\\mathrm{d}'+t,
						notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
					}}
				]
			}},
			linearity:function(t,T,x,X,y,Y,ctx){
				var t1=ctx.letter(['t','tau','u']);
			return{
				time:[
					{},{},{},
					{formula:{
						// item:x(t)+'*'+y(t)+' = \\int\\limits_{-\\infty}^{+\\infty}\\! '+x(t1)+y(t+'-'+t1)+'\\,\\mathrm{d}'+t1,
						item:x(t)+'*'+y(t)+' = \\int\\limits_0^{'+t+'}\\! '+x(t1)+y(t+'-'+t1)+'\\,\\mathrm{d}'+t1, // TODO what about limits? is it 0- .. t+ ?
						notes:{
							// t:'\\('+x(t)+'='+y(t)+'=0\\) required for \\('+t+'&lt;0\\)',
							// b:'linear convolution'
						}
					}},
					{formula:{item:x(t)+' \\cdot '+y(t)}}
				],
				freq:[
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.X+'\\)'}}},
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.Y+'\\)'}}},
					{formula:{notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}}},
					{formula:{
						item:X(T)+' \\cdot '+Y(T),
						notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}
					}},
					{formula:{
						// see [The Handbook of Formulas and Tables for Signal Processing. Ed. Alexander D. Poularikas] for the definition of complex convolution
						item:'\\frac{1}{2\\pi j} '+X(T)+'*'+Y(T),
						notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'} // [Mrinal Mandal, Amir Asif, Continuous and Discrete Time Signals and Systems, isbn 9780521854559, p. 283]
					}}
				]
			}},
			conjrev:function(t,T,x,X){return{
				cells:[
					'.|.|.', // TODO real row deletion
					'+|+|+',
					'.|.|.'
				],
				time:[
					{
						formula:{
							item:'-'+x(t,'*')
						}
					},{
						formula:{
							item:x(t)
						},
						relations:{
							l:{notes:{t:'imaginary'}},
							r:{notes:{t:'real'}}
						}
					},{
						formula:{
							item:x(t,'*'),
							notes:{b:'conjugation'}
						}
					}
				],
				freq:[
					{
						formula:{
							item:'-'+X(T+'^*','*'),
							notes:{b:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X(T),
							notes:{b:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X(T+'^*','*'),
							notes:{b:RoC+' = \\(R\\)'}
						}
					}
				]
			}},
			modshift:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t+'+'+t+'_0'),
						notes:{t:'\\('+x(t+'+'+t+'_0')+'=0\\) for \\('+t+'&lt;0\\) required'}
					}},
					{formula:{item:'e^{-'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t)}},
					{formula:{item:'e^{'+T+'_0 '+t+'}'+x(t)}},
					{formula:{
						item:x(t+'-'+t+'_0'),
						notes:{t:'\\('+x(t+'-'+t+'_0')+'=0\\) for \\('+t+'&lt;0\\) required'}
					}}
				],
				freq:[
					{formula:{
						item:'e^{'+T+' '+t+'_0}'+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X(''+T+'+'+T+'_0'),
						notes:{b:RoC+' = \\(R-\\Re('+T+'_0)\\)'}
					}},
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X(''+T+'-'+T+'_0'),
						notes:{b:RoC+' = \\(R+\\Re('+T+'_0)\\)'}
					}},
					{formula:{
						item:'e^{-'+T+' '+t+'_0}'+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}}
				]
			}},
			intdiff:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}},
					{formula:{item:'-'+t+' '+x(t)}}
				],
				freq:[
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:T+X(T)+'-'+x('0^-'),
						notes:{b:RoC+' includes \\(R\\)'}
					}},
					{formula:{
						item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}}
				]
			}}
		}
	},
	Laplace2:{
		name:'Bilateral Laplace transform',
		wikipedia:'http://en.wikipedia.org/wiki/Two-sided_Laplace_transform',
		timeFnTemplate:['x(t)','y(t)'],
		freqFnTemplate:['X(s)','Y(s)'],
		freqDomainName:'S-domain',
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi j} \\lim_{\\omega\\to\\infty} \\int\\limits_{\\sigma-j\\omega}^{\\sigma+j\\omega}\\! '+X(T)+' e^{'+T+' '+t+'} \\,\\mathrm{d}'+T,
						notes:{
							t:'synthesis formula;<br /> the contour path of integration is in the '+RoC+' of \\('+X(T)+'\\)',
							b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'
						}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\int\\limits_{-\\infty}^{+\\infty}\\! '+x(t)+' e^{-'+T+' '+t+'} \\,\\mathrm{d}'+t,
						notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
					}}
				]
			}},
			linearity:function(t,T,x,X,y,Y,ctx){
				var t1=ctx.letter(['t','tau','u']);
			return{
				time:[
					{},{},{},
					{formula:{
						item:x(t)+'*'+y(t)+' = \\int\\limits_{-\\infty}^{+\\infty}\\! '+x(t1)+y(t+'-'+t1)+'\\,\\mathrm{d}'+t1,
						notes:{b:'linear convolution'}
					}},
					{formula:{item:x(t)+' \\cdot '+y(t)}}
				],
				freq:[
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.X+'\\)'}}},
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.Y+'\\)'}}},
					{formula:{notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}}},
					{formula:{
						item:X(T)+' \\cdot '+Y(T),
						notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}
					}},
					{formula:{
						item:'\\frac{1}{2\\pi j} '+X(T)+'*'+Y(T),
						notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'} // [Mrinal Mandal, Amir Asif, Continuous and Discrete Time Signals and Systems, isbn 9780521854559, p. 283]
					}}
				]
			}},
			conjrev:function(t,T,x,X){return{ // http://www.engr.sjsu.edu/kghadiri/EE112/Lecture_Notes/EE_112_Lecture%2010-The%20Laplace%20Transform.pdf
				freq:[
					{
						formula:{
							item:'-'+X('-'+T+'^*','*'),
							notes:{t:RoC+' = \\(-R\\)'}
						}
					},{
						formula:{
							item:'-'+X('-'+T),
							notes:{t:RoC+' = \\(-R\\)'}
						}
					},{
						formula:{
							item:'-'+X(T+'^*','*'),
							notes:{b:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X(T),
							notes:{b:RoC+' = \\(R\\)'}
						},
						relations:{
							t:{notes:{r:'odd'}},
							b:{notes:{l:'even'}},
							l:{notes:{b:null}},
							r:{notes:{t:null}},
							tl:{notes:{l:null}},
							br:{notes:{r:null}},
						}
					},{
						formula:{
							item:X(T+'^*','*'),
							notes:{t:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X('-'+T),
							notes:{b:RoC+' = \\(-R\\)'}
						}
					},{
						formula:{
							item:X('-'+T+'^*','*'),
							notes:{b:RoC+' = \\(-R\\)'}
						}
					}
				]
			}},
			modshift:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t+'+'+t+'_0')}},
					{formula:{item:'e^{-'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t)}},
					{formula:{item:'e^{'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t+'-'+t+'_0')}}
				],
				freq:[
					{formula:{
						item:'e^{'+T+' '+t+'_0}'+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X(''+T+'+'+T+'_0'),
						notes:{b:RoC+' = \\(R-\\Re('+T+'_0)\\)'}
					}},
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X(''+T+'-'+T+'_0'),
						notes:{b:RoC+' = \\(R+\\Re('+T+'_0)\\)'}
					}},
					{formula:{
						item:'e^{-'+T+' '+t+'_0}'+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}}
				]
			}},
			intdiff:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}},
					{formula:{item:'-'+t+' '+x(t)}}
				],
				freq:[
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:T+' '+X(T),
						notes:{b:RoC+' includes \\(R\\)'}
					}},
					{formula:{
						item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}}
				]
			}}
		}
	},
	Z1:{
		name:'Unilateral Z-transform',
		wikipedia:'http://en.wikipedia.org/wiki/Z-transform#Unilateral_Z-transform',
		timeFnTemplate:['x[n]','y[n]'],
		freqFnTemplate:['X(z)','Y(z)'],
		freqDomainName:'Z-domain',
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi j} \\oint_C'+X(T)+'z^{'+t+'-1} \\,\\mathrm{d}'+T,
						notes:{
							t:'synthesis formula;<br /> C is a counterclockwise closed path encircling the origin and entirely in the '+RoC+' of \\('+X(T)+'\\)',
							b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)'
						}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\sum_{'+t+'=0}^{+\\infty} '+x(t)+'z^{-'+t+'}',
						notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
					}}
				]
			}}
		}
	},
	Z2:{
		name:'Bilateral Z-transform',
		wikipedia:'http://en.wikipedia.org/wiki/Z-transform',
		timeFnTemplate:['x[n]','y[n]'],
		freqFnTemplate:['X(z)','Y(z)'],
		freqDomainName:'Z-domain',
		sections:{
			definitions:function(t,T,x,X){return{
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi j} \\oint_C'+X(T)+'z^{'+t+'-1} \\,\\mathrm{d}'+T,
						notes:{
							t:'synthesis formula;<br /> C is a counterclockwise closed path encircling the origin and entirely in the '+RoC+' of \\('+X(T)+'\\)',
							b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)'
						}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\sum_{'+t+'=-\\infty}^{+\\infty} '+x(t)+'z^{-'+t+'}',
						notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
					}}
				]
			}},
			linearity:function(t,T,x,X,y,Y,ctx){
				var t1=ctx.letter(['n','m']);
			return{
				cells:[
					'+|.|+',
					'+ + +',
					'+ + +',
					'. . .', // time multiplication is different - skip it
				],
				time:[
					{},{},{},
					{formula:{
						item:x(t)+'*'+y(t)+' = \\sum_{'+t1+'=-\\infty}^{+\\infty} '+x(t1)+y(t+'-'+t1),
						notes:{b:'linear convolution'}
					}}
				],
				freq:[
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.X+'\\)'}}},
					{formula:{notes:{b:RoC+' = \\(R_'+ctx.letters.Y+'\\)'}}},
					{formula:{notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}}},
					{formula:{
						item:X(T)+' \\cdot '+Y(T),
						notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}
					}}
				]
			}},
			conjrev:function(t,T,x,X){return{
				freq:[
					{
						formula:{
							item:'-'+X('\\frac 1 {'+T+'^*}','*'),
							notes:{t:RoC+' = \\(\\frac 1 R\\)'}
						}
					},{
						formula:{
							item:'-'+X('\\frac 1 '+T),
							notes:{t:RoC+' = \\(\\frac 1 R\\)'}
						}
					},{
						formula:{
							item:'-'+X(T+'^*','*'),
							notes:{b:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X(T),
							notes:{b:RoC+' = \\(R\\)'}
						},
						relations:{
							t:{notes:{r:null}},
							b:{notes:{l:null}},
							l:{notes:{b:null}},
							r:{notes:{t:null}},
							tl:{notes:{l:null}},
							br:{notes:{r:null}},
						}
					},{
						formula:{
							item:X(T+'^*','*'),
							notes:{t:RoC+' = \\(R\\)'}
						}
					},{
						formula:{
							item:X('\\frac 1 '+T),
							notes:{b:RoC+' = \\(\\frac 1 R\\)'}
						}
					},{
						formula:{
							item:X('\\frac 1 {'+T+'^*}','*'),
							notes:{b:RoC+' = \\(\\frac 1 R\\)'}
						}
					}
				]
			}},
			modshift:function(t,T,x,X,y,Y,ctx){
				var T1=ctx.letter(['omega','theta','xi']);
			return{
				cells:[
					'+|+|.',
					'+|+|+',
					'.|+|+'
				],
				time:[
					{formula:{
						item:T+'_0^{-'+t+'}'+x(t),
						notes:{b:null,t:null}
					}},
					{formula:{
						item:x(t+'+'+t+'_0'),
						notes:{b:null,t:'time shifting'}
					}},
					{formula:{
						item:'e^{-j'+T1+'_0 '+t+'}'+x(t),
						notes:{b:null,t:'modulation'}
					}},
					{formula:{
						item:x(t),
						notes:{b:null,t:null}
					}},
					{formula:{
						item:'e^{j'+T1+'_0 '+t+'}'+x(t),
						notes:{b:null,t:'modulation'}
					}},
					{formula:{
						item:x(t+'-'+t+'_0'),
						notes:{b:null,t:'time shifting'}
					}},
					{formula:{
						item:T+'_0^'+t+x(t),
						notes:{b:null,t:null}
					}}
				],
				freq:[
					{formula:{
						item:X(T+'_0'+T),
						notes:{
							t:'z-domain scaling',
							b:RoC+' = \\(|'+T+'_0^{-1}|R\\)'}
					}},
					{formula:{
						item:'z^{'+t+'_0}'+X(T),
						notes:{b:
							'if \\('+t+'_0 &gt; 0\\), '+RoC+' includes \\(R \\setminus \\{\\infty\\} \\);<br />'+
							'if \\('+t+'_0 &lt; 0\\), '+RoC+' includes \\(R \\setminus \\{0\\} \\)'
						}
					}},
					{formula:{
						item:X('e^{j'+T1+'_0}'+T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:X('e^{-j'+T1+'_0}'+T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:'z^{-'+t+'_0}'+X(T),
						notes:{b:
							'if \\('+t+'_0 &gt; 0\\), '+RoC+' includes \\(R \\setminus \\{0\\} \\);<br />'+
							'if \\('+t+'_0 &lt; 0\\), '+RoC+' includes \\(R \\setminus \\{\\infty\\} \\)'
						}
					}},
					{formula:{
						item:X(T+'_0^{-1}'+T),
						notes:{
							t:'z-domain scaling',
							b:RoC+' = \\(|'+T+'_0|R\\)'
						}
					}}
				]
			}},
			intdiff:function(t,T,x,X){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{
						item:x(t)+'-'+x(t+'-1'),
						notes:{b:'first difference'}
					}},
					{formula:{item:t+x(t)}}
				],
				freq:[
					{formula:{
						item:X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}},
					{formula:{
						item:'(1-'+T+'^{-1})'+X(T),
						notes:{b:RoC+' includes \\(R \\setminus \\{0\\} \\)'}
					}},
					{formula:{
						item:'-'+T+' \\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T),
						notes:{b:RoC+' = \\(R\\)'}
					}}
				]
				// also true: -(n-1)x[n-1] <-> (d/dz) X(z), RoC includes R\{0}
				//	problem: changes RoC, while their version doesn't
			}}
		}
	}
};
