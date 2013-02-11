'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.geometry_point = {
	category : 'Geometry',
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
	category : 'Geometry',
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
	category : 'Geometry',
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
	category : 'Geometry',
	title : 'TextGeo',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('TextGeo')
		this.appendValueInput("size").setCheck(Number).appendTitle("size");
		this.appendValueInput("text").setCheck(String).appendTitle("text");
		this.appendValueInput("height").setCheck(Number).appendTitle("height");
		this.setOutput(true, String);
		this.setTooltip('Returns a Text Geometry');
	}
};

Blockly.Language.geometry_klein = {
	category : 'Geometry',
	title : 'Klein',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Klein')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		this.setTooltip('Klein');
	}
};

Blockly.Language.geometry_cube = {
	category : 'Geometry',
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

Blockly.Language.geometry_move = {
	category : 'Geometry',
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

//Primitives - points, vectors, etc
Blockly.JavaScript.geometry_point = function() {
	var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_NONE) || 0;
	var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_NONE) || 0;
	var z = Blockly.JavaScript.valueToCode(this, 'Z', Blockly.JavaScript.ORDER_NONE) || 0;
	if((x == null) || (y == null) || (z == null))
		return '';

	var code = "_g.createPoint(" + x + ',' + y + ',' + z + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

//Primitives - 2D
Blockly.JavaScript.geometry_circle = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';

	var code = "_g.createCircle(" + origin + ',' + radius + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

//Primitives - surfaces
Blockly.JavaScript.geometry_cube = function() {
	var width = Blockly.JavaScript.valueToCode(this, 'width', Blockly.JavaScript.ORDER_NONE) || 10;
	var height = Blockly.JavaScript.valueToCode(this, 'height', Blockly.JavaScript.ORDER_NONE) || 10;
	var depth = Blockly.JavaScript.valueToCode(this, 'depth', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	if(origin == null)
		return "";
	var code = "_g.createCube(" + origin + ',' + width + ',' + depth + ',' + height + ")";

	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.geometry_sphere = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	if((origin == null) || (radius == null))
		return "";

	var code = "_g.createSphere(" + origin + ',' + radius + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

//Primitives - meshes
Blockly.JavaScript.geometry_klein = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	if((origin == null) || (radius == null))
		return "";

	var code = "_g.createKlein(" + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.geometry_textGeo = function() {
	var size = Blockly.JavaScript.valueToCode(this, 'size', Blockly.JavaScript.ORDER_NONE) || 10;
	var text = Blockly.JavaScript.valueToCode(this, 'text', Blockly.JavaScript.ORDER_NONE) || 'Blockly.debug.trace(\"mussa\")';
	var height = Blockly.JavaScript.valueToCode(this, 'height', Blockly.JavaScript.ORDER_NONE) || 5;
	if((size == null) || (text == null))
		return "";

	var code = "_g.createTextGeo(" + text + ',' + size + "," + height +")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

//Transform - basic
Blockly.JavaScript.geometry_move = function() {
	var geometry = Blockly.JavaScript.valueToCode(this, 'geometry', Blockly.JavaScript.ORDER_NONE) || null;
	var vector = Blockly.JavaScript.valueToCode(this, 'vector', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	if((geometry == null))
		return "";
	
	var code = "_g.move(" + geometry + "," + vector + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript.geometry_scale = function() {
	var geometry = Blockly.JavaScript.valueToCode(this, 'geometry', Blockly.JavaScript.ORDER_NONE) || null;
	var vector = Blockly.JavaScript.valueToCode(this, 'vector', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	if((geometry == null))
		return "";
	
	var code = "_g.scale(" + geometry + "," + vector + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};


//TODO: reimplement
/*
Blockly.JavaScript.line = function() {
	var p1 = Blockly.JavaScript.valueToCode(this, 'P1', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(0,0,0)';
	var p2 = Blockly.JavaScript.valueToCode(this, 'P2', Blockly.JavaScript.ORDER_NONE) || '_g.createPoint(10,10,10)';
	if((p1 == null) || (p2 == null))
		return '';
	var code = "addLine(" + p1 + ',' + p2 + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.divideCurve = function() {
	var curve = Blockly.JavaScript.valueToCode(this, 'curve', Blockly.JavaScript.ORDER_NONE) || null;
	var segments = Blockly.JavaScript.valueToCode(this, 'segments', Blockly.JavaScript.ORDER_NONE) || 10;
	if(curve == null)
		return '';
	var code = "divideCurve(" + curve + ',' + segments + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.pipe = function() {
	var curve = Blockly.JavaScript.valueToCode(this, 'curve', Blockly.JavaScript.ORDER_NONE) || null;
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 3;
	var sides = Blockly.JavaScript.valueToCode(this, 'sides', Blockly.JavaScript.ORDER_NONE) || 12;
	if(curve == null)
		return '';
	var code = "addTube(" + curve + ',' + radius + ',' + sides + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.geometry_mesh_fromsurface = function() {
	var surface = Blockly.JavaScript.valueToCode(this, 'surface', Blockly.JavaScript.ORDER_NONE) || null;
	if(surface == null)
		return "";
	var code = "GEN.runner.run("+ surface + ".toMesh(20))";
	//console.log(code);
	return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript.geometry_mesh_subdivide = function() {
	var mesh = Blockly.JavaScript.valueToCode(this, 'mesh', Blockly.JavaScript.ORDER_NONE) || null;
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

