Ext.define('GEN.ui.blockly.Panel', {
	extend : 'Ext.panel.Panel',
	//border: true,
	bodyStyle : {
	},
	defaults : {
	},
	xml : '<xml></xml>',
	scale : 1,
	useWorker : true,
	varList : ['item'],
	alias : 'widget.blockly-panel',
	langCategories : {
		'Variables' : {
			position : 10,
			title : 'Variables',
			tbarId : 'tbar1'
		},
		'Control' : {
			position : 30,
			title : 'Control',
			tbarId : 'tbar1'
		},
		'Lists' : {
			position : 40,
			title : 'Lists',
			tbarId : 'tbar1'
		},
		'Logic' : {
			position : 50,
			title : 'Logic',
			tbarId : 'tbar1'
		},
		'Math' : {
			position : 20,
			title : 'Math',
			tbarId : 'tbar1'
		},
		'Text' : {
			position : 60,
			title : 'Text',
			tbarId : 'tbar1'
		},
		'Mesh' : {
			position : 30,
			title : 'Mesh',
			tbarId : 'tbar2'
		},
		'Surface' : {
			position : 25,
			title : 'Surface',
			tbarId : 'tbar2'
		},
		'Curve' : {
			position : 20,
			title : 'Curve',
			tbarId : 'tbar2'
		},
		'Vector' : {
			position : 10,
			title : 'Vector',
			tbarId : 'tbar2'
		},
		'Transform' : {
			position : 40,
			title : 'Transform',
			tbarId : 'tbar2'
		}
	},
	emptyMenuItem : {
		xtype : 'displayfield',
		height : 20
	},
	dockedItems : [{
		xtype : 'statusbar',
		dock : 'top',
		itemId : 'tbar1',
		text: '<span style="color: green">Ready</span>',
        iconCls: 'x-status-valid',
        statusAlign: 'right',
        defaultText: '<span style="color: green">Ready</span>',
        busyText:'<span style="color: orange">Evaluating...</span>',
		items : [{
			xtype : 'button',
			text : 'Dummy',
			id: 'tbar1-dummy-item',
			tooltip : 'Layout place holder'
		}]
	}, {
		xtype : 'toolbar',
		dock : 'top',
		itemId : 'tbar2',
		items : [{
			xtype : 'button',
			text : 'Dummy',
			tooltip : 'Layout place holder'
		}]
	}],
	initComponent : function() {
		this.callParent();
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
		this.initProgramChangeHandler();
		this.initWorker();
	},
	//This happens when the selected program changed locally, or when the xml changed remotely
	initProgramChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			try {
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
				console.log(xml);
				Blockly.mainWorkspace.clear();
				//TODO: prevent 'blocklyWorkspaceChange' event here.
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
				self.xmlChanged();
			} catch(err) {
				console.log('Editor panel: Error while program changed' + err.message);
			}
		});
	},
	onInitialLayout : function() {
		this.injectBlockly();
		this.initLanguageMenus();
		this.initWorkspaceEvents();
		this.on({
			'resize' : {
				fn : this.onLocalResize
			}
		});
	},
	initWorkspaceEvents : function() {
		Ext.fly(document.getElementById('blockly-inner')).on({
			'blocklyWorkspaceChange' : {
				fn : this.onWorkspaceChange,
				scope : this,
				buffer : 250
			}
		});
		Ext.fly(document.getElementById('blockly-inner')).on('blocklySelectChange', function(a, b, c) {
			if(_.isUndefined(Blockly.selected) || Blockly.selected == null) {
				Session.set("selectedBlock", -1);
			} else {
				Session.set("selectedBlock", Blockly.selected.id);
			}
		}, this);
		Ext.fly(document.getElementById('blockly-inner')).setStyle('zoom', this.scale);
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
			//rtl: true,
			showToolbox : false
		});

	},
	onLocalResize : function() {
		this.body.dom.removeChild(this.blocklyWrapper);
		this.injectBlockly();
		this.initWorkspaceEvents();
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(this.xml));
	},
	initLanguageMenus : function() {
		this.getComponent('tbar1').remove(this.getComponent('tbar1').getComponent('tbar1-dummy-item'));
		this.getComponent('tbar2').removeAll();

		var tbar = this.getComponent(this.langCategories['Variables'].tbarId);
		tbar.insert(0,this.buildCategoryMenu('Variables', this.variablesMenu()));

		var tree = Blockly.Toolbox.buildTree_();
		_.each(_.keys(tree), function(cat) {
			var catName = cat.replace('cat_', '');
			var tbar = this.getComponent(this.langCategories[catName].tbarId);
			var menuItems = this.langCategories[catName].tbarId == 'tbar1' ? [this.emptyMenuItem] : [];
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
			var count = tbar.items.getCount();
			
			var position = this.langCategories[catName].tbarId == 'tbar1' ? count-2:count;
			tbar.insert(position, menu);
		}, this);
	},
	variablesMenu : function() {
		var variablesCatName = "Variables";
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
					fn : handler
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
				//showSeparator: false,
				id : category + '-menu',
				items : items
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
        if (dw <= 0) {
            this.scale *= 0.95;
        } else {
            this.scale /= 0.95;
        }
		Blockly.scale = this.scale;
		var t = Blockly.mainWorkspace.getCanvas().getAttribute('transform').split(' ');
		var scale = 'scale(' + this.scale + ',' + this.scale + ')';
		Blockly.mainWorkspace.getCanvas().setAttribute('transform', t[0] + ' ' + scale);
		Blockly.mainWorkspace.getBubbleCanvas().setAttribute('transform', t[0] + ' ' + scale);
	},
	onWorkspaceChange : function() {
		var newVarList = _.union(Blockly.Variables.allVariables(), ['item']);

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

		console.log(xml);
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
	xmlChanged : function() {
		try {
			//GEN.debug.traceOn = true;
			Blockly.Generator.TRACE = true;
			var code = Blockly.Generator.workspaceToCode('JavaScript');
		} catch(err) {
			return;
		}

		if(code == this.tracedCode)
			return;
		this.tracedCode = code;
		//console.log(code);

		try {
			//GEN.debug.traceOn = false;
			Blockly.Generator.TRACE = false;
			var cleanCode = Blockly.Generator.workspaceToCode('JavaScript');
		} catch(err) {
			return;
		}
		this.cleanCode = cleanCode;

		//this.runWorker(this.tracedCode);
		this.execCode(this.tracedCode);

		Session.set('tracedCode', this.tracedCode);
		Session.set('cleanCode', this.cleanCode);
	},
	execCode : function(code) {
		this.getComponent('tbar1').showBusy();	
		if(this.useWorker == true) {
			this.runWorker(code);
		} else {
			this.getExecutionResult(GEN.Runner.run(code));
		}
	},
	getExecutionResult : function(result) {
		console.log('execution result');
		console.log(result);
		Session.set('renderableBlocks', result);
		this.getComponent('tbar1').clearStatus({useDefaults:true});	
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
	runWorker : function(code) {
		console.log("Execute Code");
		console.log(code);
		console.log('sending');
		this.worker.port.postMessage(code);
	},
	getWorkerMessage : function(event) {
		console.log("Worker sent message");
		result = JSON.parse(event.data);
		this.getExecutionResult(result);
	}
});
