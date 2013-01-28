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
					
					Ext.fly(document.getElementById('blockly-inner')).on('blocklyWorkspaceChange', function() {
						var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
						xml = Blockly.Xml.domToText(xml);
						if(xml == self.xml)
							return;	
						self.xml = xml;

						var program = Session.get("currentProgram");
						if(_.isUndefined(program)) {
							console.log('create new program');
							Meteor.call('createProgram', {
								name : 'New Program',
								xml : xml
							}, function(error, program) {
								if(!error) {
									Session.set("currentProgram", program);
								}
							});
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
	}
});
