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
			$(this).find('tr:nth-child(2)').html(
				"<td colspan='"+nDomainCols+"' class='time'>"+
					'$$F^{-1}\\{'+section.freq[i].formula.item+'\\}='+section.time[i].formula.item+'$$'+
				"</td>"+
				"<td class='both'></td>"+
				"<td colspan='"+nDomainCols+"' class='freq'>"+
					'$$F\\{'+section.time[i].formula.item+'\\}='+section.freq[i].formula.item+'$$'+
				"</td>"
			);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,this]);
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
