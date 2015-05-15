$(function(){
	$('.signal-transform-properties').each(function(){
		var transform=$('caption');
		var transformSelect=null;
		transform.click(function(){
			if (transformSelect===null) {
				transformSelect=$("<ul class='transform-select'>"+
					"<li>Discrete-time Fourier transform (DTFT)</li>"+
					"<li>Discrete Fourier transform (DFT)</li>"+
				"</ul>");
				transform.append(transformSelect);
			} else {
				transformSelect.remove();
				transformSelect=null;
			}
		});
	});
});
