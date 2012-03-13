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
	 * Public methods accessible through a string declaration equal to the method name.
	 *
	 */
	var methods = {
		/*
		 * Default initiating public method.
		 * It will created the video background, default video controls and initiate associated events. 
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
					 *	Compile the different HTML5 video attributes.	
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
					 * Test for HTML or JavaScript function that should be triggered while the video is attempting to load.
					 * The canplaythrough event signals when when the video can play through to the end without disruption.
					 * We use this to determine when the video is ready to play.
					 * When this happens preloaded HTML and JavaSCript should be replaced with loaded HTML and JavaSCript.
					 *
					 */
					if (element.settings.preloadHtml || element.settings.preloadCallback) {
						preload(element);
						element.find('video').bind('canplaythrough', function() {
							/*
							 * Chrome doesn't currently using the autoplay attribute.
							 * Autoplay initiated through JavaScript.
							 *
							 */
							if (element.settings.autoplay) {		
									element.find('video').get(0).play();
							}
							loaded(element);
						});
					}
					else {
						element.find('video').bind('canplaythrough', function() {
							/*
							 * Chrome doesn't currently using the autoplay attribute.
							 * Autoplay initiated through JavaScript.
							 *
							 */
							if (element.settings.autoplay) {		
									element.find('video').get(0).play();
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
						var image = $('<img class="ui-video-background-poster" src="'+ element.settings.poster +'">');
						element.append(image);
					}
				});
			}
		},
		/*
		 * Play public method.
		 * When attached to a video background it will trigger the associated video to play or pause.
		 * The event it triggeres is dependant on the existing state of the video.
		 * This method can be triggered from an event on a external element.
		 * If the element has a unique controlPosition this will have to be declared.
		 * Requires the video to be loaded first.
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
		 * Mute public method.
		 * When attached to a video background it will trigger the associated video to mute or unmute.
		 * The event it triggeres is dependant on the existing state of the video.
		 * This method can be triggered from an event on a external element.
		 * If the element has a unique controlPosition this will have to be declared.
		 * Requires the video to be loaded first.
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
		 * Resize public method.
		 * When invoked will resize the video background to the height of the document or window.
		 * The video background height affects the height of the document.
		 * Affecting the video background's ability to negatively resize.  
		 *
		 */
		resize: function (options) {
		  return this.each(function () {
				var element = $(this);
				element.settings = $.extend({}, $.fn.videobackground.defaults, options);
				resize(element);
		  });
		},
		/*
		 * Destroy public method.
		 * Will unbind event listeners and remove HTML created by the plugin.
		 * If the element has a unique controlPosition this will have to be declared.
		 *
		 */
		destroy: function (options) {
		  return this.each(function () {
				var element = $(this);
				element.settings = $.extend({}, $.fn.videobackground.defaults, options);
				if (document.createElement('video').canPlayType) {	
					element.find('video').unbind('ended');
					if (element.settings.controlPosition) {
						$(element.settings.controlPosition).find('.ui-video-background-mute a').unbind('click');
						$(element.settings.controlPosition).find('.ui-video-background-play a').unbind('click');
					}
					else {
						element.find('.ui-video-background-mute a').unbind('click');
						element.find('.ui-video-background-play a').unbind('click');
					}
					$(window).unbind('resize');
					element.find('video').unbind('canplaythrough');
					if (element.settings.controlPosition) {
						$(element.settings.controlPosition).find('.ui-video-background').remove();
					}
					else {
						element.find('.ui-video-background').remove();
					}
					$('video', element).remove();
				}
				else {
					if (element.settings.poster) {
						element.find('.ui-video-background-poster').remove();
					}
				}
			});
		}
	};
	/*
	 * Resize function.
	 * Triggered if the boolean setting 'resize' is true.
	 * It will resize the video background based on a resize event initiated on the browser window.
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
	}
	/*
	 * Preload function.
	 * Allows for HTML and JavaScript designated in settings to be used while	the video is preloading.
	 *
	 */
	function preload (element) {
		$(element.controlbox).append(preloadHtml);
		if (preloadCallback) {
			(preloadCallback).call(element);
		}
	}
	/*
	 * Loaded function.
	 * Allows for HTML and JavaScript designated in settings to be used when the video is loaded.
	 *
	 */
	function loaded (element) {
		$(element.controlbox).html(element.controls);
		loadedEvents(element);
		if (element.settings.loadedCallback) {
			(element.settings.loadedCallback).call(element);
		}
	}
	/*
	 * Loaded events function.
	 * When the video is loaded we have some default HTML and JavaScript to trigger.	
	 *
	 */
	function loadedEvents (element) {
		/*
		 * Trigger the resize method based if the browser is resized.
		 *
		 */
		if (element.settings.resize) {
			$(window).bind('resize', function () {
				resize(element);
			});
		}
		/*
		 *	Default play/pause control	
		 *
		 */
		element.controls.find('.ui-video-background-play a').bind('click', function(event) {
			event.preventDefault();
			play(element);
		});
		/*
		 *	Default mute/unmute control	
		 *
		 */
		element.controls.find('.ui-video-background-mute a').bind('click', function(event) {
			event.preventDefault();
			mute(element);
		});
		/*
		 * Firefox doesn't currently use the loop attribute.
		 * Loop bound to the video ended event.
		 *
		 */	
		if (element.settings.loop) {		
			element.find('video').bind('ended', function(){ 
				$(this).get(0).play();
				$(this).toggleClass('paused').text(element.settings.controlText[1]);
			});
		}
	}
	/*
	 * Play function.
	 * Can either be called through the default control interface or directly through the public method.
	 * Will set the video to play or pause depending on existing state.
	 * Requires the video to be loaded.	
	 *
	 */
	function play (element) {
		var video = element.find('video').get(0),
			controller;
		if (element.settings.controlPosition) {
			controller = $(element.settings.controlPosition).find('.ui-video-background-play a');
		}
		else {
			controller = element.find('.ui-video-background-play a');
		}
		if (video.paused) {
			video.play();
			controller.toggleClass('ui-icon-pause ui-icon-play').text(element.settings.controlText[1]);
		} 
		else {
			if (video.ended) {
				video.play();
				controller.toggleClass('ui-icon-pause ui-icon-play').text(element.settings.controlText[1]);
			}
			else {
				video.pause();
				controller.toggleClass('ui-icon-pause ui-icon-play').text(element.settings.controlText[0]);
			}
		}
	}
	/*
	 * Mute function.
	 * Can either be called through the default control interface or directly through the public method.
	 * Will set the video to mute or unmute depending on existing state.
	 * Requires the video to be loaded.
	 *
	 */
	function mute (element) {
		var video = element.find('video').get(0),
			controller;
		if (element.settings.controlPosition) {
			controller = $(element.settings.controlPosition).find('.ui-video-background-mute a');
		}
		else {
			controller = element.find('.ui-video-background-mute a');
		}
		if (video.volume === 0) {
			video.volume = 1;
			controller.toggleClass('ui-icon-volume-on ui-icon-volume-off').text(element.settings.controlText[2]);
		} 
		else {
			video.volume = 0;
			controller.toggleClass('ui-icon-volume-on ui-icon-volume-off').text(element.settings.controlText[3]);
		}
	}
	/*
	 * The video background namespace.
	 * The gate way for the plugin.	
	 *
	 */
	$.fn.videobackground = function (method) {
		/*
		 *	Allow for method calling.
		 *	If not a method initialise the plugin.
		 *
		 */
		if (!this.length) {
			return this;
		}
	    if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
	    } else {
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