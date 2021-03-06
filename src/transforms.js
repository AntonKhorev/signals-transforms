$.fn.signalsTransformsTable.allTransforms=
$.fn.signalsTransformsTable.includedTransforms=[
	'CTFT',
	'CTFS',
	'DTFT',
	'DTFS',
	'DFT',
	'ULT',
	'BLT',
	'UZT',
	'BZT',
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
$.fn.signalsTransformsTable.transforms={};
