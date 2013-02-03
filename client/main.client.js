Meteor.startup(function() {
	Ext.create('GEN.store.Programs', {});
	Session.set("currentXML", '<xml></xml>')
	GEN.runner = new GEN.Runner();
	GEN.geometry = new GEN.Geometry();
	Ext.application({
		name : 'GENJS',
		launch : function() {
			//var GEN.
			Ext.create('Ext.container.Viewport', {
				//title: 'genjs',
				layout : 'border',
				bodyBorder : false,
				defaults : {
					collapsible : true,
					split : true,
					bodyPadding : 15
				},
				items : [
				{
					bodyPadding : 0,
					layout : 'border',
					region : 'center',
					collapsible : false,
					frame:false,
					border:false,
					items : [{
						title : 'Editor',
						//collapsible : true,
						split: true,
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
						xtype : 'three-panel',
						split : true,
						collapsible : true,
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
					title : 'Nothing yet...',
					region : 'south',
					height : 150,
					minHeight : 75,
					maxHeight : 250,
					//layout: 'fit
					html: ''
				}, {
					title : '<div style="float: left;"><span style="font-size: 20px; color: rgb(127,112,205)">genjs</span></div>',
					region : 'north',
					height : 28,
					//layout: 'fit
					collapsible: false,
					split: false,
					html: '',
					listeners: {
						/*'afterrender': {
							fn: function(){
								var el = document.getElementById('sign-in-div');
								el.appendChild()
							}
						}*/
					}
				}]
			});
		}
	});
	Meteor.autosubscribe(function() {
		Meteor.subscribe("programs");
	});
});
