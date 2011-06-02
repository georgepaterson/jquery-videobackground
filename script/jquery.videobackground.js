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
	 *
	 */
	$.fn.videobackground = function(options) {
		/*
		 * Merge defaults and options in to settings.
		 * If no options uses defaults.
		 *
		 */
		if (options) {
			settings = $.extend({}, $.fn.videobackground.defaults, options);
		}
		else {
			settings = $.fn.videobackground.defaults;
		}
		if (document.createElement('video').canPlayType) {
			return this.each(function() {
				self = $(this);
				$.fn.videobackground.methods.create();
			});
		}
		else {
			if (settings.poster) {
				var image = $('<img src="'+settings.poster+'">');
				$(self).append(image);
			}
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
		preloadHtml: '',
		resize: true,
		preloadCallback: function() {},
		loadedCallback: function() {}
	};
	$.fn.videobackground.methods = {
		/*
		 *	Create the video and controls.
		 *
		 */	
		create: function() {
			/*
			 *	If the resize option is set.
			 *	Set the height of the container to be the height of the document
			 *	The video can expand in to the space using min-height: 100%;
			 *
			 */
			if (settings.resize) {
				$.fn.videobackground.methods.resizeVideo();
			}
			/*
			 *	
			 *
			 */
			var compiledSource = '',
				i = 0,
				j = 0;
			for (i = 0,  j = settings.videoSource.length; i < j; i++) {
				compiledSource = compiledSource + '<source src="' + settings.videoSource[i] + '">';
			}
			var attributes = '';
			attributes = attributes + 'preload="'+settings.preload+'"';
			if (settings.poster) {
				attributes = attributes + ' poster="'+settings.poster+'"';
			}
			if (settings.autoplay) {
				attributes = attributes + ' autoplay="autoplay"';
			}
			if (settings.loop) {
				attributes = attributes + ' loop="loop"';
			}
			$(self).html('<video '+attributes+'>' + compiledSource + '</video>');
			/*
			 *	
			 *
			 */
			controlbox = $('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"></div>');
			if (settings.controlPosition) {
				$(settings.controlPosition).append(controlbox);
			}
			else {
				$(self).append(controlbox);
			}
			/*
			 *	
			 *
			 */
			controls = $('<ul class="ui-video-background-controls"><li class="ui-video-background-play"><a class="ui-icon ui-icon-pause" href="#">'+settings.controlText[1]+'</a></li><li class="ui-video-background-mute"><a class="ui-icon ui-icon-volume-on" href="#">'+settings.controlText[2]+'</a></li></ul>');		
			/*
			 *	
			 *
			 */
			if (settings.preloadHtml) {
				$.fn.videobackground.methods.preload();
				$('video', self).bind('canplaythrough', function() {
					/*
					 * Chrome doesn't currently using the autoplay attribute.
					 * Autoplay initiated through JavaScript.
					 *
					 */
					if (settings.autoplay) {		
							$('video', self).get(0).play();
							$('.play', controls).toggleClass('paused');
							$('.play', controls).text(settings.controlText[1]);
					}
					$.fn.videobackground.methods.loaded();
				});
			}
			else {
				$.fn.videobackground.methods.loaded();
			}
		},
		/*
		 *	
		 *
		 */
		preload: function() {
			$(controlbox).append(settings.preloadHtml);
			if (settings.preloadCallback) {
				(settings.preloadCallback).call(this);
			}
		},
		/*
		 *	
		 *
		 */
		loaded: function() {
			$(controlbox).html(controls);
			$.fn.videobackground.methods.loadedEvents();
			if (settings.loadedCallback) {
				(settings.loadedCallback).call(this);
			}
		},
		/*
		 *	
		 *
		 */
		resizeVideo: function() {
			/*
			 *
			 *
			 */
			var documentHeight = $(document).height();
			var windowHeight = $(window).height();
			if (windowHeight >= documentHeight) {
				$(self).css('height', windowHeight);
			}
			else if (documentHeight > windowHeight) {
				$(self).css('height', documentHeight);
			}
		},
		/*
		 *	Video events.
		 *
		 */
		loadedEvents: function() {
			/*
			 * 
			 *
			 */
			if (settings.resize) {
				$(window).resize(function() {
					$.fn.videobackground.methods.resizeVideo();
				});
			}
			/*
			 *	
			 *
			 */
			$('.ui-video-background-play a', controls).click(function(event) {
				event.preventDefault();
				if ($('video', self).get(0).paused) {
					$('video', self).get(0).play();
					$(this).toggleClass('ui-icon-pause ui-icon-play');
					$(this).text(settings.controlText[1]);
				} 
				else {
					if ($('video', self).get(0).ended) {
						$('video', self).get(0).play();
						$(this).toggleClass('ui-icon-pause ui-icon-play');
						$(this).text(settings.controlText[1]);
					}
					else {
					$('video', self).get(0).pause();
					$(this).toggleClass('ui-icon-pause ui-icon-play');
					$(this).text(settings.controlText[0]);
					}
				}
			});
			/*
			 *	
			 *
			 */
			$('.ui-video-background-mute a', controls).click(function(event) {
				event.preventDefault();
				if ($('video', self).attr('muted')) {
					$('video', self).attr('muted', false);
					$('video', self).get(0).volume = 1;
					$(this).toggleClass('ui-icon-volume-on ui-icon-volume-off');
					$(this).text(settings.controlText[2]);
				} 
				else {
					$('video', self).attr('muted', true);
					$('video', self).get(0).volume = 0;
					$(this).toggleClass('ui-icon-volume-on ui-icon-volume-off');
					$(this).text(settings.controlText[3]);
				}
			});	
			/*
			 * Firefox doesn't currently use the loop attribute.
			 * Loop bound to the video ended event.
			 *
			 */	
			if (settings.loop) {		
				$('video', self).bind('ended', function(){ 
					$('video', self).get(0).play();
					$(this).toggleClass('paused');
					$(this).text(settings.controlText[1]);
				});
			}
		},
		/*
		 *	
		 *
		 */
		destroy: function() {
			
			
		}
	};
})( jQuery );
