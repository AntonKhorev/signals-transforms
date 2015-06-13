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
				function trans(i){
					var tr=transform.abbr;
					if ('transforms' in section && section.transforms[i]!==null) {
						tr=section.transforms[i];
					}
					return '\\mathtt{'+tr+'}'+inv+'\\!\\left\\{'+dom2[i].formula.item+'\\right\\}='+dom1[i].formula.item;
				}
				var ics=section.iConditions;
				if (ics.indexOf(i)>=0 || ics.length==0) {
					return '$$'+trans(i)+'$$';
				} else if (ics.length==1) {
					return '\\begin{multline}'+
						trans(ics[0])+
					' \\iff \\\\ \\iff '+
						trans(i)+
					'\\end{multline}';
				} else {
					return '\\begin{multline}'+
						'\\begin{cases}'+
							$.map(ics,function(i){
								return trans(i);
							}).join('\\\\')+
						'\\end{cases}'+
					' \\implies \\\\ \\implies '+
						trans(i)+
					'\\end{multline}';
				}
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
