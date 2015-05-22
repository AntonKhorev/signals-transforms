$(function(){
	var transforms=[
		{
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
			modshiftTimeFormula:function(mod,shift){
				return (mod?'e^{'+(mod<0?'-':'')+'j\\omega_0 t}':'')+'x(t'+(shift?(shift<0?'-':'+')+'t_0':'')+')';
			},
			modshiftFreqFormula:function(mod,shift){
				return (mod?'e^{'+(mod<0?'-':'')+'j\\omega t_0}':'')+'X(j'+(shift?'(\\omega'+(shift<0?'-':'+')+'\\omega_0)':'\\omega')+')';
			},
			intdiffFormulas:[
				'x(t)'       ,'\\frac{d}{dt} x(t)',
				'X(j\\omega)','j\\omega X(j\\omega)'
			]
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
			modshiftTimeFormula:function(mod,shift){
				return (mod?'e^{'+(mod<0?'-':'')+'j\\omega_0 n}':'')+'x[n'+(shift?(shift<0?'-':'+')+'n_0':'')+']';
			},
			modshiftFreqFormula:function(mod,shift){
				return (mod?'e^{'+(mod<0?'-':'')+'j\\omega n_0}':'')+'X(e^{j'+(shift?'(\\omega'+(shift<0?'-':'+')+'\\omega_0)':'\\omega')+'})';
			},
			intdiffFormulas:[
				'x[n]'           ,'x[n]-x[n-1]',
				'X(e^{j\\omega})','(1-e^{-j\\omega}) X(e^{j\\omega})'
			]
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
			modshiftTimeFormula:function(mod,shift){
				return (mod?'W_N^{'+(mod>0?'-':'')+'k_0 n}':'')+'x[n'+(shift?(shift<0?'-':'+')+'n_0':'')+']';
			},
			modshiftFreqFormula:function(mod,shift){
				return (mod?'W_N^{'+(mod>0?'-':'')+'k n_0}':'')+'X[k'+(shift?(shift<0?'-':'+')+'k_0':'')+']';
			},
			intdiffFormulas:[
				'x[n]','x[n]-x[n-1]',
				'X[k]','(1-W_N^k) X[k]'
			]
		}
	];
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
	var modshiftTimePatterns=[
		        [ 0,+1],
		[-1, 0],[ 0, 0],[+1, 0],
		        [ 0,-1]
	];
	var modshiftFreqPatterns=[
		        [+1, 0],
		[ 0,+1],[ 0, 0],[ 0,-1],
		        [-1, 0]
	];
	$('.signal-transform-properties').each(function(){
		var tableElm=$(this);
		var transformElm=tableElm.find('caption');
		var transformSelectElm=null;
		transformElm.wrapInner("<span class='signal-transform-dropdown' role='button'>");
		var transformDropdownElm=transformElm.find('.signal-transform-dropdown');
		transformDropdownElm.click(function(){
			if (transformSelectElm===null) {
				transformSelectElm=$("<ul class='signal-transform-select' />");
				transforms.forEach(function(transform){
					transformSelectElm.append(
						$("<li role='button'>"+transform.name+"</li>").click(function(){
							transformSelectElm.remove();
							transformSelectElm=null;
							transformDropdownElm.html(transform.name+"<sup><a href='"+transform.wikipedia+"'>[W]</a></sup>");
							tableElm.find('.signal-transform-properties-definition td.time .formula .item').text('$$'+transform.timeDefinition+'$$');
							tableElm.find('.signal-transform-properties-definition td.freq .formula .item').text('$$'+transform.freqDefinition+'$$');
							tableElm.find('.signal-transform-properties-definition td.time .formula .note').html(transform.timeDefinitionNote);
							tableElm.find('.signal-transform-properties-definition td.freq .formula .note').html(transform.freqDefinitionNote);
							tableElm.find('.signal-transform-properties-conjinv td.time .formula .item').text(function(i){
								return '$$'+transform.conjinvTimeFormula.apply(null,conjinvTimePatterns[i])+'$$';
							});
							tableElm.find('.signal-transform-properties-conjinv td.freq .formula .item').text(function(i){
								return '$$'+transform.conjinvFreqFormula.apply(null,conjinvFreqPatterns[i])+'$$';
							});
							tableElm.find('.signal-transform-properties-modshift td.time .formula .item').text(function(i){
								return '$$'+transform.modshiftTimeFormula.apply(null,modshiftTimePatterns[i])+'$$';
							});
							tableElm.find('.signal-transform-properties-modshift td.freq .formula .item').text(function(i){
								return '$$'+transform.modshiftFreqFormula.apply(null,modshiftFreqPatterns[i])+'$$';
							});
							// simpler code without pretending that we're making a CAS
							tableElm.find('.signal-transform-properties-intdiff td .formula .item').text(function(i){
								return '$$'+transform.intdiffFormulas[i]+'$$';
							});
							MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
						})
					);
				});
				transformElm.append(transformSelectElm);
			} else {
				transformSelectElm.remove();
				transformSelectElm=null;
			}
		});
                tableElm.find('tr').each(function(){
			$(this).find('td.time .formula').each(function(i){
				var timeFormulaElm=$(this);
				var freqFormulaElm=timeFormulaElm.parents('tr').find('td.freq .formula').eq(i); // TODO probably requires 'parents'
				timeFormulaElm.add(freqFormulaElm).hover(function(){
					timeFormulaElm.addClass('active');
					freqFormulaElm.addClass('active');
					var tOffset=timeFormulaElm.offset();
					var fOffset=freqFormulaElm.offset();
					var tWidth=timeFormulaElm.width();
					var tHeight=timeFormulaElm.height();
					var line=$("<div class='line'><div class='arrowhead top' /><div class='arrowhead bottom' /></div>")
						.appendTo(timeFormulaElm)
						.offset({top:tOffset.top+tHeight/2-2,left:tOffset.left+tWidth})
						.width(fOffset.left-tOffset.left-tWidth)
					;
				},function(){
					timeFormulaElm.removeClass('active').find('.line').remove();
					freqFormulaElm.removeClass('active');
				});
			});
		});
		tableElm.find('tbody').each(function(){
			var tbodyElm=$(this);
			tbodyElm.find('tr:first-child th').click(function(ev){
				tbodyElm.removeClass('hidden');
				//ev.stopPropagation();
			});
			$("<div class='cell' />").append($("<div class='hide' role='button' title='hide section'>• • •</div>").click(function(ev){
				tbodyElm.addClass('hidden');
				//ev.stopPropagation();
			})).appendTo(tbodyElm.find('td.both').eq(0));
			var timeLinkElms=tableElm.find('td.time .link');
			var freqLinkElms=tableElm.find('td.freq .link');
			timeLinkElms.each(function(i){
				var timeLinkElm=timeLinkElms.eq(i);
				var freqLinkElm=freqLinkElms.eq(i);
                                var correctedOneLine=false;
				timeLinkElm.add(freqLinkElm).hover(function(){
					// FIXME it runs three times, maybe because of weird ::before use
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
		// $$\overset{\mathcal F}{\rightarrow}$$
	});
});
