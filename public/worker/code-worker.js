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
/*
GEN.debug = new GEN.Debugger();
GEN.Geometry.initGlobal();
goog.memoize.USAGE_COUNTER = 0;
*/
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
	//GEN.debug.start();
	try {
		//var fn = new Function(code);
		//fn();
		//var renderableBlocks = encodeRenderables();
		var renderableBlocks = GEN.Runner.run(code);
		port.postMessage(JSON.stringify(renderableBlocks));
	} catch (err) {
		port.postMessage(JSON.stringify(err));
	}
	/*
	goog.memoize.clearUnused(5);
	goog.memoize.USAGE_COUNTER += 1;
	*/
}
/*
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
*/