Ext.define('GEN.ui.jscode_o.Panel', {
	extend : 'Ext.panel.Panel',

	bodyStyle : {
	},
	defaults : {
	},
	alias : 'widget.jscode_o-panel',
	tpl : new Ext.Template("<pre>{code}</pre>"),
	initComponent : function() {
		this.callParent();
		this.initProgramChangeHandler();
	},
	//TODO: set code in editor panel, let others subscribe to code changes
	initProgramChangeHandler : function() {
		var self = this;
		Meteor.autorun(function() {
			var code = Session.get("cleanCode");

			if(code == self.code)
				return;
			self.code = code;
			self.update({code: code});	
		});
	}
});

Ext.define('GEN.ui.jscode.Panel', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.jscode-panel',
    /*items: [{
        xtype: 'component',
        //id: 'ace-editor'
    }]*/
    initComponent : function() {
        this.callParent();

        /*Ext.Loader.loadScript({
            url: 'http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js',
            onLoad: this.onAceLoad,
            scope: this
        });*/
        this.on({
            'afterlayout' : {
                fn : this.onInitialLayout,
                single : true
            }
        });
    },
    onInitialLayout: function() {
        this.editor = Ext.core.DomHelper.append(this.body, {
            tag : 'div',
            id : 'ace-editor',
            style: "width: 100%; height: 100%;"
        });
        ace.config.set("workerPath", "/ace");
        this.editor = ace.edit("ace-editor");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/javascript");
        this.editor.setValue("circle(20,20,20);");
    }
});

