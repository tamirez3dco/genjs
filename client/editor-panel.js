Ext.define('GEN.ui.blockly.Panel', {
	extend : 'Ext.panel.Panel',
	//border: true,
	bodyStyle : {
	},
	defaults : {
	},
	xml : '<xml></xml>',
	scale : 1,
	varList : ['item'],
	alias : 'widget.blockly-panel',
	langCategories: {
		'Variables': {position: 10, title: 'Variables', tbarId: 'tbar1'},
		'Control': {position: 30, title: 'Control', tbarId: 'tbar1'},
		'Lists': {position: 40, title: 'Lists', tbarId: 'tbar1'},
		'Logic': {position: 50, title: 'Logic', tbarId: 'tbar1'},
		'Math': {position: 20, title: 'Math', tbarId: 'tbar1'},
		'Text': {position: 60, title: 'Text', tbarId: 'tbar1'},
		'Mesh': {position: 30, title: 'Mesh', tbarId: 'tbar2'},
		'Curve': {position: 20, title: 'Curve', tbarId: 'tbar2'},
		'Vector': {position: 10, title: 'Vector', tbarId: 'tbar2'},
		'Transform': {position: 40, title: 'Transform', tbarId: 'tbar2'},
	},
	emptyMenuItem: {
		xtype : 'displayfield',
		height: 20
	},
	dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        itemId : 'tbar1',
        items : [{
			xtype : 'button',
			text : 'Dummy',
			tooltip : 'Layout place holder'
		}]
    },{
        xtype: 'toolbar',
        dock: 'top',
        itemId : 'tbar2',
        items : [{
			xtype : 'button',
			text : 'Dummy',
			tooltip : 'Layout place holder'
		}]
    }],
	initComponent : function() {
		var self = this;
		this.callParent();
		//this.languageToolbar = this.getDockedComponent('tbar1');
		this.on({
			'mousewheel' : {
				element : 'el',
				fn : this.onMouseWheel,
				scope : this
			},
			'afterlayout' : {
				fn : this.onInitialLayout,
				single : true
			}
		});

		Meteor.autorun(function() {
			//console.log('here...');
			var current = Session.get("currentProgram");
			if(_.isUndefined(current))
				return;
			program = Programs.findOne(current);
			if(_.isUndefined(program))
				return;
			if(program.xml == self.xml)
				return;
			self.xml = program.xml;
			xml = Blockly.Xml.textToDom(program.xml);
			Blockly.mainWorkspace.clear();
			//TODO: prevent 'blocklyWorkspaceChange' event here.
			Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
			self.xmlChanged();	
		});
	},
	/*initWorkspaceChangeHandler : function() {
	},*/
	onInitialLayout : function() {
		this.injectBlockly();
		this.initLanguageMenus();
		Ext.fly(document.getElementById('blockly-inner')).on('blocklyWorkspaceChange', function() {
			this.onWorkspaceChange();
		}, this);
		Ext.fly(document.getElementById('blockly-inner')).on('blocklySelectChange', function(a,b,c) {
			if(_.isUndefined(Blockly.selected) || Blockly.selected==null) {
				Session.set("selectedBlock", -1);
			} else {
				Session.set("selectedBlock", Blockly.selected.id);
			}
		}, this);
		Ext.fly(document.getElementById('blockly-inner')).setStyle('zoom', this.scale);

		this.on({
			'resize' : {
				fn : this.onResize
			}
		});
	},
	injectBlockly : function() {
		var w = this.body.getWidth();
		var h = this.body.getHeight();

		this.blocklyWrapper = Ext.core.DomHelper.append(this.body, {
			tag : 'div',
			id : 'blockly-inner',
			width : w,
			height : h,
			style : 'width: ' + w + 'px; height: ' + h + 'px;'
		});

		Blockly.inject(this.blocklyWrapper, {
			path : '/blockly/',
			showToolbox : false
		});
		

	},
	onResize:function(){
		this.body.dom.removeChild(this.blocklyWrapper);
		this.injectBlockly();
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(this.xml));
	},
	initLanguageMenus : function() {
		this.getComponent('tbar1').removeAll();
		this.getComponent('tbar2').removeAll();
		//var menuList = [];
		
		var tbar = this.getComponent(this.langCategories['Variables'].tbarId);
		tbar.add(this.buildCategoryMenu('Variables', this.variablesMenu()));

		var tree = Blockly.Toolbox.buildTree_();
		_.each(_.keys(tree), function(cat) {
			//var tbar = this.getComponent(this.langCategories[variablesCatName].tbarId);
			var catName = cat.replace('cat_', '');
			var tbar = this.getComponent(this.langCategories[catName].tbarId);
			var menuItems = this.langCategories[catName].tbarId=='tbar1'?[this.emptyMenuItem]:[];
			_.each(tree[cat], function(op) {
				var title = op;
				if(!_.isUndefined(Blockly.Language[op].title)) {
					title = Blockly.Language[op].title;
				}
				var handler = this.blockFactory(catName, op, tbar);
				var menuItem = this.buildMenuItem(title, handler);
				menuItems.push(menuItem);
			}, this);
			var menu = this.buildCategoryMenu(catName, menuItems);
			tbar.add([menu]);
			//menuList.push(menu)
		}, this);

		//this.languageToolbar.add(menuList);
	},
	variablesMenu : function() {
		//var tbar = this.languageToolbar;
		var variablesCatName = "Variables";
		//var tbar = this.getComponent('tbar1');
		var tbar = this.getComponent(this.langCategories[variablesCatName].tbarId);
		var menuItems = [this.emptyMenuItem];

		_.each(this.varList, function(name) {
			var setHandler = this.blockFactory(variablesCatName, 'variables_set', tbar, function(block) {
				block.setTitleValue(name, 'VAR');
			});
			var setMenuItem = this.buildMenuItem("Set " + name, setHandler);

			var getHandler = this.blockFactory(variablesCatName, 'variables_get', tbar, function(block) {
				block.setTitleValue(name, 'VAR');
			});
			var getMenuItem = this.buildMenuItem("Get " + name, getHandler);

			menuItems.push(setMenuItem);
			menuItems.push(getMenuItem);
		}, this);
		return menuItems;
	},
	buildMenuItem : function(text, handler) {
		return {
			text : text,
			listeners : {
				'mousedown' : {
					element : 'el',
					fn : handler,
				}
			}
		};
	},
	buildCategoryMenu : function(category, items) {
		return {
			xtype : 'button',
			text : category,
			width : 75,
			itemId : category,
			menu : {
				id : category + '-menu',
				items : items,
			}
		};
	},
	blockFactory : function(cat, op, tbar, initFn) {
		var self = this;
		return function(e, item, eOpts) {
			var eventXY = e.getXY();
			var browserEvent = e.browserEvent;
			tbar.getComponent(cat).menu.hide();
			var block = new Blockly.Block(Blockly.mainWorkspace, op);
			initFn && initFn(block);
			block.initSvg();
			block.render();

			var blockXY = self.getBlockWindowXY(block);
			var dx = eventXY[0] - blockXY[0];
			var dy = eventXY[1] - blockXY[1];

			block.moveBy((dx / self.scale) - 10, (dy / self.scale) - 10);
			block.onMouseDown_(browserEvent);
		}
	},
	getBlockWindowXY : function(block) {
		var thisXY = this.body.getXY();
		var blockXY = Blockly.getAbsoluteXY_(block.getSvgRoot());
		return [thisXY[0] + blockXY.x, thisXY[1] + blockXY.y]
	},
	onMouseWheel : function(e) {
		return;
		var dw = e.getWheelDelta();
		if(dw > 0) {
			this.scale /= 0.95;
		} else {
			this.scale *= 0.95;
		}
		Blockly.scale = this.scale;
		var t = Blockly.mainWorkspace.getCanvas().getAttribute('transform').split(' ');
		var scale = 'scale(' + this.scale + ',' + this.scale + ')';
		Blockly.mainWorkspace.getCanvas().setAttribute('transform', t[0] + ' ' + scale);
		Blockly.mainWorkspace.getBubbleCanvas().setAttribute('transform', t[0] + ' ' + scale);
	},
	onWorkspaceChange : function() {
		var newVarList = _.union(Blockly.Variables.allVariables(), ['item']);
		//console.log(newVarList);
		//console.log(this.varList);
		if(!_.isEqual(this.varList, newVarList)) {
			this.varList = newVarList;
			Ext.getCmp('Variables-menu').removeAll();
			Ext.getCmp('Variables-menu').add(this.variablesMenu());
		}

		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		xml = Blockly.Xml.domToText(xml);

		if(xml == this.xml)
			return;
		this.xml = xml;
		
		var program = Session.get("currentProgram");
		if(_.isUndefined(program)) {
			console.log('create new program');
			program = Programs.insert({
				name : 'New Program',
				xml : xml
			});
			Session.set("currentProgram", program);
		} else {
			console.log('update program');
			Programs.update(program, {
				$set : {
					xml : xml
				}
			});
		}
		this.xmlChanged();	
	},
	xmlChanged: function() {
		try {
			Blockly.debug.traceOn=true;
			var code = Blockly.Generator.workspaceToCode('JavaScript');
		} catch(err) {
			return;
		}

		if(code == this.tracedCode)
			return;
		this.tracedCode = code;

		try {
			Blockly.debug.traceOn=false;
			var cleanCode = Blockly.Generator.workspaceToCode('JavaScript');
		} catch(err) {
			return;
		}
		this.cleanCode = cleanCode;

		this.execCode();
		
		Session.set('tracedCode',  this.tracedCode);
		Session.set('cleanCode',  this.cleanCode);
	},
	execCode : function() {
		console.log('Execute Code:');
		console.log(this.tracedCode);
		Blockly.debug.start();
		try {
			eval(this.tracedCode);
		} catch (e) {
			console.log('Error executing:');
			console.log(e);
			return;
		}
		Blockly.debug.stop();
	},
});
