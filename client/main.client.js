Meteor.startup(function() {
	Ext.create('GEN.store.Programs', {});
	Session.set("currentXML",'<xml></xml>')
	
	Ext.application({
		name : 'HelloExt',
		launch : function() {
			Ext.create('Ext.container.Viewport', {
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
						split : true,
						title : 'Programs',
						collapsible : true,
						region : 'west',
						margins : '5 0 0 0',
						width : '20%',
						bodyPadding : 0,
						xtype : 'programs-panel',
						store : Ext.data.StoreManager.lookup('GEN.store.Programs'),
					}]
				}, {
					title : 'Viewer',
					region : 'east',
					floatable : false,
					margins : '5 0 0 0',
					width : '50%',
					xtype: 'three-panel'
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
		Meteor.subscribe("program-names");
	});
});
