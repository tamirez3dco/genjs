Meteor.startup(function() {
	Ext.create('GEN.store.Programs', {});
	Session.set("currentXML", '<xml></xml>');
	Session.set("selectedBlock", -1);

	GEN.Geometry.buildLanguage();
	GEN.Runner.init();
	
	Ext.application({
		name : 'GENJS',
		launch : function() {
			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				bodyBorder : false,
				defaults : {
					collapsible : true,
					split : true,
					//bodyPadding : 15
				},
				items : [{
					bodyPadding : 0,
					layout : 'border',
					region : 'center',
					collapsible : false,
					frame : false,
					border : false,
					items : [{
						title : 'Editor',
						collapsible : true,
						split : true,
						region : 'west',
						margins : '5 0 0 0',
						bodyPadding : 0,
						width : '50%',
						xtype : 'js-editor-panel',
					}, {
						title : 'Viewer',
						region : 'center',
						floatable : false,
						margins : '5 0 0 0',
						width : '50%',
						xtype : 'three-panel',
						split : true,
						//collapsible : true,
					}]
				}, {
					split : true,
					title : 'Programs',
					collapsible : true,
					region : 'west',
					margins : '5 0 0 0',
					//width : '10%',
					//minWidth: '200',
					width : 146,
					bodyPadding : 0,
					xtype : 'programs-panel',
					store : Ext.data.StoreManager.lookup('GEN.store.Programs'),
				}, {
					title : '<div style="float: left;"><span style="font-size: 20px; color: rgb(127,112,205)">genjs</span></div>',
					region : 'north',
					height : 28,
					//layout: 'fit
					collapsible : false,
					split : false,
					html : '',
					/*tools : [{
						type : 'refresh',
						tooltip : 'Refresh form Data',
						handler : function(event, toolEl, panel) {
						}
					}],
					listeners : {
						
					}*/
				}]
			});
		}
	});
	Meteor.autosubscribe(function() {
		Meteor.subscribe("programs");
	});
});
