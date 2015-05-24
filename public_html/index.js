$(function(){
	function parseFunctionOptions(argument,options){
		if (typeof(options)==='undefined') options='';
		var needBrackets = (argument.indexOf('+')>=0) || (argument.indexOf('-')>=0);
		return {
			conj:	options.indexOf('*')>=0?'^*':'',
			rev:	options.indexOf('-')>=0?'-':'',
			open:	needBrackets?'(':'',
			close:	needBrackets?')':'',
		};
	};
	var nDomainCols=3;
	var iDefaultTransform=1;
	var sections=[{
		id:'definitions',
		name:'Definitions',
		cells:[
			//'+ + +'
			'+ . .'
		],
		timeNotes:['synthesis formula'],
		freqNotes:['analysis formula']
	},{
		id:'modshift',
		name:'Modulation and time/frequency shifting',
		cells:[
			'.|+|.',
			'+|+|+',
			'.|+|.',
		],
		timeNotes:['time shifting','modulation',null,'modulation','time shifting'],
		freqNotes:['modulation','frequency shifting',null,'frequency shifting','modulation']
	},{
		id:'intdiff',
		name:'Integration and differentiation',
		cells:[
			'.|+|+',
			'.|+|.'
		]
	}];
	var transforms=[{
		name:'Continuous-time Fourier transform (CTFT)', // angular frequency, non-unitary
		wikipedia:'http://en.wikipedia.org/wiki/Fourier_transform',
		timeDefinitionNote:'function \\(x(t)\\) of continuous variable \\(t\\)',
		freqDefinitionNote:'function \\(X(j\\omega)\\) of continuous variable \\(\\omega\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'('+(inv?'-':'')+'t)';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'('+(inv?'-':'')+'j\\omega)';
		},
		timeVar:'t',
		freqVar:'\\omega',
		timeFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'x'+o.conj+'('+o.rev+arg+')';
		},
		freqFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'X'+o.conj+'('+o.rev+'j'+o.open+arg+o.close+')';
		},
		sections:{
			definitions:function(x,X,t,T){return{
				time:[x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T],
				freq:[X(T)+' = \\int\\limits_{-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'} \\,\\mathrm{d}'+t]
			}},
			modshift:function(x,X,t,T){return{
				time:[x(t+'+'+t+'_0'),'e^{-j'+T+'_0 '+t+'}'+x(t),x(t),'e^{j'+T+'_0 '+t+'}'+x(t),x(t+'-'+t+'_0')],
				freq:['e^{j'+T+' '+t+'_0}'+X(T),X(''+T+'+'+T+'_0'),X(T),X(''+T+'-'+T+'_0'),'e^{-j'+T+' '+t+'_0}'+X(T)]
			}},
			intdiff:function(x,X,t,T){return{
				time:[x(t),'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t),'-j '+t+' '+x(t)],
				freq:[X(T),'j'+T+' '+X(T),'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)]
			}}
		}
	},{
		name:'Discrete-time Fourier transform (DTFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
		timeDefinitionNote:'function \\(x[n]\\) of discrete variable \\(n\\)',
		freqDefinitionNote:'periodic function \\(X(e^{j\\omega})\\) of continuous variable \\(\\omega\\)<br /> with period \\(2\\pi\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'(e^{'+(inv?'-':'')+'j\\omega})';
		},
		timeVar:'n',
		freqVar:'\\omega',
		timeFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'x'+o.conj+'['+o.rev+arg+']';
		},
		freqFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'X'+o.conj+'(e^{'+o.rev+'j'+o.open+arg+o.close+'})';
		},
		sections:{
			definitions:function(x,X,t,T){return{
				time:[x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T],
				freq:[X(T)+' = \\sum_{'+t+'=-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'}']
			}},
			modshift:function(x,X,t,T){return{
				time:[x(t+'+'+t+'_0'),'e^{-j'+T+'_0 '+t+'}'+x(t),x(t),'e^{j'+T+'_0 '+t+'}'+x(t),x(t+'-'+t+'_0')],
				freq:['e^{j'+T+' '+t+'_0}'+X(T),X(''+T+'+'+T+'_0'),X(T),X(''+T+'-'+T+'_0'),'e^{-j'+T+' '+t+'_0}'+X(T)]
			}},
			intdiff:function(x,X,t,T){return{
				time:[x(t),x(t)+'-'+x(t+'-1'),'-j '+t+' '+x(t)],
				freq:[X(T),'(1-e^{-j'+T+'}) '+X(T),'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)]
			}}
		}
	},{
		name:'Discrete Fourier transform (DFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
		timeDefinitionNote:'function \\(x[n]\\) of discrete variable \\(n\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)',
		freqDefinitionNote:'function \\(X[k]\\) of discrete variable \\(k\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'['+(inv?'-':'')+'k]';
		},
		timeVar:'n',
		freqVar:'k',
		timeFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'x'+o.conj+'['+o.rev+arg+']';
		},
		freqFn:function(arg,opts){
			var o=parseFunctionOptions(arg,opts);
			return 'X'+o.conj+'['+o.rev+arg+']';
		},
		sections:{
			definitions:function(x,X,t,T){return{
				time:[x(t)+' = \\frac 1 N \\sum_{'+T+'=0}^{N-1} '+X(T)+' W_N^{-'+T+' '+t+'}'],
				freq:[X(T)+' = \\sum_{'+t+'=0}^{N-1} '+x(t)+' W_N^{'+T+' '+t+'}']
			}},
			modshift:function(x,X,t,T){return{
				time:[x(t+'+'+t+'_0'),'W_N^{'+T+'_0 n}'+x(t),x(t),'W_N^{-'+T+'_0 n}'+x(t),x(t+'-'+t+'_0')],
				freq:['W_N^{-'+T+' '+t+'_0}'+X(T),X(T+'+'+T+'_0'),X(T),X(T+'-'+T+'_0'),'W_N^{'+T+' '+t+'_0}'+X(T)]
			}},
			intdiff:function(x,X,t,T){return{
				time:[x(t),x(t)+'-'+x(t+'-1'),'(1-W_N^{-'+t+'}) '+x(t)],
				freq:[X(T),'(1-W_N^'+T+') '+X(T),X(T)+'-'+X(T+'-1')]
			}}
		}
	}];
	var conjinvTimePatterns=[
		[1,1,1],[1,1,0],
		[1,0,1],[0,0,0],[0,0,1],
		        [0,1,0],[0,1,1]
	];
	var conjinvFreqPatterns=[
		[1,0,1],[1,1,0],
		[1,1,1],[0,0,0],[0,1,1],
		        [0,1,0],[0,0,1]
	];
	$('.signal-transform-properties').each(function(){
		var tableNode=$(this);
		var lineNode=$("<div class='line'><div class='arrowhead top' /><div class='arrowhead bottom' /></div>");

		function writeTransform(transform){
			sections.forEach(function(section){
				// TODO check here if transform.sections contain key
				function preventTextSelectionOnDoubleClick(ev){
					ev.preventDefault();
				};
				var tbodyNode=$("<tbody />");
				tbodyNode.append(
					$("<tr />").append(
						$("<th colspan='7' role='button'>"+section.name+"</th>").click(function(ev){
							tbodyNode.removeClass('hidden');
						}).mousedown(preventTextSelectionOnDoubleClick)
					)
				);
				section.cells.forEach(function(row){
					var trNode=$("<tr />");
					function makeDomainCells(domain){
						for (var i=0;i<nDomainCols;i++) {
							var tdNode=$("<td class='"+domain+"' />");
							if (row.charAt(i*2)=='+') {
								tdNode.append("<div class='cell'><div class='formula' /></div>");
							}
							trNode.append(tdNode);
						}
					};
					makeDomainCells('time');
					trNode.append("<td class='both' />");
					makeDomainCells('freq');
					tbodyNode.append(trNode);
				});
				tableNode.append(tbodyNode);
				$("<div class='cell' />").append($("<div class='hide' role='button' title='hide section'>• • •</div>").click(function(ev){
					tbodyNode.addClass('hidden');
				}).mousedown(preventTextSelectionOnDoubleClick)).appendTo(tbodyNode.find('td.both').eq(0));
				var transformSection=transform.sections[section.id](transform.timeFn,transform.freqFn,transform.timeVar,transform.freqVar);
				var timeFormulaNodes=tbodyNode.find('td.time .formula');
				var freqFormulaNodes=tbodyNode.find('td.freq .formula');
				timeFormulaNodes.each(function(i){
					var timeFormulaNode=timeFormulaNodes.eq(i).append("<div class='item'>$$"+transformSection.time[i]+"$$</div>");
					if ('timeNotes' in section && section.timeNotes[i]!==null) {
						timeFormulaNode.append("<div class='note'>"+section.timeNotes[i]+"</div>");
					}
					var freqFormulaNode=freqFormulaNodes.eq(i).append("<div class='item'>$$"+transformSection.freq[i]+"$$</div>");
					if ('freqNotes' in section && section.freqNotes[i]!==null) {
						freqFormulaNode.append("<div class='note'>"+section.freqNotes[i]+"</div>");
					}
					timeFormulaNode.add(freqFormulaNode).hover(function(){
						timeFormulaNode.addClass('active');
						freqFormulaNode.addClass('active');
						var tOffset=timeFormulaNode.offset();
						var fOffset=freqFormulaNode.offset();
						var tWidth =timeFormulaNode.width();
						var tHeight=timeFormulaNode.height();
						lineNode.appendTo(timeFormulaNode)
							.offset({top:tOffset.top+tHeight/2-2,left:tOffset.left+tWidth})
							.width(fOffset.left-tOffset.left-tWidth)
						;
					},function(){
						lineNode.detach();
						timeFormulaNode.removeClass('active');
						freqFormulaNode.removeClass('active');
					});
				});
			});
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		};

		// transform selection dropdown
		var captionNode=tableNode.find('caption');
		var transformSelectNode=null;
		captionNode.wrapInner("<span class='signal-transform-dropdown' role='button'>");
		var transformDropdownNode=captionNode.find('.signal-transform-dropdown');
		transformDropdownNode.click(function(){
			if (transformSelectNode===null) {
				transformSelectNode=$("<ul class='signal-transform-select' />");
				transforms.forEach(function(transform){
					transformSelectNode.append(
						$("<li role='button'>"+transform.name+"</li>").click(function(){
							transformSelectNode.remove();
							transformSelectNode=null;
							transformDropdownNode.html(transform.name+"<sup><a href='"+transform.wikipedia+"'>[W]</a></sup>");
							// rewrite formulas
							/*
							tableElm.find('.signal-transform-properties-definition td.time .formula .item').text('$$'+transform.timeDefinition+'$$');
							tableElm.find('.signal-transform-properties-definition td.freq .formula .item').text('$$'+transform.freqDefinition+'$$');
							tableElm.find('.signal-transform-properties-definition td.time .formula .note.at-b').html(transform.timeDefinitionNote);
							tableElm.find('.signal-transform-properties-definition td.freq .formula .note.at-b').html(transform.freqDefinitionNote);
							tableElm.find('.signal-transform-properties-conjinv td.time .formula .item').text(function(i){
								return '$$'+transform.conjinvTimeFormula.apply(null,conjinvTimePatterns[i])+'$$';
							});
							tableElm.find('.signal-transform-properties-conjinv td.freq .formula .item').text(function(i){
								return '$$'+transform.conjinvFreqFormula.apply(null,conjinvFreqPatterns[i])+'$$';
							});
							*/
							tableNode.find('tbody').remove();
							writeTransform(transform);
						})
					);
				});
				captionNode.append(transformSelectNode);
			} else {
				transformSelectNode.remove();
				transformSelectNode=null;
			}
		});

		writeTransform(transforms[iDefaultTransform]);

		// interactive elements of the table
		/*
		tableElm.find('tbody').each(function(){
			// TODO reimplement
			var timeLinkElms=tbodyElm.find('td.time .link');
			var freqLinkElms=tbodyElm.find('td.freq .link');
			timeLinkElms.each(function(i){
				var timeLinkElm=timeLinkElms.eq(i);
				var freqLinkElm=freqLinkElms.eq(i);
                                var correctedOneLine=false;
				timeLinkElm.add(freqLinkElm).hover(function(){
					timeLinkElm.addClass('active');
					freqLinkElm.addClass('active');
					// single-line vs multiple-line note detection
					function correctOneLine() {
						var elm=$(this);
						if (!elm.hasClass('at-l') && !elm.hasClass('at-r')) return;
						var t=$("<span style='visibility:hidden'>|</span>").prependTo(elm); // span height will be 0 on chrome unless non-whitespace character is inserted
						var h1=t.height();
						t.remove();
						elm.wrapInner("<span />");
						var h2=elm.children('span').height();
						if (h1>=h2) {
							elm.addClass('one-line');
						}
					}
					if (!correctedOneLine) {
						timeLinkElm.find('.note').each(correctOneLine);
						freqLinkElm.find('.note').each(correctOneLine);
						correctedOneLine=true;
					}
				},function(){
					timeLinkElm.removeClass('active');
					freqLinkElm.removeClass('active');
				});
			});
		});
		*/
		// $$\overset{\mathcal F}{\rightarrow}$$
	});
});
