Ext.define('GEN.ui.blockly.Panel', {
	extend : 'Ext.panel.Panel',
	//border: true,
	bodyStyle : {
	},
	defaults : {
	},
	xml : '<xml></xml>',
	alias : 'widget.blockly-panel',
	tbar : {
		xtype : 'toolbar',
		itemId : 'tbar',
		items : [/*{
		 xtype : 'button',
		 text : 'New',
		 //icon: '/static/resources/images/icons/file-empty.png',
		 //id: 'ez3d-paint-clear-button',
		 tooltip : 'New Program'
		 }*/]
	},
	initComponent : function() {
		var self = this;
		this.callParent();
		this.on({
			'afterlayout' : {
				fn : function() {

					var w = this.body.getWidth();
					var h = this.body.getHeight();
					Ext.core.DomHelper.append(this.body, {
						tag : 'div',
						id : 'blockly-inner',
						width : w,
						height : h,
						style : ' width: ' + w + 'px; height: ' + h + 'px;'
					});
					Blockly.inject(document.getElementById('blockly-inner'), {
						path : '/blockly/'
					});
					//console.log(Blockly.Toolbox.languageTree);
					this.initLanguageMenus();
					Ext.fly(document.getElementById('blockly-inner')).on('blocklyWorkspaceChange', function() {
						//console.log('change');
						var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
						xml = Blockly.Xml.domToText(xml);
						//console.log(xml);
						if(xml == self.xml)
							return;
						self.xml = xml;

						var program = Session.get("currentProgram");
						if(_.isUndefined(program)) {
							console.log('create new program');
							program = Programs.insert({
								name : 'New Program',
								xml : xml
							});
							Session.set("currentProgram", program);
							/*	Meteor.call('createProgram', {
							 name : 'New Program',
							 xml : xml
							 }, function(error, program) {
							 if(!error) {
							 console.log('set current');
							 //Session.set("currentProgram", program);
							 }
							 });*/
						} else {
							console.log('update program');
							Programs.update(program, {
								$set : {
									xml : xml
								}
							});
						}
					});
				},
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
	initLanguageMenus : function() {
		//console.log(Blockly.Language);
		//console.log(Blockly.Toolbox.languageTree);
		var self = this;
		var tbar = this.getDockedComponent('tbar');
		_.each(_.keys(Blockly.Toolbox.languageTree), function(cat) {
			var catName = cat.replace('cat_', '');

			var menuItems = [];
			_.each(Blockly.Toolbox.languageTree[cat], function(op) {
				//console.log(Blockly.Language[op]);
				var menuItem = {
					text : op,
					listeners : {
						'mousedown' : {
							element: 'el',
							fn : function(e, item, eOpts) {
								var eventXY = e.getXY();
								var browserEvent = e.browserEvent;
								tbar.getComponent(catName).menu.hide();
								var block = new Blockly.Block(Blockly.mainWorkspace,op);
								block.initSvg();
								block.render();
								
								var blockXY = self.getBlockWindowXY(block);
								var dx = eventXY[0] - blockXY[0];
								var dy = eventXY[1] - blockXY[1];
							
								block.moveBy(dx-10,dy-10);
								block.onMouseDown_(browserEvent);
							},
						}
					}
				}
				menuItems.push(menuItem);
			});
			tbar.add({
				xtype : 'button',
				text : catName,
				width : 70,
				itemId: catName,
				menu : {
					items: menuItems,
				}
			});
		});
	},
	getBlockWindowXY: function(block){
		var thisXY = this.body.getXY();
		var blockXY = Blockly.getAbsoluteXY_(block.getSvgRoot());
		return [thisXY[0] + blockXY.x, thisXY[1] + blockXY.y]
	}
});
