'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.point = {
	category : 'Geometry',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Point')
		this.appendValueInput("X").setCheck(Number).appendTitle("X");
		this.appendValueInput("Y").setCheck(Number).appendTitle("Y");
		this.appendValueInput("Z").setCheck(Number).appendTitle("Z");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a point');
	}
};

Blockly.Language.line = {
	category : 'Geometry',
	title: 'Line',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Line')
		this.appendValueInput("P1").setCheck(String).appendTitle("P1");
		this.appendValueInput("P2").setCheck(String).appendTitle("P2");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a line');
	}
};

Blockly.Language.pipe = {
	category : 'Geometry',
	title: 'Pipe',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Pipe')
		this.appendValueInput("curve").setCheck(String).appendTitle("curve");
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("sides").setCheck(Number).appendTitle("sides");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a pipe');
	}
};

Blockly.Language.divideCurve = {
	category : 'Geometry',
	title: 'Divide Curve',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Divide curve')
		this.appendValueInput("curve").setCheck(String).appendTitle("curve");
		this.appendValueInput("segments").setCheck(Number).appendTitle("segments");
		this.setOutput(true, Array);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Divides a curve to n segments');
	}
};

Blockly.Language.circle = {
	category : 'Geometry',
	title: 'Circle',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Circle')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a circle');
	}
};

Blockly.Language.sphere = {
	category : 'Geometry',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Sphere')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a sphere');
	}
};

Blockly.Language.move = {
	category : 'Geometry',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Move')
		this.appendValueInput("geometry").setCheck(String).appendTitle("geometry");
		this.appendValueInput("vector").setCheck(String).appendTitle("vector");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Moves a geometry');
	}
};

Blockly.Language.cube = {
	category : 'Geometry',
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Cube')
		this.appendValueInput("width").setCheck(Number).appendTitle("width");
		this.appendValueInput("height").setCheck(Number).appendTitle("height");
		this.appendValueInput("depth").setCheck(Number).appendTitle("depth");
		this.appendValueInput("origin").setCheck(String).appendTitle("origin");
		this.setOutput(true, String);
		//this.setPreviousStatement(true);
		//this.setNextStatement(true);
		this.setTooltip('Returns a sphere');
	}
};
Blockly.JavaScript.point = function() {
	var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_NONE) || 0;
	var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_NONE) || 0;
	var z = Blockly.JavaScript.valueToCode(this, 'Z', Blockly.JavaScript.ORDER_NONE) || 0;
	if((x == null) || (y == null) || (z == null))
		return '';
	
	var code = "GEN.runner.run(new toxi.geom.Vec3D(" + x + ',' + y + ',' + z + "))";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.line = function() {
	var p1 = Blockly.JavaScript.valueToCode(this, 'P1', Blockly.JavaScript.ORDER_NONE) || 'addPoint(0,0,0)';
	var p2 = Blockly.JavaScript.valueToCode(this, 'P2', Blockly.JavaScript.ORDER_NONE) || 'addPoint(10,10,0)';
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

Blockly.JavaScript.circle = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || 'GEN.runner.run(new toxi.geom.Vec3D(0,0,0))';
	
	var code = "GEN.runner.run(new toxi.geom.Circle(" + origin + ',' + radius + "))";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.sphere = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || 'GEN.runner.run(new toxi.geom.Vec3D(0,0,0))';
	if ((origin==null)||(radius==null)) return "";
	
	var code = "GEN.runner.run(new toxi.geom.Sphere(" + origin + ',' + radius + "))";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.move = function() {
	var geometry = Blockly.JavaScript.valueToCode(this, 'geometry', Blockly.JavaScript.ORDER_NONE) || null;
	var vector = Blockly.JavaScript.valueToCode(this, 'vector', Blockly.JavaScript.ORDER_NONE) || 'addPoint(0,0,0)';
	if ((geometry==null)) return "";
	var code = "moveGeometry(" + geometry + ',' + vector +")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.cube = function() {
	var width = Blockly.JavaScript.valueToCode(this, 'width', Blockly.JavaScript.ORDER_NONE) || 10;
	var height = Blockly.JavaScript.valueToCode(this, 'height', Blockly.JavaScript.ORDER_NONE) || 10;
	var depth = Blockly.JavaScript.valueToCode(this, 'depth', Blockly.JavaScript.ORDER_NONE) || 10;
	var origin = Blockly.JavaScript.valueToCode(this, 'origin', Blockly.JavaScript.ORDER_NONE) || 'GEN.runner.run(new toxi.geom.Vec3D(0,0,0))';
	if (origin==null) return "";
	var code = "GEN.runner.run(new toxi.geom.AABB(" + origin + ", GEN.runner.run(new toxi.geom.Vec3D("+ width + ',' + depth + ',' +  height+"))))";
	
	return [code, Blockly.JavaScript.ORDER_NONE];
};