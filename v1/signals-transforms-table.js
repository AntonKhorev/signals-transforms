!function(e){e.fn.signalsTransformsTable=function(){function t(e,t){function i(e){return e.indexOf("+")<0&&e.indexOf("-")<0?!1:"("==e.charAt(0)&&")"==e.charAt(e.length-1)&&e.substr(1).indexOf("(")<0?!1:!0}"undefined"==typeof t&&(t="");var r="-"==e.charAt(0);if(r)var n=e.substr(1);else var n=e;var o={};return o.fnConj=t.indexOf("*")>=0?"^*":"",i(n)?(o.argSign="",o.argRest="("+e+")"):r?(o.argSign="-",o.argRest=n):(o.argSign="",o.argRest=e),o}function i(e){function i(e){return e.length>1?"\\"+e:e}var r=e.match(/([a-zA-Z]+)(\(|\[)([a-zA-Z]+)(\)|\])/);if(r){var n=i(r[1]),o=i(r[3]);return[function(e,i){var o=t(e,i);return n+o.fnConj+r[2]+e+r[4]},o]}var r=e.match(/([a-zA-Z]+)(\(|\[)[ij]\*([a-zA-Z]+)(\)|\])/);if(r){var n=i(r[1]),o=i(r[3]);return[function(e,i){var r=t(e,i);return n+r.fnConj+"("+r.argSign+"j"+r.argRest+")"},o]}var r=e.match(/([a-zA-Z]+)(\(|\[)e\^\([ij]\*([a-zA-Z]+)\)(\)|\])/);if(r){var n=i(r[1]),o=i(r[3]);return[function(e,i){var r=t(e,i);return n+r.fnConj+"(e^{"+r.argSign+"j"+r.argRest+"})"},o]}var r=e.match(/([a-zA-Z]+)_([a-zA-Z]+)/);if(r){var n=i(r[1]),o=i(r[2]);return[function(e,i){var r=t(e,i);return n+r.fnConj+"_{"+e+"}"},o]}throw"invalid function template"}var r=["definitions","linearity","duality","conjrev","modshift","intdiff"],n={definitions:function(e,t,i,r){return{name:"Definitions",cells:["+ + +"],time:[{formula:{notes:{t:"synthesis formula"}}}],freq:[{formula:{notes:{t:"analysis formula"}}}]}},linearity:function(e,t,i,r,n,o){return{name:"Linearity",cells:["+|.|+","+ + +"],time:[{formula:{item:i(e)}},{formula:{item:n(e)}},{formula:{item:"a"+i(e)+"+b"+n(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:o(t)}},{formula:{item:"a"+r(t)+"+b"+o(t)}}]}},duality:function(e,t,i,r){return{name:"Duality",cells:["+|+|+"]}},conjrev:function(e,t,i,r){return{name:"Complex conjugation and time/frequency reversal",cells:["+|+|.","+|+|+",".|+|+"],time:[{formula:{item:"-"+i("-"+e,"*")}},{formula:{item:"-"+i("-"+e)}},{formula:{item:"-"+i(e,"*")}},{formula:{item:i(e)},relations:{t:{notes:{r:"odd"}},b:{notes:{l:"even"}},l:{notes:{b:"imaginary"}},r:{notes:{t:"real"}},tl:{notes:{l:"conjugate antisymmetric"}},br:{notes:{r:"conjugate symmetric"}}}},{formula:{item:i(e,"*"),notes:{t:"conjugation"}}},{formula:{item:i("-"+e),notes:{b:"time reversal"}}},{formula:{item:i("-"+e,"*"),notes:{b:"conjugation and time reversal"}}}],freq:[{formula:{item:"-"+r(t,"*")}},{formula:{item:"-"+r("-"+t)}},{formula:{item:"-"+r("-"+t,"*")}},{formula:{item:r(t)},relations:{t:{notes:{r:"odd"}},b:{notes:{l:"even"}},l:{notes:{b:"conjugate antisymmetric"}},r:{notes:{t:"conjugate symmetric"}},tl:{notes:{l:"imaginary"}},br:{notes:{r:"real"}}}},{formula:{item:r("-"+t,"*"),notes:{t:"conjugation and frequency reversal"}}},{formula:{item:r("-"+t),notes:{b:"frequency reversal"}}},{formula:{item:r(t,"*"),notes:{b:"conjugation"}}}]}},modshift:function(e,t,i,r){return{name:"Modulation and time/frequency shifting",cells:[".|+|.","+|+|+",".|+|."],time:[{formula:{notes:{b:"time shifting"}}},{formula:{notes:{b:"modulation"}}},{},{formula:{notes:{b:"modulation"}}},{formula:{notes:{b:"time shifting"}}}],freq:[{formula:{notes:{b:"modulation"}}},{formula:{notes:{b:"frequency shifting"}}},{},{formula:{notes:{b:"frequency shifting"}}},{formula:{notes:{b:"modulation"}}}]}},intdiff:function(e,t,i,r){return{name:"Integration and differentiation",cells:[".|+|+",".|+|."]}}},o=2,a="<abbr title='region of convergence'>RoC</abbr>",m={timeDomainName:"Time domain",freqDomainName:"Frequency domain"},f=[{name:"Continuous-time Fourier transform (CTFT)",wikipedia:"http://en.wikipedia.org/wiki/Fourier_transform",timeFnTemplate:["x(t)","y(t)"],freqFnTemplate:["X(j*omega)","Y(j*omega)"],sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\frac{1}{2\\pi} \\int\\limits_{-\\infty}^{+\\infty} "+r(t)+" e^{j"+t+" "+e+"} \\,\\mathrm{d}"+t,notes:{b:"function \\("+i(e)+"\\) of continuous variable \\("+e+"\\)"}}}],freq:[{formula:{item:r(t)+" = \\int\\limits_{-\\infty}^{+\\infty} "+i(e)+" e^{-j"+t+" "+e+"} \\,\\mathrm{d}"+e,notes:{b:"function \\("+r(t)+"\\) of continuous variable \\("+t+"\\)"}}}]}},linearity:function(){return{}},duality:function(e,t,i,r){return{time:[{formula:{item:"\\frac{1}{2\\pi} "+r("-"+e)}},{formula:{item:i(e)}},{formula:{item:r(e)}}],freq:[{formula:{item:i(t)}},{formula:{item:r(t)}},{formula:{item:"2\\pi "+i("-"+t)}}]}},conjrev:function(){return{}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"e^{-j"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"e^{j"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"e^{j"+t+" "+e+"_0}"+r(t)}},{formula:{item:r(""+t+"+"+t+"_0")}},{formula:{item:r(t)}},{formula:{item:r(""+t+"-"+t+"_0")}},{formula:{item:"e^{-j"+t+" "+e+"_0}"+r(t)}}]}},intdiff:function(e,t,i,r){return{time:[{formula:{item:i(e)}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+e+"} "+i(e)}},{formula:{item:"-j "+e+" "+i(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:"j"+t+" "+r(t)}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+t+"} "+r(t)}}]}}}},{name:"Continuous-time Fourier series (CTFS)",wikipedia:"http://en.wikipedia.org/wiki/Fourier_series",timeFnTemplate:["x(t)","y(t)"],freqFnTemplate:["a_k","b_k"],sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\sum_{"+t+"=-\\infty}^{+\\infty} "+r(t)+" e^{j"+t+" \\omega_0 "+e+"}",notes:{b:"periodic function \\("+i(e)+"\\) of continuous variable \\("+e+"\\)<br /> with period \\(T\\);<br /> \\(\\omega_0=\\frac{2\\pi}{T}\\)"}}}],freq:[{formula:{item:r(t)+" = \\frac{1}{T} \\int\\limits_{\\langle T \\rangle} "+i(e)+" e^{-j"+t+" \\omega_0 "+e+"} \\,\\mathrm{d}"+e,notes:{b:"function \\("+r(t)+"\\) of discrete variable \\("+t+"\\);<br /> \\(\\omega_0=\\frac{2\\pi}{T}\\)"}}}]}},linearity:function(e,t,i,r,n,o){return{time:[{formula:{item:i(e)}},{formula:{item:n(e)}},{formula:{item:"A"+i(e)+"+B"+n(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:o(t)}},{formula:{item:"A"+r(t)+"+B"+o(t)}}]}},conjrev:function(){return{}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"e^{-j"+t+"_0 \\omega_0 "+e+"}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"e^{j"+t+"_0 \\omega_0 "+e+"}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"e^{j"+t+"\\omega_0 "+e+"_0}"+r(t)}},{formula:{item:r(""+t+"+"+t+"_0")}},{formula:{item:r(t)}},{formula:{item:r(""+t+"-"+t+"_0")}},{formula:{item:"e^{-j"+t+"\\omega_0 "+e+"_0}"+r(t)}}]}},intdiff:function(e,t,i,r){return{cells:[".|+|+",".|.|."],time:[{formula:{item:i(e)}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+e+"} "+i(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:"j"+t+" \\omega_0 "+r(t)}}]}}}},{name:"Discrete-time Fourier transform (DTFT)",wikipedia:"http://en.wikipedia.org/wiki/Discrete-time_Fourier_transform",timeFnTemplate:["x[n]","y[n]"],freqFnTemplate:["X(e^(j*omega))","Y(e^(j*omega))"],sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\frac{1}{2\\pi} \\int\\limits_{\\langle 2\\pi \\rangle} "+r(t)+" e^{j"+t+" "+e+"} \\,\\mathrm{d}"+t,notes:{b:"function \\("+i(e)+"\\) of discrete variable \\("+e+"\\)"}}}],freq:[{formula:{item:r(t)+" = \\sum_{"+e+"=-\\infty}^{+\\infty} "+i(e)+" e^{-j"+t+" "+e+"}",notes:{b:"periodic function \\("+r(t)+"\\) of continuous variable \\("+t+"\\)<br /> with period \\(2\\pi\\)"}}}]}},linearity:function(){return{}},conjrev:function(){return{}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"e^{-j"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"e^{j"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"e^{j"+t+" "+e+"_0}"+r(t)}},{formula:{item:r(""+t+"+"+t+"_0")}},{formula:{item:r(t)}},{formula:{item:r(""+t+"-"+t+"_0")}},{formula:{item:"e^{-j"+t+" "+e+"_0}"+r(t)}}]}},intdiff:function(e,t,i,r){return{time:[{formula:{item:i(e)}},{formula:{item:i(e)+"-"+i(e+"-1")}},{formula:{item:"-j "+e+" "+i(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:"(1-e^{-j"+t+"}) "+r(t)}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+t+"} "+r(t)}}]}}}},{name:"Discrete-time Fourier series (DTFS)",timeFnTemplate:["x[n]","y[n]"],freqFnTemplate:["a_k","b_k"],sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\sum_{"+t+"=\\langle N \\rangle} "+r(t)+" e^{j"+t+" \\omega_0 "+e+"}",notes:{b:"periodic function \\("+i(e)+"\\) of discrete variable \\("+e+"\\)<br /> with period \\(N\\);<br /> \\(\\omega_0=\\frac{2\\pi}{N}\\)"}}}],freq:[{formula:{item:r(t)+" = \\sum_{"+e+"=\\langle N \\rangle} "+i(e)+" e^{-j"+t+" \\omega_0 "+e+"}",notes:{b:"periodic function \\("+r(t)+"\\) of discrete variable \\("+t+"\\)<br /> with period \\(N\\);<br /> \\(\\omega_0=\\frac{2\\pi}{N}\\)"}}}]}},linearity:function(e,t,i,r,n,o){return{time:[{formula:{item:i(e)}},{formula:{item:n(e)}},{formula:{item:"A"+i(e)+"+B"+n(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:o(t)}},{formula:{item:"A"+r(t)+"+B"+o(t)}}]}},conjrev:function(){return{}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"e^{-j"+t+"_0 \\omega_0 "+e+"}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"e^{j"+t+"_0 \\omega_0 "+e+"}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"e^{j"+t+"\\omega_0 "+e+"_0}"+r(t)}},{formula:{item:r(""+t+"+"+t+"_0")}},{formula:{item:r(t)}},{formula:{item:r(""+t+"-"+t+"_0")}},{formula:{item:"e^{-j"+t+"\\omega_0 "+e+"_0}"+r(t)}}]}},intdiff:function(e,t,i,r){return{cells:[".|+|+",".|.|."],time:[{formula:{item:i(e)}},{formula:{item:i(e)+"-"+i(e+"-1")}}],freq:[{formula:{item:r(t)}},{formula:{item:"(1-e^{-j"+t+"\\omega_0}) "+r(t)}}]}}}},{name:"Discrete Fourier transform (DFT)",wikipedia:"http://en.wikipedia.org/wiki/Discrete_Fourier_transform",timeFnTemplate:["x[n]","y[n]"],freqFnTemplate:["X[k]","Y[k]"],sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\frac 1 N \\sum_{"+t+"=0}^{N-1} "+r(t)+" W_N^{-"+t+" "+e+"}",notes:{b:"function \\("+i(e)+"\\) of discrete variable \\("+e+"\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)"}}}],freq:[{formula:{item:r(t)+" = \\sum_{"+e+"=0}^{N-1} "+i(e)+" W_N^{"+t+" "+e+"}",notes:{b:"function \\("+r(t)+"\\) of discrete variable \\("+t+"\\)<br /> with support \\([0;N-1]\\);<br /> variable is interpreted modulo \\(N\\);<br /> \\(W_N = e^{-j \\frac{2\\pi}{N}}\\)"}}}]}},linearity:function(){return{}},duality:function(e,t,i,r){return{time:[{formula:{item:"\\frac{1}{N} "+r("-"+e)}},{formula:{item:i(e)}},{formula:{item:r(e)}}],freq:[{formula:{item:i(t)}},{formula:{item:r(t)}},{formula:{item:"N "+i("-"+t)}}]}},conjrev:function(){return{}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"W_N^{"+t+"_0 n}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"W_N^{-"+t+"_0 n}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"W_N^{-"+t+" "+e+"_0}"+r(t)}},{formula:{item:r(t+"+"+t+"_0")}},{formula:{item:r(t)}},{formula:{item:r(t+"-"+t+"_0")}},{formula:{item:"W_N^{"+t+" "+e+"_0}"+r(t)}}]}},intdiff:function(e,t,i,r){return{time:[{formula:{item:i(e)}},{formula:{item:i(e)+"-"+i(e+"-1")}},{formula:{item:"(1-W_N^{-"+e+"}) "+i(e)}}],freq:[{formula:{item:r(t)}},{formula:{item:"(1-W_N^"+t+") "+r(t)}},{formula:{item:r(t)+"-"+r(t+"-1")}}]}}}},{name:"Bilateral Laplace transform",wikipedia:"http://en.wikipedia.org/wiki/Two-sided_Laplace_transform",timeFnTemplate:["x(t)","y(t)"],freqFnTemplate:["X(s)","Y(s)"],freqDomainName:"s-domain",sections:{definitions:function(e,t,i,r){return{time:[{formula:{item:i(e)+" = \\frac{1}{2\\pi j} \\lim_{\\omega\\to\\infty} \\int\\limits_{\\sigma-j\\omega}^{\\sigma+j\\omega} "+r(t)+" e^{"+t+" "+e+"} \\,\\mathrm{d}"+t,notes:{t:"synthesis formula;<br /> the contour path of integration is in the "+a+" of \\("+r(t)+"\\)",b:"function \\("+i(e)+"\\) of continuous variable \\("+e+"\\)"}}}],freq:[{formula:{item:r(t)+" = \\int\\limits_{-\\infty}^{+\\infty} "+i(e)+" e^{-"+t+" "+e+"} \\,\\mathrm{d}"+e,notes:{b:"function \\("+r(t)+"\\) of complex variable \\("+t+"\\)"}}}]}},linearity:function(){return{freq:[{formula:{notes:{b:a+" = \\(R_X\\)"}}},{formula:{notes:{b:a+" = \\(R_Y\\)"}}},{formula:{notes:{b:a+" includes \\(R_X \\cap R_Y\\)"}}}]}},conjrev:function(e,t,i,r){return{freq:[{formula:{item:"-"+r("-"+t+"^*","*"),notes:{t:a+" = \\(-R\\)"}}},{formula:{item:"-"+r("-"+t),notes:{t:a+" = \\(-R\\)"}}},{formula:{item:"-"+r(t+"^*","*"),notes:{b:a+" = \\(R\\)"}}},{formula:{item:r(t),notes:{b:a+" = \\(R\\)"}},relations:{t:{notes:{r:"odd"}},b:{notes:{l:"even"}},l:{notes:{b:null}},r:{notes:{t:null}},tl:{notes:{l:null}},br:{notes:{r:null}}}},{formula:{item:r(t+"^*","*"),notes:{t:a+" = \\(R\\)"}}},{formula:{item:r("-"+t),notes:{b:a+" = \\(-R\\)"}}},{formula:{item:r("-"+t+"^*","*"),notes:{b:a+" = \\(-R\\)"}}}]}},modshift:function(e,t,i,r){return{time:[{formula:{item:i(e+"+"+e+"_0")}},{formula:{item:"e^{-"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e)}},{formula:{item:"e^{"+t+"_0 "+e+"}"+i(e)}},{formula:{item:i(e+"-"+e+"_0")}}],freq:[{formula:{item:"e^{"+t+" "+e+"_0}"+r(t),notes:{b:a+" = \\(R\\)"}}},{formula:{item:r(""+t+"+"+t+"_0"),notes:{b:a+" = \\(R-\\Re("+t+"_0)\\)"}}},{formula:{item:r(t),notes:{b:a+" = \\(R\\)"}}},{formula:{item:r(""+t+"-"+t+"_0"),notes:{b:a+" = \\(R+\\Re("+t+"_0)\\)"}}},{formula:{item:"e^{-"+t+" "+e+"_0}"+r(t),notes:{b:a+" = \\(R\\)"}}}]}},intdiff:function(e,t,i,r){return{time:[{formula:{item:i(e)}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+e+"} "+i(e)}},{formula:{item:"-"+e+" "+i(e)}}],freq:[{formula:{item:r(t),notes:{b:a+" = \\(R\\)"}}},{formula:{item:t+" "+r(t),notes:{b:a+" includes \\(R\\)"}}},{formula:{item:"\\frac{\\mathrm{d}}{\\mathrm{d}"+t+"} "+r(t),notes:{b:a+" = \\(R\\)"}}}]}}}}];return this.each(function(){function t(e){e.preventDefault()}function a(o){var a=e.extend(!0,{},m,o);c.append("<thead><tr class='some-browsers-ignore-col-elements'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th colspan='3' class='time'>"+a.timeDomainName+"</th><th class='both'></th><th colspan='3' class='freq'>"+a.freqDomainName+"</th></tr></thead>");var f=i(a.timeFnTemplate[0]),l=f[0],s=f[1],f=i(a.freqFnTemplate[0]),h=f[0],p=f[1],f=i(a.timeFnTemplate[1]),g=f[0],f=i(a.freqFnTemplate[1]),b=f[0];e.each(r,function(i,r){if(r in a.sections){var o=n[r](s,p,l,h,g,b),m=a.sections[r](s,p,l,h,g,b);section=e.extend(!0,{},o,m);var f=e("<tbody />");u[r]&&f.addClass("is-collapsed"),f.append(e("<tr />").append(e("<th colspan='7' role='button'>"+section.name+"</th>").click(function(e){u[r]=!1,f.removeClass("is-collapsed")}).mousedown(t))),e.each(section.cells,function(t,i){function r(t){for(var r=0,o=!1,a=0;a<=i.length;a++)switch(a<i.length?i.charAt(a):"|"){case"+":o=!0;case".":r++;break;case"|":var m=e("<td class='"+t+"' colspan='"+r+"' />");o&&m.append("<div class='cell'><div class='formula' /></div>"),n.append(m),r=0,o=!1}}var n=e("<tr />");r("time"),n.append("<td class='both' />"),r("freq"),f.append(n)}),c.append(f),e("<div class='cell' />").append(e("<div class='collapse' role='button' title='collapse section'>• • •</div>").click(function(e){f.addClass("is-collapsed"),u[r]=!0}).mousedown(t)).appendTo(f.find("td.both").eq(0));var _=f.find("td.time .formula"),v=f.find("td.freq .formula");_.each(function(t){function i(t,i){function r(t,i){"notes"in i&&e.each(i.notes,function(e,i){null!==i&&t.append("<div class='note at-"+e+"'>"+i+"</div>")})}t.append("<div class='item'>$$"+i.formula.item+"$$</div>"),r(t,i.formula),"relations"in i&&e.each(i.relations,function(i,n){var o=e("<div class='relation at-"+i+"' />").insertAfter(t);r(o,n),o.on("item:highlight",function(){e(this).addClass("is-highlighted")}).on("item:unhighlight",function(){e(this).removeClass("is-highlighted")}).one("item:highlight",function(){e(this).find(".note").each(function(){var t=e(this);if(t.hasClass("at-l")||t.hasClass("at-r")){var i=e("<span style='visibility:hidden'>|</span>").prependTo(t),r=i.height();i.remove(),t.wrapInner("<span />");var n=t.children("span").height();r>=n&&t.addClass("one-line")}})})})}function r(t,i,r){"undefined"==typeof r&&(r=0);var n=t.offset().top,o=t.offset().left,a=i.offset().left,m=t.outerWidth(),f=t.height();t.find(".note.at-r").eq(0).each(function(){o=e(this).offset().left,m=e(this).outerWidth()}),i.find(".note.at-l").eq(0).each(function(){a=e(this).offset().left}),d.appendTo(t).offset({top:n+f/2-2,left:o+m+r}).width(a-o-m-2*r)}var n=_.eq(t),o=v.eq(t);i(n,section.time[t]),i(o,section.freq[t]),n.add(o).hover(function(){n.addClass("is-highlighted"),o.addClass("is-highlighted"),r(n,o)},function(){d.detach(),n.removeClass("is-highlighted"),o.removeClass("is-highlighted")}),e.each(["t","b","l","r","tl","tr","bl","br"],function(e,t){var i=n.siblings(".relation.at-"+t),a=o.siblings(".relation.at-"+t);i.add(a).hover(function(){i.trigger("item:highlight"),a.trigger("item:highlight"),r(i,a,4)},function(){d.detach(),i.trigger("item:unhighlight"),a.trigger("item:unhighlight")})})})}}),MathJax.Hub.Queue(["Typeset",MathJax.Hub])}function l(e){g.text(e.name),"wikipedia"in e&&g.append("<sup><a href='"+e.wikipedia+"'>[W]</a></sup>")}var u={};e.each(n,function(e,t){u[e]=!1});var s=e(this).empty(),c=e("<table class='signals-transforms-table' />").appendTo(s),d=e("<div class='arrow'><div class='arrowhead at-tl' /><div class='arrowhead at-bl' /><div class='arrowhead at-tr' /><div class='arrowhead at-br' /></div>"),h=null,p=e("<caption />").appendTo(c),g=e("<span class='signal-transform-dropdown' role='button' />").appendTo(p);l(f[o]),g.click(function(){null===h?(h=e("<ul class='signal-transform-select' />"),e.each(f,function(i,r){h.append(e("<li role='button'>"+r.name+"</li>").click(function(){h.remove(),h=null,l(r),c.find("thead,tbody").remove(),a(r)}).mousedown(t))}),p.append(h)):(h.remove(),h=null)}).mousedown(t),c.append("<colgroup class='time'><col /><col /><col /></colgroup><colgroup class='both'><col /></colgroup><colgroup class='freq'><col /><col /><col /></colgroup>"),a(f[o])})}}(jQuery);
//# sourceMappingURL=signals-transforms-table.js.map