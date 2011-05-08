/*!
 * jQuery Video Background plugin
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
		loop: false,
		controls: '#main',
		play: 'Play', 
		pause: 'Pause', 
		mute: 'Mute', 
		unmute: 'Unmute',
		preloader: true,
		preloadText: '<p>Loading video</p><ul><li><a href="#">Skip video</a></li></ul>',
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
			console.log($(document).height()+' '+ $(window).height())
			
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
			var source = '';
			if (settings.webm) {
				source = source + '<source src="'+settings.webm+'">'
			}
			if (settings.ogv) {
				source = source + '<source src="'+settings.ogv+'">'
			}
			if (settings.mp4) {
				source = source + '<source src="'+settings.mp4+'">'
			}
			var attributes = '';
			attributes = attributes + 'preload="'+settings.preload+'"'
			if (settings.poster) {
				attributes = attributes + ' poster="'+settings.poster+'"'
			}
			if (settings.autoplay) {
				attributes = attributes + ' autoplay="autoplay"'
			}
			if (settings.loop) {
				attributes = attributes + ' loop="loop"'
			}
			$(self).html('<video '+attributes+'>'+source+'</video>');
			/*
			 *	
			 *
			 */
			controls = $('<ul class="controls"><li><a class="play" href="#">'+settings.pause+'</a></li><li><a class="mute" href="#">'+settings.mute+'</a></li></ul>');		
			/*
			 *	
			 *
			 */
			if (settings.preloader) {
				$.fn.videobackground.methods.preload();
				$('video', self).bind('canplaythrough', function() {
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
			preloading = $(settings.preloadText);
			$(controlbox).append(preloading);
		},
		/*
		 *	
		 *
		 */
		loaded: function() {
			if (settings.controls) {
				$(controlbox).html(controls);
			}
			else {
				$(controlbox).html(controls);
			}
			$.fn.videobackground.methods.events();
			if(settings.loadedCallback) {
				(settings.loadedCallback).call(this);
			}
		},
		/*
		 *	Video events.
		 *
		 */
		events: function() {
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
					$(this).text(settings.pause);
		    } 
				else {
					if ($('video', self).get(0).ended) {
						$('video', self).get(0).play();
						$(this).toggleClass('paused');
						$(this).text(settings.pause);
					}
					else {
			      $('video', self).get(0).pause();
						$(this).toggleClass('paused');
						$(this).text(settings.play);
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
					$(this).text(settings.mute);
		    } 
				else {
		      $('video', self).attr('muted', true);
					$('video', self).get(0).volume = 0;
					$(this).toggleClass('muted');
					$(this).text(settings.unmute);
		    }
			});	
		},
		/*
		 *	
		 *
		 */
		destroy: function() {
			
			
		}
	};
})( jQuery );
