Ext.define('GEN.ui.jscode.Panel', {
	extend : 'Ext.panel.Panel',

	bodyStyle : {
	},
	defaults : {
	},
	alias : 'widget.jscode-panel',
	tpl : new Ext.Template("<pre>{code}</pre>"),
	initComponent : function() {
		this.callParent();
		this.initProgramChangeHandler();
	},
	//TODO: set code in editor panel, let others subscribe to code changes
	initProgramChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			var current = Session.get("currentProgram");
			if(_.isUndefined(current))
				return;
			program = Programs.findOne(current);
			if(_.isUndefined(program))
				return;

			try {
				var code = Blockly.Generator.workspaceToCode('JavaScript', false);
			} catch(err) {
				return;
			}

			if(code == self.code)
				return;
			self.code = code;
			self.update({code: code});	
		});
	},
});
