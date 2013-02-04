GEN = {};


//TODO: All this is no good..
GEN.Runner = function() {
	this.points = [];
	this.geometries = [];
};

GEN.Runner.prototype.run = function(result) {
	console.log('runner result');
	console.log(result);
	if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere|| result instanceof toxi.geom.AABB
		|| result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh 
		) {
		this.geometries.push(result);
	} else if( result instanceof toxi.geom.Vec3D) {
		this.points.push(result);
	}
	return result;
};
GEN.Runner.prototype.chain = function(scope, fnName, args) {
	console.log('chain');
	console.log(scope);
	console.log(fnName);
	scope[fnName].apply(scope, args);
	var result = scope;
	console.log('chain result');
	console.log(result);
	if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere|| result instanceof toxi.geom.AABB
		|| result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh 
		) {
		this.geometries.push(result);
	} else if( result instanceof toxi.geom.Vec3D) {
		this.points.push(result);
	}
	return result;
};

GEN.Runner.prototype.removeAll = function() {
	this.points = [];
	this.geometries = [];
};
/*
 GEN.Geometry = function() {
 };

 GEN.Geometry.prototype.point = function(pX, pY, pZ) {
 //var p = new THREE.Vector3(pX, pY, pZ);
 var p = new toxi.geom.Vec3D(pX, pY, pZ);
 return p;
 };

 GEN.Geometry.prototype.line = function(p1, p2) {
 var geometry = new THREE.Geometry();
 geometry.vertices.push(p1);
 geometry.vertices.push(p2);
 //var spline = new THREE.SplineCurve3([p1, p2]);
 //var l = new THREE.Line(geometry)
 return spline;
 };

 */