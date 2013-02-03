//////////
//MOVE
////////////

var geoms = [];

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

//////////////////
//Till here
//////////////////

Ext.define('GEN.ui.three.Panel', {
	extend : 'Ext.panel.Panel',
	code : '',
	id : 'threePanel',
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

		Meteor.autorun(function() {
			console.log('three-panel');
			//console.log(self);
			var current = Session.get("currentProgram");
			//console.log(current);
			if(_.isUndefined(current))
				return;
			program = Programs.findOne(current);
			//console.log(program);
			if(_.isUndefined(program))
				return;

			console.log('ok');
			//console.log(Blockly.Generator);
			try {
				var code = Blockly.Generator.workspaceToCode('JavaScript');
			} catch(err) {
				//console.log('bad');
				return;
			}
			//console.log('good');
			console.log(code);
			if(code == self.code)
				return;
			self.code = code;
			GEN.runner.removeAll();
			
			//resetScene();
			try {
				//code="console.log(self); " + code;
				eval(code);
			} catch (e) {
				// A boolean is thrown for normal termination.
				// Abnormal termination is a user error.
				if( typeof e != 'boolean') {
					//alert(e);
				}
			}
			console.log(GEN.runner.points);
			self.resetParticleSystem();
			self.addGeometries();
			self.renderScene();
		});
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
		var light = new THREE.PointLight(0xffffff);
		light.position.set(200, 200, 0);
		this.scene.add(light);
		this.createGrid();
		this.createAxis();
		this.initParticleSystem();
		console.log(requestAnimationFrame);
		//container.addEventListener('resize', onWindowResize, false);
	},
	addGeometries: function(){
		_.each(GEN.runner.points, function(p){
			this.particleSystem.geometry.vertices.push(p);
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
