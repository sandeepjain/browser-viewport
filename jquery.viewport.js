/**
 * jQuery Viewport Plugin
 * 
 * Author : Sandeep Jain
 * Author Webiste: http://www.jsvrocks.com/
 *
 * Copyright 2011, Sandeep Jain
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */
(function (window, document, $) {
	/*
	 *  Function to find browser viewport size.
	 */
	function viewport() {

		var doc = $(document),
			h = doc.height();
			
		// for the horror browsers
		if ($.browser.msie) {
			// If there are no scrollbars then use window.height as width
			var w = h;
			return [
				window.innerWidth || 						// ie7+
				document.documentElement.clientWidth || 	// ie6  
				document.body.clientWidth, 					// ie6 quirks mode
				h - w < 20 ? w : h
			];
		}
		// for cute and well behaving browsers
		return {width:doc.width(), height: h}; 
	}
	
	
	/*
	 * Fits an element to page size.
	 * 
	 * Usage :
	 * 
	 * To resize element only once. 
	 * $("#element").fitToPage();
	 * 
	 * To keep element size in sync with browser size.
	 * 
	 * $("#element").fitToPage(true);
	 * 
	 */ 
	$.fn.fitToPage = function (isLive) {
		var size = viewport();
		var self = this;
		self.each(function() {
			$(this).width(size.width).height(size.height);
		});
		
		if (typeof isLive != 'undefined' && (isLive === true || isLive.toLowerCase() == 'true')) {
			$(window).resize( function () {
				self.fitToPage();
			});
		}
		
	};
	
	/*
	 * Returns current web page size.
	 * 
	 * Usage :
	 * var size = $.getPageSize();
	 * 
	 * @return Object {width, height}
	 * 
	 */
	$.fn.getPageSize = function () {
		return viewport();
	};
	
})(this, this.document, jQuery);