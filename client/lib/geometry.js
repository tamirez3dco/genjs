//toxi render types
toxi.geom.Vec3D.prototype.RENDER_TYPE = "Point";
toxi.geom.Polygon2D.prototype.RENDER_TYPE = "Line";
toxi.geom.Ellipse.prototype.RENDER_TYPE = "Line";
toxi.geom.Circle.prototype.RENDER_TYPE = "Line";
toxi.geom.Sphere.prototype.RENDER_TYPE = "Mesh";
toxi.geom.AABB.prototype.RENDER_TYPE = "Mesh";
toxi.geom.mesh.TriangleMesh.prototype.RENDER_TYPE = "Mesh";
//THREE render types
THREE.Vector3.prototype.RENDER_TYPE = "Point";
THREE.Curve.prototype.RENDER_TYPE = "Line";
THREE.Geometry.prototype.RENDER_TYPE = "Mesh";
/*
THREE.TextGeometry.prototype.RENDER_TYPE = "Mesh";
THREE.ParametricGeometry.prototype.RENDER_TYPE = "Mesh";
*/

//Points
toxi.geom.Vec3D.prototype.toRenderable = function() {
	return new THREE.Vector3(this.x, this.y, this.z);
}
THREE.Vector3.prototype.toRenderable = function() {
	return this;
}
THREE.Vector3.prototype.toString = function() {
	return 'Vec3D: [x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + ']';
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

THREE.LineCurve.prototype.toRenderable = function() {
	var geometry = new THREE.Geometry();
	var points = this.getPoints();
	//console.log(points);
	for(var i = 0; i < points.length; i++) {
		geometry.vertices.push(points[i]);
	}

	return geometry;
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
toxi.geom.Sphere.prototype.toString = function() {
	return 'Sphere: [origin: [x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + '], radius: ' + this.radius.toFixed(2) + ']';
}
toxi.geom.AABB.prototype.toRenderable = function() {
	return this.toMesh().toRenderable();
}
toxi.geom.AABB.prototype.toString = function() {
	//console.log(_.keys(this));
	//console.log(this.extent);
	return 'Box: [origin: [x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + ']]';
}

THREE.Geometry.prototype.toToxic = function() {
	var toxicGeo = new toxi.geom.mesh.TriangleMesh();
	for(var j = 0, flen = this.faces.length; j < flen; j++) {
		var threeFace = this.faces[j];
		var x1 = this.vertices[threeFace.a].x;
		var y1 = this.vertices[threeFace.a].y;
		var z1 = this.vertices[threeFace.a].z;
		var toxV1 = new toxi.geom.Vec3D(x1, y1, z1);

		var x2 = this.vertices[threeFace.b].x;
		var y2 = this.vertices[threeFace.b].y;
		var z2 = this.vertices[threeFace.b].z;
		var toxV2 = new toxi.geom.Vec3D(x2, y2, z2);

		var x3 = this.vertices[threeFace.c].x;
		var y3 = this.vertices[threeFace.c].y;
		var z3 = this.vertices[threeFace.c].z;
		var toxV3 = new toxi.geom.Vec3D(x3, y3, z3);

		toxicGeo.addFace(toxV1, toxV2, toxV3);

	}
	toxicGeo.computeCentroid();
	toxicGeo.computeFaceNormals();
	toxicGeo.computeVertexNormals();

	return toxicGeo;
}
//var spline = new THREE.SplineCurve3([p1, p2]);

THREE.Geometry.prototype.toRenderable = function() {
	return this;
}

THREE.Geometry.prototype.getEdges = function() {
	var vertices = this.vertices;
	var edges = [];
	for(var i = 0, il = vertices.length; i < il; i++) {
		if(i > 0) {
			var edge = new THREE.LineCurve(vertices[i - 1], vertices[i]);
			//vertices[i].distanceTo(vertices[i - 1]);
			//console.log(edge);
			edges.push(edge);
		}

	}
	return edges;
}
THREE.Geometry.prototype.getEdges = function() {
	var v = this.vertices;
	var faces = this.faces;
	var edges = [];
	for(var i = 0, il = faces.length; i < il; i++) {
		var f = faces[i];
		var e1 = new THREE.LineCurve(v[f.a], v[f.b]);
		var e2 = new THREE.LineCurve(v[f.b], v[f.c]);
		edges.push(e1, e2);
		if(f.d) {
			var e3 = new THREE.LineCurve(v[f.c], v[f.d]);
			var e4 = new THREE.LineCurve(v[f.d], v[f.a]);
			edges.push(e3, e4);
		} else {
			var e3 = new THREE.LineCurve(v[f.c], v[f.a]);
			edges.push(e3);
		}
	}
	return edges;
}
/*
 THREE.TextGeometry.prototype.toRenderable = function() {
 return this;
 }
 THREE.CubeGeometry.prototype.toRenderable = function() {
 return this;
 }
 THREE.ParametricGeometry.prototype.toRenderable = function() {
 return this;
 }
 */
THREE.Geometry.prototype.translate = function(vec) {
	var mat = new THREE.Matrix4();
	mat.makeTranslation(vec.x, vec.y, vec.z);
	this.applyMatrix(mat);
	return this;
}
THREE.Geometry.prototype.scale = function(vec) {
	var mat = new THREE.Matrix4();
	mat.makeScale(vec.x, vec.y, vec.z);
	this.applyMatrix(mat);
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
//TODO: add font selection, bevel?
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

	//var toxic = c.toToxic();
	//return toxic;
	return c;
};

GEN.Geometry.prototype.createCube = function(origin, width, depth, height) {
	var c = new toxi.geom.AABB(origin, this.createPoint(width, depth, height));
	return c;
};

GEN.Geometry.prototype.createParametricSurface = function(name, udiv, vdiv) {
	var geo = new THREE.ParametricGeometry(GEN.Geometry.Surfaces[name](5), udiv, vdiv);
	return geo;
};

GEN.Geometry.prototype.createPipe = function(curve, radius, sides) {
	//console.log('hi');
	//console.log(curve);
	var pipe = new THREE.TubeGeometry(curve, 2, radius, sides, false, false);
	return pipe;
};

//TODO: Not nice + take care of all types
GEN.Geometry.prototype.move = function(geometry, translation) {
	if( geometry instanceof toxi.geom.Circle) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Circle(vec, geometry.radius);
	} else if( geometry instanceof toxi.geom.Sphere) {
		var vec = geometry.add(translation);
		var ng = new toxi.geom.Sphere(vec, geometry.radius);
	} else if( geometry instanceof THREE.Geometry) {
		var ng = geometry.clone();
		ng.translate(translation);
	} else {
		ng = geometry;
	}
	return ng;
};
//TODO: only works for mesh
GEN.Geometry.prototype.scale = function(geometry, vecOrFactor) {
	var vec = vecOrFactor;
	if(_.isNumber(vec)) {
		vec = this.createPoint(vec);
	}
	console.log(vec);

	if( geometry instanceof THREE.Geometry) {
		var ng = geometry.clone();
		ng.scale(vec);
	} else {
		ng = geometry;
	}

	return ng;
}

GEN.Geometry.prototype.meshComponents = function(args) {
	//console.log(args);
	if(args.mesh instanceof THREE.Geometry) {
		if(args.componentType == 'edges') {
			//console.log(args.mesh);
			//console.log(args.mesh.getEdges);
			var comp = args.mesh.getEdges();
		} else {
			var comp = args.mesh[args.componentType];
		}
	} else {
		var comp = null;
	}

	return comp;
}
//Parametric surface functions
GEN.Geometry.Surfaces = {}

GEN.Geometry.Surfaces.klein = function(scale) {
	return function(v, u) {
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
		return new THREE.Vector3(x * scale, y * scale, z * scale);
	}
}
GEN.Geometry.Surfaces.enneper = function(scale) {
	return function(v, u) {
		u = (u * 4) - 2;
		v = (v * 4) - 2;

		var x = u - (Math.pow(u, 3) / 3) + (u * Math.pow(v, 2));
		var y = -v + (Math.pow(v, 3) / 3) - (v * Math.pow(u, 2));
		var z = Math.pow(u, 2) - Math.pow(v, 2);

		return new THREE.Vector3(x * scale, y * scale, z * scale);
	}
}

GEN.Geometry.Surfaces.catenoid = function(scale) {
	return function(v, u) {
		u = (u * 2 * Math.PI) - Math.PI;
		v = (v * 2 * Math.PI) - Math.PI;

		var x = 2 * cosh(v / 2) * cos(u);
		var z = v;
		var y = 2 * cosh(v / 2) * sin(u)

		return new THREE.Vector3(x * scale, y * scale, z * scale);
	}
}

GEN.Geometry.Surfaces.helicoidal = function(scale) {
	return function(v, u) {
		u = (u * 2 * Math.PI) - Math.PI;
		v = (v * 2 * Math.PI) - Math.PI;

		var x = sinh(v) * sin(u);
		var z = 3 * u;
		var y = -sinh(v) * cos(u);

		return new THREE.Vector3(x * scale, y * scale, z * scale);
	}
}
GEN.Geometry.Surfaces.torus = function(scale) {
	return function(v, u) {
		u = (u * 2 * Math.PI);
		v = (v * 2 * Math.PI);

		var x = (1 + 0.5 * cos(u)) * cos(v);
		var z = 0.5 * sin(u);
		var y = (1 + 0.5 * cos(u)) * sin(v);

		return new THREE.Vector3(x * scale, y * scale, z * scale);
	}
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