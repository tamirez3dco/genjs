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
		name : 'code',
		type : 'string'
	}],
	constructor : function() {
		this.callParent(arguments);
		var self = this;
		Meteor.autorun(function() {
			//console.log('autorun rec');

			//TODO: Hack start
			var programsPanel = Ext.getCmp('programsPanel');
			if(!_.isUndefined(programsPanel)) {
				var selected = programsPanel.getSelectionModel().selected;
				if(selected.items.length > 0) {
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
				var recIndex = Ext.getStore('GEN.store.Programs').findExact('_id', selectedRecordId);
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
		this.loadInitialData();
		this.observer = this.createObserver();
	},
	addSave : function(records) {
		var record = records[0];
		//Stop geting updates until we add the records
		this.observer.stop();
		var id = Programs.insert(record);
		var program = Programs.findOne(id);
		var newRecords = this.add([program]);
		//Resume updates
		this.observer = this.createObserver();
		return newRecords;
	},
	//TODO: use "observe" collection here instead of this naive way.
	
	createObserver : function() {
		var self = this;

		var handle = Meteor.autorun(function() {
			//console.log('autorun...');
			var programs = Programs.find();
			
			//console.log(programs);
			//This strange thing convert a Meteor cursor to an array, no toArray or something??
			var data = programs.map(function(program) {
				return program;
			});
			//console.log(data);
			_.each(data, function(d) {
				if(self.indexOfId(d._id) == -1) {
					self.loadData([d], true);
				}
			});
		});
		return handle;

	},
	loadInitialData: function() {
		var self = this;
		var programs = Programs.find();
		var data = programs.map(function(program) {
			return program;
		});
		self.loadData(data);
	},
	/*
	createObserver : function() {
		var self = this;
		var handle = Meteor.autorun(function() {
			var programs = Programs.find();
			programs.observeChanges({
				added: function(id, fields){
					fields._id = id;
					self.add([fields]);
				},
				//changed: 
			});
		});
		return handle;
	}	
	*/
});
