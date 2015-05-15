$(function(){
	var transforms=[
		'Discrete-time Fourier transform (DTFT)',
		'Discrete Fourier transform (DFT)'
	];
	$('.signal-transform-properties').each(function(){
		var transformElm=$('caption'); // TODO check if it's relative to the table
		var transformSelectElm=null;
		transformElm.wrapInner("<span class='signal-transform-dropdown'>");
		var transformDropdownElm=transformElm.find('.signal-transform-dropdown');
		transformDropdownElm.click(function(){
			if (transformSelectElm===null) {
				transformSelectElm=$("<ul class='transform-select' />");
				for (var i=0;i<transforms.length;i++) {
					transformSelectElm.append(
						$("<li>"+transforms[i]+"</li>").click(transforms[i],function(e){
							transformDropdownElm.text(e.data);
							transformSelectElm.remove();
							transformSelectElm=null;
						})
					);
				}
				transformElm.append(transformSelectElm);
			} else {
				transformSelectElm.remove();
				transformSelectElm=null;
			}
		});
	});
});
