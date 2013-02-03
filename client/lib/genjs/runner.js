GEN = {};
GEN.Runner = function() {
  this.points = [];
  this.geometries = [];
}; 

GEN.Runner.prototype.run = function(result) {
	//console.log(result);
	this.points.push(result);
	return result;
}

GEN.Runner.prototype.removeAll = function() {
	this.points = [];
	this.geometries = [];
}

GEN.Geometry = function() {
}; 

GEN.Geometry.prototype.point = function(pX, pY, pZ) {
	var p = new THREE.Vector3(pX, pY, pZ);
	return p;
}; 

GEN.Geometry.prototype.line = function(p1, p2) {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(p1);
	geometry.vertices.push(p2);
	var spline = new THREE.SplineCurve3([p1, p2]);
	//var l = new THREE.Line(geometry)
	return spline;
}; 



