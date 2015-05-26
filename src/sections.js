var sectionIds=['definitions','duality','conjrev','modshift','intdiff']; // sections ordering
var sections={
	definitions:function(x,X,t,T){return{
		name:'Definitions',
		cells:[
			'+ + +'
		],
		time:[
			{formula:{notes:{t:'synthesis formula'}}}
		],
		freq:[
			{formula:{notes:{t:'analysis formula'}}},
		]
	}},
	duality:function(x,X,t,T){return{
		name:'Duality',
		cells:[
			'+|+|+'
		]
	}},
	conjrev:function(x,X,t,T){return{
		name:'Complex conjugation and time/frequency reversal',
		cells:[
			'+|+|.',
			'+|+|+',
			'.|+|+'
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
	modshift:function(x,X,t,T){return{
		name:'Modulation and time/frequency shifting',
		cells:[
			'.|+|.',
			'+|+|+',
			'.|+|.'
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
	intdiff:function(x,X,t,T){return{
		name:'Integration and differentiation',
		cells:[
			'.|+|+',
			'.|+|.'
		]
	}}
};
