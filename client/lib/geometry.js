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
toxi.geom.Vec3D.prototype.toCSG = function() {
	return new CSG.Vector(this.x, this.y, this.z);
}
toxi.geom.Vec3D.prototype.toCSG_Vertex = function() {
	var CSG_pos = new CSG.Vector(this.x, this.y, this.z);
	var CSG_normal = new CSG.Vector(this.normal.x, this.normal.y, this.normal.z);
	return new CSG.Vertex(CSG_pos,CSG_normal);
}

CSG.Vertex.prototype.toToxic_Vec3D = function() {
	var toxicVec = new toxi.geom.Vec3D(this.pos.x, this.pos.y, this.pos.z);
	return toxicVec;
}

CSG.Vertex.prototype.toRenderable = function() {
	return new THREE.Vector3(this.pos.x, this.pos.y, this.pos.z);
}

THREE.Vector3.prototype.toCSG_Vertex = function() {
	var CSG_pos = new CSG.Vector(this.x, this.y, this.z);
	var CSG_normal = new CSG.Vector(0, 0, 0);
	return new CSG.Vertex(CSG_pos,CSG_normal);
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

CSG.prototype.toToxic = function() {
	return this.toRenderable().toToxic();
}


CSG.prototype.toRenderable = function() {
	var geometry = new THREE.Geometry();
	var f3 = function(g, i1, i2, i3) {
		//unlike toxiclibs, a face in three.js are indices related to the vertices array
		g.faces.push(new THREE.Face3(i1, i2, i3));
	};
	var f4 = function(g, i1, i2, i3, i4) {
		//unlike toxiclibs, a face in three.js are indices related to the vertices array
		g.faces.push(new THREE.Face4(i1, i2, i3,i4));
	};
	var v3 = function(g, a) {
		var threeV = new THREE.Vector3(a.pos.x, a.pos.y, a.pos.z);
		g.vertices.push(threeV);
	};
	var addFaces = function(polygon) {
		
		for (k = 1 ; k < polygon.vertices.length-1 ; k++){
			startIndex = geometry.vertices.length;
			var vectors = [polygon.vertices[0], polygon.vertices[k], polygon.vertices[k+1]];
			//make sure this wasnt a vertices from a previous face
			for(var i = 0; i < 3; i++) {
				v3(geometry, vectors[i]);
			}
			f3(geometry, startIndex, startIndex + 1, startIndex + 2);
		}
	}

	for(var j = 0, flen = this.polygons.length; j < flen; j++) {
		addFaces(this.polygons[j]);
		
	}
	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	//THREE.GeometryUtils.triangulateQuads(geometry);
	return geometry;
	
}


toxi.geom.mesh.TriangleMesh.prototype.toCSG_Mesh = function() {
	var csg_polygons = [];
	for(var j = 0, flen = this.faces.length; j < flen; j++) {
		var csg_vertex_a = this.faces[j].a.toCSG_Vertex();
		var csg_vertex_b = this.faces[j].b.toCSG_Vertex();
		var csg_vertex_c = this.faces[j].c.toCSG_Vertex();
		csg_polygons.push(new CSG.Polygon([csg_vertex_a,csg_vertex_b,csg_vertex_c]));
	}
	var csg_mesh = new CSG.fromPolygons(csg_polygons);

	console.log(csg_mesh);
	return csg_mesh;
}


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
	var toxicMesh = this.toMesh(20);
	console.log("flipping faces on toxic.geom.Sphere...")
	toxicMesh.flipVertexOrder();
	return toxicMesh.toRenderable();
}
toxi.geom.Sphere.prototype.toCSG_Mesh = function() {
	return this.toRenderable().toCSG_Mesh();
}

toxi.geom.Sphere.prototype.toString = function() {
	return 'Sphere: [origin: [x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + '], radius: ' + this.radius.toFixed(2) + ']';
}
toxi.geom.AABB.prototype.toRenderable = function() {
	return this.toMesh().toRenderable();
}

toxi.geom.AABB.prototype.toCSG_Mesh = function() {
	return this.toRenderable().toCSG_Mesh();
}

toxi.geom.AABB.prototype.toString = function() {
	//console.log(_.keys(this));
	//console.log(this.extent);
	return 'Box: [origin: [x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + ']]';
}


THREE.Geometry.prototype.toCSG_Mesh = function() {
	var temp = this.clone();
	temp.computeFaceNormals();
	temp.computeVertexNormals();
	try
  	{
  		THREE.GeometryUtils.triangulateQuads(temp);
  	}
	catch(err)
  	{
  		console.log("Error description: " + err.message + "\n\n");
  	}
	
	var csg_polygons = [];
	for(var j = 0, flen = temp.faces.length; j < flen; j++) {
		var face = temp.faces[j];
		if (face instanceof THREE.Face3){
			var csg_vertex_a = temp.vertices[face.a].toCSG_Vertex();
			var csg_vertex_b = temp.vertices[face.b].toCSG_Vertex();
			var csg_vertex_c = temp.vertices[face.c].toCSG_Vertex();
			csg_polygons.push(new CSG.Polygon([csg_vertex_a,csg_vertex_b,csg_vertex_c]));
		}
		else if (face instanceof THREE.Face4){
			var csg_vertex_a = temp.vertices[face.a].toCSG_Vertex();
			var csg_vertex_b = temp.vertices[face.b].toCSG_Vertex();
			var csg_vertex_c = temp.vertices[face.c].toCSG_Vertex();
			var csg_vertex_d = temp.vertices[face.d].toCSG_Vertex();
			csg_polygons.push(new CSG.Polygon([csg_vertex_a,csg_vertex_b,csg_vertex_c,csg_vertex_d]));
		}
		else{
			console.log("ERROR in face # " + j + " -- neither Face3 nor Face4");
			console.log(face);
		}
	}
	var csg_mesh = new CSG.fromPolygons(csg_polygons);

	console.log(csg_mesh);
	return csg_mesh;
}


THREE.Geometry.prototype.toToxic = function() {
	THREE.GeometryUtils.triangulateQuads(this);
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

////////////////////////////////////////
//GEN Geometry API
////////////////////////////////////////
GEN = {};

GEN.Geometry = function() {
};

//API creation utilities
GEN.Geometry.GLOBAL_OBJECT_NAME = '_g';
GEN.Geometry.UNMEMOIZED_PREFIX = '__';

GEN.Geometry.initGlobal = function(){
	GEN.Geometry.buildAPI();
	window[GEN.Geometry.GLOBAL_OBJECT_NAME] = new GEN.Geometry();
}

//meomize all API functions, renaming to internal name and exposing memoized functions.
GEN.Geometry.buildAPI = function() {
	var funz = _.functions(GEN.Geometry.prototype);
	_.each(funz, function(fnName){
		GEN.Geometry.prototype[GEN.Geometry.UNMEMOIZED_PREFIX + fnName] = GEN.Geometry.prototype[fnName];
		GEN.Geometry.prototype[fnName] = goog.memoize(GEN.Geometry.prototype[GEN.Geometry.UNMEMOIZED_PREFIX + fnName]);
	});
};

//Generate text represenrarion of an API function call
//Assumes **ONE** arguments object
GEN.Geometry.generateCodeForFunction = function(fnName, argsObject) {
	var l = _.map(_.keys(argsObject), function(k){
		 return ("   " + k + ': ' + argsObject[k]);
	});
	var argsStr = "{\n"+ l.join(",\n") + "}";
	
	var code = GEN.Geometry.GLOBAL_OBJECT_NAME + '.' + fnName + '(' + argsStr + ')';
	return code;
};


//API functions
GEN.Geometry.prototype.createPoint = function(args) {
	var p = new toxi.geom.Vec3D(args.x, args.y, args.z);
	return p;
};

GEN.Geometry.prototype.createCircle = function(args) {
	var c = new toxi.geom.Circle(args.origin, args.radius);
	return c;
};

GEN.Geometry.prototype.createSphere = function(args) {
	var c = new toxi.geom.Sphere(args.origin, args.radius);
	return c;
};
//TODO: add font selection, bevel?
GEN.Geometry.prototype.createTextGeo = function(args) {
	var c = new THREE.TextGeometry(args.text, {
		size : args.size,
		height : args.height,
		curveSegments : 4,

		font : "optimer",

		bevelThickness : 2,
		bevelSize : 1.5,
		bevelEnabled : true,

		material : 0,
		extrudeMaterial : 1
	});
	//c.toToxic();
	THREE.GeometryUtils.triangulateQuads(c);

	return c;
};
/*
 * 
 */
GEN.Geometry.prototype.createCube = function(args) {
	var c = new toxi.geom.AABB(args.origin, this.createPoint({x: args.width, y: args.depth, z: args.height}));
	return c;
};

GEN.Geometry.prototype.createParametricSurface = function(args) {
	var geo = new THREE.ParametricGeometry(GEN.Geometry.Surfaces[args.name](5), args.udiv, args.vdiv);
	return geo;
};

GEN.Geometry.prototype.createPipe = function(args) {
	var pipe = new THREE.TubeGeometry(args.curve, 2, args.radius, args.sides, false, false);
	return pipe;
};

//TODO: Not nice + take care of all types
GEN.Geometry.prototype.move = function(args) {
	var geometry = args.geometry;
	var translation = args.translation;
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


GEN.Geometry.prototype.union = function(args) {
	console.log("geometry1=");
	console.log(args.geometry1);
	console.log("geometry2=");
	console.log(args.geometry2);

	var csg1 = 	args.geometry1.toCSG_Mesh();
	console.log("csg1=");
	console.log(csg1);
	var csg2 = 	args.geometry2.toCSG_Mesh();
	console.log("csg2=");
	console.log(csg2);
	
	var csg_union = csg1.union(csg2);
	console.log("csg_union=");
	console.log(csg_union);
	
	var renderableUnion = csg_union.toRenderable();
	console.log("renderableUnion=");
	console.log(renderableUnion);
	return renderableUnion;
};

GEN.Geometry.prototype.booleanOperation = function(args) {
	var csg1 = 	args.geometry1.toCSG_Mesh();
	var csg2 = 	args.geometry2.toCSG_Mesh();
	var csg_op = csg1[args.operation](csg2);
	var renderableOutput = csg_op.toRenderable();
	
	return renderableOutput;
};

//TODO: only works for mesh
GEN.Geometry.prototype.scale = function(args) {
	var vec = args.vecOrFactor;
	if(_.isNumber(vec)) {
		vec = this.createPoint(vec);
	}
	console.log(vec);

	if( args.geometry instanceof THREE.Geometry) {
		var ng = args.geometry.clone();
		ng.scale(vec);
	} else {
		ng = args.geometry;
	}

	return ng;
}

GEN.Geometry.prototype.meshComponents = function(args) {
	console.log('running meshComponents');
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

/////////////////////////////////////////
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