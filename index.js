$(function(){
	var transforms=[
		{
			name:'Discrete-time Fourier transform (DTFT)',
			timeDefinition:'x[n] = \\frac{1}{2\\pi} \\int \\limits_{\\langle 2\\pi \\rangle} X(e^{j\\omega}) e^{j\\omega n} \\, \\mathrm{d}\\omega',
			freqDefinition:'X(e^{j\\omega}) = \\sum_{n=-\\infty}^{+\\infty} x[n] e^{-j\\omega n}',
			timeFormula:function(neg,inv,conj){
				return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
			},
			freqFormula:function(neg,inv,conj){
				return (neg?'-':'')+'X'+(conj?'^*':'')+'(e^{'+(inv?'-':'')+'j\\omega})';
			}
		},{
			timeDefinition:'x[n] = \\frac 1 N \\sum_{k=0}^{N-1} X[k] W_N^{-kn}',
			freqDefinition:'X[k] = \\sum_{k=0}^{N-1} x[n] W_N^{kn}',
			name:'Discrete Fourier transform (DFT)',
			timeFormula:function(neg,inv,conj){
				return (neg?'-':'')+'x'+(conj?'^*':'')+'['+(inv?'-':'')+'n]';
			},
			freqFormula:function(neg,inv,conj){
				return (neg?'-':'')+'X'+(conj?'^*':'')+'['+(inv?'-':'')+'k]';
			}
		}
	];
	var timePatterns=[
		[[1,1,1],[1,1,0],null],
		[[1,0,1],[0,0,0],[0,0,1]],
		[null,   [0,1,0],[0,1,1]]
	];
	var freqPatterns=[
		[[1,0,1],[1,1,0],null],
		[[1,1,1],[0,0,0],[0,1,1]],
		[null,   [0,1,0],[0,0,1]]
	];
	$('.signal-transform-properties').each(function(){
		var tableElm=$(this);
		var transformElm=tableElm.find('caption');
		var transformSelectElm=null;
		transformElm.wrapInner("<span class='signal-transform-dropdown'>");
		var transformDropdownElm=transformElm.find('.signal-transform-dropdown');
		transformDropdownElm.click(function(){
			if (transformSelectElm===null) {
				transformSelectElm=$("<ul class='transform-select' />");
				transforms.forEach(function(transform){
					transformSelectElm.append(
						$("<li>"+transform.name+"</li>").click(function(){
							transformSelectElm.remove();
							transformSelectElm=null;
							transformDropdownElm.text(transform.name);
							tableElm.find('.signal-transform-properties-definition').children('tr').children('td').text(function(j){
								if (j==0) {
									return '$$'+transform.timeDefinition+'$$';
								} else if (j==2) {
									return '$$'+transform.freqDefinition+'$$';
								} else {
									return '';
								}
							});
							tableElm.find('.signal-transform-properties-conjinv').children('tr').each(function(i){
								$(this).children('td').text(function(j){
									var pattern,formula;
									if (j<3) {
										pattern=timePatterns[i][j];
										formula=transform.timeFormula;
									} else if (j>3) {
										pattern=freqPatterns[i][j-4];
										formula=transform.freqFormula;
									} else {
										pattern=null;
									}
									if (pattern===null) {
										return '';
									} else {
										return '$$'+formula.apply(null,pattern)+'$$';
									}
								});
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
	});
});
