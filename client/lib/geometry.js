//toxi render types
toxi.geom.Vec3D.prototype.RENDER_TYPE = "Point";
toxi.geom.Polygon2D.prototype.RENDER_TYPE = "Line";
toxi.geom.Ellipse.prototype.RENDER_TYPE = "Line";
toxi.geom.Circle.prototype.RENDER_TYPE = "Line";
toxi.geom.Sphere.prototype.RENDER_TYPE = "Mesh";
toxi.geom.AABB.prototype.RENDER_TYPE = "Mesh";

//THREE render types
THREE.TextGeometry.prototype.RENDER_TYPE = "Mesh";
THREE.ParametricGeometry.prototype.RENDER_TYPE = "Mesh";

//Points
toxi.geom.Vec3D.prototype.toRenderable = function() {
	return new THREE.Vector3(this.x, this.y, this.z);
}
//Lines
toxi.geom.Polygon2D.prototype.toRenderable = function() {
	var geometry = new THREE.Geometry();
	for(var i = 0; i < this.vertices.length; i++) {
		var p = this.vertices[i];
		geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
	}
	var p = this.vertices[0];
	geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
	return geometry;
}

toxi.geom.Circle.prototype.toRenderable = function() {
	return this.toPolygon2D(30).toRenderable();
}
//Surfaces & Meshes
toxi.geom.mesh.TriangleMesh.prototype.toRenderable = function() {
	var geometry = new THREE.Geometry();
	var f3 = function(g, i1, i2, i3) {
		//unlike toxiclibs, a face in three.js are indices related to the vertices array
		g.faces.push(new THREE.Face3(i1, i2, i3));
	};
	var v3 = function(g, a) {
		var threeV = new THREE.Vector3(a.x, a.y, a.z);
		g.vertices.push(threeV);
	};
	var addFace = function(f) {
		var vectors = [f.a, f.b, f.c], startIndex = geometry.vertices.length;
		//make sure this wasnt a vertices from a previous face
		var i = 0, len = 3;
		for( i = 0; i < len; i++) {
			var toxiV = vectors[i];
			v3(geometry, toxiV);
		}

		f3(geometry, startIndex, startIndex + 1, startIndex + 2);
	}
	for(var j = 0, flen = this.faces.length; j < flen; j++) {
		addFace(this.faces[j]);
	}

	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return geometry;
}

toxi.geom.Sphere.prototype.toRenderable = function() {
	return this.toMesh(20).toRenderable();
}

toxi.geom.AABB.prototype.toRenderable = function() {
	return this.toMesh().toRenderable();
}

THREE.TextGeometry.prototype.toRenderable = function() {
	return this;
}
THREE.CubeGeometry.prototype.toRenderable = function() {
	return this;
}
THREE.ParametricGeometry.prototype.toRenderable = function() {
	return this;
}
//GEN Geometry API

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

GEN.Geometry.prototype.createTextGeo = function(text, size, height) {
	var c = new THREE.TextGeometry(text, {
		size : size,
		height : height,
		curveSegments : 4,

		font : "optimer",

		bevelThickness : 2,
		bevelSize : 1.5,
		bevelEnabled : true,

		material : 0,
		extrudeMaterial : 1
	});
	return c;
};

GEN.Geometry.prototype.createCube = function(origin, width, depth, height) {
	var c = new toxi.geom.AABB(origin, this.createPoint(width, depth, height));
	return c;
};

GEN.Geometry.prototype.createKlein = function(){
	var geo = new THREE.ParametricGeometry(GEN.Geometry.Surfaces.klein, 20, 40 );
	return geo;
};

GEN.Geometry.prototype.moveGeometry = function(geometry, translation) {
	if( geometry instanceof toxi.geom.Circle) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Circle(vec, geometry.radius);
	} else if( geometry instanceof toxi.geom.Circle) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Circle(vec, geometry.radius);
	} else if( geometry instanceof toxi.geom.Sphere) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Sphere(vec, geometry.radius);
	} else if( geometry instanceof toxi.geom.Vec3D) {
		var ng = geometry.add(translation);
	} else {
		ng = geometry;
	}
	return ng;
};

GEN.Geometry.Surfaces = {}

GEN.Geometry.Surfaces.klein = function(v, u) {
	u *= Math.PI;
	v *= 2 * Math.PI;
	u = u * 2;
	var x, y, z;
	if(u < Math.PI) {
		x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
		z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
	} else {
		x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
		z = -8 * Math.sin(u);
	}
	y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

	return new THREE.Vector3(x, y, z);
}
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