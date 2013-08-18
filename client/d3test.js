var w = 540,
    h = 450,
    k = (4/3)*(Math.sqrt(2)-1);

//var data = [[30,0], [35,30], [80,65],[50,145],[20,195],[70,205],[40,275],[45,315]];
//var data = [30, 35, 80, 65, 50, 20, 70, 10];
var data = [2.9, 3.9, 4.2, 4.3, 4.3, 5.4, 10.5, 11.6, 14.1, 14.7, 24.2];
var prepareData = function(data){
    var total = data.reduce(function(a, b) {
        return a + b;
    });
    var scale = 360/total;
    data.sort(d3.ascending);
    var sum=90, nd=[];
    for(var i=0; i<data.length; i++){
        var sd = data[i]*scale;
        nd.push([sd,sum]);
        sum+=sd;
    }
    return nd;
}
var makeBezier = function(x0, y0, cx0, cy0, cx1, cy1, x1, y1) {
    var path = "M "+x0+" "+y0+" C "+cx0+" "+cy0+" "+cx1+" "+cy1+" "+x1+" "+y1;
    return path;
}
var makeBezier2 = function(cx0, cy0, cx1, cy1, x1, y1) {
    var path = "C "+cx0+" "+cy0+" "+cx1+" "+cy1+" "+x1+" "+y1;
    return path;
}
var makeBezierL = function(p, a) {
    a = a*(Math.PI/180);
    var np=[];
    for(var i=0; i<p.length; i+=2){
        var rp = rot2d(p[i], p[i+1], a);
        np.push(rp[0]);
        np.push(rp[1]);
    }
    var path;
    if(np.length==6) {
        path = "C " + np.join(' ');
    } else {
        path = "M " + np.slice(0,2).join(' ') + " C " + np.slice(2).join(' ');
    }
    return path;
}

var makeBezierFromList = function(np) {
    if(np.length==6) {
        path = "C " + np.join(' ');
    } else {
        path = "M " + np.slice(0,2).join(' ') + " C " + np.slice(2).join(' ');
    }
    return path;    
}

var makeBezierBarLR = function(x, y, w, h) {
    var cpd1 = 0.3;
    var cpd2 = 0.7;
    var c1 = makeBezier((x+w),y, (x+(cpd2*w)),y, (x+(cpd1*w)),y, (x),y);
    var l1 = makeBezier2(x,y+(cpd1*h), x,y+(cpd2*h), x,y+h);
    var c2 = makeBezier2( (x+(cpd1*w)),(y+h),  (x+(cpd2*w)),(y+h), x+w,(y+h));
    var l2 = makeBezier2(x+w,y+(cpd2*h), x+w,y+(cpd1*h), x+w,y);
    var p = c1 + " " + l1 + " " + c2 + " " + l2;
    return p;
}

var makeBezierBarRL = function(x, y, w, h) {
    var cpd1 = 0.3;
    var cpd2 = 0.7;
    var c1 = makeBezier((x),(y+h), (x+(cpd1*w)),(y+h), (x+(cpd2*w)),(y+h), (x+w),(y+h));
    var l1 = makeBezier2((x+w),y+(cpd2*h), (x+w),y+(cpd1*h), (x+w),y);
    var c2 = makeBezier2( (x+(cpd2*w)),(y),  (x+(cpd1*w)),(y), x,(y));
    var l2 = makeBezier2(x,y+(cpd1*h), x,y+(cpd2*h), x,(y+h));
    var p = c1 + " " + l1 + " " + c2 + " " + l2;
    return p;
}

var makeBezierBar = function(x, y, w, h, angle, startAngle){
    var centerAngle = (startAngle + (angle/2)) % 360;
    if(centerAngle>0 && centerAngle<180) {
        return makeBezierBarRL(x, y, w, h);
    } else {
        return makeBezierBarLR(x, y, w, h);
    }
}
//angle in radians
var computeArcPoints = function(r, a, startAngle){
    var x4 = r * Math.cos(a/2);
    var y4 = r * Math.sin(a/2);
    var x1 = x4;
    var y1 = -y4;

    var x2 = x1 + k * Math.tan(a/2) * y4;
    var y2 = y1 + k * Math.tan(a/2) * x4;
    var x3 = x2;
    var y3 = -y2;
    
    var p = [x1,y1, x2,y2, x3,y3, x4,y4];
    
    var rotate = -startAngle-(a/2);
    
    var np=[];
    for(var i=0; i<p.length; i+=2){
        var rp = rot2d(p[i], p[i+1], rotate);
        np.push(rp[0]);
        np.push(rp[1]);
    }
    
    return np;
}

var makeCompArc = function(radius, angle, hole, startAngle){
     var a = angle;
     a = a*(Math.PI/180); 
     startAngle = startAngle*(Math.PI/180); 
     var r = radius;
     
     var p1 = computeArcPoints(r,(a/2),startAngle);
     var p2 = computeArcPoints(r,(a/2),startAngle+(a/2));
    
     var path1 = makeBezierFromList(p1.slice(2));
     var path2 = makeBezierFromList(p2);
     console.log(path1);
     console.log(path2);
     return [path2, path1].join(' ');
}

var makeBezierArc = function(radius, angle, hole, startAngle){
    var rotate = -startAngle-(angle/2);
    var r = radius;
    var r0 = radius*(hole/100);
    var a = angle;
    a = a*(Math.PI/180);
    var w = r-r0;
    var rcpi = r0 + (0.3*w);
    var rcpo = r0 + (0.7*w);
   
    //exteranal (out)
    var x4o = r * Math.cos(a/2);
    var y4o = r * Math.sin(a/2);
    var x1o = x4o;
    var y1o = -y4o;

    var x2o = x1o + k * Math.tan(a/2) * y4o;
    var y2o = y1o + k * Math.tan(a/2) * x4o;
    var x3o = x2o;
    var y3o = -y2o;
    
    
    //internal (in)
    var x4i = r0 * Math.cos(a/2);
    var y4i = r0 * Math.sin(a/2);
    var x1i = x4i;
    var y1i = -y4i;

    var x2i = x1i + k * Math.tan(a/2) * y4i;
    var y2i = y1i + k * Math.tan(a/2) * x4i;
    var x3i = x2i;
    var y3i = -y2i;

    //internal line control
    var xcp4i = rcpi * Math.cos(a/2);
    var ycp4i = rcpi * Math.sin(a/2);
    var xcp1i = xcp4i;
    var ycp1i = -ycp4i;
    
    //external line control
    var xcp4o = rcpo * Math.cos(a/2);
    var ycp4o = rcpo * Math.sin(a/2);
    var xcp1o = xcp4o;
    var ycp1o = -ycp4o;
    
    var c1 = makeBezierL([x1i,y1i, x2i,y2i, x3i,y3i, x4i,y4i], rotate);
    var l1 = makeBezierL([xcp4i,ycp4i, xcp4o,ycp4o, x4o,y4o], rotate);
    var c2 = makeBezierL([x3o,y3o, x2o,y2o, x1o,y1o], rotate);
    var l2 = makeBezierL([xcp1o,ycp1o, xcp1i,ycp1i, x1i,y1i], rotate);
    
    var p = c1 + " " + l1 + " " + c2 + " " + l2;
 
    return p;
}
var rot2d = function(x,y,a) {
    var x1 = x * Math.cos(a) - y * Math.sin(a);
    var y1 = y * Math.cos(a) + x * Math.sin(a);
    return [x1,y1];
}


var vis = d3.select("#vis").selectAll("svg")
    .data([1])
  .enter().append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + 210 + "," + 190 + ")");

data = prepareData(data);

vis.selectAll('path.arc')
    .data([[120, 0]])
    .enter()
    .append("path")
    .attr('d', function(d){
        return makeCompArc(170, d[0], 25, d[1]);
    })
    .attr('class','arc')
    .style('stroke','black')
    .style('stroke-width','1')
    .style('fill','none');
    
/*
vis.selectAll('path.arc')
    .data(data)
    .enter()
    .append("path")
    .attr('d', function(d){
        return makeBezierArc(170, d[0], 25, d[1]);
    })
    .attr('class','arc')
    .style('stroke','none');

*/
d3.select('#bar').on('click', function(){ 
     vis.selectAll("path.arc")
            .transition()
            .attr('fill-opacity', 0.8)
            .transition()
            .duration(2000)
            .attr('d', function(d,i){
                return makeBezierBar(-150,-100+(i*20), d[0]*5, 20, d[0], d[1]);
            })
            .transition()
            .attr('fill-opacity', 1) 
});

d3.select('#pie').on('click', function(){ 
      vis.selectAll("path.arc")
          .transition()
          .attr('fill-opacity', 0.8)
            .transition()
            .duration(2000)
            .attr('d', function(d,i){
                return  makeBezierArc(170, d[0], 25, d[1]);
            })
       .transition()
            .attr('fill-opacity', 1) 
});
