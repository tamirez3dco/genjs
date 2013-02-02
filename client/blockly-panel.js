Ext.define('GEN.ui.blockly.Panel', {
	extend : 'Ext.panel.Panel',
	//border: true,
	bodyStyle : {
	},
	defaults : {
	},
	xml : '<xml></xml>',
	scale: 1,
	alias : 'widget.blockly-panel',
	tbar : {
		xtype : 'toolbar',
		itemId : 'tbar',
		items : [{
			xtype : 'button',
			text : 'New',
			//icon: '/static/resources/images/icons/file-empty.png',
			//id: 'ez3d-paint-clear-button',
			tooltip : 'New Program'
		}]
	},
	initComponent : function() {
		var self = this;
		this.callParent();
		this.on({
			'mousewheel' : {
				element : 'el',
				fn : this.onMouseWheel,
				scope: this
			},
			'afterlayout' : {
				fn : function() {
					var w = this.body.getWidth();
					var h = this.body.getHeight();

					var wrapper = Ext.core.DomHelper.append(this.body, {
						tag : 'div',
						id : 'blockly-inner',
						width : w,
						height : h,
						style : 'width: ' + w + 'px; height: ' + h + 'px;'
						//style : 'overflow: hidden;'
					});
					/*
					var innerSize = 5000;
					Ext.core.DomHelper.append(wrapper, {
						tag : 'div',
						id : 'blockly-inner',
						width : innerSize,
						height : innerSize,
						style : 'border: 1px solid black; margin-left: 0px; margin-top: 0px; width: ' + innerSize + 'px; height: ' + innerSize + 'px;'
					});*/

					Blockly.inject(document.getElementById('blockly-inner'), {
						path : '/blockly/',
						showToolbox : false
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
					Ext.fly(document.getElementById('blockly-inner')).setStyle('zoom', this.scale);
					
					//console.log(Blockly.getMainWorkspaceMetrics())
					//Blockly.svgResize();
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
		tbar.removeAll();
		var tree = Blockly.Toolbox.buildTree_();
		_.each(_.keys(tree), function(cat) {
			var catName = cat.replace('cat_', '');

			var menuItems = [];
			_.each(tree[cat], function(op) {
				//console.log(Blockly.Language[op]);
				var menuItem = {
					text : op,
					listeners : {
						'mousedown' : {
							element : 'el',
							fn : function(e, item, eOpts) {
								var eventXY = e.getXY();
								var browserEvent = e.browserEvent;
								tbar.getComponent(catName).menu.hide();
								var block = new Blockly.Block(Blockly.mainWorkspace, op);
								block.initSvg();
								block.render();

								var blockXY = self.getBlockWindowXY(block);
								var dx = eventXY[0] - blockXY[0];
								var dy = eventXY[1] - blockXY[1];
								console.log(dx);
								block.moveBy((dx / self.scale) - 10, (dy / self.scale) - 10);
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
				itemId : catName,
				menu : {
					items : menuItems,
				}
			});
		});
	},
	getBlockWindowXY : function(block) {
		var thisXY = this.body.getXY();
		var blockXY = Blockly.getAbsoluteXY_(block.getSvgRoot());
		return [thisXY[0] + blockXY.x, thisXY[1] + blockXY.y]
	},
	onMouseWheel : function(e) {
		return;
		var dw = e.getWheelDelta();
		if(dw>0){
			this.scale /= 0.95;
		} else {
			this.scale *= 0.95;
		}	
		Blockly.scale = this.scale;
		var t = Blockly.mainWorkspace.getCanvas().getAttribute('transform').split(' ');
		var scale = 'scale('+ this.scale +','+ this.scale +')';
		Blockly.mainWorkspace.getCanvas().setAttribute('transform',t[0] + ' ' + scale);
		Blockly.mainWorkspace.getBubbleCanvas().setAttribute('transform',t[0] + ' ' + scale);
	},
	/*scaleToCSS: function() {
		//(this.scale*100) + ''
	}*/
});
