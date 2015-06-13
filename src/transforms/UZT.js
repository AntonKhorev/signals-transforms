$.fn.signalsTransformsTable.transforms.UZT={
	name:'Unilateral Z-transform',
	abbr:'UZT',
	wikipedia:'http://en.wikipedia.org/wiki/Z-transform#Unilateral_Z-transform',
	timeFnTemplate:['x[n]','y[n]'],
	freqFnTemplate:['X(z)','Y(z)'],
	freqDomainName:'Z-domain',
	sections:{
		definitions:function(t,T,x,X){return{
			time:[
				{formula:{
					item:x(t)+' = \\frac{1}{2\\pi j} \\oint_C'+X(T)+T+'^{'+t+'-1} \\,\\mathrm{d}'+T,
					notes:{
						t:'synthesis formula;<br /> C is a counterclockwise closed path encircling the origin and entirely in the '+RoC+' of \\('+X(T)+'\\)',
						b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\);<br />\\('+x(t)+'=0\\) for \\('+t+'&lt;0\\) usually assumed'
					}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\sum_{'+t+'=0}^{\\infty} '+x(t)+T+'^{-'+t+'}',
					notes:{b:'function \\('+X(T)+'\\) of complex variable \\('+T+'\\)'}
				}}
			]
		}},
		linearity:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['z','lambda']);
		return{
			time:[
				{},{},{},
				{formula:{
					item:x(t)+'*'+y(t)+' = \\sum_{'+t1+'=0}^{'+t+'} '+x(t1)+y(t+'-'+t1) // [Poularikas], slightly modified
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{formula:{notes:{b:
					RoC+' = \\(R_'+ctx.letters.X+'\\)<br />'+
					RoC+': \\(R_{'+ctx.letters.X+'-} &lt; |'+T+'| &lt; R_{'+ctx.letters.X+'+}\\)'
				}}},
				{formula:{notes:{
					b:RoC+' = \\(R_'+ctx.letters.Y+'\\)<br />'+
					RoC+': \\(R_{'+ctx.letters.Y+'-} &lt; |'+T+'| &lt; R_{'+ctx.letters.Y+'+}\\)'
				}}},
				{formula:{notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}}},
				{formula:{
					item:X(T)+' \\cdot '+Y(T),
					notes:{b:RoC+' includes \\(R_'+ctx.letters.X+' \\cap R_'+ctx.letters.Y+'\\)'}
				}},
				{formula:{ // [Wai-Kai Chen, section 5.4.3]
					item:'\\frac{1}{2\\pi j} \\oint_C '+X(T1)+Y('\\tfrac{'+T+'}{'+T1+'}')+T1+'^{-1} \\,\\mathrm{d}'+T1,
					notes:{
						t:'z-domain convolution',
						b:
							RoC+': \\(R_{'+ctx.letters.X+'-}R_{'+ctx.letters.Y+'-} &lt; |'+T+'| &lt; R_{'+ctx.letters.X+'+}R_{'+ctx.letters.Y+'+}\\);<br />'+
							'C is a counterclockwise closed path in the intersection of the '+RoC+'s of \\('+X(T1)+'\\) and \\('+Y('\\frac{'+T+'}{'+T1+'}')+'\\)'
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
		modshift:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
			var T1=ctx.letter(['omega','theta','xi']);
		return{
			cells:
				'+|+ +'+'/'+
				'+|*|+'+'/'+
				'+ +|+',
			time:[
				{formula:{
					item:'e^{-j'+T1+'_0 '+t+'}'+x(t),
					notes:{b:null,t:'modulation'}
				}},
				{formula:{
					item:x(t+'+'+t+'_0'),
					notes:{b:'\\('+t+'_0 &gt; 0\\)',t:'time advance'}
				}},
				{formula:{
					item:T+'_0^{-'+t+'}'+x(t),
					notes:{b:null,t:'multiplication by an exponential sequence'}
				}},
				{formula:{
					item:x(t),
					notes:{b:null,t:null}
				}},
				{formula:{
					item:T+'_0^'+t+x(t),
					notes:{b:null,t:'multiplication by an exponential sequence'}
				}},
				{formula:{
					item:x(t+'-'+t+'_0'),
					notes:{b:'\\('+t+'_0 &gt; 0\\)',t:'time delay'}
				}},
				{formula:{
					item:'e^{j'+T1+'_0 '+t+'}'+x(t),
					notes:{b:null,t:'modulation'}
				}},
			],
			freq:[
				{formula:{
					item:X('e^{j'+T1+'_0}'+T),
					notes:{b:RoC+' = \\(R\\)'}
				}},
				{formula:{ // [Mandal]
					item:'z^{'+t+'_0}'+X(T)+'-'+T+'^{'+t+'_0} \\sum_{'+t1+'=0}^{'+t+'_0-1}'+T+'^{-'+t1+'}'+x(t1),
					notes:{b:
						RoC+' includes \\(R \\setminus \\{\\infty\\} \\)' // TODO re-check RoC
					}
				}},
				{formula:{
					item:X(T+'_0'+T),
					notes:{
						t:'z-domain scaling',
						b:RoC+' = \\(|'+T+'_0^{-1}|R\\)'
					}
				}},
				{formula:{
					item:X(T),
					notes:{b:RoC+' = \\(R\\)'}
				}},
				{formula:{
					item:X(T+'_0^{-1}'+T),
					notes:{
						t:'z-domain scaling',
						b:RoC+' = \\(|'+T+'_0|R\\)'
					}
				}},
				{formula:{
					item:'z^{-'+t+'_0}'+X(T)+'+'+T+'^{-'+t+'_0} \\sum_{'+t1+'=1}^{'+t+'_0}'+T+'^'+t1+x('-'+t1),
					notes:{b:
						RoC+' includes \\(R \\setminus \\{0\\} \\)'
					}
				}},
				{formula:{
					item:X('e^{-j'+T1+'_0}'+T),
					notes:{b:RoC+' = \\(R\\)'}
				}}
			]
		}},
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
		return{
			time:[
				{formula:{item:'\\sum_{'+t1+'=0}^{'+t+'}'+x(t1)}},
				{formula:{item:x(t)}},
				{formula:{
					item:x(t)+'-'+x(t+'-1'),
					notes:{b:'first difference'}
				}},
				{formula:{
					item:t+x(t),
					notes:{b:'multiplication by a ramp'}
				}}
			],
			freq:[
				{formula:{
					item:'\\frac{1}{1-'+T+'^{-1}}'+X(T),
					notes:{b:RoC+' includes \\(R \\cap \\{|'+T+'|&gt;1\\}\\)'} // [Mandal]
				}},
				{formula:{
					item:X(T),
					notes:{b:RoC+' = \\(R\\)'}
				}},
				{formula:{
					item:'(1-'+T+'^{-1})'+X(T)+'-'+x('-1'),
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
};
