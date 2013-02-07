GEN = {};

GEN.Geometry = function() {
};

GEN.Geometry.prototype.createPoint = function(pX, pY, pZ) {
	var p = new toxi.geom.Vec3D(pX, pY, pZ);
	return p;
};

GEN.Geometry.prototype.createCircle = function(origin, radius) {
	var c = new toxi.geom.Circle(origin, radius);
	return c;
};

GEN.Geometry.prototype.createSphere = function(origin, radius) {
	var c = new toxi.geom.Sphere(origin, radius);
	return c;
};

GEN.Geometry.prototype.createTextGeo = function(text, size , height) {
	
	var c = new THREE.TextGeometry( text, {

					size: size,
					height: height,
					curveSegments: 4,

					font: "optimer",

					bevelThickness: 2,
					bevelSize: 1.5,
					bevelEnabled: true,

					material: 0,
					extrudeMaterial: 1

				});
	
	return c;
};


GEN.Geometry.prototype.createCube = function(origin, width, depth, height) {
	var c = new toxi.geom.AABB(origin, this.createPoint(width, depth, height));
	return c;
};

GEN.Geometry.prototype.moveGeometry = function(geometry, translation) {
	if(geometry instanceof toxi.geom.Circle) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Circle(vec, geometry.radius);
	} else if(geometry instanceof toxi.geom.Circle) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Circle(vec, geometry.radius);
	} else if(geometry instanceof toxi.geom.Sphere) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Sphere(vec, geometry.radius);
	} else if (geometry instanceof toxi.geom.Vec3D) {
		var ng = geometry.add(translation);
	} else {
		ng = geometry;
	}
	return ng;
};
/*
GEN.Geometry.prototype.line = function(p1, p2) {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(p1);
	geometry.vertices.push(p2);
	//var spline = new THREE.SplineCurve3([p1, p2]);
	//var l = new THREE.Line(geometry)
	return spline;
};
*/


//TODO: All this is no good..
/*
GEN.Runner = function() {
	this.points = [];
	this.geometries = [];
};

GEN.Runner.prototype.run = function(result) {
	console.log('runner result');
	console.log(result);
	if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere || result instanceof toxi.geom.AABB || result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh) {
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
	if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere || result instanceof toxi.geom.AABB || result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh) {
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
*/