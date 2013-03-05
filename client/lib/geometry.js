////////////////////////////////////////
//GEN Geometry API
////////////////////////////////////////
GEN.types = {
    Mesh:String,
    Curve:String,
    Geometry:String,
    Vector:String,
    Shape:String
}
/*
 *
 */
GEN.Geometry = function () {
};
//API creation utilities
GEN.Geometry.GLOBAL_OBJECT_NAME = '_g';
GEN.Geometry.UNMEMOIZED_PREFIX = '__';
GEN.Geometry.MEMOIZE = false;

GEN.Geometry.initGlobal = function () {
    GEN.Geometry.exportAPI();
    GEN.global[GEN.Geometry.GLOBAL_OBJECT_NAME] = new GEN.Geometry();
};
//meomize all API functions, renaming to internal name and exposing memoized functions.
GEN.Geometry.exportAPI = function () {
    var funz = _.keys(GEN.Geometry.API);
    _.each(funz, function (fnName) {
        var apiDef = GEN.Geometry.API[fnName];
        GEN.Geometry.prototype[GEN.Geometry.UNMEMOIZED_PREFIX + fnName] = apiDef.fn;
        if (GEN.Geometry.MEMOIZE) {
            GEN.Geometry.prototype[fnName] = GEN.memoize(GEN.Geometry.prototype[GEN.Geometry.UNMEMOIZED_PREFIX + fnName]);
        } else {
            GEN.Geometry.prototype[fnName] = GEN.Geometry.prototype[GEN.Geometry.UNMEMOIZED_PREFIX + fnName];
        }
    });
};
GEN.Geometry.buildLanguage = function () {
    var funz = _.keys(GEN.Geometry.API);
    _.each(funz, function (fnName) {
        var apiDef = GEN.Geometry.API[fnName];
        GEN.Geometry.generateBlock(fnName, apiDef);
    });
};
//Create a Blockly block definition & code generator for API function
GEN.Geometry.generateBlock = function (fnName, apiDef) {
    if (apiDef.autoGenerateBlock == false)
        return;

    var blockTitle = apiDef.menuTitle;
    if (apiDef.blockTitle != null) {
        blockTitle = apiDef.blockTitle;
    }
    Blockly.Language['geometry_' + fnName] = {
        category:apiDef.category,
        title:apiDef.menuTitle,
        init:function () {
            this.setColour(160);
            if (apiDef.blockTitle !== false) {
                this.appendDummyInput().appendTitle(blockTitle);
            }
            for (var i = 0; i < apiDef.inputs.length; i++) {
                if (apiDef.inputs[i].options != undefined) {
                    this.appendDummyInput().appendTitle(new Blockly.FieldDropdown(apiDef.inputs[i].options), apiDef.inputs[i].name);
                } else {
                    var argTitle = apiDef.inputs[i].name;
                    if (apiDef.inputs[i].title != null) {
                        argTitle = apiDef.inputs[i].title;
                    }
                    var typeCheck = Number;
                    if (apiDef.inputs[i].type != undefined)
                        typeCheck = apiDef.inputs[i].type;
                    this.appendValueInput(apiDef.inputs[i].name).setCheck(typeCheck).appendTitle(argTitle);
                }
            }

            this.setOutput(true, apiDef.outputType);
            this.setTooltip(apiDef.tooltip);
        }
    }

    if (apiDef.autoGenerateGenerator == false)
        return;

    Blockly.JavaScript['geometry_' + fnName] = function () {
        var args = {};
        for (var i = 0; i < apiDef.inputs.length; i++) {
            if (apiDef.inputs[i].options != undefined) {
                args[apiDef.inputs[i].name] = this.getTitleValue(apiDef.inputs[i].name);
            } else {
                var def = null;
                if (apiDef.inputs[i].defaultVal != undefined)
                    def = apiDef.inputs[i].defaultVal;
                args[apiDef.inputs[i].name] = Blockly.JavaScript.valueToCode(this, apiDef.inputs[i].name, Blockly.JavaScript.ORDER_NONE) || def;
            }
        }

        var code = GEN.Geometry.generateCodeForFunction(fnName, args);
        return [code, Blockly.JavaScript.ORDER_NONE];
    };
};
//Generate text represenrarion of an API function call
//Assumes **ONE** arguments object
GEN.Geometry.generateCodeForFunction = function (fnName, argsObject) {
    var l = _.map(_.keys(argsObject), function (k) {
        return ("   " + k + ': ' + argsObject[k]);
    });
    var argsStr = "{\n" + l.join(",\n") + "}";

    var code = GEN.Geometry.GLOBAL_OBJECT_NAME + '.' + fnName + '(' + argsStr + ')';
    return code;
};
/////////////////////////////////////////////////////////////
//API functions
GEN.Geometry.API = {};

GEN.Geometry.API.createPoint = {
    category:'Vector',
    menuTitle:'Point',
    //blockTitle: - default menu title
    tooltip:"Create a point",
    inputs:[
        {
            name:'x',
            title:'X',
            defaultVal:0
        },
        {
            name:'y',
            title:'Y',
            defaultVal:0
        },
        {
            name:'z',
            title:'Z',
            defaultVal:0
        }
    ],
    outputType:GEN.types.Vector,
    //autoGenerateBlock : true,
    //autoGenerateGenerator : true,

    fn:function (args) {
        var p = new toxi.geom.Vec3D(args.x, args.y, args.z);
        return p;
    }
};
/*
 GEN.Geometry.API.createCircle = {
 category : 'Curve',
 menuTitle : 'Circle',
 tooltip : "Create a circle",
 inputs : [{
 name : 'origin',
 type : GEN.types.Vector,
 defaultVal : GEN.Geometry.generateCodeForFunction('createPoint', {
 x : 0,
 y : 0,
 z : 0
 })
 }, {
 name : 'radius',
 defaultVal : 20
 }],
 outputType : GEN.types.Curve,
 fn : function(args) {
 var c = new toxi.geom.Circle(args.origin, args.radius);
 return c;
 }
 };
 */
GEN.Geometry.API.createCircleThree = {
    category:'Curve',
    menuTitle:'Circle',
    tooltip:"Create a circle",
    inputs:[
        {
            name:'origin',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:0,
                y:0,
                z:0
            })
        },
        {
            name:'radius',
            defaultVal:20
        }
    ],
    outputType:GEN.types.Curve,
    fn:function (args) {
        var c = new THREE.EllipseCurve3(args.origin, args.radius, args.radius, 0, 2 * Math.PI, true);
        return c;
    }
};

GEN.Geometry.API.createLine = {
    category:'Curve',
    menuTitle:'Line',
    tooltip:"Create a line",
    inputs:[
        {
            name:'start',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:0,
                y:0,
                z:0
            })
        },
        {
            name:'end',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:20,
                y:20,
                z:20
            })
        }
    ],
    outputType:GEN.types.Curve,
    fn:function (args) {
        var v1 = args.start.toTHREE();
        var v2 = args.end.toTHREE();
        var c = new THREE.LineCurve3(v1, v2);
        console.log(c);
        return c;
    }
};

GEN.Geometry.API.createSpline = {
    category:'Curve',
    menuTitle:'Spline',
    tooltip:"Create a spline",
    inputs:[
        {
            name:'points',
            type:Array
        },
        {
            name:'closed',
            type:Boolean,
            options:[
                ['Open', 'false'],
                ['Closed', 'true']
            ]
        }
    ],
    outputType:GEN.types.Curve,
    fn:function (args) {
        if (args.points == null)
            return null;
        var points = _.map(args.points, function (p) {
            return p.toTHREE()
        });

        var c = args.closed ? new THREE.ClosedSplineCurve3(points) : new THREE.SplineCurve3(points);
        return c;
    }
};

GEN.Geometry.API.createSphere = {
    category:'Surface',
    menuTitle:'Sphere',
    tooltip:"Create a sphere",
    inputs:[
        {
            name:'origin',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:0,
                y:0,
                z:0
            })
        },
        {
            name:'radius',
            defaultVal:20
        }
    ],
    outputType:GEN.types.Mesh,

    fn:function (args) {
        var c = new toxi.geom.Sphere(args.origin, args.radius);
        return c;
    }
};

//TODO: add font selection, bevel?
GEN.Geometry.API.createTextGeo = {
    category:'Mesh',
    menuTitle:'Text Mesh',
    tooltip:"Create a text mesh",
    inputs:[
        {
            name:'size',
            defaultVal:10
        },
        {
            name:'text',
            defaultVal:'"mussa"',
            type:String
        },
        {
            name:'height',
            defaultVal:5
        }
    ],
    outputType:GEN.types.Mesh,

    fn:function (args) {
        var c = new THREE.TextGeometry(args.text, {
            size:args.size,
            height:args.height,
            curveSegments:3,

            font:"optimer",

            bevelThickness:2,
            bevelSize:1.5,
            bevelEnabled:true,

            material:0,
            extrudeMaterial:1
        });
        //c.toToxic();
        THREE.GeometryUtils.triangulateQuads(c);

        return c;
    }
};

GEN.Geometry.API.createCube = {
    category:'Surface',
    menuTitle:'Cube',
    tooltip:"Create a cube",
    inputs:[
        {
            name:'origin',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:0,
                y:0,
                z:0
            })
        },
        {
            name:'width',
            defaultVal:20
        },
        {
            name:'depth',
            defaultVal:10
        },
        {
            name:'height',
            defaultVal:10
        }
    ],
    outputType:GEN.types.Mesh,

    fn:function (args) {
        var c = new toxi.geom.AABB(args.origin, this.createPoint({
            x:args.width,
            y:args.depth,
            z:args.height
        }));
        return c;
    }
};

GEN.Geometry.API.createShape2D = {
    category:'Surface',
    menuTitle:'Shape 2D',
    tooltip:"Create a Shape on World-XY",
    inputs:[
        {
            name:'points',
            type:Array,
            defaultVal:'[]'
        }
    ],
    outputType:GEN.types.Curve,
    fn:function (args) {
        if (args.points.length < 3)
            return "";
        var points2D = [];
        for (var i = 0; i < args.points.length; i++) {
            points2D.push(new THREE.Vector2(args.points[i].x, args.points[i].y));

        }
        return new THREE.Shape(points2D);
    }
};

GEN.Geometry.API.createParametricSurface = {
    category:'Mesh',
    menuTitle:'Parametric Mesh',
    blockTitle:false,
    tooltip:"Create a parametric mesh",
    inputs:[
        {
            name:'name',
            defaultVal:'"torus"',
            options:[
                ['Torus', '"torus"'],
                ['Klein Surface', '"klein"'],
                ['Enneper Surface', '"enneper"'],
                ['Catenoid Surface', '"catenoid"'],
                ['Helicoidal Surface', '"helicoidal"']
            ]
        },
        {
            name:'udiv',
            defaultVal:20
        },
        {
            name:'vdiv',
            defaultVal:20
        }
    ],
    outputType:GEN.types.Mesh,

    fn:function (args) {
        var geo = new THREE.ParametricGeometry(GEN.Geometry.Surfaces[args.name](5), args.udiv, args.vdiv);
        return geo;
    }
};

GEN.Geometry.API.createPipe = {
    category:'Mesh',
    menuTitle:'Pipe',
    tooltip:"Create a pipe around a curve",
    inputs:[
        {
            name:'curve',
            type:GEN.types.Curve
        },
        {
            name:'radius',
            defaultVal:1
        },
        {
            name:'sides',
            defaultVal:6
        },
        {
            name:'segments',
            defaultVal:64
        }
    ],
    outputType:GEN.types.Mesh,
    fn:function (args) {
        if (args.curve == null)
            return null;
        if (args.curve.toThreeCurve == undefined)
            return null;
        var curve = args.curve.toThreeCurve();
        var pipe = new THREE.TubeGeometry(curve, args.segments, args.radius, args.sides, false, false);
        return pipe;
    }
};

GEN.Geometry.API.move = {
    category:'Transform',
    menuTitle:'Move',
    tooltip:"Moves a geometry",
    inputs:[
        {
            name:'geometry',
            type:GEN.types.Geometry
        },
        {
            name:'translation',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:0,
                y:0,
                z:0
            })
        }
    ],
    outputType:GEN.types.Geometry,

    //TODO: Not nice + take care of all types
    fn:function (args) {
        var geometry = args.geometry;
        var translation = args.translation;
        if (geometry instanceof toxi.geom.Circle) {
            var vec = geometry.add(translation);
            var ng = new toxi.geom.Circle(vec, geometry.radius);
        } else if (geometry instanceof toxi.geom.Sphere) {
            var vec = geometry.add(translation);
            var ng = new toxi.geom.Sphere(vec, geometry.radius);
        } else if (geometry instanceof THREE.Geometry || geometry instanceof THREE.Curve) {
            var ng = geometry.clone();
            ng.translate(translation);
        } else {
            ng = geometry;
        }
        return ng;
    }
};

GEN.Geometry.API.Extrude = {
    category:'Mesh',
    menuTitle:'Extrude Shape',
    tooltip:"Extrudes a Shape 2D",
    inputs:[
        {
            name:'shape',
            type:GEN.types.Shape
        },
        {
            name:'height',
            type:Number,
            defaultVal:20
        }
    ],
    outputType:GEN.types.Geometry,

    fn:function (args) {

        if (args.shape == null)
            return "";
        var extrusionSettings = {
            amount:args.height,
            bevelEnabled:false
        };

        var x = new THREE.CurvePath();
        x.getTransformedPoints();
        return new THREE.ExtrudeGeometry(args.shape, extrusionSettings);
    }
};

GEN.Geometry.API.divideCurveLength = {
    category:'Curve',
    menuTitle:'Divide Curve (length)',
    tooltip:"Divide a curve by length",
    inputs:[
        {
            name:'curve',
            type:GEN.types.Curve,
        },
        {
            name:'length',
            type:Number,
            defaultVal:0.5
        }
    ],
    outputType:Array,

    fn:function (args) {
        if (args.curve == null)
            return "";

        return args.curve.getPointsByDistance(args.length);
    }
};
GEN.Geometry.API.divideCurveSegments = {
    category:'Curve',
    menuTitle:'Divide Curve (segments)',
    tooltip:"Divide a curve to a number of segments",
    inputs:[
        {
            name:'curve',
            type:GEN.types.Curve,
        },
        {
            name:'segments',
            type:Number,
            defaultVal:10
        }
    ],
    outputType:Array,

    fn:function (args) {
        if (args.curve == null)
            return "";

        return args.curve.getPoints(args.segments);
    }
};
GEN.Geometry.API.booleanOperation = {
    category:'Transform',
    menuTitle:'Boolean',
    blockTitle:false,
    tooltip:"Boolean operations with mesh",
    inputs:[
        {
            name:'operation',
            options:[
                ['Union', '"union"'],
                ['Intersect', '"intersect"'],
                ['Subtract', '"subtract"']
            ]
        },
        {
            name:'geometry1',
            type:GEN.types.Mesh
        },
        {
            name:'geometry2',
            type:GEN.types.Mesh
        }
    ],
    outputType:GEN.types.Mesh,
    fn:function (args) {
        var csg1 = args.geometry1.toCSG_Mesh();
        var csg2 = args.geometry2.toCSG_Mesh();
        var csg_op = csg1[args.operation](csg2);
        var renderableOutput = csg_op.toRenderable();

        return renderableOutput;
    }
};
GEN.Geometry.API.scale = {
    category:'Transform',
    menuTitle:'Scale',
    tooltip:"Scales a geometry",
    inputs:[
        {
            name:'geometry',
            type:GEN.types.Geometry
        },
        {
            name:'vecOrFactor',
            title:'vector',
            type:GEN.types.Vector,
            defaultVal:GEN.Geometry.generateCodeForFunction('createPoint', {
                x:2,
                y:2,
                z:2
            })
        }
    ],
    outputType:GEN.types.Geometry,

    //TODO: only works for mesh & threeCurve
    fn:function (args) {
        var vec = args.vecOrFactor;
        if (_.isNumber(vec)) {
            vec = this.createPoint(vec, vec, vec);
        }

        if (args.geometry instanceof THREE.Geometry || args.geometry instanceof THREE.Curve) {
            var ng = args.geometry.clone();
            ng.scale(vec);
        } else {
            ng = args.geometry;
        }

        return ng;
    }
};

GEN.Geometry.API.meshComponents = {
    category:'Mesh',
    menuTitle:'Components',
    blockTitle:false,
    tooltip:"Mesh components",
    inputs:[
        {
            name:'componentType',
            options:[
                ['Mesh Faces', '"faces"'],
                ['Mesh Edges', '"edges"'],
                ['Mesh Vertices', '"vertices"']
            ]
        },
        {
            name:'mesh',
            type:GEN.types.Mesh
        }
    ],
    outputType:Array,
    fn:function (args) {
        var comp;
        if (args.mesh instanceof THREE.Geometry) {
            if (args.componentType == 'edges') {
                comp = args.mesh.getEdges();
            } else {
                comp = args.mesh[args.componentType];
            }
        } else {
            comp = null;
        }

        return comp;
    }
};

/////////////////////////////////////////
//Parametric surface functions
GEN.Geometry.Surfaces = {};

GEN.Geometry.Surfaces.klein = function (scale) {
    return function (v, u) {
        u *= Math.PI;
        v *= 2 * Math.PI;
        u = u * 2;
        var x, y, z;
        if (u < Math.PI) {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
            z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
        } else {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
            z = -8 * Math.sin(u);
        }
        y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }
}
GEN.Geometry.Surfaces.enneper = function (scale) {
    return function (v, u) {
        u = (u * 4) - 2;
        v = (v * 4) - 2;

        var x = u - (Math.pow(u, 3) / 3) + (u * Math.pow(v, 2));
        var y = -v + (Math.pow(v, 3) / 3) - (v * Math.pow(u, 2));
        var z = Math.pow(u, 2) - Math.pow(v, 2);

        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }
}

GEN.Geometry.Surfaces.catenoid = function (scale) {
    return function (v, u) {
        u = (u * 2 * Math.PI) - Math.PI;
        v = (v * 2 * Math.PI) - Math.PI;

        var x = 2 * cosh(v / 2) * cos(u);
        var z = v;
        var y = 2 * cosh(v / 2) * sin(u)

        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }
}

GEN.Geometry.Surfaces.helicoidal = function (scale) {
    return function (v, u) {
        u = (u * 2 * Math.PI) - Math.PI;
        v = (v * 2 * Math.PI) - Math.PI;

        var x = sinh(v) * sin(u);
        var z = 3 * u;
        var y = -sinh(v) * cos(u);

        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }
}
GEN.Geometry.Surfaces.torus = function (scale) {
    return function (v, u) {
        u = (u * 2 * Math.PI);
        v = (v * 2 * Math.PI);

        var x = (1 + 0.5 * cos(u)) * cos(v);
        var z = 0.5 * sin(u);
        var y = (1 + 0.5 * cos(u)) * sin(v);

        return new THREE.Vector3(x * scale, y * scale, z * scale);
    }
}
/*
 GEN.Geometry.prototype.line = function(p1, p2) {
 var geometry = new THREE.Geometry();
 geometry.vertices.push(p1);
 geometry.vertices.push(p2);
 //var spline = new THREE.SplineCurve3([p1, p2]);
 //var l = new THREE.Line(geometry)
 return spline;
 };
 */

//TODO: All this is no good..
/*
 GEN.Runner = function() {
 this.points = [];
 this.geometries = [];
 };

 GEN.Runner.prototype.run = function(result) {
 console.log('runner result');
 console.log(result);
 if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere || result instanceof toxi.geom.AABB || result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh) {
 this.geometries.push(result);
 } else if( result instanceof toxi.geom.Vec3D) {
 this.points.push(result);
 }
 return result;
 };
 GEN.Runner.prototype.chain = function(scope, fnName, args) {
 console.log('chain');
 console.log(scope);
 console.log(fnName);
 scope[fnName].apply(scope, args);
 var result = scope;
 console.log('chain result');
 console.log(result);
 if( result instanceof toxi.geom.Circle || result instanceof toxi.geom.Ellipse || result instanceof toxi.geom.Sphere || result instanceof toxi.geom.AABB || result instanceof toxi.geom.mesh.TriangleMesh || result instanceof toxi.geom.mesh.WETriangleMesh) {
 this.geometries.push(result);
 } else if( result instanceof toxi.geom.Vec3D) {
 this.points.push(result);
 }
 return result;
 };

 GEN.Runner.prototype.removeAll = function() {
 this.points = [];
 this.geometries = [];
 };
 */