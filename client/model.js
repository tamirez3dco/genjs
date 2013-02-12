Ext.define('GEN.model.Program', {
	extend : 'Ext.data.Model',
	idProperty : '_id',
	fields : [{
		name : '_id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'xml',
		type : 'string'
	}],
	constructor: function(){
		this.callParent(arguments);
		var self = this;
		Meteor.autorun(function() {
			//console.log('autorun rec');
			
			//TODO: Hack start
			var programsPanel = Ext.getCmp('programsPanel');
			if(!_.isUndefined(programsPanel)) {
				var selected = programsPanel.getSelectionModel().selected;
				if(selected.items.length>0) {
					var selectedRecordId = selected.items[0].data._id;
				}
			}
			//TODO: Hack end
			var oldName = self.getData().name;
			var p = Programs.findOne(self.getData()._id);
			//if (p.name==oldName) return;
			
			//TODO: bug in ext loose selection here, fixed in 4.1.3
			self.set(p);
			self.commit();
			
			//TODO: Hack start
			if(selectedRecordId) {
				var recIndex = Ext.getStore('GEN.store.Programs').findExact('_id',selectedRecordId);
				programsPanel.getSelectionModel().deselectAll(true);
				programsPanel.getSelectionModel().select(recIndex);
			}
			//TODO: Hack end
		});
	}
});

Ext.define('GEN.store.Programs', {
	extend : 'Ext.data.Store',
	storeId : 'GEN.store.Programs',
	model : 'GEN.model.Program',
	data : [],
	constructor : function() {
		this.callParent();
		var self = this;
		Meteor.autorun(function() {
			//console.log('autorun...');
			var programs = Programs.find();
			var data = programs.map(function(program) {
				return program;
			});
			
			_.each(data, function(d) {
				if(self.indexOfId(d._id) == -1) {
					self.loadData([d], true);
				}
			});
			
		
		});
	}
});
