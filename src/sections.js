var sectionIds=[ // sections ordering
	'definitions',
	'linearity',
	'duality',
	'conjrev',
	'modshift',
	'intdiff'
];
var sections={
	definitions:function(t,T,x,X){return{
		name:'Definitions',
		cells:[
			'+ + + + + +'
		],
		time:[
			{formula:{notes:{t:'synthesis formula'}}}
		],
		freq:[
			{formula:{notes:{t:'analysis formula'}}},
		]
	}},
	linearity:function(t,T,x,X,y,Y){return{
		name:'Linearity, convolution and multiplication',
		cells:[
			// '+|+ + + +|+' // can't have it - ff and ie make table too wide

			// '+ +|+ +|+ +' // can't have it - ff and ie make table too wide ()

			'+ + +|+ + +',
			'+ + + + + +',
			'+ + + + + +',
			'+ + + + + +',
		],
		time:[
			// {formula:{item:x(t)}},
			// {formula:{item:'a'+x(t)+'+b'+y(t)}},
			// {formula:{item:y(t)}}

			{formula:{item:x(t)}},
			{formula:{item:y(t)}},
			{formula:{item:'a'+x(t)+'+b'+y(t)}}
		],
		freq:[
			// {formula:{item:X(T)}},
			// {formula:{item:'a'+X(T)+'+b'+Y(T)}},
			// {formula:{item:Y(T)}}

			{formula:{item:X(T)}},
			{formula:{item:Y(T)}},
			{formula:{item:'a'+X(T)+'+b'+Y(T)}}
		]
		// see this before adding correlation: http://mathworld.wolfram.com/Cross-Correlation.html
	}},
	duality:function(t,T,x,X){return{
		name:'Duality',
		cells:[
			'+ +|+ +|+ +'
		]
	}},
	conjrev:function(t,T,x,X){return{
		name:'Complex conjugation and time/frequency reversal',
		cells:[
			'+ +|+ +|. .',
			'+ +|+ +|+ +',
			'. .|+ +|+ +'
		],
		time:[
			{
				formula:{
					item:'-'+x('-'+t,'*')
				}
			},{
				formula:{
					item:'-'+x('-'+t)
				}
			},{
				formula:{
					item:'-'+x(t,'*')
				}
			},{
				formula:{
					item:x(t)
				},
				relations:{
					t:{notes:{r:'odd'}},
					b:{notes:{l:'even'}},
					l:{notes:{b:'imaginary'}},
					r:{notes:{t:'real'}},
					tl:{notes:{l:'conjugate antisymmetric'}},
					br:{notes:{r:'conjugate symmetric'}}
				}
			},{
				formula:{
					item:x(t,'*'),
					notes:{t:'conjugation'}
				}
			},{
				formula:{
					item:x('-'+t),
					notes:{b:'time reversal'}
				}
			},{
				formula:{
					item:x('-'+t,'*'),
					notes:{b:'conjugation and time reversal'}
				}
			}
		],
		freq:[
			{
				formula:{
					item:'-'+X(T,'*')
				}
			},{
				formula:{
					item:'-'+X('-'+T)
				}
			},{
				formula:{
					item:'-'+X('-'+T,'*')
				}
			},{
				formula:{
					item:X(T)
				},
				relations:{
					t:{notes:{r:'odd'}},
					b:{notes:{l:'even'}},
					l:{notes:{b:'conjugate antisymmetric'}},
					r:{notes:{t:'conjugate symmetric'}},
					tl:{notes:{l:'imaginary'}},
					br:{notes:{r:'real'}},
				}
			},{
				formula:{
					item:X('-'+T,'*'),
					notes:{t:'conjugation and frequency reversal'}
				}
			},{
				formula:{
					item:X('-'+T),
					notes:{b:'frequency reversal'}
				}
			},{
				formula:{
					item:X(T,'*'),
					notes:{b:'conjugation'}
				}
			}
		]
	}},
	modshift:function(t,T,x,X){return{
		name:'Modulation and time/frequency shifting',
		cells:[
			'. .|+ +|. .',
			'+ +|+ +|+ +',
			'. .|+ +|. .'
		],
		time:[
			{formula:{notes:{b:'time shifting'}}},
			{formula:{notes:{b:'modulation'}}},
			{},
			{formula:{notes:{b:'modulation'}}},
			{formula:{notes:{b:'time shifting'}}}
		],
		freq:[
			{formula:{notes:{b:'modulation'}}},
			{formula:{notes:{b:'frequency shifting'}}},
			{},
			{formula:{notes:{b:'frequency shifting'}}},
			{formula:{notes:{b:'modulation'}}}
		],
	}},
	intdiff:function(t,T,x,X){return{
		name:'Integration and differentiation',
		cells:[
			'. .|+ +|+ +',
			'. .|+ +|. .'
		]
	}}
};
