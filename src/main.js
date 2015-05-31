$.fn.signalsTransformsTable=function(options){ // plugin main fn

if (typeof(options)==='undefined') options={};

var includedSections=$.fn.signalsTransformsTable.includedSections;
if ('includedSections' in options) {
	includedSections=options.includedSections;
}

var sections=$.fn.signalsTransformsTable.sections;
if ('sections' in options) {
	sections=$.extend(true,{},sections,options.sections);
}

var includedTransforms=$.fn.signalsTransformsTable.includedTransforms;
if ('includedTransforms' in options) {
	includedTransforms=options.includedTransforms;
}

var selectedTransform=$.fn.signalsTransformsTable.selectedTransform;
if ('selectedTransform' in options) {
	selectedTransform=options.selectedTransform;
}
if (!(selectedTransform in includedTransforms)) {
	selectedTransform=includedTransforms[0];
}

var transformCommon=$.fn.signalsTransformsTable.transformCommon;
if ('transformCommon' in options) {
	transformCommon=$.extend(true,{},transformCommon,options.transformCommon);
}

var transforms=$.fn.signalsTransformsTable.transforms;
if ('transforms' in options) {
	transforms=$.extend(true,{},transforms,options.transforms);
}

return this.each(function(){
	var nDomainCols=3;

	// section collapsed/shown status for this table
	var isSectionCollapsed={};
	$.each(sections,function(id,_){
		isSectionCollapsed[id]=false;
	});

	function preventTextSelectionOnDoubleClick(ev){
		ev.preventDefault();
	};

	var containerNode=$(this).empty();
	var tableNode=$("<table class='signals-transforms-table' />").appendTo(containerNode);
	var arrowNode=$("<div class='arrow'>"+
		"<div class='arrowhead at-tl' /><div class='arrowhead at-bl' />"+
		"<div class='arrowhead at-tr' /><div class='arrowhead at-br' />"+
	"</div>");

	function writeTransform(transformSpecific){
		var transform=$.extend(true,{},transformCommon,transformSpecific);
		tableNode.append(
			"<thead><tr class='some-browsers-ignore-col-elements'>"+
				Array(nDomainCols*2+2).join("<td />")+
			"</tr><tr>"+
				"<th colspan='"+nDomainCols+"' class='time'>"+transform.timeDomainName+"</th>"+
				"<th class='both'></th>"+
				"<th colspan='"+nDomainCols+"' class='freq'>"+transform.freqDomainName+"</th>"+
			"</tr></thead>"
		);

		var ctx=FormulaContext(transform.timeFnTemplate,transform.freqFnTemplate);
		$.each(includedSections,function(_,id){
			if (!(id in transform.sections)) return;
			var sectionCommon=ctx.callSection(sections[id]);
			var sectionSpecific=ctx.callSection(transform.sections[id]);
			section=$.extend(true,{},sectionCommon,sectionSpecific);

			// make section title and cells
			var tbodyNode=$("<tbody />");
			if (isSectionCollapsed[id]) {
				tbodyNode.addClass('is-collapsed');
			}
			tbodyNode.append(
				$("<tr />").append(
					$("<th colspan='"+(nDomainCols*2+1)+"' role='button'><div class='cell'>"+section.name+"</div></th>").click(function(ev){
						isSectionCollapsed[id]=false;
						tbodyNode.removeClass('is-collapsed');
					}).mousedown(preventTextSelectionOnDoubleClick)
				)
			);
			$.each(section.cells,function(_,row){
				var trNode=$("<tr />");
				function makeDomainCells(domain){
					var colspan=0;
					var isFormula=false;
					for (var i=0;i<=row.length;i++) {
						switch (i<row.length ? row.charAt(i) : '|') {
						case '+':
							isFormula=true;
						case '.':
							colspan++;
							break;
						case '|':
							var tdNode=$("<td class='"+domain+"' colspan='"+colspan+"' />");
							if (isFormula) {
								tdNode.append("<div class='cell'><div class='formula' /></div>");
							}
							trNode.append(tdNode);
							colspan=0;
							isFormula=false;
						}
					}
				};
				makeDomainCells('time');
				trNode.append("<td class='both' />");
				makeDomainCells('freq');
				tbodyNode.append(trNode);
			});
			tableNode.append(tbodyNode);
			$("<div class='cell' />").append($("<div class='collapse' role='button' title='collapse section'>• • •</div>").click(function(ev){
				tbodyNode.addClass('is-collapsed');
				isSectionCollapsed[id]=true;
			}).mousedown(preventTextSelectionOnDoubleClick)).appendTo(tbodyNode.find('td.both').eq(0));

			// put in formulas, relations and notes
			var timeFormulaNodes=tbodyNode.find('td.time .formula');
			var freqFormulaNodes=tbodyNode.find('td.freq .formula');
			timeFormulaNodes.each(function(i){
				function insertStuff(formulaNode,data){
					function insertNotes(node,data){
						if ('notes' in data) $.each(data.notes,function(dir,note){
							if (note!==null) {
								node.append("<div class='note at-"+dir+"'>"+note+"</div>");
							}
						});
					};
					formulaNode.append("<div class='item'>$$"+data.formula.item+"$$</div>");
					insertNotes(formulaNode,data.formula);
					if ('relations' in data) $.each(data.relations,function(dir,relation){
						var relationNode=$("<div class='relation at-"+dir+"' />").insertAfter(formulaNode);
						insertNotes(relationNode,relation);
						relationNode.on('item:highlight',function(){
							$(this).addClass('is-highlighted');
						}).on('item:unhighlight',function(){
							$(this).removeClass('is-highlighted');
						}).one('item:highlight',function(){
							// single-line vs multiple-line note detection
							$(this).find('.note').each(function(){
								var node=$(this);
								if (!node.hasClass('at-l') && !node.hasClass('at-r')) return;
								var t=$("<span style='visibility:hidden'>|</span>").prependTo(node); // span height will be 0 on chrome unless non-whitespace character is inserted
								var h1=t.height();
								t.remove();
								node.wrapInner("<span />");
								var h2=node.children('span').height();
								if (h1>=h2) {
									node.addClass('one-line');
								}
							});
						});
					});
				};
				var timeFormulaNode=timeFormulaNodes.eq(i);
				var freqFormulaNode=freqFormulaNodes.eq(i);
				insertStuff(timeFormulaNode,section.time[i]);
				insertStuff(freqFormulaNode,section.freq[i]);

				function placeArrow(timeNode,freqNode,vShift,hGap){
					if (typeof(hGap)==='undefined') hGap=0;
					var tTop   =timeNode.offset().top;
					var tLeft  =timeNode.offset().left;
					var fLeft  =freqNode.offset().left;
					var tWidth =timeNode.outerWidth();
					var tHeight=timeNode.height();
					timeNode.find('.note.at-r').eq(0).each(function(){
						tLeft=$(this).offset().left;
						tWidth=$(this).outerWidth();
					});
					freqNode.find('.note.at-l').eq(0).each(function(){
						fLeft=$(this).offset().left;
					});
					arrowNode.appendTo(timeNode)
						.offset({
							top:tTop+tHeight/2-vShift,
							left:tLeft+tWidth+hGap
						}).width(fLeft-tLeft-tWidth-2*hGap);
				}

				// formula pairs
				timeFormulaNode.add(freqFormulaNode).hover(function(){
					timeFormulaNode.addClass('is-highlighted');
					freqFormulaNode.addClass('is-highlighted');
					placeArrow(timeFormulaNode,freqFormulaNode,2);
				},function(){
					arrowNode.detach();
					timeFormulaNode.removeClass('is-highlighted');
					freqFormulaNode.removeClass('is-highlighted');
				});

				// relation pairs
				$.each(['t','b','l','r','tl','tr','bl','br'],function(_,dir){
					var timeRelationNode=timeFormulaNode.siblings('.relation.at-'+dir);
					var freqRelationNode=freqFormulaNode.siblings('.relation.at-'+dir);
					timeRelationNode.add(freqRelationNode).hover(function(){
						timeRelationNode.trigger('item:highlight');
						freqRelationNode.trigger('item:highlight');
						placeArrow(timeRelationNode,freqRelationNode,4,4);
					},function(){
						arrowNode.detach();
						timeRelationNode.trigger('item:unhighlight');
						freqRelationNode.trigger('item:unhighlight');
					});
				});
			});
		});
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	};

	// table caption with transform selection dropdown
	var captionNode=$('<caption />').appendTo(tableNode);
	function writeTransformCaption(transform){
	        captionNode.text(transform.name);
		if ('wikipedia' in transform) {
			captionNode.append("<sup><a href='"+transform.wikipedia+"'>[W]</a></sup>");
		}
		if (includedTransforms.length>1) {
			captionNode.wrapInner("<div class='signal-transform-dropdown' role='button' />");
			var transformDropdownNode=captionNode.children().eq(0);
			var transformSelectNode=$("<ul class='signal-transform-select' />");
			$.each(includedTransforms,function(_,id){
				var transform=transforms[id];
				transformSelectNode.append(
					$("<li role='button'>"+transform.name+"</li>").click(function(){
						writeTransformCaption(transform);
						tableNode.find('thead,tbody').remove();
						writeTransform(transform);
					}).mousedown(preventTextSelectionOnDoubleClick)
				);
			});
			transformDropdownNode.append(transformSelectNode).click(function(){
				transformDropdownNode.toggleClass('is-open');
			}).mousedown(preventTextSelectionOnDoubleClick);
		}
	};
	writeTransformCaption(transforms[selectedTransform]);

	// table header section
	tableNode.append(
		"<colgroup class='time'>"+Array(nDomainCols+1).join("<col />")+"</colgroup>"+
		"<colgroup class='both'><col /></colgroup>"+
		"<colgroup class='freq'>"+Array(nDomainCols+1).join("<col />")+"</colgroup>"
	);

	// transform tabular data
	writeTransform(transforms[selectedTransform]);

	// $$\overset{\mathcal F}{\rightarrow}$$
});

}; // plugin main fn
