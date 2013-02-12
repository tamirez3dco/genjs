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
	category : 'Mesh',
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
	category : 'Mesh',
	title : 'Cube',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Cube')
		this.appendValueInput("width").setCheck(Number).appendTitle("width");
		this.appendValueInput("height").setCheck(Number).appendTitle("height");
		this.appendValueInput("depth").setCheck(Number).appendTitle("depth");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Returns a cube');
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
		this.setOutput(true, String);
		this.setTooltip('Returns a mesh component');
	}
};

Blockly.Language.geometry_meshComponents.componentNames = [
	['Mesh Faces', 'faces'],
	/*['Mesh Edges', 'edges'], */ //TODO: Implement get edges 
	['Mesh Vertices', 'vertices'],
	
];

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

Blockly.Language.pipe = {
	category : 'Geometry',
	title : 'Pipe',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Pipe')
		this.appendValueInput("curve").setCheck(String).appendTitle("curve");
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("sides").setCheck(Number).appendTitle("sides");
		this.setOutput(true, String);
		this.setTooltip('Returns a pipe');
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
//Primitives - points, vectors, etc
Blockly.JavaScript.geometry_point = function() {
	var x = valueToCode(this, 'X', orderNone) || 0;
	var y = valueToCode(this, 'Y', orderNone) || 0;
	var z = valueToCode(this, 'Z', orderNone) || 0;
	if((x == null) || (y == null) || (z == null))
		return '';

	var code = "_g.createPoint(" + x + ',' + y + ',' + z + ")";
	return [code, orderNone];
};

//Primitives - 2D
Blockly.JavaScript.geometry_circle = function() {
	var radius = valueToCode(this, 'radius', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || '_g.createPoint(0,0,0)';

	var code = "_g.createCircle(" + origin + ',' + radius + ")";
	return [code, orderNone];
};

//Primitives - surfaces
Blockly.JavaScript.geometry_cube = function() {
	var width = valueToCode(this, 'width', orderNone) || 10;
	var height = valueToCode(this, 'height', orderNone) || 10;
	var depth = valueToCode(this, 'depth', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || '_g.createPoint(0,0,0)';
	if(origin == null)
		return "";
	var code = "_g.createCube(" + origin + ',' + width + ',' + depth + ',' + height + ")";

	return [code, orderNone];
};

Blockly.JavaScript.geometry_sphere = function() {
	var radius = valueToCode(this, 'radius', orderNone) || 10;
	var origin = valueToCode(this, 'origin', orderNone) || '_g.createPoint(0,0,0)';
	if((origin == null) || (radius == null))
		return "";

	var code = "_g.createSphere(\n    " + origin + ',\n    ' + radius + "\n)";
	return [code, orderNone];
};

//Primitives - meshes
Blockly.JavaScript.geometry_parametricSurface = function() {
	var name = this.getTitleValue('NAME');
	var udiv = valueToCode(this, 'udiv', orderNone) || 20;
	var vdiv = valueToCode(this, 'vdiv', orderNone) || 20;
	
	var code = "_g.createParametricSurface('" + name + "'," + udiv + "," + vdiv + ")";
	return [code, orderNone];
};

Blockly.JavaScript.geometry_textGeo = function() {
	var size = valueToCode(this, 'size', orderNone) || 10;
	var text = valueToCode(this, 'text', orderNone) || '"mussa"';
	var height = valueToCode(this, 'height', orderNone) || 5;
	if((size == null) || (text == null))
		return "";

	var code = "_g.createTextGeo(" + text + ',' + size + "," + height +")";
	return [code, orderNone];
};

Blockly.JavaScript.geometry_meshComponents = function() {
	var componentType = this.getTitleValue('NAME');
	var mesh = valueToCode(this, 'mesh', orderNone);
	if(mesh == null)
		return "";
	var code = "_g.meshComponents({mesh: "+mesh+", componentType: '"+componentType+"'})";
	return [code, orderNone];
};

//Transform - basic
Blockly.JavaScript.geometry_move = function() {
	var geometry = valueToCode(this, 'geometry', orderNone) || null;
	var vector = valueToCode(this, 'vector', orderNone) || '_g.createPoint(0,0,0)';
	if((geometry == null))
		return "";
	
	var code = "_g.move(" + geometry + "," + vector + ")";
	return [code, orderNone];
};


Blockly.JavaScript.geometry_scale = function() {
	var geometry = valueToCode(this, 'geometry', orderNone) || null;
	var vector = valueToCode(this, 'vector', orderNone) || '_g.createPoint(2,2,2)';
	if((geometry == null))
		return "";
	
	var code = "_g.scale(" + geometry + "," + vector + ")";
	return [code, orderNone];
};


//TODO: reimplement
/*
Blockly.JavaScript.line = function() {
	var p1 = valueToCode(this, 'P1', orderNone) || '_g.createPoint(0,0,0)';
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

Blockly.JavaScript.pipe = function() {
	var curve = valueToCode(this, 'curve', Blockly.JavaScript.ORDER_NONE) || null;
	var radius = valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 3;
	var sides = valueToCode(this, 'sides', Blockly.JavaScript.ORDER_NONE) || 12;
	if(curve == null)
		return '';
	var code = "addTube(" + curve + ',' + radius + ',' + sides + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
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

