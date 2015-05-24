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
			'+ + +'
		],
		time:[
			{formula:{notes:{t:'synthesis formula'}}}
		],
		freq:[
			{formula:{notes:{t:'analysis formula'}}},
		]
	},{
		id:'conjrev',
		name:'Complex conjugation and time reversal',
		cells:[
			'+|+|.',
			'+|+|+',
			'.|+|+'
		],
		time:[
			{},{},{},{},
			{formula:{notes:{t:'conjugation'}}},
			{formula:{notes:{b:'time reversal'}}},
			{formula:{notes:{b:'conjugation and time reversal'}}}
		],
		freq:[
			{},{},{},{},
			{formula:{notes:{t:'conjugation and frequency reversal'}}},
			{formula:{notes:{b:'frequency reversal'}}},
			{formula:{notes:{b:'conjugation'}}}
		]
	},{
		id:'modshift',
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
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
						notes:{b:'function \\('+x(t)+'\\) of continuous variable \\('+t+'\\)'}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\int\\limits_{-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'} \\,\\mathrm{d}'+t,
						notes:{b:'function \\('+X(T)+'\\) of continuous variable \\('+T+'\\)'}
					}}
				]
			}},
			conjrev:function(x,X,t,T){return{
				time:[
					{formula:{item:'-'+x('-'+t,'*')}},
					{formula:{item:'-'+x('-'+t)}},
					{formula:{item:'-'+x(t,'*')}},
					{formula:{item:x(t)}},
					{formula:{item:x(t,'*')}},
					{formula:{item:x('-'+t)}},
					{formula:{item:x('-'+t,'*')}}
				],
				freq:[
					{formula:{item:'-'+X(T,'*')}},
					{formula:{item:'-'+X('-'+T)}},
					{formula:{item:'-'+X('-'+T,'*')}},
					{formula:{item:X(T)}},
					{formula:{item:X('-'+T,'*')}},
					{formula:{item:X('-'+T)}},
					{formula:{item:X(T,'*')}}
				]
			}},
			modshift:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t+'+'+t+'_0')}},
					{formula:{item:'e^{-j'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t)}},
					{formula:{item:'e^{j'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t+'-'+t+'_0')}}
				],
				freq:[
					{formula:{item:'e^{j'+T+' '+t+'_0}'+X(T)}},
					{formula:{item:X(''+T+'+'+T+'_0')}},
					{formula:{item:X(T)}},
					{formula:{item:X(''+T+'-'+T+'_0')}},
					{formula:{item:'e^{-j'+T+' '+t+'_0}'+X(T)}}
				]
			}},
			intdiff:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+t+'} '+x(t)}},
					{formula:{item:'-j '+t+' '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'j'+T+' '+X(T)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)}}
				]
			}}
		}
	},{
		name:'Discrete-time Fourier transform (DTFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
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
				time:[
					{formula:{
						item:x(t)+' = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} '+X(T)+' e^{j'+T+' '+t+'} \\,\\mathrm{d}'+T,
						notes:{b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)'}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\sum_{'+t+'=-\\infty}^{+\\infty} '+x(t)+' e^{-j'+T+' '+t+'}',
						notes:{b:'periodic function \\('+X(T)+'\\) of continuous variable \\('+T+'\\)<br /> with period \\(2\\pi\\)'}
					}}
				]
			}},
			modshift:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t+'+'+t+'_0')}},
					{formula:{item:'e^{-j'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t)}},
					{formula:{item:'e^{j'+T+'_0 '+t+'}'+x(t)}},
					{formula:{item:x(t+'-'+t+'_0')}}
				],
				freq:[
					{formula:{item:'e^{j'+T+' '+t+'_0}'+X(T)}},
					{formula:{item:X(''+T+'+'+T+'_0')}},
					{formula:{item:X(T)}},
					{formula:{item:X(''+T+'-'+T+'_0')}},
					{formula:{item:'e^{-j'+T+' '+t+'_0}'+X(T)}}
				]
			}},
			intdiff:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{item:x(t)+'-'+x(t+'-1')}},
					{formula:{item:'-j '+t+' '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'(1-e^{-j'+T+'}) '+X(T)}},
					{formula:{item:'\\frac{\\mathrm{d}}{\\mathrm{d}'+T+'} '+X(T)}}
				]
			}}
		}
	},{
		name:'Discrete Fourier transform (DFT)',
		wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
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
				time:[
					{formula:{
						item:x(t)+' = \\frac 1 N \\sum_{'+T+'=0}^{N-1} '+X(T)+' W_N^{-'+T+' '+t+'}',
						notes:{b:'function \\('+x(t)+'\\) of discrete variable \\('+t+'\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)'}
					}}
				],
				freq:[
					{formula:{
						item:X(T)+' = \\sum_{'+t+'=0}^{N-1} '+x(t)+' W_N^{'+T+' '+t+'}',
						notes:{b:'function \\('+X(T)+'\\) of discrete variable \\('+T+'\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)'}
					}}
				]
			}},
			modshift:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t+'+'+t+'_0')}},
					{formula:{item:'W_N^{'+T+'_0 n}'+x(t)}},
					{formula:{item:x(t)}},
					{formula:{item:'W_N^{-'+T+'_0 n}'+x(t)}},
					{formula:{item:x(t+'-'+t+'_0')}}
				],
				freq:[
					{formula:{item:'W_N^{-'+T+' '+t+'_0}'+X(T)}},
					{formula:{item:X(T+'+'+T+'_0')}},
					{formula:{item:X(T)}},
					{formula:{item:X(T+'-'+T+'_0')}},
					{formula:{item:'W_N^{'+T+' '+t+'_0}'+X(T)}}
				]
			}},
			intdiff:function(x,X,t,T){return{
				time:[
					{formula:{item:x(t)}},
					{formula:{item:x(t)+'-'+x(t+'-1')}},
					{formula:{item:'(1-W_N^{-'+t+'}) '+x(t)}}
				],
				freq:[
					{formula:{item:X(T)}},
					{formula:{item:'(1-W_N^'+T+') '+X(T)}},
					{formula:{item:X(T)+'-'+X(T+'-1')}}
				]
			}}
		}
	}];
	$('.signal-transform-properties').each(function(){
		var tableNode=$(this);
		var lineNode=$("<div class='line'><div class='arrowhead top' /><div class='arrowhead bottom' /></div>");

		function writeTransform(transform){
			sections.forEach(function(sectionCommon){
				if (!(sectionCommon.id in transform.sections)) return;
				sectionSpecific=transform.sections[sectionCommon.id](transform.timeFn,transform.freqFn,transform.timeVar,transform.freqVar);
				section=$.extend(true,{},sectionCommon,sectionSpecific);

				// make section title and cells
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
				$("<div class='cell' />").append($("<div class='hide' role='button' title='hide section'>• • •</div>").click(function(ev){
					tbodyNode.addClass('hidden');
				}).mousedown(preventTextSelectionOnDoubleClick)).appendTo(tbodyNode.find('td.both').eq(0));

				// put in formulas and notes
				var timeFormulaNodes=tbodyNode.find('td.time .formula');
				var freqFormulaNodes=tbodyNode.find('td.freq .formula');
				timeFormulaNodes.each(function(i){
					var time=section.time[i];
					var freq=section.freq[i];
					var timeFormulaNode=timeFormulaNodes.eq(i).append("<div class='item'>$$"+time.formula.item+"$$</div>");
					if ('notes' in time.formula) $.each(time.formula.notes,function(dir,note){
						timeFormulaNode.append("<div class='note at-"+dir+"'>"+note+"</div>");
					});
					var freqFormulaNode=freqFormulaNodes.eq(i).append("<div class='item'>$$"+freq.formula.item+"$$</div>");
					if ('notes' in freq.formula) $.each(freq.formula.notes,function(dir,note){
						freqFormulaNode.append("<div class='note at-"+dir+"'>"+note+"</div>");
					});
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
