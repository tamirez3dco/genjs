Meteor.startup(function() {
	Ext.create('GEN.store.Programs', {});
	Session.set("currentXML",'<xml></xml>')
	
	Ext.application({
		name : 'GENJS',
		launch : function() {
			Ext.create('Ext.container.Viewport', {
				//title: 'genjs',
				layout : 'border',
				bodyBorder : false,
				defaults : {
					collapsible : true,
					split : true,
					bodyPadding : 15
				},
				items : [{
					bodyPadding : 0,
					layout : 'border',
					region : 'center',
					collapsible : false,
					items : [{
						title : 'Editor',
						collapsible : false,
						region : 'center',
						margins : '5 0 0 0',
						bodyPadding : 0,
						xtype : 'blockly-panel',
					}, {
					title : 'Viewer',
					region : 'east',
					floatable : false,
					margins : '5 0 0 0',
					width : '50%',
					xtype: 'three-panel'
				}]
				}, {
						split : true,
						title : 'Programs',
						collapsible : true,
						region : 'west',
						margins : '5 0 0 0',
						width : '10%',
						bodyPadding : 0,
						xtype : 'programs-panel',
						store : Ext.data.StoreManager.lookup('GEN.store.Programs'),
					}, {
					title : 'Footer',
					region : 'south',
					height : 150,
					minHeight : 75,
					maxHeight : 250,
				}]
			});
		}
	});
	Meteor.autosubscribe(function() {
		Meteor.subscribe("programs");
	});
});
