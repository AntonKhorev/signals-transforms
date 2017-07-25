$.fn.signalsTransformsTable.transforms.BLT={
	name:'Bilateral Laplace transform',
	abbr:'BLT',
	wikipedia:'http://en.wikipedia.org/wiki/Two-sided_Laplace_transform',
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
					item:x(t)+' = \\frac{1}{2\\pi j} \\lim_{'+TI+'\\to\\infty} '+ctx.int(X(T)+'e^{'+T+t+'}',T,TR+'-j'+TI,TR+'+j'+TI),
					notes:{
						t:'synthesis formula;<br /> the contour path of integration is in the '+RoC+' of \\('+X(T)+'\\)',
						b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'
					}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = '+ctx.int(x(t)+'e^{-'+T+t+'}',t,'-\\infty','+\\infty'),
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
					item:x(t)+'*'+y(t)+' \\equiv '+ctx.int(x(t1)+y(t+'-'+t1),t1,'-\\infty','+\\infty'),
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
				{formula:{ // [Wai-Kai Chen, section 3.3.5]
					item:'\\frac{1}{2\\pi j} '+X(T)+'*'+Y(T)+' \\equiv \\frac{1}{2\\pi j} '+ctx.int(X(T1)+Y(T+'-'+T1),T1,TR+'-j\\infty',TR+'+j\\infty'),
					notes:{
						t:'s-domain convolution',
						b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)' // [Mandal, p. 283]
					}
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
		modshift:function(t,T,x,X,y,Y,ctx){return{
			cells:
				'.|+|.'+'/'+
				'+|*|+'+'/'+
				'.|+|.'+'/'+
				'.|+|.',
			time:[
				{formula:{item:x(t+'+'+t+'_0')}},
				{formula:{item:'e^{-'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t)}},
				{formula:{item:'e^{'+T+'_0 '+t+'}'+x(t)}},
				{formula:{item:x(t+'-'+t+'_0')}},
				{formula:{
					item:x(ctx.a+t),
					notes:{b:'\\('+ctx.a+' &gt; 0\\)',t:'time scaling'}
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
				}},
				{formula:{
					item:'\\frac1{'+ctx.a+'}'+X('\\frac{'+T+'}{'+ctx.a+'}'),
					notes:{b:RoC+': \\(\\frac{'+T+'}{'+ctx.a+'} \\in R\\)'}
				}}
			]
		}},
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['t','tau','u']);
		return{
			time:[
				{formula:{item:ctx.int(x(t1),t1,'-\\infty',t)}},
				{formula:{item:x(t)}},
				{formula:{item:'-'+t+' '+x(t)}},
				{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}}
			],
			freq:[
				{formula:{
					item:'\\frac{1}{'+T+'}'+X(T),
					notes:{b:RoC+' includes \\(R \\cap \\{\\Re('+T+')&gt;0\\}\\)'}
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
					item:T+' '+X(T),
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
