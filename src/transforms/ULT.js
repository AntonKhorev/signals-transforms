$.fn.signalsTransformsTable.transforms.ULT={
	name:'Unilateral Laplace transform',
	abbr:'ULT',
	wikipedia:'http://en.wikipedia.org/wiki/Laplace_transform',
	timeFnTemplate:['x(t)','y(t)'],
	freqFnTemplate:['X(s)','Y(s)'],
	freqDomainName:'S-domain',
	sections:{
		definitions:function(t,T,x,X,y,Y,ctx){
			var TR=ctx.letter(['sigma','varsigma']);
			var TI=ctx.letter(['omega','theta','xi']);
		return{
			time:[
				{formula:{
					// but we can't restore stuff before 0
					item:x(t)+' = \\frac{1}{2\\pi j} \\lim_{'+TI+'\\to\\infty} '+ctx.int(X(T)+'e^{'+T+t+'}',T,TR+'-j'+TI,TR+'+j'+TI),
					notes:{
						t:'synthesis formula;<br /> the contour path of integration is in the '+RoC+' of \\('+X(T)+'\\)',
						b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\);<br />\\('+x(t)+'=0\\) for \\('+t+'&lt;0\\) usually assumed'
					}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = '+ctx.int(x(t)+'e^{-'+T+t+'}',t,'0^-','+\\infty'),
					notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
				}}
			]
		}},
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['s','lambda']);
			var TR=ctx.letter(['sigma','varsigma']);
		return{
			time:[
				{},{},{},
				{formula:{
					// sometimes limits are -inf..+inf, but then causality of x(t) and y(t) is required
					item:x(t)+'*'+y(t)+' \\equiv '+ctx.int(x(t1)+y(t+'-'+t1),t1,'0',t), // TODO what about limits? is it 0- .. t+ ?
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
				// see [The Handbook of Formulas and Tables for Signal Processing. Ed. Alexander D. Poularikas] for the definition of complex convolution
				{formula:{ // [Wai-Kai Chen, section 3.3.5]
					item:'\\frac{1}{2\\pi j} '+X(T)+'*'+Y(T)+' \\equiv \\frac{1}{2\\pi j} '+ctx.int(X(T1)+Y(T+'-'+T1),T1,TR+'-j\\infty',TR+'+j\\infty'),
					notes:{
						t:'s-domain convolution',
						b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)' // [Mandal, p. 283]
					}
				}}
			]
		}},
		conjrev:function(t,T,x,X){return{
			cells:
				'+|*|+',
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
					},
					relations:{
						l:{},
						r:{}
					}
				},{
					formula:{
						item:X(T+'^*','*'),
						notes:{b:RoC+' = \\(R\\)'}
					}
				}
			]
		}},
		modshift:function(t,T,x,X,y,Y,ctx){return{
			cells:
				'+ + +'+'/'+
				'+|*|+'+'/'+
				'+ + +',
			time:[
				{formula:{
					item:x(t+'+'+t+'_0'),
					notes:{b:'\\('+t+'_0 &gt; 0\\)',t:'time advance'}
				}},
				{formula:{
					item:'e^{-'+T+'_0'+t+'}'+x(t)
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:'e^{'+T+'_0'+t+'}'+x(t)
				}},
				{formula:{
					item:x(t+'-'+t+'_0'),
					notes:{b:'\\('+t+'_0 &gt; 0\\)',t:'time delay'}
				}}
			],
			freq:[
				{formula:{
					item:'e^{'+T+t+'_0}'+X(T)+'-e^{'+T+t+'_0}'+ctx.int(x(t)+'e^{-'+T+t+'}',t,'0^-',t+'_0^-'),
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
					item:'e^{-'+T+' '+t+'_0}'+X(T)+'+e^{-'+T+' '+t+'_0}'+ctx.int(x(t)+'e^{-'+T+t+'}',t,'(-'+t+'_0)^-','0^-'),
					notes:{b:RoC+' = \\(R\\)'}
				}}
			]
		}},
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
			var T1=ctx.letter(['s','lambda']);
			var n=ctx.letter(['n','m','k']);
		return{
			cells:
				'+|+|.'+'/'+
				'+|*|+'+'/'+
				'.|+|.'+'/'+
				'+ + +'+'/'+
				'+ + +',
			time:[
				{formula:{
					item:ctx.int(x(t1),t1,'-\\infty',t)
				}},
				{formula:{
					item:ctx.int(x(t1),t1,'0^-',t)
				}},
				{formula:{
					item:'\\frac{1}{'+t+'}'+x(t)
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:'-'+t+' '+x(t)
				}},
				{formula:{
					item:x(t,"'")
				}},
				{formula:{
					item:x(t,"''")
				}},
				{formula:{
					item:x(t,"("+n+")")
				}}
			],
			freq:[
				{formula:{
					item:'\\frac{'+X(T)+'}{'+T+'}+\\frac{1}{'+T+'}'+ctx.int(x(t),t,'-\\infty','0^-'),
					notes:{b:RoC+' includes \\(R \\cap \\{\\Re('+T+')&gt;0\\}\\)'}
				}},
				{formula:{
					item:'\\frac{1}{'+T+'}'+X(T),
					notes:{b:RoC+' includes \\(R \\cap \\{\\Re('+T+')&gt;0\\}\\)'}
				}},
				{formula:{
					item:ctx.int(X(T1),T1,T,'\\infty')
					// TODO RoC?
				}},
				{formula:{
					item:X(T),
					notes:{b:RoC+' = \\(R\\)'}
				}},
				{formula:{
					item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T),
					notes:{b:RoC+' = \\(R\\)'}
				}},
				{formula:{
					item:T+X(T)+'-'+x('0^-'),
					notes:{b:RoC+' includes \\(R\\)'}
				}},
				{formula:{
					item:T+'^2'+X(T)+'-'+x('0^-')+T+'-'+x('0^-',"'"),
					notes:{b:RoC+' includes \\(R\\)'}
				}},
				{formula:{
					item:T+'^'+n+X(T)+'{-}'+x('0^-')+T+'^{'+n+'-1}{-}'+x('0^-',"'")+T+'^{'+n+'-2}{-}\\cdots{-}'+x('0^-',"("+n+"-1)"),
					notes:{b:RoC+' includes \\(R\\)'}
				}}
			]
		}},
		impstep:function(t,T,x,X){return{
			cells:
				'.|+|.'+'/'+
				'.|+|.',
			time:[
				{formula:{
					item:'\\delta('+t+')',
					notes:{b:'Dirac delta'+Wiki('http://en.wikipedia.org/wiki/Dirac_delta_function')}
				}},
				{formula:{
					item:'u('+t+')',
					notes:{b:'unit step'+Wiki('http://en.wikipedia.org/wiki/Heaviside_step_function')}
				}}
			],
			freq:[
				{formula:{
					item:'1',
					notes:{b:RoC+': all \\('+T+'\\)'}
				}},
				{formula:{
					item:'\\frac{1}{'+T+'}',
					notes:{b:RoC+': \\(\\Re('+T+')&gt;0\\)'}
				}}
			]
		}}
	}
};
