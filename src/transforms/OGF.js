$.fn.signalsTransformsTable.transforms.OGF={
	name:'Ordinary generating function',
	abbr:'OGF',
	wikipedia:'http://en.wikipedia.org/wiki/Generating_function#Ordinary_generating_function',
	timeFnTemplate:['a_n','b_n'],
	freqFnTemplate:['A(z)','B(z)'],
	timeDomainName:'sequence',
	freqDomainName:'generating function',
	sections:{
		definitions:function(t,T,x,X){return{
			time:[
				{formula:{
					item:x(t),
					notes:{
						t:null,
						b:'sequence \\('+x('0')+', '+x('1')+', '+x('2')+',...,'+x(t)+',...\\)'
					}
				}}
			],
			freq:[
				{formula:{
					item:X(T)+' = \\sum_{'+t+' \\geq 0} '+x(t)+T+'^'+t,
					notes:{b:'formal power series \\('+X(T)+'\\)'} // formal power series = don't care about RoC
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
				'. . .', // skip multiplication
			],
			time:[
				{},{},{},
				{formula:{
					item:x(t)+'*'+y(t)+' = \\sum_{0\\leq'+t1+'\\leq'+t+'} '+x(t1)+y(t+'-'+t1),
					notes:{b:'convolution'}
				}}
			],
			freq:[
				{},{},{},
				{formula:{
					item:X(T)+' \\cdot '+Y(T)
				}}
			]
		}},
		// conjrev makes no sense: can't do reversal and sequence is always real
		modshift:function(t,T,x,X,y,Y,ctx){
			var T1=ctx.letter(['lambda']);
		return{
			time:[
				{formula:{
					item:x(t+'+1'),
					notes:{b:'left shift'}
				}},
				{formula:{
					item:T1+'^{-'+t+'}'+x(t),
					notes:{b:'multiplication by an exponential sequence'}
				}},
				{formula:{item:x(t)}},
				{formula:{
					item:T1+'^'+t+x(t),
					notes:{b:'multiplication by an exponential sequence'}
				}},
				{formula:{
					item:x(t+'-1'),
					notes:{b:'right shift'}
				}}
			],
			freq:[
				{formula:{
					item:'\\frac{'+X(T)+'-'+x('0')+'}{'+T+'}',
					notes:{b:null}
				}},
				{formula:{
					item:X(T1+'^{-1}'+T),
					notes:{b:'scaling'}
				}},
				{formula:{item:X(T)}},
				{formula:{
					item:X(T1+T),
					notes:{b:'scaling'}
				}},
				{formula:{
					item:T+X(T),
					notes:{b:null}
				}}
			]
		}},
		intdiff:function(t,T,x,X,y,Y,ctx){
			var t1=ctx.letter(['n','m']);
		return{
			time:[
				{formula:{
					item:'\\sum_{0 \\leq '+t1+' \\leq '+t+'}'+x(t1)
				}},
				{formula:{
					item:x(t)
				}},
				{formula:{
					item:x(t)+'-'+x(t+'-1'),
					notes:{
						t:'first difference',
						b:'\\('+x('0')+', '+x('1')+'-'+x('0')+',...,'+x(t)+'-'+x(t+'-1')+',...\\)'
					}
				}},
				{formula:{
					item:'('+t+'+1)'+x(t+'+1')
				}}
			],
			freq:[
				{formula:{
					item:'\\frac{1}{1-'+T+'}'+X(T)
				}},
				{formula:{
					item:X(T)
				}},
				{formula:{
					item:'(1-'+T+')'+X(T)
				}},
				{formula:{
					item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)
				}}
			]
		}}
	}
};
