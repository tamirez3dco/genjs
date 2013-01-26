var COMPILED=!0,goog=goog||{};goog.global=this;goog.DEBUG=!1;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.provide=function(a){if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a];for(var b=a;(b=b.substring(0,b.lastIndexOf(".")))&&!goog.getObjectByName(b);)goog.implicitNamespaces_[b]=!0}goog.exportPath_(a)};
goog.setTestOnly=function(a){if(COMPILED&&!goog.DEBUG)throw a=a||"",Error("Importing test-only code into non-debug environment"+a?": "+a:".");};COMPILED||(goog.isProvided_=function(a){return!goog.implicitNamespaces_[a]&&!!goog.getObjectByName(a)},goog.implicitNamespaces_={});goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};
goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};
goog.addDependency=function(a,b,c){if(!COMPILED){var d;a=a.replace(/\\/g,"/");for(var e=goog.dependencies_,f=0;d=b[f];f++)e.nameToPath[d]=a,a in e.pathToNames||(e.pathToNames[a]={}),e.pathToNames[a][d]=!0;for(d=0;b=c[d];d++)a in e.requires||(e.requires[a]={}),e.requires[a][b]=!0}};goog.ENABLE_DEBUG_LOADER=!0;
goog.require=function(a){if(!COMPILED&&!goog.isProvided_(a)){if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b){goog.included_[b]=!0;goog.writeScripts_();return}}a="goog.require could not find: "+a;goog.global.console&&goog.global.console.error(a);throw Error(a);}};goog.basePath="";goog.nullFunction=function(){};goog.identityFunction=function(a,b){return a};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};
goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];
!COMPILED&&goog.ENABLE_DEBUG_LOADER&&(goog.included_={},goog.dependencies_={pathToNames:{},nameToPath:{},requires:{},visited:{},written:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return"undefined"!=typeof a&&"write"in a},goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH)goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("script"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=
-1==d?c.length:d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a){var b=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;!goog.dependencies_.written[a]&&b(a)&&(goog.dependencies_.written[a]=!0)},goog.writeScriptTag_=function(a){if(goog.inHtmlDocument_()){var b=goog.global.document;if("complete"==b.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}b.write('<script type="text/javascript" src="'+
a+'">\x3c/script>');return!0}return!1},goog.writeScripts_=function(){function a(e){if(!(e in d.written)){if(!(e in d.visited)&&(d.visited[e]=!0,e in d.requires))for(var g in d.requires[e])if(!goog.isProvided_(g))if(g in d.nameToPath)a(d.nameToPath[g]);else throw Error("Undefined nameToPath for "+g);e in c||(c[e]=!0,b.push(e))}}var b=[],c={},d=goog.dependencies_,e;for(e in goog.included_)d.written[e]||a(e);for(e=0;e<b.length;e++)if(b[e])goog.importScript_(goog.basePath+b[e]);else throw Error("Undefined script input");
},goog.getPathFromDeps_=function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isDef=function(a){return void 0!==a};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.removeUid=function(a){"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};
goog.UID_PROPERTY_="closure_uid_"+Math.floor(2147483648*Math.random()).toString(36);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){goog.bind=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bindNative_:goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval)if(null==goog.evalWorksForGlobals_&&(goog.global.eval("var _et_ = 1;"),"undefined"!=typeof goog.global._et_?(delete goog.global._et_,goog.evalWorksForGlobals_=!0):goog.evalWorksForGlobals_=!1),goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);
b.body.removeChild(c)}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};
!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){var c=b||{},d;for(d in c){var e=(""+c[d]).replace(/\$/g,"$$$$");a=a.replace(RegExp("\\{\\$"+d+"\\}","gi"),e)}return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(d.superClass_)return d.superClass_.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var e=Array.prototype.slice.call(arguments,2),f=!1,g=a.constructor;g;g=g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};
goog.scope=function(a){a.call(goog.global)};var Blockly={Names:function(a){this.reservedDict_={};if(a){a=a.split(",");for(var b=0;b<a.length;b++)this.reservedDict_[Blockly.Names.PREFIX_+a[b]]=!0}this.reset()}};Blockly.Names.PREFIX_="v_";Blockly.Names.prototype.reset=function(){this.db_={};this.dbReverse_={}};Blockly.Names.prototype.getName=function(a,b){var c=Blockly.Names.PREFIX_+a.toLowerCase()+"X"+b;if(c in this.db_)return this.db_[c];var d=this.getDistinctName(a,b);return this.db_[c]=d};
Blockly.Names.prototype.getDistinctName=function(a,b){for(var c=this.safeName_(a),d="";this.dbReverse_[Blockly.Names.PREFIX_+c+d]||Blockly.Names.PREFIX_+c+d in this.reservedDict_;)d=d?d+1:2;c+=d;this.dbReverse_[Blockly.Names.PREFIX_+c]=!0;return c};Blockly.Names.prototype.safeName_=function(a){a?(a=encodeURI(a.replace(/ /g,"_")).replace(/[^\w]/g,"_"),-1!="0123456789".indexOf(a[0])&&(a="my_"+a)):a="unnamed";return a};Blockly.Names.equals=function(a,b){return a.toLowerCase()==b.toLowerCase()};Blockly.Xml={};Blockly.Xml.workspaceToDom=function(a){var b=goog.dom.createDom("xml");a=a.getTopBlocks(!0);for(var c=0,d;d=a[c];c++){var e=Blockly.Xml.blockToDom_(d);d=d.getRelativeToSurfaceXY();e.setAttribute("x",Blockly.RTL?-d.x:d.x);e.setAttribute("y",d.y);b.appendChild(e)}return b};
Blockly.Xml.blockToDom_=function(a){var b=goog.dom.createDom("block");b.setAttribute("type",a.type);if(a.mutationToDom){var c=a.mutationToDom();c&&b.appendChild(c)}for(var d=0;c=a.inputList[d];d++)for(var e=0,f;f=c.titleRow[e];e++)if(f.name&&f.EDITABLE){var g=goog.dom.createDom("title",null,f.getValue());g.setAttribute("name",f.name);b.appendChild(g)}a.comment&&(c=goog.dom.createDom("comment",null,a.comment.getText()),c.setAttribute("pinned",a.comment.isVisible()),d=a.comment.getBubbleSize(),c.setAttribute("h",
d.height),c.setAttribute("w",d.width),b.appendChild(c));d=!1;for(e=0;c=a.inputList[e];e++){var h;f=!0;c.type!=Blockly.DUMMY_INPUT&&(g=c.connection.targetBlock(),c.type==Blockly.INPUT_VALUE?(h=goog.dom.createDom("value"),d=!0):c.type==Blockly.NEXT_STATEMENT&&(h=goog.dom.createDom("statement")),g&&(h.appendChild(Blockly.Xml.blockToDom_(g)),f=!1),h.setAttribute("name",c.name),f||b.appendChild(h))}d&&b.setAttribute("inline",a.inputsInline);a.collapsed&&b.setAttribute("collapsed",!0);a.disabled&&b.setAttribute("disabled",
!0);if(a.nextConnection&&(a=a.nextConnection.targetBlock()))h=goog.dom.createDom("next",null,Blockly.Xml.blockToDom_(a)),b.appendChild(h);return b};Blockly.Xml.domToText=function(a){return(new XMLSerializer).serializeToString(a)};
Blockly.Xml.domToPrettyText=function(a){a=Blockly.Xml.domToText(a).split("<");for(var b="",c=1;c<a.length;c++){var d=a[c];"/"==d[0]&&(b=b.substring(2));a[c]=b+"<"+d;"/"!=d[0]&&"/>"!=d.slice(-2)&&(b+="  ")}a=a.join("\n");a=a.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g,"$1</$2>");return a.replace(/^\n/,"")};
Blockly.Xml.textToDom=function(a){a=(new DOMParser).parseFromString(a,"text/xml");if(!a||!a.firstChild||"xml"!=a.firstChild.nodeName.toLowerCase()||a.firstChild!==a.lastChild)throw"Blockly.Xml.textToDom did not obtain a valid XML tree.";return a.firstChild};
Blockly.Xml.domToWorkspace=function(a,b){for(var c=0,d;d=b.childNodes[c];c++)if("block"==d.nodeName.toLowerCase()){var e=Blockly.Xml.domToBlock_(a,d),f=parseInt(d.getAttribute("x"),10);d=parseInt(d.getAttribute("y"),10);!isNaN(f)&&!isNaN(d)&&e.moveBy(Blockly.RTL?-f:f,d)}};
Blockly.Xml.domToBlock_=function(a,b){var c=b.getAttribute("type"),c=new Blockly.Block(a,c);c.initSvg();for(var d=null,e=0,f;f=b.childNodes[e];e++)if(!(3==f.nodeType&&f.data.match(/^\s*$/))){for(var g=null,h=0,i;i=f.childNodes[h];h++)if(3!=i.nodeType||!i.data.match(/^\s*$/))g=i;h=f.getAttribute("name");switch(f.nodeName.toLowerCase()){case "mutation":c.domToMutation&&c.domToMutation(f);break;case "comment":c.setCommentText(f.textContent);(g=f.getAttribute("pinned"))&&c.comment.setVisible("true"==
g);g=parseInt(f.getAttribute("w"),10);f=parseInt(f.getAttribute("h"),10);!isNaN(g)&&!isNaN(f)&&c.comment.setBubbleSize(g,f);break;case "title":c.setTitleValue(f.textContent,h);break;case "value":case "statement":f=c.getInput(h);if(!f)throw"Input does not exist: "+h;if(g&&"block"==g.nodeName.toLowerCase())if(d=Blockly.Xml.domToBlock_(a,g),d.outputConnection)f.connection.connect(d.outputConnection);else if(d.previousConnection)f.connection.connect(d.previousConnection);else throw"Child block does not have output or previous statement.";
break;case "next":if(g&&"block"==g.nodeName.toLowerCase()){if(c.nextConnection){if(c.nextConnection.targetConnection)throw"Next statement is already connected.";}else throw"Next statement does not exist.";d=Blockly.Xml.domToBlock_(a,g);if(!d.previousConnection)throw"Next block does not have previous statement.";c.nextConnection.connect(d.previousConnection)}}}(e=b.getAttribute("inline"))&&c.setInputsInline("true"==e);(e=b.getAttribute("collapsed"))&&c.setCollapsed("true"==e);(e=b.getAttribute("disabled"))&&
c.setDisabled("true"==e);d||c.render();return c};Blockly.Xml.deleteNext=function(a){for(var b=0,c;c=a.childNodes[b];b++)if("next"==c.nodeName.toLowerCase()){a.removeChild(c);break}};goog.string={};goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};
goog.string.subs=function(a,b){for(var c=1;c<arguments.length;c++){var d=String(arguments[c]).replace(/\$/g,"$$$$");a=a.replace(/\%s/,d)}return a};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};goog.string.isEmpty=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.isEmptySafe=function(a){return goog.string.isEmpty(goog.string.makeSafe(a))};goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};
goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};
goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};
goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1};goog.string.numerateCompareRegExp_=/(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare=function(a,b){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var c=a.toLowerCase().match(goog.string.numerateCompareRegExp_),d=b.toLowerCase().match(goog.string.numerateCompareRegExp_),e=Math.min(c.length,d.length),f=0;f<e;f++){var g=c[f],h=d[f];if(g!=h)return c=parseInt(g,10),!isNaN(c)&&(d=parseInt(h,10),!isNaN(d)&&c-d)?c-d:g<h?-1:1}return c.length!=d.length?c.length-d.length:a<b?-1:1};goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};
goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.htmlEscape=function(a,b){if(b)return a.replace(goog.string.amperRe_,"&amp;").replace(goog.string.ltRe_,"&lt;").replace(goog.string.gtRe_,"&gt;").replace(goog.string.quotRe_,"&quot;");if(!goog.string.allRe_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.amperRe_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.ltRe_,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.gtRe_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.quotRe_,"&quot;"));return a};
goog.string.amperRe_=/&/g;goog.string.ltRe_=/</g;goog.string.gtRe_=/>/g;goog.string.quotRe_=/\"/g;goog.string.allRe_=/[&<>\"]/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesUsingDom_=function(a){var b={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},c=document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,e){var f=b[a];if(f)return f;if("#"==e.charAt(0)){var g=Number("0"+e.substr(1));isNaN(g)||(f=String.fromCharCode(g))}f||(c.innerHTML=a+" ",f=c.firstChild.nodeValue.slice(0,-1));return b[a]=f})};
goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);if(a.quote)return a.quote();for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b=a,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0"}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=b};goog.string.toMap=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=!0;return b};
goog.string.contains=function(a,b){return-1!=a.indexOf(b)};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&(b<a.length&&0<c)&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){var c=RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};goog.string.removeAll=function(a,b){var c=RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};
goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=function(a,b){return Array(b+1).join(a)};goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};
goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
goog.string.compareVersions=function(a,b){for(var c=0,d=goog.string.trim(String(a)).split("."),e=goog.string.trim(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",i=e[g]||"",j=RegExp("(\\d*)(\\D*)","g"),k=RegExp("(\\d*)(\\D*)","g");do{var l=j.exec(h)||["","",""],m=k.exec(i)||["","",""];if(0==l[0].length&&0==m[0].length)break;var c=0==l[1].length?0:parseInt(l[1],10),p=0==m[1].length?0:parseInt(m[1],10),c=goog.string.compareElements_(c,p)||goog.string.compareElements_(0==
l[2].length,0==m[2].length)||goog.string.compareElements_(l[2],m[2])}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.HASHCODE_MAX_=4294967296;goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c),b%=goog.string.HASHCODE_MAX_;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};
goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmpty(a)?NaN:b};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};
goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString=function(){return goog.global.navigator?goog.global.navigator.userAgent:null};goog.userAgent.getNavigator=function(){return goog.global.navigator};
goog.userAgent.init_=function(){goog.userAgent.detectedOpera_=!1;goog.userAgent.detectedIe_=!1;goog.userAgent.detectedWebkit_=!1;goog.userAgent.detectedMobile_=!1;goog.userAgent.detectedGecko_=!1;var a;if(!goog.userAgent.BROWSER_KNOWN_&&(a=goog.userAgent.getUserAgentString())){var b=goog.userAgent.getNavigator();goog.userAgent.detectedOpera_=0==a.indexOf("Opera");goog.userAgent.detectedIe_=!goog.userAgent.detectedOpera_&&-1!=a.indexOf("MSIE");goog.userAgent.detectedWebkit_=!goog.userAgent.detectedOpera_&&
-1!=a.indexOf("WebKit");goog.userAgent.detectedMobile_=goog.userAgent.detectedWebkit_&&-1!=a.indexOf("Mobile");goog.userAgent.detectedGecko_=!goog.userAgent.detectedOpera_&&!goog.userAgent.detectedWebkit_&&"Gecko"==b.product}};goog.userAgent.BROWSER_KNOWN_||goog.userAgent.init_();goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.userAgent.detectedOpera_;goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.userAgent.detectedIe_;
goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.userAgent.detectedGecko_;goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.userAgent.detectedWebkit_;goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.detectedMobile_;goog.userAgent.SAFARI=goog.userAgent.WEBKIT;goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};
goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_=function(){goog.userAgent.detectedMac_=goog.string.contains(goog.userAgent.PLATFORM,"Mac");goog.userAgent.detectedWindows_=goog.string.contains(goog.userAgent.PLATFORM,"Win");goog.userAgent.detectedLinux_=goog.string.contains(goog.userAgent.PLATFORM,"Linux");goog.userAgent.detectedX11_=!!goog.userAgent.getNavigator()&&goog.string.contains(goog.userAgent.getNavigator().appVersion||"","X11")};goog.userAgent.PLATFORM_KNOWN_||goog.userAgent.initPlatform_();
goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.userAgent.detectedMac_;goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.userAgent.detectedWindows_;goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.detectedLinux_;goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_=function(){var a="",b;goog.userAgent.OPERA&&goog.global.opera?(a=goog.global.opera.version,a="function"==typeof a?a():a):(goog.userAgent.GECKO?b=/rv\:([^\);]+)(\)|;)/:goog.userAgent.IE?b=/MSIE\s+([^\);]+)(\)|;)/:goog.userAgent.WEBKIT&&(b=/WebKit\/(\S+)/),b&&(a=(a=b.exec(goog.userAgent.getUserAgentString()))?a[1]:""));return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionCache_={};goog.userAgent.isVersion=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionCache_[a]||(goog.userAgent.isVersionCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};
goog.userAgent.isDocumentMode=function(a){return goog.userAgent.IE&&goog.userAgent.DOCUMENT_MODE>=a};goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document;return!a||!goog.userAgent.IE?void 0:goog.userAgent.getDocumentMode_()||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5)}();Blockly.ScrollbarPair=function(a,b,c){this.element_=a;this.getMetrics_=b;this.setMetrics_=c;this.oldHostMetrics_={};this.hScroll=new Blockly.Scrollbar(a,b,c,!0,!0);this.vScroll=new Blockly.Scrollbar(a,b,c,!1,!0);this.corner_=this.addCorner_(a);this.resize();var d=this;this.onResizeWrapper_=Blockly.bindEvent_(window,"resize",d,function(){d.resize()})};
Blockly.ScrollbarPair.prototype.dispose=function(){Blockly.unbindEvent_(this.onResizeWrapper_);this.onResizeWrapper_=null;goog.dom.removeNode(this.corner_);this.oldHostMetrics_=this.setMetrics_=this.getMetrics_=this.element_=this.corner_=null;this.hScroll.dispose();this.hScroll=null;this.vScroll.dispose();this.vScroll=null};
Blockly.ScrollbarPair.prototype.addCorner_=function(a){var b=Blockly.createSvgElement("rect",{height:Blockly.Scrollbar.scrollbarThickness,width:Blockly.Scrollbar.scrollbarThickness,style:"fill: #fff"},null);Blockly.Scrollbar.insertAfter_(b,a);return b};
Blockly.ScrollbarPair.prototype.resize=function(){var a=this.getMetrics_();if(a){var b=!1,c=!1;if(this.oldHostMetrics_.viewWidth!=a.viewWidth||this.oldHostMetrics_.viewHeight!=a.viewHeight||this.oldHostMetrics_.absoluteTop!=a.absoluteTop||this.oldHostMetrics_.absoluteLeft!=a.absoluteLeft)c=b=!0;else{if(this.oldHostMetrics_.contentWidth!=a.contentWidth||this.oldHostMetrics_.viewLeft!=a.viewLeft||this.oldHostMetrics_.contentLeft!=a.contentLeft)b=!0;if(this.oldHostMetrics_.contentHeight!=a.contentHeight||
this.oldHostMetrics_.viewTop!=a.viewTop||this.oldHostMetrics_.contentTop!=a.contentTop)c=!0}b&&this.hScroll.resize(a);c&&this.vScroll.resize(a);(this.oldHostMetrics_.viewWidth!=a.viewWidth||this.oldHostMetrics_.absoluteLeft!=a.absoluteLeft)&&this.corner_.setAttribute("x",this.vScroll.xCoordinate);(this.oldHostMetrics_.viewHeight!=a.viewHeight||this.oldHostMetrics_.absoluteTop!=a.absoluteTop)&&this.corner_.setAttribute("y",this.hScroll.yCoordinate);this.oldHostMetrics_=a}};
Blockly.ScrollbarPair.prototype.set=function(a,b){if(Blockly.Scrollbar===Blockly.ScrollbarNative){this.hScroll.set(a,!1);this.vScroll.set(b,!1);var c={};c.x=this.hScroll.outerDiv_.scrollLeft/this.hScroll.innerImg_.offsetWidth||0;c.y=this.vScroll.outerDiv_.scrollTop/this.vScroll.innerImg_.offsetHeight||0;this.setMetrics_(c)}else this.hScroll.set(a,!0),this.vScroll.set(b,!0)};Blockly.ScrollbarInterface=function(){};Blockly.ScrollbarInterface.prototype.dispose=function(){};
Blockly.ScrollbarInterface.prototype.resize=function(){};Blockly.ScrollbarInterface.prototype.isVisible=function(){};Blockly.ScrollbarInterface.prototype.setVisible=function(a){};Blockly.ScrollbarInterface.prototype.set=function(a,b){};
Blockly.ScrollbarNative=function(a,b,c,d,e){this.element_=a;this.getMetrics_=b;this.setMetrics_=c;this.pair_=e||!1;this.horizontal_=d;this.createDom_(a);if(null!==d){Blockly.Scrollbar.scrollbarThickness||Blockly.ScrollbarNative.measureScrollbarThickness_(a);d?(this.foreignObject_.setAttribute("height",Blockly.Scrollbar.scrollbarThickness),this.outerDiv_.style.height=Blockly.Scrollbar.scrollbarThickness+"px",this.outerDiv_.style.overflowX="scroll",this.outerDiv_.style.overflowY="hidden",this.innerImg_.style.height=
"1px"):(this.foreignObject_.setAttribute("width",Blockly.Scrollbar.scrollbarThickness),this.outerDiv_.style.width=Blockly.Scrollbar.scrollbarThickness+"px",this.outerDiv_.style.overflowX="hidden",this.outerDiv_.style.overflowY="scroll",this.innerImg_.style.width="1px");var f=this;this.onScrollWrapper_=Blockly.bindEvent_(this.outerDiv_,"scroll",f,function(){f.onScroll_()});Blockly.bindEvent_(this.foreignObject_,"mousedown",null,Blockly.noEvent);this.pair_||(this.resize(),this.onResizeWrapper_=Blockly.bindEvent_(window,
"resize",f,function(){f.resize()}))}};Blockly.ScrollbarNative.prototype.dispose=function(){Blockly.unbindEvent_(this.onResizeWrapper_);this.onResizeWrapper_=null;Blockly.unbindEvent_(this.onScrollWrapper_);this.onScrollWrapper_=null;goog.dom.removeNode(this.foreignObject_);this.innerImg_=this.outerDiv_=this.setMetrics_=this.getMetrics_=this.element_=this.foreignObject_=null};
Blockly.ScrollbarNative.prototype.resize=function(a){if(!a&&(a=this.getMetrics_(),!a))return;if(this.horizontal_){var b=a.viewWidth;this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight);this.ratio_=b/a.viewWidth;var c=this.ratio_*a.contentWidth,d=(a.viewLeft-a.contentLeft)*this.ratio_;this.outerDiv_.style.width=b+"px";this.innerImg_.style.width=c+"px";this.xCoordinate=a.absoluteLeft;this.pair_&&Blockly.RTL&&(this.xCoordinate+=Blockly.Scrollbar.scrollbarThickness);this.yCoordinate=
a.absoluteTop+a.viewHeight-Blockly.Scrollbar.scrollbarThickness;this.foreignObject_.setAttribute("x",this.xCoordinate);this.foreignObject_.setAttribute("y",this.yCoordinate);this.foreignObject_.setAttribute("width",Math.max(0,b));this.outerDiv_.scrollLeft=Math.round(d)}else b=a.viewHeight,this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight),this.ratio_=b/a.viewHeight,c=this.ratio_*a.contentHeight,d=(a.viewTop-a.contentTop)*this.ratio_,this.outerDiv_.style.height=b+
"px",this.innerImg_.style.height=c+"px",this.xCoordinate=a.absoluteLeft,Blockly.RTL||(this.xCoordinate+=a.viewWidth-Blockly.Scrollbar.scrollbarThickness),this.yCoordinate=a.absoluteTop,this.foreignObject_.setAttribute("x",this.xCoordinate),this.foreignObject_.setAttribute("y",this.yCoordinate),this.foreignObject_.setAttribute("height",Math.max(0,b)),this.outerDiv_.scrollTop=Math.round(d)};
Blockly.ScrollbarNative.prototype.createDom_=function(a){this.foreignObject_=Blockly.createSvgElement("foreignObject",{},null);var b=document.createElementNS(Blockly.HTML_NS,"body");b.setAttribute("xmlns",Blockly.HTML_NS);b.setAttribute("class","blocklyMinimalBody");var c=document.createElementNS(Blockly.HTML_NS,"div");this.outerDiv_=c;var d=document.createElementNS(Blockly.HTML_NS,"img");d.setAttribute("src",Blockly.pathToBlockly+"media/1x1.gif");this.innerImg_=d;c.appendChild(d);b.appendChild(c);
this.foreignObject_.appendChild(b);Blockly.Scrollbar.insertAfter_(this.foreignObject_,a)};Blockly.ScrollbarNative.prototype.isVisible=function(){return"none"!=this.foreignObject_.style.display};Blockly.ScrollbarNative.prototype.setVisible=function(a){if(a!=this.isVisible()){if(this.pair_)throw"Unable to toggle visibility of paired scrollbars.";a?(this.foreignObject_.style.display="block",this.getMetrics_()):(this.setMetrics_({x:0,y:0}),this.foreignObject_.style.display="none")}};
Blockly.ScrollbarNative.prototype.onScroll_=function(){var a={};this.horizontal_?a.x=this.outerDiv_.scrollLeft/this.innerImg_.offsetWidth||0:a.y=this.outerDiv_.scrollTop/this.innerImg_.offsetHeight||0;this.setMetrics_(a)};
Blockly.ScrollbarNative.prototype.set=function(a,b){if(!b&&this.onScrollWrapper_)var c=Blockly.unbindEvent_(this.onScrollWrapper_);this.horizontal_?this.outerDiv_.scrollLeft=a*this.ratio_:this.outerDiv_.scrollTop=a*this.ratio_;c&&(this.onScrollWrapper_=Blockly.bindEvent_(this.outerDiv_,"scroll",this,c))};
Blockly.ScrollbarNative.measureScrollbarThickness_=function(a){a=new Blockly.ScrollbarNative(a,null,null,null,!1);a.outerDiv_.style.width="100px";a.outerDiv_.style.height="100px";a.innerImg_.style.width="100%";a.innerImg_.style.height="200px";a.foreignObject_.setAttribute("width",1);a.foreignObject_.setAttribute("height",1);a.outerDiv_.style.overflowY="scroll";var b=a.innerImg_.offsetWidth;a.outerDiv_.style.overflowY="hidden";var c=a.innerImg_.offsetWidth;goog.dom.removeNode(a.foreignObject_);a=c-
b;0>=a&&(a=15);Blockly.Scrollbar.scrollbarThickness=a};
Blockly.ScrollbarSvg=function(a,b,c,d,e){this.element_=a;this.getMetrics_=b;this.setMetrics_=c;this.pair_=e||!1;this.horizontal_=d;this.createDom_(a);d?(this.svgBackground_.setAttribute("height",Blockly.Scrollbar.scrollbarThickness),this.svgKnob_.setAttribute("height",Blockly.Scrollbar.scrollbarThickness-6),this.svgKnob_.setAttribute("y",3)):(this.svgBackground_.setAttribute("width",Blockly.Scrollbar.scrollbarThickness),this.svgKnob_.setAttribute("width",Blockly.Scrollbar.scrollbarThickness-6),this.svgKnob_.setAttribute("x",
3));var f=this;this.pair_||(this.resize(),this.onResizeWrapper_=Blockly.bindEvent_(window,"resize",f,function(){f.resize()}));this.onMouseDownBarWrapper_=Blockly.bindEvent_(this.svgBackground_,"mousedown",f,f.onMouseDownBar_);this.onMouseDownKnobWrapper_=Blockly.bindEvent_(this.svgKnob_,"mousedown",f,f.onMouseDownKnob_)};
Blockly.ScrollbarSvg.prototype.dispose=function(){this.onMouseUpKnob_();this.onResizeWrapper_&&(Blockly.unbindEvent_(this.onResizeWrapper_),this.onResizeWrapper_=null);Blockly.unbindEvent_(this.onMouseDownBarWrapper_);this.onMouseDownBarWrapper_=null;Blockly.unbindEvent_(this.onMouseDownKnobWrapper_);this.onMouseDownKnobWrapper_=null;goog.dom.removeNode(this.svgGroup_);this.setMetrics_=this.getMetrics_=this.element_=this.svgKnob_=this.svgBackground_=this.svgGroup_=null};
Blockly.ScrollbarSvg.prototype.resize=function(a){if(!a&&(a=this.getMetrics_(),!a))return;if(this.horizontal_){var b=a.viewWidth;this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight);this.ratio_=b/a.contentWidth;if(-Infinity===this.ratio_||Infinity===this.ratio_||isNaN(this.ratio_))this.ratio_=0;var c=a.viewWidth*this.ratio_,d=(a.viewLeft-a.contentLeft)*this.ratio_;this.svgKnob_.setAttribute("width",Math.max(0,c));this.xCoordinate=a.absoluteLeft;this.pair_&&Blockly.RTL&&
(this.xCoordinate+=a.absoluteLeft+Blockly.Scrollbar.scrollbarThickness);this.yCoordinate=a.absoluteTop+a.viewHeight-Blockly.Scrollbar.scrollbarThickness;this.svgGroup_.setAttribute("transform","translate("+this.xCoordinate+", "+this.yCoordinate+")");this.svgBackground_.setAttribute("width",Math.max(0,b));this.svgKnob_.setAttribute("x",this.constrainKnob_(d))}else{b=a.viewHeight;this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight);this.ratio_=b/a.contentHeight;if(-Infinity===
this.ratio_||Infinity===this.ratio_||isNaN(this.ratio_))this.ratio_=0;c=a.viewHeight*this.ratio_;d=(a.viewTop-a.contentTop)*this.ratio_;this.svgKnob_.setAttribute("height",Math.max(0,c));this.xCoordinate=a.absoluteLeft;Blockly.RTL||(this.xCoordinate+=a.viewWidth-Blockly.Scrollbar.scrollbarThickness);this.yCoordinate=a.absoluteTop;this.svgGroup_.setAttribute("transform","translate("+this.xCoordinate+", "+this.yCoordinate+")");this.svgBackground_.setAttribute("height",Math.max(0,b));this.svgKnob_.setAttribute("y",
this.constrainKnob_(d))}this.onScroll_()};Blockly.ScrollbarSvg.prototype.createDom_=function(a){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyScrollbarBackground"},this.svgGroup_);var b=Math.floor((Blockly.Scrollbar.scrollbarThickness-6)/2);this.svgKnob_=Blockly.createSvgElement("rect",{"class":"blocklyScrollbarKnob",rx:b,ry:b},this.svgGroup_);Blockly.Scrollbar.insertAfter_(this.svgGroup_,a)};
Blockly.ScrollbarSvg.prototype.isVisible=function(){return"none"!=this.svgGroup_.getAttribute("display")};Blockly.ScrollbarSvg.prototype.setVisible=function(a){if(a!=this.isVisible()){if(this.pair_)throw"Unable to toggle visibility of paired scrollbars.";a?this.svgGroup_.setAttribute("display","block"):(this.setMetrics_({x:0,y:0}),this.svgGroup_.setAttribute("display","none"))}};
Blockly.ScrollbarSvg.prototype.onMouseDownBar_=function(a){Blockly.hideChaff(!0);if(!Blockly.isRightButton(a)){Blockly.svgResize();var b=Blockly.svgSize(),b=this.horizontal_?a.x-b.left:a.y-b.top,c=Blockly.getAbsoluteXY_(this.svgKnob_),c=this.horizontal_?c.x:c.y,d=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"width":"height")),e=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),f=0.95*d;b<=c?e-=f:b>=c+d&&(e+=f);this.svgKnob_.setAttribute(this.horizontal_?"x":"y",this.constrainKnob_(e));
this.onScroll_()}a.stopPropagation()};
Blockly.ScrollbarSvg.prototype.onMouseDownKnob_=function(a){Blockly.hideChaff(!0);this.onMouseUpKnob_();Blockly.isRightButton(a)||(this.startDragKnob=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),this.startDragMouse=this.horizontal_?a.clientX:a.clientY,Blockly.ScrollbarSvg.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,this.onMouseUpKnob_),Blockly.ScrollbarSvg.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.onMouseMoveKnob_));a.stopPropagation()};
Blockly.ScrollbarSvg.prototype.onMouseMoveKnob_=function(a){this.svgKnob_.setAttribute(this.horizontal_?"x":"y",this.constrainKnob_(this.startDragKnob+((this.horizontal_?a.clientX:a.clientY)-this.startDragMouse)));this.onScroll_()};
Blockly.ScrollbarSvg.prototype.onMouseUpKnob_=function(){Blockly.ScrollbarSvg.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.ScrollbarSvg.onMouseUpWrapper_),Blockly.ScrollbarSvg.onMouseUpWrapper_=null);Blockly.ScrollbarSvg.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.ScrollbarSvg.onMouseMoveWrapper_),Blockly.ScrollbarSvg.onMouseMoveWrapper_=null)};
Blockly.ScrollbarSvg.prototype.constrainKnob_=function(a){if(0>=a||isNaN(a))a=0;else{var b=this.horizontal_?"width":"height",c=parseFloat(this.svgBackground_.getAttribute(b)),b=parseFloat(this.svgKnob_.getAttribute(b));a=Math.min(a,c-b)}return a};
Blockly.ScrollbarSvg.prototype.onScroll_=function(){var a=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),b=parseFloat(this.svgBackground_.getAttribute(this.horizontal_?"width":"height")),a=a/b;isNaN(a)&&(a=0);b={};this.horizontal_?b.x=a:b.y=a;this.setMetrics_(b)};Blockly.ScrollbarSvg.prototype.set=function(a,b){this.svgKnob_.setAttribute(this.horizontal_?"x":"y",a*this.ratio_);if(b)this.onScroll_()};
goog.userAgent.GECKO&&(goog.userAgent.MAC||goog.userAgent.LINUX)?(Blockly.Scrollbar=Blockly.ScrollbarNative,Blockly.Scrollbar.scrollbarThickness=0):(Blockly.Scrollbar=Blockly.ScrollbarSvg,Blockly.Scrollbar.scrollbarThickness=15);Blockly.Scrollbar.insertAfter_=function(a,b){var c=b.nextSibling,d=b.parentNode;if(!d)throw"Reference node has no parent.";c?d.insertBefore(a,c):d.appendChild(a)};Blockly.Trashcan=function(a){this.getMetrics_=a};Blockly.Trashcan.prototype.BODY_URL_="media/trashbody.png";Blockly.Trashcan.prototype.LID_URL_="media/trashlid.png";Blockly.Trashcan.prototype.WIDTH_=47;Blockly.Trashcan.prototype.BODY_HEIGHT_=45;Blockly.Trashcan.prototype.LID_HEIGHT_=15;Blockly.Trashcan.prototype.MARGIN_BOTTOM_=35;Blockly.Trashcan.prototype.MARGIN_SIDE_=35;Blockly.Trashcan.prototype.isOpen=!1;Blockly.Trashcan.prototype.svgGroup_=null;Blockly.Trashcan.prototype.svgBody_=null;
Blockly.Trashcan.prototype.svgLid_=null;Blockly.Trashcan.prototype.lidTask_=0;Blockly.Trashcan.prototype.lidAngle_=0;Blockly.Trashcan.prototype.left_=0;Blockly.Trashcan.prototype.top_=0;
Blockly.Trashcan.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{filter:"url(#blocklyTrashcanShadowFilter)"},null);this.svgBody_=Blockly.createSvgElement("image",{width:this.WIDTH_,height:this.BODY_HEIGHT_},this.svgGroup_);this.svgBody_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",Blockly.pathToBlockly+this.BODY_URL_);this.svgBody_.setAttribute("y",this.LID_HEIGHT_);this.svgLid_=Blockly.createSvgElement("image",{width:this.WIDTH_,height:this.LID_HEIGHT_},
this.svgGroup_);this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",Blockly.pathToBlockly+this.LID_URL_);return this.svgGroup_};Blockly.Trashcan.prototype.init=function(){this.setOpen_(!1);this.position_();Blockly.bindEvent_(window,"resize",this,this.position_)};Blockly.Trashcan.prototype.dispose=function(){this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.getMetrics_=this.svgLid_=this.svgBody_=null;window.clearTimeout(this.lidTask_)};
Blockly.Trashcan.prototype.position_=function(){var a=this.getMetrics_();a&&(this.left_=Blockly.RTL?this.MARGIN_SIDE_:a.viewWidth+a.absoluteLeft-this.WIDTH_-this.MARGIN_SIDE_,this.top_=a.viewHeight+a.absoluteTop-(this.BODY_HEIGHT_+this.LID_HEIGHT_)-this.MARGIN_BOTTOM_,this.svgGroup_.setAttribute("transform","translate("+this.left_+","+this.top_+")"))};
Blockly.Trashcan.prototype.onMouseMove=function(a){if(this.svgGroup_){var b=Blockly.getAbsoluteXY_(this.svgGroup_),c=b.x,d=b.y,b=Blockly.convertCoordinates(a.clientX,a.clientY,!0);a=b.x;b=b.y;c=a>c&&a<c+this.WIDTH_&&b>d&&b<d+this.BODY_HEIGHT_+this.LID_HEIGHT_;this.isOpen!=c&&this.setOpen_(c)}};Blockly.Trashcan.prototype.setOpen_=function(a){this.isOpen!=a&&(window.clearTimeout(this.lidTask_),this.isOpen=a,Blockly.Trashcan.animateLid_(this))};
Blockly.Trashcan.animateLid_=function(a){a.lidAngle_+=a.isOpen?10:-10;a.lidAngle_=Math.max(0,a.lidAngle_);a.svgLid_.setAttribute("transform","rotate("+(Blockly.RTL?-a.lidAngle_:a.lidAngle_)+", "+(Blockly.RTL?4:a.WIDTH_-4)+", "+(a.LID_HEIGHT_-2)+")");if(a.isOpen?45>a.lidAngle_:0<a.lidAngle_)a.lidTask_=window.setTimeout(function(){Blockly.Trashcan.animateLid_(a)},5)};Blockly.Trashcan.close=function(a){a.setOpen_(!1)};Blockly.Workspace=function(a){this.editable=a;this.topBlocks_=[];Blockly.ConnectionDB.init(this)};Blockly.Workspace.prototype.dragMode=!1;Blockly.Workspace.prototype.scrollX=0;Blockly.Workspace.prototype.scrollY=0;Blockly.Workspace.prototype.trashcan=null;Blockly.Workspace.prototype.fireChangeEventPid_=null;Blockly.Workspace.prototype.scrollbar=null;
Blockly.Workspace.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBlockCanvas_=Blockly.createSvgElement("g",{},this.svgGroup_);this.svgBubbleCanvas_=Blockly.createSvgElement("g",{},this.svgGroup_);this.fireChangeEvent();return this.svgGroup_};
Blockly.Workspace.prototype.dispose=function(){this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.svgBubbleCanvas_=this.svgBlockCanvas_=null;this.trashcan&&(this.trashcan.dispose(),this.trashcan=null)};Blockly.Workspace.prototype.addTrashcan=function(a){Blockly.Trashcan&&this.editable&&(this.trashcan=new Blockly.Trashcan(a),a=this.trashcan.createDom(),this.svgGroup_.insertBefore(a,this.svgBlockCanvas_),this.trashcan.init())};Blockly.Workspace.prototype.getCanvas=function(){return this.svgBlockCanvas_};
Blockly.Workspace.prototype.getBubbleCanvas=function(){return this.svgBubbleCanvas_};Blockly.Workspace.prototype.addTopBlock=function(a){this.topBlocks_.push(a);this.fireChangeEvent()};Blockly.Workspace.prototype.removeTopBlock=function(a){for(var b=!1,c,d=0;c=this.topBlocks_[d];d++)if(c==a){this.topBlocks_.splice(d,1);b=!0;break}if(!b)throw"Block not present in workspace's list of top-most blocks.";this.fireChangeEvent()};
Blockly.Workspace.prototype.getTopBlocks=function(a){var b=[].concat(this.topBlocks_);a&&1<b.length&&b.sort(function(a,b){return a.getRelativeToSurfaceXY().y-b.getRelativeToSurfaceXY().y});return b};Blockly.Workspace.prototype.getAllBlocks=function(){for(var a=this.getTopBlocks(!1),b=0;b<a.length;b++)a=a.concat(a[b].getChildren());return a};Blockly.Workspace.prototype.clear=function(){for(Blockly.hideChaff();this.topBlocks_.length;)this.topBlocks_[0].dispose()};
Blockly.Workspace.prototype.render=function(){for(var a=this.getAllBlocks(),b=0,c;c=a[b];b++)c.getChildren().length||c.render()};Blockly.Workspace.prototype.getBlockById=function(a){for(var b=this.getAllBlocks(),c=0,d;d=b[c];c++)if(d.id==a)return d;return null};
Blockly.Workspace.prototype.traceOn=function(a){this.traceOn_=a;this.traceWrapper_&&(Blockly.unbindEvent_(this.traceWrapper_),this.traceWrapper_=null);a&&(this.traceWrapper_=Blockly.bindEvent_(this.svgBlockCanvas_,"blocklySelectChange",this,function(){this.traceOn_=!1}))};Blockly.Workspace.prototype.highlightBlock=function(a){if(this.traceOn_){var b=null;if(a&&(b=this.getBlockById(a),!b))return;this.traceOn(!1);b?b.select():Blockly.selected&&Blockly.selected.unselect();this.traceOn(!0)}};
Blockly.Workspace.prototype.fireChangeEvent=function(){this.fireChangeEventPid_&&window.clearTimeout(this.fireChangeEventPid_);var a=this.svgBlockCanvas_;a&&(this.fireChangeEventPid_=window.setTimeout(function(){Blockly.fireUiEvent(a,"blocklyWorkspaceChange")},0))};
Blockly.Workspace.prototype.paste=function(a){var b=Blockly.Xml.domToBlock_(this,a),c=parseInt(a.getAttribute("x"),10);a=parseInt(a.getAttribute("y"),10);if(!isNaN(c)&&!isNaN(a)){Blockly.RTL&&(c=-c);do for(var d=!1,e=this.getAllBlocks(),f=0,g;g=e[f];f++)g=g.getRelativeToSurfaceXY(),1>=Math.abs(c-g.x)&&1>=Math.abs(a-g.y)&&(c=Blockly.RTL?c-Blockly.SNAP_RADIUS:c+Blockly.SNAP_RADIUS,a+=2*Blockly.SNAP_RADIUS,d=!0);while(d);b.moveBy(c,a)}b.select()};Blockly.BlockSvg=function(a){this.block_=a;this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgPathDark_=Blockly.createSvgElement("path",{"class":"blocklyPathDark",transform:"translate(1, 1)"},this.svgGroup_);this.svgPath_=Blockly.createSvgElement("path",{"class":"blocklyPath"},this.svgGroup_);this.svgPathLight_=Blockly.createSvgElement("path",{"class":"blocklyPathLight"},this.svgGroup_);this.svgPath_.tooltip=this.block_;Blockly.Tooltip&&Blockly.Tooltip.bindMouseEvents(this.svgPath_);a.editable&&
Blockly.addClass_(this.svgGroup_,"blocklyDraggable")};Blockly.BlockSvg.INLINE=-1;Blockly.BlockSvg.prototype.init=function(){var a=this.block_;this.updateColour();for(var b=0,c;c=a.inputList[b];b++)c.init();a.mutator&&a.mutator.createIcon()};Blockly.BlockSvg.prototype.getRootElement=function(){return this.svgGroup_};Blockly.BlockSvg.SEP_SPACE_X=10;Blockly.BlockSvg.SEP_SPACE_Y=5;Blockly.BlockSvg.MIN_BLOCK_Y=25;Blockly.BlockSvg.TAB_HEIGHT=20;Blockly.BlockSvg.TAB_WIDTH=8;
Blockly.BlockSvg.NOTCH_WIDTH=30;Blockly.BlockSvg.CORNER_RADIUS=8;Blockly.BlockSvg.TITLE_HEIGHT=18;Blockly.BlockSvg.DISTANCE_45_INSIDE=(1-Math.SQRT1_2)*(Blockly.BlockSvg.CORNER_RADIUS-1)+1;Blockly.BlockSvg.DISTANCE_45_OUTSIDE=(1-Math.SQRT1_2)*(Blockly.BlockSvg.CORNER_RADIUS+1)-1;Blockly.BlockSvg.NOTCH_PATH_LEFT="l 6,4 3,0 6,-4";Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT="l 6.5,4 2,0 6.5,-4";Blockly.BlockSvg.NOTCH_PATH_RIGHT="l -6,4 -3,0 -6,-4";Blockly.BlockSvg.JAGGED_TEETH="l 8,0 0,4 8,4 -16,8 8,4";
Blockly.BlockSvg.TAB_PATH_DOWN="v 5 c 0,10 -"+Blockly.BlockSvg.TAB_WIDTH+",-8 -"+Blockly.BlockSvg.TAB_WIDTH+",7.5 s "+Blockly.BlockSvg.TAB_WIDTH+",-2.5 "+Blockly.BlockSvg.TAB_WIDTH+",7.5";Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL="v 6.5 m -"+0.98*Blockly.BlockSvg.TAB_WIDTH+",2.5 q -"+0.05*Blockly.BlockSvg.TAB_WIDTH+",10 "+0.27*Blockly.BlockSvg.TAB_WIDTH+",10 m "+0.71*Blockly.BlockSvg.TAB_WIDTH+",-2.5 v 1.5";Blockly.BlockSvg.TOP_LEFT_CORNER_START="m 0,"+Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL="m "+Blockly.BlockSvg.DISTANCE_45_INSIDE+","+Blockly.BlockSvg.DISTANCE_45_INSIDE;Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR="m 1,"+(Blockly.BlockSvg.CORNER_RADIUS-1);Blockly.BlockSvg.TOP_LEFT_CORNER="A "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,1 "+Blockly.BlockSvg.CORNER_RADIUS+",0";
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT="A "+(Blockly.BlockSvg.CORNER_RADIUS-1)+","+(Blockly.BlockSvg.CORNER_RADIUS-1)+" 0 0,1 "+Blockly.BlockSvg.CORNER_RADIUS+",1";Blockly.BlockSvg.INNER_TOP_LEFT_CORNER=Blockly.BlockSvg.NOTCH_PATH_RIGHT+" h -"+(Blockly.BlockSvg.NOTCH_WIDTH-15-Blockly.BlockSvg.CORNER_RADIUS)+" a "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,0 -"+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER="a "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,0 "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS;Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(-Blockly.BlockSvg.DISTANCE_45_OUTSIDE-1)+","+(Blockly.BlockSvg.CORNER_RADIUS-Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1);Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(Blockly.BlockSvg.CORNER_RADIUS-Blockly.BlockSvg.DISTANCE_45_OUTSIDE)+","+(Blockly.BlockSvg.DISTANCE_45_OUTSIDE+1);
Blockly.BlockSvg.prototype.dispose=function(){goog.dom.removeNode(this.svgGroup_);this.block_=this.svgPathDark_=this.svgPathLight_=this.svgPath_=this.svgGroup_=null};
Blockly.BlockSvg.prototype.disposeUiEffect=function(){Blockly.playAudio("delete");var a=Blockly.getAbsoluteXY_(this.svgGroup_),b=this.svgGroup_.cloneNode(!0);b.translateX_=a.x;b.translateY_=a.y;b.setAttribute("transform","translate("+b.translateX_+","+b.translateY_+")");Blockly.svg.appendChild(b);b.bBox_=b.getBBox();b.startDate_=new Date;Blockly.BlockSvg.disposeUiStep_(b)};
Blockly.BlockSvg.disposeUiStep_=function(a){var b=(new Date-a.startDate_)/150;1<b?goog.dom.removeNode(a):(a.setAttribute("transform","translate("+(a.translateX_+(Blockly.RTL?-1:1)*a.bBox_.width/2*b+", "+(a.translateY_+a.bBox_.height*b))+") scale("+(1-b)+")"),window.setTimeout(function(){Blockly.BlockSvg.disposeUiStep_(a)},10))};
Blockly.BlockSvg.prototype.connectionUiEffect=function(){Blockly.playAudio("click");var a=Blockly.getAbsoluteXY_(this.svgGroup_);this.block_.outputConnection?(a.x+=Blockly.RTL?3:-3,a.y+=13):this.block_.previousConnection&&(a.x+=Blockly.RTL?-23:23,a.y+=3);a=Blockly.createSvgElement("circle",{cx:a.x,cy:a.y,r:0,fill:"none",stroke:"#888","stroke-width":10},Blockly.svg);a.startDate_=new Date;Blockly.BlockSvg.connectionUiStep_(a)};
Blockly.BlockSvg.connectionUiStep_=function(a){var b=(new Date-a.startDate_)/150;1<b?goog.dom.removeNode(a):(a.setAttribute("r",25*b),a.style.opacity=1-b,window.setTimeout(function(){Blockly.BlockSvg.connectionUiStep_(a)},10))};
Blockly.BlockSvg.prototype.updateColour=function(){var a=Blockly.makeColour(this.block_.getColour()),b=goog.color.hexToRgb(a),c=goog.color.lighten(b,0.3),b=goog.color.darken(b,0.4);this.svgPathLight_.setAttribute("stroke",goog.color.rgbArrayToHex(c));this.svgPathDark_.setAttribute("fill",goog.color.rgbArrayToHex(b));this.svgPath_.setAttribute("fill",a)};
Blockly.BlockSvg.prototype.updateDisabled=function(){this.block_.disabled||this.block_.getInheritedDisabled()?(Blockly.addClass_(this.svgGroup_,"blocklyDisabled"),this.svgPath_.setAttribute("fill","url(#blocklyDisabledPattern)")):(Blockly.removeClass_(this.svgGroup_,"blocklyDisabled"),this.updateColour());for(var a=this.block_.getChildren(),b=0,c;c=a[b];b++)c.svg_.updateDisabled()};Blockly.BlockSvg.prototype.addSelect=function(){Blockly.addClass_(this.svgGroup_,"blocklySelected");this.svgGroup_.parentNode.appendChild(this.svgGroup_)};
Blockly.BlockSvg.prototype.removeSelect=function(){Blockly.removeClass_(this.svgGroup_,"blocklySelected")};Blockly.BlockSvg.prototype.addDragging=function(){Blockly.addClass_(this.svgGroup_,"blocklyDragging")};Blockly.BlockSvg.prototype.removeDragging=function(){Blockly.removeClass_(this.svgGroup_,"blocklyDragging")};
Blockly.BlockSvg.prototype.render=function(){this.block_.rendered=!0;var a=Blockly.BlockSvg.SEP_SPACE_X;Blockly.RTL&&(a=-a);this.block_.mutator&&(a=this.block_.mutator.renderIcon(a));this.block_.comment&&(a=this.block_.comment.renderIcon(a));this.block_.warning&&(a=this.block_.warning.renderIcon(a));var a=a+(Blockly.RTL?Blockly.BlockSvg.SEP_SPACE_X:-Blockly.BlockSvg.SEP_SPACE_X),b=this.renderCompute_(a);this.renderDraw_(a,b);(a=this.block_.getParent())?a.render():Blockly.fireUiEvent(window,"resize")};
Blockly.BlockSvg.prototype.renderTitles_=function(a,b,c){Blockly.RTL&&(b=-b);for(var d=0,e;e=a[d];d++){var f=e.getSize().width;Blockly.RTL?(b-=f,e.getRootElement().setAttribute("transform","translate("+b+", "+c+")"),f&&(b-=Blockly.BlockSvg.SEP_SPACE_X)):(e.getRootElement().setAttribute("transform","translate("+b+", "+c+")"),f&&(b+=f+Blockly.BlockSvg.SEP_SPACE_X))}return Blockly.RTL?-b:b};
Blockly.BlockSvg.prototype.renderCompute_=function(a){var b=this.block_.inputList,c=[];c.rightEdge=a+2*Blockly.BlockSvg.SEP_SPACE_X;if(this.block_.previousConnection||this.block_.nextConnection)c.rightEdge=Math.max(c.rightEdge,Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.SEP_SPACE_X);if(this.block_.collapsed)return c;for(var d=0,e=0,f=!1,g=!1,h=!1,i=void 0,j=0,k;k=b[j];j++){var l;!this.block_.inputsInline||!i||i==Blockly.NEXT_STATEMENT||k.type==Blockly.NEXT_STATEMENT?(i=k.type,l=[],l.type=this.block_.inputsInline&&
k.type!=Blockly.NEXT_STATEMENT?Blockly.BlockSvg.INLINE:k.type,l.height=0,c.push(l)):l=c[c.length-1];l.push(k);k.renderHeight=Blockly.BlockSvg.MIN_BLOCK_Y;k.renderWidth=this.block_.inputsInline&&k.type==Blockly.INPUT_VALUE?Blockly.BlockSvg.TAB_WIDTH+Blockly.BlockSvg.SEP_SPACE_X:0;if(k.connection&&k.connection.targetConnection){var m=k.connection.targetBlock().getSvgRoot();try{var p=m.getBBox()}catch(n){p={height:0,width:0}}goog.userAgent.WEBKIT&&(p.height-=3);k.renderHeight=Math.max(k.renderHeight,
p.height-1);k.renderWidth=Math.max(k.renderWidth,p.width)}l.height=Math.max(l.height,k.renderHeight);k.titleWidth=0;1==c.length&&(k.titleWidth+=Blockly.RTL?-a:a);for(var m=0,q;q=k.titleRow[m];m++)0!=m&&(k.titleWidth+=Blockly.BlockSvg.SEP_SPACE_X),q=q.getSize(),k.titleWidth+=q.width,l.height=Math.max(l.height,q.height);l.type!=Blockly.BlockSvg.INLINE&&(l.type==Blockly.NEXT_STATEMENT?(g=!0,e=Math.max(e,k.titleWidth)):(l.type==Blockly.INPUT_VALUE?f=!0:l.type==Blockly.DUMMY_INPUT&&(h=!0),d=Math.max(d,
k.titleWidth)))}for(a=0;l=c[a];a++)if(l.thicker=!1,this.block_.inputsInline&&l.type==Blockly.BlockSvg.INLINE)for(b=0;k=l[b];b++)if(k.type==Blockly.INPUT_VALUE){l.height+=2*Blockly.BlockSvg.SEP_SPACE_Y;l.thicker=!0;break}c.statementEdge=2*Blockly.BlockSvg.SEP_SPACE_X+e;g&&(c.rightEdge=Math.max(c.rightEdge,c.statementEdge+Blockly.BlockSvg.NOTCH_WIDTH));f?c.rightEdge=Math.max(c.rightEdge,d+2*Blockly.BlockSvg.SEP_SPACE_X+Blockly.BlockSvg.TAB_WIDTH):h&&(c.rightEdge=Math.max(c.rightEdge,d+2*Blockly.BlockSvg.SEP_SPACE_X));
c.hasValue=f;c.hasStatement=g;c.hasDummy=h;return c};
Blockly.BlockSvg.prototype.renderDraw_=function(a,b){if(this.block_.outputConnection)this.squareBottomLeftCorner_=this.squareTopLeftCorner_=!0;else{this.squareBottomLeftCorner_=this.squareTopLeftCorner_=!1;if(this.block_.previousConnection){var c=this.block_.previousConnection.targetBlock();c&&(c.nextConnection&&c.nextConnection.targetConnection==this.block_.previousConnection)&&(this.squareTopLeftCorner_=!0)}if(this.block_.nextConnection&&(c=this.block_.nextConnection.targetBlock())&&c.previousConnection&&
c.previousConnection.targetConnection==this.block_.nextConnection)this.squareBottomLeftCorner_=!0}var d=this.block_.getRelativeToSurfaceXY(),e=[],f=[],c=[],g=[];this.renderDrawTop_(e,c,d,b.rightEdge);var h=this.renderDrawRight_(e,c,f,g,d,b,a);this.renderDrawBottom_(e,c,d,h);this.renderDrawLeft_(e,c,d,h);d=e.join(" ")+"\n"+f.join(" ");this.svgPath_.setAttribute("d",d);this.svgPathDark_.setAttribute("d",d);d=c.join(" ")+"\n"+g.join(" ");this.svgPathLight_.setAttribute("d",d);Blockly.RTL&&(this.svgPath_.setAttribute("transform",
"scale(-1 1)"),this.svgPathLight_.setAttribute("transform","scale(-1 1)"),this.svgPathDark_.setAttribute("transform","translate(1,1) scale(-1 1)"))};
Blockly.BlockSvg.prototype.renderDrawTop_=function(a,b,c,d){this.squareTopLeftCorner_?(a.push("m 0,0"),b.push("m 1,1")):(a.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START),b.push(Blockly.RTL?Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL:Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR),a.push(Blockly.BlockSvg.TOP_LEFT_CORNER),b.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT));this.block_.previousConnection&&(a.push("H",Blockly.BlockSvg.NOTCH_WIDTH-15),b.push("H",Blockly.BlockSvg.NOTCH_WIDTH-
15),a.push(Blockly.BlockSvg.NOTCH_PATH_LEFT),b.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT),this.block_.previousConnection.moveTo(c.x+(Blockly.RTL?-Blockly.BlockSvg.NOTCH_WIDTH:Blockly.BlockSvg.NOTCH_WIDTH),c.y));a.push("H",d);b.push("H",d+(Blockly.RTL?-1:0))};
Blockly.BlockSvg.prototype.renderDrawRight_=function(a,b,c,d,e,f,g){for(var h,i=0,j,k,l=0,m;m=f[l];l++){h=Blockly.BlockSvg.SEP_SPACE_X;0==l&&(h+=Blockly.RTL?-g:g);b.push("M",f.rightEdge-1+","+(i+1));if(m.type==Blockly.BlockSvg.INLINE){for(var p=0,n;n=m[p];p++)j=i+Blockly.BlockSvg.TITLE_HEIGHT,m.thicker&&(j+=Blockly.BlockSvg.SEP_SPACE_Y),h=this.renderTitles_(n.titleRow,h,j),n.type!=Blockly.DUMMY_INPUT&&(h+=n.renderWidth+Blockly.BlockSvg.SEP_SPACE_X),n.type==Blockly.INPUT_VALUE&&(c.push("M",h-Blockly.BlockSvg.SEP_SPACE_X+
","+(i+Blockly.BlockSvg.SEP_SPACE_Y)),c.push("h",Blockly.BlockSvg.TAB_WIDTH-n.renderWidth),c.push(Blockly.BlockSvg.TAB_PATH_DOWN),c.push("v",n.renderHeight-Blockly.BlockSvg.TAB_HEIGHT),c.push("h",n.renderWidth-Blockly.BlockSvg.TAB_WIDTH),c.push("z"),Blockly.RTL?(d.push("M",h-Blockly.BlockSvg.SEP_SPACE_X+Blockly.BlockSvg.TAB_WIDTH-n.renderWidth-1+","+(i+Blockly.BlockSvg.SEP_SPACE_Y+1)),d.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL),d.push("v",n.renderHeight-Blockly.BlockSvg.TAB_HEIGHT+2),d.push("h",
n.renderWidth-Blockly.BlockSvg.TAB_WIDTH)):(d.push("M",h-Blockly.BlockSvg.SEP_SPACE_X+1+","+(i+Blockly.BlockSvg.SEP_SPACE_Y+1)),d.push("v",n.renderHeight),d.push("h",Blockly.BlockSvg.TAB_WIDTH-n.renderWidth),d.push("M",h-n.renderWidth-Blockly.BlockSvg.SEP_SPACE_X+3.8+","+(i+Blockly.BlockSvg.SEP_SPACE_Y+Blockly.BlockSvg.TAB_HEIGHT-0.4)),d.push("l",0.42*Blockly.BlockSvg.TAB_WIDTH+",-1.8")),j=Blockly.RTL?e.x-h-Blockly.BlockSvg.TAB_WIDTH+Blockly.BlockSvg.SEP_SPACE_X+n.renderWidth-1:e.x+h+Blockly.BlockSvg.TAB_WIDTH-
Blockly.BlockSvg.SEP_SPACE_X-n.renderWidth+1,k=e.y+i+Blockly.BlockSvg.SEP_SPACE_Y,n.connection.moveTo(j,k),n.connection.targetConnection&&n.connection.tighten_());h=Math.max(h,f.rightEdge);a.push("H",h);b.push("H",h+(Blockly.RTL?-1:0));a.push("v",m.height);Blockly.RTL&&b.push("v",m.height-2)}else if(m.type==Blockly.INPUT_VALUE)n=m[0],j=i+Blockly.BlockSvg.TITLE_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(p=f.rightEdge-n.titleWidth-Blockly.BlockSvg.TAB_WIDTH-2*Blockly.BlockSvg.SEP_SPACE_X,n.align==Blockly.ALIGN_RIGHT?
h+=p:n.align==Blockly.ALIGN_CENTRE&&(h+=(p+h)/2)),this.renderTitles_(n.titleRow,h,j),a.push(Blockly.BlockSvg.TAB_PATH_DOWN),a.push("v",m.height-Blockly.BlockSvg.TAB_HEIGHT),Blockly.RTL?(b.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL),b.push("v",m.height-Blockly.BlockSvg.TAB_HEIGHT)):(b.push("M",f.rightEdge-4.2+","+(i+Blockly.BlockSvg.TAB_HEIGHT-0.4)),b.push("l",0.42*Blockly.BlockSvg.TAB_WIDTH+",-1.8")),j=e.x+(Blockly.RTL?-f.rightEdge-1:f.rightEdge+1),k=e.y+i,n.connection.moveTo(j,k),n.connection.targetConnection&&
n.connection.tighten_();else if(m.type==Blockly.DUMMY_INPUT)n=m[0],j=i+Blockly.BlockSvg.TITLE_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(p=f.rightEdge-n.titleWidth-2*Blockly.BlockSvg.SEP_SPACE_X,f.hasValue&&(p-=Blockly.BlockSvg.TAB_WIDTH),n.align==Blockly.ALIGN_RIGHT?h+=p:n.align==Blockly.ALIGN_CENTRE&&(h+=(p+h)/2)),this.renderTitles_(n.titleRow,h,j),a.push("v",m.height),Blockly.RTL&&b.push("v",m.height-2);else if(m.type==Blockly.NEXT_STATEMENT&&(n=m[0],0==l&&(a.push("v",Blockly.BlockSvg.SEP_SPACE_Y),Blockly.RTL&&
b.push("v",Blockly.BlockSvg.SEP_SPACE_Y-1),i+=Blockly.BlockSvg.SEP_SPACE_Y),j=i+Blockly.BlockSvg.TITLE_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(p=f.statementEdge-n.titleWidth-2*Blockly.BlockSvg.SEP_SPACE_X,n.align==Blockly.ALIGN_RIGHT?h+=p:n.align==Blockly.ALIGN_CENTRE&&(h+=(p+h)/2)),this.renderTitles_(n.titleRow,h,j),h=f.statementEdge+Blockly.BlockSvg.NOTCH_WIDTH,a.push("H",h),a.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER),a.push("v",m.height-2*Blockly.BlockSvg.CORNER_RADIUS),a.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER),
a.push("H",f.rightEdge),Blockly.RTL?(b.push("M",h-Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.DISTANCE_45_OUTSIDE+","+(i+Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),b.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL),b.push("v",m.height-2*Blockly.BlockSvg.CORNER_RADIUS),b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL),b.push("H",f.rightEdge-1)):(b.push("M",h-Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.DISTANCE_45_OUTSIDE+","+(i+m.height-Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),
b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR),b.push("H",f.rightEdge)),j=e.x+(Blockly.RTL?-h:h),k=e.y+i+1,n.connection.moveTo(j,k),n.connection.targetConnection&&n.connection.tighten_(),l==f.length-1||f[l+1].type==Blockly.NEXT_STATEMENT))a.push("v",Blockly.BlockSvg.SEP_SPACE_Y),Blockly.RTL&&b.push("v",Blockly.BlockSvg.SEP_SPACE_Y-1),i+=Blockly.BlockSvg.SEP_SPACE_Y;i+=m.height}f.length||(this.block_.collapsed&&(a.push(Blockly.BlockSvg.JAGGED_TEETH),Blockly.RTL?b.push("l 8,0 0,3.8 7,3.2 m -14.5,9 l 8,4"):
b.push("h 8")),i=Blockly.BlockSvg.MIN_BLOCK_Y,a.push("V",i),Blockly.RTL&&b.push("V",i-1));return i};
Blockly.BlockSvg.prototype.renderDrawBottom_=function(a,b,c,d){this.block_.nextConnection&&(a.push("H",Blockly.BlockSvg.NOTCH_WIDTH+" "+Blockly.BlockSvg.NOTCH_PATH_RIGHT),this.block_.nextConnection.moveTo(Blockly.RTL?c.x-Blockly.BlockSvg.NOTCH_WIDTH:c.x+Blockly.BlockSvg.NOTCH_WIDTH,c.y+d+1),this.block_.nextConnection.targetConnection&&this.block_.nextConnection.tighten_());this.squareBottomLeftCorner_?(a.push("H 0"),Blockly.RTL||b.push("M","1,"+d)):(a.push("H",Blockly.BlockSvg.CORNER_RADIUS),a.push("a",
Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,1 -"+Blockly.BlockSvg.CORNER_RADIUS+",-"+Blockly.BlockSvg.CORNER_RADIUS),Blockly.RTL||(b.push("M",Blockly.BlockSvg.DISTANCE_45_INSIDE+","+(d-Blockly.BlockSvg.DISTANCE_45_INSIDE)),b.push("A",Blockly.BlockSvg.CORNER_RADIUS-1+","+(Blockly.BlockSvg.CORNER_RADIUS-1)+" 0 0,1 1,"+(d-Blockly.BlockSvg.CORNER_RADIUS))))};
Blockly.BlockSvg.prototype.renderDrawLeft_=function(a,b,c,d){this.block_.outputConnection?(this.block_.outputConnection.moveTo(c.x,c.y),a.push("V",Blockly.BlockSvg.TAB_HEIGHT),a.push("c 0,-10 -"+Blockly.BlockSvg.TAB_WIDTH+",8 -"+Blockly.BlockSvg.TAB_WIDTH+",-7.5 s "+Blockly.BlockSvg.TAB_WIDTH+",2.5 "+Blockly.BlockSvg.TAB_WIDTH+",-7.5"),Blockly.RTL?(b.push("M",-0.3*Blockly.BlockSvg.TAB_WIDTH+",8.9"),b.push("l",-0.45*Blockly.BlockSvg.TAB_WIDTH+",-2.1")):(b.push("V",Blockly.BlockSvg.TAB_HEIGHT-1),b.push("m",
-0.92*Blockly.BlockSvg.TAB_WIDTH+",-1 q "+-0.19*Blockly.BlockSvg.TAB_WIDTH+",-5.5 0,-11"),b.push("m",0.92*Blockly.BlockSvg.TAB_WIDTH+",1 V 1 H 2"))):Blockly.RTL||(this.squareTopLeftCorner_?b.push("V",1):b.push("V",Blockly.BlockSvg.CORNER_RADIUS));a.push("z")};Blockly.Field=function(a){this.sourceBlock_=null;this.group_=Blockly.createSvgElement("g",{},null);this.borderRect_=Blockly.createSvgElement("rect",{rx:4,ry:4,x:-Blockly.BlockSvg.SEP_SPACE_X/2,y:-12,height:16},this.group_);this.textElement_=Blockly.createSvgElement("text",{"class":"blocklyText"},this.group_);this.CURSOR&&(this.group_.style.cursor=this.CURSOR);this.size_={height:25,width:0};this.setText(a)};Blockly.Field.NBSP="\u00a0";Blockly.Field.prototype.EDITABLE=!0;
Blockly.Field.prototype.init=function(a){if(this.sourceBlock_)throw"Field has already been initialized once.";this.sourceBlock_=a;this.group_.setAttribute("class",a.editable?"blocklyEditableText":"blocklyNonEditableText");a.getSvgRoot().appendChild(this.group_);a.editable&&(this.mouseUpWrapper_=Blockly.bindEvent_(this.group_,"mouseup",this,this.onMouseUp_))};
Blockly.Field.prototype.dispose=function(){this.mouseUpWrapper_&&(Blockly.unbindEvent_(this.mouseUpWrapper_),this.mouseUpWrapper_=null);this.sourceBlock_=null;goog.dom.removeNode(this.group_);this.borderRect_=this.textElement_=this.group_=null};Blockly.Field.prototype.setVisible=function(a){this.getRootElement().style.display=a?"block":"none"};Blockly.Field.prototype.getRootElement=function(){return this.group_};Blockly.Field.textLengthCache={};
Blockly.Field.prototype.render_=function(){if(Blockly.Field.textLengthCache.hasOwnProperty(this.text_))var a=Blockly.Field.textLengthCache[this.text_];else(a=this.textElement_.getComputedTextLength())&&(Blockly.Field.textLengthCache[this.text_]=a);this.borderRect_&&this.borderRect_.setAttribute("width",a+Blockly.BlockSvg.SEP_SPACE_X);this.size_.width=a};Blockly.Field.prototype.getSize=function(){this.size_.width||this.render_();return this.size_};Blockly.Field.prototype.getText=function(){return this.text_};
Blockly.Field.prototype.setText=function(a){null!==a&&(this.text_=a,goog.dom.removeChildren(this.textElement_),a=a.replace(/\s/g,Blockly.Field.NBSP),a||(a=Blockly.Field.NBSP),a=document.createTextNode(a),this.textElement_.appendChild(a),this.size_.width=0,this.sourceBlock_&&this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_(),this.sourceBlock_.workspace.fireChangeEvent()))};Blockly.Field.prototype.getValue=function(){return this.getText()};
Blockly.Field.prototype.setValue=function(a){this.setText(a)};Blockly.Field.prototype.onMouseUp_=function(a){Blockly.isRightButton(a)||2!=Blockly.Block.dragMode_&&this.showEditor_()};Blockly.Field.prototype.setTooltip=function(a){};Blockly.FieldDropdown=function(a,b){this.menuGenerator_=a;this.changeHandler_=b;var c=this.getOptions_()[0];this.value_=c[1];Blockly.Field.call(this,c[0])};goog.inherits(Blockly.FieldDropdown,Blockly.Field);
Blockly.FieldDropdown.createDom=function(){var a=Blockly.createSvgElement("g",{"class":"blocklyHidden"},null);Blockly.FieldDropdown.svgGroup_=a;Blockly.FieldDropdown.svgShadow_=Blockly.createSvgElement("rect",{"class":"blocklyDropdownMenuShadow",x:0,y:1,rx:2,ry:2},a);Blockly.FieldDropdown.svgBackground_=Blockly.createSvgElement("rect",{x:-2,y:-1,rx:2,ry:2,filter:"url(#blocklyEmboss)"},a);Blockly.FieldDropdown.svgOptions_=Blockly.createSvgElement("g",{"class":"blocklyDropdownMenuOptions"},a);return a};
Blockly.FieldDropdown.prototype.dispose=function(){Blockly.FieldDropdown.openDropdown_==this&&Blockly.FieldDropdown.hide();Blockly.Field.prototype.dispose.call(this)};Blockly.FieldDropdown.CORNER_RADIUS=2;Blockly.FieldDropdown.prototype.CURSOR="default";Blockly.FieldDropdown.openDropdown_=null;
Blockly.FieldDropdown.prototype.showEditor_=function(){function a(a){return function(b){if(this.changeHandler_){var c=this.changeHandler_(a);void 0!==c&&(a=c)}null!==a&&this.setValue(a);b.stopPropagation()}}var b=Blockly.FieldDropdown.svgGroup_,c=Blockly.FieldDropdown.svgOptions_,d=Blockly.FieldDropdown.svgBackground_,e=Blockly.FieldDropdown.svgShadow_;goog.dom.removeChildren(c);b.style.display="block";Blockly.FieldDropdown.openDropdown_=this;for(var f=0,g=[],h=null,i=this.getOptions_(),j=0;j<i.length;j++){var k=
i[j][1],l=Blockly.ContextMenu.optionToDom(i[j][0]),m=l.firstChild,p=l.lastChild;c.appendChild(l);!h&&k==this.value_&&(h=Blockly.createSvgElement("text",{"class":"blocklyMenuText",y:15},null),l.insertBefore(h,p),h.appendChild(document.createTextNode("\u2713")));l.setAttribute("transform","translate(0, "+j*Blockly.ContextMenu.Y_HEIGHT+")");g.push(m);Blockly.bindEvent_(l,"mousedown",null,Blockly.noEvent);Blockly.bindEvent_(l,"mouseup",this,a(k));Blockly.bindEvent_(l,"mouseup",null,Blockly.FieldDropdown.hide);
f=Math.max(f,p.getComputedTextLength())}f+=2*Blockly.ContextMenu.X_PADDING;for(j=0;j<g.length;j++)g[j].setAttribute("width",f);if(Blockly.RTL)for(j=0;l=c.childNodes[j];j++)p=l.lastChild,p.setAttribute("text-anchor","end"),p.setAttribute("x",f-Blockly.ContextMenu.X_PADDING);h&&(Blockly.RTL?(h.setAttribute("text-anchor","end"),h.setAttribute("x",f-5)):h.setAttribute("x",5));j=f+2*Blockly.FieldDropdown.CORNER_RADIUS;i=i.length*Blockly.ContextMenu.Y_HEIGHT+Blockly.FieldDropdown.CORNER_RADIUS+1;e.setAttribute("width",
j);e.setAttribute("height",i);d.setAttribute("width",j);d.setAttribute("height",i);e=Blockly.makeColour(this.sourceBlock_.getColour());d.setAttribute("fill",e);d=Blockly.getAbsoluteXY_(this.borderRect_);e=this.borderRect_.getBBox();j=Blockly.RTL?d.x-f+Blockly.ContextMenu.X_PADDING+e.width-Blockly.BlockSvg.SEP_SPACE_X/2:d.x-Blockly.ContextMenu.X_PADDING+Blockly.BlockSvg.SEP_SPACE_X/2;b.setAttribute("transform","translate("+j+", "+(d.y+e.height)+")")};
Blockly.FieldDropdown.prototype.getOptions_=function(){return goog.isFunction(this.menuGenerator_)?this.menuGenerator_.call(this):this.menuGenerator_};Blockly.FieldDropdown.prototype.getValue=function(){return this.value_};Blockly.FieldDropdown.prototype.setValue=function(a){this.value_=a;for(var b=this.getOptions_(),c=0;c<b.length;c++)if(b[c][1]==a){this.setText(b[c][0]);return}this.setText(a)};
Blockly.FieldDropdown.hide=function(){Blockly.FieldDropdown.svgGroup_.style.display="none";Blockly.FieldDropdown.openDropdown_=null};Blockly.Language={};Blockly.ContextMenu={};Blockly.ContextMenu.X_PADDING=20;Blockly.ContextMenu.Y_HEIGHT=20;Blockly.ContextMenu.visible=!1;
Blockly.ContextMenu.createDom=function(){var a=Blockly.createSvgElement("g",{"class":"blocklyHidden"},null);Blockly.ContextMenu.svgGroup=a;Blockly.ContextMenu.svgShadow=Blockly.createSvgElement("rect",{"class":"blocklyContextMenuShadow",x:2,y:-2,rx:4,ry:4},a);Blockly.ContextMenu.svgBackground=Blockly.createSvgElement("rect",{"class":"blocklyContextMenuBackground",y:-4,rx:4,ry:4},a);Blockly.ContextMenu.svgOptions=Blockly.createSvgElement("g",{"class":"blocklyContextMenuOptions"},a);return a};
Blockly.ContextMenu.show=function(a,b,c){if(c.length){goog.dom.removeChildren(Blockly.ContextMenu.svgOptions);Blockly.ContextMenu.svgGroup.style.display="block";for(var d=0,e=[Blockly.ContextMenu.svgBackground,Blockly.ContextMenu.svgShadow],f=0,g;g=c[f];f++){var h=Blockly.ContextMenu.optionToDom(g.text),i=h.firstChild,j=h.lastChild;Blockly.ContextMenu.svgOptions.appendChild(h);h.setAttribute("transform","translate(0, "+f*Blockly.ContextMenu.Y_HEIGHT+")");e.push(i);Blockly.bindEvent_(h,"mousedown",
null,Blockly.noEvent);g.enabled?(Blockly.bindEvent_(h,"mouseup",null,g.callback),Blockly.bindEvent_(h,"mouseup",null,Blockly.ContextMenu.hide)):h.setAttribute("class","blocklyMenuDivDisabled");d=Math.max(d,j.getComputedTextLength())}d+=2*Blockly.ContextMenu.X_PADDING;for(f=0;f<e.length;f++)e[f].setAttribute("width",d);if(Blockly.RTL)for(f=0;h=Blockly.ContextMenu.svgOptions.childNodes[f];f++)j=h.lastChild,j.setAttribute("text-anchor","end"),j.setAttribute("x",d-Blockly.ContextMenu.X_PADDING);Blockly.ContextMenu.svgBackground.setAttribute("height",
c.length*Blockly.ContextMenu.Y_HEIGHT+8);Blockly.ContextMenu.svgShadow.setAttribute("height",c.length*Blockly.ContextMenu.Y_HEIGHT+10);b=Blockly.convertCoordinates(a,b,!0);a=b.x;b=b.y;c=Blockly.ContextMenu.svgGroup.getBBox();d=Blockly.svgSize();b+c.height>d.height&&(b-=c.height-10);Blockly.RTL?0>=a-c.width?a++:a-=c.width:a+c.width>d.width?a-=c.width:a++;Blockly.ContextMenu.svgGroup.setAttribute("transform","translate("+a+", "+b+")");Blockly.ContextMenu.visible=!0}else Blockly.ContextMenu.hide()};
Blockly.ContextMenu.optionToDom=function(a){var b=Blockly.createSvgElement("g",{"class":"blocklyMenuDiv"},null);Blockly.createSvgElement("rect",{height:Blockly.ContextMenu.Y_HEIGHT},b);var c=Blockly.createSvgElement("text",{"class":"blocklyMenuText",x:Blockly.ContextMenu.X_PADDING,y:15},b);a=document.createTextNode(a);c.appendChild(a);return b};Blockly.ContextMenu.hide=function(){Blockly.ContextMenu.visible&&(Blockly.ContextMenu.svgGroup.style.display="none",Blockly.ContextMenu.visible=!1)};Blockly.Bubble=function(a,b,c,d,e,f,g){var h=Blockly.Bubble.ARROW_ANGLE;Blockly.RTL&&(h=-h);this.arrow_radians_=2*h/360*Math.PI;this.workspace_=a;this.content_=b;this.shape_=c;a.getBubbleCanvas().appendChild(this.createDom_(b,!(!f||!g)));this.setAnchorLocation(d,e);if(!f||!g)a=this.content_.getBBox(),f=a.width+2*Blockly.Bubble.BORDER_WIDTH,g=a.height+2*Blockly.Bubble.BORDER_WIDTH;this.setBubbleSize(f,g);this.positionBubble_();this.renderArrow_();this.rendered_=!0;Blockly.bindEvent_(this.bubbleBack_,
"mousedown",this,this.bubbleMouseDown_);this.resizeGroup_&&Blockly.bindEvent_(this.resizeGroup_,"mousedown",this,this.resizeMouseDown_)};Blockly.Bubble.BORDER_WIDTH=6;Blockly.Bubble.ARROW_THICKNESS=10;Blockly.Bubble.ARROW_ANGLE=20;Blockly.Bubble.ARROW_BEND=4;Blockly.Bubble.ANCHOR_RADIUS=8;Blockly.Bubble.onMouseUpWrapper_=null;Blockly.Bubble.onMouseMoveWrapper_=null;
Blockly.Bubble.unbindDragEvents_=function(){Blockly.Bubble.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_),Blockly.Bubble.onMouseUpWrapper_=null);Blockly.Bubble.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_),Blockly.Bubble.onMouseMoveWrapper_=null)};Blockly.Bubble.prototype.rendered_=!1;Blockly.Bubble.prototype.anchorX_=0;Blockly.Bubble.prototype.anchorY_=0;Blockly.Bubble.prototype.relativeLeft_=0;Blockly.Bubble.prototype.relativeTop_=0;
Blockly.Bubble.prototype.width_=0;Blockly.Bubble.prototype.height_=0;Blockly.Bubble.prototype.autoLayout_=!0;
Blockly.Bubble.prototype.createDom_=function(a,b){this.bubbleGroup_=Blockly.createSvgElement("g",{},null);var c=Blockly.createSvgElement("g",{filter:"url(#blocklyEmboss)"},this.bubbleGroup_);this.bubbleArrow_=Blockly.createSvgElement("path",{},c);this.bubbleBack_=Blockly.createSvgElement("rect",{"class":"blocklyDraggable",x:0,y:0,rx:Blockly.Bubble.BORDER_WIDTH,ry:Blockly.Bubble.BORDER_WIDTH},c);b?(this.resizeGroup_=Blockly.createSvgElement("g",{"class":Blockly.RTL?"blocklyResizeSW":"blocklyResizeSE"},
this.bubbleGroup_),c=2*Blockly.Bubble.BORDER_WIDTH,Blockly.createSvgElement("polygon",{points:"0,x x,x x,0".replace(/x/g,c)},this.resizeGroup_),Blockly.createSvgElement("line",{"class":"blocklyResizeLine",x1:c/3,y1:c-1,x2:c-1,y2:c/3},this.resizeGroup_),Blockly.createSvgElement("line",{"class":"blocklyResizeLine",x1:2*c/3,y1:c-1,x2:c-1,y2:2*c/3},this.resizeGroup_)):this.resizeGroup_=null;this.bubbleGroup_.appendChild(a);return this.bubbleGroup_};
Blockly.Bubble.prototype.bubbleMouseDown_=function(a){this.promote_();Blockly.Bubble.unbindDragEvents_();!Blockly.isRightButton(a)&&!Blockly.isTargetInput_(a)&&(Blockly.setCursorHand_(!0),this.dragDeltaX=Blockly.RTL?this.relativeLeft_+a.clientX:this.relativeLeft_-a.clientX,this.dragDeltaY=this.relativeTop_-a.clientY,Blockly.Bubble.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.Bubble.unbindDragEvents_),Blockly.Bubble.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",
this,this.bubbleMouseMove_),Blockly.hideChaff(),a.stopPropagation())};Blockly.Bubble.prototype.bubbleMouseMove_=function(a){this.autoLayout_=!1;this.relativeLeft_=Blockly.RTL?this.dragDeltaX-a.clientX:this.dragDeltaX+a.clientX;this.relativeTop_=this.dragDeltaY+a.clientY;this.positionBubble_();this.renderArrow_()};
Blockly.Bubble.prototype.resizeMouseDown_=function(a){this.promote_();Blockly.Bubble.unbindDragEvents_();Blockly.isRightButton(a)||(Blockly.setCursorHand_(!0),this.resizeDeltaWidth=Blockly.RTL?this.width_+a.clientX:this.width_-a.clientX,this.resizeDeltaHeight=this.height_-a.clientY,Blockly.Bubble.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.Bubble.unbindDragEvents_),Blockly.Bubble.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.resizeMouseMove_),Blockly.hideChaff(),
a.stopPropagation())};Blockly.Bubble.prototype.resizeMouseMove_=function(a){this.autoLayout_=!1;var b=this.resizeDeltaWidth,c=this.resizeDeltaHeight+a.clientY,b=Blockly.RTL?b-a.clientX:b+a.clientX;this.setBubbleSize(b,c);Blockly.RTL&&this.positionBubble_()};Blockly.Bubble.prototype.registerResizeEvent=function(a,b){Blockly.bindEvent_(this.bubbleGroup_,"resize",a,b)};Blockly.Bubble.prototype.promote_=function(){this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)};
Blockly.Bubble.prototype.setAnchorLocation=function(a,b){this.anchorX_=a;this.anchorY_=b;this.rendered_&&this.positionBubble_()};
Blockly.Bubble.prototype.layoutBubble_=function(){var a=-this.width_/4,b=-this.height_-Blockly.BlockSvg.MIN_BLOCK_Y;if(this.workspace_.scrollbar){var c=this.workspace_.scrollbar.getMetrics_();this.anchorX_+a<Blockly.BlockSvg.SEP_SPACE_X+c.viewLeft?a=Blockly.BlockSvg.SEP_SPACE_X+c.viewLeft-this.anchorX_:c.viewLeft+c.viewWidth<this.anchorX_+a+this.width_+Blockly.BlockSvg.SEP_SPACE_X+Blockly.Scrollbar.scrollbarThickness&&(a=c.viewLeft+c.viewWidth-this.anchorX_-this.width_-Blockly.BlockSvg.SEP_SPACE_X-
Blockly.Scrollbar.scrollbarThickness);this.anchorY_+b<Blockly.BlockSvg.SEP_SPACE_Y+c.viewTop&&(b=this.shape_.getBBox().height)}this.relativeLeft_=a;this.relativeTop_=b};Blockly.Bubble.prototype.positionBubble_=function(){this.bubbleGroup_.setAttribute("transform","translate("+(Blockly.RTL?this.anchorX_-this.relativeLeft_-this.width_:this.anchorX_+this.relativeLeft_)+", "+(this.relativeTop_+this.anchorY_)+")")};Blockly.Bubble.prototype.getBubbleSize=function(){return{width:this.width_,height:this.height_}};
Blockly.Bubble.prototype.setBubbleSize=function(a,b){var c=2*Blockly.Bubble.BORDER_WIDTH;a=Math.max(a,c+45);b=Math.max(b,c+Blockly.BlockSvg.TITLE_HEIGHT);this.width_=a;this.height_=b;this.bubbleBack_.setAttribute("width",a);this.bubbleBack_.setAttribute("height",b);this.resizeGroup_&&(Blockly.RTL?this.resizeGroup_.setAttribute("transform","translate("+2*Blockly.Bubble.BORDER_WIDTH+", "+(b-c)+") scale(-1 1)"):this.resizeGroup_.setAttribute("transform","translate("+(a-c)+", "+(b-c)+")"));this.rendered_&&
(this.autoLayout_&&this.layoutBubble_(),this.positionBubble_(),this.renderArrow_());Blockly.fireUiEvent(this.bubbleGroup_,"resize")};
Blockly.Bubble.prototype.renderArrow_=function(){var a=[],b=this.width_/2,c=this.height_/2,d=-this.relativeLeft_,e=-this.relativeTop_;if(b==d&&c==e)a.push("M "+b+","+c);else{e-=c;d-=b;Blockly.RTL&&(d*=-1);var f=Math.sqrt(e*e+d*d),g=Math.acos(d/f);0>e&&(g=2*Math.PI-g);var h=g+Math.PI/2;h>2*Math.PI&&(h-=2*Math.PI);var i=Math.sin(h),j=Math.cos(h),k=this.getBubbleSize(),h=(k.width+k.height)/Blockly.Bubble.ARROW_THICKNESS,h=Math.min(h,k.width,k.height)/2,k=1-Blockly.Bubble.ANCHOR_RADIUS/f,d=b+k*d,e=c+
k*e,k=b+h*j,l=c+h*i,b=b-h*j,c=c-h*i,i=g+this.arrow_radians_;i>2*Math.PI&&(i-=2*Math.PI);g=Math.sin(i)*f/Blockly.Bubble.ARROW_BEND;f=Math.cos(i)*f/Blockly.Bubble.ARROW_BEND;a.push("M"+k+","+l);a.push("C"+(k+f)+","+(l+g)+" "+d+","+e+" "+d+","+e);a.push("C"+d+","+e+" "+(b+f)+","+(c+g)+" "+b+","+c)}a.push("z");this.bubbleArrow_.setAttribute("d",a.join(" "))};Blockly.Bubble.prototype.setColour=function(a){this.bubbleBack_.setAttribute("fill",a);this.bubbleArrow_.setAttribute("fill",a)};
Blockly.Bubble.prototype.dispose=function(){Blockly.Bubble.unbindDragEvents_();goog.dom.removeNode(this.bubbleGroup_);this.shape_=this.content_=this.workspace_=this.bubbleGroup_=null};Blockly.Mutator=function(a){this.block_=null;this.quarkNames_=a};Blockly.Mutator.ICON_SIZE=16;Blockly.Mutator.prototype.bubble_=null;Blockly.Mutator.prototype.iconX_=0;Blockly.Mutator.prototype.iconY_=0;Blockly.Mutator.prototype.workspaceWidth_=0;Blockly.Mutator.prototype.workspaceHeight_=0;
Blockly.Mutator.prototype.createIcon=function(){var a=Blockly.Mutator.ICON_SIZE/8;this.iconGroup_=Blockly.createSvgElement("g",{},null);this.block_.editable&&this.iconGroup_.setAttribute("class","blocklyIconGroup");Blockly.createSvgElement("rect",{"class":"blocklyIconShield",width:8*a,height:8*a,rx:2*a,ry:2*a},this.iconGroup_);if(!Blockly.Mutator.crossPath_){var b=[];b.push("M",3.5*a+","+3.5*a);b.push("v",-2*a,"h",a);b.push("v",2*a,"h",2*a);b.push("v",a,"h",-2*a);b.push("v",2*a,"h",-a);b.push("v",
-2*a,"h",-2*a);b.push("v",-a,"z");Blockly.Mutator.crossPath_=b.join(" ")}this.iconMark_=Blockly.createSvgElement("path",{"class":"blocklyIconMark",d:Blockly.Mutator.crossPath_},this.iconGroup_);this.block_.getSvgRoot().appendChild(this.iconGroup_);this.block_.editable&&Blockly.bindEvent_(this.iconGroup_,"mouseup",this,this.iconClick_)};
Blockly.Mutator.prototype.createEditor_=function(){this.svgDialog_=Blockly.createSvgElement("svg",{x:Blockly.Bubble.BORDER_WIDTH,y:Blockly.Bubble.BORDER_WIDTH},null);this.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyMutatorBackground",height:"100%",width:"100%"},this.svgDialog_);this.workspace_=new Blockly.Workspace(!0);this.flyout_=new Blockly.Flyout;this.flyout_.autoClose=!1;this.svgDialog_.appendChild(this.flyout_.createDom());this.svgDialog_.appendChild(this.workspace_.createDom());
return this.svgDialog_};
Blockly.Mutator.prototype.resizeBubble_=function(){var a=2*Blockly.Bubble.BORDER_WIDTH,b=this.workspace_.getCanvas().getBBox(),c=this.flyout_.getMetrics(),d;d=Blockly.RTL?-b.x:b.width+b.x;b=Math.max(b.height+3*a,c.contentHeight+20);d+=3*a;if(Math.abs(this.workspaceWidth_-d)>a||Math.abs(this.workspaceHeight_-b)>a)this.workspaceWidth_=d,this.workspaceHeight_=b,this.bubble_.setBubbleSize(d+a,b+a),this.svgDialog_.setAttribute("width",this.workspaceWidth_),this.svgDialog_.setAttribute("height",this.workspaceHeight_);
Blockly.RTL&&(a="translate("+this.workspaceWidth_+",0)",this.workspace_.getCanvas().setAttribute("transform",a))};Blockly.Mutator.prototype.isVisible=function(){return!!this.bubble_};
Blockly.Mutator.prototype.setVisible=function(a){if(a!=this.isVisible())if(a){this.bubble_=new Blockly.Bubble(this.block_.workspace,this.createEditor_(),this.block_.svg_.svgGroup_,this.iconX_,this.iconY_,null,null);var b=this;this.flyout_.init(this.workspace_,function(){return b.getFlyoutMetrics_()},!1);this.flyout_.show(this.quarkNames_);this.rootBlock_=this.block_.decompose(this.workspace_);a=this.rootBlock_.getDescendants();for(var c=0,d;d=a[c];c++)d.render();this.rootBlock_.editable=!1;this.rootBlock_.deletable=
!1;a=2*this.flyout_.CORNER_RADIUS;c=this.flyout_.width_+a;Blockly.RTL&&(c=-c);this.rootBlock_.moveBy(c,a);this.block_.saveConnections&&(this.block_.saveConnections(this.rootBlock_),this.sourceListener_=Blockly.bindEvent_(this.block_.workspace.getCanvas(),"blocklyWorkspaceChange",this.block_,function(){b.block_.saveConnections(b.rootBlock_)}));this.resizeBubble_();Blockly.bindEvent_(this.workspace_.getCanvas(),"blocklyWorkspaceChange",this.block_,function(){b.workspaceChanged_()});this.updateColour()}else this.svgBackground_=
this.svgDialog_=null,this.flyout_.dispose(),this.flyout_=null,this.workspace_.dispose(),this.rootBlock_=this.workspace_=null,this.bubble_.dispose(),this.bubble_=null,this.workspaceHeight_=this.workspaceWidth_=0,this.sourceListener_&&(Blockly.unbindEvent_(this.sourceListener_),this.sourceListener_=null)};
Blockly.Mutator.prototype.workspaceChanged_=function(){if(0==Blockly.Block.dragMode_)for(var a=this.workspace_.getTopBlocks(!1),b=0,c;c=a[b];b++){var d=c.getRelativeToSurfaceXY();(0>d.y||(Blockly.RTL?d.x>-this.flyout_.width_:d.x<this.flyout_.width_))&&c.dispose(!1,!1)}this.rootBlock_.workspace==this.workspace_&&(a=this.block_.rendered,this.block_.rendered=!1,this.block_.compose(this.rootBlock_),this.block_.rendered=a,this.block_.rendered&&this.block_.render(),this.resizeBubble_(),this.block_.workspace.fireChangeEvent())};
Blockly.Mutator.prototype.getFlyoutMetrics_=function(){var a=0;Blockly.RTL&&(a+=this.workspaceWidth_);return{viewHeight:this.workspaceHeight_,absoluteTop:0,absoluteLeft:a}};Blockly.Mutator.prototype.iconClick_=function(a){this.setVisible(!this.isVisible())};Blockly.Mutator.prototype.updateColour=function(){if(this.isVisible()){var a=Blockly.makeColour(this.block_.getColour());this.bubble_.setColour(a)}};
Blockly.Mutator.prototype.dispose=function(){goog.dom.removeNode(this.iconGroup_);this.iconGroup_=null;this.setVisible(!1);this.block_=this.block_.mutator=null};
Blockly.Mutator.prototype.renderIcon=function(a){if(this.block_.collapsed)return this.iconGroup_.setAttribute("display","none"),a;this.iconGroup_.setAttribute("display","block");Blockly.RTL&&(a-=Blockly.Mutator.ICON_SIZE);this.iconGroup_.setAttribute("transform","translate("+a+", 5)");this.computeIconLocation();return a=Blockly.RTL?a-Blockly.BlockSvg.SEP_SPACE_X:a+(Blockly.Mutator.ICON_SIZE+Blockly.BlockSvg.SEP_SPACE_X)};
Blockly.Mutator.prototype.setIconLocation=function(a,b){this.iconX_=a;this.iconY_=b;this.isVisible()&&this.bubble_.setAnchorLocation(a,b)};Blockly.Mutator.prototype.computeIconLocation=function(){var a=this.block_.getRelativeToSurfaceXY(),b=Blockly.getRelativeXY_(this.iconGroup_),c=a.x+b.x+Blockly.Mutator.ICON_SIZE/2,a=a.y+b.y+Blockly.Mutator.ICON_SIZE/2;(c!==this.iconX_||a!==this.iconY_)&&this.setIconLocation(c,a)};Blockly.Mutator.prototype.getIconLocation=function(){return{x:this.iconX_,y:this.iconY_}};Blockly.Connection=function(a,b){this.sourceBlock_=a;this.targetConnection=null;this.type=b;this.y_=this.x_=0;this.inDB_=!1;this.dbList_=this.sourceBlock_.workspace.connectionDBList};
Blockly.Connection.prototype.dispose=function(){if(this.targetConnection)throw"Disconnect connection before disposing of it.";this.inDB_&&this.dbList_[this.type].removeConnection_(this);this.inDB_=!1;Blockly.highlightedConnection_==this&&(Blockly.highlightedConnection_=null);Blockly.localConnection_==this&&(Blockly.localConnection_=null)};Blockly.Connection.prototype.isSuperior=function(){return this.type==Blockly.INPUT_VALUE||this.type==Blockly.NEXT_STATEMENT};
Blockly.Connection.prototype.connect=function(a){if(this.sourceBlock_==a.sourceBlock_)throw"Attempted to connect a block to itself.";if(this.sourceBlock_.workspace!==a.sourceBlock_.workspace)throw"Blocks are on different workspaces.";if(Blockly.OPPOSITE_TYPE[this.type]!=a.type)throw"Attempt to connect incompatible types.";if(this.type==Blockly.INPUT_VALUE||this.type==Blockly.OUTPUT_VALUE){if(this.targetConnection)throw"Source connection already connected (value).";if(a.targetConnection){var b=a.targetBlock();
b.setParent(null);if(!b.outputConnection)throw"Orphan block does not have an output connection.";for(var c=this.sourceBlock_;c=Blockly.Connection.singleConnection_(c,b);)if(c.targetBlock())c=c.targetBlock();else{c.connect(b.outputConnection);b=null;break}b&&window.setTimeout(function(){b.outputConnection.bumpAwayFrom_(a)},Blockly.BUMP_DELAY)}}else{if(this.targetConnection)throw"Source connection already connected (block).";if(a.targetConnection){if(this.type!=Blockly.PREVIOUS_STATEMENT)throw"Can only do a mid-stack connection with the top of a block.";
b=a.targetBlock();b.setParent(null);if(!b.previousConnection)throw"Orphan block does not have a previous connection.";for(c=this.sourceBlock_;c.nextConnection;)if(c.nextConnection.targetConnection)c=c.nextConnection.targetBlock();else{c.nextConnection.connect(b.previousConnection);b=null;break}b&&window.setTimeout(function(){b.previousConnection.bumpAwayFrom_(a)},Blockly.BUMP_DELAY)}}var d;this.isSuperior()?(c=this.sourceBlock_,d=a.sourceBlock_):(c=a.sourceBlock_,d=this.sourceBlock_);this.targetConnection=
a;a.targetConnection=this;d.setParent(c);c.rendered&&c.svg_.updateDisabled();d.rendered&&(d.svg_.updateDisabled(),d.render())};Blockly.Connection.singleConnection_=function(a,b){for(var c=!1,d=0;d<a.inputList.length;d++){var e=a.inputList[d].connection;if(e&&e.type==Blockly.INPUT_VALUE&&b.outputConnection.checkType_(e)){if(c)return null;c=e}}return c};
Blockly.Connection.prototype.disconnect=function(){var a=this.targetConnection;if(a){if(a.targetConnection!=this)throw"Target connection not connected to source connection.";}else throw"Source connection not connected.";this.targetConnection=a.targetConnection=null;var b;this.isSuperior()?(b=this.sourceBlock_,a=a.sourceBlock_):(b=a.sourceBlock_,a=this.sourceBlock_);b.rendered&&b.render();a.rendered&&(a.svg_.updateDisabled(),a.render())};
Blockly.Connection.prototype.targetBlock=function(){return this.targetConnection?this.targetConnection.sourceBlock_:null};
Blockly.Connection.prototype.bumpAwayFrom_=function(a){if(0==Blockly.Block.dragMode_){var b=this.sourceBlock_.getRootBlock(),c=!1;if(!b.editable){b=a.sourceBlock_.getRootBlock();if(!b.editable)return;a=this;c=!0}b.getSvgRoot().parentNode.appendChild(b.getSvgRoot());var d=a.x_+Blockly.SNAP_RADIUS-this.x_;a=a.y_+2*Blockly.SNAP_RADIUS-this.y_;c&&(a=-a);Blockly.RTL&&(d=-d);b.moveBy(d,a)}};
Blockly.Connection.prototype.moveTo=function(a,b){this.inDB_&&this.dbList_[this.type].removeConnection_(this);this.x_=a;this.y_=b;this.dbList_[this.type].addConnection_(this)};Blockly.Connection.prototype.moveBy=function(a,b){this.moveTo(this.x_+a,this.y_+b)};
Blockly.Connection.prototype.highlight=function(){var a;this.type==Blockly.INPUT_VALUE||this.type==Blockly.OUTPUT_VALUE?(a=Blockly.RTL?-Blockly.BlockSvg.TAB_WIDTH:Blockly.BlockSvg.TAB_WIDTH,a="m 0,0 v 5 c 0,10 "+-a+",-8 "+-a+",7.5 s "+a+",-2.5 "+a+",7.5 v 5"):a=Blockly.RTL?"m 20,0 h -5 l -6,4 -3,0 -6,-4 h -5":"m -20,0 h 5 l 6,4 3,0 6,-4 h 5";var b=this.sourceBlock_.getRelativeToSurfaceXY();Blockly.Connection.highlightedPath_=Blockly.createSvgElement("path",{"class":"blocklyHighlightedConnectionPath",
d:a,transform:"translate("+(this.x_-b.x)+", "+(this.y_-b.y)+")"},this.sourceBlock_.getSvgRoot())};Blockly.Connection.prototype.unhighlight=function(){goog.dom.removeNode(Blockly.Connection.highlightedPath_);delete Blockly.Connection.highlightedPath_};
Blockly.Connection.prototype.tighten_=function(){var a=Math.round(this.targetConnection.x_-this.x_),b=Math.round(this.targetConnection.y_-this.y_);if(0!=a||0!=b){var c=this.targetBlock(),d=c.getSvgRoot();if(!d)throw"block is not rendered.";d=Blockly.getRelativeXY_(d);c.getSvgRoot().setAttribute("transform","translate("+(d.x-a)+", "+(d.y-b)+")");c.moveConnections_(-a,-b)}};
Blockly.Connection.prototype.closest=function(a,b,c){function d(b){var c=e[b];if((c.type==Blockly.OUTPUT_VALUE||c.type==Blockly.PREVIOUS_STATEMENT)&&c.targetConnection||!k.checkType_(c))return!0;c=c.sourceBlock_;do{if(j==c)return!0;c=c.getParent()}while(c);var d=f-e[b].x_,c=g-e[b].y_,d=Math.sqrt(d*d+c*c);d<=a&&(i=e[b],a=d);return c<a}if(this.targetConnection)return{connection:null,radius:a};var e=this.dbList_[Blockly.OPPOSITE_TYPE[this.type]],f=this.x_+b,g=this.y_+c;b=0;for(var h=c=e.length-2;b<h;)e[h].y_<
g?b=h:c=h,h=Math.floor((b+c)/2);c=b=h;var i=null,j=this.sourceBlock_,k=this;if(e.length){for(;0<=b&&d(b);)b--;do c++;while(c<e.length&&d(c))}return{connection:i,radius:a}};Blockly.Connection.prototype.checkType_=function(a){if(!this.check_||!a.check_)return!0;for(var b=0;b<this.check_.length;b++)if(-1!=a.check_.indexOf(this.check_[b]))return!0;return!1};
Blockly.Connection.prototype.setCheck=function(a){a?(a instanceof Array||(a=[a]),this.check_=a,this.targetConnection&&!this.checkType_(this.targetConnection)&&(this.isSuperior()?this.targetBlock().setParent(null):this.sourceBlock_.setParent(null),this.sourceBlock_.bumpNeighbours_())):this.check_=null;return this};
Blockly.Connection.prototype.neighbours_=function(a){function b(b){var f=d-c[b].x_,g=e-c[b].y_;Math.sqrt(f*f+g*g)<=a&&i.push(c[b]);return g<a}for(var c=this.dbList_[Blockly.OPPOSITE_TYPE[this.type]],d=this.x_,e=this.y_,f=0,g=c.length-2,h=g;f<h;)c[h].y_<e?f=h:g=h,h=Math.floor((f+g)/2);var g=f=h,i=[];if(c.length){for(;0<=f&&b(f);)f--;do g++;while(g<c.length&&b(g))}return i};
Blockly.Connection.prototype.hideAll=function(){this.inDB_&&this.dbList_[this.type].removeConnection_(this);if(this.targetConnection)for(var a=this.targetBlock().getDescendants(),b=0;b<a.length;b++){for(var c=a[b],d=c.getConnections_(!0),e=0;e<d.length;e++){var f=d[e];f.inDB_&&this.dbList_[f.type].removeConnection_(f)}c.comment&&c.comment.setVisible_(!1)}};
Blockly.Connection.prototype.unhideAll=function(){this.inDB_||this.dbList_[this.type].addConnection_(this);var a=[];if(this.type!=Blockly.INPUT_VALUE&&this.type!=Blockly.NEXT_STATEMENT)return a;var b=this.targetBlock();if(b){var c;b.collapsed?(c=[],b.outputConnection&&c.push(b.outputConnection),b.nextConnection&&c.push(b.nextConnection),b.previousConnection&&c.push(b.previousConnection)):c=b.getConnections_(!0);for(var d=0;d<c.length;d++)a=a.concat(c[d].unhideAll());0==a.length&&(a[0]=b);b.comment&&
b.comment.isPinned()&&b.comment.setVisible_(!0)}return a};Blockly.ConnectionDB=function(){};Blockly.ConnectionDB.prototype=[];Blockly.ConnectionDB.constructor=Blockly.ConnectionDB;Blockly.ConnectionDB.prototype.addConnection_=function(a){if(a.inDB_)throw"Connection already in database.";for(var b=0,c=this.length;b<c;){var d=Math.floor((b+c)/2);if(this[d].y_<a.y_)b=d+1;else if(this[d].y_>a.y_)c=d;else{b=d;break}}this.splice(b,0,a);a.inDB_=!0};
Blockly.ConnectionDB.prototype.removeConnection_=function(a){if(!a.inDB_)throw"Connection not in database.";a.inDB_=!1;for(var b=0,c=this.length-2,d=c;b<d;)this[d].y_<a.y_?b=d:c=d,d=Math.floor((b+c)/2);for(c=b=d;0<=b&&this[b].y_==a.y_;){if(this[b]==a){this.splice(b,1);return}b--}do{if(this[c]==a){this.splice(c,1);return}c++}while(c<this.length&&this[c].y_==a.y_);throw"Unable to find connection in connectionDB.";};
Blockly.ConnectionDB.init=function(a){var b=[];b[Blockly.INPUT_VALUE]=new Blockly.ConnectionDB;b[Blockly.OUTPUT_VALUE]=new Blockly.ConnectionDB;b[Blockly.NEXT_STATEMENT]=new Blockly.ConnectionDB;b[Blockly.PREVIOUS_STATEMENT]=new Blockly.ConnectionDB;a.connectionDBList=b};Blockly.Comment=function(a){this.block_=a;this.createIcon_()};Blockly.Comment.ICON_RADIUS=8;Blockly.Comment.prototype.bubble_=null;Blockly.Comment.prototype.text_="";Blockly.Comment.prototype.iconX_=0;Blockly.Comment.prototype.iconY_=0;Blockly.Comment.prototype.width_=160;Blockly.Comment.prototype.height_=80;
Blockly.Comment.prototype.createIcon_=function(){this.iconGroup_=Blockly.createSvgElement("g",{"class":"blocklyIconGroup"},null);Blockly.createSvgElement("circle",{"class":"blocklyIconShield",r:Blockly.Comment.ICON_RADIUS,cx:Blockly.Comment.ICON_RADIUS,cy:Blockly.Comment.ICON_RADIUS},this.iconGroup_);this.iconMark_=Blockly.createSvgElement("text",{"class":"blocklyIconMark",x:Blockly.Comment.ICON_RADIUS,y:2*Blockly.Comment.ICON_RADIUS-3},this.iconGroup_);this.iconMark_.appendChild(document.createTextNode("?"));
this.block_.getSvgRoot().appendChild(this.iconGroup_);Blockly.bindEvent_(this.iconGroup_,"mouseup",this,this.iconClick_)};
Blockly.Comment.prototype.createEditor_=function(){this.foreignObject_=Blockly.createSvgElement("foreignObject",{x:Blockly.Bubble.BORDER_WIDTH,y:Blockly.Bubble.BORDER_WIDTH},null);var a=document.createElementNS(Blockly.HTML_NS,"body");a.setAttribute("xmlns",Blockly.HTML_NS);a.className="blocklyMinimalBody";this.textarea_=document.createElementNS(Blockly.HTML_NS,"textarea");this.textarea_.className="blocklyCommentTextarea";this.textarea_.setAttribute("dir",Blockly.RTL?"RTL":"LTR");a.appendChild(this.textarea_);
this.foreignObject_.appendChild(a);Blockly.bindEvent_(this.textarea_,"mouseup",this,this.textareaFocus_);return this.foreignObject_};Blockly.Comment.prototype.resizeBubble_=function(){var a=this.bubble_.getBubbleSize(),b=2*Blockly.Bubble.BORDER_WIDTH;this.foreignObject_.setAttribute("width",a.width-b);this.foreignObject_.setAttribute("height",a.height-b);this.textarea_.style.width=a.width-b-4+"px";this.textarea_.style.height=a.height-b-4+"px"};Blockly.Comment.prototype.isVisible=function(){return!!this.bubble_};
Blockly.Comment.prototype.setVisible=function(a){if(a!=this.isVisible()){var b=this.getText(),c=this.getBubbleSize();a?(this.bubble_=new Blockly.Bubble(this.block_.workspace,this.createEditor_(),this.block_.svg_.svgGroup_,this.iconX_,this.iconY_,this.width_,this.height_),this.bubble_.registerResizeEvent(this,this.resizeBubble_),this.updateColour(),this.text_=null):(this.bubble_.dispose(),this.foreignObject_=this.textarea_=this.bubble_=null);this.setText(b);this.setBubbleSize(c.width,c.height)}};
Blockly.Comment.prototype.iconClick_=function(a){this.setVisible(!this.isVisible())};Blockly.Comment.prototype.textareaFocus_=function(a){this.bubble_.promote_();this.textarea_.focus()};Blockly.Comment.prototype.getBubbleSize=function(){return this.isVisible()?this.bubble_.getBubbleSize():{width:this.width_,height:this.height_}};Blockly.Comment.prototype.setBubbleSize=function(a,b){this.isVisible()?this.bubble_.setBubbleSize(a,b):(this.width_=a,this.height_=b)};
Blockly.Comment.prototype.getText=function(){return this.isVisible()?this.textarea_.value:this.text_};Blockly.Comment.prototype.setText=function(a){this.isVisible()?this.textarea_.value=a:this.text_=a};Blockly.Comment.prototype.updateColour=function(){if(this.isVisible()){var a=Blockly.makeColour(this.block_.getColour());this.bubble_.setColour(a)}};
Blockly.Comment.prototype.dispose=function(){goog.dom.removeNode(this.iconGroup_);this.iconGroup_=null;this.setVisible(!1);this.block_=this.block_.comment=null};
Blockly.Comment.prototype.renderIcon=function(a){if(this.block_.collapsed)return this.iconGroup_.setAttribute("display","none"),a;this.iconGroup_.setAttribute("display","block");var b=2*Blockly.Comment.ICON_RADIUS;Blockly.RTL&&(a-=b);this.iconGroup_.setAttribute("transform","translate("+a+", 5)");this.computeIconLocation();return a=Blockly.RTL?a-Blockly.BlockSvg.SEP_SPACE_X:a+(b+Blockly.BlockSvg.SEP_SPACE_X)};
Blockly.Comment.prototype.setIconLocation=function(a,b){this.iconX_=a;this.iconY_=b;this.isVisible()&&this.bubble_.setAnchorLocation(a,b)};Blockly.Comment.prototype.computeIconLocation=function(){var a=this.block_.getRelativeToSurfaceXY(),b=Blockly.getRelativeXY_(this.iconGroup_),c=a.x+b.x+Blockly.Comment.ICON_RADIUS,a=a.y+b.y+Blockly.Comment.ICON_RADIUS;(c!==this.iconX_||a!==this.iconY_)&&this.setIconLocation(c,a)};Blockly.Comment.prototype.getIconLocation=function(){return{x:this.iconX_,y:this.iconY_}};Blockly.Tooltip={};Blockly.Tooltip.visible=!1;Blockly.Tooltip.mouseOutPid_=0;Blockly.Tooltip.showPid_=0;Blockly.Tooltip.lastX_=0;Blockly.Tooltip.lastY_=0;Blockly.Tooltip.element_=null;Blockly.Tooltip.poisonedElement_=null;Blockly.Tooltip.svgGroup_=null;Blockly.Tooltip.svgText_=null;Blockly.Tooltip.svgBackground_=null;Blockly.Tooltip.svgShadow_=null;Blockly.Tooltip.OFFSET_X=0;Blockly.Tooltip.OFFSET_Y=10;Blockly.Tooltip.RADIUS_OK=10;Blockly.Tooltip.HOVER_MS=1E3;Blockly.Tooltip.MARGINS=5;
Blockly.Tooltip.createDom=function(){var a=Blockly.createSvgElement("g",{"class":"blocklyHidden"},null);Blockly.Tooltip.svgGroup_=a;Blockly.Tooltip.svgShadow_=Blockly.createSvgElement("rect",{"class":"blocklyTooltipShadow",x:2,y:2},a);Blockly.Tooltip.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyTooltipBackground"},a);Blockly.Tooltip.svgText_=Blockly.createSvgElement("text",{"class":"blocklyTooltipText"},a);return a};
Blockly.Tooltip.bindMouseEvents=function(a){Blockly.bindEvent_(a,"mouseover",null,Blockly.Tooltip.onMouseOver_);Blockly.bindEvent_(a,"mouseout",null,Blockly.Tooltip.onMouseOut_);Blockly.bindEvent_(a,"mousemove",null,Blockly.Tooltip.onMouseMove_)};Blockly.Tooltip.onMouseOver_=function(a){for(a=a.target;!goog.isString(a.tooltip)&&!goog.isFunction(a.tooltip);)a=a.tooltip;Blockly.Tooltip.element_!=a&&(Blockly.Tooltip.hide(),Blockly.Tooltip.poisonedElement_=null,Blockly.Tooltip.element_=a);window.clearTimeout(Blockly.Tooltip.mouseOutPid_)};
Blockly.Tooltip.onMouseOut_=function(a){Blockly.Tooltip.mouseOutPid_=window.setTimeout(function(){Blockly.Tooltip.element_=null;Blockly.Tooltip.poisonedElement_=null;Blockly.Tooltip.hide()},1);window.clearTimeout(Blockly.Tooltip.showPid_)};
Blockly.Tooltip.onMouseMove_=function(a){if(Blockly.Tooltip.element_&&Blockly.Tooltip.element_.tooltip&&!(Blockly.ContextMenu&&Blockly.ContextMenu.visible||0!=Blockly.Block.dragMode_))if(Blockly.Tooltip.visible){var b=Blockly.Tooltip.lastY_-a.clientY;Math.sqrt(Math.pow(Blockly.Tooltip.lastX_-a.clientX,2)+Math.pow(b,2))>Blockly.Tooltip.RADIUS_OK&&Blockly.Tooltip.hide()}else Blockly.Tooltip.poisonedElement_!=Blockly.Tooltip.element_&&(window.clearTimeout(Blockly.Tooltip.showPid_),Blockly.Tooltip.lastX_=
a.clientX,Blockly.Tooltip.lastY_=a.clientY,Blockly.Tooltip.showPid_=window.setTimeout(Blockly.Tooltip.show_,Blockly.Tooltip.HOVER_MS))};Blockly.Tooltip.hide=function(){Blockly.Tooltip.visible&&(Blockly.Tooltip.visible=!1,Blockly.Tooltip.svgGroup_&&(Blockly.Tooltip.svgGroup_.style.display="none"));window.clearTimeout(Blockly.Tooltip.showPid_)};
Blockly.Tooltip.show_=function(){Blockly.Tooltip.poisonedElement_=Blockly.Tooltip.element_;if(Blockly.Tooltip.svgGroup_){goog.dom.removeChildren(Blockly.Tooltip.svgText_);var a=Blockly.Tooltip.element_.tooltip;goog.isFunction(a)&&(a=a());for(var a=a.split("\n"),b=0;b<a.length;b++){var c=Blockly.createSvgElement("tspan",{dy:"1em",x:Blockly.Tooltip.MARGINS},Blockly.Tooltip.svgText_),d=document.createTextNode(a[b]);c.appendChild(d)}Blockly.Tooltip.visible=!0;Blockly.Tooltip.svgGroup_.style.display="block";
a=Blockly.Tooltip.svgText_.getBBox();b=2*Blockly.Tooltip.MARGINS+a.width;c=a.height;Blockly.Tooltip.svgBackground_.setAttribute("width",b);Blockly.Tooltip.svgBackground_.setAttribute("height",c);Blockly.Tooltip.svgShadow_.setAttribute("width",b);Blockly.Tooltip.svgShadow_.setAttribute("height",c);if(Blockly.RTL)for(var c=a.width,d=0,e;e=Blockly.Tooltip.svgText_.childNodes[d];d++)e.setAttribute("text-anchor","end"),e.setAttribute("x",c+Blockly.Tooltip.MARGINS);c=Blockly.Tooltip.lastX_;c=Blockly.RTL?
c-(Blockly.Tooltip.OFFSET_X+b):c+Blockly.Tooltip.OFFSET_X;b=Blockly.Tooltip.lastY_+Blockly.Tooltip.OFFSET_Y;b=Blockly.convertCoordinates(c,b,!0);c=b.x;b=b.y;d=Blockly.svgSize();b+a.height>d.height&&(b-=a.height+2*Blockly.Tooltip.OFFSET_Y);Blockly.RTL?c=Math.max(Blockly.Tooltip.MARGINS,c):c+a.width>d.width-2*Blockly.Tooltip.MARGINS&&(c=d.width-a.width-2*Blockly.Tooltip.MARGINS);Blockly.Tooltip.svgGroup_.setAttribute("transform","translate("+c+","+b+")")}};Blockly.FieldLabel=function(a){this.sourceBlock_=null;this.textElement_=Blockly.createSvgElement("text",{"class":"blocklyText"},null);this.size_={height:25,width:0};this.setText(a)};goog.inherits(Blockly.FieldLabel,Blockly.Field);Blockly.FieldLabel.prototype.EDITABLE=!1;
Blockly.FieldLabel.prototype.init=function(a){if(this.sourceBlock_)throw"Text has already been initialized once.";this.sourceBlock_=a;a.getSvgRoot().appendChild(this.textElement_);this.textElement_.tooltip=this.sourceBlock_;Blockly.Tooltip&&Blockly.Tooltip.bindMouseEvents(this.textElement_)};Blockly.FieldLabel.prototype.dispose=function(){goog.dom.removeNode(this.textElement_);this.textElement_=null};Blockly.FieldLabel.prototype.getRootElement=function(){return this.textElement_};
Blockly.FieldLabel.prototype.setTooltip=function(a){this.textElement_.tooltip=a};Blockly.Input=function(a,b,c,d){this.type=a;this.name=b;this.sourceBlock_=c;this.connection=d;this.titleRow=[];this.align=Blockly.ALIGN_LEFT};Blockly.Input.prototype.appendTitle=function(a,b){if(!goog.isDefAndNotNull(a))return this;goog.isString(a)&&(a=new Blockly.FieldLabel(a));this.sourceBlock_.svg_&&a.init(this.sourceBlock_);a.name=b;this.titleRow.push(a);this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_());return this};
Blockly.Input.prototype.setCheck=function(a){if(!this.connection)throw"This input does not have a connection.";this.connection.setCheck(a);return this};Blockly.Input.prototype.setAlign=function(a){this.align=a;this.sourceBlock_.rendered&&this.sourceBlock_.render();return this};Blockly.Input.prototype.init=function(){for(var a=0;a<this.titleRow.length;a++)this.titleRow[a].init(this.sourceBlock_)};
Blockly.Input.prototype.dispose=function(){for(var a=0,b;b=this.titleRow[a];a++)b.dispose();this.connection&&this.connection.dispose();this.sourceBlock_=null};Blockly.Warning=function(a){this.block_=a;this.createIcon_()};Blockly.Warning.ICON_RADIUS=8;Blockly.Warning.prototype.bubble_=null;Blockly.Warning.prototype.text_="";Blockly.Warning.prototype.iconX_=0;Blockly.Warning.prototype.iconY_=0;
Blockly.Warning.prototype.createIcon_=function(){this.iconGroup_=Blockly.createSvgElement("g",{"class":"blocklyIconGroup"},null);Blockly.createSvgElement("path",{"class":"blocklyIconShield",d:"M 2,15 Q -1,15 0.5,12 L 6.5,1.7 Q 8,-1 9.5,1.7 L 15.5,12 Q 17,15 14,15 z"},this.iconGroup_);this.iconMark_=Blockly.createSvgElement("text",{"class":"blocklyIconMark",x:Blockly.Warning.ICON_RADIUS,y:2*Blockly.Warning.ICON_RADIUS-3},this.iconGroup_);this.iconMark_.appendChild(document.createTextNode("!"));this.block_.getSvgRoot().appendChild(this.iconGroup_);
Blockly.bindEvent_(this.iconGroup_,"mouseup",this,this.iconClick_)};Blockly.Warning.prototype.textToDom_=function(a){var b=Blockly.createSvgElement("text",{"class":"blocklyText",y:Blockly.Bubble.BORDER_WIDTH},null);a=a.split("\n");for(var c=0;c<a.length;c++){var d=Blockly.createSvgElement("tspan",{dy:"1em",x:Blockly.Bubble.BORDER_WIDTH},b),e=document.createTextNode(a[c]);d.appendChild(e)}return b};Blockly.Warning.prototype.isVisible=function(){return!!this.bubble_};
Blockly.Warning.prototype.setVisible=function(a){if(a!=this.isVisible())if(a){a=this.textToDom_(this.text_);this.bubble_=new Blockly.Bubble(this.block_.workspace,a,this.block_.svg_.svgGroup_,this.iconX_,this.iconY_,null,null);if(Blockly.RTL)for(var b=a.getBBox().width,c=0,d;d=a.childNodes[c];c++)d.setAttribute("text-anchor","end"),d.setAttribute("x",b+Blockly.Bubble.BORDER_WIDTH);this.updateColour();a=this.bubble_.getBubbleSize();this.bubble_.setBubbleSize(a.width,a.height)}else this.bubble_.dispose(),
this.foreignObject_=this.body_=this.bubble_=null};Blockly.Warning.prototype.iconClick_=function(a){this.setVisible(!this.isVisible())};Blockly.Warning.prototype.bodyFocus_=function(a){this.bubble_.promote_()};Blockly.Warning.prototype.setText=function(a){this.text_=a;this.isVisible()&&(this.setVisible(!1),this.setVisible(!0))};Blockly.Warning.prototype.updateColour=function(){if(this.isVisible()){var a=Blockly.makeColour(this.block_.getColour());this.bubble_.setColour(a)}};
Blockly.Warning.prototype.dispose=function(){goog.dom.removeNode(this.iconGroup_);this.iconGroup_=null;this.setVisible(!1);this.block_=this.block_.warning=null};
Blockly.Warning.prototype.renderIcon=function(a){if(this.block_.collapsed)return this.iconGroup_.setAttribute("display","none"),a;this.iconGroup_.setAttribute("display","block");var b=2*Blockly.Warning.ICON_RADIUS;Blockly.RTL&&(a-=b);this.iconGroup_.setAttribute("transform","translate("+a+", 5)");this.computeIconLocation();return a=Blockly.RTL?a-Blockly.BlockSvg.SEP_SPACE_X:a+(b+Blockly.BlockSvg.SEP_SPACE_X)};
Blockly.Warning.prototype.setIconLocation=function(a,b){this.iconX_=a;this.iconY_=b;this.isVisible()&&this.bubble_.setAnchorLocation(a,b)};Blockly.Warning.prototype.computeIconLocation=function(){var a=this.block_.getRelativeToSurfaceXY(),b=Blockly.getRelativeXY_(this.iconGroup_),c=a.x+b.x+Blockly.Warning.ICON_RADIUS,a=a.y+b.y+Blockly.Warning.ICON_RADIUS;(c!==this.iconX_||a!==this.iconY_)&&this.setIconLocation(c,a)};Blockly.Warning.prototype.getIconLocation=function(){return{x:this.iconX_,y:this.iconY_}};Blockly.uidCounter_=0;
Blockly.Block=function(a,b){this.id=++Blockly.uidCounter_;this.previousConnection=this.nextConnection=this.outputConnection=null;this.inputList=[];this.disabled=this.collapsed=this.rendered=this.inputsInline=!1;this.deletable=this.editable=a.editable;this.tooltip="";this.contextMenu=!0;this.parentBlock_=null;this.childBlocks_=[];this.isInFlyout=!1;this.workspace=a;a.addTopBlock(this);if(b){this.type=b;var c=Blockly.Language[b];if(!c)throw'Error: "'+b+'" is an unknown language block.';goog.mixin(this,
c)}goog.isFunction(this.init)&&this.init();this.editable&&goog.isFunction(this.onchange)&&Blockly.bindEvent_(a.getCanvas(),"blocklyWorkspaceChange",this,this.onchange)};Blockly.Block.prototype.svg_=null;Blockly.Block.prototype.mutator=null;Blockly.Block.prototype.comment=null;Blockly.Block.prototype.warning=null;Blockly.Block.prototype.initSvg=function(){this.svg_=new Blockly.BlockSvg(this);this.svg_.init();Blockly.bindEvent_(this.svg_.getRootElement(),"mousedown",this,this.onMouseDown_);this.workspace.getCanvas().appendChild(this.svg_.getRootElement())};
Blockly.Block.prototype.getSvgRoot=function(){return this.svg_&&this.svg_.getRootElement()};Blockly.Block.dragMode_=0;Blockly.Block.onMouseUpWrapper_=null;Blockly.Block.onMouseMoveWrapper_=null;
Blockly.Block.terminateDrag_=function(){Blockly.Block.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Block.onMouseUpWrapper_),Blockly.Block.onMouseUpWrapper_=null);Blockly.Block.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Block.onMouseMoveWrapper_),Blockly.Block.onMouseMoveWrapper_=null);if(2==Blockly.Block.dragMode_&&Blockly.selected){var a=Blockly.selected,b=a.getRelativeToSurfaceXY();a.moveConnections_(b.x-a.startDragX,b.y-a.startDragY);delete a.draggedBubbles_;a.setDragging_(!1);a.render();
window.setTimeout(function(){a.bumpNeighbours_()},Blockly.BUMP_DELAY);Blockly.fireUiEvent(window,"resize");a.workspace.fireChangeEvent()}Blockly.Block.dragMode_=0};Blockly.Block.prototype.select=function(){Blockly.selected&&Blockly.selected.unselect();Blockly.selected=this;this.svg_.addSelect();Blockly.fireUiEvent(this.workspace.getCanvas(),"blocklySelectChange")};
Blockly.Block.prototype.unselect=function(){Blockly.selected=null;this.svg_.removeSelect();Blockly.fireUiEvent(this.workspace.getCanvas(),"blocklySelectChange")};
Blockly.Block.prototype.dispose=function(a,b){this.unplug(a);b&&this.svg_&&this.svg_.disposeUiEffect();this.workspace.removeTopBlock(this);this.workspace=null;this.rendered=!1;Blockly.selected==this&&(Blockly.selected=null,Blockly.Block.terminateDrag_());for(var c=this.childBlocks_.length-1;0<=c;c--)this.childBlocks_[c].dispose(!1);this.mutator&&this.mutator.dispose();this.comment&&this.comment.dispose();this.warning&&this.warning.dispose();for(var c=0,d;d=this.inputList[c];c++)d.dispose();this.inputList=
[];d=this.getConnections_(!0);for(c=0;c<d.length;c++){var e=d[c];e.targetConnection&&e.disconnect();d[c].dispose()}this.svg_&&(this.svg_.dispose(),this.svg_=null)};
Blockly.Block.prototype.unplug=function(a,b){b=b&&!!this.getParent();if(this.outputConnection)this.outputConnection.targetConnection&&this.setParent(null);else{var c=null;this.previousConnection&&this.previousConnection.targetConnection&&(c=this.previousConnection.targetConnection,this.setParent(null));if(a&&this.nextConnection&&this.nextConnection.targetConnection){var d=this.nextConnection.targetConnection,e=this.nextConnection.targetBlock();this.nextConnection.disconnect();e.setParent(null);c&&
c.connect(d)}}b&&this.moveBy(Blockly.SNAP_RADIUS*(Blockly.RTL?-1:1),2*Blockly.SNAP_RADIUS)};Blockly.Block.prototype.getRelativeToSurfaceXY=function(){var a=0,b=0;if(this.svg_){var c=this.svg_.getRootElement();do var d=Blockly.getRelativeXY_(c),a=a+d.x,b=b+d.y,c=c.parentNode;while(c&&c!=this.workspace.getCanvas())}return{x:a,y:b}};
Blockly.Block.prototype.moveBy=function(a,b){var c=this.getRelativeToSurfaceXY();this.svg_.getRootElement().setAttribute("transform","translate("+(c.x+a)+", "+(c.y+b)+")");this.moveConnections_(a,b)};
Blockly.Block.prototype.onMouseDown_=function(a){Blockly.svgResize();Blockly.Block.terminateDrag_();this.select();Blockly.hideChaff(this.isInFlyout);if(Blockly.isRightButton(a))Blockly.ContextMenu&&this.showContextMenu_(a.clientX,a.clientY);else if(this.editable){Blockly.removeAllRanges();Blockly.setCursorHand_(!0);var b=this.getRelativeToSurfaceXY();this.startDragX=b.x;this.startDragY=b.y;this.startDragMouseX=a.clientX;this.startDragMouseY=a.clientY;Blockly.Block.dragMode_=1;Blockly.Block.onMouseUpWrapper_=
Blockly.bindEvent_(document,"mouseup",this,this.onMouseUp_);Blockly.Block.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.onMouseMove_);this.draggedBubbles_=[];for(var b=this.getDescendants(),c=0,d;d=b[c];c++){if(d.mutator){var e=d.mutator.getIconLocation();e.bubble=d.mutator;this.draggedBubbles_.push(e)}d.comment&&(e=d.comment.getIconLocation(),e.bubble=d.comment,this.draggedBubbles_.push(e));d.warning&&(e=d.warning.getIconLocation(),e.bubble=d.warning,this.draggedBubbles_.push(e))}}else return;
a.stopPropagation()};
Blockly.Block.prototype.onMouseUp_=function(a){Blockly.Block.terminateDrag_();if(Blockly.selected&&Blockly.highlightedConnection_)Blockly.localConnection_.connect(Blockly.highlightedConnection_),this.svg_&&(Blockly.localConnection_.isSuperior()?Blockly.highlightedConnection_:Blockly.localConnection_).sourceBlock_.svg_.connectionUiEffect(),this.workspace.trashcan&&this.workspace.trashcan.isOpen&&Blockly.Trashcan.close(this.workspace.trashcan);else if(this.workspace.trashcan&&this.workspace.trashcan.isOpen){var b=this.workspace.trashcan;
window.setTimeout(function(){Blockly.Trashcan.close(b)},100);Blockly.selected.dispose(!1,!0);Blockly.fireUiEvent(window,"resize")}Blockly.highlightedConnection_&&(Blockly.highlightedConnection_.unhighlight(),Blockly.highlightedConnection_=null)};Blockly.Block.prototype.showHelp_=function(){var a=goog.isFunction(this.helpUrl)?this.helpUrl():this.helpUrl;a&&window.open(a)};
Blockly.Block.prototype.duplicate_=function(){var a=Blockly.Xml.blockToDom_(this);Blockly.Xml.deleteNext(a);var a=Blockly.Xml.domToBlock_(this.workspace,a),b=this.getRelativeToSurfaceXY();b.x=Blockly.RTL?b.x-Blockly.SNAP_RADIUS:b.x+Blockly.SNAP_RADIUS;b.y+=2*Blockly.SNAP_RADIUS;a.moveBy(b.x,b.y);return a};
Blockly.Block.prototype.showContextMenu_=function(a,b){if(this.contextMenu){var c=this,d=[];if(this.deletable){d.push({text:Blockly.MSG_DUPLICATE_BLOCK,enabled:!0,callback:function(){c.duplicate_()}});if(Blockly.Comment&&!this.collapsed){var e={enabled:!0};this.comment?(e.text=Blockly.MSG_REMOVE_COMMENT,e.callback=function(){c.setCommentText(null)}):(e.text=Blockly.MSG_ADD_COMMENT,e.callback=function(){c.setCommentText("")});d.push(e)}if(!this.collapsed)for(e=0;e<this.inputList.length;e++)if(this.inputList[e].type==
Blockly.INPUT_VALUE){e={enabled:!0};e.text=this.inputsInline?Blockly.MSG_EXTERNAL_INPUTS:Blockly.MSG_INLINE_INPUTS;e.callback=function(){c.setInputsInline(!c.inputsInline)};d.push(e);break}this.collapsed?(e={enabled:!0},e.text=Blockly.MSG_EXPAND_BLOCK,e.callback=function(){c.setCollapsed(!1)}):(e={enabled:!0},e.text=Blockly.MSG_COLLAPSE_BLOCK,e.callback=function(){c.setCollapsed(!0)});d.push(e);e={text:this.disabled?Blockly.MSG_ENABLE_BLOCK:Blockly.MSG_DISABLE_BLOCK,enabled:!this.getInheritedDisabled(),
callback:function(){c.setDisabled(!c.disabled)}};d.push(e);e=this.getDescendants().length;c.nextConnection&&c.nextConnection.targetConnection&&(e-=this.nextConnection.targetBlock().getDescendants().length);e={text:1==e?Blockly.MSG_DELETE_BLOCK:Blockly.MSG_DELETE_X_BLOCKS.replace("%1",e),enabled:!0,callback:function(){c.dispose(!0,!0)}};d.push(e)}e={enabled:!!(goog.isFunction(this.helpUrl)?this.helpUrl():this.helpUrl)};e.text=Blockly.MSG_HELP;e.callback=function(){c.showHelp_()};d.push(e);this.customContextMenu&&
this.customContextMenu(d);Blockly.ContextMenu.show(a,b,d)}};Blockly.Block.prototype.getConnections_=function(a){var b=[];if(a||this.rendered)if(this.outputConnection&&b.push(this.outputConnection),this.nextConnection&&b.push(this.nextConnection),this.previousConnection&&b.push(this.previousConnection),a||!this.collapsed){a=0;for(var c;c=this.inputList[a];a++)c.connection&&b.push(c.connection)}return b};
Blockly.Block.prototype.moveConnections_=function(a,b){if(this.rendered){for(var c=this.getConnections_(!1),d=0;d<c.length;d++)c[d].moveBy(a,b);this.mutator&&this.mutator.computeIconLocation();this.comment&&this.comment.computeIconLocation();this.warning&&this.warning.computeIconLocation();for(d=0;d<this.childBlocks_.length;d++)this.childBlocks_[d].moveConnections_(a,b)}};Blockly.Block.prototype.setDragging_=function(a){a?this.svg_.addDragging():this.svg_.removeDragging();for(var b=0;b<this.childBlocks_.length;b++)this.childBlocks_[b].setDragging_(a)};
Blockly.Block.prototype.onMouseMove_=function(a){if(!("mousemove"==a.type&&1==a.x&&0==a.y&&0==a.button)){Blockly.removeAllRanges();var b=a.clientX-this.startDragMouseX,c=a.clientY-this.startDragMouseY;1==Blockly.Block.dragMode_&&Math.sqrt(Math.pow(b,2)+Math.pow(c,2))>Blockly.DRAG_RADIUS&&(Blockly.Block.dragMode_=2,this.setParent(null),this.setDragging_(!0));if(2==Blockly.Block.dragMode_){var d=this.startDragX+b,e=this.startDragY+c;this.svg_.getRootElement().setAttribute("transform","translate("+d+
", "+e+")");for(d=0;d<this.draggedBubbles_.length;d++)e=this.draggedBubbles_[d],e.bubble.setIconLocation(e.x+b,e.y+c);for(var e=this.getConnections_(!1),f=null,g=null,h=Blockly.SNAP_RADIUS,d=0;d<e.length;d++){var i=e[d],j=i.closest(h,b,c);j.connection&&(f=j.connection,g=i,h=j.radius)}Blockly.highlightedConnection_&&Blockly.highlightedConnection_!=f&&(Blockly.highlightedConnection_.unhighlight(),Blockly.highlightedConnection_=null,Blockly.localConnection_=null);f&&f!=Blockly.highlightedConnection_&&
(f.highlight(),Blockly.highlightedConnection_=f,Blockly.localConnection_=g);if(this.workspace.trashcan&&this.deletable)this.workspace.trashcan.onMouseMove(a)}}a.stopPropagation()};
Blockly.Block.prototype.bumpNeighbours_=function(){for(var a=this.getRootBlock(),b=this.getConnections_(!1),c=0;c<b.length;c++){var d=b[c];d.targetConnection&&d.isSuperior()&&d.targetBlock().bumpNeighbours_();for(var e=d.neighbours_(Blockly.SNAP_RADIUS),f=0;f<e.length;f++){var g=e[f];if(!d.targetConnection||!g.targetConnection)g.sourceBlock_.getRootBlock()!=a&&(d.isSuperior()?g.bumpAwayFrom_(d):d.bumpAwayFrom_(g))}}};Blockly.Block.prototype.getParent=function(){return this.parentBlock_};
Blockly.Block.prototype.getSurroundParent=function(){for(var a=this;;){do{var b=a,a=a.getParent();if(!a)return null}while(a.nextConnection&&a.nextConnection.targetBlock()==b);return a}};Blockly.Block.prototype.getRootBlock=function(){var a,b=this;do a=b,b=a.parentBlock_;while(b);return a};Blockly.Block.prototype.getChildren=function(){return this.childBlocks_};
Blockly.Block.prototype.setParent=function(a){if(this.parentBlock_){for(var b=this.parentBlock_.childBlocks_,c,d=0;c=b[d];d++)if(c==this){b.splice(d,1);break}b=this.getRelativeToSurfaceXY();this.workspace.getCanvas().appendChild(this.svg_.getRootElement());this.svg_.getRootElement().setAttribute("transform","translate("+b.x+", "+b.y+")");this.parentBlock_=null;this.previousConnection&&this.previousConnection.targetConnection&&this.previousConnection.disconnect();this.outputConnection&&this.outputConnection.targetConnection&&
this.outputConnection.disconnect()}else this.workspace.removeTopBlock(this);(this.parentBlock_=a)?(a.childBlocks_.push(this),b=this.getRelativeToSurfaceXY(),a.svg_&&this.svg_&&a.svg_.getRootElement().appendChild(this.svg_.getRootElement()),a=this.getRelativeToSurfaceXY(),this.moveConnections_(a.x-b.x,a.y-b.y)):this.workspace.addTopBlock(this)};Blockly.Block.prototype.getDescendants=function(){for(var a=[this],b,c=0;b=this.childBlocks_[c];c++)a=a.concat(b.getDescendants());return a};
Blockly.Block.prototype.getColour=function(){return this.colourHue_};Blockly.Block.prototype.setColour=function(a){this.colourHue_=a;this.svg_&&this.svg_.updateColour();this.mutator&&this.mutator.updateColour();this.comment&&this.comment.updateColour();this.warning&&this.warning.updateColour();this.rendered&&this.render()};Blockly.Block.prototype.getTitle_=function(a){for(var b=0,c;c=this.inputList[b];b++)for(var d=0,e;e=c.titleRow[d];d++)if(e.name===a)return e;return null};
Blockly.Block.prototype.getTitleValue=function(a){return(a=this.getTitle_(a))?a.getValue():null};Blockly.Block.prototype.setTitleValue=function(a,b){var c=this.getTitle_(b);if(c)c.setValue(a);else throw'Title "'+b+'" not found.';};Blockly.Block.prototype.setTooltip=function(a){this.tooltip=a};
Blockly.Block.prototype.setPreviousStatement=function(a,b){if(this.previousConnection){if(this.previousConnection.targetConnection)throw"Must disconnect previous statement before removing connection.";this.previousConnection.dispose();this.previousConnection=null}if(a){if(this.outputConnection)throw"Remove output connection prior to adding previous connection.";void 0===b&&(b=null);this.previousConnection=new Blockly.Connection(this,Blockly.PREVIOUS_STATEMENT);this.previousConnection.setCheck(b)}this.rendered&&
(this.render(),this.bumpNeighbours_())};Blockly.Block.prototype.setNextStatement=function(a,b){if(this.nextConnection){if(this.nextConnection.targetConnection)throw"Must disconnect next statement before removing connection.";this.nextConnection.dispose();this.nextConnection=null}a&&(void 0===b&&(b=null),this.nextConnection=new Blockly.Connection(this,Blockly.NEXT_STATEMENT),this.nextConnection.setCheck(b));this.rendered&&(this.render(),this.bumpNeighbours_())};
Blockly.Block.prototype.setOutput=function(a,b){if(this.outputConnection){if(this.outputConnection.targetConnection)throw"Must disconnect output value before removing connection.";this.outputConnection.dispose();this.outputConnection=null}if(a){if(this.previousConnection)throw"Remove previous connection prior to adding output connection.";void 0===b&&(b=null);this.outputConnection=new Blockly.Connection(this,Blockly.OUTPUT_VALUE);this.outputConnection.setCheck(b)}this.rendered&&(this.render(),this.bumpNeighbours_())};
Blockly.Block.prototype.setInputsInline=function(a){this.inputsInline=a;this.rendered&&(this.render(),this.bumpNeighbours_(),this.workspace.fireChangeEvent())};Blockly.Block.prototype.setDisabled=function(a){this.disabled!=a&&(this.disabled=a,this.svg_.updateDisabled(),this.workspace.fireChangeEvent())};Blockly.Block.prototype.getInheritedDisabled=function(){for(var a=this;;)if(a=a.getSurroundParent()){if(a.disabled)return!0}else return!1};
Blockly.Block.prototype.setCollapsed=function(a){if(this.collapsed!=a){for(var b=(this.collapsed=a)?"none":"block",c=[],d=0,e;e=this.inputList[d];d++){for(var f=0,g;g=e.titleRow[f];f++)(g.getRootElement?g.getRootElement():g).style.display=b;if(e.connection&&(a?e.connection.hideAll():c=c.concat(e.connection.unhideAll()),e=e.connection.targetBlock()))e.svg_.getRootElement().style.display=b,a&&(e.rendered=!1)}a&&this.mutator&&this.mutator.setVisible(!1);a&&this.comment&&this.comment.setVisible(!1);a&&
this.warning&&this.warning.setVisible(!1);0==c.length&&(c[0]=this);if(this.rendered){for(d=0;a=c[d];d++)a.render();this.bumpNeighbours_()}}};Blockly.Block.prototype.appendValueInput=function(a){return this.appendInput_(Blockly.INPUT_VALUE,a)};Blockly.Block.prototype.appendStatementInput=function(a){return this.appendInput_(Blockly.NEXT_STATEMENT,a)};Blockly.Block.prototype.appendDummyInput=function(a){return this.appendInput_(Blockly.DUMMY_INPUT,a||"")};
Blockly.Block.prototype.appendInput_=function(a,b){var c=null;if(a==Blockly.INPUT_VALUE||a==Blockly.NEXT_STATEMENT)c=new Blockly.Connection(this,a);c=new Blockly.Input(a,b,this,c);this.inputList.push(c);this.rendered&&(this.render(),this.bumpNeighbours_());return c};
Blockly.Block.prototype.moveInputBefore=function(a,b){if(a==b)throw"Can't move \""+a+'" to itself.';for(var c=-1,d=-1,e=0,f;f=this.inputList[e];e++)if(f.name==a){if(c=e,-1!=d)break}else if(f.name==b&&(d=e,-1!=c))break;if(-1==c)throw'Named input "'+a+'" not found.';if(-1==d)throw'Reference input "'+a+'" not found.';this.inputList.splice(c,1);c<d&&d--;this.inputList.splice(d,0,f);this.rendered&&(this.render(),this.bumpNeighbours_())};
Blockly.Block.prototype.removeInput=function(a){for(var b=0,c;c=this.inputList[b];b++)if(c.name==a){c.connection&&c.connection.targetConnection&&c.connection.targetBlock().setParent(null);c.dispose();this.inputList.splice(b,1);this.rendered&&(this.render(),this.bumpNeighbours_());return}throw'Input "'+a+'" not found.';};Blockly.Block.prototype.getInput=function(a){for(var b=0,c;c=this.inputList[b];b++)if(c.name==a)return c;return null};
Blockly.Block.prototype.getInputTargetBlock=function(a){return(a=this.getInput(a))&&a.connection&&a.connection.targetBlock()};Blockly.Block.prototype.setMutator=function(a){this.mutator&&this.mutator!==a&&this.mutator.dispose();a&&(a.block_=this,this.mutator=a,this.svg_&&a.createIcon())};Blockly.Block.prototype.getCommentText=function(){return this.comment?this.comment.getText().replace(/\s+$/,"").replace(/ +\n/g,"\n"):""};
Blockly.Block.prototype.setCommentText=function(a){if(!Blockly.Comment)throw"Comments not supported.";var b=!1;goog.isString(a)?(this.comment||(this.comment=new Blockly.Comment(this),b=!0),this.comment.setText(a)):this.comment&&(this.comment.dispose(),b=!0);this.rendered&&(this.render(),b&&this.bumpNeighbours_())};
Blockly.Block.prototype.setWarningText=function(a){if(!Blockly.Warning)throw"Warnings not supported.";var b=!1;goog.isString(a)?(this.warning||(this.warning=new Blockly.Warning(this),b=!0),this.warning.setText(a)):this.warning&&(this.warning.dispose(),b=!0);this.rendered&&(this.render(),b&&this.bumpNeighbours_())};Blockly.Block.prototype.render=function(){this.svg_.render()};Blockly.Flyout=function(){this.workspace_=new Blockly.Workspace(!1)};Blockly.Flyout.prototype.autoClose=!0;Blockly.Flyout.prototype.CORNER_RADIUS=8;Blockly.Flyout.prototype.onResizeWrapper_=null;
Blockly.Flyout.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBackground_=Blockly.createSvgElement("path",{"class":"blocklyFlyoutBackground"},this.svgGroup_);this.svgOptions_=Blockly.createSvgElement("g",{},this.svgGroup_);this.svgOptions_.appendChild(this.workspace_.createDom());return this.svgGroup_};
Blockly.Flyout.prototype.dispose=function(){this.onResizeWrapper_&&(Blockly.unbindEvent_(this.onResizeWrapper_),this.onResizeWrapper_=null);this.scrollbar_&&(this.scrollbar_.dispose(),this.scrollbar_=null);this.workspace_=null;this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.buttons_=this.targetWorkspaceMetrics_=this.targetWorkspace_=this.svgOptions_=this.svgBackground_=null};
Blockly.Flyout.prototype.getMetrics=function(){if(!this.isVisible())return null;var a=this.height_-2*this.CORNER_RADIUS,b=this.width_;try{var c=this.svgOptions_.getBBox()}catch(d){c={height:0,y:0}}return{viewHeight:a,viewWidth:b,contentHeight:c.height+c.y,viewTop:-this.svgOptions_.scrollY,contentTop:0,absoluteTop:this.CORNER_RADIUS,absoluteLeft:0}};
Blockly.Flyout.prototype.setMetrics=function(a){var b=this.getMetrics();goog.isNumber(a.y)&&(this.svgOptions_.scrollY=-b.contentHeight*a.y-b.contentTop);this.svgOptions_.setAttribute("transform","translate(0,"+(this.svgOptions_.scrollY+b.absoluteTop)+")")};
Blockly.Flyout.prototype.init=function(a,b,c){this.targetWorkspace_=a;this.targetWorkspaceMetrics_=b;this.height_=this.width_=0;var d=this;c&&(this.scrollbar_=new Blockly.Scrollbar(this.svgOptions_,function(){return d.getMetrics()},function(a){return d.setMetrics(a)},!1,!1));this.buttons_=[];this.position_();this.hide();this.onResizeWrapper_=Blockly.bindEvent_(window,"resize",this,this.position_)};
Blockly.Flyout.prototype.position_=function(){var a=this.targetWorkspaceMetrics_();if(a){var b=this.width_-this.CORNER_RADIUS;Blockly.RTL&&(b*=-1);var c=["M "+(Blockly.RTL?this.width_:0)+",0"];c.push("h",b);c.push("a",this.CORNER_RADIUS,this.CORNER_RADIUS,0,0,Blockly.RTL?0:1,Blockly.RTL?-this.CORNER_RADIUS:this.CORNER_RADIUS,this.CORNER_RADIUS);c.push("v",Math.max(0,a.viewHeight-2*this.CORNER_RADIUS));c.push("a",this.CORNER_RADIUS,this.CORNER_RADIUS,0,0,Blockly.RTL?0:1,Blockly.RTL?this.CORNER_RADIUS:
-this.CORNER_RADIUS,this.CORNER_RADIUS);c.push("h",-b);c.push("z");this.svgBackground_.setAttribute("d",c.join(" "));b=a.absoluteLeft;Blockly.RTL&&(b-=this.width_);this.svgGroup_.setAttribute("transform","translate("+b+","+a.absoluteTop+")");this.height_=a.viewHeight}};Blockly.Flyout.prototype.isVisible=function(){return"none"!=this.svgGroup_.style.display};
Blockly.Flyout.prototype.hide=function(){this.svgGroup_.style.display="none";for(var a=this.workspace_.getTopBlocks(!1),b=0,c;c=a[b];b++)c.dispose(!1,!1);for(b=0;a=this.buttons_[b];b++)Blockly.unbindEvent_(a.wrapper_),goog.dom.removeNode(a);this.buttons_=[]};
Blockly.Flyout.prototype.show=function(a){var b=this.CORNER_RADIUS;this.svgGroup_.style.display="block";var c=[],d=[];if(a==Blockly.MSG_VARIABLE_CATEGORY)Blockly.Variables.flyoutCategory(c,d,b,this.workspace_);else if(a==Blockly.MSG_PROCEDURE_CATEGORY)Blockly.Procedures.flyoutCategory(c,d,b,this.workspace_);else for(var e=0,f;f=a[e];e++)f=new Blockly.Block(this.workspace_,f),f.initSvg(),c[e]=f,d[e]=2*b;a=0;for(var g=b,e=0;f=c[e];e++){f.isInFlyout=!0;Blockly.Comment&&f.setCommentText(null);f.render();
var h=f.getSvgRoot().getBBox();f.moveBy(Blockly.RTL?0:b+Blockly.BlockSvg.TAB_WIDTH,g);a=Math.max(a,h.width);g+=h.height+d[e];Blockly.bindEvent_(f.getSvgRoot(),"mousedown",null,Blockly.Flyout.createBlockFunc_(this,f))}a+=b+Blockly.BlockSvg.TAB_WIDTH+b/2+Blockly.Scrollbar.scrollbarThickness;for(e=0;f=c[e];e++)Blockly.RTL&&f.moveBy(a-b-Blockly.BlockSvg.TAB_WIDTH,0),h=f.getSvgRoot().getBBox(),d=f.getRelativeToSurfaceXY(),d=Blockly.createSvgElement("rect",{width:h.width,height:h.height,x:d.x+h.x,y:d.y+
h.y,"fill-opacity":0},null),this.svgOptions_.insertBefore(d,this.svgOptions_.firstChild),d.wrapper_=Blockly.bindEvent_(d,"mousedown",null,Blockly.Flyout.createBlockFunc_(this,f)),this.buttons_[e]=d;this.width_=a;Blockly.fireUiEvent(window,"resize")};
Blockly.Flyout.createBlockFunc_=function(a,b){return function(c){if(!Blockly.isRightButton(c)){var d=Blockly.Xml.blockToDom_(b),d=Blockly.Xml.domToBlock_(a.targetWorkspace_,d),e=b.getSvgRoot();if(!e)throw"originBlock is not rendered.";var e=Blockly.getAbsoluteXY_(e),f=Blockly.getAbsoluteXY_(a.targetWorkspace_.getCanvas());d.moveBy(e.x-f.x,e.y-f.y);d.render();a.autoClose&&a.hide();d.onMouseDown_(c)}}};Blockly.Toolbox={};Blockly.Toolbox.width=0;Blockly.Toolbox.selectedOption_=null;
Blockly.Toolbox.createDom=function(){Blockly.Toolbox.flyout_=new Blockly.Flyout;var a=Blockly.createSvgElement("g",{},null);Blockly.Toolbox.svgGroup_=a;var b=Blockly.Toolbox.flyout_.createDom();a.appendChild(b);Blockly.Toolbox.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyToolboxBackground",height:"100%"},a);Blockly.Toolbox.svgOptions_=Blockly.createSvgElement("g",{"class":"blocklyToolboxOptions"},a);return a};
Blockly.Toolbox.getMetrics=function(){var a=Blockly.svgSize().height,b=Blockly.Toolbox.width;try{var c=Blockly.Toolbox.svgOptions_.getBBox()}catch(d){return null}return{viewHeight:a,viewWidth:b,contentHeight:c.height+c.y,viewTop:-Blockly.Toolbox.svgOptions_.scrollY,contentTop:0,absoluteTop:0,absoluteLeft:Blockly.RTL?-1:1}};
Blockly.Toolbox.setMetrics=function(a){var b=Blockly.Toolbox.getMetrics();goog.isNumber(a.y)&&(Blockly.Toolbox.svgOptions_.scrollY=-b.contentHeight*a.y-b.contentTop);Blockly.Toolbox.svgOptions_.setAttribute("transform","translate(0,"+(Blockly.Toolbox.svgOptions_.scrollY+b.absoluteTop)+")")};
Blockly.Toolbox.init=function(){Blockly.Toolbox.flyout_.init(Blockly.mainWorkspace,Blockly.getMainWorkspaceMetrics,!0);Blockly.Toolbox.languageTree=Blockly.Toolbox.buildTree_();Blockly.Toolbox.redraw();new Blockly.Scrollbar(Blockly.Toolbox.svgOptions_,Blockly.Toolbox.getMetrics,Blockly.Toolbox.setMetrics,!1,!1);Blockly.Toolbox.position_();Blockly.bindEvent_(window,"resize",null,Blockly.Toolbox.position_)};
Blockly.Toolbox.position_=function(){var a=Blockly.svgSize();Blockly.RTL&&Blockly.Toolbox.svgGroup_.setAttribute("transform","translate("+(a.width-Blockly.Toolbox.width)+",0)")};Blockly.Toolbox.PREFIX_="cat_";Blockly.Toolbox.buildTree_=function(){var a={},b;for(b in Blockly.Language){var c=Blockly.Language[b];c.category&&(c=Blockly.Toolbox.PREFIX_+window.encodeURI(c.category),c in a?a[c].push(b):a[c]=[b])}return a};
Blockly.Toolbox.redraw=function(){function a(a){return function(b){var c=Blockly.Toolbox.selectedOption_;Blockly.hideChaff();c==a?Blockly.Toolbox.clearSelection():Blockly.Toolbox.selectOption_(a);b.stopPropagation()}}var b=[],c;for(c in Blockly.Toolbox.languageTree){var d={};d.text=window.decodeURI(c.substring(Blockly.Toolbox.PREFIX_.length));d.cat=c;b.push(d)}d={};(Blockly.Language.variables_get||Blockly.Language.variables_set)&&b.push({text:Blockly.MSG_VARIABLE_CATEGORY,cat:Blockly.MSG_VARIABLE_CATEGORY});
(Blockly.Language.procedures_defnoreturn||Blockly.Language.procedures_defreturn)&&b.push({text:Blockly.MSG_PROCEDURE_CATEGORY,cat:Blockly.MSG_PROCEDURE_CATEGORY});goog.dom.removeChildren(Blockly.Toolbox.svgOptions_);c=0;for(var e=[Blockly.Toolbox.svgBackground_],f=0;d=b[f];f++){var g=Blockly.ContextMenu.optionToDom(d.text),h=g.firstChild,i=g.lastChild;Blockly.Toolbox.svgOptions_.appendChild(g);g.setAttribute("transform","translate(0, "+(f*Blockly.ContextMenu.Y_HEIGHT+4)+")");g.cat=d.cat;Blockly.bindEvent_(g,
"mousedown",null,a(g));e.push(h);c=Math.max(c,i.getComputedTextLength())}c+=2*Blockly.ContextMenu.X_PADDING;for(f=0;f<e.length;f++)e[f].setAttribute("width",c);if(Blockly.RTL)for(f=0;g=Blockly.Toolbox.svgOptions_.childNodes[f];f++)i=g.lastChild,i.setAttribute("text-anchor","end"),i.setAttribute("x",c-Blockly.ContextMenu.X_PADDING);Blockly.Toolbox.width=c;Blockly.bindEvent_(Blockly.Toolbox.svgGroup_,"mousedown",null,function(a){Blockly.isRightButton(a)&&(Blockly.hideChaff(!0),a.stopPropagation())});
Blockly.fireUiEvent(window,"resize")};Blockly.Toolbox.selectOption_=function(a){Blockly.Toolbox.clearSelection();if(Blockly.Toolbox.selectedOption_=a)Blockly.addClass_(a,"blocklyMenuSelected"),a=a.cat,Blockly.Toolbox.flyout_.show(Blockly.Toolbox.languageTree[a]||a)};Blockly.Toolbox.clearSelection=function(){var a=Blockly.Toolbox.selectedOption_;a&&(Blockly.removeClass_(a,"blocklyMenuSelected"),Blockly.Toolbox.selectedOption_=null);Blockly.Toolbox.flyout_.hide()};Blockly.Variables={};Blockly.Variables.NAME_TYPE="variable";Blockly.Variables.allVariables=function(a){var b;b=a?a.getDescendants():Blockly.mainWorkspace.getAllBlocks();a={};for(var c=0;c<b.length;c++){var d=b[c].getVars;if(d)for(var d=d.call(b[c]),e=0;e<d.length;e++){var f=d[e];f&&(a[Blockly.Names.PREFIX_+f.toLowerCase()]=f)}}b=[];for(var g in a)b.push(a[g]);return b};
Blockly.Variables.renameVariable=function(a,b){for(var c=Blockly.mainWorkspace.getAllBlocks(),d=0;d<c.length;d++){var e=c[d].renameVar;e&&e.call(c[d],a,b)}};
Blockly.Variables.flyoutCategory=function(a,b,c,d){var e=Blockly.Variables.allVariables();e.sort(goog.string.caseInsensitiveCompare);e.unshift(null);for(var f=void 0,g=0;g<e.length;g++)if(e[g]!==f){var h=Blockly.Language.variables_get?new Blockly.Block(d,"variables_get"):null;h&&h.initSvg();var i=Blockly.Language.variables_set?new Blockly.Block(d,"variables_set"):null;i&&i.initSvg();null===e[g]?f=(h||i).getVars()[0]:(h&&h.setTitleValue(e[g],"VAR"),i&&i.setTitleValue(e[g],"VAR"));i&&a.push(i);h&&a.push(h);
h&&i?b.push(c,3*c):b.push(2*c)}};Blockly.Variables.refreshFlyoutCategory=function(){Blockly.Toolbox&&(Blockly.Toolbox.flyout_.isVisible()&&Blockly.Toolbox.selectedOption_.cat==Blockly.MSG_VARIABLE_CATEGORY)&&(Blockly.Toolbox.flyout_.hide(),Blockly.Toolbox.flyout_.show(Blockly.MSG_VARIABLE_CATEGORY))};
Blockly.Variables.generateUniqueName=function(){var a=Blockly.Variables.allVariables(),b="";if(a.length){a.sort(goog.string.caseInsensitiveCompare);for(var c=0,d="i",e=0,f=!1;!b;){e=0;for(f=!1;e<a.length&&!f;)a[e].toLowerCase()==d&&(f=!0),e++;f?("z"===d[0]?(c++,d="a"):(d=String.fromCharCode(d.charCodeAt(0)+1),"l"==d[0]&&(d=String.fromCharCode(d.charCodeAt(0)+1))),0<c&&(d+=c)):b=d}}else b="i";return b};Blockly.FieldVariable=function(a){Blockly.FieldDropdown.call(this,Blockly.FieldVariable.dropdownCreate,Blockly.FieldVariable.dropdownChange);a?this.setValue(a):this.setValue(Blockly.Variables.generateUniqueName())};goog.inherits(Blockly.FieldVariable,Blockly.FieldDropdown);Blockly.FieldVariable.prototype.getValue=function(){return this.getText()};Blockly.FieldVariable.prototype.setValue=function(a){this.value_=a;this.setText(a)};
Blockly.FieldVariable.dropdownCreate=function(){var a=Blockly.Variables.allVariables(),b=this.getText();b&&-1==a.indexOf(b)&&a.push(b);a.sort(goog.string.caseInsensitiveCompare);a.push(Blockly.MSG_RENAME_VARIABLE);a.push(Blockly.MSG_NEW_VARIABLE);for(var b=[],c=0;c<a.length;c++)b[c]=[a[c],a[c]];return b};
Blockly.FieldVariable.dropdownChange=function(a){function b(a,b){Blockly.hideChaff();var c=window.prompt(a,b);return c&&c.replace(/[\s\xa0]+/g," ").replace(/^ | $/g,"")}window.setTimeout(Blockly.Variables.refreshFlyoutCategory,1);if(a==Blockly.MSG_RENAME_VARIABLE){var c=this.getText();(a=b(Blockly.MSG_RENAME_VARIABLE_TITLE.replace("%1",c),c))&&Blockly.Variables.renameVariable(c,a);return null}if(a==Blockly.MSG_NEW_VARIABLE)return(a=b(Blockly.MSG_NEW_VARIABLE_TITLE,""))?(Blockly.Variables.renameVariable(a,
a),a):null};Blockly.Procedures={};Blockly.Procedures.NAME_TYPE="procedure";Blockly.Procedures.allProcedures=function(){for(var a=Blockly.mainWorkspace.getAllBlocks(),b=[],c=[],d=0;d<a.length;d++){var e=a[d].getProcedureDef;e&&(e=e.call(a[d]))&&(e[2]?b.push(e):c.push(e))}c.sort(Blockly.Procedures.procTupleComparator_);b.sort(Blockly.Procedures.procTupleComparator_);return[c,b]};Blockly.Procedures.procTupleComparator_=function(a,b){var c=a[0].toLowerCase(),d=b[0].toLowerCase();return c>d?1:c<d?-1:0};
Blockly.Procedures.findLegalName=function(a,b){if(!b.workspace.editable)return a;for(;!Blockly.Procedures.isLegalName(a,b.workspace,b);){var c=a.match(/^(.*?)(\d+)$/);a=c?c[1]+(parseInt(c[2],10)+1):a+"2"}return a};Blockly.Procedures.isLegalName=function(a,b,c){b=b.getAllBlocks();for(var d=0;d<b.length;d++)if(b[d]!=c){var e=b[d].getProcedureDef;if(e&&(e=e.call(b[d]),Blockly.Names.equals(e[0],a)))return!1}return!0};
Blockly.Procedures.rename=function(a){if(!this.sourceBlock_.editable)return a;a=a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"");if(!a)return null;a=Blockly.Procedures.findLegalName(a,this.sourceBlock_);for(var b=this.sourceBlock_.workspace.getAllBlocks(),c=0;c<b.length;c++){var d=b[c].renameProcedure;d&&d.call(b[c],this.text_,a)}window.setTimeout(Blockly.Procedures.refreshFlyoutCategory,1);return a};
Blockly.Procedures.flyoutCategory=function(a,b,c,d){function e(e,f){for(var i=0;i<e.length;i++){var j=new Blockly.Block(d,f);j.setTitleValue(e[i][0],"NAME");for(var k=[],l=0;l<e[i][1].length;l++)k[l]="ARG"+l;j.setProcedureParameters(e[i][1],k);j.initSvg();a.push(j);b.push(2*c)}}if(Blockly.Language.procedures_defnoreturn){var f=new Blockly.Block(d,"procedures_defnoreturn");f.initSvg();a.push(f);b.push(2*c)}Blockly.Language.procedures_defreturn&&(f=new Blockly.Block(d,"procedures_defreturn"),f.initSvg(),
a.push(f),b.push(2*c));Blockly.Language.procedures_ifreturn&&(f=new Blockly.Block(d,"procedures_ifreturn"),f.initSvg(),a.push(f),b.push(2*c));f=Blockly.Procedures.allProcedures();e(f[0],"procedures_callnoreturn");e(f[1],"procedures_callreturn")};Blockly.Procedures.refreshFlyoutCategory=function(){Blockly.Toolbox&&(Blockly.Toolbox.flyout_.isVisible()&&Blockly.Toolbox.selectedOption_.cat==Blockly.MSG_PROCEDURE_CATEGORY)&&(Blockly.Toolbox.flyout_.hide(),Blockly.Toolbox.flyout_.show(Blockly.MSG_PROCEDURE_CATEGORY))};
Blockly.Procedures.getCallers=function(a,b){for(var c=[],d=b.getAllBlocks(),e=0;e<d.length;e++){var f=d[e].getProcedureCall;f&&(f=f.call(d[e]))&&Blockly.Names.equals(f,a)&&c.push(d[e])}return c};Blockly.Procedures.disposeCallers=function(a,b){for(var c=Blockly.Procedures.getCallers(a,b),d=0;d<c.length;d++)c[d].dispose(!0,!1);window.setTimeout(Blockly.Procedures.refreshFlyoutCategory,1)};
Blockly.Procedures.mutateCallers=function(a,b,c,d){a=Blockly.Procedures.getCallers(a,b);for(b=0;b<a.length;b++)a[b].setProcedureParameters(c,d)};Blockly.Procedures.getDefinition=function(a,b){for(var c=b.getAllBlocks(),d=0;d<c.length;d++){var e=c[d].getProcedureDef;if(e&&(e=e.call(c[d]))&&Blockly.Names.equals(e[0],a))return c[d]}return null};goog.debug={};goog.debug.errorHandlerWeakDep={protectEntryPoint:function(a,b){return a}};goog.disposable={};goog.disposable.IDisposable=function(){};goog.Disposable=function(){goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF&&(this.creationStack=Error().stack,goog.Disposable.instances_[goog.getUid(this)]=this)};goog.Disposable.MonitoringMode={OFF:0,PERMANENT:1,INTERACTIVE:2};goog.Disposable.MONITORING_MODE=0;goog.Disposable.instances_={};goog.Disposable.getUndisposedObjects=function(){var a=[],b;for(b in goog.Disposable.instances_)goog.Disposable.instances_.hasOwnProperty(b)&&a.push(goog.Disposable.instances_[Number(b)]);return a};
goog.Disposable.clearUndisposedObjects=function(){goog.Disposable.instances_={}};goog.Disposable.prototype.disposed_=!1;goog.Disposable.prototype.isDisposed=function(){return this.disposed_};goog.Disposable.prototype.getDisposed=goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose=function(){if(!this.disposed_&&(this.disposed_=!0,this.disposeInternal(),goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF)){var a=goog.getUid(this);if(goog.Disposable.MONITORING_MODE==goog.Disposable.MonitoringMode.PERMANENT&&!goog.Disposable.instances_.hasOwnProperty(a))throw Error(this+" did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");delete goog.Disposable.instances_[a]}};
goog.Disposable.prototype.registerDisposable=function(a){this.dependentDisposables_||(this.dependentDisposables_=[]);this.dependentDisposables_.push(a)};goog.Disposable.prototype.addOnDisposeCallback=function(a,b){this.onDisposeCallbacks_||(this.onDisposeCallbacks_=[]);this.onDisposeCallbacks_.push(goog.bind(a,b))};goog.Disposable.prototype.disposeInternal=function(){this.dependentDisposables_&&goog.disposeAll.apply(null,this.dependentDisposables_);if(this.onDisposeCallbacks_)for(;this.onDisposeCallbacks_.length;)this.onDisposeCallbacks_.shift()()};
goog.Disposable.isDisposed=function(a){return a&&"function"==typeof a.isDisposed?a.isDisposed():!1};goog.dispose=function(a){a&&"function"==typeof a.dispose&&a.dispose()};goog.disposeAll=function(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];goog.isArrayLike(d)?goog.disposeAll.apply(null,d):goog.dispose(d)}};goog.events={};goog.events.Event=function(a,b){this.type=a;this.currentTarget=this.target=b};goog.events.Event.prototype.disposeInternal=function(){};goog.events.Event.prototype.dispose=function(){};goog.events.Event.prototype.propagationStopped_=!1;goog.events.Event.prototype.defaultPrevented=!1;goog.events.Event.prototype.returnValue_=!0;goog.events.Event.prototype.stopPropagation=function(){this.propagationStopped_=!0};
goog.events.Event.prototype.preventDefault=function(){this.defaultPrevented=!0;this.returnValue_=!1};goog.events.Event.stopPropagation=function(a){a.stopPropagation()};goog.events.Event.preventDefault=function(a){a.preventDefault()};goog.events.Listenable=function(){};goog.events.Listenable.USE_LISTENABLE_INTERFACE=!1;goog.events.ListenableKey=function(){};goog.events.Listener=function(){goog.events.Listener.ENABLE_MONITORING&&(this.creationStack=Error().stack)};goog.events.Listener.counter_=0;goog.events.Listener.ENABLE_MONITORING=!1;goog.events.Listener.prototype.key=0;goog.events.Listener.prototype.removed=!1;goog.events.Listener.prototype.callOnce=!1;
goog.events.Listener.prototype.init=function(a,b,c,d,e,f){if(goog.isFunction(a))this.isFunctionListener_=!0;else if(a&&a.handleEvent&&goog.isFunction(a.handleEvent))this.isFunctionListener_=!1;else throw Error("Invalid listener argument");this.listener=a;this.proxy=b;this.src=c;this.type=d;this.capture=!!e;this.handler=f;this.callOnce=!1;this.key=++goog.events.Listener.counter_;this.removed=!1};
goog.events.Listener.prototype.handleEvent=function(a){return this.isFunctionListener_?this.listener.call(this.handler||this.src,a):this.listener.handleEvent.call(this.listener,a)};goog.object={};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};
goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};
goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),d=c?b:arguments,c=c?0:1;c<d.length&&!(a=a[d[c]],!goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};
goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c};goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};
goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};goog.events.BrowserFeature={HAS_W3C_BUTTON:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE&&!goog.userAgent.isVersion("9"),HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT||goog.userAgent.isVersion("528"),HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO&&goog.userAgent.isVersion("1.9b")||goog.userAgent.IE&&goog.userAgent.isVersion("8")||goog.userAgent.OPERA&&goog.userAgent.isVersion("9.5")||
goog.userAgent.WEBKIT&&goog.userAgent.isVersion("528"),HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO&&!goog.userAgent.isVersion("8")||goog.userAgent.IE&&!goog.userAgent.isVersion("9"),TOUCH_ENABLED:"ontouchstart"in goog.global||!(!goog.global.document||!(document.documentElement&&"ontouchstart"in document.documentElement))||!(!goog.global.navigator||!goog.global.navigator.msMaxTouchPoints)};goog.debug.Error=function(a){Error.captureStackTrace?Error.captureStackTrace(this,goog.debug.Error):this.stack=Error().stack||"";a&&(this.message=String(a))};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new goog.asserts.AssertionError(""+e,f||[]);};
goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.fail=function(a,b){if(goog.asserts.ENABLE_ASSERTS)throw new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};
goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,d){goog.asserts.ENABLE_ASSERTS&&!(a instanceof b)&&goog.asserts.doAssertFailure_("instanceof check failed.",null,c,Array.prototype.slice.call(arguments,3));return a};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.peek=function(a){return a[a.length-1]};goog.array.ARRAY_PROTOTYPE_=Array.prototype;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.indexOf?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return!goog.isString(b)||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.lastIndexOf?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return!goog.isString(b)||1!=b.length?-1:a.lastIndexOf(b,c);for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.forEach?function(a,b,c){goog.asserts.assert(null!=a.length);goog.array.ARRAY_PROTOTYPE_.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.filter?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var i=g[h];b.call(c,i,h,a)&&(e[f++]=i)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.map?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};goog.array.reduce=function(a,b,c,d){if(a.reduce)return d?a.reduce(goog.bind(b,d),c):a.reduce(b,c);var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=function(a,b,c,d){if(a.reduceRight)return d?a.reduceRight(goog.bind(b,d),c):a.reduceRight(b,c);var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.some?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.every?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),d;(d=0<=c)&&goog.array.removeAt(a,c);return d};
goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==goog.array.ARRAY_PROTOTYPE_.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.concat=function(a){return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_,arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;
goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c],e;if(goog.isArray(d)||(e=goog.isArrayLike(d))&&Object.prototype.hasOwnProperty.call(d,"callee"))a.push.apply(a,d);else if(e)for(var f=a.length,g=d.length,h=0;h<g;h++)a[f+h]=d[h];else a.push(d)}};goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.splice.apply(a,goog.array.slice(arguments,1))};
goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?goog.array.ARRAY_PROTOTYPE_.slice.call(a,b):goog.array.ARRAY_PROTOTYPE_.slice.call(a,b,c)};goog.array.removeDuplicates=function(a,b){for(var c=b||a,d={},e=0,f=0;f<a.length;){var g=a[f++],h=goog.isObject(g)?"o"+goog.getUid(g):(typeof g).charAt(0)+g;Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,c[e++]=g)}c.length=e};
goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var i=f+g>>1,j;j=c?b.call(e,a[i],i,a):b(d,a[i]);0<j?f=i+1:(g=i,h=!j)}return h?f:~f};goog.array.sort=function(a,b){goog.asserts.assert(null!=a.length);goog.array.ARRAY_PROTOTYPE_.sort.call(a,b||goog.array.defaultCompare)};
goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value};goog.array.sortObjectsByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(a[b],c[b])})};
goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};goog.array.compare=function(a,b,c){return goog.array.equals(a,b,c)};
goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};
goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};goog.array.bucket=function(a,b){for(var c={},d=0;d<a.length;d++){var e=a[d],f=b(e,d,a);goog.isDef(f)&&(c[f]||(c[f]=[])).push(e)}return c};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};
goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];goog.isArray(d)?b.push.apply(b,goog.array.flatten.apply(null,d)):b.push(d)}return b};goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?goog.array.ARRAY_PROTOTYPE_.unshift.apply(a,a.splice(-b,b)):0>b&&goog.array.ARRAY_PROTOTYPE_.push.apply(a,a.splice(0,-b)));return a};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=0;;c++){for(var d=[],e=0;e<arguments.length;e++){var f=arguments[e];if(c>=f.length)return b;d.push(f[c])}b.push(d)}};goog.array.shuffle=function(a,b){for(var c=b||Math.random,d=a.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=a[d];a[d]=a[e];a[e]=f}};goog.debug.entryPointRegistry={};goog.debug.EntryPointMonitor=function(){};goog.debug.entryPointRegistry.refList_=[];goog.debug.entryPointRegistry.monitors_=[];goog.debug.entryPointRegistry.monitorsMayExist_=!1;goog.debug.entryPointRegistry.register=function(a){goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length]=a;if(goog.debug.entryPointRegistry.monitorsMayExist_)for(var b=goog.debug.entryPointRegistry.monitors_,c=0;c<b.length;c++)a(goog.bind(b[c].wrap,b[c]))};
goog.debug.entryPointRegistry.monitorAll=function(a){goog.debug.entryPointRegistry.monitorsMayExist_=!0;for(var b=goog.bind(a.wrap,a),c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](b);goog.debug.entryPointRegistry.monitors_.push(a)};
goog.debug.entryPointRegistry.unmonitorAllIfPossible=function(a){var b=goog.debug.entryPointRegistry.monitors_;goog.asserts.assert(a==b[b.length-1],"Only the most recent monitor can be unwrapped.");a=goog.bind(a.unwrap,a);for(var c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](a);b.length--};goog.events.EventWrapper=function(){};goog.events.EventWrapper.prototype.listen=function(a,b,c,d,e){};goog.events.EventWrapper.prototype.unlisten=function(a,b,c,d,e){};goog.events.EventType={CLICK:"click",DBLCLICK:"dblclick",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",SELECTSTART:"selectstart",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",BLUR:"blur",FOCUS:"focus",DEACTIVATE:"deactivate",FOCUSIN:goog.userAgent.IE?"focusin":"DOMFocusIn",FOCUSOUT:goog.userAgent.IE?"focusout":"DOMFocusOut",CHANGE:"change",SELECT:"select",SUBMIT:"submit",INPUT:"input",PROPERTYCHANGE:"propertychange",DRAGSTART:"dragstart",
DRAG:"drag",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",DRAGEND:"dragend",TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend",TOUCHCANCEL:"touchcancel",BEFOREUNLOAD:"beforeunload",CONTEXTMENU:"contextmenu",ERROR:"error",HELP:"help",LOAD:"load",LOSECAPTURE:"losecapture",READYSTATECHANGE:"readystatechange",RESIZE:"resize",SCROLL:"scroll",UNLOAD:"unload",HASHCHANGE:"hashchange",PAGEHIDE:"pagehide",PAGESHOW:"pageshow",POPSTATE:"popstate",COPY:"copy",PASTE:"paste",
CUT:"cut",BEFORECOPY:"beforecopy",BEFORECUT:"beforecut",BEFOREPASTE:"beforepaste",ONLINE:"online",OFFLINE:"offline",MESSAGE:"message",CONNECT:"connect",TRANSITIONEND:goog.userAgent.WEBKIT?"webkitTransitionEnd":goog.userAgent.OPERA?"oTransitionEnd":"transitionend",MSGESTURECHANGE:"MSGestureChange",MSGESTUREEND:"MSGestureEnd",MSGESTUREHOLD:"MSGestureHold",MSGESTURESTART:"MSGestureStart",MSGESTURETAP:"MSGestureTap",MSGOTPOINTERCAPTURE:"MSGotPointerCapture",MSINERTIASTART:"MSInertiaStart",MSLOSTPOINTERCAPTURE:"MSLostPointerCapture",
MSPOINTERCANCEL:"MSPointerCancel",MSPOINTERDOWN:"MSPointerDown",MSPOINTERMOVE:"MSPointerMove",MSPOINTEROVER:"MSPointerOver",MSPOINTEROUT:"MSPointerOut",MSPOINTERUP:"MSPointerUp",TEXTINPUT:"textinput",COMPOSITIONSTART:"compositionstart",COMPOSITIONUPDATE:"compositionupdate",COMPOSITIONEND:"compositionend"};goog.reflect={};goog.reflect.object=function(a,b){return b};goog.reflect.sinkValue=function(a){goog.reflect.sinkValue[" "](a);return a};goog.reflect.sinkValue[" "]=goog.nullFunction;goog.reflect.canAccessProperty=function(a,b){try{return goog.reflect.sinkValue(a[b]),!0}catch(c){}return!1};goog.events.BrowserEvent=function(a,b){a&&this.init(a,b)};goog.inherits(goog.events.BrowserEvent,goog.events.Event);goog.events.BrowserEvent.MouseButton={LEFT:0,MIDDLE:1,RIGHT:2};goog.events.BrowserEvent.IEButtonMap=[1,4,2];goog.events.BrowserEvent.prototype.target=null;goog.events.BrowserEvent.prototype.relatedTarget=null;goog.events.BrowserEvent.prototype.offsetX=0;goog.events.BrowserEvent.prototype.offsetY=0;goog.events.BrowserEvent.prototype.clientX=0;
goog.events.BrowserEvent.prototype.clientY=0;goog.events.BrowserEvent.prototype.screenX=0;goog.events.BrowserEvent.prototype.screenY=0;goog.events.BrowserEvent.prototype.button=0;goog.events.BrowserEvent.prototype.keyCode=0;goog.events.BrowserEvent.prototype.charCode=0;goog.events.BrowserEvent.prototype.ctrlKey=!1;goog.events.BrowserEvent.prototype.altKey=!1;goog.events.BrowserEvent.prototype.shiftKey=!1;goog.events.BrowserEvent.prototype.metaKey=!1;
goog.events.BrowserEvent.prototype.platformModifierKey=!1;goog.events.BrowserEvent.prototype.event_=null;
goog.events.BrowserEvent.prototype.init=function(a,b){var c=this.type=a.type;goog.events.Event.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;d?goog.userAgent.GECKO&&(goog.reflect.canAccessProperty(d,"nodeName")||(d=null)):c==goog.events.EventType.MOUSEOVER?d=a.fromElement:c==goog.events.EventType.MOUSEOUT&&(d=a.toElement);this.relatedTarget=d;this.offsetX=goog.userAgent.WEBKIT||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=goog.userAgent.WEBKIT||void 0!==
a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.platformModifierKey=goog.userAgent.MAC?a.metaKey:a.ctrlKey;this.state=a.state;this.event_=a;a.defaultPrevented&&this.preventDefault();
delete this.propagationStopped_};goog.events.BrowserEvent.prototype.isButton=function(a){return goog.events.BrowserFeature.HAS_W3C_BUTTON?this.event_.button==a:"click"==this.type?a==goog.events.BrowserEvent.MouseButton.LEFT:!!(this.event_.button&goog.events.BrowserEvent.IEButtonMap[a])};goog.events.BrowserEvent.prototype.isMouseActionButton=function(){return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT)&&!(goog.userAgent.WEBKIT&&goog.userAgent.MAC&&this.ctrlKey)};
goog.events.BrowserEvent.prototype.stopPropagation=function(){goog.events.BrowserEvent.superClass_.stopPropagation.call(this);this.event_.stopPropagation?this.event_.stopPropagation():this.event_.cancelBubble=!0};
goog.events.BrowserEvent.prototype.preventDefault=function(){goog.events.BrowserEvent.superClass_.preventDefault.call(this);var a=this.event_;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};goog.events.BrowserEvent.prototype.getBrowserEvent=function(){return this.event_};goog.events.BrowserEvent.prototype.disposeInternal=function(){};goog.events.listeners_={};goog.events.listenerTree_={};goog.events.sources_={};goog.events.onString_="on";goog.events.onStringMap_={};goog.events.keySeparator_="_";goog.events.listen=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.listen(a,b[f],c,d,e);return null}return goog.events.listen_(a,b,c,!1,d,e)};
goog.events.listen_=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");e=!!e;var g=goog.events.listenerTree_;b in g||(g[b]={count_:0,remaining_:0});g=g[b];e in g||(g[e]={count_:0,remaining_:0},g.count_++);var g=g[e],h=goog.getUid(a),i;g.remaining_++;if(g[h]){i=g[h];for(var j=0;j<i.length;j++)if(g=i[j],g.listener==c&&g.handler==f){if(g.removed)break;d||(i[j].callOnce=!1);return i[j].key}}else i=g[h]=[],g.count_++;j=goog.events.getProxy();j.src=a;g=new goog.events.Listener;g.init(c,j,a,b,
e,f);g.callOnce=d;c=g.key;j.key=c;i.push(g);goog.events.listeners_[c]=g;goog.events.sources_[h]||(goog.events.sources_[h]=[]);goog.events.sources_[h].push(g);a.addEventListener?(a==goog.global||!a.customEvent_)&&a.addEventListener(b,j,e):a.attachEvent(goog.events.getOnString_(b),j);return c};
goog.events.getProxy=function(){var a=goog.events.handleBrowserEvent_,b=goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT?function(c){return a.call(b.src,b.key,c)}:function(c){c=a.call(b.src,b.key,c);if(!c)return c};return b};goog.events.listenOnce=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.listenOnce(a,b[f],c,d,e);return null}return goog.events.listen_(a,b,c,!0,d,e)};goog.events.listenWithWrapper=function(a,b,c,d,e){b.listen(a,c,d,e)};
goog.events.unlisten=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.unlisten(a,b[f],c,d,e);return null}d=!!d;a=goog.events.getListeners_(a,b,d);if(!a)return!1;for(f=0;f<a.length;f++)if(a[f].listener==c&&a[f].capture==d&&a[f].handler==e)return goog.events.unlistenByKey(a[f].key);return!1};
goog.events.unlistenByKey=function(a){if(!goog.events.listeners_[a])return!1;var b=goog.events.listeners_[a];if(b.removed)return!1;var c=b.src,d=b.type,e=b.proxy,f=b.capture;c.removeEventListener?(c==goog.global||!c.customEvent_)&&c.removeEventListener(d,e,f):c.detachEvent&&c.detachEvent(goog.events.getOnString_(d),e);c=goog.getUid(c);goog.events.sources_[c]&&(e=goog.events.sources_[c],goog.array.remove(e,b),0==e.length&&delete goog.events.sources_[c]);b.removed=!0;if(b=goog.events.listenerTree_[d][f][c])b.needsCleanup_=
!0,goog.events.cleanUp_(d,f,c,b);delete goog.events.listeners_[a];return!0};goog.events.unlistenWithWrapper=function(a,b,c,d,e){b.unlisten(a,c,d,e)};
goog.events.cleanUp_=function(a,b,c,d){if(!d.locked_&&d.needsCleanup_){for(var e=0,f=0;e<d.length;e++)d[e].removed?d[e].proxy.src=null:(e!=f&&(d[f]=d[e]),f++);d.length=f;d.needsCleanup_=!1;0==f&&(delete goog.events.listenerTree_[a][b][c],goog.events.listenerTree_[a][b].count_--,0==goog.events.listenerTree_[a][b].count_&&(delete goog.events.listenerTree_[a][b],goog.events.listenerTree_[a].count_--),0==goog.events.listenerTree_[a].count_&&delete goog.events.listenerTree_[a])}};
goog.events.removeAll=function(a,b){var c=0,d=null==b;if(null!=a){var e=goog.getUid(a);if(goog.events.sources_[e])for(var e=goog.events.sources_[e],f=e.length-1;0<=f;f--){var g=e[f];if(d||b==g.type)goog.events.unlistenByKey(g.key),c++}}else goog.object.forEach(goog.events.listeners_,function(a,b){goog.events.unlistenByKey(b);c++});return c};goog.events.getListeners=function(a,b,c){return goog.events.getListeners_(a,b,c)||[]};
goog.events.getListeners_=function(a,b,c){var d=goog.events.listenerTree_;return b in d&&(d=d[b],c in d&&(d=d[c],a=goog.getUid(a),d[a]))?d[a]:null};goog.events.getListener=function(a,b,c,d,e){d=!!d;if(a=goog.events.getListeners_(a,b,d))for(b=0;b<a.length;b++)if(!a[b].removed&&a[b].listener==c&&a[b].capture==d&&a[b].handler==e)return a[b];return null};
goog.events.hasListener=function(a,b,c){a=goog.getUid(a);var d=goog.events.sources_[a];if(d){var e=goog.isDef(b),f=goog.isDef(c);return e&&f?(d=goog.events.listenerTree_[b],!!d&&!!d[c]&&a in d[c]):!e&&!f?!0:goog.array.some(d,function(a){return e&&a.type==b||f&&a.capture==c})}return!1};goog.events.expose=function(a){var b=[],c;for(c in a)a[c]&&a[c].id?b.push(c+" = "+a[c]+" ("+a[c].id+")"):b.push(c+" = "+a[c]);return b.join("\n")};
goog.events.getOnString_=function(a){return a in goog.events.onStringMap_?goog.events.onStringMap_[a]:goog.events.onStringMap_[a]=goog.events.onString_+a};goog.events.fireListeners=function(a,b,c,d){var e=goog.events.listenerTree_;return b in e&&(e=e[b],c in e)?goog.events.fireListeners_(e[c],a,b,c,d):!0};
goog.events.fireListeners_=function(a,b,c,d,e){var f=1;b=goog.getUid(b);if(a[b]){a.remaining_--;a=a[b];a.locked_?a.locked_++:a.locked_=1;try{for(var g=a.length,h=0;h<g;h++){var i=a[h];i&&!i.removed&&(f&=!1!==goog.events.fireListener(i,e))}}finally{a.locked_--,goog.events.cleanUp_(c,d,b,a)}}return Boolean(f)};goog.events.fireListener=function(a,b){a.callOnce&&goog.events.unlistenByKey(a.key);return a.handleEvent(b)};goog.events.getTotalListenerCount=function(){return goog.object.getCount(goog.events.listeners_)};
goog.events.dispatchEvent=function(a,b){var c=b.type||b,d=goog.events.listenerTree_;if(!(c in d))return!0;if(goog.isString(b))b=new goog.events.Event(b,a);else if(b instanceof goog.events.Event)b.target=b.target||a;else{var e=b;b=new goog.events.Event(c,a);goog.object.extend(b,e)}var e=1,f,d=d[c],c=!0 in d,g;if(c){f=[];for(g=a;g;g=g.getParentEventTarget())f.push(g);g=d[!0];g.remaining_=g.count_;for(var h=f.length-1;!b.propagationStopped_&&0<=h&&g.remaining_;h--)b.currentTarget=f[h],e&=goog.events.fireListeners_(g,
f[h],b.type,!0,b)&&!1!=b.returnValue_}if(!1 in d)if(g=d[!1],g.remaining_=g.count_,c)for(h=0;!b.propagationStopped_&&h<f.length&&g.remaining_;h++)b.currentTarget=f[h],e&=goog.events.fireListeners_(g,f[h],b.type,!1,b)&&!1!=b.returnValue_;else for(d=a;!b.propagationStopped_&&d&&g.remaining_;d=d.getParentEventTarget())b.currentTarget=d,e&=goog.events.fireListeners_(g,d,b.type,!1,b)&&!1!=b.returnValue_;return Boolean(e)};
goog.events.protectBrowserEventEntryPoint=function(a){goog.events.handleBrowserEvent_=a.protectEntryPoint(goog.events.handleBrowserEvent_)};
goog.events.handleBrowserEvent_=function(a,b){if(!goog.events.listeners_[a])return!0;var c=goog.events.listeners_[a],d=c.type,e=goog.events.listenerTree_;if(!(d in e))return!0;var e=e[d],f,g;if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT){f=b||goog.getObjectByName("window.event");var h=!0 in e,i=!1 in e;if(h){if(goog.events.isMarkedIeEvent_(f))return!0;goog.events.markIeEvent_(f)}var j=new goog.events.BrowserEvent;j.init(f,this);f=!0;try{if(h){for(var k=[],l=j.currentTarget;l;l=l.parentNode)k.push(l);
g=e[!0];g.remaining_=g.count_;for(var m=k.length-1;!j.propagationStopped_&&0<=m&&g.remaining_;m--)j.currentTarget=k[m],f&=goog.events.fireListeners_(g,k[m],d,!0,j);if(i){g=e[!1];g.remaining_=g.count_;for(m=0;!j.propagationStopped_&&m<k.length&&g.remaining_;m++)j.currentTarget=k[m],f&=goog.events.fireListeners_(g,k[m],d,!1,j)}}else f=goog.events.fireListener(c,j)}finally{k&&(k.length=0)}return f}d=new goog.events.BrowserEvent(b,this);return f=goog.events.fireListener(c,d)};
goog.events.markIeEvent_=function(a){var b=!1;if(0==a.keyCode)try{a.keyCode=-1;return}catch(c){b=!0}if(b||void 0==a.returnValue)a.returnValue=!0};goog.events.isMarkedIeEvent_=function(a){return 0>a.keyCode||void 0!=a.returnValue};goog.events.uniqueIdCounter_=0;goog.events.getUniqueId=function(a){return a+"_"+goog.events.uniqueIdCounter_++};goog.debug.entryPointRegistry.register(function(a){goog.events.handleBrowserEvent_=a(goog.events.handleBrowserEvent_)});Blockly.renaming_map={};goog.dom={};goog.dom.classes={};goog.dom.classes.set=function(a,b){a.className=b};goog.dom.classes.get=function(a){a=a.className;return goog.isString(a)&&a.match(/\S+/g)||[]};goog.dom.classes.add=function(a,b){var c=goog.dom.classes.get(a),d=goog.array.slice(arguments,1),e=c.length+d.length;goog.dom.classes.add_(c,d);a.className=c.join(" ");return c.length==e};
goog.dom.classes.remove=function(a,b){var c=goog.dom.classes.get(a),d=goog.array.slice(arguments,1),e=goog.dom.classes.getDifference_(c,d);a.className=e.join(" ");return e.length==c.length-d.length};goog.dom.classes.add_=function(a,b){for(var c=0;c<b.length;c++)goog.array.contains(a,b[c])||a.push(b[c])};goog.dom.classes.getDifference_=function(a,b){return goog.array.filter(a,function(a){return!goog.array.contains(b,a)})};
goog.dom.classes.swap=function(a,b,c){for(var d=goog.dom.classes.get(a),e=!1,f=0;f<d.length;f++)d[f]==b&&(goog.array.splice(d,f--,1),e=!0);e&&(d.push(c),a.className=d.join(" "));return e};goog.dom.classes.addRemove=function(a,b,c){var d=goog.dom.classes.get(a);goog.isString(b)?goog.array.remove(d,b):goog.isArray(b)&&(d=goog.dom.classes.getDifference_(d,b));goog.isString(c)&&!goog.array.contains(d,c)?d.push(c):goog.isArray(c)&&goog.dom.classes.add_(d,c);a.className=d.join(" ")};
goog.dom.classes.has=function(a,b){return goog.array.contains(goog.dom.classes.get(a),b)};goog.dom.classes.enable=function(a,b,c){c?goog.dom.classes.add(a,b):goog.dom.classes.remove(a,b)};goog.dom.classes.toggle=function(a,b){var c=!goog.dom.classes.has(a,b);goog.dom.classes.enable(a,b,c);return c};goog.dom.TagName={A:"A",ABBR:"ABBR",ACRONYM:"ACRONYM",ADDRESS:"ADDRESS",APPLET:"APPLET",AREA:"AREA",ARTICLE:"ARTICLE",ASIDE:"ASIDE",AUDIO:"AUDIO",B:"B",BASE:"BASE",BASEFONT:"BASEFONT",BDI:"BDI",BDO:"BDO",BIG:"BIG",BLOCKQUOTE:"BLOCKQUOTE",BODY:"BODY",BR:"BR",BUTTON:"BUTTON",CANVAS:"CANVAS",CAPTION:"CAPTION",CENTER:"CENTER",CITE:"CITE",CODE:"CODE",COL:"COL",COLGROUP:"COLGROUP",COMMAND:"COMMAND",DATA:"DATA",DATALIST:"DATALIST",DD:"DD",DEL:"DEL",DETAILS:"DETAILS",DFN:"DFN",DIALOG:"DIALOG",DIR:"DIR",DIV:"DIV",
DL:"DL",DT:"DT",EM:"EM",EMBED:"EMBED",FIELDSET:"FIELDSET",FIGCAPTION:"FIGCAPTION",FIGURE:"FIGURE",FONT:"FONT",FOOTER:"FOOTER",FORM:"FORM",FRAME:"FRAME",FRAMESET:"FRAMESET",H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6",HEAD:"HEAD",HEADER:"HEADER",HGROUP:"HGROUP",HR:"HR",HTML:"HTML",I:"I",IFRAME:"IFRAME",IMG:"IMG",INPUT:"INPUT",INS:"INS",ISINDEX:"ISINDEX",KBD:"KBD",KEYGEN:"KEYGEN",LABEL:"LABEL",LEGEND:"LEGEND",LI:"LI",LINK:"LINK",MAP:"MAP",MARK:"MARK",MATH:"MATH",MENU:"MENU",META:"META",METER:"METER",
NAV:"NAV",NOFRAMES:"NOFRAMES",NOSCRIPT:"NOSCRIPT",OBJECT:"OBJECT",OL:"OL",OPTGROUP:"OPTGROUP",OPTION:"OPTION",OUTPUT:"OUTPUT",P:"P",PARAM:"PARAM",PRE:"PRE",PROGRESS:"PROGRESS",Q:"Q",RP:"RP",RT:"RT",RUBY:"RUBY",S:"S",SAMP:"SAMP",SCRIPT:"SCRIPT",SECTION:"SECTION",SELECT:"SELECT",SMALL:"SMALL",SOURCE:"SOURCE",SPAN:"SPAN",STRIKE:"STRIKE",STRONG:"STRONG",STYLE:"STYLE",SUB:"SUB",SUMMARY:"SUMMARY",SUP:"SUP",SVG:"SVG",TABLE:"TABLE",TBODY:"TBODY",TD:"TD",TEXTAREA:"TEXTAREA",TFOOT:"TFOOT",TH:"TH",THEAD:"THEAD",
TIME:"TIME",TITLE:"TITLE",TR:"TR",TRACK:"TRACK",TT:"TT",U:"U",UL:"UL",VAR:"VAR",VIDEO:"VIDEO",WBR:"WBR"};goog.math={};goog.math.Size=function(a,b){this.width=a;this.height=b};goog.math.Size.equals=function(a,b){return a==b?!0:!a||!b?!1:a.width==b.width&&a.height==b.height};goog.math.Size.prototype.clone=function(){return new goog.math.Size(this.width,this.height)};goog.DEBUG&&(goog.math.Size.prototype.toString=function(){return"("+this.width+" x "+this.height+")"});goog.math.Size.prototype.getLongest=function(){return Math.max(this.width,this.height)};
goog.math.Size.prototype.getShortest=function(){return Math.min(this.width,this.height)};goog.math.Size.prototype.area=function(){return this.width*this.height};goog.math.Size.prototype.perimeter=function(){return 2*(this.width+this.height)};goog.math.Size.prototype.aspectRatio=function(){return this.width/this.height};goog.math.Size.prototype.isEmpty=function(){return!this.area()};goog.math.Size.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
goog.math.Size.prototype.fitsInside=function(a){return this.width<=a.width&&this.height<=a.height};goog.math.Size.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};goog.math.Size.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Size.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.width*=a;this.height*=c;return this};
goog.math.Size.prototype.scaleToFit=function(a){a=this.aspectRatio()>a.aspectRatio()?a.width/this.width:a.height/this.height;return this.scale(a)};goog.dom.BrowserFeature={CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO&&!goog.userAgent.IE||goog.userAgent.IE&&goog.userAgent.isDocumentMode(9)||goog.userAgent.GECKO&&goog.userAgent.isVersion("1.9.1"),CAN_USE_INNER_TEXT:goog.userAgent.IE&&!goog.userAgent.isVersion("9"),CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE||goog.userAgent.OPERA||goog.userAgent.WEBKIT,INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};goog.math.randomInt=function(a){return Math.floor(Math.random()*a)};goog.math.uniformRandom=function(a,b){return a+Math.random()*(b-a)};goog.math.clamp=function(a,b,c){return Math.min(Math.max(a,b),c)};goog.math.modulo=function(a,b){var c=a%b;return 0>c*b?c+b:c};goog.math.lerp=function(a,b,c){return a+c*(b-a)};goog.math.nearlyEquals=function(a,b,c){return Math.abs(a-b)<=(c||1E-6)};goog.math.standardAngle=function(a){return goog.math.modulo(a,360)};
goog.math.toRadians=function(a){return a*Math.PI/180};goog.math.toDegrees=function(a){return 180*a/Math.PI};goog.math.angleDx=function(a,b){return b*Math.cos(goog.math.toRadians(a))};goog.math.angleDy=function(a,b){return b*Math.sin(goog.math.toRadians(a))};goog.math.angle=function(a,b,c,d){return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d-b,c-a)))};goog.math.angleDifference=function(a,b){var c=goog.math.standardAngle(b)-goog.math.standardAngle(a);180<c?c-=360:-180>=c&&(c=360+c);return c};
goog.math.sign=function(a){return 0==a?0:0>a?-1:1};goog.math.longestCommonSubsequence=function(a,b,c,d){c=c||function(a,b){return a==b};d=d||function(b,c){return a[b]};for(var e=a.length,f=b.length,g=[],h=0;h<e+1;h++)g[h]=[],g[h][0]=0;for(var i=0;i<f+1;i++)g[0][i]=0;for(h=1;h<=e;h++)for(i=1;i<=e;i++)g[h][i]=c(a[h-1],b[i-1])?g[h-1][i-1]+1:Math.max(g[h-1][i],g[h][i-1]);for(var j=[],h=e,i=f;0<h&&0<i;)c(a[h-1],b[i-1])?(j.unshift(d(h-1,i-1)),h--,i--):g[h-1][i]>g[h][i-1]?h--:i--;return j};
goog.math.sum=function(a){return goog.array.reduce(arguments,function(a,c){return a+c},0)};goog.math.average=function(a){return goog.math.sum.apply(null,arguments)/arguments.length};goog.math.standardDeviation=function(a){var b=arguments.length;if(2>b)return 0;var c=goog.math.average.apply(null,arguments),b=goog.math.sum.apply(null,goog.array.map(arguments,function(a){return Math.pow(a-c,2)}))/(b-1);return Math.sqrt(b)};goog.math.isInt=function(a){return isFinite(a)&&0==a%1};
goog.math.isFiniteNumber=function(a){return isFinite(a)&&!isNaN(a)};goog.math.Coordinate=function(a,b){this.x=goog.isDef(a)?a:0;this.y=goog.isDef(b)?b:0};goog.math.Coordinate.prototype.clone=function(){return new goog.math.Coordinate(this.x,this.y)};goog.DEBUG&&(goog.math.Coordinate.prototype.toString=function(){return"("+this.x+", "+this.y+")"});goog.math.Coordinate.equals=function(a,b){return a==b?!0:!a||!b?!1:a.x==b.x&&a.y==b.y};goog.math.Coordinate.distance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)};
goog.math.Coordinate.magnitude=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)};goog.math.Coordinate.azimuth=function(a){return goog.math.angle(0,0,a.x,a.y)};goog.math.Coordinate.squaredDistance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return c*c+d*d};goog.math.Coordinate.difference=function(a,b){return new goog.math.Coordinate(a.x-b.x,a.y-b.y)};goog.math.Coordinate.sum=function(a,b){return new goog.math.Coordinate(a.x+b.x,a.y+b.y)};
goog.math.Coordinate.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};goog.math.Coordinate.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};goog.math.Coordinate.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};goog.math.Coordinate.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.x+=a.x,this.y+=a.y):(this.x+=a,goog.isNumber(b)&&(this.y+=b));return this};
goog.math.Coordinate.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.x*=a;this.y*=c;return this};goog.dom.ASSUME_QUIRKS_MODE=!1;goog.dom.ASSUME_STANDARDS_MODE=!1;goog.dom.COMPAT_MODE_KNOWN_=goog.dom.ASSUME_QUIRKS_MODE||goog.dom.ASSUME_STANDARDS_MODE;goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.dom.getDomHelper=function(a){return a?new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)):goog.dom.defaultDomHelper_||(goog.dom.defaultDomHelper_=new goog.dom.DomHelper)};
goog.dom.getDocument=function(){return document};goog.dom.getElement=function(a){return goog.isString(a)?document.getElementById(a):a};goog.dom.$=goog.dom.getElement;goog.dom.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(document,a,b,c)};
goog.dom.getElementsByClass=function(a,b){var c=b||document;return goog.dom.canUseQuerySelector_(c)?c.querySelectorAll("."+a):c.getElementsByClassName?c.getElementsByClassName(a):goog.dom.getElementsByTagNameAndClass_(document,"*",a,b)};goog.dom.getElementByClass=function(a,b){var c=b||document,d=null;return(d=goog.dom.canUseQuerySelector_(c)?c.querySelector("."+a):goog.dom.getElementsByClass(a,b)[0])||null};goog.dom.canUseQuerySelector_=function(a){return!(!a.querySelectorAll||!a.querySelector)};
goog.dom.getElementsByTagNameAndClass_=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(goog.dom.canUseQuerySelector_(a)&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,g;g=a[f];f++)b==g.nodeName&&(d[e++]=g);d.length=e;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;g=a[f];f++)b=g.className,"function"==typeof b.split&&goog.array.contains(b.split(/\s+/),c)&&(d[e++]=g);d.length=
e;return d}return a};goog.dom.$$=goog.dom.getElementsByTagNameAndClass;goog.dom.setProperties=function(a,b){goog.object.forEach(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in goog.dom.DIRECT_ATTRIBUTE_MAP_?a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d],b):goog.string.startsWith(d,"aria-")||goog.string.startsWith(d,"data-")?a.setAttribute(d,b):a[d]=b})};
goog.dom.DIRECT_ATTRIBUTE_MAP_={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};goog.dom.getViewportSize=function(a){return goog.dom.getViewportSize_(a||window)};goog.dom.getViewportSize_=function(a){a=a.document;a=goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body;return new goog.math.Size(a.clientWidth,a.clientHeight)};
goog.dom.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(window)};goog.dom.getDocumentHeight_=function(a){var b=a.document,c=0;if(b){a=goog.dom.getViewportSize_(a).height;var c=b.body,d=b.documentElement;if(goog.dom.isCss1CompatMode_(b)&&d.scrollHeight)c=d.scrollHeight!=a?d.scrollHeight:d.offsetHeight;else{var b=d.scrollHeight,e=d.offsetHeight;d.clientHeight!=e&&(b=c.scrollHeight,e=c.offsetHeight);c=b>a?b>e?b:e:b<e?b:e}}return c};
goog.dom.getPageScroll=function(a){return goog.dom.getDomHelper((a||goog.global||window).document).getDocumentScroll()};goog.dom.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(document)};goog.dom.getDocumentScroll_=function(a){var b=goog.dom.getDocumentScrollElement_(a);a=goog.dom.getWindow_(a);return new goog.math.Coordinate(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)};goog.dom.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(document)};
goog.dom.getDocumentScrollElement_=function(a){return!goog.userAgent.WEBKIT&&goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body};goog.dom.getWindow=function(a){return a?goog.dom.getWindow_(a):window};goog.dom.getWindow_=function(a){return a.parentWindow||a.defaultView};goog.dom.createDom=function(a,b,c){return goog.dom.createDom_(document,arguments)};
goog.dom.createDom_=function(a,b){var c=b[0],d=b[1];if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',goog.string.htmlEscape(d.name),'"');if(d.type){c.push(' type="',goog.string.htmlEscape(d.type),'"');var e={};goog.object.extend(e,d);delete e.type;d=e}c.push(">");c=c.join("")}c=a.createElement(c);d&&(goog.isString(d)?c.className=d:goog.isArray(d)?goog.dom.classes.add.apply(null,[c].concat(d)):goog.dom.setProperties(c,d));2<b.length&&
goog.dom.append_(a,c,b,2);return c};goog.dom.append_=function(a,b,c,d){function e(c){c&&b.appendChild(goog.isString(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var f=c[d];goog.isArrayLike(f)&&!goog.dom.isNodeLike(f)?goog.array.forEach(goog.dom.isNodeList(f)?goog.array.toArray(f):f,e):e(f)}};goog.dom.$dom=goog.dom.createDom;goog.dom.createElement=function(a){return document.createElement(a)};goog.dom.createTextNode=function(a){return document.createTextNode(a)};
goog.dom.createTable=function(a,b,c){return goog.dom.createTable_(document,a,b,!!c)};goog.dom.createTable_=function(a,b,c,d){for(var e=["<tr>"],f=0;f<c;f++)e.push(d?"<td>&nbsp;</td>":"<td></td>");e.push("</tr>");e=e.join("");c=["<table>"];for(f=0;f<b;f++)c.push(e);c.push("</table>");a=a.createElement(goog.dom.TagName.DIV);a.innerHTML=c.join("");return a.removeChild(a.firstChild)};goog.dom.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(document,a)};
goog.dom.htmlToDocumentFragment_=function(a,b){var c=a.createElement("div");goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT?(c.innerHTML="<br>"+b,c.removeChild(c.firstChild)):c.innerHTML=b;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(var d=a.createDocumentFragment();c.firstChild;)d.appendChild(c.firstChild);return d};goog.dom.getCompatMode=function(){return goog.dom.isCss1CompatMode()?"CSS1Compat":"BackCompat"};goog.dom.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(document)};
goog.dom.isCss1CompatMode_=function(a){return goog.dom.COMPAT_MODE_KNOWN_?goog.dom.ASSUME_STANDARDS_MODE:"CSS1Compat"==a.compatMode};goog.dom.canHaveChildren=function(a){if(a.nodeType!=goog.dom.NodeType.ELEMENT)return!1;switch(a.tagName){case goog.dom.TagName.APPLET:case goog.dom.TagName.AREA:case goog.dom.TagName.BASE:case goog.dom.TagName.BR:case goog.dom.TagName.COL:case goog.dom.TagName.COMMAND:case goog.dom.TagName.EMBED:case goog.dom.TagName.FRAME:case goog.dom.TagName.HR:case goog.dom.TagName.IMG:case goog.dom.TagName.INPUT:case goog.dom.TagName.IFRAME:case goog.dom.TagName.ISINDEX:case goog.dom.TagName.KEYGEN:case goog.dom.TagName.LINK:case goog.dom.TagName.NOFRAMES:case goog.dom.TagName.NOSCRIPT:case goog.dom.TagName.META:case goog.dom.TagName.OBJECT:case goog.dom.TagName.PARAM:case goog.dom.TagName.SCRIPT:case goog.dom.TagName.SOURCE:case goog.dom.TagName.STYLE:case goog.dom.TagName.TRACK:case goog.dom.TagName.WBR:return!1}return!0};
goog.dom.appendChild=function(a,b){a.appendChild(b)};goog.dom.append=function(a,b){goog.dom.append_(goog.dom.getOwnerDocument(a),a,arguments,1)};goog.dom.removeChildren=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};goog.dom.insertSiblingBefore=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)};goog.dom.insertSiblingAfter=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)};goog.dom.insertChildAt=function(a,b,c){a.insertBefore(b,a.childNodes[c]||null)};
goog.dom.removeNode=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};goog.dom.replaceNode=function(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)};goog.dom.flattenElement=function(a){var b,c=a.parentNode;if(c&&c.nodeType!=goog.dom.NodeType.DOCUMENT_FRAGMENT){if(a.removeNode)return a.removeNode(!1);for(;b=a.firstChild;)c.insertBefore(b,a);return goog.dom.removeNode(a)}};
goog.dom.getChildren=function(a){return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE&&void 0!=a.children?a.children:goog.array.filter(a.childNodes,function(a){return a.nodeType==goog.dom.NodeType.ELEMENT})};goog.dom.getFirstElementChild=function(a){return void 0!=a.firstElementChild?a.firstElementChild:goog.dom.getNextElementNode_(a.firstChild,!0)};goog.dom.getLastElementChild=function(a){return void 0!=a.lastElementChild?a.lastElementChild:goog.dom.getNextElementNode_(a.lastChild,!1)};
goog.dom.getNextElementSibling=function(a){return void 0!=a.nextElementSibling?a.nextElementSibling:goog.dom.getNextElementNode_(a.nextSibling,!0)};goog.dom.getPreviousElementSibling=function(a){return void 0!=a.previousElementSibling?a.previousElementSibling:goog.dom.getNextElementNode_(a.previousSibling,!1)};goog.dom.getNextElementNode_=function(a,b){for(;a&&a.nodeType!=goog.dom.NodeType.ELEMENT;)a=b?a.nextSibling:a.previousSibling;return a};
goog.dom.getNextNode=function(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null};goog.dom.getPreviousNode=function(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a};goog.dom.isNodeLike=function(a){return goog.isObject(a)&&0<a.nodeType};goog.dom.isElement=function(a){return goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT};
goog.dom.isWindow=function(a){return goog.isObject(a)&&a.window==a};goog.dom.getParentElement=function(a){if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY)return a.parentElement;a=a.parentNode;return goog.dom.isElement(a)?a:null};goog.dom.contains=function(a,b){if(a.contains&&b.nodeType==goog.dom.NodeType.ELEMENT)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};
goog.dom.compareNodeOrder=function(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if(goog.userAgent.IE&&!goog.userAgent.isDocumentMode(9)){if(a.nodeType==goog.dom.NodeType.DOCUMENT)return-1;if(b.nodeType==goog.dom.NodeType.DOCUMENT)return 1}if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=a.nodeType==goog.dom.NodeType.ELEMENT,d=b.nodeType==goog.dom.NodeType.ELEMENT;if(c&&d)return a.sourceIndex-b.sourceIndex;var e=a.parentNode,f=
b.parentNode;return e==f?goog.dom.compareSiblingOrder_(a,b):!c&&goog.dom.contains(e,b)?-1*goog.dom.compareParentsDescendantNodeIe_(a,b):!d&&goog.dom.contains(f,a)?goog.dom.compareParentsDescendantNodeIe_(b,a):(c?a.sourceIndex:e.sourceIndex)-(d?b.sourceIndex:f.sourceIndex)}d=goog.dom.getOwnerDocument(a);c=d.createRange();c.selectNode(a);c.collapse(!0);d=d.createRange();d.selectNode(b);d.collapse(!0);return c.compareBoundaryPoints(goog.global.Range.START_TO_END,d)};
goog.dom.compareParentsDescendantNodeIe_=function(a,b){var c=a.parentNode;if(c==b)return-1;for(var d=b;d.parentNode!=c;)d=d.parentNode;return goog.dom.compareSiblingOrder_(d,a)};goog.dom.compareSiblingOrder_=function(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1};
goog.dom.findCommonAncestor=function(a){var b,c=arguments.length;if(c){if(1==c)return arguments[0]}else return null;var d=[],e=Infinity;for(b=0;b<c;b++){for(var f=[],g=arguments[b];g;)f.unshift(g),g=g.parentNode;d.push(f);e=Math.min(e,f.length)}f=null;for(b=0;b<e;b++){for(var g=d[0][b],h=1;h<c;h++)if(g!=d[h][b])return f;f=g}return f};goog.dom.getOwnerDocument=function(a){return a.nodeType==goog.dom.NodeType.DOCUMENT?a:a.ownerDocument||a.document};
goog.dom.getFrameContentDocument=function(a){return a.contentDocument||a.contentWindow.document};goog.dom.getFrameContentWindow=function(a){return a.contentWindow||goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))};
goog.dom.setTextContent=function(a,b){if("textContent"in a)a.textContent=b;else if(a.firstChild&&a.firstChild.nodeType==goog.dom.NodeType.TEXT){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{goog.dom.removeChildren(a);var c=goog.dom.getOwnerDocument(a);a.appendChild(c.createTextNode(b))}};goog.dom.getOuterHtml=function(a){if("outerHTML"in a)return a.outerHTML;var b=goog.dom.getOwnerDocument(a).createElement("div");b.appendChild(a.cloneNode(!0));return b.innerHTML};
goog.dom.findNode=function(a,b){var c=[];return goog.dom.findNodes_(a,b,c,!0)?c[0]:void 0};goog.dom.findNodes=function(a,b){var c=[];goog.dom.findNodes_(a,b,c,!1);return c};goog.dom.findNodes_=function(a,b,c,d){if(null!=a)for(a=a.firstChild;a;){if(b(a)&&(c.push(a),d)||goog.dom.findNodes_(a,b,c,d))return!0;a=a.nextSibling}return!1};goog.dom.TAGS_TO_IGNORE_={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};goog.dom.PREDEFINED_TAG_VALUES_={IMG:" ",BR:"\n"};
goog.dom.isFocusableTabIndex=function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?(a=a.tabIndex,goog.isNumber(a)&&0<=a&&32768>a):!1};goog.dom.setFocusableTabIndex=function(a,b){b?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))};
goog.dom.getTextContent=function(a){if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT&&"innerText"in a)a=goog.string.canonicalizeNewlines(a.innerText);else{var b=[];goog.dom.getTextContent_(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");goog.dom.BrowserFeature.CAN_USE_INNER_TEXT||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a};goog.dom.getRawTextContent=function(a){var b=[];goog.dom.getTextContent_(a,b,!1);return b.join("")};
goog.dom.getTextContent_=function(a,b,c){if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))if(a.nodeType==goog.dom.NodeType.TEXT)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);else for(a=a.firstChild;a;)goog.dom.getTextContent_(a,b,c),a=a.nextSibling};goog.dom.getNodeTextLength=function(a){return goog.dom.getTextContent(a).length};
goog.dom.getNodeTextOffset=function(a,b){for(var c=b||goog.dom.getOwnerDocument(a).body,d=[];a&&a!=c;){for(var e=a;e=e.previousSibling;)d.unshift(goog.dom.getTextContent(e));a=a.parentNode}return goog.string.trimLeft(d.join("")).replace(/ +/g," ").length};
goog.dom.getNodeAtOffset=function(a,b,c){a=[a];for(var d=0,e=null;0<a.length&&d<b;)if(e=a.pop(),!(e.nodeName in goog.dom.TAGS_TO_IGNORE_))if(e.nodeType==goog.dom.NodeType.TEXT)var f=e.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," "),d=d+f.length;else if(e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)d+=goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;else for(f=e.childNodes.length-1;0<=f;f--)a.push(e.childNodes[f]);goog.isObject(c)&&(c.remainder=e?e.nodeValue.length+b-d-1:0,c.node=e);return e};
goog.dom.isNodeList=function(a){if(a&&"number"==typeof a.length){if(goog.isObject(a))return"function"==typeof a.item||"string"==typeof a.item;if(goog.isFunction(a))return"function"==typeof a.item}return!1};goog.dom.getAncestorByTagNameAndClass=function(a,b,c){if(!b&&!c)return null;var d=b?b.toUpperCase():null;return goog.dom.getAncestor(a,function(a){return(!d||a.nodeName==d)&&(!c||goog.dom.classes.has(a,c))},!0)};
goog.dom.getAncestorByClass=function(a,b){return goog.dom.getAncestorByTagNameAndClass(a,null,b)};goog.dom.getAncestor=function(a,b,c,d){c||(a=a.parentNode);c=null==d;for(var e=0;a&&(c||e<=d);){if(b(a))return a;a=a.parentNode;e++}return null};goog.dom.getActiveElement=function(a){try{return a&&a.activeElement}catch(b){}return null};goog.dom.DomHelper=function(a){this.document_=a||goog.global.document||document};goog.dom.DomHelper.prototype.getDomHelper=goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument=function(a){this.document_=a};goog.dom.DomHelper.prototype.getDocument=function(){return this.document_};goog.dom.DomHelper.prototype.getElement=function(a){return goog.isString(a)?this.document_.getElementById(a):a};goog.dom.DomHelper.prototype.$=goog.dom.DomHelper.prototype.getElement;goog.dom.DomHelper.prototype.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(this.document_,a,b,c)};
goog.dom.DomHelper.prototype.getElementsByClass=function(a,b){return goog.dom.getElementsByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.getElementByClass=function(a,b){return goog.dom.getElementByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.$$=goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;goog.dom.DomHelper.prototype.setProperties=goog.dom.setProperties;goog.dom.DomHelper.prototype.getViewportSize=function(a){return goog.dom.getViewportSize(a||this.getWindow())};
goog.dom.DomHelper.prototype.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(this.getWindow())};goog.dom.DomHelper.prototype.createDom=function(a,b,c){return goog.dom.createDom_(this.document_,arguments)};goog.dom.DomHelper.prototype.$dom=goog.dom.DomHelper.prototype.createDom;goog.dom.DomHelper.prototype.createElement=function(a){return this.document_.createElement(a)};goog.dom.DomHelper.prototype.createTextNode=function(a){return this.document_.createTextNode(a)};
goog.dom.DomHelper.prototype.createTable=function(a,b,c){return goog.dom.createTable_(this.document_,a,b,!!c)};goog.dom.DomHelper.prototype.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(this.document_,a)};goog.dom.DomHelper.prototype.getCompatMode=function(){return this.isCss1CompatMode()?"CSS1Compat":"BackCompat"};goog.dom.DomHelper.prototype.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(this.document_)};goog.dom.DomHelper.prototype.getWindow=function(){return goog.dom.getWindow_(this.document_)};
goog.dom.DomHelper.prototype.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(this.document_)};goog.dom.DomHelper.prototype.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(this.document_)};goog.dom.DomHelper.prototype.getActiveElement=function(a){return goog.dom.getActiveElement(a||this.document_)};goog.dom.DomHelper.prototype.appendChild=goog.dom.appendChild;goog.dom.DomHelper.prototype.append=goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren=goog.dom.canHaveChildren;goog.dom.DomHelper.prototype.removeChildren=goog.dom.removeChildren;goog.dom.DomHelper.prototype.insertSiblingBefore=goog.dom.insertSiblingBefore;goog.dom.DomHelper.prototype.insertSiblingAfter=goog.dom.insertSiblingAfter;goog.dom.DomHelper.prototype.insertChildAt=goog.dom.insertChildAt;goog.dom.DomHelper.prototype.removeNode=goog.dom.removeNode;goog.dom.DomHelper.prototype.replaceNode=goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement=goog.dom.flattenElement;goog.dom.DomHelper.prototype.getChildren=goog.dom.getChildren;goog.dom.DomHelper.prototype.getFirstElementChild=goog.dom.getFirstElementChild;goog.dom.DomHelper.prototype.getLastElementChild=goog.dom.getLastElementChild;goog.dom.DomHelper.prototype.getNextElementSibling=goog.dom.getNextElementSibling;goog.dom.DomHelper.prototype.getPreviousElementSibling=goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode=goog.dom.getNextNode;goog.dom.DomHelper.prototype.getPreviousNode=goog.dom.getPreviousNode;goog.dom.DomHelper.prototype.isNodeLike=goog.dom.isNodeLike;goog.dom.DomHelper.prototype.isElement=goog.dom.isElement;goog.dom.DomHelper.prototype.isWindow=goog.dom.isWindow;goog.dom.DomHelper.prototype.getParentElement=goog.dom.getParentElement;goog.dom.DomHelper.prototype.contains=goog.dom.contains;goog.dom.DomHelper.prototype.compareNodeOrder=goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor=goog.dom.findCommonAncestor;goog.dom.DomHelper.prototype.getOwnerDocument=goog.dom.getOwnerDocument;goog.dom.DomHelper.prototype.getFrameContentDocument=goog.dom.getFrameContentDocument;goog.dom.DomHelper.prototype.getFrameContentWindow=goog.dom.getFrameContentWindow;goog.dom.DomHelper.prototype.setTextContent=goog.dom.setTextContent;goog.dom.DomHelper.prototype.getOuterHtml=goog.dom.getOuterHtml;goog.dom.DomHelper.prototype.findNode=goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes=goog.dom.findNodes;goog.dom.DomHelper.prototype.isFocusableTabIndex=goog.dom.isFocusableTabIndex;goog.dom.DomHelper.prototype.setFocusableTabIndex=goog.dom.setFocusableTabIndex;goog.dom.DomHelper.prototype.getTextContent=goog.dom.getTextContent;goog.dom.DomHelper.prototype.getNodeTextLength=goog.dom.getNodeTextLength;goog.dom.DomHelper.prototype.getNodeTextOffset=goog.dom.getNodeTextOffset;goog.dom.DomHelper.prototype.getNodeAtOffset=goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList=goog.dom.isNodeList;goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass=goog.dom.getAncestorByTagNameAndClass;goog.dom.DomHelper.prototype.getAncestorByClass=goog.dom.getAncestorByClass;goog.dom.DomHelper.prototype.getAncestor=goog.dom.getAncestor;goog.color={};
goog.color.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",
darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",
seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};goog.color.parse=function(a){var b={};a=String(a);var c=goog.color.prependHashIfNecessaryHelper(a);if(goog.color.isValidHexColor_(c))return b.hex=goog.color.normalizeHex(c),b.type="hex",b;c=goog.color.isValidRgbColor_(a);if(c.length)return b.hex=goog.color.rgbArrayToHex(c),b.type="rgb",b;if(goog.color.names&&(c=goog.color.names[a.toLowerCase()]))return b.hex=c,b.type="named",b;throw Error(a+" is not a valid color string");};
goog.color.isValidColor=function(a){var b=goog.color.prependHashIfNecessaryHelper(a);return!(!goog.color.isValidHexColor_(b)&&!(goog.color.isValidRgbColor_(a).length||goog.color.names&&goog.color.names[a.toLowerCase()]))};goog.color.parseRgb=function(a){var b=goog.color.isValidRgbColor_(a);if(!b.length)throw Error(a+" is not a valid RGB color");return b};goog.color.hexToRgbStyle=function(a){return goog.color.rgbStyle_(goog.color.hexToRgb(a))};goog.color.hexTripletRe_=/#(.)(.)(.)/;
goog.color.normalizeHex=function(a){if(!goog.color.isValidHexColor_(a))throw Error("'"+a+"' is not a valid hex color");4==a.length&&(a=a.replace(goog.color.hexTripletRe_,"#$1$1$2$2$3$3"));return a.toLowerCase()};goog.color.hexToRgb=function(a){a=goog.color.normalizeHex(a);var b=parseInt(a.substr(1,2),16),c=parseInt(a.substr(3,2),16);a=parseInt(a.substr(5,2),16);return[b,c,a]};
goog.color.rgbToHex=function(a,b,c){a=Number(a);b=Number(b);c=Number(c);if(isNaN(a)||0>a||255<a||isNaN(b)||0>b||255<b||isNaN(c)||0>c||255<c)throw Error('"('+a+","+b+","+c+'") is not a valid RGB color');a=goog.color.prependZeroIfNecessaryHelper(a.toString(16));b=goog.color.prependZeroIfNecessaryHelper(b.toString(16));c=goog.color.prependZeroIfNecessaryHelper(c.toString(16));return"#"+a+b+c};goog.color.rgbArrayToHex=function(a){return goog.color.rgbToHex(a[0],a[1],a[2])};
goog.color.rgbToHsl=function(a,b,c){a/=255;b/=255;c/=255;var d=Math.max(a,b,c),e=Math.min(a,b,c),f=0,g=0,h=0.5*(d+e);d!=e&&(d==a?f=60*(b-c)/(d-e):d==b?f=60*(c-a)/(d-e)+120:d==c&&(f=60*(a-b)/(d-e)+240),g=0<h&&0.5>=h?(d-e)/(2*h):(d-e)/(2-2*h));return[Math.round(f+360)%360,g,h]};goog.color.rgbArrayToHsl=function(a){return goog.color.rgbToHsl(a[0],a[1],a[2])};goog.color.hueToRgb_=function(a,b,c){0>c?c+=1:1<c&&(c-=1);return 1>6*c?a+6*(b-a)*c:1>2*c?b:2>3*c?a+6*(b-a)*(2/3-c):a};
goog.color.hslToRgb=function(a,b,c){var d=0,e=0,f=0;a/=360;if(0==b)d=e=f=255*c;else var g=f=0,g=0.5>c?c*(1+b):c+b-b*c,f=2*c-g,d=255*goog.color.hueToRgb_(f,g,a+1/3),e=255*goog.color.hueToRgb_(f,g,a),f=255*goog.color.hueToRgb_(f,g,a-1/3);return[Math.round(d),Math.round(e),Math.round(f)]};goog.color.hslArrayToRgb=function(a){return goog.color.hslToRgb(a[0],a[1],a[2])};goog.color.validHexColorRe_=/^#(?:[0-9a-f]{3}){1,2}$/i;goog.color.isValidHexColor_=function(a){return goog.color.validHexColorRe_.test(a)};
goog.color.normalizedHexColorRe_=/^#[0-9a-f]{6}$/;goog.color.isNormalizedHexColor_=function(a){return goog.color.normalizedHexColorRe_.test(a)};goog.color.rgbColorRe_=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;goog.color.isValidRgbColor_=function(a){var b=a.match(goog.color.rgbColorRe_);if(b){a=Number(b[1]);var c=Number(b[2]),b=Number(b[3]);if(0<=a&&255>=a&&0<=c&&255>=c&&0<=b&&255>=b)return[a,c,b]}return[]};
goog.color.prependZeroIfNecessaryHelper=function(a){return 1==a.length?"0"+a:a};goog.color.prependHashIfNecessaryHelper=function(a){return"#"==a.charAt(0)?a:"#"+a};goog.color.rgbStyle_=function(a){return"rgb("+a.join(",")+")"};
goog.color.hsvToRgb=function(a,b,c){var d=0,e=0,f=0;if(0==b)f=e=d=c;else{var g=Math.floor(a/60),h=a/60-g;a=c*(1-b);var i=c*(1-b*h);b=c*(1-b*(1-h));switch(g){case 1:d=i;e=c;f=a;break;case 2:d=a;e=c;f=b;break;case 3:d=a;e=i;f=c;break;case 4:d=b;e=a;f=c;break;case 5:d=c;e=a;f=i;break;case 6:case 0:d=c,e=b,f=a}}return[Math.floor(d),Math.floor(e),Math.floor(f)]};
goog.color.rgbToHsv=function(a,b,c){var d=Math.max(Math.max(a,b),c),e=Math.min(Math.min(a,b),c);if(e==d)e=a=0;else{var f=d-e,e=f/d;a=60*(a==d?(b-c)/f:b==d?2+(c-a)/f:4+(a-b)/f);0>a&&(a+=360);360<a&&(a-=360)}return[a,e,d]};goog.color.rgbArrayToHsv=function(a){return goog.color.rgbToHsv(a[0],a[1],a[2])};goog.color.hsvArrayToRgb=function(a){return goog.color.hsvToRgb(a[0],a[1],a[2])};goog.color.hexToHsl=function(a){a=goog.color.hexToRgb(a);return goog.color.rgbToHsl(a[0],a[1],a[2])};
goog.color.hslToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a,b,c))};goog.color.hslArrayToHex=function(a){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0],a[1],a[2]))};goog.color.hexToHsv=function(a){return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))};goog.color.hsvToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a,b,c))};goog.color.hsvArrayToHex=function(a){return goog.color.hsvToHex(a[0],a[1],a[2])};
goog.color.hslDistance=function(a,b){var c,d;c=0.5>=a[2]?a[1]*a[2]:a[1]*(1-a[2]);d=0.5>=b[2]?b[1]*b[2]:b[1]*(1-b[2]);return(a[2]-b[2])*(a[2]-b[2])+c*c+d*d-2*c*d*Math.cos(2*(a[0]/360-b[0]/360)*Math.PI)};goog.color.blend=function(a,b,c){c=goog.math.clamp(c,0,1);return[Math.round(c*a[0]+(1-c)*b[0]),Math.round(c*a[1]+(1-c)*b[1]),Math.round(c*a[2]+(1-c)*b[2])]};goog.color.darken=function(a,b){return goog.color.blend([0,0,0],a,b)};
goog.color.lighten=function(a,b){return goog.color.blend([255,255,255],a,b)};goog.color.highContrast=function(a,b){for(var c=[],d=0;d<b.length;d++)c.push({color:b[d],diff:goog.color.yiqBrightnessDiff_(b[d],a)+goog.color.colorDiff_(b[d],a)});c.sort(function(a,b){return b.diff-a.diff});return c[0].color};goog.color.yiqBrightness_=function(a){return Math.round((299*a[0]+587*a[1]+114*a[2])/1E3)};goog.color.yiqBrightnessDiff_=function(a,b){return Math.abs(goog.color.yiqBrightness_(a)-goog.color.yiqBrightness_(b))};
goog.color.colorDiff_=function(a,b){return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2])};goog.math.Box=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};goog.math.Box.boundingBox=function(a){for(var b=new goog.math.Box(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x),c=1;c<arguments.length;c++){var d=arguments[c];b.top=Math.min(b.top,d.y);b.right=Math.max(b.right,d.x);b.bottom=Math.max(b.bottom,d.y);b.left=Math.min(b.left,d.x)}return b};goog.math.Box.prototype.clone=function(){return new goog.math.Box(this.top,this.right,this.bottom,this.left)};
goog.DEBUG&&(goog.math.Box.prototype.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"});goog.math.Box.prototype.contains=function(a){return goog.math.Box.contains(this,a)};goog.math.Box.prototype.expand=function(a,b,c,d){goog.isObject(a)?(this.top-=a.top,this.right+=a.right,this.bottom+=a.bottom,this.left-=a.left):(this.top-=a,this.right+=b,this.bottom+=c,this.left-=d);return this};
goog.math.Box.prototype.expandToInclude=function(a){this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.right=Math.max(this.right,a.right);this.bottom=Math.max(this.bottom,a.bottom)};goog.math.Box.equals=function(a,b){return a==b?!0:!a||!b?!1:a.top==b.top&&a.right==b.right&&a.bottom==b.bottom&&a.left==b.left};
goog.math.Box.contains=function(a,b){return!a||!b?!1:b instanceof goog.math.Box?b.left>=a.left&&b.right<=a.right&&b.top>=a.top&&b.bottom<=a.bottom:b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom};goog.math.Box.relativePositionX=function(a,b){return b.x<a.left?b.x-a.left:b.x>a.right?b.x-a.right:0};goog.math.Box.relativePositionY=function(a,b){return b.y<a.top?b.y-a.top:b.y>a.bottom?b.y-a.bottom:0};
goog.math.Box.distance=function(a,b){var c=goog.math.Box.relativePositionX(a,b),d=goog.math.Box.relativePositionY(a,b);return Math.sqrt(c*c+d*d)};goog.math.Box.intersects=function(a,b){return a.left<=b.right&&b.left<=a.right&&a.top<=b.bottom&&b.top<=a.bottom};goog.math.Box.intersectsWithPadding=function(a,b,c){return a.left<=b.right+c&&b.left<=a.right+c&&a.top<=b.bottom+c&&b.top<=a.bottom+c};
goog.math.Box.prototype.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};goog.math.Box.prototype.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
goog.math.Box.prototype.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};goog.math.Box.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.right+=a.x,this.top+=a.y,this.bottom+=a.y):(this.left+=a,this.right+=a,goog.isNumber(b)&&(this.top+=b,this.bottom+=b));return this};
goog.math.Box.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};goog.math.Rect=function(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d};goog.math.Rect.prototype.clone=function(){return new goog.math.Rect(this.left,this.top,this.width,this.height)};goog.math.Rect.prototype.toBox=function(){return new goog.math.Box(this.top,this.left+this.width,this.top+this.height,this.left)};goog.math.Rect.createFromBox=function(a){return new goog.math.Rect(a.left,a.top,a.right-a.left,a.bottom-a.top)};
goog.DEBUG&&(goog.math.Rect.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"});goog.math.Rect.equals=function(a,b){return a==b?!0:!a||!b?!1:a.left==b.left&&a.width==b.width&&a.top==b.top&&a.height==b.height};
goog.math.Rect.prototype.intersection=function(a){var b=Math.max(this.left,a.left),c=Math.min(this.left+this.width,a.left+a.width);if(b<=c){var d=Math.max(this.top,a.top);a=Math.min(this.top+this.height,a.top+a.height);if(d<=a)return this.left=b,this.top=d,this.width=c-b,this.height=a-d,!0}return!1};
goog.math.Rect.intersection=function(a,b){var c=Math.max(a.left,b.left),d=Math.min(a.left+a.width,b.left+b.width);if(c<=d){var e=Math.max(a.top,b.top),f=Math.min(a.top+a.height,b.top+b.height);if(e<=f)return new goog.math.Rect(c,e,d-c,f-e)}return null};goog.math.Rect.intersects=function(a,b){return a.left<=b.left+b.width&&b.left<=a.left+a.width&&a.top<=b.top+b.height&&b.top<=a.top+a.height};goog.math.Rect.prototype.intersects=function(a){return goog.math.Rect.intersects(this,a)};
goog.math.Rect.difference=function(a,b){var c=goog.math.Rect.intersection(a,b);if(!c||!c.height||!c.width)return[a.clone()];var c=[],d=a.top,e=a.height,f=a.left+a.width,g=a.top+a.height,h=b.left+b.width,i=b.top+b.height;b.top>a.top&&(c.push(new goog.math.Rect(a.left,a.top,a.width,b.top-a.top)),d=b.top,e-=b.top-a.top);i<g&&(c.push(new goog.math.Rect(a.left,i,a.width,g-i)),e=i-d);b.left>a.left&&c.push(new goog.math.Rect(a.left,d,b.left-a.left,e));h<f&&c.push(new goog.math.Rect(h,d,f-h,e));return c};
goog.math.Rect.prototype.difference=function(a){return goog.math.Rect.difference(this,a)};goog.math.Rect.prototype.boundingRect=function(a){var b=Math.max(this.left+this.width,a.left+a.width),c=Math.max(this.top+this.height,a.top+a.height);this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.width=b-this.left;this.height=c-this.top};goog.math.Rect.boundingRect=function(a,b){if(!a||!b)return null;var c=a.clone();c.boundingRect(b);return c};
goog.math.Rect.prototype.contains=function(a){return a instanceof goog.math.Rect?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};goog.math.Rect.prototype.getSize=function(){return new goog.math.Size(this.width,this.height)};
goog.math.Rect.prototype.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};goog.math.Rect.prototype.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
goog.math.Rect.prototype.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Rect.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.top+=a.y):(this.left+=a,goog.isNumber(b)&&(this.top+=b));return this};goog.math.Rect.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.width*=a;this.top*=c;this.height*=c;return this};goog.dom.vendor={};goog.dom.vendor.getVendorJsPrefix=function(){return goog.userAgent.WEBKIT?"Webkit":goog.userAgent.GECKO?"Moz":goog.userAgent.IE?"ms":goog.userAgent.OPERA?"O":null};goog.dom.vendor.getVendorPrefix=function(){return goog.userAgent.WEBKIT?"-webkit":goog.userAgent.GECKO?"-moz":goog.userAgent.IE?"-ms":goog.userAgent.OPERA?"-o":null};goog.style={};goog.style.setStyle=function(a,b,c){goog.isString(b)?goog.style.setStyle_(a,c,b):goog.object.forEach(b,goog.partial(goog.style.setStyle_,a))};goog.style.setStyle_=function(a,b,c){(c=goog.style.getVendorJsStyleName_(a,c))&&(a.style[c]=b)};goog.style.getVendorJsStyleName_=function(a,b){var c=goog.string.toCamelCase(b);if(void 0===a.style[c]){var d=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b);if(void 0!==a.style[d])return d}return c};
goog.style.getVendorStyleName_=function(a,b){var c=goog.string.toCamelCase(b);return void 0===a.style[c]&&(c=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b),void 0!==a.style[c])?goog.dom.vendor.getVendorPrefix()+"-"+b:b};goog.style.getStyle=function(a,b){var c=a.style[goog.string.toCamelCase(b)];return"undefined"!==typeof c?c:a.style[goog.style.getVendorJsStyleName_(a,b)]||""};
goog.style.getComputedStyle=function(a,b){var c=goog.dom.getOwnerDocument(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""};goog.style.getCascadedStyle=function(a,b){return a.currentStyle?a.currentStyle[b]:null};goog.style.getStyle_=function(a,b){return goog.style.getComputedStyle(a,b)||goog.style.getCascadedStyle(a,b)||a.style&&a.style[b]};
goog.style.getComputedPosition=function(a){return goog.style.getStyle_(a,"position")};goog.style.getBackgroundColor=function(a){return goog.style.getStyle_(a,"backgroundColor")};goog.style.getComputedOverflowX=function(a){return goog.style.getStyle_(a,"overflowX")};goog.style.getComputedOverflowY=function(a){return goog.style.getStyle_(a,"overflowY")};goog.style.getComputedZIndex=function(a){return goog.style.getStyle_(a,"zIndex")};
goog.style.getComputedTextAlign=function(a){return goog.style.getStyle_(a,"textAlign")};goog.style.getComputedCursor=function(a){return goog.style.getStyle_(a,"cursor")};goog.style.setPosition=function(a,b,c){var d,e=goog.userAgent.GECKO&&(goog.userAgent.MAC||goog.userAgent.X11)&&goog.userAgent.isVersion("1.9");b instanceof goog.math.Coordinate?(d=b.x,b=b.y):(d=b,b=c);a.style.left=goog.style.getPixelStyleValue_(d,e);a.style.top=goog.style.getPixelStyleValue_(b,e)};
goog.style.getPosition=function(a){return new goog.math.Coordinate(a.offsetLeft,a.offsetTop)};goog.style.getClientViewportElement=function(a){a=a?goog.dom.getOwnerDocument(a):goog.dom.getDocument();return goog.userAgent.IE&&!goog.userAgent.isDocumentMode(9)&&!goog.dom.getDomHelper(a).isCss1CompatMode()?a.body:a.documentElement};goog.style.getViewportPageOffset=function(a){var b=a.body;a=a.documentElement;return new goog.math.Coordinate(b.scrollLeft||a.scrollLeft,b.scrollTop||a.scrollTop)};
goog.style.getBoundingClientRect_=function(a){var b=a.getBoundingClientRect();goog.userAgent.IE&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b};
goog.style.getOffsetParent=function(a){if(goog.userAgent.IE&&!goog.userAgent.isDocumentMode(8))return a.offsetParent;var b=goog.dom.getOwnerDocument(a),c=goog.style.getStyle_(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=goog.style.getStyle_(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null};
goog.style.getVisibleRectForElement=function(a){for(var b=new goog.math.Box(0,Infinity,Infinity,0),c=goog.dom.getDomHelper(a),d=c.getDocument().body,e=c.getDocument().documentElement,f=c.getDocumentScrollElement();a=goog.style.getOffsetParent(a);)if((!goog.userAgent.IE||0!=a.clientWidth)&&(!goog.userAgent.WEBKIT||0!=a.clientHeight||a!=d)&&a!=d&&a!=e&&"visible"!=goog.style.getStyle_(a,"overflow")){var g=goog.style.getPageOffset(a),h=goog.style.getClientLeftTop(a);g.x+=h.x;g.y+=h.y;b.top=Math.max(b.top,
g.y);b.right=Math.min(b.right,g.x+a.clientWidth);b.bottom=Math.min(b.bottom,g.y+a.clientHeight);b.left=Math.max(b.left,g.x)}d=f.scrollLeft;f=f.scrollTop;b.left=Math.max(b.left,d);b.top=Math.max(b.top,f);c=c.getViewportSize();b.right=Math.min(b.right,d+c.width);b.bottom=Math.min(b.bottom,f+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null};
goog.style.getContainerOffsetToScrollInto=function(a,b,c){var d=goog.style.getPageOffset(a),e=goog.style.getPageOffset(b),f=goog.style.getBorderBox(b),g=d.x-e.x-f.left,d=d.y-e.y-f.top,e=b.clientWidth-a.offsetWidth;a=b.clientHeight-a.offsetHeight;f=b.scrollLeft;b=b.scrollTop;c?(f+=g-e/2,b+=d-a/2):(f+=Math.min(g,Math.max(g-e,0)),b+=Math.min(d,Math.max(d-a,0)));return new goog.math.Coordinate(f,b)};
goog.style.scrollIntoContainerView=function(a,b,c){a=goog.style.getContainerOffsetToScrollInto(a,b,c);b.scrollLeft=a.x;b.scrollTop=a.y};
goog.style.getClientLeftTop=function(a){if(goog.userAgent.GECKO&&!goog.userAgent.isVersion("1.9")){var b=parseFloat(goog.style.getComputedStyle(a,"borderLeftWidth"));if(goog.style.isRightToLeft(a))var c=a.offsetWidth-a.clientWidth-b-parseFloat(goog.style.getComputedStyle(a,"borderRightWidth")),b=b+c;return new goog.math.Coordinate(b,parseFloat(goog.style.getComputedStyle(a,"borderTopWidth")))}return new goog.math.Coordinate(a.clientLeft,a.clientTop)};
goog.style.getPageOffset=function(a){var b,c=goog.dom.getOwnerDocument(a),d=goog.style.getStyle_(a,"position");goog.asserts.assertObject(a,"Parameter is required");var e=goog.userAgent.GECKO&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==d&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),f=new goog.math.Coordinate(0,0),g=goog.style.getClientViewportElement(c);if(a==g)return f;if(a.getBoundingClientRect)b=goog.style.getBoundingClientRect_(a),a=goog.dom.getDomHelper(c).getDocumentScroll(),
f.x=b.left+a.x,f.y=b.top+a.y;else if(c.getBoxObjectFor&&!e)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(g),f.x=b.screenX-a.screenX,f.y=b.screenY-a.screenY;else{b=a;do{f.x+=b.offsetLeft;f.y+=b.offsetTop;b!=a&&(f.x+=b.clientLeft||0,f.y+=b.clientTop||0);if(goog.userAgent.WEBKIT&&"fixed"==goog.style.getComputedPosition(b)){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}b=b.offsetParent}while(b&&b!=a);if(goog.userAgent.OPERA||goog.userAgent.WEBKIT&&"absolute"==d)f.y-=c.body.offsetTop;for(b=a;(b=goog.style.getOffsetParent(b))&&
b!=c.body&&b!=g;)if(f.x-=b.scrollLeft,!goog.userAgent.OPERA||"TR"!=b.tagName)f.y-=b.scrollTop}return f};goog.style.getPageOffsetLeft=function(a){return goog.style.getPageOffset(a).x};goog.style.getPageOffsetTop=function(a){return goog.style.getPageOffset(a).y};
goog.style.getFramedPageOffset=function(a,b){var c=new goog.math.Coordinate(0,0),d=goog.dom.getWindow(goog.dom.getOwnerDocument(a)),e=a;do{var f=d==b?goog.style.getPageOffset(e):goog.style.getClientPosition(e);c.x+=f.x;c.y+=f.y}while(d&&d!=b&&(e=d.frameElement)&&(d=d.parent));return c};
goog.style.translateRectForAnotherFrame=function(a,b,c){if(b.getDocument()!=c.getDocument()){var d=b.getDocument().body;c=goog.style.getFramedPageOffset(d,c.getWindow());c=goog.math.Coordinate.difference(c,goog.style.getPageOffset(d));goog.userAgent.IE&&!b.isCss1CompatMode()&&(c=goog.math.Coordinate.difference(c,b.getDocumentScroll()));a.left+=c.x;a.top+=c.y}};
goog.style.getRelativePosition=function(a,b){var c=goog.style.getClientPosition(a),d=goog.style.getClientPosition(b);return new goog.math.Coordinate(c.x-d.x,c.y-d.y)};
goog.style.getClientPosition=function(a){var b=new goog.math.Coordinate;if(a.nodeType==goog.dom.NodeType.ELEMENT){if(a.getBoundingClientRect){var c=goog.style.getBoundingClientRect_(a);b.x=c.left;b.y=c.top}else{var c=goog.dom.getDomHelper(a).getDocumentScroll(),d=goog.style.getPageOffset(a);b.x=d.x-c.x;b.y=d.y-c.y}goog.userAgent.GECKO&&!goog.userAgent.isVersion(12)&&(b=goog.math.Coordinate.sum(b,goog.style.getCssTranslation(a)))}else c=goog.isFunction(a.getBrowserEvent),d=a,a.targetTouches?d=a.targetTouches[0]:
c&&a.getBrowserEvent().targetTouches&&(d=a.getBrowserEvent().targetTouches[0]),b.x=d.clientX,b.y=d.clientY;return b};goog.style.setPageOffset=function(a,b,c){var d=goog.style.getPageOffset(a);b instanceof goog.math.Coordinate&&(c=b.y,b=b.x);goog.style.setPosition(a,a.offsetLeft+(b-d.x),a.offsetTop+(c-d.y))};
goog.style.setSize=function(a,b,c){if(b instanceof goog.math.Size)c=b.height,b=b.width;else if(void 0==c)throw Error("missing height argument");goog.style.setWidth(a,b);goog.style.setHeight(a,c)};goog.style.getPixelStyleValue_=function(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a};goog.style.setHeight=function(a,b){a.style.height=goog.style.getPixelStyleValue_(b,!0)};goog.style.setWidth=function(a,b){a.style.width=goog.style.getPixelStyleValue_(b,!0)};
goog.style.getSize=function(a){if("none"!=goog.style.getStyle_(a,"display"))return goog.style.getSizeWithDisplay_(a);var b=a.style,c=b.display,d=b.visibility,e=b.position;b.visibility="hidden";b.position="absolute";b.display="inline";a=goog.style.getSizeWithDisplay_(a);b.display=c;b.position=e;b.visibility=d;return a};
goog.style.getSizeWithDisplay_=function(a){var b=a.offsetWidth,c=a.offsetHeight,d=goog.userAgent.WEBKIT&&!b&&!c;return(!goog.isDef(b)||d)&&a.getBoundingClientRect?(a=goog.style.getBoundingClientRect_(a),new goog.math.Size(a.right-a.left,a.bottom-a.top)):new goog.math.Size(b,c)};goog.style.getBounds=function(a){var b=goog.style.getPageOffset(a);a=goog.style.getSize(a);return new goog.math.Rect(b.x,b.y,a.width,a.height)};goog.style.toCamelCase=function(a){return goog.string.toCamelCase(String(a))};
goog.style.toSelectorCase=function(a){return goog.string.toSelectorCase(a)};goog.style.getOpacity=function(a){var b=a.style;a="";"opacity"in b?a=b.opacity:"MozOpacity"in b?a=b.MozOpacity:"filter"in b&&(b=b.filter.match(/alpha\(opacity=([\d.]+)\)/))&&(a=String(b[1]/100));return""==a?a:Number(a)};goog.style.setOpacity=function(a,b){var c=a.style;"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity="+100*b+")")};
goog.style.setTransparentBackgroundImage=function(a,b){var c=a.style;goog.userAgent.IE&&!goog.userAgent.isVersion("8")?c.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+b+'", sizingMethod="crop")':(c.backgroundImage="url("+b+")",c.backgroundPosition="top left",c.backgroundRepeat="no-repeat")};goog.style.clearTransparentBackgroundImage=function(a){a=a.style;"filter"in a?a.filter="":a.backgroundImage="none"};goog.style.showElement=function(a,b){a.style.display=b?"":"none"};
goog.style.isElementShown=function(a){return"none"!=a.style.display};goog.style.installStyles=function(a,b){var c=goog.dom.getDomHelper(b),d=null;if(goog.userAgent.IE)d=c.getDocument().createStyleSheet(),goog.style.setStyles(d,a);else{var e=c.getElementsByTagNameAndClass("head")[0];e||(d=c.getElementsByTagNameAndClass("body")[0],e=c.createDom("head"),d.parentNode.insertBefore(e,d));d=c.createDom("style");goog.style.setStyles(d,a);c.appendChild(e,d)}return d};
goog.style.uninstallStyles=function(a){goog.dom.removeNode(a.ownerNode||a.owningElement||a)};goog.style.setStyles=function(a,b){goog.userAgent.IE?a.cssText=b:a.innerHTML=b};goog.style.setPreWrap=function(a){a=a.style;goog.userAgent.IE&&!goog.userAgent.isVersion("8")?(a.whiteSpace="pre",a.wordWrap="break-word"):a.whiteSpace=goog.userAgent.GECKO?"-moz-pre-wrap":"pre-wrap"};
goog.style.setInlineBlock=function(a){a=a.style;a.position="relative";goog.userAgent.IE&&!goog.userAgent.isVersion("8")?(a.zoom="1",a.display="inline"):a.display=goog.userAgent.GECKO?goog.userAgent.isVersion("1.9a")?"inline-block":"-moz-inline-box":"inline-block"};goog.style.isRightToLeft=function(a){return"rtl"==goog.style.getStyle_(a,"direction")};goog.style.unselectableStyle_=goog.userAgent.GECKO?"MozUserSelect":goog.userAgent.WEBKIT?"WebkitUserSelect":null;
goog.style.isUnselectable=function(a){return goog.style.unselectableStyle_?"none"==a.style[goog.style.unselectableStyle_].toLowerCase():goog.userAgent.IE||goog.userAgent.OPERA?"on"==a.getAttribute("unselectable"):!1};
goog.style.setUnselectable=function(a,b,c){c=!c?a.getElementsByTagName("*"):null;var d=goog.style.unselectableStyle_;if(d){if(b=b?"none":"",a.style[d]=b,c){a=0;for(var e;e=c[a];a++)e.style[d]=b}}else if(goog.userAgent.IE||goog.userAgent.OPERA)if(b=b?"on":"",a.setAttribute("unselectable",b),c)for(a=0;e=c[a];a++)e.setAttribute("unselectable",b)};goog.style.getBorderBoxSize=function(a){return new goog.math.Size(a.offsetWidth,a.offsetHeight)};
goog.style.setBorderBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),d=goog.dom.getDomHelper(c).isCss1CompatMode();if(goog.userAgent.IE&&(!d||!goog.userAgent.isVersion("8")))if(c=a.style,d){var d=goog.style.getPaddingBox(a),e=goog.style.getBorderBox(a);c.pixelWidth=b.width-e.left-d.left-d.right-e.right;c.pixelHeight=b.height-e.top-d.top-d.bottom-e.bottom}else c.pixelWidth=b.width,c.pixelHeight=b.height;else goog.style.setBoxSizingSize_(a,b,"border-box")};
goog.style.getContentBoxSize=function(a){var b=goog.dom.getOwnerDocument(a),c=goog.userAgent.IE&&a.currentStyle;if(c&&goog.dom.getDomHelper(b).isCss1CompatMode()&&"auto"!=c.width&&"auto"!=c.height&&!c.boxSizing)return b=goog.style.getIePixelValue_(a,c.width,"width","pixelWidth"),a=goog.style.getIePixelValue_(a,c.height,"height","pixelHeight"),new goog.math.Size(b,a);c=goog.style.getBorderBoxSize(a);b=goog.style.getPaddingBox(a);a=goog.style.getBorderBox(a);return new goog.math.Size(c.width-a.left-
b.left-b.right-a.right,c.height-a.top-b.top-b.bottom-a.bottom)};
goog.style.setContentBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),d=goog.dom.getDomHelper(c).isCss1CompatMode();if(goog.userAgent.IE&&(!d||!goog.userAgent.isVersion("8")))if(c=a.style,d)c.pixelWidth=b.width,c.pixelHeight=b.height;else{var d=goog.style.getPaddingBox(a),e=goog.style.getBorderBox(a);c.pixelWidth=b.width+e.left+d.left+d.right+e.right;c.pixelHeight=b.height+e.top+d.top+d.bottom+e.bottom}else goog.style.setBoxSizingSize_(a,b,"content-box")};
goog.style.setBoxSizingSize_=function(a,b,c){a=a.style;goog.userAgent.GECKO?a.MozBoxSizing=c:goog.userAgent.WEBKIT?a.WebkitBoxSizing=c:a.boxSizing=c;a.width=Math.max(b.width,0)+"px";a.height=Math.max(b.height,0)+"px"};goog.style.getIePixelValue_=function(a,b,c,d){if(/^\d+px?$/.test(b))return parseInt(b,10);var e=a.style[c],f=a.runtimeStyle[c];a.runtimeStyle[c]=a.currentStyle[c];a.style[c]=b;b=a.style[d];a.style[c]=e;a.runtimeStyle[c]=f;return b};
goog.style.getIePixelDistance_=function(a,b){var c=goog.style.getCascadedStyle(a,b);return c?goog.style.getIePixelValue_(a,c,"left","pixelLeft"):0};
goog.style.getBox_=function(a,b){if(goog.userAgent.IE){var c=goog.style.getIePixelDistance_(a,b+"Left"),d=goog.style.getIePixelDistance_(a,b+"Right"),e=goog.style.getIePixelDistance_(a,b+"Top"),f=goog.style.getIePixelDistance_(a,b+"Bottom");return new goog.math.Box(e,d,f,c)}c=goog.style.getComputedStyle(a,b+"Left");d=goog.style.getComputedStyle(a,b+"Right");e=goog.style.getComputedStyle(a,b+"Top");f=goog.style.getComputedStyle(a,b+"Bottom");return new goog.math.Box(parseFloat(e),parseFloat(d),parseFloat(f),
parseFloat(c))};goog.style.getPaddingBox=function(a){return goog.style.getBox_(a,"padding")};goog.style.getMarginBox=function(a){return goog.style.getBox_(a,"margin")};goog.style.ieBorderWidthKeywords_={thin:2,medium:4,thick:6};
goog.style.getIePixelBorder_=function(a,b){if("none"==goog.style.getCascadedStyle(a,b+"Style"))return 0;var c=goog.style.getCascadedStyle(a,b+"Width");return c in goog.style.ieBorderWidthKeywords_?goog.style.ieBorderWidthKeywords_[c]:goog.style.getIePixelValue_(a,c,"left","pixelLeft")};
goog.style.getBorderBox=function(a){if(goog.userAgent.IE){var b=goog.style.getIePixelBorder_(a,"borderLeft"),c=goog.style.getIePixelBorder_(a,"borderRight"),d=goog.style.getIePixelBorder_(a,"borderTop");a=goog.style.getIePixelBorder_(a,"borderBottom");return new goog.math.Box(d,c,a,b)}b=goog.style.getComputedStyle(a,"borderLeftWidth");c=goog.style.getComputedStyle(a,"borderRightWidth");d=goog.style.getComputedStyle(a,"borderTopWidth");a=goog.style.getComputedStyle(a,"borderBottomWidth");return new goog.math.Box(parseFloat(d),
parseFloat(c),parseFloat(a),parseFloat(b))};goog.style.getFontFamily=function(a){var b=goog.dom.getOwnerDocument(a),c="";if(b.body.createTextRange){b=b.body.createTextRange();b.moveToElementText(a);try{c=b.queryCommandValue("FontName")}catch(d){c=""}}c||(c=goog.style.getStyle_(a,"fontFamily"));a=c.split(",");1<a.length&&(c=a[0]);return goog.string.stripQuotes(c,"\"'")};goog.style.lengthUnitRegex_=/[^\d]+$/;
goog.style.getLengthUnits=function(a){return(a=a.match(goog.style.lengthUnitRegex_))&&a[0]||null};goog.style.ABSOLUTE_CSS_LENGTH_UNITS_={cm:1,"in":1,mm:1,pc:1,pt:1};goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_={em:1,ex:1};
goog.style.getFontSize=function(a){var b=goog.style.getStyle_(a,"fontSize"),c=goog.style.getLengthUnits(b);if(b&&"px"==c)return parseInt(b,10);if(goog.userAgent.IE){if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)return goog.style.getIePixelValue_(a,b,"left","pixelLeft");if(a.parentNode&&a.parentNode.nodeType==goog.dom.NodeType.ELEMENT&&c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_)return a=a.parentNode,c=goog.style.getStyle_(a,"fontSize"),goog.style.getIePixelValue_(a,b==c?"1em":b,"left","pixelLeft")}c=
goog.dom.createDom("span",{style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});goog.dom.appendChild(a,c);b=c.offsetHeight;goog.dom.removeNode(c);return b};goog.style.parseStyleAttribute=function(a){var b={};goog.array.forEach(a.split(/\s*;\s*/),function(a){a=a.split(/\s*:\s*/);2==a.length&&(b[goog.string.toCamelCase(a[0].toLowerCase())]=a[1])});return b};
goog.style.toStyleAttribute=function(a){var b=[];goog.object.forEach(a,function(a,d){b.push(goog.string.toSelectorCase(d),":",a,";")});return b.join("")};goog.style.setFloat=function(a,b){a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]=b};goog.style.getFloat=function(a){return a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]||""};
goog.style.getScrollbarWidth=function(a){var b=goog.dom.createElement("div");a&&(b.className=a);b.style.cssText="overflow:auto;position:absolute;top:0;width:100px;height:100px";a=goog.dom.createElement("div");goog.style.setSize(a,"200px","200px");b.appendChild(a);goog.dom.appendChild(goog.dom.getDocument().body,b);a=b.offsetWidth-b.clientWidth;goog.dom.removeNode(b);return a};goog.style.MATRIX_TRANSLATION_REGEX_=/matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation=function(a){var b;goog.userAgent.IE?b="-ms-transform":goog.userAgent.WEBKIT?b="-webkit-transform":goog.userAgent.OPERA?b="-o-transform":goog.userAgent.GECKO&&(b="-moz-transform");var c;b&&(c=goog.style.getStyle_(a,b));c||(c=goog.style.getStyle_(a,"transform"));if(!c)return new goog.math.Coordinate(0,0);a=c.match(goog.style.MATRIX_TRANSLATION_REGEX_);return!a?new goog.math.Coordinate(0,0):new goog.math.Coordinate(parseFloat(a[1]),parseFloat(a[2]))};goog.events.EventHandler=function(a){goog.Disposable.call(this);this.handler_=a;this.keys_=[]};goog.inherits(goog.events.EventHandler,goog.Disposable);goog.events.EventHandler.typeArray_=[];goog.events.EventHandler.prototype.listen=function(a,b,c,d,e){goog.isArray(b)||(goog.events.EventHandler.typeArray_[0]=b,b=goog.events.EventHandler.typeArray_);for(var f=0;f<b.length;f++){var g=goog.events.listen(a,b[f],c||this,d||!1,e||this.handler_||this);this.keys_.push(g)}return this};
goog.events.EventHandler.prototype.listenOnce=function(a,b,c,d,e){if(goog.isArray(b))for(var f=0;f<b.length;f++)this.listenOnce(a,b[f],c,d,e);else a=goog.events.listenOnce(a,b,c||this,d,e||this.handler_||this),this.keys_.push(a);return this};goog.events.EventHandler.prototype.listenWithWrapper=function(a,b,c,d,e){b.listen(a,c,d,e||this.handler_||this,this);return this};goog.events.EventHandler.prototype.getListenerCount=function(){return this.keys_.length};
goog.events.EventHandler.prototype.unlisten=function(a,b,c,d,e){if(goog.isArray(b))for(var f=0;f<b.length;f++)this.unlisten(a,b[f],c,d,e);else if(a=goog.events.getListener(a,b,c||this,d,e||this.handler_||this))a=a.key,goog.events.unlistenByKey(a),goog.array.remove(this.keys_,a);return this};goog.events.EventHandler.prototype.unlistenWithWrapper=function(a,b,c,d,e){b.unlisten(a,c,d,e||this.handler_||this,this);return this};
goog.events.EventHandler.prototype.removeAll=function(){goog.array.forEach(this.keys_,goog.events.unlistenByKey);this.keys_.length=0};goog.events.EventHandler.prototype.disposeInternal=function(){goog.events.EventHandler.superClass_.disposeInternal.call(this);this.removeAll()};goog.events.EventHandler.prototype.handleEvent=function(a){throw Error("EventHandler.handleEvent not implemented");};goog.ui={};goog.ui.IdGenerator=function(){};goog.addSingletonGetter(goog.ui.IdGenerator);goog.ui.IdGenerator.prototype.nextId_=0;goog.ui.IdGenerator.prototype.getNextUniqueId=function(){return":"+(this.nextId_++).toString(36)};goog.ui.IdGenerator.instance=goog.ui.IdGenerator.getInstance();goog.events.EventTarget=function(){goog.Disposable.call(this);goog.events.Listenable.USE_LISTENABLE_INTERFACE&&(this.eventTargetListeners_={})};goog.inherits(goog.events.EventTarget,goog.Disposable);goog.events.EventTarget.prototype.customEvent_=!0;goog.events.EventTarget.prototype.parentEventTarget_=null;goog.events.EventTarget.prototype.getParentEventTarget=function(){return this.parentEventTarget_};goog.events.EventTarget.prototype.setParentEventTarget=function(a){this.parentEventTarget_=a};
goog.events.EventTarget.prototype.addEventListener=function(a,b,c,d){goog.events.listen(this,a,b,c,d)};goog.events.EventTarget.prototype.removeEventListener=function(a,b,c,d){goog.events.unlisten(this,a,b,c,d)};
goog.events.EventTarget.prototype.dispatchEvent=function(a){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE){if(this.isDisposed())return!0;var b,c=this.getParentEventTarget();if(c)for(b=[];c;c=c.getParentEventTarget())b.push(c);return goog.events.EventTarget.dispatchEventInternal_(this,a,b)}return goog.events.dispatchEvent(this,a)};
goog.events.EventTarget.prototype.disposeInternal=function(){goog.events.EventTarget.superClass_.disposeInternal.call(this);goog.events.Listenable.USE_LISTENABLE_INTERFACE?this.removeAllListeners():goog.events.removeAll(this);this.parentEventTarget_=null};
goog.events.Listenable.USE_LISTENABLE_INTERFACE&&(goog.events.EventTarget.prototype.listen=function(a,b,c,d){return this.listenInternal_(a,b,!1,c,d)},goog.events.EventTarget.prototype.listenOnce=function(a,b,c,d){return this.listenInternal_(a,b,!0,c,d)},goog.events.EventTarget.prototype.listenInternal_=function(a,b,c,d,e){goog.asserts.assert(!this.isDisposed());var f=this.eventTargetListeners_[a]||(this.eventTargetListeners_[a]=[]),g;g=goog.events.EventTarget.findListenerIndex_(f,b,d,e);if(-1<g)return g=
f[g],c||(g.callOnce=!1),g;g=new goog.events.Listener;g.init(b,null,this,a,!!d,e);g.callOnce=c;f.push(g);return g},goog.events.EventTarget.prototype.unlisten=function(a,b,c,d){goog.asserts.assert(!this.isDisposed());if(!(a in this.eventTargetListeners_))return!1;a=this.eventTargetListeners_[a];b=goog.events.EventTarget.findListenerIndex_(a,b,c,d);return-1<b?(a[b].removed=!0,goog.array.removeAt(a,b)):!1},goog.events.EventTarget.prototype.unlistenByKey=function(a){goog.asserts.assert(!this.isDisposed());
var b=a.type;return!(b in this.eventTargetListeners_)?!1:goog.array.remove(this.eventTargetListeners_[b],a)},goog.events.EventTarget.prototype.removeAllListeners=function(a,b){var c=0,d;for(d in this.eventTargetListeners_)if(!a||d==a){var e=this.eventTargetListeners_[d],c=c+e.length;e.length=0}return c},goog.events.EventTarget.prototype.fireListeners=function(a,b,c){goog.asserts.assert(!this.isDisposed());if(!(a in this.eventTargetListeners_))return!0;var d=!0;a=goog.array.clone(this.eventTargetListeners_[a]);
for(var e=0;e<a.length;++e){var f=a[e];f&&(!f.removed&&f.capture==b)&&(f.callOnce&&this.unlistenByKey(f),d=!1!==f.handleEvent(c)&&d)}return d&&!1!=c.returnValue_},goog.events.EventTarget.prototype.getListeners=function(a,b){var c=this.eventTargetListeners_[a],d=[];if(c)for(var e=0;e<c.length;++e){var f=c[e];f.capture==b&&d.push(f)}return d},goog.events.EventTarget.dispatchEventInternal_=function(a,b,c){var d=b.type||b;if(goog.isString(b))b=new goog.events.Event(b,a);else if(b instanceof goog.events.Event)b.target=
b.target||a;else{var e=b;b=new goog.events.Event(d,a);goog.object.extend(b,e)}var e=!0,f;if(c)for(var g=c.length-1;!b.propagationStopped_&&0<=g;g--)f=b.currentTarget=c[g],e=f.fireListeners(d,!0,b)&&e;b.propagationStopped_||(f=b.currentTarget=a,e=f.fireListeners(d,!0,b)&&e,b.propagationStopped_||(e=f.fireListeners(d,!1,b)&&e));if(c)for(g=0;!b.propagationStopped_&&g<c.length;g++)f=b.currentTarget=c[g],e=f.fireListeners(d,!1,b)&&e;return e},goog.events.EventTarget.findListenerIndex_=function(a,b,c,d){for(var e=
0;e<a.length;++e){var f=a[e];if(f.listener==b&&f.capture==!!c&&f.handler==d)return e}return-1});goog.ui.Component=function(a){goog.events.EventTarget.call(this);this.dom_=a||goog.dom.getDomHelper();this.rightToLeft_=goog.ui.Component.defaultRightToLeft_};goog.inherits(goog.ui.Component,goog.events.EventTarget);goog.ui.Component.prototype.idGenerator_=goog.ui.IdGenerator.getInstance();goog.ui.Component.defaultRightToLeft_=null;
goog.ui.Component.EventType={BEFORE_SHOW:"beforeshow",SHOW:"show",HIDE:"hide",DISABLE:"disable",ENABLE:"enable",HIGHLIGHT:"highlight",UNHIGHLIGHT:"unhighlight",ACTIVATE:"activate",DEACTIVATE:"deactivate",SELECT:"select",UNSELECT:"unselect",CHECK:"check",UNCHECK:"uncheck",FOCUS:"focus",BLUR:"blur",OPEN:"open",CLOSE:"close",ENTER:"enter",LEAVE:"leave",ACTION:"action",CHANGE:"change"};
goog.ui.Component.Error={NOT_SUPPORTED:"Method not supported",DECORATE_INVALID:"Invalid element to decorate",ALREADY_RENDERED:"Component already rendered",PARENT_UNABLE_TO_BE_SET:"Unable to set parent component",CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds",NOT_OUR_CHILD:"Child is not in parent component",NOT_IN_DOCUMENT:"Operation not supported while component is not in document",STATE_INVALID:"Invalid component state"};
goog.ui.Component.State={ALL:255,DISABLED:1,HOVER:2,ACTIVE:4,SELECTED:8,CHECKED:16,FOCUSED:32,OPENED:64};
goog.ui.Component.getStateTransitionEvent=function(a,b){switch(a){case goog.ui.Component.State.DISABLED:return b?goog.ui.Component.EventType.DISABLE:goog.ui.Component.EventType.ENABLE;case goog.ui.Component.State.HOVER:return b?goog.ui.Component.EventType.HIGHLIGHT:goog.ui.Component.EventType.UNHIGHLIGHT;case goog.ui.Component.State.ACTIVE:return b?goog.ui.Component.EventType.ACTIVATE:goog.ui.Component.EventType.DEACTIVATE;case goog.ui.Component.State.SELECTED:return b?goog.ui.Component.EventType.SELECT:
goog.ui.Component.EventType.UNSELECT;case goog.ui.Component.State.CHECKED:return b?goog.ui.Component.EventType.CHECK:goog.ui.Component.EventType.UNCHECK;case goog.ui.Component.State.FOCUSED:return b?goog.ui.Component.EventType.FOCUS:goog.ui.Component.EventType.BLUR;case goog.ui.Component.State.OPENED:return b?goog.ui.Component.EventType.OPEN:goog.ui.Component.EventType.CLOSE}throw Error(goog.ui.Component.Error.STATE_INVALID);};
goog.ui.Component.setDefaultRightToLeft=function(a){goog.ui.Component.defaultRightToLeft_=a};goog.ui.Component.prototype.id_=null;goog.ui.Component.prototype.inDocument_=!1;goog.ui.Component.prototype.element_=null;goog.ui.Component.prototype.rightToLeft_=null;goog.ui.Component.prototype.model_=null;goog.ui.Component.prototype.parent_=null;goog.ui.Component.prototype.children_=null;goog.ui.Component.prototype.childIndex_=null;goog.ui.Component.prototype.wasDecorated_=!1;
goog.ui.Component.prototype.getId=function(){return this.id_||(this.id_=this.idGenerator_.getNextUniqueId())};goog.ui.Component.prototype.setId=function(a){this.parent_&&this.parent_.childIndex_&&(goog.object.remove(this.parent_.childIndex_,this.id_),goog.object.add(this.parent_.childIndex_,a,this));this.id_=a};goog.ui.Component.prototype.getElement=function(){return this.element_};goog.ui.Component.prototype.setElementInternal=function(a){this.element_=a};
goog.ui.Component.prototype.getElementsByClass=function(a){return this.element_?this.dom_.getElementsByClass(a,this.element_):[]};goog.ui.Component.prototype.getElementByClass=function(a){return this.element_?this.dom_.getElementByClass(a,this.element_):null};goog.ui.Component.prototype.getHandler=function(){return this.googUiComponentHandler_||(this.googUiComponentHandler_=new goog.events.EventHandler(this))};
goog.ui.Component.prototype.setParent=function(a){if(this==a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);if(a&&this.parent_&&this.id_&&this.parent_.getChild(this.id_)&&this.parent_!=a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);this.parent_=a;goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};goog.ui.Component.prototype.getParent=function(){return this.parent_};
goog.ui.Component.prototype.setParentEventTarget=function(a){if(this.parent_&&this.parent_!=a)throw Error(goog.ui.Component.Error.NOT_SUPPORTED);goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};goog.ui.Component.prototype.getDomHelper=function(){return this.dom_};goog.ui.Component.prototype.isInDocument=function(){return this.inDocument_};goog.ui.Component.prototype.createDom=function(){this.element_=this.dom_.createElement("div")};goog.ui.Component.prototype.render=function(a){this.render_(a)};
goog.ui.Component.prototype.renderBefore=function(a){this.render_(a.parentNode,a)};goog.ui.Component.prototype.render_=function(a,b){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.element_||this.createDom();a?a.insertBefore(this.element_,b||null):this.dom_.getDocument().body.appendChild(this.element_);(!this.parent_||this.parent_.isInDocument())&&this.enterDocument()};
goog.ui.Component.prototype.decorate=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(a&&this.canDecorate(a)){this.wasDecorated_=!0;if(!this.dom_||this.dom_.getDocument()!=goog.dom.getOwnerDocument(a))this.dom_=goog.dom.getDomHelper(a);this.decorateInternal(a);this.enterDocument()}else throw Error(goog.ui.Component.Error.DECORATE_INVALID);};goog.ui.Component.prototype.canDecorate=function(a){return!0};goog.ui.Component.prototype.wasDecorated=function(){return this.wasDecorated_};
goog.ui.Component.prototype.decorateInternal=function(a){this.element_=a};goog.ui.Component.prototype.enterDocument=function(){this.inDocument_=!0;this.forEachChild(function(a){!a.isInDocument()&&a.getElement()&&a.enterDocument()})};goog.ui.Component.prototype.exitDocument=function(){this.forEachChild(function(a){a.isInDocument()&&a.exitDocument()});this.googUiComponentHandler_&&this.googUiComponentHandler_.removeAll();this.inDocument_=!1};
goog.ui.Component.prototype.disposeInternal=function(){goog.ui.Component.superClass_.disposeInternal.call(this);this.inDocument_&&this.exitDocument();this.googUiComponentHandler_&&(this.googUiComponentHandler_.dispose(),delete this.googUiComponentHandler_);this.forEachChild(function(a){a.dispose()});!this.wasDecorated_&&this.element_&&goog.dom.removeNode(this.element_);this.parent_=this.model_=this.element_=this.childIndex_=this.children_=null};
goog.ui.Component.prototype.makeId=function(a){return this.getId()+"."+a};goog.ui.Component.prototype.makeIds=function(a){var b={},c;for(c in a)b[c]=this.makeId(a[c]);return b};goog.ui.Component.prototype.getModel=function(){return this.model_};goog.ui.Component.prototype.setModel=function(a){this.model_=a};goog.ui.Component.prototype.getFragmentFromId=function(a){return a.substring(this.getId().length+1)};
goog.ui.Component.prototype.getElementByFragment=function(a){if(!this.inDocument_)throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);return this.dom_.getElement(this.makeId(a))};goog.ui.Component.prototype.addChild=function(a,b){this.addChildAt(a,this.getChildCount(),b)};
goog.ui.Component.prototype.addChildAt=function(a,b,c){if(a.inDocument_&&(c||!this.inDocument_))throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(0>b||b>this.getChildCount())throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);if(!this.childIndex_||!this.children_)this.childIndex_={},this.children_=[];a.getParent()==this?(goog.object.set(this.childIndex_,a.getId(),a),goog.array.remove(this.children_,a)):goog.object.add(this.childIndex_,a.getId(),a);a.setParent(this);goog.array.insertAt(this.children_,
a,b);a.inDocument_&&this.inDocument_&&a.getParent()==this?(c=this.getContentElement(),c.insertBefore(a.getElement(),c.childNodes[b]||null)):c?(this.element_||this.createDom(),b=this.getChildAt(b+1),a.render_(this.getContentElement(),b?b.element_:null)):this.inDocument_&&(!a.inDocument_&&a.element_&&a.element_.parentNode&&a.element_.parentNode.nodeType==goog.dom.NodeType.ELEMENT)&&a.enterDocument()};goog.ui.Component.prototype.getContentElement=function(){return this.element_};
goog.ui.Component.prototype.isRightToLeft=function(){null==this.rightToLeft_&&(this.rightToLeft_=goog.style.isRightToLeft(this.inDocument_?this.element_:this.dom_.getDocument().body));return this.rightToLeft_};goog.ui.Component.prototype.setRightToLeft=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.rightToLeft_=a};goog.ui.Component.prototype.hasChildren=function(){return!!this.children_&&0!=this.children_.length};
goog.ui.Component.prototype.getChildCount=function(){return this.children_?this.children_.length:0};goog.ui.Component.prototype.getChildIds=function(){var a=[];this.forEachChild(function(b){a.push(b.getId())});return a};goog.ui.Component.prototype.getChild=function(a){return this.childIndex_&&a?goog.object.get(this.childIndex_,a)||null:null};goog.ui.Component.prototype.getChildAt=function(a){return this.children_?this.children_[a]||null:null};
goog.ui.Component.prototype.forEachChild=function(a,b){this.children_&&goog.array.forEach(this.children_,a,b)};goog.ui.Component.prototype.indexOfChild=function(a){return this.children_&&a?goog.array.indexOf(this.children_,a):-1};
goog.ui.Component.prototype.removeChild=function(a,b){if(a){var c=goog.isString(a)?a:a.getId();a=this.getChild(c);c&&a&&(goog.object.remove(this.childIndex_,c),goog.array.remove(this.children_,a),b&&(a.exitDocument(),a.element_&&goog.dom.removeNode(a.element_)),a.setParent(null))}if(!a)throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);return a};goog.ui.Component.prototype.removeChildAt=function(a,b){return this.removeChild(this.getChildAt(a),b)};
goog.ui.Component.prototype.removeChildren=function(a){for(var b=[];this.hasChildren();)b.push(this.removeChildAt(0,a));return b};goog.events.KeyCodes={WIN_KEY_FF_LINUX:0,MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,FF_SEMICOLON:59,FF_EQUALS:61,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,
X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SCROLL_LOCK:145,FIRST_MEDIA_KEY:166,LAST_MEDIA_KEY:183,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,TILDE:192,
SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent=function(a){if(a.altKey&&!a.ctrlKey||a.metaKey||a.keyCode>=goog.events.KeyCodes.F1&&a.keyCode<=goog.events.KeyCodes.F12)return!1;switch(a.keyCode){case goog.events.KeyCodes.ALT:case goog.events.KeyCodes.CAPS_LOCK:case goog.events.KeyCodes.CONTEXT_MENU:case goog.events.KeyCodes.CTRL:case goog.events.KeyCodes.DOWN:case goog.events.KeyCodes.END:case goog.events.KeyCodes.ESC:case goog.events.KeyCodes.HOME:case goog.events.KeyCodes.INSERT:case goog.events.KeyCodes.LEFT:case goog.events.KeyCodes.MAC_FF_META:case goog.events.KeyCodes.META:case goog.events.KeyCodes.NUMLOCK:case goog.events.KeyCodes.NUM_CENTER:case goog.events.KeyCodes.PAGE_DOWN:case goog.events.KeyCodes.PAGE_UP:case goog.events.KeyCodes.PAUSE:case goog.events.KeyCodes.PHANTOM:case goog.events.KeyCodes.PRINT_SCREEN:case goog.events.KeyCodes.RIGHT:case goog.events.KeyCodes.SCROLL_LOCK:case goog.events.KeyCodes.SHIFT:case goog.events.KeyCodes.UP:case goog.events.KeyCodes.WIN_KEY:case goog.events.KeyCodes.WIN_KEY_RIGHT:return!1;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return!goog.userAgent.GECKO;
default:return a.keyCode<goog.events.KeyCodes.FIRST_MEDIA_KEY||a.keyCode>goog.events.KeyCodes.LAST_MEDIA_KEY}};
goog.events.KeyCodes.firesKeyPressEvent=function(a,b,c,d,e){if(!goog.userAgent.IE&&(!goog.userAgent.WEBKIT||!goog.userAgent.isVersion("525")))return!0;if(goog.userAgent.MAC&&e)return goog.events.KeyCodes.isCharacterKey(a);if(e&&!d||!c&&(b==goog.events.KeyCodes.CTRL||b==goog.events.KeyCodes.ALT||goog.userAgent.MAC&&b==goog.events.KeyCodes.META))return!1;if(goog.userAgent.WEBKIT&&d&&c)switch(a){case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:case goog.events.KeyCodes.TILDE:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:return!1}if(goog.userAgent.IE&&d&&
b==a)return!1;switch(a){case goog.events.KeyCodes.ENTER:return!(goog.userAgent.IE&&goog.userAgent.isDocumentMode(9));case goog.events.KeyCodes.ESC:return!goog.userAgent.WEBKIT}return goog.events.KeyCodes.isCharacterKey(a)};
goog.events.KeyCodes.isCharacterKey=function(a){if(a>=goog.events.KeyCodes.ZERO&&a<=goog.events.KeyCodes.NINE||a>=goog.events.KeyCodes.NUM_ZERO&&a<=goog.events.KeyCodes.NUM_MULTIPLY||a>=goog.events.KeyCodes.A&&a<=goog.events.KeyCodes.Z||goog.userAgent.WEBKIT&&0==a)return!0;switch(a){case goog.events.KeyCodes.SPACE:case goog.events.KeyCodes.QUESTION_MARK:case goog.events.KeyCodes.NUM_PLUS:case goog.events.KeyCodes.NUM_MINUS:case goog.events.KeyCodes.NUM_PERIOD:case goog.events.KeyCodes.NUM_DIVISION:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.FF_SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.FF_EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:return!0;default:return!1}};
goog.events.KeyCodes.normalizeGeckoKeyCode=function(a){switch(a){case goog.events.KeyCodes.FF_EQUALS:return goog.events.KeyCodes.EQUALS;case goog.events.KeyCodes.FF_SEMICOLON:return goog.events.KeyCodes.SEMICOLON;case goog.events.KeyCodes.MAC_FF_META:return goog.events.KeyCodes.META;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return goog.events.KeyCodes.WIN_KEY;default:return a}};goog.ui.SelectionModel=function(a){goog.events.EventTarget.call(this);this.items_=[];this.addItems(a)};goog.inherits(goog.ui.SelectionModel,goog.events.EventTarget);goog.ui.SelectionModel.prototype.selectedItem_=null;goog.ui.SelectionModel.prototype.selectionHandler_=null;goog.ui.SelectionModel.prototype.getSelectionHandler=function(){return this.selectionHandler_};goog.ui.SelectionModel.prototype.setSelectionHandler=function(a){this.selectionHandler_=a};
goog.ui.SelectionModel.prototype.getItemCount=function(){return this.items_.length};goog.ui.SelectionModel.prototype.indexOfItem=function(a){return a?goog.array.indexOf(this.items_,a):-1};goog.ui.SelectionModel.prototype.getFirst=function(){return this.items_[0]};goog.ui.SelectionModel.prototype.getLast=function(){return this.items_[this.items_.length-1]};goog.ui.SelectionModel.prototype.getItemAt=function(a){return this.items_[a]||null};
goog.ui.SelectionModel.prototype.addItems=function(a){a&&(goog.array.forEach(a,function(a){this.selectItem_(a,!1)},this),goog.array.extend(this.items_,a))};goog.ui.SelectionModel.prototype.addItem=function(a){this.addItemAt(a,this.getItemCount())};goog.ui.SelectionModel.prototype.addItemAt=function(a,b){a&&(this.selectItem_(a,!1),goog.array.insertAt(this.items_,a,b))};
goog.ui.SelectionModel.prototype.removeItem=function(a){a&&goog.array.remove(this.items_,a)&&a==this.selectedItem_&&(this.selectedItem_=null,this.dispatchEvent(goog.events.EventType.SELECT))};goog.ui.SelectionModel.prototype.removeItemAt=function(a){this.removeItem(this.getItemAt(a))};goog.ui.SelectionModel.prototype.getSelectedItem=function(){return this.selectedItem_};goog.ui.SelectionModel.prototype.getItems=function(){return goog.array.clone(this.items_)};
goog.ui.SelectionModel.prototype.setSelectedItem=function(a){a!=this.selectedItem_&&(this.selectItem_(this.selectedItem_,!1),this.selectedItem_=a,this.selectItem_(a,!0));this.dispatchEvent(goog.events.EventType.SELECT)};goog.ui.SelectionModel.prototype.getSelectedIndex=function(){return this.indexOfItem(this.selectedItem_)};goog.ui.SelectionModel.prototype.setSelectedIndex=function(a){this.setSelectedItem(this.getItemAt(a))};
goog.ui.SelectionModel.prototype.clear=function(){goog.array.clear(this.items_);this.selectedItem_=null};goog.ui.SelectionModel.prototype.disposeInternal=function(){goog.ui.SelectionModel.superClass_.disposeInternal.call(this);delete this.items_;this.selectedItem_=null};goog.ui.SelectionModel.prototype.selectItem_=function(a,b){a&&("function"==typeof this.selectionHandler_?this.selectionHandler_(a,b):"function"==typeof a.setSelected&&a.setSelected(b))};goog.a11y={};goog.a11y.aria={};
goog.a11y.aria.State={ACTIVEDESCENDANT:"activedescendant",ATOMIC:"atomic",AUTOCOMPLETE:"autocomplete",BUSY:"busy",CHECKED:"checked",CONTROLS:"controls",DESCRIBEDBY:"describedby",DISABLED:"disabled",DROPEFFECT:"dropeffect",EXPANDED:"expanded",FLOWTO:"flowto",GRABBED:"grabbed",HASPOPUP:"haspopup",HIDDEN:"hidden",INVALID:"invalid",LABEL:"label",LABELLEDBY:"labelledby",LEVEL:"level",LIVE:"live",MULTILINE:"multiline",MULTISELECTABLE:"multiselectable",ORIENTATION:"orientation",OWNS:"owns",POSINSET:"posinset",
PRESSED:"pressed",READONLY:"readonly",RELEVANT:"relevant",REQUIRED:"required",SELECTED:"selected",SETSIZE:"setsize",SORT:"sort",VALUEMAX:"valuemax",VALUEMIN:"valuemin",VALUENOW:"valuenow",VALUETEXT:"valuetext"};
goog.a11y.aria.Role={ALERT:"alert",ALERTDIALOG:"alertdialog",APPLICATION:"application",ARTICLE:"article",BANNER:"banner",BUTTON:"button",CHECKBOX:"checkbox",COLUMNHEADER:"columnheader",COMBOBOX:"combobox",COMPLEMENTARY:"complementary",DIALOG:"dialog",DIRECTORY:"directory",DOCUMENT:"document",FORM:"form",GRID:"grid",GRIDCELL:"gridcell",GROUP:"group",HEADING:"heading",IMG:"img",LINK:"link",LIST:"list",LISTBOX:"listbox",LISTITEM:"listitem",LOG:"log",MAIN:"main",MARQUEE:"marquee",MATH:"math",MENU:"menu",
MENUBAR:"menubar",MENU_ITEM:"menuitem",MENU_ITEM_CHECKBOX:"menuitemcheckbox",MENU_ITEM_RADIO:"menuitemradio",NAVIGATION:"navigation",NOTE:"note",OPTION:"option",PRESENTATION:"presentation",PROGRESSBAR:"progressbar",RADIO:"radio",RADIOGROUP:"radiogroup",REGION:"region",ROW:"row",ROWGROUP:"rowgroup",ROWHEADER:"rowheader",SCROLLBAR:"scrollbar",SEARCH:"search",SEPARATOR:"separator",SLIDER:"slider",SPINBUTTON:"spinbutton",STATUS:"status",TAB:"tab",TAB_LIST:"tablist",TAB_PANEL:"tabpanel",TEXTBOX:"textbox",
TIMER:"timer",TOOLBAR:"toolbar",TOOLTIP:"tooltip",TREE:"tree",TREEGRID:"treegrid",TREEITEM:"treeitem"};goog.a11y.aria.LivePriority={OFF:"off",POLITE:"polite",ASSERTIVE:"assertive"};goog.a11y.aria.setRole=function(a,b){a.setAttribute("role",b)};goog.a11y.aria.getRole=function(a){return a.getAttribute("role")||""};goog.a11y.aria.setState=function(a,b,c){a.setAttribute("aria-"+b,c)};
goog.a11y.aria.getState=function(a,b){var c=a.getAttribute("aria-"+b);return!0===c||!1===c?c?"true":"false":c?String(c):""};goog.a11y.aria.getActiveDescendant=function(a){var b=goog.a11y.aria.getState(a,goog.a11y.aria.State.ACTIVEDESCENDANT);return goog.dom.getOwnerDocument(a).getElementById(b)};goog.a11y.aria.setActiveDescendant=function(a,b){goog.a11y.aria.setState(a,goog.a11y.aria.State.ACTIVEDESCENDANT,b?b.id:"")};goog.a11y.aria.Announcer=function(a){goog.Disposable.call(this);this.domHelper_=a||goog.dom.getDomHelper();this.liveRegions_={}};goog.inherits(goog.a11y.aria.Announcer,goog.Disposable);goog.a11y.aria.Announcer.prototype.disposeInternal=function(){goog.object.forEach(this.liveRegions_,this.domHelper_.removeNode,this.domHelper_);this.domHelper_=this.liveRegions_=null;goog.a11y.aria.Announcer.superClass_.disposeInternal.call(this)};
goog.a11y.aria.Announcer.prototype.say=function(a,b){goog.dom.setTextContent(this.getLiveRegion_(b||goog.a11y.aria.LivePriority.POLITE),a)};
goog.a11y.aria.Announcer.prototype.getLiveRegion_=function(a){if(this.liveRegions_[a])return this.liveRegions_[a];var b;b=this.domHelper_.createElement("div");b.style.position="absolute";b.style.top="-1000px";goog.a11y.aria.setState(b,goog.a11y.aria.State.LIVE,a);goog.a11y.aria.setState(b,goog.a11y.aria.State.ATOMIC,"true");this.domHelper_.getDocument().body.appendChild(b);return this.liveRegions_[a]=b};goog.dom.a11y={};goog.dom.a11y.State=goog.a11y.aria.State;goog.dom.a11y.Role=goog.a11y.aria.Role;goog.dom.a11y.LivePriority=goog.a11y.aria.LivePriority;goog.dom.a11y.setRole=function(a,b){goog.a11y.aria.setRole(a,b)};goog.dom.a11y.getRole=function(a){return goog.a11y.aria.getRole(a)};goog.dom.a11y.setState=function(a,b,c){goog.a11y.aria.setState(a,b,c)};goog.dom.a11y.getState=function(a,b){return goog.a11y.aria.getState(a,b)};goog.dom.a11y.getActiveDescendant=function(a){return goog.a11y.aria.getActiveDescendant(a)};
goog.dom.a11y.setActiveDescendant=function(a,b){goog.a11y.aria.setActiveDescendant(a,b)};goog.dom.a11y.Announcer=goog.a11y.aria.Announcer;goog.ui.ControlRenderer=function(){};goog.addSingletonGetter(goog.ui.ControlRenderer);goog.ui.ControlRenderer.getCustomRenderer=function(a,b){var c=new a;c.getCssClass=function(){return b};return c};goog.ui.ControlRenderer.CSS_CLASS="goog-control";goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS=[];goog.ui.ControlRenderer.prototype.getAriaRole=function(){};
goog.ui.ControlRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("div",this.getClassNames(a).join(" "),a.getContent());this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.getContentElement=function(a){return a};
goog.ui.ControlRenderer.prototype.enableClassName=function(a,b,c){if(a=a.getElement?a.getElement():a)if(goog.userAgent.IE&&!goog.userAgent.isVersion("7")){var d=this.getAppliedCombinedClassNames_(goog.dom.classes.get(a),b);d.push(b);goog.partial(c?goog.dom.classes.add:goog.dom.classes.remove,a).apply(null,d)}else goog.dom.classes.enable(a,b,c)};goog.ui.ControlRenderer.prototype.enableExtraClassName=function(a,b,c){this.enableClassName(a,b,c)};goog.ui.ControlRenderer.prototype.canDecorate=function(a){return!0};
goog.ui.ControlRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);var c=this.getContentElement(b);c&&c.firstChild?a.setContentInternal(c.firstChild.nextSibling?goog.array.clone(c.childNodes):c.firstChild):a.setContentInternal(null);var d=0,e=this.getCssClass(),f=this.getStructuralCssClass(),g=!1,h=!1,c=!1,i=goog.dom.classes.get(b);goog.array.forEach(i,function(a){!g&&a==e?(g=!0,f==e&&(h=!0)):!h&&a==f?h=!0:d|=this.getStateFromClass(a)},this);a.setStateInternal(d);g||(i.push(e),f==e&&(h=
!0));h||i.push(f);var j=a.getExtraClassNames();j&&i.push.apply(i,j);if(goog.userAgent.IE&&!goog.userAgent.isVersion("7")){var k=this.getAppliedCombinedClassNames_(i);0<k.length&&(i.push.apply(i,k),c=!0)}(!g||!h||j||c)&&goog.dom.classes.set(b,i.join(" "));this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.initializeDom=function(a){a.isRightToLeft()&&this.setRightToLeft(a.getElement(),!0);a.isEnabled()&&this.setFocusable(a,a.isVisible())};
goog.ui.ControlRenderer.prototype.setAriaRole=function(a,b){var c=b||this.getAriaRole();c&&goog.dom.a11y.setRole(a,c)};
goog.ui.ControlRenderer.prototype.setAriaStates=function(a,b){goog.asserts.assert(a);goog.asserts.assert(b);a.isEnabled()||this.updateAriaState(b,goog.ui.Component.State.DISABLED,!0);a.isSupportedState(goog.ui.Component.State.SELECTED)&&this.updateAriaState(b,goog.ui.Component.State.SELECTED,a.isSelected());a.isSupportedState(goog.ui.Component.State.CHECKED)&&this.updateAriaState(b,goog.ui.Component.State.CHECKED,a.isChecked());a.isSupportedState(goog.ui.Component.State.OPENED)&&this.updateAriaState(b,
goog.ui.Component.State.OPENED,a.isOpen())};goog.ui.ControlRenderer.prototype.setAllowTextSelection=function(a,b){goog.style.setUnselectable(a,!b,!goog.userAgent.IE&&!goog.userAgent.OPERA)};goog.ui.ControlRenderer.prototype.setRightToLeft=function(a,b){this.enableClassName(a,this.getStructuralCssClass()+"-rtl",b)};goog.ui.ControlRenderer.prototype.isFocusable=function(a){var b;return a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(b=a.getKeyEventTarget())?goog.dom.isFocusableTabIndex(b):!1};
goog.ui.ControlRenderer.prototype.setFocusable=function(a,b){var c;if(a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(c=a.getKeyEventTarget())){if(!b&&a.isFocused()){try{c.blur()}catch(d){}a.isFocused()&&a.handleBlur(null)}goog.dom.isFocusableTabIndex(c)!=b&&goog.dom.setFocusableTabIndex(c,b)}};goog.ui.ControlRenderer.prototype.setVisible=function(a,b){goog.style.showElement(a,b)};
goog.ui.ControlRenderer.prototype.setState=function(a,b,c){var d=a.getElement();if(d){var e=this.getClassForState(b);e&&this.enableClassName(a,e,c);this.updateAriaState(d,b,c)}};
goog.ui.ControlRenderer.prototype.updateAriaState=function(a,b,c){goog.ui.ControlRenderer.ARIA_STATE_MAP_||(goog.ui.ControlRenderer.ARIA_STATE_MAP_=goog.object.create(goog.ui.Component.State.DISABLED,goog.dom.a11y.State.DISABLED,goog.ui.Component.State.SELECTED,goog.dom.a11y.State.SELECTED,goog.ui.Component.State.CHECKED,goog.dom.a11y.State.CHECKED,goog.ui.Component.State.OPENED,goog.dom.a11y.State.EXPANDED));(b=goog.ui.ControlRenderer.ARIA_STATE_MAP_[b])&&goog.dom.a11y.setState(a,b,c)};
goog.ui.ControlRenderer.prototype.setContent=function(a,b){var c=this.getContentElement(a);if(c&&(goog.dom.removeChildren(c),b))if(goog.isString(b))goog.dom.setTextContent(c,b);else{var d=function(a){if(a){var b=goog.dom.getOwnerDocument(c);c.appendChild(goog.isString(a)?b.createTextNode(a):a)}};goog.isArray(b)?goog.array.forEach(b,d):goog.isArrayLike(b)&&!("nodeType"in b)?goog.array.forEach(goog.array.clone(b),d):d(b)}};goog.ui.ControlRenderer.prototype.getKeyEventTarget=function(a){return a.getElement()};
goog.ui.ControlRenderer.prototype.getCssClass=function(){return goog.ui.ControlRenderer.CSS_CLASS};goog.ui.ControlRenderer.prototype.getIe6ClassCombinations=function(){return[]};goog.ui.ControlRenderer.prototype.getStructuralCssClass=function(){return this.getCssClass()};
goog.ui.ControlRenderer.prototype.getClassNames=function(a){var b=this.getCssClass(),c=[b],d=this.getStructuralCssClass();d!=b&&c.push(d);b=this.getClassNamesForState(a.getState());c.push.apply(c,b);(a=a.getExtraClassNames())&&c.push.apply(c,a);goog.userAgent.IE&&!goog.userAgent.isVersion("7")&&c.push.apply(c,this.getAppliedCombinedClassNames_(c));return c};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_=function(a,b){var c=[];b&&(a=a.concat([b]));goog.array.forEach(this.getIe6ClassCombinations(),function(d){goog.array.every(d,goog.partial(goog.array.contains,a))&&(!b||goog.array.contains(d,b))&&c.push(d.join("_"))});return c};goog.ui.ControlRenderer.prototype.getClassNamesForState=function(a){for(var b=[];a;){var c=a&-a;b.push(this.getClassForState(c));a&=~c}return b};
goog.ui.ControlRenderer.prototype.getClassForState=function(a){this.classByState_||this.createClassByStateMap_();return this.classByState_[a]};goog.ui.ControlRenderer.prototype.getStateFromClass=function(a){this.stateByClass_||this.createStateByClassMap_();a=parseInt(this.stateByClass_[a],10);return isNaN(a)?0:a};
goog.ui.ControlRenderer.prototype.createClassByStateMap_=function(){var a=this.getStructuralCssClass();this.classByState_=goog.object.create(goog.ui.Component.State.DISABLED,a+"-disabled",goog.ui.Component.State.HOVER,a+"-hover",goog.ui.Component.State.ACTIVE,a+"-active",goog.ui.Component.State.SELECTED,a+"-selected",goog.ui.Component.State.CHECKED,a+"-checked",goog.ui.Component.State.FOCUSED,a+"-focused",goog.ui.Component.State.OPENED,a+"-open")};
goog.ui.ControlRenderer.prototype.createStateByClassMap_=function(){this.classByState_||this.createClassByStateMap_();this.stateByClass_=goog.object.transpose(this.classByState_)};goog.ui.PaletteRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.PaletteRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.PaletteRenderer);goog.ui.PaletteRenderer.cellId_=0;goog.ui.PaletteRenderer.CSS_CLASS="goog-palette";goog.ui.PaletteRenderer.prototype.createDom=function(a){var b=this.getClassNames(a);return a.getDomHelper().createDom("div",b?b.join(" "):null,this.createGrid(a.getContent(),a.getSize(),a.getDomHelper()))};
goog.ui.PaletteRenderer.prototype.createGrid=function(a,b,c){for(var d=[],e=0,f=0;e<b.height;e++){for(var g=[],h=0;h<b.width;h++){var i=a&&a[f++];g.push(this.createCell(i,c))}d.push(this.createRow(g,c))}return this.createTable(d,c)};goog.ui.PaletteRenderer.prototype.createTable=function(a,b){var c=b.createDom("table",this.getCssClass()+"-table",b.createDom("tbody",this.getCssClass()+"-body",a));c.cellSpacing=0;c.cellPadding=0;goog.dom.a11y.setRole(c,"grid");return c};
goog.ui.PaletteRenderer.prototype.createRow=function(a,b){return b.createDom("tr",this.getCssClass()+"-row",a)};goog.ui.PaletteRenderer.prototype.createCell=function(a,b){var c=b.createDom("td",{"class":this.getCssClass()+"-cell",id:this.getCssClass()+"-cell"+goog.ui.PaletteRenderer.cellId_++},a);goog.dom.a11y.setRole(c,"gridcell");return c};goog.ui.PaletteRenderer.prototype.canDecorate=function(a){return!1};goog.ui.PaletteRenderer.prototype.decorate=function(a,b){return null};
goog.ui.PaletteRenderer.prototype.setContent=function(a,b){if(a){var c=goog.dom.getElementsByTagNameAndClass("tbody",this.getCssClass()+"-body",a)[0];if(c){var d=0;goog.array.forEach(c.rows,function(a){goog.array.forEach(a.cells,function(a){goog.dom.removeChildren(a);if(b){var c=b[d++];c&&goog.dom.appendChild(a,c)}})});if(d<b.length){for(var e=[],f=goog.dom.getDomHelper(a),g=c.rows[0].cells.length;d<b.length;){var h=b[d++];e.push(this.createCell(h,f));e.length==g&&(h=this.createRow(e,f),goog.dom.appendChild(c,
h),e.length=0)}if(0<e.length){for(;e.length<g;)e.push(this.createCell("",f));h=this.createRow(e,f);goog.dom.appendChild(c,h)}}}goog.style.setUnselectable(a,!0,goog.userAgent.GECKO)}};goog.ui.PaletteRenderer.prototype.getContainingItem=function(a,b){for(var c=a.getElement();b&&b.nodeType==goog.dom.NodeType.ELEMENT&&b!=c;){if("TD"==b.tagName&&goog.dom.classes.has(b,this.getCssClass()+"-cell"))return b.firstChild;b=b.parentNode}return null};
goog.ui.PaletteRenderer.prototype.highlightCell=function(a,b,c){b&&(b=b.parentNode,goog.dom.classes.enable(b,this.getCssClass()+"-cell-hover",c),a=a.getElement().firstChild,goog.dom.a11y.setState(a,"activedescendent",b.id))};goog.ui.PaletteRenderer.prototype.selectCell=function(a,b,c){b&&goog.dom.classes.enable(b.parentNode,this.getCssClass()+"-cell-selected",c)};goog.ui.PaletteRenderer.prototype.getCssClass=function(){return goog.ui.PaletteRenderer.CSS_CLASS};goog.ui.registry={};goog.ui.registry.getDefaultRenderer=function(a){for(var b;a;){b=goog.getUid(a);if(b=goog.ui.registry.defaultRenderers_[b])break;a=a.superClass_?a.superClass_.constructor:null}return b?goog.isFunction(b.getInstance)?b.getInstance():new b:null};
goog.ui.registry.setDefaultRenderer=function(a,b){if(!goog.isFunction(a))throw Error("Invalid component class "+a);if(!goog.isFunction(b))throw Error("Invalid renderer class "+b);var c=goog.getUid(a);goog.ui.registry.defaultRenderers_[c]=b};goog.ui.registry.getDecoratorByClassName=function(a){return a in goog.ui.registry.decoratorFunctions_?goog.ui.registry.decoratorFunctions_[a]():null};
goog.ui.registry.setDecoratorByClassName=function(a,b){if(!a)throw Error("Invalid class name "+a);if(!goog.isFunction(b))throw Error("Invalid decorator function "+b);goog.ui.registry.decoratorFunctions_[a]=b};goog.ui.registry.getDecorator=function(a){for(var b=goog.dom.classes.get(a),c=0,d=b.length;c<d;c++)if(a=goog.ui.registry.getDecoratorByClassName(b[c]))return a;return null};goog.ui.registry.reset=function(){goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={}};
goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={};goog.ui.decorate=function(a){var b=goog.ui.registry.getDecorator(a);b&&b.decorate(a);return b};goog.events.KeyHandler=function(a,b){goog.events.EventTarget.call(this);a&&this.attach(a,b)};goog.inherits(goog.events.KeyHandler,goog.events.EventTarget);goog.events.KeyHandler.prototype.element_=null;goog.events.KeyHandler.prototype.keyPressKey_=null;goog.events.KeyHandler.prototype.keyDownKey_=null;goog.events.KeyHandler.prototype.keyUpKey_=null;goog.events.KeyHandler.prototype.lastKey_=-1;goog.events.KeyHandler.prototype.keyCode_=-1;goog.events.KeyHandler.prototype.altKey_=!1;
goog.events.KeyHandler.EventType={KEY:"key"};
goog.events.KeyHandler.safariKey_={3:goog.events.KeyCodes.ENTER,12:goog.events.KeyCodes.NUMLOCK,63232:goog.events.KeyCodes.UP,63233:goog.events.KeyCodes.DOWN,63234:goog.events.KeyCodes.LEFT,63235:goog.events.KeyCodes.RIGHT,63236:goog.events.KeyCodes.F1,63237:goog.events.KeyCodes.F2,63238:goog.events.KeyCodes.F3,63239:goog.events.KeyCodes.F4,63240:goog.events.KeyCodes.F5,63241:goog.events.KeyCodes.F6,63242:goog.events.KeyCodes.F7,63243:goog.events.KeyCodes.F8,63244:goog.events.KeyCodes.F9,63245:goog.events.KeyCodes.F10,
63246:goog.events.KeyCodes.F11,63247:goog.events.KeyCodes.F12,63248:goog.events.KeyCodes.PRINT_SCREEN,63272:goog.events.KeyCodes.DELETE,63273:goog.events.KeyCodes.HOME,63275:goog.events.KeyCodes.END,63276:goog.events.KeyCodes.PAGE_UP,63277:goog.events.KeyCodes.PAGE_DOWN,63289:goog.events.KeyCodes.NUMLOCK,63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_={Up:goog.events.KeyCodes.UP,Down:goog.events.KeyCodes.DOWN,Left:goog.events.KeyCodes.LEFT,Right:goog.events.KeyCodes.RIGHT,Enter:goog.events.KeyCodes.ENTER,F1:goog.events.KeyCodes.F1,F2:goog.events.KeyCodes.F2,F3:goog.events.KeyCodes.F3,F4:goog.events.KeyCodes.F4,F5:goog.events.KeyCodes.F5,F6:goog.events.KeyCodes.F6,F7:goog.events.KeyCodes.F7,F8:goog.events.KeyCodes.F8,F9:goog.events.KeyCodes.F9,F10:goog.events.KeyCodes.F10,F11:goog.events.KeyCodes.F11,F12:goog.events.KeyCodes.F12,
"U+007F":goog.events.KeyCodes.DELETE,Home:goog.events.KeyCodes.HOME,End:goog.events.KeyCodes.END,PageUp:goog.events.KeyCodes.PAGE_UP,PageDown:goog.events.KeyCodes.PAGE_DOWN,Insert:goog.events.KeyCodes.INSERT};goog.events.KeyHandler.USES_KEYDOWN_=goog.userAgent.IE||goog.userAgent.WEBKIT&&goog.userAgent.isVersion("525");goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_=goog.userAgent.MAC&&goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_=function(a){if(goog.userAgent.WEBKIT&&(this.lastKey_==goog.events.KeyCodes.CTRL&&!a.ctrlKey||this.lastKey_==goog.events.KeyCodes.ALT&&!a.altKey||goog.userAgent.MAC&&this.lastKey_==goog.events.KeyCodes.META&&!a.metaKey))this.keyCode_=this.lastKey_=-1;-1==this.lastKey_&&(a.ctrlKey&&a.keyCode!=goog.events.KeyCodes.CTRL?this.lastKey_=goog.events.KeyCodes.CTRL:a.altKey&&a.keyCode!=goog.events.KeyCodes.ALT?this.lastKey_=goog.events.KeyCodes.ALT:a.metaKey&&
a.keyCode!=goog.events.KeyCodes.META&&(this.lastKey_=goog.events.KeyCodes.META));goog.events.KeyHandler.USES_KEYDOWN_&&!goog.events.KeyCodes.firesKeyPressEvent(a.keyCode,this.lastKey_,a.shiftKey,a.ctrlKey,a.altKey)?this.handleEvent(a):(this.keyCode_=goog.userAgent.GECKO?goog.events.KeyCodes.normalizeGeckoKeyCode(a.keyCode):a.keyCode,goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(this.altKey_=a.altKey))};goog.events.KeyHandler.prototype.resetState=function(){this.keyCode_=this.lastKey_=-1};
goog.events.KeyHandler.prototype.handleKeyup_=function(a){this.resetState();this.altKey_=a.altKey};
goog.events.KeyHandler.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),c,d,e=b.altKey;goog.userAgent.IE&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,d=c!=goog.events.KeyCodes.ENTER&&c!=goog.events.KeyCodes.ESC?b.keyCode:0):goog.userAgent.WEBKIT&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,d=0<=b.charCode&&63232>b.charCode&&goog.events.KeyCodes.isCharacterKey(c)?b.charCode:0):goog.userAgent.OPERA?(c=this.keyCode_,d=goog.events.KeyCodes.isCharacterKey(c)?b.keyCode:
0):(c=b.keyCode||this.keyCode_,d=b.charCode||0,goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(e=this.altKey_),goog.userAgent.MAC&&(d==goog.events.KeyCodes.QUESTION_MARK&&c==goog.events.KeyCodes.WIN_KEY)&&(c=goog.events.KeyCodes.SLASH));var f=c,g=b.keyIdentifier;c?63232<=c&&c in goog.events.KeyHandler.safariKey_?f=goog.events.KeyHandler.safariKey_[c]:25==c&&a.shiftKey&&(f=9):g&&g in goog.events.KeyHandler.keyIdentifier_&&(f=goog.events.KeyHandler.keyIdentifier_[g]);a=f==this.lastKey_;this.lastKey_=
f;b=new goog.events.KeyEvent(f,d,a,b);b.altKey=e;this.dispatchEvent(b)};goog.events.KeyHandler.prototype.getElement=function(){return this.element_};
goog.events.KeyHandler.prototype.attach=function(a,b){this.keyUpKey_&&this.detach();this.element_=a;this.keyPressKey_=goog.events.listen(this.element_,goog.events.EventType.KEYPRESS,this,b);this.keyDownKey_=goog.events.listen(this.element_,goog.events.EventType.KEYDOWN,this.handleKeyDown_,b,this);this.keyUpKey_=goog.events.listen(this.element_,goog.events.EventType.KEYUP,this.handleKeyup_,b,this)};
goog.events.KeyHandler.prototype.detach=function(){this.keyPressKey_&&(goog.events.unlistenByKey(this.keyPressKey_),goog.events.unlistenByKey(this.keyDownKey_),goog.events.unlistenByKey(this.keyUpKey_),this.keyUpKey_=this.keyDownKey_=this.keyPressKey_=null);this.element_=null;this.keyCode_=this.lastKey_=-1};goog.events.KeyHandler.prototype.disposeInternal=function(){goog.events.KeyHandler.superClass_.disposeInternal.call(this);this.detach()};
goog.events.KeyEvent=function(a,b,c,d){goog.events.BrowserEvent.call(this,d);this.type=goog.events.KeyHandler.EventType.KEY;this.keyCode=a;this.charCode=b;this.repeat=c};goog.inherits(goog.events.KeyEvent,goog.events.BrowserEvent);goog.ui.Control=function(a,b,c){goog.ui.Component.call(this,c);this.renderer_=b||goog.ui.registry.getDefaultRenderer(this.constructor);this.setContentInternal(a)};goog.inherits(goog.ui.Control,goog.ui.Component);goog.ui.Control.registerDecorator=goog.ui.registry.setDecoratorByClassName;goog.ui.Control.getDecorator=goog.ui.registry.getDecorator;goog.ui.Control.decorate=goog.ui.decorate;goog.ui.Control.prototype.content_=null;goog.ui.Control.prototype.state_=0;
goog.ui.Control.prototype.supportedStates_=goog.ui.Component.State.DISABLED|goog.ui.Component.State.HOVER|goog.ui.Component.State.ACTIVE|goog.ui.Component.State.FOCUSED;goog.ui.Control.prototype.autoStates_=goog.ui.Component.State.ALL;goog.ui.Control.prototype.statesWithTransitionEvents_=0;goog.ui.Control.prototype.visible_=!0;goog.ui.Control.prototype.extraClassNames_=null;goog.ui.Control.prototype.handleMouseEvents_=!0;goog.ui.Control.prototype.allowTextSelection_=!1;
goog.ui.Control.prototype.preferredAriaRole_=null;goog.ui.Control.prototype.isHandleMouseEvents=function(){return this.handleMouseEvents_};goog.ui.Control.prototype.setHandleMouseEvents=function(a){this.isInDocument()&&a!=this.handleMouseEvents_&&this.enableMouseEventHandling_(a);this.handleMouseEvents_=a};goog.ui.Control.prototype.getKeyEventTarget=function(){return this.renderer_.getKeyEventTarget(this)};
goog.ui.Control.prototype.getKeyHandler=function(){return this.keyHandler_||(this.keyHandler_=new goog.events.KeyHandler)};goog.ui.Control.prototype.getRenderer=function(){return this.renderer_};goog.ui.Control.prototype.setRenderer=function(a){if(this.isInDocument())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.getElement()&&this.setElementInternal(null);this.renderer_=a};goog.ui.Control.prototype.getExtraClassNames=function(){return this.extraClassNames_};
goog.ui.Control.prototype.addClassName=function(a){a&&(this.extraClassNames_?goog.array.contains(this.extraClassNames_,a)||this.extraClassNames_.push(a):this.extraClassNames_=[a],this.renderer_.enableExtraClassName(this,a,!0))};goog.ui.Control.prototype.removeClassName=function(a){a&&this.extraClassNames_&&(goog.array.remove(this.extraClassNames_,a),0==this.extraClassNames_.length&&(this.extraClassNames_=null),this.renderer_.enableExtraClassName(this,a,!1))};
goog.ui.Control.prototype.enableClassName=function(a,b){b?this.addClassName(a):this.removeClassName(a)};goog.ui.Control.prototype.createDom=function(){var a=this.renderer_.createDom(this);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.isVisible()||this.renderer_.setVisible(a,!1)};goog.ui.Control.prototype.getPreferredAriaRole=function(){return this.preferredAriaRole_};
goog.ui.Control.prototype.setPreferredAriaRole=function(a){this.preferredAriaRole_=a};goog.ui.Control.prototype.getContentElement=function(){return this.renderer_.getContentElement(this.getElement())};goog.ui.Control.prototype.canDecorate=function(a){return this.renderer_.canDecorate(a)};
goog.ui.Control.prototype.decorateInternal=function(a){a=this.renderer_.decorate(this,a);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.visible_="none"!=a.style.display};
goog.ui.Control.prototype.enterDocument=function(){goog.ui.Control.superClass_.enterDocument.call(this);this.renderer_.initializeDom(this);if(this.supportedStates_&~goog.ui.Component.State.DISABLED&&(this.isHandleMouseEvents()&&this.enableMouseEventHandling_(!0),this.isSupportedState(goog.ui.Component.State.FOCUSED))){var a=this.getKeyEventTarget();if(a){var b=this.getKeyHandler();b.attach(a);this.getHandler().listen(b,goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent).listen(a,goog.events.EventType.FOCUS,
this.handleFocus).listen(a,goog.events.EventType.BLUR,this.handleBlur)}}};
goog.ui.Control.prototype.enableMouseEventHandling_=function(a){var b=this.getHandler(),c=this.getElement();a?(b.listen(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).listen(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).listen(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.listen(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.listen(c,
goog.events.EventType.DBLCLICK,this.handleDblClick)):(b.unlisten(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).unlisten(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).unlisten(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).unlisten(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.unlisten(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.unlisten(c,goog.events.EventType.DBLCLICK,this.handleDblClick))};
goog.ui.Control.prototype.exitDocument=function(){goog.ui.Control.superClass_.exitDocument.call(this);this.keyHandler_&&this.keyHandler_.detach();this.isVisible()&&this.isEnabled()&&this.renderer_.setFocusable(this,!1)};goog.ui.Control.prototype.disposeInternal=function(){goog.ui.Control.superClass_.disposeInternal.call(this);this.keyHandler_&&(this.keyHandler_.dispose(),delete this.keyHandler_);delete this.renderer_;this.extraClassNames_=this.content_=null};goog.ui.Control.prototype.getContent=function(){return this.content_};
goog.ui.Control.prototype.setContent=function(a){this.renderer_.setContent(this.getElement(),a);this.setContentInternal(a)};goog.ui.Control.prototype.setContentInternal=function(a){this.content_=a};goog.ui.Control.prototype.getCaption=function(){var a=this.getContent();if(!a)return"";a=goog.isString(a)?a:goog.isArray(a)?goog.array.map(a,goog.dom.getRawTextContent).join(""):goog.dom.getTextContent(a);return goog.string.collapseBreakingSpaces(a)};goog.ui.Control.prototype.setCaption=function(a){this.setContent(a)};
goog.ui.Control.prototype.setRightToLeft=function(a){goog.ui.Control.superClass_.setRightToLeft.call(this,a);var b=this.getElement();b&&this.renderer_.setRightToLeft(b,a)};goog.ui.Control.prototype.isAllowTextSelection=function(){return this.allowTextSelection_};goog.ui.Control.prototype.setAllowTextSelection=function(a){this.allowTextSelection_=a;var b=this.getElement();b&&this.renderer_.setAllowTextSelection(b,a)};goog.ui.Control.prototype.isVisible=function(){return this.visible_};
goog.ui.Control.prototype.setVisible=function(a,b){if(b||this.visible_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.SHOW:goog.ui.Component.EventType.HIDE)){var c=this.getElement();c&&this.renderer_.setVisible(c,a);this.isEnabled()&&this.renderer_.setFocusable(this,a);this.visible_=a;return!0}return!1};goog.ui.Control.prototype.isEnabled=function(){return!this.hasState(goog.ui.Component.State.DISABLED)};
goog.ui.Control.prototype.isParentDisabled_=function(){var a=this.getParent();return!!a&&"function"==typeof a.isEnabled&&!a.isEnabled()};goog.ui.Control.prototype.setEnabled=function(a){!this.isParentDisabled_()&&this.isTransitionAllowed(goog.ui.Component.State.DISABLED,!a)&&(a||(this.setActive(!1),this.setHighlighted(!1)),this.isVisible()&&this.renderer_.setFocusable(this,a),this.setState(goog.ui.Component.State.DISABLED,!a))};goog.ui.Control.prototype.isHighlighted=function(){return this.hasState(goog.ui.Component.State.HOVER)};
goog.ui.Control.prototype.setHighlighted=function(a){this.isTransitionAllowed(goog.ui.Component.State.HOVER,a)&&this.setState(goog.ui.Component.State.HOVER,a)};goog.ui.Control.prototype.isActive=function(){return this.hasState(goog.ui.Component.State.ACTIVE)};goog.ui.Control.prototype.setActive=function(a){this.isTransitionAllowed(goog.ui.Component.State.ACTIVE,a)&&this.setState(goog.ui.Component.State.ACTIVE,a)};goog.ui.Control.prototype.isSelected=function(){return this.hasState(goog.ui.Component.State.SELECTED)};
goog.ui.Control.prototype.setSelected=function(a){this.isTransitionAllowed(goog.ui.Component.State.SELECTED,a)&&this.setState(goog.ui.Component.State.SELECTED,a)};goog.ui.Control.prototype.isChecked=function(){return this.hasState(goog.ui.Component.State.CHECKED)};goog.ui.Control.prototype.setChecked=function(a){this.isTransitionAllowed(goog.ui.Component.State.CHECKED,a)&&this.setState(goog.ui.Component.State.CHECKED,a)};goog.ui.Control.prototype.isFocused=function(){return this.hasState(goog.ui.Component.State.FOCUSED)};
goog.ui.Control.prototype.setFocused=function(a){this.isTransitionAllowed(goog.ui.Component.State.FOCUSED,a)&&this.setState(goog.ui.Component.State.FOCUSED,a)};goog.ui.Control.prototype.isOpen=function(){return this.hasState(goog.ui.Component.State.OPENED)};goog.ui.Control.prototype.setOpen=function(a){this.isTransitionAllowed(goog.ui.Component.State.OPENED,a)&&this.setState(goog.ui.Component.State.OPENED,a)};goog.ui.Control.prototype.getState=function(){return this.state_};
goog.ui.Control.prototype.hasState=function(a){return!!(this.state_&a)};goog.ui.Control.prototype.setState=function(a,b){this.isSupportedState(a)&&b!=this.hasState(a)&&(this.renderer_.setState(this,a,b),this.state_=b?this.state_|a:this.state_&~a)};goog.ui.Control.prototype.setStateInternal=function(a){this.state_=a};goog.ui.Control.prototype.isSupportedState=function(a){return!!(this.supportedStates_&a)};
goog.ui.Control.prototype.setSupportedState=function(a,b){if(this.isInDocument()&&this.hasState(a)&&!b)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);!b&&this.hasState(a)&&this.setState(a,!1);this.supportedStates_=b?this.supportedStates_|a:this.supportedStates_&~a};goog.ui.Control.prototype.isAutoState=function(a){return!!(this.autoStates_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setAutoStates=function(a,b){this.autoStates_=b?this.autoStates_|a:this.autoStates_&~a};
goog.ui.Control.prototype.isDispatchTransitionEvents=function(a){return!!(this.statesWithTransitionEvents_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setDispatchTransitionEvents=function(a,b){this.statesWithTransitionEvents_=b?this.statesWithTransitionEvents_|a:this.statesWithTransitionEvents_&~a};
goog.ui.Control.prototype.isTransitionAllowed=function(a,b){return this.isSupportedState(a)&&this.hasState(a)!=b&&(!(this.statesWithTransitionEvents_&a)||this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a,b)))&&!this.isDisposed()};goog.ui.Control.prototype.handleMouseOver=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&(this.dispatchEvent(goog.ui.Component.EventType.ENTER)&&this.isEnabled()&&this.isAutoState(goog.ui.Component.State.HOVER))&&this.setHighlighted(!0)};
goog.ui.Control.prototype.handleMouseOut=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&this.dispatchEvent(goog.ui.Component.EventType.LEAVE)&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1),this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!1))};goog.ui.Control.prototype.handleContextMenu=goog.nullFunction;goog.ui.Control.isMouseEventWithinElement_=function(a,b){return!!a.relatedTarget&&goog.dom.contains(b,a.relatedTarget)};
goog.ui.Control.prototype.handleMouseDown=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),a.isMouseActionButton()&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!0),this.renderer_.isFocusable(this)&&this.getKeyEventTarget().focus()));!this.isAllowTextSelection()&&a.isMouseActionButton()&&a.preventDefault()};
goog.ui.Control.prototype.handleMouseUp=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),this.isActive()&&(this.performActionInternal(a)&&this.isAutoState(goog.ui.Component.State.ACTIVE))&&this.setActive(!1))};goog.ui.Control.prototype.handleDblClick=function(a){this.isEnabled()&&this.performActionInternal(a)};
goog.ui.Control.prototype.performActionInternal=function(a){this.isAutoState(goog.ui.Component.State.CHECKED)&&this.setChecked(!this.isChecked());this.isAutoState(goog.ui.Component.State.SELECTED)&&this.setSelected(!0);this.isAutoState(goog.ui.Component.State.OPENED)&&this.setOpen(!this.isOpen());var b=new goog.events.Event(goog.ui.Component.EventType.ACTION,this);a&&(b.altKey=a.altKey,b.ctrlKey=a.ctrlKey,b.metaKey=a.metaKey,b.shiftKey=a.shiftKey,b.platformModifierKey=a.platformModifierKey);return this.dispatchEvent(b)};
goog.ui.Control.prototype.handleFocus=function(a){this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!0)};goog.ui.Control.prototype.handleBlur=function(a){this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1);this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!1)};goog.ui.Control.prototype.handleKeyEvent=function(a){return this.isVisible()&&this.isEnabled()&&this.handleKeyEventInternal(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
goog.ui.Control.prototype.handleKeyEventInternal=function(a){return a.keyCode==goog.events.KeyCodes.ENTER&&this.performActionInternal(a)};goog.ui.registry.setDefaultRenderer(goog.ui.Control,goog.ui.ControlRenderer);goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS,function(){return new goog.ui.Control(null)});goog.ui.Palette=function(a,b,c){goog.ui.Control.call(this,a,b||goog.ui.PaletteRenderer.getInstance(),c);this.setAutoStates(goog.ui.Component.State.CHECKED|goog.ui.Component.State.SELECTED|goog.ui.Component.State.OPENED,!1)};goog.inherits(goog.ui.Palette,goog.ui.Control);goog.ui.Palette.prototype.size_=null;goog.ui.Palette.prototype.highlightedIndex_=-1;goog.ui.Palette.prototype.selectionModel_=null;
goog.ui.Palette.prototype.disposeInternal=function(){goog.ui.Palette.superClass_.disposeInternal.call(this);this.selectionModel_&&(this.selectionModel_.dispose(),this.selectionModel_=null);this.size_=null};
goog.ui.Palette.prototype.setContentInternal=function(a){goog.ui.Palette.superClass_.setContentInternal.call(this,a);this.adjustSize_();this.selectionModel_?(this.selectionModel_.clear(),this.selectionModel_.addItems(a)):(this.selectionModel_=new goog.ui.SelectionModel(a),this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_,this)),this.getHandler().listen(this.selectionModel_,goog.events.EventType.SELECT,this.handleSelectionChange));this.highlightedIndex_=-1};
goog.ui.Palette.prototype.getCaption=function(){return""};goog.ui.Palette.prototype.setCaption=function(a){};goog.ui.Palette.prototype.handleMouseOver=function(a){goog.ui.Palette.superClass_.handleMouseOver.call(this,a);var b=this.getRenderer().getContainingItem(this,a.target);(!b||!a.relatedTarget||!goog.dom.contains(b,a.relatedTarget))&&b!=this.getHighlightedItem()&&this.setHighlightedItem(b)};
goog.ui.Palette.prototype.handleMouseOut=function(a){goog.ui.Palette.superClass_.handleMouseOut.call(this,a);var b=this.getRenderer().getContainingItem(this,a.target);(!b||!a.relatedTarget||!goog.dom.contains(b,a.relatedTarget))&&b==this.getHighlightedItem()&&this.getRenderer().highlightCell(this,b,!1)};
goog.ui.Palette.prototype.handleMouseDown=function(a){goog.ui.Palette.superClass_.handleMouseDown.call(this,a);this.isActive()&&(a=this.getRenderer().getContainingItem(this,a.target),a!=this.getHighlightedItem()&&this.setHighlightedItem(a))};goog.ui.Palette.prototype.performActionInternal=function(a){var b=this.getHighlightedItem();return b?(this.setSelectedItem(b),goog.ui.Palette.superClass_.performActionInternal.call(this,a)):!1};
goog.ui.Palette.prototype.handleKeyEvent=function(a){var b=this.getContent(),b=b?b.length:0,c=this.size_.width;if(0==b||!this.isEnabled())return!1;if(a.keyCode==goog.events.KeyCodes.ENTER||a.keyCode==goog.events.KeyCodes.SPACE)return this.performActionInternal(a);if(a.keyCode==goog.events.KeyCodes.HOME)return this.setHighlightedIndex(0),!0;if(a.keyCode==goog.events.KeyCodes.END)return this.setHighlightedIndex(b-1),!0;var d=0>this.highlightedIndex_?this.getSelectedIndex():this.highlightedIndex_;switch(a.keyCode){case goog.events.KeyCodes.LEFT:-1==
d&&(d=b);if(0<d)return this.setHighlightedIndex(d-1),a.preventDefault(),!0;break;case goog.events.KeyCodes.RIGHT:if(d<b-1)return this.setHighlightedIndex(d+1),a.preventDefault(),!0;break;case goog.events.KeyCodes.UP:-1==d&&(d=b+c-1);if(d>=c)return this.setHighlightedIndex(d-c),a.preventDefault(),!0;break;case goog.events.KeyCodes.DOWN:if(-1==d&&(d=-c),d<b-c)return this.setHighlightedIndex(d+c),a.preventDefault(),!0}return!1};goog.ui.Palette.prototype.handleSelectionChange=function(a){};
goog.ui.Palette.prototype.getSize=function(){return this.size_};goog.ui.Palette.prototype.setSize=function(a,b){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.size_=goog.isNumber(a)?new goog.math.Size(a,b):a;this.adjustSize_()};goog.ui.Palette.prototype.getHighlightedIndex=function(){return this.highlightedIndex_};goog.ui.Palette.prototype.getHighlightedItem=function(){var a=this.getContent();return a&&a[this.highlightedIndex_]};
goog.ui.Palette.prototype.setHighlightedIndex=function(a){a!=this.highlightedIndex_&&(this.highlightIndex_(this.highlightedIndex_,!1),this.highlightedIndex_=a,this.highlightIndex_(a,!0))};goog.ui.Palette.prototype.setHighlightedItem=function(a){var b=this.getContent();this.setHighlightedIndex(b?goog.array.indexOf(b,a):-1)};goog.ui.Palette.prototype.getSelectedIndex=function(){return this.selectionModel_?this.selectionModel_.getSelectedIndex():-1};
goog.ui.Palette.prototype.getSelectedItem=function(){return this.selectionModel_?this.selectionModel_.getSelectedItem():null};goog.ui.Palette.prototype.setSelectedIndex=function(a){this.selectionModel_&&this.selectionModel_.setSelectedIndex(a)};goog.ui.Palette.prototype.setSelectedItem=function(a){this.selectionModel_&&this.selectionModel_.setSelectedItem(a)};
goog.ui.Palette.prototype.highlightIndex_=function(a,b){if(this.getElement()){var c=this.getContent();c&&(0<=a&&a<c.length)&&this.getRenderer().highlightCell(this,c[a],b)}};goog.ui.Palette.prototype.selectItem_=function(a,b){this.getElement()&&this.getRenderer().selectCell(this,a,b)};
goog.ui.Palette.prototype.adjustSize_=function(){var a=this.getContent();if(a)if(this.size_&&this.size_.width){if(a=Math.ceil(a.length/this.size_.width),!goog.isNumber(this.size_.height)||this.size_.height<a)this.size_.height=a}else a=Math.ceil(Math.sqrt(a.length)),this.size_=new goog.math.Size(a,a);else this.size_=new goog.math.Size(0,0)};goog.ui.ColorPalette=function(a,b,c){this.colors_=a||[];goog.ui.Palette.call(this,null,b||goog.ui.PaletteRenderer.getInstance(),c);this.setColors(this.colors_)};goog.inherits(goog.ui.ColorPalette,goog.ui.Palette);goog.ui.ColorPalette.prototype.normalizedColors_=null;goog.ui.ColorPalette.prototype.getColors=function(){return this.colors_};goog.ui.ColorPalette.prototype.setColors=function(a){this.colors_=a;this.normalizedColors_=null;this.setContent(this.createColorNodes())};
goog.ui.ColorPalette.prototype.getSelectedColor=function(){var a=this.getSelectedItem();return a?(a=goog.style.getStyle(a,"background-color"),goog.ui.ColorPalette.parseColor_(a)):null};goog.ui.ColorPalette.prototype.setSelectedColor=function(a){a=goog.ui.ColorPalette.parseColor_(a);this.normalizedColors_||(this.normalizedColors_=goog.array.map(this.colors_,function(a){return goog.ui.ColorPalette.parseColor_(a)}));this.setSelectedIndex(a?goog.array.indexOf(this.normalizedColors_,a):-1)};
goog.ui.ColorPalette.prototype.createColorNodes=function(){return goog.array.map(this.colors_,function(a){var b=this.getDomHelper().createDom("div",{"class":this.getRenderer().getCssClass()+"-colorswatch",style:"background-color:"+a});b.title="#"==a.charAt(0)?"RGB ("+goog.color.hexToRgb(a).join(", ")+")":a;return b},this)};goog.ui.ColorPalette.parseColor_=function(a){if(a)try{return goog.color.parse(a).hex}catch(b){}return null};goog.ui.ColorPicker=function(a,b){goog.ui.Component.call(this,a);this.colorPalette_=b||null;this.getHandler().listen(this,goog.ui.Component.EventType.ACTION,this.onColorPaletteAction_)};goog.inherits(goog.ui.ColorPicker,goog.ui.Component);goog.ui.ColorPicker.DEFAULT_NUM_COLS=5;goog.ui.ColorPicker.EventType={CHANGE:"change"};goog.ui.ColorPicker.prototype.focusable_=!0;goog.ui.ColorPicker.prototype.getColors=function(){return this.colorPalette_?this.colorPalette_.getColors():null};
goog.ui.ColorPicker.prototype.setColors=function(a){this.colorPalette_?this.colorPalette_.setColors(a):this.createColorPalette_(a)};goog.ui.ColorPicker.prototype.addColors=function(a){this.setColors(a)};goog.ui.ColorPicker.prototype.setSize=function(a){this.colorPalette_||this.createColorPalette_([]);this.colorPalette_.setSize(a)};goog.ui.ColorPicker.prototype.getSize=function(){return this.colorPalette_?this.colorPalette_.getSize():null};goog.ui.ColorPicker.prototype.setColumnCount=function(a){this.setSize(a)};
goog.ui.ColorPicker.prototype.getSelectedIndex=function(){return this.colorPalette_?this.colorPalette_.getSelectedIndex():-1};goog.ui.ColorPicker.prototype.setSelectedIndex=function(a){this.colorPalette_&&this.colorPalette_.setSelectedIndex(a)};goog.ui.ColorPicker.prototype.getSelectedColor=function(){return this.colorPalette_?this.colorPalette_.getSelectedColor():null};goog.ui.ColorPicker.prototype.setSelectedColor=function(a){this.colorPalette_&&this.colorPalette_.setSelectedColor(a)};
goog.ui.ColorPicker.prototype.isFocusable=function(){return this.focusable_};goog.ui.ColorPicker.prototype.setFocusable=function(a){this.focusable_=a;this.colorPalette_&&this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED,a)};goog.ui.ColorPicker.prototype.canDecorate=function(a){return!1};
goog.ui.ColorPicker.prototype.enterDocument=function(){goog.ui.ColorPicker.superClass_.enterDocument.call(this);this.colorPalette_&&this.colorPalette_.render(this.getElement());this.getElement().unselectable="on"};goog.ui.ColorPicker.prototype.disposeInternal=function(){goog.ui.ColorPicker.superClass_.disposeInternal.call(this);this.colorPalette_&&(this.colorPalette_.dispose(),this.colorPalette_=null)};goog.ui.ColorPicker.prototype.focus=function(){this.colorPalette_&&this.colorPalette_.getElement().focus()};
goog.ui.ColorPicker.prototype.onColorPaletteAction_=function(a){a.stopPropagation();this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)};goog.ui.ColorPicker.prototype.createColorPalette_=function(a){a=new goog.ui.ColorPalette(a,null,this.getDomHelper());a.setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS);a.setSupportedState(goog.ui.Component.State.FOCUSED,this.focusable_);this.addChild(a);this.colorPalette_=a;this.isInDocument()&&this.colorPalette_.render(this.getElement())};
goog.ui.ColorPicker.createSimpleColorGrid=function(a){a=new goog.ui.ColorPicker(a);a.setSize(7);a.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);return a};goog.ui.ColorPicker.SIMPLE_GRID_COLORS="#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");Blockly.pathToBlockly="./";Blockly.SVG_NS="http://www.w3.org/2000/svg";Blockly.HTML_NS="http://www.w3.org/1999/xhtml";Blockly.HSV_SATURATION=0.45;Blockly.HSV_VALUE=0.65;Blockly.makeColour=function(a){return goog.color.hsvToHex(a,Blockly.HSV_SATURATION,256*Blockly.HSV_VALUE)};Blockly.INPUT_VALUE=1;Blockly.OUTPUT_VALUE=2;Blockly.NEXT_STATEMENT=3;Blockly.PREVIOUS_STATEMENT=4;Blockly.DUMMY_INPUT=5;Blockly.ALIGN_LEFT=-1;Blockly.ALIGN_CENTRE=0;Blockly.ALIGN_RIGHT=1;Blockly.OPPOSITE_TYPE=[];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE]=Blockly.OUTPUT_VALUE;Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE]=Blockly.INPUT_VALUE;Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT]=Blockly.PREVIOUS_STATEMENT;Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT]=Blockly.NEXT_STATEMENT;Blockly.SOUNDS_={};Blockly.selected=null;Blockly.editable=!0;Blockly.highlightedConnection_=null;Blockly.localConnection_=null;Blockly.DRAG_RADIUS=5;Blockly.SNAP_RADIUS=12;Blockly.BUMP_DELAY=250;Blockly.mainWorkspace=null;
Blockly.clipboard_=null;Blockly.svgSize=function(){return{width:Blockly.svg.cachedWidth_,height:Blockly.svg.cachedHeight_,top:Blockly.svg.cachedTop_,left:Blockly.svg.cachedLeft_}};
Blockly.svgResize=function(){var a=Blockly.svg.parentNode.offsetWidth,b=Blockly.svg.parentNode.offsetHeight;Blockly.svg.cachedWidth_!=a&&(Blockly.svg.setAttribute("width",a+"px"),Blockly.svg.cachedWidth_=a);Blockly.svg.cachedHeight_!=b&&(Blockly.svg.setAttribute("height",b+"px"),Blockly.svg.cachedHeight_=b);a=Blockly.svg.getBoundingClientRect();Blockly.svg.cachedLeft_=a.left;Blockly.svg.cachedTop_=a.top};
Blockly.onMouseDown_=function(a){Blockly.Block.terminateDrag_();Blockly.hideChaff();var b=a.target&&a.target.nodeName&&"svg"==a.target.nodeName.toLowerCase();Blockly.selected&&b&&Blockly.selected.unselect();if(Blockly.isRightButton(a))Blockly.ContextMenu&&Blockly.showContextMenu_(a.clientX,a.clientY);else if(!Blockly.editable||b)Blockly.mainWorkspace.dragMode=!0,Blockly.mainWorkspace.startDragMouseX=a.clientX,Blockly.mainWorkspace.startDragMouseY=a.clientY,Blockly.mainWorkspace.startDragMetrics=Blockly.getMainWorkspaceMetrics(),
Blockly.mainWorkspace.startScrollX=Blockly.mainWorkspace.scrollX,Blockly.mainWorkspace.startScrollY=Blockly.mainWorkspace.scrollY};Blockly.onMouseUp_=function(a){Blockly.setCursorHand_(!1);Blockly.mainWorkspace.dragMode=!1};
Blockly.onMouseMove_=function(a){if(Blockly.mainWorkspace.dragMode){Blockly.removeAllRanges();var b=Blockly.mainWorkspace.startDragMetrics,c=Blockly.mainWorkspace.startScrollX+(a.clientX-Blockly.mainWorkspace.startDragMouseX);a=Blockly.mainWorkspace.startScrollY+(a.clientY-Blockly.mainWorkspace.startDragMouseY);c=Math.min(c,-b.contentLeft);a=Math.min(a,-b.contentTop);c=Math.max(c,b.viewWidth-b.contentLeft-b.contentWidth);a=Math.max(a,b.viewHeight-b.contentTop-b.contentHeight);Blockly.mainWorkspace.scrollbar.set(-c-
b.contentLeft,-a-b.contentTop)}};
Blockly.onKeyDown_=function(a){if(!Blockly.isTargetInput_(a))if(27==a.keyCode)Blockly.hideChaff();else if(8==a.keyCode||46==a.keyCode)Blockly.selected&&Blockly.selected.deletable&&(Blockly.hideChaff(),Blockly.selected.dispose(!0,!0)),a.preventDefault();else if(a.altKey||a.ctrlKey||a.metaKey)Blockly.selected&&(Blockly.selected.deletable&&Blockly.selected.workspace==Blockly.mainWorkspace)&&(Blockly.hideChaff(),67==a.keyCode?Blockly.copy_(Blockly.selected):88==a.keyCode&&(Blockly.copy_(Blockly.selected),
Blockly.selected.dispose(!0,!0))),86==a.keyCode&&Blockly.clipboard_&&Blockly.mainWorkspace.paste(Blockly.clipboard_)};Blockly.copy_=function(a){var b=Blockly.Xml.blockToDom_(a);Blockly.Xml.deleteNext(b);a=a.getRelativeToSurfaceXY();b.setAttribute("x",Blockly.RTL?-a.x:a.x);b.setAttribute("y",a.y);Blockly.clipboard_=b};Blockly.showContextMenu_=function(a,b){var c=[],d={enabled:!1};d.text=Blockly.MSG_HELP;d.callback=function(){};c.push(d);Blockly.ContextMenu.show(a,b,c)};
Blockly.onContextMenu_=function(a){!Blockly.isTargetInput_(a)&&Blockly.ContextMenu&&a.preventDefault()};Blockly.hideChaff=function(a){Blockly.Tooltip&&Blockly.Tooltip.hide();Blockly.ContextMenu&&Blockly.ContextMenu.hide();Blockly.FieldDropdown&&Blockly.FieldDropdown.hide();Blockly.FieldColour&&Blockly.FieldColour.hide();Blockly.Toolbox&&(!a&&Blockly.Toolbox.flyout_.autoClose)&&Blockly.Toolbox.clearSelection()};
Blockly.removeAllRanges=function(){if(window.getSelection){var a=window.getSelection();a&&a.removeAllRanges&&(a.removeAllRanges(),window.setTimeout(function(){window.getSelection().removeAllRanges()},0))}};Blockly.isTargetInput_=function(a){return"textarea"==a.target.type||"text"==a.target.type};Blockly.loadAudio_=function(a){if(window.Audio){var b=new window.Audio(Blockly.pathToBlockly+"media/"+a+".wav");b&&b.play&&(b.play(),b.volume=0,Blockly.SOUNDS_[a]=b)}};
Blockly.playAudio=function(a){if(a=Blockly.SOUNDS_[a])a.volume=1,a.play()};Blockly.setCursorHand_=function(a){if(Blockly.editable){var b="";a&&(b="url("+Blockly.pathToBlockly+"media/handclosed.cur) 7 3, auto");Blockly.selected&&(Blockly.selected.getSvgRoot().style.cursor=b);document.getElementsByTagName("svg")[0].style.cursor=b}};
Blockly.getMainWorkspaceMetrics=function(){var a=Blockly.svgSize();Blockly.Toolbox&&(a.width-=Blockly.Toolbox.width);var b=a.width-Blockly.Scrollbar.scrollbarThickness,c=a.height-Blockly.Scrollbar.scrollbarThickness;try{var d=Blockly.mainWorkspace.getCanvas().getBBox()}catch(e){return null}-Infinity==d.width&&-Infinity==d.height&&(d={width:0,height:0,x:0,y:0});var f=Math.min(d.x-b/2,d.x+d.width-b),b=Math.max(d.x+d.width+b/2,d.x+b),g=Math.min(d.y-c/2,d.y+d.height-c),c=Math.max(d.y+d.height+c/2,d.y+
c),d=0;Blockly.Toolbox&&!Blockly.RTL&&(d=Blockly.Toolbox.width);return{viewHeight:a.height,viewWidth:a.width,contentHeight:c-g,contentWidth:b-f,viewTop:-Blockly.mainWorkspace.scrollY,viewLeft:-Blockly.mainWorkspace.scrollX,contentTop:g,contentLeft:f,absoluteTop:0,absoluteLeft:d}};
Blockly.setMainWorkspaceMetrics=function(a){var b=Blockly.getMainWorkspaceMetrics();goog.isNumber(a.x)&&(Blockly.mainWorkspace.scrollX=-b.contentWidth*a.x-b.contentLeft);goog.isNumber(a.y)&&(Blockly.mainWorkspace.scrollY=-b.contentHeight*a.y-b.contentTop);a="translate("+(Blockly.mainWorkspace.scrollX+b.absoluteLeft)+","+(Blockly.mainWorkspace.scrollY+b.absoluteTop)+")";Blockly.mainWorkspace.getCanvas().setAttribute("transform",a);Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform",a)};
Blockly.addChangeListener=function(a){return Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(),"blocklyWorkspaceChange",null,a)};Blockly.removeChangeListener=function(a){Blockly.unbindEvent_(a)};Blockly.cssLoaded=function(){Blockly.Field&&(Blockly.Field.textLengthCache={});Blockly.Toolbox&&Blockly.Toolbox.redraw()};Blockly.utils={};Blockly.addClass_=function(a,b){var c=a.getAttribute("class")||"";-1==(" "+c+" ").indexOf(" "+b+" ")&&(c&&(c+=" "),a.setAttribute("class",c+b))};Blockly.removeClass_=function(a,b){var c=a.getAttribute("class");if(-1!=(" "+c+" ").indexOf(" "+b+" ")){for(var c=c.split(/\s+/),d=0;d<c.length;d++)if(!c[d]||c[d]==b)c.splice(d,1),d--;c.length?a.setAttribute("class",c.join(" ")):a.removeAttribute("class")}};
Blockly.bindEvent_=function(a,b,c,d){var e=[],f;if(!a.addEventListener)throw"Element is not a DOM node with addEventListener.";f=function(a){d.apply(c,arguments)};a.addEventListener(b,f,!1);e.push([a,b,f]);b in Blockly.bindEvent_.TOUCH_MAP&&(f=function(a){if(1==a.changedTouches.length){var b=a.changedTouches[0];a.clientX=b.clientX;a.clientY=b.clientY}d.apply(c,arguments);a.preventDefault()},a.addEventListener(Blockly.bindEvent_.TOUCH_MAP[b],f,!1),e.push([a,Blockly.bindEvent_.TOUCH_MAP[b],f]));return e};
Blockly.bindEvent_.TOUCH_MAP={};Blockly.bindEvent_.TOUCH_MAP="ontouchstart"in document.documentElement?{mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"}:{};Blockly.unbindEvent_=function(a){for(;a.length;){var b=a.pop(),c=b[2];b[0].removeEventListener(b[1],c,!1)}return c};
Blockly.fireUiEvent=function(a,b){var c=document;if(c.createEvent)c=c.createEvent("UIEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c);else if(c.createEventObject)c=c.createEventObject(),a.fireEvent("on"+b,c);else throw"FireEvent: No event creation mechanism.";};Blockly.noEvent=function(a){a.preventDefault();a.stopPropagation()};
Blockly.getRelativeXY_=function(a){var b={x:0,y:0},c=a.getAttribute("x");c&&(b.x=parseInt(c,10));if(c=a.getAttribute("y"))b.y=parseInt(c,10);if(a=(a=a.getAttribute("transform"))&&a.match(/translate\(\s*([-\d.]+)(,\s*([-\d.]+)\s*\))?/))b.x+=parseInt(a[1],10),a[3]&&(b.y+=parseInt(a[3],10));return b};Blockly.getAbsoluteXY_=function(a){var b=0,c=0;do{var d=Blockly.getRelativeXY_(a),b=b+d.x,c=c+d.y;a=a.parentNode}while(a&&a!=document);return{x:b,y:c}};
Blockly.createSvgElement=function(a,b,c){a=document.createElementNS(Blockly.SVG_NS,a);for(var d in b)a.setAttribute(d,b[d]);c&&c.appendChild(a);return a};Blockly.isRightButton=function(a){return 2==a.button||a.ctrlKey};Blockly.convertCoordinates=function(a,b,c){var d=Blockly.svg.createSVGPoint();d.x=a;d.y=b;a=Blockly.svg.getScreenCTM();c&&(a=a.inverse());return d.matrixTransform(a)};Blockly.FieldImage=function(a,b,c){this.sourceBlock_=null;c=Number(c);b=Number(b);this.size_={height:c+10,width:b};var d=6-Blockly.BlockSvg.TITLE_HEIGHT;this.group_=Blockly.createSvgElement("g",{},null);this.imageElement_=Blockly.createSvgElement("image",{height:c+"px",width:b+"px",y:d},this.group_);this.setText(a);goog.userAgent.GECKO&&(this.rectElement_=Blockly.createSvgElement("rect",{height:c+"px",width:b+"px",y:d,"fill-opacity":0},this.group_))};goog.inherits(Blockly.FieldImage,Blockly.Field);
Blockly.FieldImage.prototype.rectElement_=null;Blockly.FieldImage.prototype.EDITABLE=!1;Blockly.FieldImage.prototype.init=function(a){if(this.sourceBlock_)throw"Image has already been initialized once.";this.sourceBlock_=a;a.getSvgRoot().appendChild(this.group_);a=this.rectElement_||this.imageElement_;a.tooltip=this.sourceBlock_;Blockly.Tooltip&&Blockly.Tooltip.bindMouseEvents(a)};
Blockly.FieldImage.prototype.dispose=function(){goog.dom.removeNode(this.group_);this.rectElement_=this.imageElement_=this.group_=null};Blockly.FieldImage.prototype.setTooltip=function(a){(this.rectElement_||this.imageElement_).tooltip=a};Blockly.FieldImage.prototype.getText=function(){return this.src_};Blockly.FieldImage.prototype.setText=function(a){this.src_=a;this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a)};Blockly.FieldColour=function(a,b){this.changeHandler_=b;Blockly.Field.call(this,"\u00a0\u00a0\u00a0");this.borderRect_.style.fillOpacity=1;this.setValue(a)};goog.inherits(Blockly.FieldColour,Blockly.Field);Blockly.FieldColour.isOpen_=!1;Blockly.FieldColour.prototype.CURSOR="default";Blockly.FieldColour.prototype.getValue=function(){return this.colour_};Blockly.FieldColour.prototype.setValue=function(a){this.colour_=a;this.borderRect_.style.fill=a;this.sourceBlock_&&this.sourceBlock_.rendered&&this.sourceBlock_.workspace.fireChangeEvent()};
Blockly.FieldColour.prototype.showEditor_=function(){Blockly.FieldColour.isOpen_=!0;goog.dom.removeChildren(Blockly.widgetDiv);Blockly.widgetDiv.style.display="block";var a=new goog.ui.ColorPicker.createSimpleColorGrid;a.render(Blockly.widgetDiv);a.setSelectedColor(this.getValue());var b=Blockly.getAbsoluteXY_(this.borderRect_),c=this.borderRect_.getBBox();Blockly.RTL&&(b.x+=c.width);b.y+=c.height-1;b=Blockly.convertCoordinates(b.x,b.y,!1);Blockly.RTL&&(b.x-=Blockly.widgetDiv.offsetWidth);Blockly.widgetDiv.style.left=
b.x+"px";Blockly.widgetDiv.style.top=b.y+"px";var d=this;Blockly.FieldColour.changeEventKey_=goog.events.listen(a,goog.ui.ColorPicker.EventType.CHANGE,function(a){a=a.target.getSelectedColor()||"#000000";Blockly.FieldColour.hide();if(d.changeHandler_){var b=d.changeHandler_(a);void 0!==b&&(a=b)}null!==a&&d.setValue(a)})};
Blockly.FieldColour.hide=function(){Blockly.FieldColour.isOpen_&&(Blockly.widgetDiv.style.display="none",goog.dom.removeChildren(Blockly.widgetDiv),Blockly.FieldColour.isOpen_=!1,Blockly.FieldColour.changeEventKey_&&goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_))};Blockly.FieldTextInput=function(a,b){Blockly.Field.call(this,a);this.changeHandler_=b};goog.inherits(Blockly.FieldTextInput,Blockly.Field);Blockly.FieldTextInput.prototype.setText=function(a){if(this.changeHandler_){var b=this.changeHandler_(a);null!==b&&void 0!==b&&(a=b)}Blockly.Field.prototype.setText.call(this,a)};
Blockly.FieldTextInput.injectDom_=function(a){a=Blockly.createSvgElement("foreignObject",{height:22},a);Blockly.FieldTextInput.svgForeignObject_=a;var b=goog.dom.createDom("body","blocklyMinimalBody"),c=goog.dom.createDom("input","blocklyHtmlInput");Blockly.FieldTextInput.htmlInput_=c;b.appendChild(c);a.appendChild(b)};
Blockly.FieldTextInput.disposeDom_=function(){goog.dom.removeNode(Blockly.FieldTextInput.svgForeignObject_);Blockly.FieldTextInput.svgForeignObject_=null;Blockly.FieldTextInput.htmlInput_=null};Blockly.FieldTextInput.prototype.CURSOR="text";
Blockly.FieldTextInput.prototype.showEditor_=function(){if(window.opera){var a=window.prompt(Blockly.MSG_CHANGE_VALUE_TITLE,this.text_);if(this.changeHandler_){var b=this.changeHandler_(a);void 0!==b&&(a=b)}null!==a&&this.setText(a)}else{a=this.sourceBlock_.workspace.getCanvas();Blockly.FieldTextInput.injectDom_(a);b=Blockly.FieldTextInput.htmlInput_;b.value=b.defaultValue=this.text_;b.oldValue_=null;var c=Blockly.FieldTextInput.svgForeignObject_,d=Blockly.getAbsoluteXY_(this.borderRect_),e=Blockly.getAbsoluteXY_(a);
d.x-=e.x;d.y-=e.y;Blockly.RTL||c.setAttribute("x",d.x+1);goog.userAgent.GECKO?c.setAttribute("y",d.y-1):c.setAttribute("y",d.y-3);b.focus();b.select();b.onBlurWrapper_=Blockly.bindEvent_(b,"blur",this,this.onHtmlInputBlur_);b.onKeyUpWrapper_=Blockly.bindEvent_(b,"keyup",this,this.onHtmlInputChange_);b.onKeyPressWrapper_=Blockly.bindEvent_(b,"keypress",this,this.onHtmlInputChange_);b.onWorkspaceChangeWrapper_=Blockly.bindEvent_(a,"blocklyWorkspaceChange",this,this.resizeEditor_);this.validate_();this.resizeEditor_()}};
Blockly.FieldTextInput.prototype.onHtmlInputBlur_=function(a){this.closeEditor_(!0)};Blockly.FieldTextInput.prototype.onHtmlInputChange_=function(a){if(13==a.keyCode)this.closeEditor_(!0);else if(27==a.keyCode)this.closeEditor_(!1);else{a=Blockly.FieldTextInput.htmlInput_;var b=a.value;b!==a.oldValue_&&(a.oldValue_=b,this.setText(b),this.validate_())}};
Blockly.FieldTextInput.prototype.validate_=function(){var a=!0,b=Blockly.FieldTextInput.htmlInput_;this.changeHandler_&&(a=this.changeHandler_(b.value));null===a?Blockly.addClass_(b,"blocklyInvalidInput"):Blockly.removeClass_(b,"blocklyInvalidInput")};
Blockly.FieldTextInput.prototype.resizeEditor_=function(){var a=Blockly.FieldTextInput.htmlInput_,b=this.group_.getBBox(),c=Blockly.FieldTextInput.svgForeignObject_;c.setAttribute("width",b.width);a.style.width=b.width-2+"px";a=Blockly.getAbsoluteXY_(this.group_);b=this.sourceBlock_.workspace.getCanvas();b=Blockly.getAbsoluteXY_(b);a.x-=b.x;c.setAttribute("x",a.x-4)};
Blockly.FieldTextInput.prototype.closeEditor_=function(a){var b=Blockly.FieldTextInput.htmlInput_;Blockly.unbindEvent_(b.onBlurWrapper_);Blockly.unbindEvent_(b.onKeyUpWrapper_);Blockly.unbindEvent_(b.onKeyPressWrapper_);Blockly.unbindEvent_(b.onWorkspaceChangeWrapper_);a?(a=b.value,this.changeHandler_&&(a=this.changeHandler_(a),null===a&&(a=b.defaultValue))):a=b.defaultValue;this.setText(a);Blockly.FieldTextInput.disposeDom_();this.sourceBlock_.render()};
Blockly.FieldTextInput.numberValidator=function(a){a=a.replace(/O/ig,"0");a=a.replace(/,/g,"");a=parseFloat(a||0);return isNaN(a)?null:String(a)};Blockly.FieldTextInput.nonnegativeIntegerValidator=function(a){(a=Blockly.FieldTextInput.numberValidator(a))&&(a=String(Math.max(0,Math.floor(a))));return a};Blockly.Generator={};Blockly.Generator.NAME_TYPE="generated_function";Blockly.Generator.languages={};Blockly.Generator.get=function(a){if(!(a in Blockly.Generator.languages)){var b=new Blockly.CodeGenerator(a);Blockly.Generator.languages[a]=b}return Blockly.Generator.languages[a]};
Blockly.Generator.workspaceToCode=function(a){var b=[];a=Blockly.Generator.get(a);a.init();for(var c=Blockly.mainWorkspace.getTopBlocks(!0),d=0,e;e=c[d];d++){var f=a.blockToCode(e);f instanceof Array&&(f=f[0]);f&&(e.outputConnection&&a.scrubNakedValue&&(f=a.scrubNakedValue(f)),b.push(f))}b=b.join("\n");b=a.finish(b);b=b.replace(/^\s+\n/,"");b=b.replace(/\n\s+$/,"\n");return b=b.replace(/[ \t]+\n/g,"\n")};Blockly.Generator.prefixLines=function(a,b){return b+a.replace(/\n(.)/g,"\n"+b+"$1")};
Blockly.Generator.allNestedComments=function(a){var b=[];a=a.getDescendants();for(var c=0;c<a.length;c++){var d=a[c].getCommentText();d&&b.push(d)}b.length&&b.push("");return b.join("\n")};Blockly.CodeGenerator=function(a){this.name_=a;this.RESERVED_WORDS_=""};
Blockly.CodeGenerator.prototype.blockToCode=function(a){if(!a)return"";if(a.disabled)return a=a.nextConnection&&a.nextConnection.targetBlock(),this.blockToCode(a);var b=this[a.type];if(!b)throw'Language "'+this.name_+'" does not know how to generate code for block type "'+a.type+'".';b=b.call(a);return b instanceof Array?[this.scrub_(a,b[0]),b[1]]:this.scrub_(a,b)};
Blockly.CodeGenerator.prototype.valueToCode=function(a,b,c){if(isNaN(c))throw'Expecting valid order from block "'+a.type+'".';a=a.getInputTargetBlock(b);if(!a)return"";var d=this.blockToCode(a);if(""===d)return"";if(!(d instanceof Array))throw'Expecting tuple from value block "'+a.type+'".';b=d[0];d=d[1];if(isNaN(d))throw'Expecting valid order from value block "'+a.type+'".';b&&c<=d&&(b="("+b+")");return b};
Blockly.CodeGenerator.prototype.statementToCode=function(a,b){var c=a.getInputTargetBlock(b),d=this.blockToCode(c);if(!goog.isString(d))throw'Expecting code from statement block "'+c.type+'".';d&&(d=Blockly.Generator.prefixLines(d,"  "));return d};Blockly.CodeGenerator.prototype.addReservedWords=function(a){this.RESERVED_WORDS_+=a+","};Blockly.inject=function(a,b){if(!goog.dom.contains(document,a))throw"Error: container is not in current document.";b&&Blockly.parseOptions_(b);Blockly.createDom_(a);Blockly.init_()};Blockly.parseOptions_=function(a){Blockly.RTL=!!a.rtl;Blockly.editable=!a.readOnly;Blockly.pathToBlockly=a.path||"./"};
Blockly.createDom_=function(a){a.setAttribute("dir","LTR");var b=goog.dom.createDom("link",{href:Blockly.pathToBlockly+"media/blockly.css",rel:"stylesheet",type:"text/css"});Blockly.bindEvent_(b,"load",null,Blockly.cssLoaded);var c=document.head||document.getElementsByTagName("head")[0];if(!c)throw"No head in document.";c.appendChild(b);var b=Blockly.createSvgElement("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:html":"http://www.w3.org/1999/xhtml","xmlns:xlink":"http://www.w3.org/1999/xlink",
version:"1.1","class":"blocklySvg"},null),c=Blockly.createSvgElement("defs",{},b),d,e;d=Blockly.createSvgElement("filter",{id:"blocklyEmboss"},c);Blockly.createSvgElement("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:1,result:"blur"},d);e=Blockly.createSvgElement("feSpecularLighting",{"in":"blur",surfaceScale:1,specularConstant:0.5,specularExponent:10,"lighting-color":"white",result:"specOut"},d);Blockly.createSvgElement("fePointLight",{x:-5E3,y:-1E4,z:2E4},e);Blockly.createSvgElement("feComposite",
{"in":"specOut",in2:"SourceAlpha",operator:"in",result:"specOut"},d);Blockly.createSvgElement("feComposite",{"in":"SourceGraphic",in2:"specOut",operator:"arithmetic",k1:0,k2:1,k3:1,k4:0},d);d=Blockly.createSvgElement("filter",{id:"blocklyTrashcanShadowFilter"},c);Blockly.createSvgElement("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:2,result:"blur"},d);Blockly.createSvgElement("feOffset",{"in":"blur",dx:1,dy:1,result:"offsetBlur"},d);d=Blockly.createSvgElement("feMerge",{},d);Blockly.createSvgElement("feMergeNode",
{"in":"offsetBlur"},d);Blockly.createSvgElement("feMergeNode",{"in":"SourceGraphic"},d);d=Blockly.createSvgElement("filter",{id:"blocklyShadowFilter"},c);Blockly.createSvgElement("feGaussianBlur",{stdDeviation:2},d);c=Blockly.createSvgElement("pattern",{id:"blocklyDisabledPattern",patternUnits:"userSpaceOnUse",width:10,height:10},c);Blockly.createSvgElement("rect",{width:10,height:10,fill:"#aaa"},c);Blockly.createSvgElement("path",{d:"M 0 0 L 10 10 M 10 0 L 0 10",stroke:"#cc0"},c);Blockly.mainWorkspace=
new Blockly.Workspace(Blockly.editable);b.appendChild(Blockly.mainWorkspace.createDom());Blockly.Toolbox&&Blockly.editable&&b.appendChild(Blockly.Toolbox.createDom());Blockly.Tooltip&&b.appendChild(Blockly.Tooltip.createDom());Blockly.editable&&Blockly.FieldDropdown&&b.appendChild(Blockly.FieldDropdown.createDom());Blockly.ContextMenu&&Blockly.ContextMenu&&b.appendChild(Blockly.ContextMenu.createDom());a.appendChild(b);Blockly.svg=b;Blockly.svgResize();Blockly.widgetDiv=goog.dom.createDom("div",{"class":"blocklyWidgetDiv"});
a.appendChild(Blockly.widgetDiv)};
Blockly.init_=function(){Blockly.bindEvent_(window,"resize",document,Blockly.svgResize);Blockly.bindEvent_(Blockly.svg,"mousedown",null,Blockly.onMouseDown_);Blockly.bindEvent_(document,"mouseup",null,Blockly.onMouseUp_);Blockly.bindEvent_(Blockly.svg,"mousemove",null,Blockly.onMouseMove_);Blockly.bindEvent_(Blockly.svg,"contextmenu",null,Blockly.onContextMenu_);Blockly.bindEvent_(document,"keydown",null,Blockly.onKeyDown_);Blockly.editable&&Blockly.Toolbox&&Blockly.Toolbox.init();Blockly.mainWorkspace.addTrashcan(Blockly.getMainWorkspaceMetrics);
Blockly.mainWorkspace.scrollbar=new Blockly.ScrollbarPair(Blockly.mainWorkspace.getBubbleCanvas(),Blockly.getMainWorkspaceMetrics,Blockly.setMainWorkspaceMetrics);Blockly.loadAudio_("click");Blockly.loadAudio_("delete")};Blockly.FieldCheckbox=function(a,b){this.changeHandler_=b;Blockly.Field.call(this,"");this.checkElement_=Blockly.createSvgElement("text",{"class":"blocklyText",x:-3},this.group_);var c=document.createTextNode("\u2713");this.checkElement_.appendChild(c);this.setValue(a)};goog.inherits(Blockly.FieldCheckbox,Blockly.Field);Blockly.FieldCheckbox.prototype.CURSOR="default";Blockly.FieldCheckbox.prototype.getValue=function(){return String(this.state_).toUpperCase()};
Blockly.FieldCheckbox.prototype.setValue=function(a){a="TRUE"==a;this.state_!==a&&(this.state_=a,this.checkElement_.style.display=a?"block":"none",this.sourceBlock_&&this.sourceBlock_.rendered&&this.sourceBlock_.workspace.fireChangeEvent())};Blockly.FieldCheckbox.prototype.showEditor_=function(){var a=!this.state_;if(this.changeHandler_){var b=this.changeHandler_(a);void 0!==b&&(a=b)}null!==a&&this.setValue(String(a).toUpperCase())};Blockly.core={};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview English strings.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.messages.en');

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Duplicate';
Blockly.MSG_REMOVE_COMMENT = 'Remove Comment';
Blockly.MSG_ADD_COMMENT = 'Add Comment';
Blockly.MSG_EXTERNAL_INPUTS = 'External Inputs';
Blockly.MSG_INLINE_INPUTS = 'Inline Inputs';
Blockly.MSG_DELETE_BLOCK = 'Delete Block';
Blockly.MSG_DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.MSG_COLLAPSE_BLOCK = 'Collapse Block';
Blockly.MSG_EXPAND_BLOCK = 'Expand Block';
Blockly.MSG_DISABLE_BLOCK = 'Disable Block';
Blockly.MSG_ENABLE_BLOCK = 'Enable Block';
Blockly.MSG_HELP = 'Help';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Change value:';
Blockly.MSG_NEW_VARIABLE = 'New variable...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.MSG_RENAME_VARIABLE = 'Rename variable...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';

// Toolbox.
Blockly.MSG_VARIABLE_CATEGORY = 'Variables';
Blockly.MSG_PROCEDURE_CATEGORY = 'Procedures';

// Colour Blocks.
Blockly.LANG_CATEGORY_COLOUR = 'Colour';
Blockly.LANG_COLOUR_PICKER_HELPURL = 'http://en.wikipedia.org/wiki/Color';
Blockly.LANG_COLOUR_PICKER_TOOLTIP = 'Choose a colour form the palette.';

Blockly.LANG_COLOUR_RGB_HELPURL = 'http://en.wikipedia.org/wiki/RGB_color_model';
Blockly.LANG_COLOUR_RGB_TITLE = 'colour with';
Blockly.LANG_COLOUR_RGB_RED = 'red';
Blockly.LANG_COLOUR_RGB_GREEN = 'green';
Blockly.LANG_COLOUR_RGB_BLUE = 'blue';
Blockly.LANG_COLOUR_RGB_TOOLTIP = 'Create a colour with the specified amount of red, green,\n' +
    'and blue.  All values must be between 0.0 and 1.0.';

Blockly.LANG_COLOUR_BLEND_HELPURL = 'http://meyerweb.com/eric/tools/color-blend/';
Blockly.LANG_COLOUR_BLEND_TITLE = 'blend';
Blockly.LANG_COLOUR_BLEND_COLOUR1 = 'colour 1';
Blockly.LANG_COLOUR_BLEND_COLOUR2 = 'colour 2';
Blockly.LANG_COLOUR_BLEND_RATIO = 'ratio';
Blockly.LANG_COLOUR_BLEND_TOOLTIP = 'Blends two colours together with a given ratio (0.0 - 1.0).';

// Control Blocks.
Blockly.LANG_CATEGORY_CONTROLS = 'Control';
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = 'If a value is true, then do some statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = 'If a value is true, then do the first block of statements.\n' +
    'Otherwise, do the second block of statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = 'If the first value is true, then do the first block of statements.\n' +
    'Otherwise, if the second value is true, do the second block of statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = 'If the first value is true, then do the first block of statements.\n' +
    'Otherwise, if the second value is true, do the second block of statements.\n' +
    'If none of the values are true, do the last block of statements.';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'if';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'do';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'if';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP = 'Add, remove, or reorder sections\n' +
    'to reconfigure this if block.';

Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP = 'Add a condition to the if block.';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP = 'Add a final, catch-all condition to the if block.';

Blockly.LANG_CONTROLS_REPEAT_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT = 'repeat';
Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES = 'times';
Blockly.LANG_CONTROLS_REPEAT_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_REPEAT_TOOLTIP = 'Do some statements several times.';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://code.google.com/p/blockly/wiki/Repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT = 'repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = 'while';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = 'until';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = 'While a value is true, then do some statements.';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = 'While a value is false, then do some statements.';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'count with';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = 'from';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = 'to';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_FOR_TOOLTIP = 'Count from a start number to an end number.\n' +
    'For each count, set the current count number to\n' +
    'variable "%1", and then do some statements.';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = 'for each item';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = 'in list';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP = 'For each item in a list, set the item to\n' +
    'variable "%1", and then do some statements.';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://en.wikipedia.org/wiki/Control_flow';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'of loop';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'break out';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'continue with next iteration';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = 'Break out of the containing loop.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'Skip the rest of this loop, and\n' +
    'continue with the next iteration.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = 'Warning:\n' +
    'This block may only\n' +
    'be used within a loop.';

// Logic Blocks.
Blockly.LANG_CATEGORY_LOGIC = 'Logic';
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Return true if both inputs equal each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Return true if both inputs are not equal to each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Return true if the first input is smaller\n' +
    'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Return true if the first input is smaller\n' +
    'than or equal to the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Return true if the first input is greater\n' +
    'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Return true if the first input is greater\n' +
    'than or equal to the second input.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'and';
Blockly.LANG_LOGIC_OPERATION_OR = 'or';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Return true if both inputs are true.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Return true if either inputs are true.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'not';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP = 'Returns true if the input is false.\n' +
    'Returns false if the input is true.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'true';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'false';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP = 'Returns either true or false.';

Blockly.LANG_LOGIC_NULL_HELPURL = 'http://en.wikipedia.org/wiki/Nullable_type';
Blockly.LANG_LOGIC_NULL = 'null';
Blockly.LANG_LOGIC_NULL_TOOLTIP = 'Returns null.';

Blockly.LANG_LOGIC_TERNARY_HELPURL = 'http://en.wikipedia.org/wiki/%3F:';
Blockly.LANG_LOGIC_TERNARY_CONDITION = 'test';
Blockly.LANG_LOGIC_TERNARY_IF_TRUE = 'if true';
Blockly.LANG_LOGIC_TERNARY_IF_FALSE = 'if false';
Blockly.LANG_LOGIC_TERNARY_TOOLTIP = 'Check the condition in "test". If the condition is true\n' +
    'returns the "if true" value, otherwise returns the "if false" value.';

// Math Blocks.
Blockly.LANG_CATEGORY_MATH = 'Math';
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://en.wikipedia.org/wiki/Number';
Blockly.LANG_MATH_NUMBER_TOOLTIP = 'A number.';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://en.wikipedia.org/wiki/Arithmetic';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = 'Return the sum of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = 'Return the difference of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = 'Return the product of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = 'Return the quotient of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = 'Return the first number raised to\n' +
    'the power of the second number.';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://en.wikipedia.org/wiki/Square_root';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'square root';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'absolute';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = 'Return the square root of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = 'Return the absolute value of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = 'Return the negation of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = 'Return the natural logarithm of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = 'Return the base 10 logarithm of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = 'Return e to the power of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Return 10 to the power of a number.';

Blockly.LANG_MATH_TRIG_HELPURL = 'http://en.wikipedia.org/wiki/Trigonometric_functions';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Return the sine of a degree (not radian).';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Return the cosine of a degree (not radian).';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Return the tangent of a degree (not radian).';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Return the arcsine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Return the arccosine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Return the arctangent of a number.';

Blockly.LANG_MATH_CONSTANT_HELPURL = 'http://en.wikipedia.org/wiki/Mathematical_constant';
Blockly.LANG_MATH_CONSTANT_TOOLTIP = 'Return one of the common constants: \u03c0 (3.141\u2026), e (2.718\u2026), \u03c6 (1.618\u2026),\n' +
    'sqrt(2) (1.414\u2026), sqrt(\u00bd) (0.707\u2026), or \u221e (infinity).';

Blockly.LANG_MATH_IS_EVEN = 'is even';
Blockly.LANG_MATH_IS_ODD = 'is odd';
Blockly.LANG_MATH_IS_PRIME = 'is prime';
Blockly.LANG_MATH_IS_WHOLE = 'is whole';
Blockly.LANG_MATH_IS_POSITIVE = 'is positive';
Blockly.LANG_MATH_IS_NEGATIVE = 'is negative';
Blockly.LANG_MATH_IS_DIVISIBLE_BY = 'is divisible by';
Blockly.LANG_MATH_IS_TOOLTIP = 'Check if a number is an even, odd, prime, whole, positive, negative,\n' +
    'or if it is divisible by certain number.  Returns true or false.';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://en.wikipedia.org/wiki/Negation';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE = 'change';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'item';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'by';
Blockly.LANG_MATH_CHANGE_TOOLTIP = 'Add a number to variable "%1".';

Blockly.LANG_MATH_ROUND_HELPURL = 'http://en.wikipedia.org/wiki/Rounding';
Blockly.LANG_MATH_ROUND_TOOLTIP = 'Round a number up or down.';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'round';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'round up';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'round down';

Blockly.LANG_MATH_ONLIST_HELPURL = '';
Blockly.LANG_MATH_ONLIST_INPUT_OFLIST = 'of list';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'sum';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'min';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'max';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'average';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'median';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'modes';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'standard deviation';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'random item';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Return the sum of all the numbers in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Return the smallest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Return the largest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Return the arithmetic mean of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Return the median number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Return a list of the most common item(s) in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Return the standard deviation of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Return a random element from the list.';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://en.wikipedia.org/wiki/Modulo_operation';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'remainder of';
Blockly.LANG_MATH_MODULO_TOOLTIP = 'Return the remainder of dividing both numbers.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'constrain';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'low';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'high';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP = 'Constrain a number to be between the specified limits (inclusive).';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'random integer from';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'to';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP = 'Return a random integer between the two\n' +
    'specified limits, inclusive.';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'random fraction';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP = 'Return a random fraction between\n' +
    '0.0 (inclusive) and 1.0 (exclusive).';

// Text Blocks.
Blockly.LANG_CATEGORY_TEXT = 'Text';
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://en.wikipedia.org/wiki/String_(computer_science)';
Blockly.LANG_TEXT_TEXT_TOOLTIP = 'A letter, word, or line of text.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'create text with';
Blockly.LANG_TEXT_JOIN_TOOLTIP = 'Create a piece of text by joining\n' +
    'together any number of items.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'join';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP = 'Add, remove, or reorder sections to reconfigure this text block.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'item';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP = 'Add an item to the text.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'to';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'append text';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'item';
Blockly.LANG_TEXT_APPEND_TOOLTIP = 'Append some text to variable "%1".';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'length';
Blockly.LANG_TEXT_LENGTH_TOOLTIP = 'Returns number of letters (including spaces)\n' +
    'in the provided text.';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'is empty';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP = 'Returns true if the provided text is empty.';

Blockly.LANG_TEXT_ENDSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_ENDSTRING_INPUT = 'letters in text';
Blockly.LANG_TEXT_ENDSTRING_TOOLTIP = 'Returns specified number of letters at the beginning or end of the text.';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_TITLE_FIND = 'find';
Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE = 'occurrence of text';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP = 'Returns the index of the first/last occurrence\n' +
    'of first text in the second text.\n' +
    'Returns 0 if text is not found.';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_CHARAT_GET = 'get';
Blockly.LANG_TEXT_CHARAT_FROM_START = 'letter #';
Blockly.LANG_TEXT_CHARAT_FROM_END = 'letter # from end';
Blockly.LANG_TEXT_CHARAT_FIRST = 'first letter';
Blockly.LANG_TEXT_CHARAT_LAST = 'last letter';
Blockly.LANG_TEXT_CHARAT_RANDOM = 'random letter';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_CHARAT_TOOLTIP = 'Returns the letter at the specified position.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_TITLE_TO = 'to';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP = 'Return a copy of the text in a different case.';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'UPPER CASE';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'lower case';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'Title Case';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_TITLE_SPACE = 'trim spaces from';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TOOLTIP = 'Return a copy of the text with spaces\n' +
    'removed from one or both ends.';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TITLE_SIDE = 'side';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'both';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'left';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'right';

Blockly.LANG_TEXT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_PRINT_TITLE_PRINT = 'print';
Blockly.LANG_TEXT_PRINT_TOOLTIP = 'Print the specified text, number or other value.';

Blockly.LANG_TEXT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR = 'prompt for';
Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE = 'with message';
Blockly.LANG_TEXT_PROMPT_TOOLTIP = 'Prompt for user input with the specified text.';
Blockly.LANG_TEXT_PROMPT_TYPE_TEXT = 'text';
Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER = 'number';

// Lists Blocks.
Blockly.LANG_CATEGORY_LISTS = 'Lists';
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE = 'create empty list';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP = 'Returns a list, of length 0, containing no data records';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = 'create list with';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP = 'Create a list with any number of items.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = 'list';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP = 'Add, remove, or reorder sections to reconfigure this list block.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = 'item';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP = 'Add an item to the list.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = 'create list with item';
Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED = 'repeated';
Blockly.LANG_LISTS_REPEAT_INPUT_TIMES = 'times';
Blockly.LANG_LISTS_REPEAT_TOOLTIP = 'Creates a list consisting of the given value\n' +
    'repeated the specified number of times.';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'length';
Blockly.LANG_LISTS_LENGTH_TOOLTIP = 'Returns the length of a list.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'is empty';
Blockly.LANG_LISTS_TOOLTIP = 'Returns true if the list is empty.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = 'find';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = 'occurrence of item';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP = 'Returns the index of the first/last occurrence\n' +
    'of the item in the list.\n' +
    'Returns 0 if text is not found.';
Blockly.LANG_LISTS_INDEX_OF_FIRST = 'first';
Blockly.LANG_LISTS_INDEX_OF_LAST = 'last';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_GET = 'get';
Blockly.LANG_LISTS_GET_INDEX_GET_REMOVE = 'get and remove';
Blockly.LANG_LISTS_GET_INDEX_REMOVE = 'remove';
Blockly.LANG_LISTS_GET_INDEX_FROM_START = '#';
Blockly.LANG_LISTS_GET_INDEX_FROM_END = '# from end';
Blockly.LANG_LISTS_GET_INDEX_FIRST = 'first';
Blockly.LANG_LISTS_GET_INDEX_LAST = 'last';
Blockly.LANG_LISTS_GET_INDEX_RANDOM = 'random';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_START = 'Returns the item at the specified position in a list.\n' +
    '#1 is the first item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_END = 'Returns the item at the specified position in a list.\n' +
    '#1 is the last item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FIRST = 'Returns the first item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_LAST = 'Returns the last item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_RANDOM = 'Returns a random item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_START = 'Removes and returns the item at the specified position\n' +
    ' in a list.  #1 is the first item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_END = 'Removes and returns the item at the specified position\n' +
    ' in a list.  #1 is the last item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST = 'Removes and returns the first item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST = 'Removes and returns the last item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM = 'Removes and returns a random item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_START = 'Removes the item at the specified position\n' +
    ' in a list.  #1 is the first item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_END = 'Removes the item at the specified position\n' +
    ' in a list.  #1 is the last item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST = 'Removes the first item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST = 'Removes the last item in a list.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM = 'Removes a random item in a list.';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_INPUT_AT = 'set item at';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = 'to';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP = 'Sets the value at the specified position in a list.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE = 'get';
Blockly.LANG_VARIABLES_GET_ITEM = 'item';
Blockly.LANG_VARIABLES_GET_TOOLTIP = 'Returns the value of this variable.';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE = 'set';
Blockly.LANG_VARIABLES_SET_ITEM = 'item';
Blockly.LANG_VARIABLES_SET_TOOLTIP = 'Sets this variable to be equal to the input.';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = 'do';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP = 'A procedure with no return value.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'return';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP = 'A procedure with a return value.';

Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Warning:\n' +
    'This procedure has\n' +
    'duplicate parameters.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'do';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP = 'Call a procedure with no return value.';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP = 'Call a procedure with a return value.';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'parameters';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'variable:';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Highlight Procedure';

Blockly.LANG_PROCEDURES_IFRETURN_TOOLTIP = 'If a value is true, then return a value.';
Blockly.LANG_PROCEDURES_IFRETURN_WARNING = 'Warning:\n' +
    'This block may only be\n' +
    'used within a procedure.';
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Colour blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.colour');

goog.require('Blockly.Language');

Blockly.Language.colour_picker = {
  // Colour picker.
  category: Blockly.LANG_CATEGORY_COLOUR,
  helpUrl: Blockly.LANG_COLOUR_PICKER_HELPURL,
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldColour('#ff0000'), 'COLOUR');
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.LANG_COLOUR_PICKER_TOOLTIP);
  }
};

Blockly.Language.colour_rgb = {
  // Compose a colour from RGB components.
  category: Blockly.LANG_CATEGORY_COLOUR,
  helpUrl: Blockly.LANG_COLOUR_RGB_HELPURL,
  init: function() {
    this.setColour(20);
    this.appendValueInput('RED')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_RGB_TITLE)
        .appendTitle(Blockly.LANG_COLOUR_RGB_RED);
    this.appendValueInput('GREEN')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_RGB_GREEN);
    this.appendValueInput('BLUE')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_RGB_BLUE);
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.LANG_COLOUR_RGB_TOOLTIP);
  }
};

Blockly.Language.colour_blend = {
  // Blend two colours together.
  category: Blockly.LANG_CATEGORY_COLOUR,
  helpUrl: Blockly.LANG_COLOUR_BLEND_HELPURL,
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR1')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_BLEND_TITLE)
        .appendTitle(Blockly.LANG_COLOUR_BLEND_COLOUR1);
    this.appendValueInput('COLOUR2')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_BLEND_COLOUR2);
    this.appendValueInput('RATIO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_COLOUR_BLEND_RATIO);
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.LANG_COLOUR_BLEND_TOOLTIP);
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.control');

goog.require('Blockly.Language');

Blockly.Language.controls_if = {
  // If/elseif/else condition.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF0')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
    for (var x = 1; x <= this.elseifCount_; x++) {
      this.appendValueInput('IF' + x)
          .setCheck(Boolean)
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + x)
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = new Blockly.Block(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = new Blockly.Block(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var x = this.elseifCount_; x > 0; x--) {
      this.removeInput('IF' + x);
      this.removeInput('DO' + x);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck(Boolean)
              .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + x);
          var inputDo = this.getInput('DO' + x);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          x++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.controls_if_if = {
  // If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_elseif = {
  // Else-If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_else = {
  // Else condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_repeat = {
  // Repeat n times.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldTextInput('10',
            Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Language.controls_whileUntil = {
  // Do while/until loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('BOOL')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'MODE');
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('MODE');
      return Blockly.Language.controls_whileUntil.TOOLTIPS[op];
    });
  }
};

Blockly.Language.controls_whileUntil.OPERATORS =
    [[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
     [Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];

Blockly.Language.controls_whileUntil.TOOLTIPS = {
  WHILE: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
  UNTIL: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
};

Blockly.Language.controls_for = {
  // For loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FOR_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_WITH)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR');
    this.appendValueInput('FROM')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.controls_forEach = {
  // For each loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FOREACH_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOREACH_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.controls_flow_statements = {
  // Flow statements: continue, break.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL,
  init: function() {
    this.setColour(120);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendDummyInput()
        .appendTitle(dropdown, 'FLOW')
        .appendTitle(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
    this.setPreviousStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('FLOW');
      return Blockly.Language.controls_flow_statements.TOOLTIPS[op];
    });
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a control statement?
    var block = this;
    do {
      if (block.type == 'controls_repeat' ||
          block.type == 'controls_forEach' ||
          block.type == 'controls_for' ||
          block.type == 'controls_whileUntil') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  }
};

Blockly.Language.controls_flow_statements.OPERATORS =
    [[Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
     [Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];

Blockly.Language.controls_flow_statements.TOOLTIPS = {
  BREAK: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
  CONTINUE: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.lists');

goog.require('Blockly.Language');

Blockly.Language.lists_create_empty = {
  // Create an empty list.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Array);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE);
    this.setTooltip(Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP);
  }
};

Blockly.Language.lists_create_with = {
  // Create a list with any number of elements of any type.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: '',
  init: function() {
    this.setColour(210);
    this.appendValueInput('ADD0')
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
    this.appendValueInput('ADD1');
    this.appendValueInput('ADD2');
    this.setOutput(true, Array);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP);
    this.itemCount_ = 3;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x);
      if (x == 0) {
        input.appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE);
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.lists_create_with_container = {
  // Container.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_create_with_item = {
  // Add items.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_repeat = {
  // Create a list with one element repeated.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_REPEAT_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Array);
    this.appendValueInput('ITEM')
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_WITH);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_TIMES);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_REPEAT_TOOLTIP);
  }
};

Blockly.Language.lists_length = {
  // List length.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_LENGTH_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('VALUE')
        .setCheck([Array, String])
        .appendTitle(Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_LISTS_LENGTH_TOOLTIP);
  }
};

Blockly.Language.lists_isEmpty = {
  // Is the list empty?
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_IS_EMPTY_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('VALUE')
        .setCheck([Array, String])
        .appendTitle(Blockly.LANG_LISTS_INPUT_IS_EMPTY);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LISTS_TOOLTIP);
  }
};

Blockly.Language.lists_indexOf = {
  // Find an item in the list.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_INDEX_OF_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Number);
    this.appendValueInput('FIND')
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'END')
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE);
    this.appendValueInput('VALUE')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_INDEX_OF_TOOLTIP);
  }
};

Blockly.Language.lists_indexOf.OPERATORS =
    [[Blockly.LANG_LISTS_INDEX_OF_FIRST, 'FIRST'],
     [Blockly.LANG_LISTS_INDEX_OF_LAST, 'LAST']];

Blockly.Language.lists_getIndex = {
  // Get element at index.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_GET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    var modeMenu = new Blockly.FieldDropdown(this.MODE, function(value) {
      var isStatement = (value == 'REMOVE');
      this.sourceBlock_.updateStatement(isStatement);
    });
    this.appendDummyInput()
        .appendTitle(modeMenu, 'MODE')
        .appendTitle('');
    this.appendDummyInput('AT');
    this.appendValueInput('VALUE')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.updateAt(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var combo = thisBlock.getTitleValue('MODE') + '_' +
          thisBlock.getTitleValue('WHERE');
      return Blockly['LANG_LISTS_GET_INDEX_TOOLTIP_' + combo];
    });
  },
  mutationToDom: function() {
    // Save whether the block is a statement or a value.
    // Save whether there is an 'AT' input.
    var container = document.createElement('mutation');
    var isStatement = !this.outputConnection;
    container.setAttribute('statement', isStatement);
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the block shape.
    // Note: Until January 2013 this block did not have mutations,
    // so 'statement' defaults to false and 'at' defaults to true.
    var isStatement = (xmlElement.getAttribute('statement') == 'true');
    this.updateStatement(isStatement);
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt(isAt);
  },
  updateStatement: function(newStatement) {
    // Switch between a value block and a statement block.
    var oldStatement = !this.outputConnection;
    if (newStatement != oldStatement) {
      this.unplug(true, true);
      if (newStatement) {
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      } else {
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
      }
    }
  },
  updateAt: function(isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' input.
    this.removeInput('AT');
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck(Number);
    } else {
      this.appendDummyInput('AT');
    }
    this.moveInputBefore('AT', 'VALUE');
    var menu = new Blockly.FieldDropdown(this.WHERE, function(value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setTitleValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendTitle(menu, 'WHERE');
  }
};

Blockly.Language.lists_getIndex.MODE =
    [[Blockly.LANG_LISTS_GET_INDEX_GET, 'GET'],
     [Blockly.LANG_LISTS_GET_INDEX_GET_REMOVE, 'GET_REMOVE'],
     [Blockly.LANG_LISTS_GET_INDEX_REMOVE, 'REMOVE']];

Blockly.Language.lists_getIndex.WHERE =
    [[Blockly.LANG_LISTS_GET_INDEX_FROM_START, 'FROM_START'],
     [Blockly.LANG_LISTS_GET_INDEX_FROM_END, 'FROM_END'],
     [Blockly.LANG_LISTS_GET_INDEX_FIRST, 'FIRST'],
     [Blockly.LANG_LISTS_GET_INDEX_LAST, 'LAST'],
     [Blockly.LANG_LISTS_GET_INDEX_RANDOM, 'RANDOM']];

Blockly.Language.lists_setIndex = {
  // Set element at index.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('AT')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_AT);
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST);
    this.appendValueInput('TO')
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP);
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Language.logic');

goog.require('Blockly.Language');

Blockly.Language.logic_compare = {
  // Comparison operator.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_compare.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_compare.OPERATORS =
    [['=', 'EQ'],
     ['\u2260', 'NEQ'],
     ['<', 'LT'],
     ['\u2264', 'LTE'],
     ['>', 'GT'],
     ['\u2265', 'GTE']];

Blockly.Language.logic_compare.TOOLTIPS = {
  EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
  NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
  LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
  GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
  GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
};

Blockly.Language.logic_operation = {
  // Logical operations: 'and', 'or'.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A')
        .setCheck(Boolean);
    this.appendValueInput('B')
        .setCheck(Boolean)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_operation.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_operation.OPERATORS =
    [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'],
     [Blockly.LANG_LOGIC_OPERATION_OR, 'OR']];

Blockly.Language.logic_operation.TOOLTIPS = {
  AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
  OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
};

Blockly.Language.logic_negate = {
  // Negation.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('BOOL')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT);
    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Language.logic_boolean.BOOLEANS =
    [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'],
     [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];

Blockly.Language.logic_null = {
  // Null data type.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_NULL_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LOGIC_NULL);
    this.setTooltip(Blockly.LANG_LOGIC_NULL_TOOLTIP);
  }
};

Blockly.Language.logic_ternary = {
  // Ternary operator.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_TERNARY_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_CONDITION);
    this.appendValueInput('THEN')
        .setCheck(null)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_TRUE);
    this.appendValueInput('ELSE')
        .setCheck(null)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_FALSE);
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_LOGIC_TERNARY_TOOLTIP);
  }
};

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Language.math');

goog.require('Blockly.Language');

Blockly.Language.math_number = {
  // Numeric value.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_NUMBER_HELPURL,
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'NUM');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_MATH_NUMBER_TOOLTIP);
  }
};

Blockly.Language.math_arithmetic = {
  // Basic arithmetic operator.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ARITHMETIC_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('A')
        .setCheck(Number);
    this.appendValueInput('B')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_arithmetic.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_arithmetic.OPERATORS =
    [['+', 'ADD'],
     ['-', 'MINUS'],
     ['\u00D7', 'MULTIPLY'],
     ['\u00F7', 'DIVIDE'],
     ['^', 'POWER']];

Blockly.Language.math_arithmetic.TOOLTIPS = {
  ADD: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD,
  MINUS: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS,
  MULTIPLY: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
  DIVIDE: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE,
  POWER: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER
};

Blockly.Language.math_single = {
  // Advanced math operators with single operand.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_SINGLE_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_single.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_single.OPERATORS =
    [[Blockly.LANG_MATH_SINGLE_OP_ROOT, 'ROOT'],
     [Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
     ['-', 'NEG'],
     ['ln', 'LN'],
     ['log10', 'LOG10'],
     ['e^', 'EXP'],
     ['10^', 'POW10']];

Blockly.Language.math_single.TOOLTIPS = {
  ROOT: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT,
  ABS: Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS,
  NEG: Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG,
  LN: Blockly.LANG_MATH_SINGLE_TOOLTIP_LN,
  LOG10: Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10,
  EXP: Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP,
  POW10: Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10
};

Blockly.Language.math_trig = {
  // Trigonometry operators.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_TRIG_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_trig.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_trig.OPERATORS =
    [['sin', 'SIN'],
     ['cos', 'COS'],
     ['tan', 'TAN'],
     ['asin', 'ASIN'],
     ['acos', 'ACOS'],
     ['atan', 'ATAN']];

Blockly.Language.math_trig.TOOLTIPS = {
  SIN: Blockly.LANG_MATH_TRIG_TOOLTIP_SIN,
  COS: Blockly.LANG_MATH_TRIG_TOOLTIP_COS,
  TAN: Blockly.LANG_MATH_TRIG_TOOLTIP_TAN,
  ASIN: Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN,
  ACOS: Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS,
  ATAN: Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN
};

Blockly.Language.math_constant = {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_CONSTANT_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.CONSTANTS), 'CONSTANT');
    this.setTooltip(Blockly.LANG_MATH_CONSTANT_TOOLTIP);
  }
};

Blockly.Language.math_constant.CONSTANTS =
    [['\u03c0', 'PI'],
     ['e', 'E'],
     ['\u03c6', 'GOLDEN_RATIO'],
     ['sqrt(2)', 'SQRT2'],
     ['sqrt(\u00bd)', 'SQRT1_2'],
     ['\u221e', 'INFINITY']];

Blockly.Language.math_number_property = {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: '',
  init: function() {
    this.setColour(230);
    this.appendValueInput('NUMBER_TO_CHECK')
        .setCheck(Number);
    var dropdown = new Blockly.FieldDropdown(this.PROPERTIES, function(option) {
      var divisorInput = (option == 'DIVISIBLE_BY');
      this.sourceBlock_.updateShape(divisorInput);
    });
    this.appendDummyInput()
        .appendTitle(dropdown, 'PROPERTY');
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_MATH_IS_TOOLTIP);
  },
  mutationToDom: function() {
    // Save whether the 'divisorInput' should be true of false (present or not).
    var container = document.createElement('mutation');
    var divisorInput = (this.getTitleValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'divisorInput'.
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape(divisorInput);
  },
  updateShape: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
                 .setCheck(Number);
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

Blockly.Language.math_number_property.PROPERTIES =
    [[Blockly.LANG_MATH_IS_EVEN, 'EVEN'],
     [Blockly.LANG_MATH_IS_ODD, 'ODD'],
     [Blockly.LANG_MATH_IS_PRIME, 'PRIME'],
     [Blockly.LANG_MATH_IS_WHOLE, 'WHOLE'],
     [Blockly.LANG_MATH_IS_POSITIVE, 'POSITIVE'],
     [Blockly.LANG_MATH_IS_NEGATIVE, 'NEGATIVE'],
     [Blockly.LANG_MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];

Blockly.Language.math_change = {
  // Add to a variable in place.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(230);
    this.appendValueInput('DELTA')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CHANGE_TITLE_CHANGE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_MATH_CHANGE_TITLE_ITEM), 'VAR')
        .appendTitle(Blockly.LANG_MATH_CHANGE_INPUT_BY);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.math_round = {
  // Rounding functions.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ROUND_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setTooltip(Blockly.LANG_MATH_ROUND_TOOLTIP);
  }
};

Blockly.Language.math_round.OPERATORS =
    [[Blockly.LANG_MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
     [Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
     [Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']];

Blockly.Language.math_on_list = {
  // Evaluate a list of numbers to return sum, average, min, max, etc.
  // Some functions also work on text (min, max, mode, median).
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ONLIST_HELPURL,
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(230);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS, function(newOp) {
      if (newOp == 'MODE') {
        thisBlock.outputConnection.setCheck(Array);
      } else {
        thisBlock.outputConnection.setCheck(Number);
      }
    });
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(dropdown, 'OP')
        .appendTitle(Blockly.LANG_MATH_ONLIST_INPUT_OFLIST);
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_on_list.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_on_list.OPERATORS =
    [[Blockly.LANG_MATH_ONLIST_OPERATOR_SUM, 'SUM'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MIN, 'MIN'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MAX, 'MAX'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MODE, 'MODE'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];

Blockly.Language.math_on_list.TOOLTIPS = {
  SUM: Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM,
  MIN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN,
  MAX: Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX,
  AVERAGE: Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE,
  MEDIAN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN,
  MODE: Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE,
  STD_DEV: Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV,
  RANDOM: Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM
};

Blockly.Language.math_modulo = {
  // Remainder of a division.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_MODULO_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('DIVIDEND')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND);
    this.appendValueInput('DIVISOR')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle('\u00F7');
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_MODULO_TOOLTIP);
  }
};

Blockly.Language.math_constrain = {
  // Constrain a number between two limits.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_CONSTRAIN_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN);
    this.appendValueInput('LOW')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW);
    this.appendValueInput('HIGH')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_CONSTRAIN_TOOLTIP);
  }
};

Blockly.Language.math_random_int = {
  // Random integer between [X] and [Y].
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_RANDOM_INT_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('FROM')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_INT_TOOLTIP);
  }
};

Blockly.Language.math_random_float = {
  // Random fraction between 0 and 1.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP);
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.procedures');

goog.require('Blockly.Language');

Blockly.Language.procedures_defnoreturn = {
  // Define a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFNORETURN_DO);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP);
    this.arguments_ = [];
  },
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var x = 0; x < this.arguments_.length; x++) {
      if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[x].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = this.arguments_.join(', ');
    this.setTitleValue(paramString, 'PARAMS');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setTitleValue(this.arguments_[x], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
                                     this.workspace, this.arguments_, null);
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getTitleValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
        this.workspace, this.arguments_, this.paramIds_);
  },
  dispose: function() {
    var name = this.getTitleValue('NAME');
    var editable = this.editable;
    var workspace = this.workspace;
    // Call parent's destructor.
    Blockly.Block.prototype.dispose.apply(this, arguments);
    if (editable) {
      // Dispose of any callers.
      Blockly.Procedures.disposeCallers(name, workspace);
    }
  },
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES NOT have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible_()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var x = 0, block; block = blocks[x]; x++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getTitleValue('NAME'))) {
            block.setTitleValue(newName, 'NAME');
          }
        }
      }
    }
  }
};

Blockly.Language.procedures_defreturn = {
  // Define a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_DO);
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP);
    this.arguments_ = [];
  },
  updateParams_: Blockly.Language.procedures_defnoreturn.updateParams_,
  mutationToDom: Blockly.Language.procedures_defnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_defnoreturn.domToMutation,
  decompose: Blockly.Language.procedures_defnoreturn.decompose,
  compose: Blockly.Language.procedures_defnoreturn.compose,
  dispose: Blockly.Language.procedures_defnoreturn.dispose,
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Language.procedures_defnoreturn.getVars,
  renameVar: Blockly.Language.procedures_defnoreturn.renameVar
};

Blockly.Language.procedures_mutatorcontainer = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg = {
  // Procedure argument (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORARG_TITLE)
        .appendTitle(new Blockly.FieldTextInput('x',
        Blockly.Language.procedures_mutatorarg.validator), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg.validator = function(newVar) {
  // Merge runs of whitespace.  Strip leading and trailing whitespace.
  // Beyond this, all names are legal.
  newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
  return newVar || null;
};

Blockly.Language.procedures_callnoreturn = {
  // Call a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_CALL)
        .appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: function() {
    return this.getTitleValue('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('NAME'))) {
      this.setTitleValue(newName, 'NAME');
    }
  },
  setProcedureParameters: function(paramNames, paramIds) {
    // Data structures for parameters on each call block:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // paramNames = ['x', 'y', 'z']
    //     New param names.
    // paramIds = ['piua', 'f8b_', 'oi.o']
    //     IDs of params (consistent for each parameter through the life of a
    //     mutator, regardless of param renaming).
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkArguments_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      this.quarkConnections_ = {};
      this.quarkArguments_ = null;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    if (!this.quarkArguments_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkArguments_ = paramIds;
      } else {
        this.quarkArguments_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkArguments_[x]] = connection;
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.quarkArguments_ = paramIds;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle(this.arguments_[x]);
      if (this.quarkArguments_) {
        // Reconnect any child blocks.
        var quarkName = this.quarkArguments_[x];
        if (quarkName in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkName];
          if (!connection || connection.targetConnection ||
              connection.sourceBlock_.workspace != this.workspace) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkName];
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleValue('NAME'));
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name and parameters.
    var name = xmlElement.getAttribute('name');
    this.setTitleValue(name, 'NAME');
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    if (def && def.mutator.isVisible()) {
      // Initialize caller with the mutator's IDs.
      this.setProcedureParameters(def.arguments_, def.paramIds_);
    } else {
      this.arguments_ = [];
      for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
        if (childNode.nodeName.toLowerCase() == 'arg') {
          this.arguments_.push(childNode.getAttribute('name'));
        }
      }
      // For the second argument (paramIds) use the arguments list as a dummy
      // list.
      this.setProcedureParameters(this.arguments_, this.arguments_);
    }
  },
  renameVar: function(oldName, newName) {
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        this.getInput('ARG' + x).titleRow[0].setText(newName);
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to find caller.
    var option = {enabled: true};
    option.text = Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getTitleValue('NAME');
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  }
};

Blockly.Language.procedures_callreturn = {
  // Call a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_CALL)
        .appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE, 'NAME');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: Blockly.Language.procedures_callnoreturn.getProcedureCall,
  renameProcedure: Blockly.Language.procedures_callnoreturn.renameProcedure,
  setProcedureParameters:
      Blockly.Language.procedures_callnoreturn.setProcedureParameters,
  mutationToDom: Blockly.Language.procedures_callnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_callnoreturn.domToMutation,
  renameVar: Blockly.Language.procedures_callnoreturn.renameVar,
  customContextMenu: Blockly.Language.procedures_callnoreturn.customContextMenu
};

Blockly.Language.procedures_ifreturn = {
  // Conditionally return value from a procedure.
  category: null,
  helpUrl: 'http://c2.com/cgi/wiki?GuardClause',
  init: function() {
    this.setColour(290);
    this.appendValueInput('CONDITION')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_IF);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_PROCEDURES_IFRETURN_TOOLTIP);
    this.hasReturnValue_ = true;
  },
  mutationToDom: function() {
    // Save whether this block has a return value.
    var container = document.createElement('mutation');
    container.setAttribute('value', Number(this.hasReturnValue_));
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore whether this block has a return value.
    var value = xmlElement.getAttribute('value');
    this.hasReturnValue_ = (value == 1);
    if (!this.hasReturnValue_) {
      this.removeInput('VALUE');
      this.appendDummyInput('VALUE')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
    }
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a procedure?
    var block = this;
    do {
      if (block.type == 'procedures_defnoreturn' ||
          block.type == 'procedures_defreturn') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      // If needed, toggle whether this block has a return value.
      if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendDummyInput('VALUE')
          .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = false;
      } else if (block.type == 'procedures_defreturn' &&
                 !this.hasReturnValue_) {
        this.removeInput('VALUE');
        this.appendValueInput('VALUE')
          .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
        this.hasReturnValue_ = true;
      }
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LANG_PROCEDURES_IFRETURN_WARNING);
    }
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.text');

goog.require('Blockly.Language');

Blockly.Language.text = {
  // Text value.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TEXT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP);
  }
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_JOIN_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('ADD0')
        .appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
    this.appendValueInput('ADD1');
    this.setOutput(true, String);
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP);
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x);
      if (x == 0) {
        input.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.text_create_join_container = {
  // Container.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.text_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.text_append = {
  // Append to a variable in place.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_APPEND_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(Blockly.LANG_TEXT_APPEND_TO)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_TEXT_APPEND_VARIABLE), 'VAR')
        .appendTitle(Blockly.LANG_TEXT_APPEND_APPENDTEXT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_TEXT_APPEND_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.text_length = {
  // String length.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_LENGTH_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck([String, Array])
        .appendTitle(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_TEXT_LENGTH_TOOLTIP);
  }
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ISEMPTY_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck([String, Array])
        .appendTitle(Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_TEXT_ISEMPTY_TOOLTIP);
  }
};

Blockly.Language.text_endString = {
  // Return a leading or trailing substring.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ENDSTRING_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, String);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(menu, 'END');
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_ENDSTRING_INPUT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_ENDSTRING_TOOLTIP);
  }
};

Blockly.Language.text_endString.OPERATORS =
    [[Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_INDEXOF_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, Number);
    this.appendValueInput('FIND')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_TITLE_FIND)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'END')
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE);
    this.appendValueInput('VALUE')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_INDEXOF_TOOLTIP);
  }
};

Blockly.Language.text_indexOf.OPERATORS =
    [[Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_charAt = {
  // Get a character from the string.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHARAT_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, String);
    this.appendDummyInput('AT');
    this.appendValueInput('VALUE')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT);
    this.setInputsInline(true);
    this.updateAt(true);
    this.setTooltip(Blockly.LANG_TEXT_CHARAT_TOOLTIP);
  },
  mutationToDom: function() {
    // Save whether there is an 'AT' input.
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'AT' input.
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt(isAt);
  },
  updateAt: function(isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' input.
    this.removeInput('AT');
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck(Number);
    } else {
      this.appendDummyInput('AT');
    }
    this.moveInputBefore('AT', 'VALUE');
    var menu = new Blockly.FieldDropdown(this.WHERE, function(value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setTitleValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendTitle(Blockly.LANG_TEXT_CHARAT_GET)
        .appendTitle(menu, 'WHERE');
  }
};

Blockly.Language.text_charAt.WHERE =
    [[Blockly.LANG_TEXT_CHARAT_FROM_START, 'FROM_START'],
     [Blockly.LANG_TEXT_CHARAT_FROM_END, 'FROM_END'],
     [Blockly.LANG_TEXT_CHARAT_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_CHARAT_LAST, 'LAST'],
     [Blockly.LANG_TEXT_CHARAT_RANDOM, 'RANDOM']];

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHANGECASE_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_CHANGECASE_TITLE_TO)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'CASE');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_CHANGECASE_TOOLTIP);
  }
};

Blockly.Language.text_changeCase.OPERATORS =
    [[Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']];

Blockly.Language.text_trim = {
  // Trim spaces.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TRIM_HELPURL,
  init: function() {
    this.setColour(160);
    var menu = new Blockly.FieldDropdown(this.OPERATORS, function(value) {
      var plural = (value == 'BOTH');
      this.sourceBlock_.updatePlural(plural);
    });
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SPACE)
        .appendTitle(menu, 'MODE')
        .appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SIDES, 'SIDES');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TRIM_TOOLTIP);
  },
  mutationToDom: function() {
    // Save whether the 'sides' title should be plural or singular.
    var container = document.createElement('mutation');
    var plural = (this.getTitleValue('MODE') == 'BOTH');
    container.setAttribute('plural', plural);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'sides' title as plural or singular.
    var plural = (xmlElement.getAttribute('plural') == 'true');
    this.updatePlural(plural);
  },
  updatePlural: function(plural) {
    // Set the 'sides' title as plural or singular.
    this.setTitleValue(plural ? Blockly.LANG_TEXT_TRIM_TITLE_SIDES :
        Blockly.LANG_TEXT_TRIM_TITLE_SIDE, 'SIDES');
  }
};

Blockly.Language.text_trim.OPERATORS =
    [[Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH, 'BOTH'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT, 'LEFT'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']];

Blockly.Language.text_print = {
  // Print statement.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(Blockly.LANG_TEXT_PRINT_TITLE_PRINT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Language.text_prompt = {
  // Prompt function.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PROMPT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR)
        .appendTitle(new Blockly.FieldDropdown(this.TYPES), 'TYPE')
        .appendTitle(Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE)
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
    this.setOutput(true, [Number, String]);
    this.setTooltip(Blockly.LANG_TEXT_PROMPT_TOOLTIP);
  }
};

Blockly.Language.text_prompt.TYPES =
    [[Blockly.LANG_TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
     [Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Language.variables');

goog.require('Blockly.Language');

Blockly.Language.variables_get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.variables_set = {
  // Variable setter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript');

goog.require('Blockly.CodeGenerator');

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.JavaScript.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    // https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.JavaScript.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.JavaScript.ORDER_MEMBER = 1;         // . []
Blockly.JavaScript.ORDER_NEW = 1;            // new
Blockly.JavaScript.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.JavaScript.ORDER_INCREMENT = 3;      // ++
Blockly.JavaScript.ORDER_DECREMENT = 3;      // --
Blockly.JavaScript.ORDER_LOGICAL_NOT = 4;    // !
Blockly.JavaScript.ORDER_BITWISE_NOT = 4;    // ~
Blockly.JavaScript.ORDER_UNARY_PLUS = 4;     // +
Blockly.JavaScript.ORDER_UNARY_NEGATION = 4; // -
Blockly.JavaScript.ORDER_TYPEOF = 4;         // typeof
Blockly.JavaScript.ORDER_VOID = 4;           // void
Blockly.JavaScript.ORDER_DELETE = 4;         // delete
Blockly.JavaScript.ORDER_MULTIPLICATION = 5; // *
Blockly.JavaScript.ORDER_DIVISION = 5;       // /
Blockly.JavaScript.ORDER_MODULUS = 5;        // %
Blockly.JavaScript.ORDER_ADDITION = 6;       // +
Blockly.JavaScript.ORDER_SUBTRACTION = 6;    // -
Blockly.JavaScript.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.JavaScript.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.JavaScript.ORDER_IN = 8;             // in
Blockly.JavaScript.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.JavaScript.ORDER_EQUALITY = 9;       // == != === !==
Blockly.JavaScript.ORDER_BITWISE_AND = 10;   // &
Blockly.JavaScript.ORDER_BITWISE_XOR = 11;   // ^
Blockly.JavaScript.ORDER_BITWISE_OR = 12;    // |
Blockly.JavaScript.ORDER_LOGICAL_AND = 13;   // &&
Blockly.JavaScript.ORDER_LOGICAL_OR = 14;    // ||
Blockly.JavaScript.ORDER_CONDITIONAL = 15;   // ?:
Blockly.JavaScript.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.JavaScript.ORDER_COMMA = 17;         // ,
Blockly.JavaScript.ORDER_NONE = 99;          // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1);\n'
 * @type ?string
 */
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

/**
 * Initialise the database of variable names.
 */
Blockly.JavaScript.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.JavaScript.definitions_ = {};

  if (Blockly.Variables) {
    if (!Blockly.JavaScript.variableDB_) {
      Blockly.JavaScript.variableDB_ =
          new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_);
    } else {
      Blockly.JavaScript.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = 'var ' +
          Blockly.JavaScript.variableDB_.getName(variables[x],
          Blockly.Variables.NAME_TYPE) + ';';
    }
    Blockly.JavaScript.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.JavaScript.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.JavaScript.definitions_) {
    definitions.push(Blockly.JavaScript.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.JavaScript.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.JavaScript.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.JavaScript.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Generator.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Generator.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Generator.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.colour');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.colour_picker = function() {
  // Colour picker.
  var code = '\'' + this.getTitleValue('COLOUR') + '\'';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.colour_rgb = function() {
  // Compose a colour from RGB components.
  var red = Blockly.JavaScript.valueToCode(this, 'RED',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var green = Blockly.JavaScript.valueToCode(this, 'GREEN',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var blue = Blockly.JavaScript.valueToCode(this, 'BLUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;

  if (!Blockly.JavaScript.definitions_['colour_rgb']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'colour_rgb', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.colour_rgb.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(r, g, b) {');
    func.push('  r = Math.round(Math.max(Math.min(Number(r), 1), 0) * 255);');
    func.push('  g = Math.round(Math.max(Math.min(Number(g), 1), 0) * 255);');
    func.push('  b = Math.round(Math.max(Math.min(Number(b), 1), 0) * 255);');
    func.push('  r = (\'0\' + (r || 0).toString(16)).slice(-2);');
    func.push('  g = (\'0\' + (g || 0).toString(16)).slice(-2);');
    func.push('  b = (\'0\' + (b || 0).toString(16)).slice(-2);');
    func.push('  return \'#\' + r + g + b;');
    func.push('}');
    Blockly.JavaScript.definitions_['colour_rgb'] = func.join('\n');
  }
  var code = Blockly.JavaScript.colour_rgb.functionName +
      '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.colour_blend = function() {
  // Blend two colours together.
  var c1 = Blockly.JavaScript.valueToCode(this, 'COLOUR1',
      Blockly.JavaScript.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.JavaScript.valueToCode(this, 'COLOUR2',
      Blockly.JavaScript.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.JavaScript.valueToCode(this, 'RATIO',
      Blockly.JavaScript.ORDER_COMMA) || 0.5;

  if (!Blockly.JavaScript.definitions_['colour_blend']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'colour_blend', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.colour_blend.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(c1, c2, ratio) {');
    func.push('  ratio = Math.max(Math.min(Number(ratio), 1), 0);');
    func.push('  var r1 = parseInt(c1.substring(1, 3), 16);');
    func.push('  var g1 = parseInt(c1.substring(3, 5), 16);');
    func.push('  var b1 = parseInt(c1.substring(5, 7), 16);');
    func.push('  var r2 = parseInt(c2.substring(1, 3), 16);');
    func.push('  var g2 = parseInt(c2.substring(3, 5), 16);');
    func.push('  var b2 = parseInt(c2.substring(5, 7), 16);');
    func.push('  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);');
    func.push('  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);');
    func.push('  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);');
    func.push('  r = (\'0\' + (r || 0).toString(16)).slice(-2);');
    func.push('  g = (\'0\' + (g || 0).toString(16)).slice(-2);');
    func.push('  b = (\'0\' + (b || 0).toString(16)).slice(-2);');
    func.push('  return \'#\' + r + g + b;');
    func.push('}');
    Blockly.JavaScript.definitions_['colour_blend'] = func.join('\n');
  }
  var code = Blockly.JavaScript.colour_blend.functionName +
      '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for control blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.control');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.JavaScript.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.JavaScript.controls_repeat = function() {
  // Repeat n times.
  var repeats = Number(this.getTitleValue('TIMES'));
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.JavaScript.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getTitleValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL',
      until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript.controls_for = function() {
  // For loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0 + (up ? '++' : '--') + ') {\n' +
        branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 +
        ' += (' + startVar + ' <= ' + endVar + ') ? 1 : -1) {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.JavaScript.controls_forEach = function() {
  // For each loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'LIST',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  if (argument0.match(/^\w+$/)) {
    branch = '  ' + variable0 + ' = ' + argument0 + '[' + indexVar + '];\n' +
        branch;
    code = 'for (var ' + indexVar + ' in  ' + argument0 + ') {\n' +
        branch + '}\n';
  } else {
    // The list appears to be more complicated than a simple variable.
    // Cache it to a variable to prevent repeated look-ups.
    var listVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    branch = '  ' + variable0 + ' = ' + listVar + '[' + indexVar + '];\n' +
        branch;
    code = 'var ' + listVar + ' = ' + argument0 + ';\n' +
        'for (var ' + indexVar + ' in ' + listVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.JavaScript.controls_flow_statements = function() {
  // Flow statements: continue, break.
  switch (this.getTitleValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.lists');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.lists_create_empty = function() {
  // Create an empty list.
  return ['[]', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_create_with = function() {
  // Create a list with any number of elements of any type.
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_repeat = function() {
  // Create a list with one element repeated.
  if (!Blockly.JavaScript.definitions_['lists_repeat']) {
    // Function copied from Closure's goog.array.repeat.
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'lists_repeat', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.lists_repeat.repeat = functionName;
    var func = [];
    func.push('function ' + functionName + '(value, n) {');
    func.push('  var array = [];');
    func.push('  for (var i = 0; i < n; i++) {');
    func.push('    array[i] = value;');
    func.push('  }');
    func.push('  return array;');
    func.push('}');
    Blockly.JavaScript.definitions_['lists_repeat'] = func.join('\n');
  }
  var argument0 = Blockly.JavaScript.valueToCode(this, 'ITEM',
      Blockly.JavaScript.ORDER_COMMA) || 'null';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'NUM',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var code = Blockly.JavaScript.lists_repeat.repeat +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.lists_length = function() {
  // List length.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.lists_isEmpty = function() {
  // Is the list empty?
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';
  return ['!' + argument0 + '.length', Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript.lists_indexOf = function() {
  // Find an item in the list.
  var operator = this.getTitleValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FIND',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.lists_getIndex = function() {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = this.getTitleValue('MODE') || 'GET';
  var where = this.getTitleValue('WHERE') || 'FROM_START';
  var at = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
  var list = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';

  if (where == 'FIRST') {
    if (mode == 'GET') {
      var code = list + '[0]';
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.shift()';
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    } else if (mode == 'REMOVE') {
      return list + '.shift();\n';
    }
  } else if (where == 'LAST') {
    if (mode == 'GET') {
      var code = list + '.slice(-1)[0]';
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.pop()';
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    } else if (mode == 'REMOVE') {
      return list + '.pop();\n';
    }
  } else if (where == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (at.match(/^-?\d+$/)) {
      // If the index is a naked number, decrement it right now.
      at = parseInt(at, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at += ' - 1';
    }
    if (mode == 'GET') {
      var code = list + '[' + at + ']';
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.splice(' + at + ', 1)[0]';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    } else if (mode == 'REMOVE') {
      return list + '.splice(' + at + ', 1);\n';
    }
  } else if (where == 'FROM_END') {
    if (mode == 'GET') {
      var code = list + '.slice(-' + at + ')[0]';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    } else if (mode == 'GET_REMOVE' || mode == 'REMOVE') {
      if (!Blockly.JavaScript.definitions_['lists_remove_from_end']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'lists_remove_from_end', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.lists_getIndex.lists_remove_from_end = functionName;
        var func = [];
        func.push('function ' + functionName + '(list, x) {');
        func.push('  x = list.length - x;');
        func.push('  return list.splice(x, 1)[0];');
        func.push('}');
        Blockly.JavaScript.definitions_['lists_remove_from_end'] =
            func.join('\n');
      }
      code = Blockly.JavaScript.lists_getIndex.lists_remove_from_end +
          '(' + list + ', ' + at + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + ';\n';
      }
    }
  } else if (where == 'RANDOM') {
    if (!Blockly.JavaScript.definitions_['lists_random_item']) {
      var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
          'lists_random_item', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.lists_getIndex.lists_random_item = functionName;
      var func = [];
      func.push('function ' + functionName + '(list, remove) {');
      func.push('  var x = Math.floor(Math.random() * list.length);');
      func.push('  if (remove) {');
      func.push('    return list.splice(x, 1)[0];');
      func.push('  } else {');
      func.push('    return list[x];');
      func.push('  }');
      func.push('}');
      Blockly.JavaScript.definitions_['lists_random_item'] = func.join('\n');
    }
    code = Blockly.JavaScript.lists_getIndex.lists_random_item +
        '(' + list + ', ' + (mode != 'GET') + ')';
    if (mode == 'GET' || mode == 'GET_REMOVE') {
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    } else if (mode == 'REMOVE') {
      return code + ';\n';
    }
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.JavaScript.lists_setIndex = function() {
  // Set element at index.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_NONE) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'LIST',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  return argument1 + '[' + argument0 + '] = ' + argument2 + ';\n';
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.logic');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.JavaScript.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.JavaScript.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_negate = function() {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL', order) ||
      'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.logic_null = function() {
  // Null data type.
  return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.logic_ternary = function() {
  // Ternary operator.
  var value_if = Blockly.JavaScript.valueToCode(this, 'IF',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.JavaScript.valueToCode(this, 'THEN',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScript.valueToCode(this, 'ELSE',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.math');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getTitleValue('NUM'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getTitleValue('OP');
  var tuple = Blockly.JavaScript.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code;
  // Power in JavaScript requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.JavaScript.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
  MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
  MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
  DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
  POWER: [null, Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
};

Blockly.JavaScript.math_single = function() {
  // Math operators with single operand.
  var operator = this.getTitleValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + arg + ') / Math.log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.JavaScript.ORDER_DIVISION];
};

Blockly.JavaScript.math_constant = function() {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var constant = this.getTitleValue('CONSTANT');
  return Blockly.JavaScript.math_constant.CONSTANTS[constant];
};

Blockly.JavaScript.math_constant.CONSTANTS = {
  PI: ['Math.PI', Blockly.JavaScript.ORDER_MEMBER],
  E: ['Math.E', Blockly.JavaScript.ORDER_MEMBER],
  GOLDEN_RATIO: ['(1 + Math.sqrt(5)) / 2', Blockly.JavaScript.ORDER_DIVISION],
  SQRT2: ['Math.SQRT2', Blockly.JavaScript.ORDER_MEMBER],
  SQRT1_2: ['Math.SQRT1_2', Blockly.JavaScript.ORDER_MEMBER],
  INFINITY: ['Infinity', Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript.math_number_property = function() {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.JavaScript.valueToCode(this, 'NUMBER_TO_CHECK',
      Blockly.JavaScript.ORDER_MODULUS) || 'NaN';
  var dropdown_property = this.getTitleValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    if (!Blockly.JavaScript.definitions_['isPrime']) {
      var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
          'isPrime', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.logic_prime= functionName;
      var func = [];
      func.push('function ' + functionName + '(n) {');
      func.push('  // http://en.wikipedia.org/wiki/Primality_test#Naive_methods');
      func.push('  if (n == 2 || n == 3) {');
      func.push('    return true;');
      func.push('  }');
      func.push('  // False if n is NaN, negative, is 1, or not whole.');
      func.push('  // And false if n is divisible by 2 or 3.');
      func.push('  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
                ' n % 3 == 0) {');
      func.push('    return false;');
      func.push('  }');
      func.push('  // Check all the numbers of form 6k +/- 1, up to sqrt(n).');
      func.push('  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {');
      func.push('    if (n % (x - 1) == 0 || n % (x + 1) == 0) {');
      func.push('      return false;');
      func.push('    }');
      func.push('  }');
      func.push('  return true;');
      func.push('}');
      Blockly.JavaScript.definitions_['isPrime'] = func.join('\n');
    }
    code = Blockly.JavaScript.logic_prime + '(' + number_to_check + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.JavaScript.valueToCode(this, 'DIVISOR',
          Blockly.JavaScript.ORDER_MODULUS) || 'NaN';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_EQUALITY];
};

Blockly.JavaScript.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'DELTA',
      Blockly.JavaScript.ORDER_ADDITION) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.JavaScript.math_round = Blockly.JavaScript.math_single;
// Trigonometry functions have a single operand.
Blockly.JavaScript.math_trig = Blockly.JavaScript.math_single;

Blockly.JavaScript.math_on_list = function() {
  // Math functions for lists.
  var func = this.getTitleValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.min.apply(null, ' + list + ')';
      break;
    case 'MAX':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.max.apply(null, ' + list + ')';
      break;
    case 'AVERAGE':
      // math_median([null,null,1,3]) == 2.0.
      if (!Blockly.JavaScript.definitions_['math_mean']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_mean', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_mean = functionName;
        var func = [];
        func.push('function ' + functionName + '(myList) {');
        func.push('  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;');
        func.push('}');
        Blockly.JavaScript.definitions_['math_mean'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_mean + '(' + list + ')';
      break;
    case 'MEDIAN':
      // math_median([null,null,1,3]) == 2.0.
      if (!Blockly.JavaScript.definitions_['math_median']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_median', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_median = functionName;
        var func = [];
        func.push('function ' + functionName + '(myList) {');
        func.push('  var localList = myList.filter(function (x) ' +
                  '{return typeof x == \'number\';});');
        func.push('  if (!localList.length) return null;');
        func.push('  localList.sort(function(a, b) {return b - a;});');
        func.push('  if (localList.length % 2 == 0) {');
        func.push('    return (localList[localList.length / 2 - 1] + ' +
                  'localList[localList.length / 2]) / 2;');
        func.push('  } else {');
        func.push('    return localList[(localList.length - 1) / 2];');
        func.push('  }');
        func.push('}');
        Blockly.JavaScript.definitions_['math_median'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_median + '(' + list + ')';
      break;
    case 'MODE':
      if (!Blockly.JavaScript.definitions_['math_modes']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_modes', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_modes = functionName;
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var func = [];
        func.push('function ' + functionName + '(values) {');
        func.push('  var modes = [];');
        func.push('  var counts = [];');
        func.push('  var maxCount = 0;');
        func.push('  for (var i = 0; i < values.length; i++) {');
        func.push('    var value = values[i];');
        func.push('    var found = false;');
        func.push('    var thisCount;');
        func.push('    for (var j = 0; j < counts.length; j++) {');
        func.push('      if (counts[j][0] === value) {');
        func.push('        thisCount = ++counts[j][1];');
        func.push('        found = true;');
        func.push('        break;');
        func.push('      }');
        func.push('    }');
        func.push('    if (!found) {');
        func.push('      counts.push([value, 1]);');
        func.push('      thisCount = 1;');
        func.push('    }');
        func.push('    maxCount = Math.max(thisCount, maxCount);');
        func.push('  }');
        func.push('  for (var j = 0; j < counts.length; j++) {');
        func.push('    if (counts[j][1] == maxCount) {');
        func.push('        modes.push(counts[j][0]);');
        func.push('    }');
        func.push('  }');
        func.push('  return modes;');
        func.push('}');
        Blockly.JavaScript.definitions_['math_modes'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      if (!Blockly.JavaScript.definitions_['math_standard_deviation']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('function ' + functionName + '(numbers) {');
        func.push('  var n = numbers.length;');
        func.push('  if (!n) return null;');
        func.push('  var mean = numbers.reduce(function(x, y) ' +
                  '{return x + y;}) / n;');
        func.push('  var variance = 0;');
        func.push('  for (var j = 0; j < n; j++) {');
        func.push('    variance += Math.pow(numbers[j] - mean, 2);');
        func.push('  }');
        func.push('  variance = variance / n;');
        func.push('  return Math.sqrt(variance);');
        func.push('}');
        Blockly.JavaScript.definitions_['math_standard_deviation'] =
            func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_standard_deviation +
          '(' + list + ')';
      break;
    case 'RANDOM':
      if (!Blockly.JavaScript.definitions_['math_random_item']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_random_item', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_random_item = functionName;
        var func = [];
        func.push('function ' + functionName + '(list) {');
        func.push('  var x = Math.floor(Math.random() * list.length);');
        func.push('  return list[x];');
        func.push('}');
        Blockly.JavaScript.definitions_['math_random_item'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_random_item +
          '(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'DIVIDEND',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'DIVISOR',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'LOW',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'HIGH',
      Blockly.JavaScript.ORDER_COMMA) || 'Infinity';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_random_int = function() {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  if (!Blockly.JavaScript.definitions_['math_random_int']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'math_random_int', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.math_random_int.random_function = functionName;
    var func = [];
    func.push('function ' + functionName + '(a, b) {');
    func.push('  if (a > b) {');
    func.push('    // Swap a and b to ensure a is smaller.');
    func.push('    var c = a;');
    func.push('    a = b;');
    func.push('    b = c;');
    func.push('  }');
    func.push('  return Math.floor(Math.random() * (b - a + 1) + a);');
    func.push('}');
    Blockly.JavaScript.definitions_['math_random_int'] = func.join('\n');
  }
  var code = Blockly.JavaScript.math_random_int.random_function +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_random_float = function() {
  // Random fraction between 0 and 1.
  return ['Math.random()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.procedures');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(this, 'STACK');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.JavaScript.valueToCode(this, 'RETURN',
      Blockly.JavaScript.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.JavaScript.scrub_(this, code);
  Blockly.JavaScript.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript.procedures_defnoreturn =
    Blockly.JavaScript.procedures_defreturn;

Blockly.JavaScript.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.JavaScript.procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.JavaScript.valueToCode(this, 'CONDITION',
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (this.hasReturnValue_) {
    var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
        Blockly.JavaScript.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.text');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.text = function() {
  // Text value.
  var code = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_join = function() {
  // Create a string made up of any number of elements of any type.
  var code;
  if (this.itemCount_ == 0) {
    return ['\'\'', Blockly.JavaScript.ORDER_ATOMIC];
  } else if (this.itemCount_ == 1) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  } else if (this.itemCount_ == 2) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(this, 'ADD1',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  } else {
    code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
      code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
          Blockly.JavaScript.ORDER_COMMA) || '\'\'';
    }
    code = '[' + code.join(',') + '].join(\'\')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
};

Blockly.JavaScript.text_append = function() {
  // Append to a variable in place.
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};

Blockly.JavaScript.text_length = function() {
  // String length.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return ['!' + argument0, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript.text_endString = function() {
  // Return a leading or trailing substring.
  var first = this.getTitleValue('END') == 'FIRST';
  var code;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
      Blockly.JavaScript.ORDER_COMMA) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  if (first) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_COMMA) || '1';
    code = argument1 + '.substring(0, ' + argument0 + ')';
  } else {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
    if (argument0.match(/^\d+$/) && !argument0.match(/^0+$/)) {
      // Shortcut for a plain positive number.
      code = argument1 + '.slice(-' + argument0 + ')';
    } else {
      code = argument1 + '.slice(- ' + argument0 + ' || Infinity)';
    }
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_indexOf = function() {
  // Search the text for a substring.
  var operator = this.getTitleValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FIND',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_charAt = function() {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = this.getTitleValue('WHERE') || 'FROM_START';
  var at = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
  var text = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      // Blockly uses one-based indicies.
      if (at.match(/^-?\d+$/)) {
        // If the index is a naked number, decrement it right now.
        at = parseInt(at, 10) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var code = text + '.slice(-' + at + ').charAt(0)';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      if (!Blockly.JavaScript.definitions_['text_random_letter']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'text_random_letter', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.text_charAt.text_random_letter = functionName;
        var func = [];
        func.push('function ' + functionName + '(text) {');
        func.push('  var x = Math.floor(Math.random() * text.length);');
        func.push('  return text[x];');
        func.push('}');
        Blockly.JavaScript.definitions_['text_random_letter'] = func.join('\n');
      }
      code = Blockly.JavaScript.text_charAt.text_random_letter +
          '(' + text + ')';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.JavaScript.text_changeCase = function() {
  // Change capitalization.
  var mode = this.getTitleValue('CASE');
  var operator = Blockly.JavaScript.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
    code = argument0 + operator;
  } else {
    if (!Blockly.JavaScript.definitions_['text_toTitleCase']) {
      // Title case is not a native JavaScript function.  Define one.
      var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
          'text_toTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('function ' + functionName + '(str) {');
      func.push('  return str.replace(/\\S+/g,');
      func.push('      function(txt) {return txt[0].toUpperCase() + ' +
                'txt.substring(1).toLowerCase();});');
      func.push('}');
      Blockly.JavaScript.definitions_['text_toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = Blockly.JavaScript.text_changeCase.toTitleCase +
        '(' + argument0 + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_changeCase.OPERATORS = {
  UPPERCASE: '.toUpperCase()',
  LOWERCASE: '.toLowerCase()',
  TITLECASE: null
};

Blockly.JavaScript.text_trim = function() {
  // Trim spaces.
  var mode = this.getTitleValue('MODE');
  var operator = Blockly.JavaScript.text_trim.OPERATORS[mode];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return [argument0 + operator, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_trim.OPERATORS = {
  LEFT: '.trimLeft()',
  RIGHT: '.trimRight()',
  BOTH: '.trim()'
};

Blockly.JavaScript.text_print = function() {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};

Blockly.JavaScript.text_prompt = function() {
  // Prompt function.
  var msg = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  var code = 'window.prompt(' + msg + ')';
  var toNumber = this.getTitleValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'window.parseFloat(' + code + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.variables_get = function() {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
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
	//helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
	init : function() {
		this.setColour(160);
		this.appendDummyInput().appendTitle('Circle')
		this.appendValueInput("radius").setCheck(Number).appendTitle("radius");
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
		this.appendValueInput("vector").setCheck(String).appendTitle("vector");
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
		this.appendValueInput("vector").setCheck(String).appendTitle("vector");
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
	var code = "addPoint(" + x + ',' + y + ',' + z + ")";
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
	var code = "addCircle(" + radius + ")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.sphere = function() {
	var radius = Blockly.JavaScript.valueToCode(this, 'radius', Blockly.JavaScript.ORDER_NONE) || 10;
	var vector = Blockly.JavaScript.valueToCode(this, 'vector', Blockly.JavaScript.ORDER_NONE) || 'addPoint(0,0,0)';
	if ((vector==null)||(radius==null)) return "";
	var code = "addSphere(" + radius + ',' + vector +")";
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
	var vector = Blockly.JavaScript.valueToCode(this, 'vector', Blockly.JavaScript.ORDER_NONE) || 'addPoint(0,0,0)';
	if (vector==null) return "";
	var code = "addSphere(" + width + ',' +  height + ',' + depth + ',' + vector +")";
	return [code, Blockly.JavaScript.ORDER_NONE];
};