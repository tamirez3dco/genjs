//TODO: put somewhere..
var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	clicksToEdit : 2
});

Ext.define('GEN.ui.programs.Panel', {
	extend : 'Ext.grid.Panel',
	//border: true,
	bodyStyle : {
	},
	defaults : {
	},
	alias : 'widget.programs-panel',
	plugins : [cellEditing],
	columns : [{
		'text' : 'Name',
		dataIndex : 'name',
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
		xtype : 'actioncolumn',
		width : 40,
		items : [{
			icon : 'path_to_img',
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
				fields[e.field]=e.value;
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
					if(selected.length == 0)
						return;
					Session.set("currentProgram", selected[0].getData()._id);
				}
			}
		});
	}
});
