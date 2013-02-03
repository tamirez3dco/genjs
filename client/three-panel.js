//////////
//MOVE
////////////
/*
 function addPoint(pX, pY, pZ) {
 var p = new THREE.Vector3(pX, pY, pZ);
 return p;
 }
 */
function addLine(p1, p2) {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(p1);
	geometry.vertices.push(p2);
	var l = new THREE.Line(geometry)
	scene.add(l);
	geoms.push(l);
	var spline = new THREE.SplineCurve3([p1, p2]);
	return spline;
}

function addLineGeometry(geometry, color) {
	var material = new THREE.LineBasicMaterial({
		color : color,
	});
	var line = new THREE.Line(geometry, material);
	scene.add(line);
	geoms.push(line);
}

function addMeshGeometry(geometry, color) {
	tubeMesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [new THREE.MeshLambertMaterial({
		color : color,
		opacity : 0.8,
		transparent : true
	}), new THREE.MeshBasicMaterial({
		color : 0x000000,
		opacity : 0.5,
		wireframe : true
	})]);
	scene.add(tubeMesh);
	geoms.push(tubeMesh);
};

function addSplineGeometry(spline) {
	var splinePoints = spline.getPoints(30);
	var geometry = new THREE.Geometry();
	for(var i = 0; i < splinePoints.length; i++) {
		geometry.vertices.push(splinePoints[i]);
	}
	addLineGeometry(geometry, 0xff00ff);
}

function addCircle(radius) {
	var circle = new THREE.CircleGeometry(radius, 20);
	var geometry = new THREE.Geometry();
	for(var i = 1; i < circle.vertices.length; i++) {
		//console.log(circle.vertices[i])
		geometry.vertices.push(circle.vertices[i]);
	}
	//addLineGeometry(geometry, 0xff00ff);
	spline = new THREE.ClosedSplineCurve3(geometry.vertices);
	addSplineGeometry(spline);
	return geometry;
	return spline;
}

function addTube(curve, radius, sides) {
	//console.log('addTube');
	var tube = new THREE.TubeGeometry(curve, 30, radius, sides, false, false);
	//console.log(tube);
	addMeshGeometry(tube, 0xff00ff);
	return tube
}

function move(geometry, translation) {
	var mat = new THREE.Matrix4();
	mat.identity();
	//console.log(mat);
	mat.setPosition(translation);
	geometry.applyMatrix(mat);
}

function moveGeometry(geometry, translation) {
	var ng = new THREE.Geometry();
	THREE.GeometryUtils.merge(ng, geometry);
	move(ng, translation)
	addMeshGeometry(ng, 0xff00ff);
	return ng;
}

function addSphere(radius, point) {
	var sphere = new THREE.SphereGeometry(radius, 20, 10)
	//console.log(point);
	move(sphere, point);
	addMeshGeometry(sphere, 0xff00ff);
	return sphere;
}

function addCube(width, height, depth, point) {
	var cube = new THREE.CubeGeometry(width, height, depth, 10, 10, 10)
	//console.log(point);
	move(cube, point);
	addMeshGeometry(cube, 0xff00ff);
	return cube;
}

function divideCurve(curve, segments) {
	//console.log(curve);
	var splinePoints = curve.getSpacedPoints(segments);
	//console.log(splinePoints);
	for(var i = 0; i < splinePoints.length; i++) {
		addPoint(splinePoints[i].x, splinePoints[i].y, splinePoints[i].z);
	}
	return splinePoints;
}

function resetScene() {
	for(var i = 0; i < geoms.length; i++) {
		scene.remove(geoms[i]);
	}
	geoms = [];
}

function onWindowResize() {
	camera.aspect = $(container).width() / $(container).height();
	camera.updateProjectionMatrix();

	renderer.setSize($(container).width(), $(container).height());

}

//////////////////
//Till here
//////////////////

Ext.define('GEN.ui.three.Panel', {
	extend : 'Ext.panel.Panel',
	code : '',
	id : 'threePanel',
	lineColor : 0xff00ff,
	meshFaceColor : 0xff00ff,
	meshEdgeColor : 0x000000,
	geometries : [],
	bodyStyle : {
	},
	defaults : {
	},
	alias : 'widget.three-panel',
	tbar : {
		xtype : 'toolbar',
		items : []
	},
	initComponent : function() {
		var self = this;
		this.callParent();

		this.lineMaterial = new THREE.LineBasicMaterial({
			color : this.lineColor,
		});
		this.meshMaterial = [new THREE.MeshLambertMaterial({
			color : this.meshFaceColor,
			opacity : 0.8,
			transparent : true
		}), new THREE.MeshBasicMaterial({
			color : this.meshEdgeColor,
			opacity : 0.5,
			wireframe : true
		})];
		this.on({
			'afterlayout' : {
				fn : function() {
					var w = this.body.getWidth();
					var h = this.body.getHeight();
					this.threeContainer = Ext.core.DomHelper.append(this.body, {
						tag : 'div',
						id : 'viewer3d-container',
						width : w,
						height : h,
						style : ' width: ' + w + 'px; height: ' + h + 'px;'
					});
					this.initScene();
					this.renderScene();
					this.startAnimate();
				},
				single : true
			}
		});
		this.initProgramChangeHandler();
	},
	afterInitialLayout: function() {
	},
	initProgramChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			var current = Session.get("currentProgram");
			if(_.isUndefined(current))
				return;
			program = Programs.findOne(current);
			if(_.isUndefined(program))
				return;

			try {
				var code = Blockly.Generator.workspaceToCode('JavaScript');
			} catch(err) {
				return;
			}

			if(code == self.code)
				return;
			self.code = code;

			self.execCode();
		});
	},
	execCode : function() {
		console.log(this.code);
		GEN.runner.removeAll();
		try {
			eval(this.code);
		} catch (e) {
			return;
		}
		this.resetScene();
		this.resetParticleSystem();
		this.addGeometries();
		this.renderScene();
	},
	afterRender : function() {
		this.callParent();
	},
	createAxis : function() {
		axis = new THREE.AxisHelper(50);
		axis.position.set(0, 0, 0);
		this.scene.add(axis);
	},
	createGrid : function() {
		var size = 200, step = 10;
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial({
			vertexColors : THREE.VertexColors
		});
		var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0x888888);

		for(var i = -size; i <= size; i += step) {
			geometry.vertices.push(new THREE.Vector3(-size, i, 0));
			geometry.vertices.push(new THREE.Vector3(size, i, 0));

			geometry.vertices.push(new THREE.Vector3(i, -size, 0));
			geometry.vertices.push(new THREE.Vector3(i, size, 0));

			var color = i === 0 ? color1 : color2;

			geometry.colors.push(color, color, color, color);

		}

		var grid = new THREE.Line(geometry, material, THREE.LinePieces);
		this.scene.add(grid);
	},
	initParticleSystem : function() {
		var pMaterial = new THREE.ParticleBasicMaterial({
			color : 0x00FF00,
			size : 2
		});
		var points = new THREE.Geometry();
		this.particleSystem = new THREE.ParticleSystem(points, pMaterial);
		this.scene.add(this.particleSystem);
	},
	resetParticleSystem : function() {
		this.scene.remove(this.particleSystem);
		this.initParticleSystem();

	},
	initCamera : function(w, h) {
		this.camera = new THREE.PerspectiveCamera(70, w / h, 1, 1000);
		this.camera.position.x = 10;
		this.camera.position.y = -200;
		this.camera.position.z = 100;
	},
	initLights: function() {
		var light1 = new THREE.PointLight(0xffffff);
		light1.position.set(-50, -100, 100);
		var light2 = new THREE.PointLight(0xffffff);
		light2.position.set(50, 100, -100);
		this.scene.add(light1);
		this.scene.add(light2);
	},
	initScene : function() {
		var w = this.body.getWidth();
		var h = this.body.getHeight();
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(w, h);
		this.threeContainer.appendChild(this.renderer.domElement);
		this.initCamera(w, h)

		this.scene = new THREE.Scene();
		this.controls = new THREE.OrbitControls(this.camera, this.threeContainer);
		this.controls.addEventListener('change', this.renderScene);
		this.initLights();
		this.createGrid();
		this.createAxis();
		this.initParticleSystem();
		console.log(requestAnimationFrame);
		//container.addEventListener('resize', onWindowResize, false);
	},
	resetScene : function() {
		for(var i = 0; i < this.geometries.length; i++) {
			this.scene.remove(this.geometries[i]);
		}
		this.geometries = [];
	},
	addToScene : function(renderable) {
		this.scene.add(renderable);
		this.geometries.push(renderable);
	},
	addLineGeometry : function(poly) {
		var geometry = new THREE.Geometry();
		console.log(geometry);
		for(var i = 0; i < poly.vertices.length; i++) {
			//console.log(circle.vertices[i])
			//console.log(i);
			var p = poly.vertices[i];
			geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
		}
		//should be only for closed...
		var p = poly.vertices[0];
		geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));

		var line = new THREE.Line(geometry, this.lineMaterial);
		this.addToScene(line);
	},
	addMeshGeometry : function(triangleMesh) {
		console.log(triangleMesh);
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
		for(var j = 0, flen = triangleMesh.faces.length; j < flen; j++) {
			addFace(triangleMesh.faces[j]);
		}

		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		
		console.log(geometry);
		var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, this.meshMaterial);
		this.addToScene(mesh);
	},
	addGeometries : function() {
		console.log('points');
		_.each(GEN.runner.points, function(p) {
			console.log(p);
			var threeV = new THREE.Vector3(p.x, p.y, p.z);
			this.particleSystem.geometry.vertices.push(threeV);
		}, this);
		console.log('geometries');
		_.each(GEN.runner.geometries, function(g) {
			console.log(g);
			if( g instanceof toxi.geom.Circle || g instanceof toxi.geom.Ellipse) {
				var poly = g.toPolygon2D(30);
				//console.log(poly);
				this.addLineGeometry(poly);
			} else if( g instanceof toxi.geom.Sphere) {
				var mesh = g.toMesh(20);
				this.addMeshGeometry(mesh);
			} else if( g instanceof toxi.geom.AABB) {
				var mesh = g.toMesh();
				this.addMeshGeometry(mesh);
			}

		}, this);
	},
	renderScene : function() {
		//console.log('lll');
		var self = Ext.getCmp('threePanel');
		self.renderer.render(self.scene, self.camera);
	},
	startAnimate : function() {
		var self = this;
		var animate = function() {
			requestAnimationFrame(animate);
			self.controls.update();
		};
		animate();
	}
});
