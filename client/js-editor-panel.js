Ext.define('GEN.ui.js-editor.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.js-editor-panel',
    varList:['item'],
    overSlider:false,
    overToken:false,
    sliderToken: null,
    useWorker : true,
    currentHoverToken: null,
    code: '',
    externalChange: false,
    sliderChange:false,
    tokens:[],
    langCategories:{
        'Variables':{
            position:10,
            title:'Variables',
            tbarId:'tbar1'
        },
        'Control':{
            position:30,
            title:'Control',
            tbarId:'tbar1'
        },
        'Lists':{
            position:40,
            title:'Lists',
            tbarId:'tbar1'
        },
        'Logic':{
            position:50,
            title:'Logic',
            tbarId:'tbar1'
        },
        'Math':{
            position:20,
            title:'Math',
            tbarId:'tbar1'
        },
        'Text':{
            position:60,
            title:'Text',
            tbarId:'tbar1'
        },
        'Mesh':{
            position:30,
            title:'Mesh',
            tbarId:'tbar2'
        },
        'Surface':{
            position:25,
            title:'Surface',
            tbarId:'tbar2'
        },
        'Curve':{
            position:20,
            title:'Curve',
            tbarId:'tbar2'
        },
        'Vector':{
            position:10,
            title:'Vector',
            tbarId:'tbar2'
        },
        'Transform':{
            position:40,
            title:'Transform',
            tbarId:'tbar2'
        }
    },
    emptyMenuItem:{
        xtype:'displayfield',
        height:20
    },
    dockedItems:[
        {
            xtype:'statusbar',
            dock:'top',
            itemId:'tbar1',
            text:'<span style="color: green">Ready</span>',
            iconCls:'x-status-valid',
            statusAlign:'right',
            defaultText:'<span style="color: green">Ready</span>',
            busyText:'<span style="color: orange">Evaluating...</span>',
            items:[
                {
                    xtype:'button',
                    text:'Dummy',
                    id:'tbar1-dummy-item',
                    tooltip:'Layout place holder'
                }
            ]
        },
        {
            xtype:'toolbar',
            dock:'top',
            itemId:'tbar2',
            items:[
                {
                    xtype:'button',
                    text:'Dummy',
                    tooltip:'Layout place holder'
                }
            ]
        }
    ],
    initComponent:function () {
        this.callParent();
        this.on({
            'afterlayout':{
                fn:this.onInitialLayout,
                single:true
            }
        });
        var tooltipConfig = {
            target:'ace-editor',
            html:'A very simple tooltip'
        };
        this.sliderTooltip = Ext.create('Ext.tip.ToolTip', tooltipConfig);
    },
    onInitialLayout:function () {
        this.initWorker();
        this.initEditor();
        this.initLanguageMenus();
        this.initTooltip();
        this.onCodeChange();
        this.initProgramChangeHandler();
    },
    //This happens when the selected program changed locally, or when the xml changed remotely
    initProgramChangeHandler : function() {
        var self = this;
        Meteor.autorun(function() {
            try {
                //console.log('nnnnnn');
                var current = Session.get("currentProgram");
                if(_.isUndefined(current))
                    return;
                program = Programs.findOne(current);
                //console.log(program);
                if(_.isUndefined(program))
                    return;
                if(program.code == self.code)
                    return;
                self.code = program.code;
                self.externalChange = true;
                self.editor.setValue(program.code);
            } catch(err) {
                console.log('Editor panel: Error while program changed' + err.message);
            }
        });
    },
    initTooltip:function () {
        var sliderConfig = {
            //xtype:'slider',
            hideLabel:true,
            width:120,
            increment:1,
            minValue:0,
            maxValue:100,
            useTips: false,
            margin: 0,
        };
        this.dynamicSlider = Ext.create('Ext.slider.Single', sliderConfig);

        var tooltipConfig = {
            target:'ace-editor',
            anchorToTarget:false,
            anchorOffset: 40,
            defaultAlign: "t-b?",
            anchorSize: 30,
            trackMouse:false,
            dismissDelay:4000,
            //mouseOffset:[-25, -15],
            anchor:'top',

            padding:"1 3 0 3",
            bodyPadding:0,
            items: this.dynamicSlider,
            autoHide:false

        };
        this.sliderTooltip = Ext.create('Ext.tip.ToolTip', tooltipConfig);
        this.sliderTooltip.on({
            'beforeshow':{
                fn:function () {
                    return (this.overToken || this.overSlider);
                },
                scope:this
            },
            'afterrender':{
                fn:function () {
                    console.log('render');
                    console.log(this.sliderTooltip.getEl())

                    this.sliderTooltip.getEl().on({
                        'mouseover':{
                            fn:function () {
                                this.overSlider = true;
                            },
                            scope:this

                        },
                        'mouseout':{
                            fn:function () {
                                this.overSlider = false;
                            },
                            scope:this
                        },
                    });

                },
                once:true,
                scope:this
            },
        });

        this.dynamicSlider.on({
           'change' : {
               fn: function(slider,newVal){
                   var Range = ace.require('ace/range').Range;
                   var row = this.sliderToken.row;
                   var start = this.sliderToken.start;
                   var rangeObj = new Range(row, start, row, start + this.sliderToken.value.length);
                   this.sliderToken.value = newVal.toString();
                   //console.log(rangeObj);
                   this.sliderChange = true;
                   this.editorSession.replace(rangeObj, newVal.toString());

               },
               scope: this,
               buffer: 20

           }
        });

        Ext.QuickTips.init();
    },
    initEditor:function () {
        this.editor = Ext.core.DomHelper.append(this.body, {
            tag:'div',
            id:'ace-editor',
            style:"width: 100%; height: 100%;"
        });

        this.injectBlockly();
        ace.config.set("workerPath", "/ace");
        this.editor = ace.edit("ace-editor");
        this.editor.setTheme("ace/theme/monokai");
        //TODO: not working
        this.editor.setFontSize(30);
        this.editorSession = this.editor.getSession();
        this.editorSession.setMode("ace/mode/genjs");
        this.editorSession.setUseWorker(false);
        this.code="var p = point( {x: 20,y: 20,z: 0});\ncircle( {origin: p, radius:15});";
        this.editor.setValue(this.code);
        //this.editor.setValue("var i = 21;");

        var self = this;
        this.editorSession.on('change', function (e) {
            self.onCodeChange(e);
        });
        this.editor.on('mousemove', function (e) {
            self.onMouseMove(e);
        });
    },

    onMouseMove:function (e) {
        var position = e.getDocumentPosition();
        var token = this.editor.session.getTokenAt(position.row, position.column);

        this.currentHoverToken = this.cloneToken(token, position.row);

        if ((token==null) || (token.type != 'constant.numeric')) {
            this.overToken = false;
            if (!this.overSlider && this.sliderTooltip.isVisible() == true) {
                var fn = Ext.Function.createDelayed(function () {
                    if ((!this.overToken && !this.overSlider && this.sliderTooltip.isVisible() == true)) {
                       this.sliderToken=null;
                       this.sliderTooltip.hide();
                    }
                }, 300, this);
                fn();
            }
        } else {
            this.overToken = true;
            var curToken = this.cloneToken(token, position.row);
            if(this.sliderToken && (curToken.index != this.sliderToken.index)){
                this.sliderTooltip.hide();
            }
            if (this.sliderTooltip.isVisible() == false) {
                //console.log(ace);
                //console.log(this.editor.renderer);
                //console.log( this.sliderToken);
                this.sliderToken = this.cloneToken(token, position.row);
                console.log( 'slider token');
                console.log( this.sliderToken);
                var anchorPos = this.tokenAnchorPos(this.sliderToken);

                this.dynamicSlider.setValue(parseFloat(token.value));
                this.sliderTooltip.showAt(anchorPos);
            }
        }
    },
    tokensEqual: function(tok1, tok2){

    },
    tokenAnchorPos: function(token){
        var box = this.tokenBox(token);
        var anchorPos = [box[0]+(box[2]/2)-60, box[1]+box[3]+4];
        return anchorPos;
    },
    tokenBox: function(token){
        var el = this.tokenEl(token);
        var elXY = Ext.fly(el).getXY();
        return [elXY[0], elXY[1], Ext.fly(el).getWidth(), Ext.fly(el).getHeight()];
    },
    tokenEl: function(token){
        var screenPos = this.editorSession.documentToScreenPosition(token.row, token.start);
        var lines = Ext.query('.ace_line');
        var myLine = lines[screenPos.row];
        var elements = _.filter(myLine.childNodes, function(el) {
            if(el.nodeType==Node.TEXT_NODE) return true;
            return !Ext.fly(el).hasCls('ace_indent-guide');
        });

        var myEl = elements[token.index];
        return myEl;
    },
    cloneToken: function(token, row){
        if (token==null) return null;
        return {
            start: (token.start == 0) ? 0 : token.start,
            row: row,
            index: token.index,
            type: token.type,
            value: token.value
        };
    },

    onCodeChange:function (e) {
        //console.log(e);
        var code = this.editor.getValue();
        //Avoid the remove text operation that happens when the program code is set externally
        if(this.externalChange) {
            if (code!=this.code) {
                return;
            }
            this.externalChange = false;
        }

        if(this.sliderChange) {
            if(e.data.action != "insertText") {
                return;
            }
            this.sliderChange = false;
        }

        var session = this.editor.getSession();
        var annotations = session.getAnnotations();

        var hasError = _.contains(_.pluck(annotations, 'type'), 'error');
        if (hasError) return;

        var rowCount = session.getLength();
        var tokens = [];
        var row = 0;
        while (row < rowCount) {
            var rowTokens = session.getTokens(row);
            //console.log(rowTokens);
            tokens = tokens.concat(rowTokens);
            row += 1;
        }

        this.updateProgram(code);
        this.execCode(code, tokens);
    },

    updateProgram: function(code){
        if (this.code == code) return;

        this.code=code;
        //return;
        var program = Session.get("currentProgram");
        if(_.isUndefined(program)) {
            console.log('create new program');
            program = Programs.insert({
                name : 'New Program',
                code : code
            });
            Session.set("currentProgram", program);
        } else {
            console.log('update program');
            Programs.update(program, {
                $set : {
                    code : code
                }
            });
        }

    },
    execCode:function (code, tokens) {
        this.getComponent('tbar1').showBusy();
        if (this.useWorker == true) {
            this.runWorker(code, tokens);
        } else {
            this.getExecutionResult(GEN.Runner.run(code, tokens));
        }
    },
    getExecutionResult:function (result) {
        //console.log('execution result');
        //console.log(result);
        Session.set('renderableBlocks', result);
        this.getComponent('tbar1').clearStatus({useDefaults:true});
    },
    initLanguageMenus:function () {
        this.getComponent('tbar1').remove(this.getComponent('tbar1').getComponent('tbar1-dummy-item'));
        this.getComponent('tbar2').removeAll();

        var tbar = this.getComponent(this.langCategories['Variables'].tbarId);
        tbar.insert(0, this.buildCategoryMenu('Variables', this.variablesMenu()));

        var tree = Blockly.Toolbox.buildTree_();
        _.each(_.keys(tree), function (cat) {
            var catName = cat.replace('cat_', '');
            var tbar = this.getComponent(this.langCategories[catName].tbarId);
            var menuItems = this.langCategories[catName].tbarId == 'tbar1' ? [this.emptyMenuItem] : [];
            _.each(tree[cat], function (op) {
                var title = op;
                if (!_.isUndefined(Blockly.Language[op].title)) {
                    title = Blockly.Language[op].title;
                }
                var handler = this.blockFactory(catName, op, tbar);
                var menuItem = this.buildMenuItem(title, handler);
                menuItems.push(menuItem);
            }, this);
            var menu = this.buildCategoryMenu(catName, menuItems);
            var count = tbar.items.getCount();

            var position = this.langCategories[catName].tbarId == 'tbar1' ? count - 2 : count;
            tbar.insert(position, menu);
        }, this);
    },
    variablesMenu:function () {
        var variablesCatName = "Variables";
        var tbar = this.getComponent(this.langCategories[variablesCatName].tbarId);
        var menuItems = [this.emptyMenuItem];

        _.each(this.varList, function (name) {
            var setHandler = this.blockFactory(variablesCatName, 'variables_set', tbar, function (block) {
                block.setTitleValue(name, 'VAR');
            });
            var setMenuItem = this.buildMenuItem("Set " + name, setHandler);

            var getHandler = this.blockFactory(variablesCatName, 'variables_get', tbar, function (block) {
                block.setTitleValue(name, 'VAR');
            });
            var getMenuItem = this.buildMenuItem("Get " + name, getHandler);

            menuItems.push(setMenuItem);
            menuItems.push(getMenuItem);
        }, this);
        return menuItems;
    },
    buildMenuItem:function (text, handler) {
        return {
            text:text,
            listeners:{
                'mousedown':{
                    element:'el',
                    fn:handler
                }
            }
        };
    },
    buildCategoryMenu:function (category, items) {
        return {
            xtype:'button',
            text:category,
            width:75,
            itemId:category,
            menu:{
                //showSeparator: false,
                id:category + '-menu',
                items:items
            }
        };
    },
    injectBlockly : function() {
        this.blocklyWrapper = Ext.core.DomHelper.append(this.body, {
            tag : 'div',
            id : 'blockly-inner',
            style : 'width: 0px; height: 0px;'
        });
        Blockly.inject(this.blocklyWrapper, {
            path : '/blockly/',
            //rtl: true,
            showToolbox : false
        });
    },
    blockFactory : function(cat, op, tbar, initFn) {
        var self = this;
        return function(e, item, eOpts) {
            var eventXY = e.getXY();
            var browserEvent = e.browserEvent;
            tbar.getComponent(cat).menu.hide();
            var block = new Blockly.Block(Blockly.mainWorkspace, op);
            initFn && initFn(block);
            var func = Blockly.JavaScript[block.type];
            var code = (func.call(block))[0];
            console.log(code);
            //var cursorPos = self.editor.getCursorPosition();
            self.insertAtCursor(code);
        }
    },
    insertAtCursor : function(code) {
        var cursorPos = this.editor.getCursorPosition();
        this.editorSession.insert(cursorPos, code);
    },
    getInnerXY: function(xy) {
        var thisXY = this.body.getXY();

    },
    getBlockWindowXY : function(block) {
        var thisXY = this.body.getXY();
        var blockXY = Blockly.getAbsoluteXY_(block.getSvgRoot());
        return [thisXY[0] + blockXY.x, thisXY[1] + blockXY.y]
    },
    initWorker : function() {
        //not sure we need this here, need to check scope.
        var self = this;
        try {
            this.worker = new SharedWorker('/worker/code-worker.js');
            this.worker.port.addEventListener("message", function(event) {
                self.getWorkerMessage(event);
            }, false);

            this.worker.port.start();
        } catch(err) {
            this.useWorker = false;
        }
    },
    runWorker : function(code, tokens) {
        console.log("Execute Code");
        console.log(code);
        console.log('sending');
        this.worker.port.postMessage({code: code, tokens: tokens});
    },
    getWorkerMessage : function(event) {
        console.log("Worker sent message");
        result = JSON.parse(event.data);
        this.getExecutionResult(result);
    }
});



