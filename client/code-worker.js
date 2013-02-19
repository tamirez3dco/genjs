var isWorker = false;
try {
	importScripts('/client/lib/first/worker/underscore-min.js');
	importScripts('/client/lib/first/worker/three-core1.js');
	importScripts('/client/lib/first/worker/toxiclibs.js');
	importScripts('/client/lib/first/worker/memoize.js');
	importScripts('/client/lib/first/worker/csg.js');
	importScripts('/client/lib/first/worker/math_functions.js');
	importScripts('/client/lib/first/worker/z.optimer_bold.typeface.js');
	importScripts('/client/lib/first/worker/z.optimer_regular.typeface.js');
	importScripts('/client/lib/extend-geometry.js')
	importScripts('/client/lib/geometry.js');
	isWorker = true;
} catch(err) {
	console.log('Not a worker..');
}

if(isWorker) {
	importScripts('/client/lib/first/worker/underscore-min.js');
	importScripts('/client/lib/first/worker/three-core1.js');
	importScripts('/client/lib/first/worker/toxiclibs.js');
	importScripts('/client/lib/first/worker/memoize.js');
	importScripts('/client/lib/first/worker/csg.js');
	importScripts('/client/lib/first/worker/math_functions.js');
	importScripts('/client/lib/first/worker/z.optimer_bold.typeface.js');
	importScripts('/client/lib/first/worker/z.optimer_regular.typeface.js');
	importScripts('/client/lib/extend-geometry.js');
	importScripts('/client/lib/geometry.js');
	GEN.debug = new GEN.Debugger();
	GEN.Geometry.initGlobal();
	goog.memoize.USAGE_COUNTER = 0;
}

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
	GEN.debug.start();
	
	eval(code);
	var renderableBlocks = encodeRenderables()
	port.postMessage(JSON.stringify(renderableBlocks));
	goog.memoize.clearUnused(5);
	goog.memoize.USAGE_COUNTER += 1;
}
encodeRenderables = function() {
	var blocksIds = _.keys(GEN.debug.tracedBlocks);
	var renderableBlocks = {};
	
	_.each(blocksIds, function(id) {
		renderableBlocks[id] = [];
		var values = GEN.debug.tracedBlocks[id];
		if(_.isArray(values) && values.length == 1 && _.isArray(values[0])) {
			values = values[0];
		}
		_.each(values, function(val) {
			if(val.toRenderable) {
				var geometry = val.toRenderable();
				var encoded = geometry.encode(5, val.RENDER_TYPE);
				renderableBlocks[id].push(encoded);
			}
		});
	});
	return renderableBlocks;
}
