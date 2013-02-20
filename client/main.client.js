Meteor.startup(function() {
	Ext.create('GEN.store.Programs', {});
	Session.set("currentXML", '<xml></xml>');
	Session.set("selectedBlock", -1);

	//Blockly.debug = new Blockly.Debugger();
	//GEN.Geometry.initGlobal();
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
						xtype : 'blockly-panel',
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
					//title : '',
					collapsible : true,
					hideCollapseTool : true,
					header : false,
					region : 'south',
					height : 220,
					//minHeight : 75,
					maxHeight : 400,
					margins : "0 0 0 0",
					bodyPadding : "0 0 10 0",
					frame : false,
					//layout: 'fit
					layout : 'border',
					defaults : {
						frame : false,
						margins : "0 0 0 0",
						bodyPadding : 4,
						split : true,
						autoScroll : true,
					},
					items : [{
						region : 'west',
						margins : "0 0 0 0",
						width : '40%',
						title : 'Javascript Code',
						xtype : 'jscode-panel',
						//autoscroll: true,
						data : {
							code : 'No code generated'
						}
					}, {
						region : 'center',
						width : '30%',
						//autoScroll: true,
						title : 'Selected Values',
						xtype : 'values-panel'
					}, {
						region : 'east',
						width : '30%',
						title : 'Output - stub'
					}]
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
