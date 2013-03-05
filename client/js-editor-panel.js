Ext.define('GEN.ui.js-editor.Panel', {
    extend:'Ext.panel.Panel',
    alias:'widget.js-editor-panel',
    varList:['item'],
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
    },
    onInitialLayout:function () {
        this.editor = Ext.core.DomHelper.append(this.body, {
            tag:'div',
            id:'ace-editor',
            style:"width: 100%; height: 100%;"
        });
        this.initLanguageMenus();
        ace.config.set("workerPath", "/ace");
        this.editor = ace.edit("ace-editor");
        this.editor.setTheme("ace/theme/monokai");
        var session=this.editor.getSession();
        session.setMode("ace/mode/genjs");
        //this.editor.setValue("_g.createPoint({x: 20,y: 20,z: 20});");
        this.editor.setValue("foo();");
        var self = this;
        session.on('change', function(e){self.onCodeChange(e);});
    },
    onCodeChange:function (e) {
        //console.log(e);
        var session = this.editor.getSession();
        var annotations = session.getAnnotations();

        var hasError = _.contains(_.pluck(annotations, 'type'), 'error');
        if(hasError) return;

        var rowCount = session.getLength();
        var tokens = [];
        var row = 0;
        while(row<rowCount) {
            var rowTokens = session.getTokens(row);
            tokens = tokens.concat(rowTokens);
            row+=1;
        }

        var code = this.editor.getValue();
        this.execCode(code, tokens);
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
    blockFactory:function (cat, op, tbar, initFn) {
        return function (e, item, eOpts) {
            console.log(op);
        }
    },
    execCode : function(code, tokens) {
        this.getComponent('tbar1').showBusy();
        if(this.useWorker == true) {
            this.runWorker(code, tokens);
        } else {
            this.getExecutionResult(GEN.Runner.run(code, tokens));
        }
    },
    getExecutionResult : function(result) {
        console.log('execution result');
        console.log(result);
        Session.set('renderableBlocks', result);
        this.getComponent('tbar1').clearStatus({useDefaults:true});
    }
});



