Ext.define('GEN.ui.three.Panel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.three-panel',
	id : 'threePanel',
	lineColorNormal : 0xff00ff,
	lineColorSelected : 0x00ff00,
	meshFaceColorNormal : 0xff00ff,
	meshEdgeColorNormal : 0x220022,
	meshFaceColorSelected : 0x00ff00,
	meshEdgeColorSelected : 0x002200,
	geometries : {},
	selectedBlock : -1,
	renderOnlySelected : false,
	initializedScene : false,
	code : '',

	tbar : {
		xtype : 'toolbar',
		items : [{
			text : 'Only Selected',
			enableToggle : true,
			cls : 'x-btn-default-small',
			toggleHandler : function() {
				Ext.getCmp('threePanel').renderOnlySelected = this.pressed;
				Ext.getCmp('threePanel').reRenderScene();
			}
		}]
	},
	initComponent : function() {
		this.callParent();
		this.createDefaultMaterials();
		this.on({
			'afterlayout' : {
				fn : this.afterInitialLayout,
				single : true,
				scope : this
			}
		});
		this.initProgramChangeHandler();
		this.initSelectionChangeHandler();
	},
	afterInitialLayout : function() {
		this.threeContainer = Ext.core.DomHelper.append(this.body, {
			tag : 'div',
			id : 'viewer3d-container',
		});
		this.initScene();
		this.renderScene();
		this.startAnimate();
		this.on({
			'resize' : {
				fn : this.onResize,
				scope : this
			},
		});
	},
	onResize : function() {
		var w = this.body.getWidth();
		var h = this.body.getHeight();
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(w, h);
		this.renderScene();
	},
	initProgramChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			console.log('yeah');
			try {
				var blocks = Session.get("renderableBlocks");
				console.log(blocks);
				self.blocks = blocks;
				if(_.isUndefined(blocks))
					return;
				self.reRenderScene();
			} catch(err) {
				console.log(err);
			}
		});
	},
	initSelectionChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			try {
				var blockId = Session.get("selectedBlock");
				if(_.isUndefined(blockId))
					return;
				if(self.initializedScene !== true)
					return;

				if(self.renderOnlySelected) {
					self.selectedBlock = blockId;
					self.reRenderScene();
				} else {
					self.clearSelectionColor();
					self.selectedBlock = blockId;
					self.colorSelection();
					self.renderScene();
				}
			} catch(err) {
				console.log(err);
			}
		});
	},
	//Scene initializations
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
	createDefaultMaterials : function() {
		this.lineMaterial = {};
		this.lineMaterial['normal'] = new THREE.LineBasicMaterial({
			color : this.lineColorNormal,
		});
		this.lineMaterial['selected'] = new THREE.LineBasicMaterial({
			color : this.lineColorSelected,
		});

		this.meshMaterial = {};
		this.meshMaterial['normal'] = [new THREE.MeshLambertMaterial({
			color : this.meshFaceColorNormal,
			opacity : 0.8,
			transparent : true
		}), new THREE.MeshBasicMaterial({
			color : this.meshEdgeColorNormal,
			opacity : 0.5,
			wireframe : true
		})];

		this.meshMaterial['selected'] = [new THREE.MeshLambertMaterial({
			color : this.meshFaceColorSelected,
			opacity : 0.8,
			transparent : true
		}), new THREE.MeshBasicMaterial({
			color : this.meshEdgeColorSelected,
			opacity : 0.5,
			wireframe : true
		})];
	},
	initCamera : function(w, h) {
		this.camera = new THREE.PerspectiveCamera(70, w / h, 1, 1000);
		this.camera.position.x = 10;
		this.camera.position.y = -200;
		this.camera.position.z = 100;
	},
	initLights : function() {
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
		this.initializedScene = true;
	},
	initParticleSystem : function() {
		var pMaterial = new THREE.ParticleBasicMaterial({
			color : 0x00FF00,
			size : 2,
			sizeAttenuation : true,
		});
		var points = new THREE.Geometry();
		this.particleSystem = new THREE.ParticleSystem(points, pMaterial);
		this.scene.add(this.particleSystem);
	},
	resetParticleSystem : function() {
		this.scene.remove(this.particleSystem);
		this.initParticleSystem();
	},
	resetScene : function() {
		this.resetParticleSystem();

		_.each(_.keys(this.geometries), function(blockId) {
			_.each(this.geometries[blockId], function(geometry) {
				this.scene.remove(geometry);
			}, this);
		}, this);

		this.geometries = {};
	},
	addToScene : function(renderable) {
		this.scene.add(renderable);
		this.geometries.push(renderable);
	},
	addGeometries : function() {
		var blocksIds = _.keys(this.blocks);
		_.each(blocksIds, function(id) {
			if((this.renderOnlySelected == true) && (id != this.selectedBlock))
				return;
			var values = this.blocks[id];
			if(_.isArray(values) && values.length == 1 && _.isArray(values[0])) {
				values = values[0];
			}
			_.each(values, function(val) {
				var decoded = THREE.Geometry.decode(val);
				var geometry = decoded.geometry;
				var rendered = null;

				if(decoded.render_type == "Point") {
					this.particleSystem.geometry.vertices.push(geometry.vertices[0]);
					return;
				} else if(decoded.render_type == "Line") {
					rendered = new THREE.Line(geometry, this.lineMaterial[id == this.selectedBlock ? 'selected' : 'normal']);
				} else if(decoded.render_type == "Mesh") {
					rendered = THREE.SceneUtils.createMultiMaterialObject(geometry, this.meshMaterial[id == this.selectedBlock ? 'selected' : 'normal']);
				}

				if(this.geometries[id]) {
					this.geometries[id].push(rendered);
				} else {
					this.geometries[id] = [rendered];
				}
				this.scene.add(rendered);

			}, this);
		}, this);
	},
	setRenderableBlocks: function(blocks){
		var blocksIds = _.keys(blocks);
		_.each(blocksIds, function(id) {
			var values = blocks[id];
			if(_.isArray(values) && values.length == 1 && _.isArray(values[0])) {
				values = values[0];
			}
			_.each(values, function(val) {
				
				
				
			},this);
		}, this);				
	},
	clearSelectionColor : function() {
		if(this.selectedBlock == -1)
			return;
		if(_.isUndefined(this.geometries[this.selectedBlock]))
			return;
		_.each(this.geometries[this.selectedBlock], function(rendered) {
			//console.log(rendered)
			if(rendered.material instanceof THREE.LineBasicMaterial) {
				rendered.material = this.lineMaterial['normal'];
			} else {
				rendered.children[0].material = this.meshMaterial['normal'][0];
				rendered.children[1].material = this.meshMaterial['normal'][1];
			}
		}, this);
	},
	colorSelection : function() {
		if(this.selectedBlock == -1)
			return;
		if(_.isUndefined(this.geometries[this.selectedBlock]))
			return;
		_.each(this.geometries[this.selectedBlock], function(rendered) {
			//console.log(rendered)
			if(rendered.material instanceof THREE.LineBasicMaterial) {
				rendered.material = this.lineMaterial['selected'];
			} else {
				rendered.children[0].material = this.meshMaterial['selected'][0];
				rendered.children[1].material = this.meshMaterial['selected'][1];
			}
		}, this);
	},
	reRenderScene : function() {
		if(this.initializedScene !== true)
			return;
		this.resetScene();
		this.addGeometries();
		this.renderScene();
	},
	renderScene : function() {
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

//////////
//MOVE
////////////
/*
 function addPoint(pX, pY, pZ) {
 var p = new THREE.Vector3(pX, pY, pZ);
 return p;
 }

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
 */