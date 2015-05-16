$(function(){
	var transforms=[
		{
			name:'Continuous-time Fourier transform (CTFT)', // angular frequency, non-unitary
			wikipedia:'http://en.wikipedia.org/wiki/Fourier_transform',
			timeDefinition:'x(t) = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} X(j\\omega) e^{j\\omega t} \\,\\mathrm{d}\\omega',
			freqDefinition:'X(j\\omega) = \\int\\limits_{-\\infty}^{+\\infty} x(t) e^{-j\\omega t} \\,\\mathrm{d}t',
			conjinvTimeFormula:function(neg,inv,conj){
				return (neg?'-':'')+'x'+(conj?'^*':'')+'('+(inv?'-':'')+'t)';
			},
			conjinvFreqFormula:function(neg,inv,conj){
				return (neg?'-':'')+'X'+(conj?'^*':'')+'('+(inv?'-':'')+'j\\omega)';
			}
		},{
			name:'Discrete-time Fourier transform (DTFT)',
			wikipedia:'http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform',
			timeDefinition:'x[n] = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} X(e^{j\\omega}) e^{j\\omega n} \\,\\mathrm{d}\\omega',
			freqDefinition:'X(e^{j\\omega}) = \\sum_{n=-\\infty}^{+\\infty} x[n] e^{-j\\omega n}',
			conjinvTimeFormula:function(neg,inv,conj){
				return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
			},
			conjinvFreqFormula:function(neg,inv,conj){
				return (neg?'-':'')+'X'+(conj?'^*':'')+'(e^{'+(inv?'-':'')+'j\\omega})';
			}
		},{
			name:'Discrete Fourier transform (DFT)',
			wikipedia:'http://en.wikipedia.org/wiki/Discrete_Fourier_transform',
			timeDefinition:'x[n] = \\frac 1 N \\sum_{k=0}^{N-1} X[k] W_N^{-kn}',
			freqDefinition:'X[k] = \\sum_{k=0}^{N-1} x[n] W_N^{kn}',
			conjinvTimeFormula:function(neg,inv,conj){
				return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
			},
			conjinvFreqFormula:function(neg,inv,conj){
				return (neg?'-':'')+'X'+(conj?'^*':'')+'['+(inv?'-':'')+'k]';
			}
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
							tableElm.find('.signal-transform-properties-definition td.time.formula').text('$$'+transform.timeDefinition+'$$');
							tableElm.find('.signal-transform-properties-definition td.freq.formula').text('$$'+transform.freqDefinition+'$$');
							tableElm.find('.signal-transform-properties-conjinv td.time.formula').text(function(i){
								return '$$'+transform.conjinvTimeFormula.apply(null,conjinvTimePatterns[i])+'$$';
							});
							tableElm.find('.signal-transform-properties-conjinv td.freq.formula').text(function(i){
								return '$$'+transform.conjinvFreqFormula.apply(null,conjinvFreqPatterns[i])+'$$';
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
			$(this).children('td.time.formula').each(function(i){
				var timeFormulaElm=$(this);
				var freqFormulaElm=timeFormulaElm.parent('tr').children('td.freq.formula').eq(i);
				timeFormulaElm.add(freqFormulaElm).hover(function(){
					timeFormulaElm.addClass('active');
					freqFormulaElm.addClass('active');
				},function(){
					timeFormulaElm.removeClass('active');
					freqFormulaElm.removeClass('active');
				});
			});
		});
		// $$\overset{\mathcal F}{\rightarrow}$$
	});
});
