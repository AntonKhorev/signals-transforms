$.fn.signalsTransformsTable.transforms.DFT={
	name:'Discrete Fourier transform',
	abbr:'DFT',
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
					item:x(t)+'\\circledast'+y(t)+' = \\sum_{'+t1+'=0}^{N-1} '+x(t1)+y(t+'-'+t1),
					notes:{b:'circular convolution'}
				}},
				{formula:{item:x(t)+' \\cdot '+y(t)}}
			],
			freq:[
				{},{},{},
				{formula:{item:X(T)+' \\cdot '+Y(T)}},
				{formula:{
					item:'\\frac{1}{N} '+X(T)+'\\circledast'+Y(t)+' = \\frac{1}{N} \\sum_{'+T1+'=0}^{N-1} '+X(T1)+Y(T+'-'+T1),
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
			cells:
				'.|*|+'+'/'+ // skipping time accumulation - no reference gives it, they all want to sum from -inf, would make sense to sum from 0?
				'.|+|.',
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
};
