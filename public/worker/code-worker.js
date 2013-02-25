importScripts('/worker/underscore-min.js');
importScripts('/worker/three-core1.js');
importScripts('/worker/toxiclibs.js');
importScripts('/worker/memoize.js');
importScripts('/worker/csg.js');
importScripts('/worker/math_functions.js');
importScripts('/worker/z.optimer_bold.typeface.js');
importScripts('/worker/z.optimer_regular.typeface.js');
importScripts('/worker/extend-geometry.js');
importScripts('/worker/geometry.js');

GEN.Runner.init();

var ports = [];
onconnect = function(event) {
	var port = event.ports[0];
	ports.push(port);
	port.start();

	port.addEventListener("message", function(event) { listenForMessage(event, port);
	});
}
listenForMessage = function(event, port) {
	var code = event.data;
	
	try {
		var renderableBlocks = GEN.Runner.run(code);
		port.postMessage(JSON.stringify(renderableBlocks));
	} catch (err) {
		port.postMessage(JSON.stringify(err));
	}
}
