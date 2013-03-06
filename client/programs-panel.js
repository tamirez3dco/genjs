Ext.define('GEN.ui.programs.Panel', {
	extend : 'Ext.grid.Panel',
	id : 'programsPanel',
	alias : 'widget.programs-panel',
	plugins : [{
		ptype : 'cellediting',
		pluginId : 'cellEditing',
		clicksToEdit : 2
	}],
	dockedItems : [{
		xtype : 'toolbar',
		dock : 'top',
		itemId : 'toolbar1',
		items : [{
			xtype : 'button',
			//text: 'new',
			cls : 'x-btn-default-small',
			icon : '/img/file-empty.png',
			tooltip : 'New program',
			itemId : 'newProgram',
		}],
	}],
	columns : [{
		'text' : 'Name',
		dataIndex : 'name',
		itemId : 'nameColumn',
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
		xtype : 'actioncolumn',
		width : 45,
		text : 'Delete',
		align : 'center',
		items : [{
			//title: 'Delete',
			icon : '/img/file-remove.png',
			handler : function(grid, rowIndex, colindex) {
				Programs.remove(grid.getStore().getAt(rowIndex).getData()._id);
				grid.getStore().removeAt(rowIndex);
			}
		}]
	}],
	listeners : {
		'edit' : {
			fn : function(editor, e) {
				console.log(e);
				d = e.record.getData();
				fields = {}
				fields[e.field] = e.value;
				Programs.update(Programs.findOne(d._id), {
					$set : fields
				});

			}
		}
	},
	initComponent : function() {
		this.callParent();
		//console.log(this);
		this.getSelectionModel().on({
			'selectionchange' : {
				fn : function(model, selected, eOpts) {
					//console.log('programs panel -- selectionchange');
					if(selected.length == 0)
						return;
					Session.set("currentProgram", selected[0].getData()._id);
				}
			}
		});
		var self = this;
		Meteor.autorun(function() {
			try {
				var programId = Session.get("currentProgram");
				if(_.isUndefined(programId))
					return;
					
				var currentId = self.getSelectedId();
				if(currentId==programId) return;
				
				var rec = self.store.getById(programId);
				if(rec==null) return;
				self.getSelectionModel().select(rec);
			
				if(rec.data.name=="New Program") {
					var p = self.getPlugin('cellEditing');
					p.startEdit(rec, self.columns[0]);
					
				}
			} catch(err) {
				console.log(err);
			}
		});

		this.getComponent('toolbar1').getComponent('newProgram').on('click', this.onNewProgram, this);
	},
	getSelectedId : function() {
		current = this.getSelectionModel().selected.items[0];
		if(_.isUndefined(current))
			return null;
		return this.getSelectionModel().selected.items[0].data._id;
	},
	onNewProgram : function() {
		var programs = this.store.addSave([{
			name : 'New Program',
			code : "var p = point( {x: 20,y: 20,z: 0});\ncircle( {origin: p, radius:15});",
		}]);
		console.log('onNewProgram');
		console.log(programs);
		console.log(this.columns[0]);
		console.log(this.getPlugin('cellEditing'));
		var p = this.getPlugin('cellEditing');
		p.startEdit(programs[0], this.columns[0]);
        console.log(programs[0]);
		Session.set("currentProgram", programs[0].data._id);
	}
});
