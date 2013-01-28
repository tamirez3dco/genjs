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
			'autorun rec'
			var p = Programs.findOne(self.getData()._id);
			//TODO: bug in ext loose selection here, fixed in 4.1.3
			self.set(p);
			self.commit();
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
			console.log('autorun...');
			var programs = Programs.find();
			var data = programs.map(function(program) {
				return program;
			});
			_.each(data, function(d) {
				console.log(d);
				if(self.indexOfId(d._id) == -1) {
					self.loadData([d], true);
				}
			});
		});
	}
});
