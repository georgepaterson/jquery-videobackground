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
		webm: '',
		ogv: '',
		mp4: '',
		poster: null,
		autoplay: true,
		preload: 'none',
		loop: true,
		controls: null,
		controlsText: ['Play', 'Pause', 'Mute', 'Unmute'],
		preloader: true,
		preloadHtml: '<p>Loading video</p><ul><li><a href="#">Skip video</a></li></ul>',
		loadedCallback: null
	};
	$.fn.videobackground.methods = {
		/*
		 *	Create the video and controls.
		 *
		 */	
		create: function() {
			/*
			 *	Set the height of the container to be the height of the document
			 *	The video can expand in to the space using min-height: 100;
			 *
			 */
			var documentHeight = $(document).height();
			$(self).css('height', documentHeight);
			/*
			 *	
			 *
			 */
			var source = '';
			if (settings.webm) {
				source = source + '<source src="'+settings.webm+'">';
			}
			if (settings.ogv) {
				source = source + '<source src="'+settings.ogv+'">';
			}
			if (settings.mp4) {
				source = source + '<source src="'+settings.mp4+'">';
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
			$(self).html('<video '+attributes+'>'+source+'</video>');
			/*
			 *	
			 *
			 */
			controlbox = $('<div id="video-background-controls"></div>');
			if (settings.controls) {
				$(settings.controls).append(controlbox);
			}
			else {
				$(self).append(controlbox);
			}
			/*
			 *	
			 *
			 */
			controls = $('<ul class="controls"><li><a class="play" href="#">'+settings.controlsText[1]+'</a></li><li><a class="mute" href="#">'+settings.controlsText[2]+'</a></li></ul>');		
			/*
			 *	
			 *
			 */
			if (settings.preloader) {
				$.fn.videobackground.methods.preload();
				$('video', self).bind('canplaythrough', function() {
					/*
					 * Chrome doesn't currently using the autoplay attribute.
					 * Autoplay initiated through JavaScript.
					 *
					 */
					if (settings.autoplay) {		
							$('video', self).get(0).play();
							$(this).toggleClass('paused');
							$(this).text(settings.controlsText[1]);
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
			$(controlbox).append(settings.preloadHTML);
		},
		/*
		 *	
		 *
		 */
		loaded: function() {
			$(controlbox).html(controls);
			$.fn.videobackground.methods.loadedEvents();
			if(settings.loadedCallback) {
				(settings.loadedCallback).call(this);
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
			$(window).resize(function() {
				var documentHeight = $(document).height();
				var windowHeight = $(window).height();
				if (windowHeight >= documentHeight) {
					$(self).css('height', windowHeight);
				}
			});
			/*
			 *	
			 *
			 */
			$('.play', controls).click(function(event) {
				event.preventDefault();
				if ($('video', self).get(0).paused) {
		    	$('video', self).get(0).play();
					$(this).toggleClass('paused');
					$(this).text(settings.controlsText[1]);
		    } 
				else {
					if ($('video', self).get(0).ended) {
						$('video', self).get(0).play();
						$(this).toggleClass('paused');
						$(this).text(settings.controlsText[1]);
					}
					else {
			      $('video', self).get(0).pause();
						$(this).toggleClass('paused');
						$(this).text(settings.controlsText[0]);
					}
		    }
			});
			/*
			 *	
			 *
			 */
			$('.mute', controls).click(function(event) {
				event.preventDefault();
				if ($('video', self).attr('muted')) {
		    	$('video', self).attr('muted', false);
					$('video', self).get(0).volume = 1;
					$(this).toggleClass('muted');
					$(this).text(settings.controlsText[2]);
		    } 
				else {
		      $('video', self).attr('muted', true);
					$('video', self).get(0).volume = 0;
					$(this).toggleClass('muted');
					$(this).text(settings.controlsText[3]);
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
					$(this).text(settings.controlsText[1]);
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
