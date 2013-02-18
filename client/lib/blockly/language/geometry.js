'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.geometry_point = {
	category : 'Vector',
	title : 'Point',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Point')
		this.appendValueInput("X").setCheck(Number).appendTitle("X");
		this.appendValueInput("Y").setCheck(Number).appendTitle("Y");
		this.appendValueInput("Z").setCheck(Number).appendTitle("Z");
		this.setOutput(true, String);
		this.setTooltip('Returns a point');
	}
};

Blockly.Language.geometry_circle = {
	category : 'Curve',
	title : 'Circle',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Circle')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Returns a circle');
	}
};

Blockly.Language.geometry_sphere = {
	category : 'Surface',
	title : 'Sphere',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Sphere')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Returns a sphere');
	}
};

Blockly.Language.geometry_textGeo = {
	category : 'Mesh',
	title : 'Text',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Text Mesh');
		this.appendValueInput("text").setCheck(String).appendTitle("text");
		this.appendValueInput("size").setCheck(Number).appendTitle("size");
		this.appendValueInput("height").setCheck(Number).appendTitle("height");
		this.setOutput(true, String);
		this.setTooltip('Returns a Text Mesh');
	}
};

Blockly.Language.geometry_parametricSurface = {
	category : 'Mesh',
	title : 'Parametric Surface',
	init : function() {
		console.log('init language: geometry_parametricSurface');
		this.setColour(160);
		//this.appendDummyInput().appendTitle('Parametric Surface')
		this.appendDummyInput().appendTitle(new Blockly.FieldDropdown(this.surfaceNames), 'NAME');
		this.appendValueInput("udiv").setCheck(Number).appendTitle("U Divisions");
		this.appendValueInput("vdiv").setCheck(Number).appendTitle("V Divisions");
		this.setOutput(true, String);
		this.setTooltip('Create a parametric surface');
	}
};
Blockly.Language.geometry_parametricSurface.surfaceNames = [
	['Torus', 'torus'],
	['Klein Surface', 'klein'], 
	['Enneper Surface', 'enneper'],
	['Catenoid Surface', 'catenoid'],
	['Helicoidal Surface', 'helicoidal']];

Blockly.Language.geometry_cube = {
	category : 'Surface',
	title : 'Box',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Box')
		this.appendValueInput("width").setCheck(Number).appendTitle("width");
		this.appendValueInput("height").setCheck(Number).appendTitle("height");
		this.appendValueInput("depth").setCheck(Number).appendTitle("depth");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Returns a box');
	}
};

Blockly.Language.geometry_meshComponents = {
	category : 'Mesh',
	title : 'Components',
	init : function() {
		this.setColour(160);
		//this.appendDummyInput().appendTitle('Cube')
		this.appendDummyInput().appendTitle(new Blockly.FieldDropdown(this.componentNames), 'NAME');
		this.appendValueInput("mesh").setCheck(String).appendTitle("mesh");
		this.setOutput(true, Array);
		this.setTooltip('Returns a mesh component');
	}
};

Blockly.Language.geometry_meshComponents.componentNames = [
	['Mesh Faces', 'faces'],
	['Mesh Edges', 'edges'], 
	['Mesh Vertices', 'vertices'],
	
];
/*
Blockly.Language.geometry_union = {
	category : 'Transform',
	title : 'Union',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Union')
		this.appendValueInput("geometry1").setCheck(String).appendTitle("geometry1");
		this.appendValueInput("geometry2").setCheck(String).appendTitle("geometry2");
		this.setOutput(true, String);
		this.setTooltip('Unions two geometries');
	}
};
*/
Blockly.Language.geometry_booleanOperation = {
	category : 'Transform',
	title : 'Boolean Operations',
	init : function() {
		console.log('init language: geometry_booleanOperation');
		this.setColour(160);
		this.appendDummyInput().appendTitle(new Blockly.FieldDropdown(this.operationNames), 'NAME');
		this.appendValueInput("geometry1").setCheck(String).appendTitle("geometry1");
		this.appendValueInput("geometry2").setCheck(String).appendTitle("geometry2");
		this.setOutput(true, String);
		this.setTooltip('Performs boolean operations');
	}
};
Blockly.Language.geometry_booleanOperation.operationNames = [
	['Union', 'union'],
	['Intersect', 'intersect'], 
	['Subtract', 'subtract']];

Blockly.Language.geometry_move = {
	category : 'Transform',
	title : 'Move',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Move')
		this.appendValueInput("geometry").setCheck(String).appendTitle("geometry");
		this.appendValueInput("vector").setCheck(String).appendTitle("vector");
		this.setOutput(true, String);
		this.setTooltip('Moves a geometry');
	}
};

//TODO: add options to uniform / nonuniform change inputs dynamically
Blockly.Language.geometry_scale = {
	category : 'Transform',
	title : 'Scale',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Scale')
		this.appendValueInput("geometry").setCheck(String).appendTitle("geometry");
		this.appendValueInput("vector").setCheck(String).appendTitle("vector");
		this.setOutput(true, String);
		this.setTooltip('Scales a geometry');
	}
};

Blockly.Language.geometry_pipe = {
	category : 'Mesh',
	title : 'Pipe',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Pipe')
		this.appendValueInput("curve").setCheck(String).appendTitle("curve");
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("sides").setCheck(Number).appendTitle("sides");
		this.setOutput(true, String);
		this.setTooltip('Creates a pipe');
	}
};

/*
Blockly.Language.geometry_circle = {
	category : 'Curve',
	title : 'Circle',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Circle')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Returns a circle');
	}
};
*/
//TODO: reimplement
/*
Blockly.Language.line = {
	category : 'Geometry',
	title : 'Line',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Line')
		this.appendValueInput("P1").setCheck(String).appendTitle("P1");
		this.appendValueInput("P2").setCheck(String).appendTitle("P2");
		this.setOutput(true, String);
		this.setTooltip('Returns a line');
	}
};

Blockly.Language.divideCurve = {
	category : 'Geometry',
	title : 'Divide Curve',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Divide curve')
		this.appendValueInput("curve").setCheck(String).appendTitle("curve");
		this.appendValueInput("segments").setCheck(Number).appendTitle("segments");
		this.setOutput(true, Array);
		this.setTooltip('Divides a curve to n segments');
	}
};

Blockly.Language.geometry_mesh_fromsurface = {
	category : 'Geometry',
	title : 'Mesh Surface',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Mesh Surface');
		this.setOutput(true, String);
		this.appendValueInput('surface').setCheck(String).appendTitle("surface");
	}
};
Blockly.Language.geometry_mesh_subdivide = {
	category : 'Geometry',
	title : 'Subdivide Mesh',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Subdivide');
		this.appendDummyInput().appendTitle(new Blockly.FieldDropdown(this.STRATEGIES), 'STRATEGY');
		this.setOutput(true, String);
		this.appendValueInput('mesh').setCheck(String).appendTitle("mesh");
	}
};

Blockly.Language.geometry_mesh_subdivide.STRATEGIES = [['Midpoint', 'Midpoint'], ['Dual', 'Dual'],['Tri','Tri']];
*/


///Generators
var valueToCode = function(a,b,c) {return Blockly.JavaScript.valueToCode(a,b,c)};
var orderNone = Blockly.JavaScript.ORDER_NONE;
var codeForFunction = function(a,b) {return GEN.Geometry.generateCodeForFunction(a,b)};
var stringifyString = function(s){return '"'+s+'"';};
//Primitives - points, vectors, etc
Blockly.JavaScript.geometry_point = function() {
	var x = valueToCode(this, 'X', orderNone) || 0;
	var y = valueToCode(this, 'Y', orderNone) || 0;
	var z = valueToCode(this, 'Z', orderNone) || 0;
	if((x == null) || (y == null) || (z == null))
		return '';

	var code = codeForFunction('createPoint', {x: x, y: y, z: z});
	return [code, orderNone];
};

//Primitives - 2D
Blockly.JavaScript.geometry_circle = function() {
	var radius = valueToCode(this, 'radius', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || codeForFunction('createPoint', {x: 0, y: 0, z: 0});

	var code = codeForFunction('createCircle', {origin: origin, radius: radius});
	return [code, orderNone];
};

//Primitives - surfaces
Blockly.JavaScript.geometry_cube = function() {
	var width = valueToCode(this, 'width', orderNone) || 10;
	var height = valueToCode(this, 'height', orderNone) || 10;
	var depth = valueToCode(this, 'depth', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || codeForFunction('createPoint', {x: 0, y: 0, z: 0});
	if(origin == null)
		return "";
	
	var code = codeForFunction('createCube', {origin: origin, width: width, height: height, depth: depth});
	return [code, orderNone];
};

Blockly.JavaScript.geometry_sphere = function() {
	var radius = valueToCode(this, 'radius', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || codeForFunction('createPoint', {x: 0, y: 0, z: 0});
	if((origin == null) || (radius == null))
		return "";
		
	var code = codeForFunction('createSphere', {origin: origin, radius: radius});
	return [code, orderNone];
};

//Primitives - meshes
Blockly.JavaScript.geometry_parametricSurface = function() {
	var name = this.getTitleValue('NAME');
	var udiv = valueToCode(this, 'udiv', orderNone) || 20;
	var vdiv = valueToCode(this, 'vdiv', orderNone) || 20;
	
	var code = codeForFunction('createParametricSurface', {name: stringifyString(name), udiv: udiv, vdiv: vdiv});
	return [code, orderNone];
};


Blockly.JavaScript.geometry_booleanOperation = function() {
	console.log("Blockly.JavaScript.geometry_booleanOperation");
	var operation = this.getTitleValue('NAME');
	var geometry1 = valueToCode(this, 'geometry1', orderNone) || null;
	var geometry2 = valueToCode(this, 'geometry2', orderNone) || null;
	if((geometry1 == null) || (geometry2 == null))
		return "";
	
	var code = codeForFunction('booleanOperation', {operation: stringifyString(operation), geometry1: geometry1, geometry2: geometry2});
	return [code, orderNone];
};


Blockly.JavaScript.geometry_textGeo = function() {
	var size = valueToCode(this, 'size', orderNone) || 10;
	var text = valueToCode(this, 'text', orderNone) || '"mussa"';
	var height = valueToCode(this, 'height', orderNone) || 5;
	if((size == null) || (text == null))
		return "";
	
	var code = codeForFunction('createParametricSurface', {size: size, text: text, height: height});
	return [code, orderNone];
};

Blockly.JavaScript.geometry_meshComponents = function() {
	var componentType = this.getTitleValue('NAME');
	var mesh = valueToCode(this, 'mesh', orderNone);
	if(mesh == null)
		return "";

	var code = codeForFunction('meshComponents', {mesh: mesh, componentType: stringifyString(componentType)});
	return [code, orderNone];
};

//Transform - basic
Blockly.JavaScript.geometry_move = function() {
	var geometry = valueToCode(this, 'geometry', orderNone) || null;
	var vector = valueToCode(this, 'vector', orderNone) || codeForFunction('createPoint', {x: 0, y: 0, z: 0});
	if((geometry == null))
		return "";
	
	var code = codeForFunction('move', {geometry: geometry, vector: vector});
	return [code, orderNone];
};

Blockly.JavaScript.geometry_union = function() {
	console.log("Blockly.JavaScript.geometry_union");
	var geometry1 = valueToCode(this, 'geometry1', orderNone) || null;
	var geometry2 = valueToCode(this, 'geometry2', orderNone) || null;
	if((geometry1 == null) || (geometry2 == null))
		return "";
	
	var code = codeForFunction('union', {geometry1: geometry1, geometry2: geometry2});
	return [code, orderNone];
};


Blockly.JavaScript.geometry_scale = function() {
	var geometry = valueToCode(this, 'geometry', orderNone) || null;
	var vector = valueToCode(this, 'vector', orderNone) || codeForFunction('createPoint', {x: 2, y: 2, z: 2});
	if((geometry == null))
		return "";
	
	var code = codeForFunction('scale', {geometry: geometry, vector: vector});
	return [code, orderNone];
};

Blockly.JavaScript.geometry_pipe = function() {
	var curve = valueToCode(this, 'curve', orderNone) || null;
	var radius = valueToCode(this, 'radius', orderNone) || 3;
	var sides = valueToCode(this, 'sides', orderNone) || 12;
	if(curve == null)
		return '';
		
	var code = codeForFunction('createPipe', {curve: curve, radius: radius, sides: sides});
	return [code, Blockly.JavaScript.ORDER_NONE];
};


//TODO: reimplement
/*
Blockly.JavaScript.line = function() {
	var p1 = valueToCode(this, 'P1', orderNone) || codeForFunction('createPoint', {x: 0, y: 0, z: 0});
	var p2 = valueToCode(this, 'P2', orderNone) || '_g.createPoint(10,10,10)';
	if((p1 == null) || (p2 == null))
		return '';
	var code = "addLine(" + p1 + ',' + p2 + ")";
	return [code, orderNone];
};

Blockly.JavaScript.divideCurve = function() {
	var curve = valueToCode(this, 'curve', orderNone) || null;
	var segments = valueToCode(this, 'segments', orderNone) || 10;
	if(curve == null)
		return '';
	var code = "divideCurve(" + curve + ',' + segments + ")";
	return [code, orderNone];
};

Blockly.JavaScript.geometry_mesh_fromsurface = function() {
	var surface = valueToCode(this, 'surface', Blockly.JavaScript.ORDER_NONE) || null;
	if(surface == null)
		return "";
	var code = "GEN.runner.run("+ surface + ".toMesh(20))";
	//console.log(code);
	return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript.geometry_mesh_subdivide = function() {
	var mesh = valueToCode(this, 'mesh', Blockly.JavaScript.ORDER_NONE) || null;
	var strategy = this.getTitleValue('STRATEGY');
	//console.log('kkk');
	//console.log(mesh);
	if(mesh == null)
		return "";
	var code = "GEN.runner.chain("+ mesh + ".toWEMesh() , 'subdivide', [new toxi.geom.mesh.subdiv."+strategy+"Subdivision(), 0.5])";
	//console.log('code');
	//console.log(code);
	return [code, Blockly.JavaScript.ORDER_NONE];
}
*/

