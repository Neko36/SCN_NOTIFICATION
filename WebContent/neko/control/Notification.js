jQuery.sap.declare("neko.control.Notification");

/**
 * Reference: Notification Styles Inspiration
 * 
 * http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/
 */
sap.ui.core.Control.extend("neko.control.Notification", {

	metadata : {
		properties : {
			// the message for the notification
			message : {
				type : "string",
				defaultValue : null,
				group : "Appearance"
			},
			// if the user doesn´t close the notification then we remove it 
			// after the following time
			durability : {
				type : "int",
				defaultValue : 6000,
				group : "Behavior"
			},
			// layout type
			layout : {
				type : "string",
				defaultValue : "bar",
				group : "Appearance"
			},
			// effects for the specified layout
			effect : {
				type : "string",
				defaultValue : "slidetop",
				group : "Appearance"
			},
			// notice, warning, error, success
			// will add class ns-type-notice, ns-type-warning, ns-type-error or ns-type-success
			type : {
				type : "string",
				defaultValue : "notice",
				group : "Appearance"
			}
		},
		events : {
			"close" : {},
			"open"  : {}
		}
	},
	
	/**
	 * show the notification
	 */	
	show : function(){
		// init control
		this._init();
		
		// setting control to active state
		this._active = true;
		$(this._notification).removeClass("ns-hide");	
		$(this._notification).addClass("ns-show");
		
		// fire open-event
		this.fireOpen({/* no parameters */});
	},
	
	/**
	 * dismiss the notification
	 */	
	dismiss : function() {
		
		var self = this;
		this._active = false;
		clearTimeout( this._dismissttl );
		$(this._notification).removeClass("ns-show");	

		setTimeout( function() {
			$(self._notification).addClass("ns-hide");
			self.fireClose({/* no parameters */});
		}, 25 );

		// after animation ends remove notification from the DOM
		var onEndAnimationFn = function( event ) {
			
			if( event.target !== self._notification ) return false;
			
			this.removeEventListener( self._getAnimationName(), onEndAnimationFn );
			
			document.body.removeChild( this );
		};
		
		$(this._notification).on( this._getAnimationName(), onEndAnimationFn );	
	},
	
	/**
	 * init the control
	 */
	_init : function() {
		
		// create HTML structure
		this._notification = document.createElement( "div" );
		this._notification.className = "ns-box ns-" + this.getLayout() + " ns-effect-" + this.getEffect() + " ns-type-" + this.getType();
		var strinner = "<div class='ns-box-inner'>";
		strinner += "<span class='icon " + this._getIconClass() + "'></span>";
		strinner += "<p>" + this.getMessage() + "</p>";
		strinner += "</div>";
		strinner += "<span class='ns-close'></span></div>";
		this._notification.innerHTML = strinner;
		
		// append to body
		document.body.insertBefore( this._notification, document.body.firstChild );
		
		// dismiss after durability
		var self = this;
		this._dismissttl = setTimeout( function() {
			if( self._active ) {
				self.dismiss();
			}
		}, this.getDurability());
		
		// init events
		this._initEvents();
	},
	
	/**
	 * init all internal eventhandlers
	 */
	_initEvents : function(){
		var self = this;
		$(this._notification).find(".ns-close").on("click", function() { self.dismiss(); });
	},
	
	/**
	 * determine the suitable CSS-class for the notification
	 */
	_getIconClass : function(){
		var iconClass;
		if(this.getType() === "notice"){
			iconClass = "icon-notice";
		} else if(this.getType() === "warning"){
			iconClass = "icon-warning";
		} else if(this.getType() === "error"){
			iconClass = "icon-error";
		} else if(this.getType() === "success"){
			iconClass = "icon-success";
		}else{
			iconClass = "icon-notice";
		}
		return iconClass;
	},
	/**
	 * determine the suitable CSS-event-name depending on the browser
	 */
	_getAnimationName : function(){
		var animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			};
		// Getting the correct prefix via Modernizr 
		return animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	}
});