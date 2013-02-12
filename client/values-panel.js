Ext.define('GEN.ui.values.Panel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.values-panel',
	tpl : new Ext.Template("{vals}"),
	data: {vals: 'No Block Selected'},
	initComponent : function() {
		this.callParent();
		this.initSelectionChangeHandler();
	},
	initSelectionChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			var blockId = Session.get("selectedBlock");
			var tracedCode = Session.get("tracedCode");
			if(_.isUndefined(blockId)) return;
			self.selectedBlock = blockId;
			if(blockId==-1) {
				self.update({vals: 'No Block Selected'});
			} else {
				//console.log(blockId);
				//console.log(Blockly.debug.tracedBlocks);
				if(_.isUndefined(Blockly.debug.tracedBlocks[blockId])) {
					self.update({vals: 'Block Produce No Values'});
				} else {
				var values = Blockly.debug.tracedBlocks[blockId];
				//console.log(values);
				//TODO: Is this a hack? find proper way, or document 
				if(_.isArray(values) && values.length==1 && _.isArray(values[0])) {
					values = values[0];
				}
				var vals = values.join('<br>');
				self.update({vals: vals});
				}
			}
		});
		
	}
});
