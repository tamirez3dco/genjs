importScripts('/worker/underscore-min.js');
importScripts('/worker/three-core1.js');
importScripts('/worker/toxiclibs.js');
importScripts('/worker/memoize.js');
importScripts('/worker/csg.js');
importScripts('/worker/math_functions.js');
importScripts('/worker/optimer_bold.typeface.js');
importScripts('/worker/optimer_regular.typeface.js');
importScripts('/worker/runner.js');
importScripts('/worker/geometry-extend.js');
importScripts('/worker/geometry.js');

GEN.Runner.init();
running=false;

var ports = [];
onconnect = function(event) {
	var port = event.ports[0];
	ports.push(port);
	port.start();

	port.addEventListener("message", function(event) { listenForMessage(event, port);
	});
}
listenForMessage = function(event, port) {
    if(running==true){
        port.postMessage({error: 'busy'});
    }
    running=true;
	var code = event.data.code;
    var tokens = event.data.tokens;
	try {
		var renderableBlocks = GEN.Runner.run(code, tokens);
		port.postMessage({data: renderableBlocks});
	} catch (err) {
		port.postMessage({error: err});
	}
    running=false;
}
