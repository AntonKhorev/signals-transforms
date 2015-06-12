$.fn.signalsTransformsTable.allPanels=
$.fn.signalsTransformsTable.includedPanels=[
	'explanation',
	'proof'
];

$.fn.signalsTransformsTable.panels={
	explanation:{
		name:'Explanation',
		init:function(){
			$(this).children('tr:first-child').after(
				"<tr><td colspan='"+(nDomainCols*2+1)+"'>"+
				"select a transform property formula for an explanation"+
				"</td></tr>"
			);
		},
		update:function(ev,section,i){
			// temporary code
			$(this).find('tr:nth-child(2) td').text(section.name+' '+i);
		}
	},
	proof:{
		name:'Proof',
		init:function(){
			$(this).children('tr:first-child').after(
				"<tr><td colspan='"+(nDomainCols*2+1)+"'>"+
				"select a transform property formula for a proof"+
				"</td></tr>"
			);
		},
		update:function(ev,section,i){
			// temporary code
			$(this).find('tr:nth-child(2) td').text(section.name+' '+i);
		}
	}
};
