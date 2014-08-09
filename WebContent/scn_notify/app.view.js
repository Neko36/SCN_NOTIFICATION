jQuery.sap.require("neko.control.Notification");

sap.ui.jsview("scn_notify.app", {
	
	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf scn_menu.app
	 */
	getControllerName : function() {
		return "scn_notify.app";
	},
	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf scn_menu.app
	 */
	createContent : function(oController) {
						
		// header text
		var oHeader = new sap.ui.commons.TextView({
			text : 'Custom Notifications',
			wrapping : false,
			width : '500px',
			design: sap.ui.commons.TextViewDesign.H2
		});
		
		// description text
		var oText = new sap.ui.commons.TextView({
			text : 'The following custom control is an UI5 port of "Notification Styles Inspiration" (https://github.com/codrops/NotificationStyles)',
			wrapping : false
		});
		
		// button for showing notification
		var oButton = new sap.ui.commons.Button({
			text : "Show Notification",
			tooltip : "Show Notification",
			press : function() {
				// when pressing the button, a new notification
				// is created and shown immediately
				new neko.control.Notification({
					message : "This is a success message! It will disappear in six seconds.",
					type : "success",
					close : function(){
						oButton.setEnabled(true);
					},
					open : function(){
						oButton.setEnabled(false);
					}
				}).show();
			}
		});
		
		// container for content
		var oContent = new sap.ui.layout.VerticalLayout("VL_CONTENT", {
			content : [oHeader, oText, oButton]
		});
		
		oContent.addStyleClass("content");
		
		// shell instance
		var oShell = new sap.ui.ux3.Shell("myShell", {
				appTitle : "Simple Notification for UI5",
				showLogoutButton : false,
				showSearchTool : false,
				showInspectorTool : false,
				showFeederTool : false,
				content : oContent,
				headerItems : [new sap.ui.commons.Button({
					text : "SAP Community Network",
					tooltip : "SAP Community Network",
					press : function(oEvent) {
						window.location.href = "http://scn.sap.com/";
					}
				}), new sap.ui.commons.Button({
					text : "codrops",
					tooltip : "codrops",
					press : function(oEvent) {
						window.location.href = "http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/";
					}
				}), new sap.ui.commons.Button({
					text : "Developer",
					tooltip : "Developer",
					press : function(oEvent) {
						window.location.href = "http://scn.sap.com/people/michaelherzog";
					}
				})]
			});
		return oShell;
	}
});