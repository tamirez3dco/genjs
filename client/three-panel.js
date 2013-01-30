//////////
//MOVE
////////////
var camera, scene, renderer;
var WIDTH = 400, HEIGHT = 600;
var container;
var particleSystem;
var geoms = [];

function initParticleSystem() {
	var pMaterial = new THREE.ParticleBasicMaterial({
		color : 0x00FF00,
		size : 2
	});
	var points = new THREE.Geometry();
	particleSystem = new THREE.ParticleSystem(points, pMaterial);
	scene.add(particleSystem);
}

function addPoint(pX, pY, pZ) {
	var p = new THREE.Vector3(pX, pY, pZ);
	console.log(p);
	particleSystem.geometry.vertices.push(p);
	particleSystem.geometry.__dirtyVertices = true;
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
	console.log('addTube');
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
	THREE.GeometryUtils.merge(ng, geometry)
	console.log(ng);
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
	console.log(curve);
	var splinePoints = curve.getSpacedPoints(segments);
	console.log(splinePoints);
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

function resetParticleSystem() {
	scene.remove(particleSystem);
	initParticleSystem();
	//particleSystem.geometry.vertices = [];
	//particleSystem.geometry.__dirtyVertices = true;
	//render();
}

function addGrid() {
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
	scene.add(grid);
}

function init() {
	container = document.getElementById('viewer3d-container');
	var width = $(container).width();
	console.log(width);
	console.log($(container).height());
	renderer = new THREE.WebGLRenderer();
	renderer.setSize($(container).width(), $(container).height());
	container.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(70, $(container).width() / $(container).height(), 1, 1000);
	camera.position.z = 100;
	camera.position.y = -200;
	camera.position.x = 10;
	scene = new THREE.Scene();
	controls = new THREE.OrbitControls(camera, container);
	controls.addEventListener('change', render);
	var light = new THREE.PointLight(0xffffff);
	light.position.set(200, 200, 0);
	scene.add(light);
	addGrid();
	object = new THREE.AxisHelper(50);
	object.position.set(0, 0, 0);
	scene.add(object);

	initParticleSystem();
	container.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = $(container).width() / $(container).height();
	camera.updateProjectionMatrix();

	renderer.setSize($(container).width(), $(container).height());

}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function render() {
	renderer.render(scene, camera);
}

//////////////////
//Till here
//////////////////

Ext.define('GEN.ui.three.Panel', {
	extend : 'Ext.panel.Panel',
	code: '',
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
					Ext.core.DomHelper.append(this.body, {
						tag : 'div',
						id : 'viewer3d-container',
						width : w,
						height : h,
						style : ' width: ' + w + 'px; height: ' + h + 'px;'
					});
					init();
					render();
					animate();
				},
				single : true
			}
		});

		Meteor.autorun(function() {
			console.log('three-panel');
			var current = Session.get("currentProgram");
			if(_.isUndefined(current))
				return;
			program = Programs.findOne(current);
			if(_.isUndefined(program))
				return;
				
			var code = Blockly.Generator.workspaceToCode('JavaScript');
			console.log(code);
			if(code==self.code) 
				return;
			self.code = code;
			
			resetParticleSystem();
			resetScene();
			try {
				eval(code);
			} catch (e) {
				// A boolean is thrown for normal termination.
				// Abnormal termination is a user error.
				if( typeof e != 'boolean') {
					//alert(e);
				}
			}
			render();
		});
	},
	afterRender : function() {
		this.callParent();
	}
});
