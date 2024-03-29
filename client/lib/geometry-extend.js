//toxi render types
toxi.geom.Vec3D.prototype.RENDER_TYPE = "Point";
toxi.geom.Polygon2D.prototype.RENDER_TYPE = "Line";
toxi.geom.Ellipse.prototype.RENDER_TYPE = "Line";
toxi.geom.Circle.prototype.RENDER_TYPE = "Line";
toxi.geom.Sphere.prototype.RENDER_TYPE = "Mesh";
toxi.geom.AABB.prototype.RENDER_TYPE = "Mesh";
toxi.geom.mesh.TriangleMesh.prototype.RENDER_TYPE = "Mesh";
//THREE render types
THREE.Shape.prototype.RENDER_TYPE = "Shape";
THREE.Vector3.prototype.RENDER_TYPE = "Point";
THREE.Curve.prototype.RENDER_TYPE = "Line";
THREE.Geometry.prototype.RENDER_TYPE = "Mesh";

//Points
toxi.geom.Vec3D.prototype.toRenderable = function() {
	return new THREE.Vector3(this.x, this.y, this.z);
}
toxi.geom.Vec3D.prototype.toCSG = function() {
	return new CSG.Vector(this.x, this.y, this.z);
}
toxi.geom.Vec3D.prototype.toTHREE = function() {
	return new THREE.Vector3(this.x, this.y, this.z);
}
toxi.geom.Vec3D.prototype.toCSG_Vertex = function() {
	var CSG_pos = new CSG.Vector(this.x, this.y, this.z);
	var CSG_normal = new CSG.Vector(this.normal.x, this.normal.y, this.normal.z);
	return new CSG.Vertex(CSG_pos, CSG_normal);
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
	return new CSG.Vertex(CSG_pos, CSG_normal);
}

THREE.Shape.prototype.toRenderable = function() {
	var ret = new THREE.ShapeGeometry(this);
	ret.RENDER_TYPE = "Shape";
	return ret;
}

THREE.Vector3.prototype.toRenderable = function() {
	return this;
}
THREE.Vector3.prototype.toTHREE = function() {
	return this;
}
THREE.Vector3.fromJSON = function(obj) {
	return new THREE.Vector3(obj[0], obj[1], obj[2]);
}
THREE.Vector3.prototype.setFromJSON = function(obj) {
	this.x = obj[0];
	this.y = obj[1];
	this.z = obj[2];
}
THREE.Vector3.prototype.toJSON = function() {
	return [this.x, this.y, this.z];
}
THREE.Vector3.prototype.encode = function(precision, type) {
	var g = new THREE.Geometry();
	g.vertices.push(this);
	return g.encode(precision, type);
}
/*
 THREE.Vector3.prototype.toString = function() {
 return '[x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', z: ' + this.z.toFixed(2) + ']';
 }
 */
THREE.Vector3.prototype.toString = function() {
	return "[ x: " + this.x + ", y: " + this.y + ", z: " + this.z + "]";
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

toxi.geom.Circle.prototype.toThreeCurve = function() {
	console.log(this);
	return new THREE.EllipseCurve3(this.x, this.y, this.radius.x, this.radius.y, 0, 2 * Math.PI, true);
}
THREE.Curve.prototype.toThreeCurve = function() {
	return this;
}
THREE.Curve.prototype.toRenderable = function() {
	var geometry = new THREE.Geometry();
	//var points = this.getPoints(300);
	var points = this.getPointsByDistance(0.1);
	//console.log(points);
	for(var i = 0; i < points.length; i++) {
		geometry.vertices.push(new THREE.Vector3(points[i].x, points[i].y, points[i].z));
	}

	return geometry;
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
		g.faces.push(new THREE.Face4(i1, i2, i3, i4));
	};
	var v3 = function(g, a) {
		var threeV = new THREE.Vector3(a.pos.x, a.pos.y, a.pos.z);
		g.vertices.push(threeV);
	};
	var addFaces = function(polygon) {

		for( k = 1; k < polygon.vertices.length - 1; k++) {
			startIndex = geometry.vertices.length;
			var vectors = [polygon.vertices[0], polygon.vertices[k], polygon.vertices[k + 1]];
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
		csg_polygons.push(new CSG.Polygon([csg_vertex_a, csg_vertex_b, csg_vertex_c]));
	}
	var csg_mesh = new CSG.fromPolygons(csg_polygons);

	//console.log(csg_mesh);
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
	//console.log("flipping faces on toxic.geom.Sphere...")
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
	try {
		THREE.GeometryUtils.triangulateQuads(temp);
	} catch(err) {
		//console.log("Error description: " + err.message + "\n\n");
	}

	var csg_polygons = [];
	for(var j = 0, flen = temp.faces.length; j < flen; j++) {
		var face = temp.faces[j];
		if( face instanceof THREE.Face3) {
			var csg_vertex_a = temp.vertices[face.a].toCSG_Vertex();
			var csg_vertex_b = temp.vertices[face.b].toCSG_Vertex();
			var csg_vertex_c = temp.vertices[face.c].toCSG_Vertex();
			csg_polygons.push(new CSG.Polygon([csg_vertex_a, csg_vertex_b, csg_vertex_c]));
		} else if( face instanceof THREE.Face4) {
			var csg_vertex_a = temp.vertices[face.a].toCSG_Vertex();
			var csg_vertex_b = temp.vertices[face.b].toCSG_Vertex();
			var csg_vertex_c = temp.vertices[face.c].toCSG_Vertex();
			var csg_vertex_d = temp.vertices[face.d].toCSG_Vertex();
			csg_polygons.push(new CSG.Polygon([csg_vertex_a, csg_vertex_b, csg_vertex_c, csg_vertex_d]));
		} else {
			//console.log("ERROR in face # " + j + " -- neither Face3 nor Face4");
			//console.log(face);
		}
	}
	var csg_mesh = new CSG.fromPolygons(csg_polygons);

	//console.log(csg_mesh);
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
/*
 * Three faces
 */
THREE.Face3.fromJSON = function(obj) {
	var face = new THREE.Face3(obj.a, obj.b, obj.c);
	face.normal.setFromJSON(obj.normal);
	//face.color.copy(this.color);
	face.centroid.setFromJSON(obj.centroid);

	face.materialIndex = obj.materialIndex;

	for(var i = 0; i < obj.vertexNormals.length; i++) {
		face.vertexNormals.push(THREE.Vector3.fromJSON(obj.vertexNormals[i]));
	}
	//face.vertexColors =
	for(var i = 0; i < obj.vertexTangents.length; i++) {
		face.vertexTangents.push(THREE.Vector3.fromJSON(obj.vertexTangents[i]));
	}
	return face;
}
THREE.Face4.fromJSON = function(obj) {
	var face = new THREE.Face4(obj.a, obj.b, obj.c, obj.d);
	face.normal.setFromJSON(obj.normal);
	//face.color.copy(this.color);
	face.centroid.setFromJSON(obj.centroid);

	face.materialIndex = obj.materialIndex;

	for(var i = 0; i < obj.vertexNormals.length; i++) {
		face.vertexNormals.push(THREE.Vector3.fromJSON(obj.vertexNormals[i]));
	}

	//face.vertexColors =
	for(var i = 0; i < obj.vertexTangents.length; i++) {
		face.vertexTangents.push(THREE.Vector3.fromJSON(obj.vertexTangents[i]));
	}
	return face;
}
/*
 * Three mesh geometry
 */
THREE.Geometry.prototype.toRenderable = function() {
	return this;
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
THREE.Geometry.prototype.encode = function(precision, render_type) {
	//this.encode2();
	var vertices = this.vertices;
	var faces = this.faces;

	var vco = [];
	for(var i = 0; i < vertices.length; i++) {
		vco.push(vertices[i].x, vertices[i].y, vertices[i].z);
	}

	var fco = [];
	for(var i = 0; i < faces.length; i++) {
		var f = [faces[i].a, faces[i].b, faces[i].c];
		if(faces[i].d)
			f.push(faces[i].d);

		fco.push(f);
        var fc = [faces[i].normal.x, faces[i].normal.y, faces[i].normal.z, faces[i].centroid.x, faces[i].centroid.y, faces[i].centroid.z];
        fco.push(fc);
	}

	var encoded = {
		render_type : render_type,
		data : {
			v : vco,
			f : fco
		}
	};
	return encoded;
}

THREE.Geometry.prototype.encode2 = function(precision, render_type) {
	var obj = JSON.stringify(this);
	var encoded = {
		render_type : render_type,
		data : this
	};
	return encoded;
}

THREE.Geometry.decode = function(json) {
	var geometry = new THREE.Geometry();
	var f3 = function(i1, i2, i3) {
		//unlike toxiclibs, a face in three.js are indices related to the vertices array
		return new THREE.Face3(i1, i2, i3);
	};
	var f4 = function( i1, i2, i3, i4) {
		//unlike toxiclibs, a face in three.js are indices related to the vertices array
		return new THREE.Face4(i1, i2, i3, i4);
	};
	var v3 = function(g, x, y, z) {
		var threeV = new THREE.Vector3(x, y, z);
		g.vertices.push(threeV);
	};
    var sv3 = function( x, y, z) {
        return new THREE.Vector3(x, y, z);

    };
	//var coded = JSON.parse(str);//str.split("#");
	var coded = json.data;

	//var vertices = coded[1].split(',');
	var vertices = coded.v;
	for(var i = 0; i < vertices.length; i += 3) {
		v3(geometry, vertices[i], vertices[i + 1], vertices[i + 2]);
	}

	var faces = coded.f;
	for(var i = 0; i < faces.length; i+=2) {
		var vcs = faces[i];
        var f;
		if(vcs.length == 3) {
			f = f3( vcs[0], vcs[1], vcs[2]);
		} else {
			f = f4( vcs[0], vcs[1], vcs[2], vcs[3]);
		}
        var more = faces[i+1];
        f.normal = sv3(more[0], more[1], more[2]);
        f.centroid = sv3(more[3], more[4], more[5]);
        //console.log(f);
        geometry.faces.push(f);
	}

	//geometry.computeCentroids();
	//geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return {
		render_type : json.render_type,
		geometry : geometry
	};
}

THREE.Geometry.decode2 = function(obj) {
	//console.log(obj);
	//obj = JSON.parse(obj);
	var f34 = function(g, f) {
		if(f.d != undefined) {
			var nf = THREE.Face4.fromJSON(f);
		} else {
			var nf = THREE.Face3.fromJSON(f);
		}
		g.faces.push(nf);
	};
	var geometry = new THREE.Geometry();
	var coded = obj.data;

	var vertices = coded.vertices;
	for(var i = 0; i < vertices.length; i++) {
		geometry.vertices.push(THREE.Vector3.fromJSON(vertices[i]));
	}
	var faces = coded.faces;
	for(var i = 0; i < faces.length; i++) {
		f34(geometry, faces[i]);
	}
	
	return {
		render_type : obj.render_type,
		geometry : geometry
	};
}

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
/*
 * Abstract curve
 */
THREE.Curve.prototype.translate = function(vec) {
	if(vec == null)
		return null;
	var matrix = new THREE.Matrix4();
	matrix.makeTranslation(vec.x, vec.y, vec.z);
	this.applyMatrix(matrix);
	return this;
};

THREE.Curve.prototype.scale = function(vec) {
	if(vec == null)
		return null;
	var matrix = new THREE.Matrix4();
	matrix.makeScale(vec.x, vec.y, vec.z);
	this.applyMatrix(matrix);
	return this;
};

THREE.Curve.prototype.getPointsByDistance = function(distance) {
	var divisions = Math.round(this.getLength() / distance);
	return this.getPoints(divisions);
};
/*
 * Ellipse
 */
THREE.EllipseCurve3 = function(origin, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, frame) {
	origin = origin.toTHREE();
	this.origin = origin;
	this._origin = origin;

	this.xRadius = xRadius;
	this.yRadius = yRadius;
	this._xRadius = xRadius;
	this._yRadius = yRadius;

	this.aStartAngle = aStartAngle;
	this.aEndAngle = aEndAngle;

	this.aClockwise = aClockwise;
	this.matrix = frame || new THREE.Matrix4().identity();

};

THREE.EllipseCurve3.prototype = Object.create(THREE.Curve.prototype);

THREE.EllipseCurve3.prototype.getPoint = function(t) {
	var deltaAngle = this.aEndAngle - this.aStartAngle;

	if(!this.aClockwise) {
		t = 1 - t;
	}

	var angle = this.aStartAngle + t * deltaAngle;

	var tx = this._origin.x + this._xRadius * Math.cos(angle);
	var ty = this._origin.y + this._yRadius * Math.sin(angle);
	var vec = new THREE.Vector3(tx, ty, 0);
	vec.applyMatrix4(this.matrix);

	return vec;
};
THREE.EllipseCurve3.prototype.clone = function() {
	return new THREE.EllipseCurve3(this._origin.clone(), this._xRadius, this._yRadius, this.aStartAngle, this.aEndAngle, this.aClockwise, this.matrix.clone());
};

THREE.EllipseCurve3.prototype.applyMatrix = function(matrix) {
	this.matrix.multiplyMatrices(matrix, this.matrix);
	this.xRadius = this._origin.distanceTo((new THREE.Vector3(this._xRadius, 0, 0)).applyMatrix4(this.matrix));
	this.yRadius = this._origin.distanceTo((new THREE.Vector3(0, this._yRadius, 0)).applyMatrix4(this.matrix));
	this.origin = this._origin.applyMatrix4(this.matrix);
};
/*
 * Line
 */
THREE.LineCurve3.prototype.clone = function() {
	return new THREE.LineCurve3(this.v1.clone(), this.v2.clone());
};

THREE.LineCurve3.prototype.applyMatrix = function(matrix) {
	this.v1.applyMatrix4(matrix);
	this.v2.applyMatrix4(matrix);
};
/*
 * Spline
 */
THREE.SplineCurve3.prototype.clone = function() {
	var np = [];
	for(var i = 0; i < this.points.length; i++) {
		np.push(this.points[i].clone())
	}
	return new THREE.SplineCurve3(np);
};

THREE.SplineCurve3.prototype.applyMatrix = function(matrix) {
	for(var i = 0; i < this.points.length; i++) {
		this.points[i].applyMatrix4(matrix);
	}
};
/*
 * Closed Spline
 */
THREE.ClosedSplineCurve3.prototype.clone = function() {
	var np = [];
	for(var i = 0; i < this.points.length; i++) {
		np.push(this.points[i].clone())
	}
	return new THREE.ClosedSplineCurve3(np);
};

THREE.ClosedSplineCurve3.prototype.applyMatrix = function(matrix) {
	for(var i = 0; i < this.points.length; i++) {
		this.points[i].applyMatrix4(matrix);
	}
};
