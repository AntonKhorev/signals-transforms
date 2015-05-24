$(function(){
	function parseOptionsAndArgument(options,argument,defaultArgument){
		if (typeof(options)==='undefined') options='';
		if (typeof(argument)==='undefined') argument=defaultArgument;
		return {
			conj:	options.indexOf('*')>=0?'^*':'',
			rev:	options.indexOf('-')>=0?'-':'',
			open:	options.indexOf('(')>=0?'(':'',
			close:	options.indexOf('(')>=0?')':'',
			arg:	argument
		};
	};
	var nDomainCols=3;
	var iDefaultTransform=1;
	var sections=[{
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
		timeDefinition:'x(t) = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} X(j\\omega) e^{j\\omega t} \\,\\mathrm{d}\\omega',
		freqDefinition:'X(j\\omega) = \\int\\limits_{-\\infty}^{+\\infty} x(t) e^{-j\\omega t} \\,\\mathrm{d}t',
		timeDefinitionNote:'function \\(x(t)\\) of continuous variable \\(t\\)',
		freqDefinitionNote:'function \\(X(j\\omega)\\) of continuous variable \\(\\omega\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'('+(inv?'-':'')+'t)';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'('+(inv?'-':'')+'j\\omega)';
		},
		timeFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'t');
			return 'x'+oa.conj+'('+oa.rev+oa.arg+')';
		},
		freqFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'\\omega');
			return 'X'+oa.conj+'('+oa.rev+'j'+oa.open+oa.arg+oa.close+')';
		},
		sections:{
			modshift:function(x,X){return{
				time:[x('(','t+t_0'),'e^{-j\\omega_0 t}'+x(),x(),'e^{j\\omega_0 t}'+x(),x('(','t-t_0')],
				freq:['e^{j\\omega t_0}'+X(),X('(','\\omega+\\omega_0'),X(),X('(','\\omega-\\omega_0'),'e^{-j\\omega t_0}'+X()]
			}},
			intdiff:function(x,X){return{
				time:[x(),'\\frac{\\mathrm{d}}{\\mathrm{d}t} '+x(),'-j t '+x()],
				freq:[X(),'j\\omega '+X(),'\\frac{\\mathrm{d}}{\\mathrm{d}\\omega} '+X()]
			}}
		}
	},{
		name:'Discrete-time Fourier transform (DTFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
		timeDefinition:'x[n] = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} X(e^{j\\omega}) e^{j\\omega n} \\,\\mathrm{d}\\omega',
		freqDefinition:'X(e^{j\\omega}) = \\sum_{n=-\\infty}^{+\\infty} x[n] e^{-j\\omega n}',
		timeDefinitionNote:'function \\(x[n]\\) of discrete variable \\(n\\)',
		freqDefinitionNote:'periodic function \\(X(e^{j\\omega})\\) of continuous variable \\(\\omega\\)<br /> with period \\(2\\pi\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'(e^{'+(inv?'-':'')+'j\\omega})';
		},
		timeFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'n');
			return 'x'+oa.conj+'['+oa.rev+oa.arg+']';
		},
		freqFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'\\omega');
			return 'X'+oa.conj+'(e^{'+oa.rev+'j'+oa.open+oa.arg+oa.close+'})';
		},
		sections:{
			modshift:function(x,X){return{
				time:[x('(','n+n_0'),'e^{-j\\omega_0 n}'+x(),x(),'e^{j\\omega_0 n}'+x(),x('(','n+n_0')],
				freq:['e^{j\\omega n_0}'+X(),X('(','\\omega+\\omega_0'),X(),X('(','\\omega-\\omega_0'),'e^{-j\\omega n_0}'+X()]
			}},
			intdiff:function(x,X){return{
				time:[x(),x()+'-'+x('(','n-1'),'-j n '+x()],
				freq:[X(),'(1-e^{-j\\omega}) '+X(),'\\frac{\\mathrm{d}}{\\mathrm{d}\\omega} '+X()]
			}}
		}
	},{
		name:'Discrete Fourier transform (DFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
		timeDefinition:'x[n] = \\frac 1 N \\sum_{k=0}^{N-1} X[k] W_N^{-kn}',
		freqDefinition:'X[k] = \\sum_{n=0}^{N-1} x[n] W_N^{kn}',
		timeDefinitionNote:'function \\(x[n]\\) of discrete variable \\(n\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)',
		freqDefinitionNote:'function \\(X[k]\\) of discrete variable \\(k\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)',
		conjinvTimeFormula:function(neg,inv,conj){
			return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
		},
		conjinvFreqFormula:function(neg,inv,conj){
			return (neg?'-':'')+'X'+(conj?'^*':'')+'['+(inv?'-':'')+'k]';
		},
		timeFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'n');
			return 'x'+oa.conj+'['+oa.rev+oa.arg+']';
		},
		freqFn:function(options,argument){
			var oa=parseOptionsAndArgument(options,argument,'k');
			return 'X'+oa.conj+'['+oa.rev+oa.arg+']';
		},
		sections:{
			modshift:function(x,X){return{
				time:[x('(','n+n_0'),'W_N^{k_0 n}'+x(),x(),'W_N^{-k_0 n}'+x(),x('(','n+n_0')],
				freq:['W_N^{-k n_0}'+X(),X('(','k+k_0'),X(),X('(','k-k_0'),'W_N^{k n_0}'+X()]
			}},
			intdiff:function(x,X){return{
				time:[x(),x()+'-'+x('(','n-1'),'(1-W_N^{-n}) '+x()],
				freq:[X(),'(1-W_N^k) '+X(),X()+'-'+X('(','n-1')]
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
				var transformSection=transform.sections[section.id](transform.timeFn,transform.freqFn);
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
