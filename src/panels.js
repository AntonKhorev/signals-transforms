$.fn.signalsTransformsTable.allPanels=
$.fn.signalsTransformsTable.includedPanels=[
	'explanation'
	// 'proof'
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
		update:function(ev,transform,section,i){
			function pair(dom1,dom2,inv){
				if (!section.hasExplanations[i]) {
					return 'N/A';
				}
				var tr=transform.abbr;
				if ('transforms' in section && section.transforms[i]!==null) {
					tr=section.transforms[i];
				}
				return '$$\\mathtt{'+tr+'}'+inv+'\\!\\left\\{'+dom2[i].formula.item+'\\right\\}='+dom1[i].formula.item+'$$';
			}
			$(this).find('tr:nth-child(2)').html(
				"<td colspan='"+nDomainCols+"' class='time'>"+
					pair(section.time,section.freq,'^{-1}')+
				"</td>"+
				"<td class='both'></td>"+
				"<td colspan='"+nDomainCols+"' class='freq'>"+
					pair(section.freq,section.time,'')+
				"</td>"
			);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,this]);
		}
	}/*,
	proof:{
		name:'Proof',
		init:function(){
			$(this).children('tr:first-child').after(
				"<tr><td colspan='"+(nDomainCols*2+1)+"'>"+
				"select a transform property formula for a proof"+
				"</td></tr>"
			);
		},
		update:function(ev,transform,section,i){
			// temporary code
			$(this).find('tr:nth-child(2) td').text(transform.abbr+' '+section.name+' '+i);
		}
	}*/
};
