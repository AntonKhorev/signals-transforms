return this.each(function(){
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
				"<td></td><td></td><td></td><td></td><td></td><td></td><td></td>"+
			"</tr><tr>"+
				"<th colspan='3' class='time'>"+transform.timeDomainName+"</th>"+
				"<th class='both'></th>"+
				"<th colspan='3' class='freq'>"+transform.freqDomainName+"</th>"+
			"</tr></thead>"
		);

		var r=generateFnAndVarFromTemplate(transform.timeFnTemplate[0]);
		var timeFn=r[0];
		var timeVar=r[1];
		var r=generateFnAndVarFromTemplate(transform.freqFnTemplate[0]);
		var freqFn=r[0];
		var freqVar=r[1];
		var r=generateFnAndVarFromTemplate(transform.timeFnTemplate[1]);
		var timeFn1=r[0];
		var r=generateFnAndVarFromTemplate(transform.freqFnTemplate[1]);
		var freqFn1=r[0];
		$.each(sectionIds,function(_,id){
			if (!(id in transform.sections)) return;
			var sectionCommon=sections[id](timeVar,freqVar,timeFn,freqFn,timeFn1,freqFn1);
			var sectionSpecific=transform.sections[id](timeVar,freqVar,timeFn,freqFn,timeFn1,freqFn1);
			section=$.extend(true,{},sectionCommon,sectionSpecific);

			// make section title and cells
			var tbodyNode=$("<tbody />");
			if (isSectionCollapsed[id]) {
				tbodyNode.addClass('is-collapsed');
			}
			tbodyNode.append(
				$("<tr />").append(
					$("<th colspan='7' role='button'>"+section.name+"</th>").click(function(ev){
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

				function placeArrow(timeNode,freqNode,gap){
					if (typeof(gap)==='undefined') gap=0;
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
							top:tTop+tHeight/2-2,
							left:tLeft+tWidth+gap
						}).width(fLeft-tLeft-tWidth-2*gap);
				}

				// formula pairs
				timeFormulaNode.add(freqFormulaNode).hover(function(){
					timeFormulaNode.addClass('is-highlighted');
					freqFormulaNode.addClass('is-highlighted');
					placeArrow(timeFormulaNode,freqFormulaNode);
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
						placeArrow(timeRelationNode,freqRelationNode,4);
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
	var transformSelectNode=null;
	var captionNode=$('<caption />').appendTo(tableNode);
	var transformDropdownNode=$(
		"<span class='signal-transform-dropdown' role='button' />"
	).appendTo(captionNode);
	function writeTransformDropdownNodeHtml(transform){
	        transformDropdownNode.text(transform.name);
		if ('wikipedia' in transform) {
			transformDropdownNode.append("<sup><a href='"+transform.wikipedia+"'>[W]</a></sup>");
		}
	};
	writeTransformDropdownNodeHtml(transforms[iDefaultTransform]);
	transformDropdownNode.click(function(){
		if (transformSelectNode===null) {
			transformSelectNode=$("<ul class='signal-transform-select' />");
			$.each(transforms,function(_,transform){
				transformSelectNode.append(
					$("<li role='button'>"+transform.name+"</li>").click(function(){
						transformSelectNode.remove();
						transformSelectNode=null;
						writeTransformDropdownNodeHtml(transform);
						tableNode.find('thead,tbody').remove();
						writeTransform(transform);
					}).mousedown(preventTextSelectionOnDoubleClick)
				);
			});
			captionNode.append(transformSelectNode);
		} else {
			transformSelectNode.remove();
			transformSelectNode=null;
		}
	}).mousedown(preventTextSelectionOnDoubleClick);

	// table header section
	tableNode.append(
		"<colgroup class='time'><col /><col /><col /></colgroup>"+
		"<colgroup class='both'><col /></colgroup>"+
		"<colgroup class='freq'><col /><col /><col /></colgroup>"
	);

	// transform tabular data
	writeTransform(transforms[iDefaultTransform]);

	// $$\overset{\mathcal F}{\rightarrow}$$
});
