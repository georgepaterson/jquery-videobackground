/*!
 * jQuery Video Background plugin
 * https://github.com/georgepaterson/jquery-videobackground
 *
 * Copyright 2011, George Paterson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function($){
	/*
	 *
	 */
	var methods = {
		/*
		 *
		 */
		init: function (options) {
			if (document.createElement('video').canPlayType) {	
			  return this.each(function () {
					var element = $(this);
					element.settings = $.extend({}, $.fn.videobackground.defaults, options);
					/*
					 *	If the resize option is set.
					 *	Set the height of the container to be the height of the document
					 *	The video can expand in to the space using min-height: 100%;
					 *
					 */
					if (element.settings.resize) {
						resize(element);
					}
					/*
					 *	Complie the different HTML5 video attributes.	
					 *
					 */
					var compiledSource = '';
					$.each(element.settings.videoSource, function(index, value) { 
					  compiledSource = compiledSource + '<source src="' + value + '">';
					});
					var attributes = '';
					attributes = attributes + 'preload="' + element.settings.preload + '"';
					if (element.settings.poster) {
						attributes = attributes + ' poster="' + element.settings.poster + '"';
					}
					if (element.settings.autoplay) {
						attributes = attributes + ' autoplay="autoplay"';
					}
					if (element.settings.loop) {
						attributes = attributes + ' loop="loop"';
					}
					$(element).html('<video '+attributes+'>' + compiledSource + '</video>');
					/*
					 * Append the control box either to the supplied element or the video background element.	
					 *
					 */
					element.controlbox = $('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"></div>');
					if (element.settings.controlPosition) {
						$(element.settings.controlPosition).append(element.controlbox);
					}
					else {
						$(element).append(element.controlbox);
					}
					/*
					 *	HTML string for the video controls.
					 *
					 */
					element.controls = $('<ul class="ui-video-background-controls"><li class="ui-video-background-play">'
						+ '<a class="ui-icon ui-icon-pause" href="#">'+element.settings.controlText[1]+'</a>'
						+ '</li><li class="ui-video-background-mute">'
						+ '<a class="ui-icon ui-icon-volume-on" href="#">'+element.settings.controlText[2]+'</a>'
						+ '</li></ul>');		
					/*
					 *	
					 *
					 */
					
					if (element.settings.preloadHtml || element.settings.preloadCallback) {
						preload(element);
						$('video', element).bind('canplaythrough', function() {
							/*
							 * Chrome doesn't currently using the autoplay attribute.
							 * Autoplay initiated through JavaScript.
							 *
							 */
							if (element.settings.autoplay) {		
									$('video', element).get(0).play();
							}
							loaded(element);
						});
					}
					else {
						$('video', element).bind('canplaythrough', function() {
							/*
							 * Chrome doesn't currently using the autoplay attribute.
							 * Autoplay initiated through JavaScript.
							 *
							 */
							if (element.settings.autoplay) {		
									$('video', element).get(0).play();
							}
							loaded(element);
						});
					}
		  	});
			}
			else {
				return this.each(function () {
					var element = $(this);
					element.settings = $.extend({}, $.fn.videobackground.defaults, options);
					if (element.settings.poster) {
						var image = $('<img src="'+ element.settings.poster +'">');
						element.append(image);
					}
				});
			}
		},
		/*
		 *
		 */
		play: function (options) {
		  return this.each(function () {
				var element = $(this);
				element.settings = $.extend({}, $.fn.videobackground.defaults, options);
				play(element);
		  });
		},
		/*
		 *
		 */
		mute: function (options) {
		  return this.each(function () {
				var element = $(this);
				element.settings = $.extend({}, $.fn.videobackground.defaults, options);
				mute(element);
		  });
		},
		/*
		 *
		 */
		destroy: function (options) {
		  return this.each(function () {
				var element = $(this);
				element.settings = $.extend({}, $.fn.videobackground.defaults, options);
				
				
		  });
		}
  };
	/*
	 *	
	 *
	 */
	function resize (element) {
		var documentHeight = $(document).height(),
			windowHeight = $(window).height();
		if (windowHeight >= documentHeight) {
			$(element).css('height', windowHeight);
		}
		else if (documentHeight > windowHeight) {
			$(element).css('height', documentHeight);
		}
	};
	/*
	 *	
	 *
	 */
	function preload (element) {
		$(controlbox).append(preloadHtml);
		if (preloadCallback) {
			(preloadCallback).call(element);
		}
	};
	/*
	 *	
	 *
	 */
	function loaded (element) {
		$(element.controlbox).html(element.controls);
		loadedEvents(element);
		if (element.settings.loadedCallback) {
			(element.settings.loadedCallback).call(element);
		}
	};
	/*
	 *	
	 *
	 */
	function loadedEvents (element) {
		/*
		 * Trigger the resize method based if the browser is resized.
		 *
		 */
		if (element.settings.resize) {
			$(window).resize(function () {
				resize(element);
			});
		}
		/*
		 *	Play/pause control	
		 *
		 */
		$('.ui-video-background-play a', element.controls).click(function(event) {
			event.preventDefault();
			play(element);
		});
		/*
		 *	Mute/unmute control	
		 *
		 */
		$('.ui-video-background-mute a', element.controls).click(function(event) {
			event.preventDefault();
			mute(element);
		});
		/*
		 * Firefox doesn't currently use the loop attribute.
		 * Loop bound to the video ended event.
		 *
		 */	
		if (element.settings.loop) {		
			$('video', element).bind('ended', function(){ 
				$('video', element).get(0).play();
				$(this).toggleClass('paused');
				$(this).text(element.settings.controlText[1]);
			});
		}
	};
	/*
	 *	
	 *
	 */
	function play (element) {
		if ($('video', element).get(0).paused) {
			$('video', element).get(0).play();
			$('.ui-video-background-play a', element.controls).toggleClass('ui-icon-pause ui-icon-play');
			$('.ui-video-background-play a', element.controls).text(element.settings.controlText[1]);
		} 
		else {
			if ($('video', element).get(0).ended) {
				$('video', element).get(0).play();
				$('.ui-video-background-play a', element.controls).toggleClass('ui-icon-pause ui-icon-play');
				$('.ui-video-background-play a', element.controls).text(element.settings.controlText[1]);
			}
			else {
				$('video', element).get(0).pause();
				$('.ui-video-background-play a', element.controls).toggleClass('ui-icon-pause ui-icon-play');
				$('.ui-video-background-play a', element.controls).text(element.settings.controlText[0]);
			}
		}
	};
	/*
	 *	
	 *
	 */
	function mute (element) {
		if ($('video', element).get(0).volume === 0) {
			$('video', element).attr('muted', false);
			$('video', element).get(0).volume = 1;
			$('.ui-video-background-mute a', element.controls).toggleClass('ui-icon-volume-on ui-icon-volume-off');
			$('.ui-video-background-mute a', element.controls).text(element.settings.controlText[2]);
		} 
		else {
			$('video', element).attr('muted', true);
			$('video', element).get(0).volume = 0;
			$('.ui-video-background-mute a', element.controls).toggleClass('ui-icon-volume-on ui-icon-volume-off');
			$('.ui-video-background-mute a', element.controls).text(element.settings.controlText[3]);
		}
	};
	/*
	 *	
	 *
	 */
	$.fn.videobackground = function (method) {
		/*
		 *	Allow for method calling.
		 *	If not a method initialise the plugin.
		 *
		 */
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } 
		else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } 
		else {
      $.error('Method ' +  method + ' does not exist on jQuery.videobackground');
    }
	};
	/*
	 *	Default options, can be extend by options passed to the function.
	 *
	 */
	$.fn.videobackground.defaults = {
		videoSource: [],
		poster: null,
		autoplay: true,
		preload: 'none',
		loop: false,
		controlPosition: null,
		controlText: ['Play', 'Pause', 'Mute', 'Unmute'],
		resize: true,
		preloadHtml: '',
		preloadCallback: null,
		loadedCallback: null
	};
})(jQuery);