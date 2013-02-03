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
	tbar : {
		xtype : 'toolbar',
		itemId : 'tbar',
		items : [{
			xtype : 'button',
			text : 'Dummy',
			tooltip : 'Layout place holder'
		}]
	},
	initComponent : function() {
		var self = this;
		this.callParent();
		this.languageToolbar = this.getDockedComponent('tbar');
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
		});
	},
	afterRender : function() {
		this.callParent();
	},
	onInitialLayout : function() {
		this.injectBlockly();
		this.initLanguageMenus();
		Ext.fly(document.getElementById('blockly-inner')).on('blocklyWorkspaceChange', function() {
			this.onWorkspaceChange();
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
		this.languageToolbar.removeAll();
		var menuList = [];

		menuList.push(this.buildCategoryMenu('Variables', this.variablesMenu()));

		var tree = Blockly.Toolbox.buildTree_();
		_.each(_.keys(tree), function(cat) {
			var catName = cat.replace('cat_', '');

			var menuItems = [];
			_.each(tree[cat], function(op) {
				var title = op;
				if(!_.isUndefined(Blockly.Language[op].title)) {
					title = Blockly.Language[op].title;
				}
				var handler = this.blockFactory(catName, op, this.languageToolbar);
				var menuItem = this.buildMenuItem(title, handler);
				menuItems.push(menuItem);
			}, this);
			var menu = this.buildCategoryMenu(catName, menuItems);

			menuList.push(menu)
		}, this);

		this.languageToolbar.add(menuList);
	},
	variablesMenu : function() {
		var tbar = this.languageToolbar;
		var variablesCatName = "Variables";
		var menuItems = [];

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
			width : 70,
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
	}
});
