$.fn.signalsTransformsTable.allTransforms=
$.fn.signalsTransformsTable.includedTransforms=[
	'CTFT',
	'CTFS',
	'DTFT',
	'DTFS',
	'DFT',
	'ULT',
	'BLT',
	'Z1',
	'Z2',
	'OGF'
];

$.fn.signalsTransformsTable.selectedTransform='DTFT';

$.fn.signalsTransformsTable.transformCommon={
	timeDomainName:'Time domain',
	freqDomainName:'Frequency domain'
	// TODO options for:
	// omega_0 in series
	// W_N in DFT (N is a period)
	// T and N periods
};

// TODO synthesis formula equality caveats for CTFT and Laplace (esp. Unilateral)
var RoC="<abbr title='region of convergence'>RoC</abbr>";
function Wiki(href){return "<sup><a href='"+href+"'>[W]</a></sup>"};

$.fn.signalsTransformsTable.transforms={};
