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
	 * The videobackground plugin will place a resizable HTML5 video in to a designated element.
	 * This may be used as a background for the document or a specific element.
	 *
	 */
	$.fn.videobackground = function (method) {
		/*
		 * Public methods.
		 *
		 */
		var methods = {
			/* 
			 * Initialise the plugin.
			 *
			 */
			init: function (options) {
				this.videobackground.settings = $.extend({}, this.videobackground.defaults, options);
				if (document.createElement('video').canPlayType) {
					return this.each(function() {
						element = $(this);
						members.create();
					});
				}
				else {
					if (this.videobackground.settings.poster) {
						var image = $('<img src="'+ this.videobackground.settings.poster +'">');
						$(this).append(image);
					}
				}
			},
			/*
			 * Destroy the plugin.
			 *
			 */
			destroy: function () {

			}
		}
		/*
		 * Private members.
		 *
		 */
		var members = {
			/*
			 *	Create the video and controls.
			 *
			 */
			create: function () {
				/*
				 *	If the resize option is set.
				 *	Set the height of the container to be the height of the document
				 *	The video can expand in to the space using min-height: 100%;
				 *
				 */
				if (element.videobackground.settings.resize) {
					members.resizeVideo();
				}
				/*
				 *	Complie the different HTML5 video attributes.	
				 *
				 */
				var compiledSource = '',
					i = 0,
					j = 0;
				for (i = 0,  j = element.videobackground.settings.videoSource.length; i < j; i++) {
					compiledSource = compiledSource + '<source src="' + element.videobackground.settings.videoSource[i] + '">';
				}
				var attributes = '';
				attributes = attributes + 'preload="' + element.videobackground.settings.preload + '"';
				if (element.videobackground.settings.poster) {
					attributes = attributes + ' poster="' + element.videobackground.settings.poster + '"';
				}
				if (element.videobackground.settings.autoplay) {
					attributes = attributes + ' autoplay="autoplay"';
				}
				if (element.videobackground.settings.loop) {
					attributes = attributes + ' loop="loop"';
				}
				$(element).html('<video '+attributes+'>' + compiledSource + '</video>');
				/*
				 * Append the control box either to the supplied element or the video background element.	
				 *
				 */
				controlbox = $('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"></div>');
				if (element.videobackground.settings.controlPosition) {
					$(element.videobackground.settings.controlPosition).append(controlbox);
				}
				else {
					$(element).append(controlbox);
				}
				/*
				 *	HTML string for the video controls.
				 *
				 */
				controls = $('<ul class="ui-video-background-controls"><li class="ui-video-background-play"><a class="ui-icon ui-icon-pause" href="#">'+element.videobackground.settings.controlText[1]+'</a></li><li class="ui-video-background-mute"><a class="ui-icon ui-icon-volume-on" href="#">'+element.videobackground.settings.controlText[2]+'</a></li></ul>');		
				/*
				 *	
				 *
				 */
				if (element.videobackground.settings.preloadHtml || element.videobackground.settings.preloadCallback) {
					members.preload();
					$('video', element).bind('canplaythrough', function() {
						/*
						 * Chrome doesn't currently using the autoplay attribute.
						 * Autoplay initiated through JavaScript.
						 *
						 */
						if (element.videobackground.settings.autoplay) {		
								$('video', element).get(0).play();
						}
						members.loaded();
					});
				}
				else {
					$('video', element).bind('canplaythrough', function() {
						/*
						 * Chrome doesn't currently using the autoplay attribute.
						 * Autoplay initiated through JavaScript.
						 *
						 */
						if (element.videobackground.settings.autoplay) {		
								$('video', element).get(0).play();
						}
						members.loaded();
					});
				}
			},
			/*
			 *	
			 *
			 */
			preload: function() {
				$(controlbox).append(element.videobackground.settings.preloadHtml);
				if (element.videobackground.settings.preloadCallback) {
					(element.videobackground.settings.preloadCallback).call(this);
				}
			},
			/*
			 *	
			 *
			 */
			loaded: function() {
				$(controlbox).html(controls);
				members.loadedEvents();
				if (element.videobackground.settings.loadedCallback) {
					(element.videobackground.settings.loadedCallback).call(this);
				}
			},
			/*
			 *	Will resize the video height based on either the highest window or document	height.
			 *
			 */
			resizeVideo: function() {
				var element = $(this);
				var documentHeight = $(document).height(),
				windowHeight = $(window).height();
				if (windowHeight >= documentHeight) {
					$(element).css('height', windowHeight);
				}
				else if (documentHeight > windowHeight) {
					$(element).css('height', documentHeight);
				}
			},
			/*
			 *	Video events.
			 *
			 */
			loadedEvents: function() {
				/*
				 * Will trigger the resize method based on the browser being resized.
				 *
				 */
				if (element.videobackground.settings.resize) {
					$(window).resize(function() {
						members.resizeVideo();
					});
				}
				/*
				 *	Play/pause control	
				 *
				 */
				$('.ui-video-background-play a', controls).click(function(event) {
					event.preventDefault();
					if ($('video', element).get(0).paused) {
						$('video', element).get(0).play();
						$(this).toggleClass('ui-icon-pause ui-icon-play');
						$(this).text(element.videobackground.settings.controlText[1]);
					} 
					else {
						if ($('video', element).get(0).ended) {
							$('video', element).get(0).play();
							$(this).toggleClass('ui-icon-pause ui-icon-play');
							$(this).text(element.videobackground.settings.controlText[1]);
						}
						else {
						$('video', element).get(0).pause();
						$(this).toggleClass('ui-icon-pause ui-icon-play');
						$(this).text(element.videobackground.settings.controlText[0]);
						}
					}
				});
				/*
				 *	Mute/unmute control	
				 *
				 */
				$('.ui-video-background-mute a', controls).click(function(event) {
					event.preventDefault();
					if ($('video', element).attr('muted')) {
						$('video', element).attr('muted', false);
						$('video', element).get(0).volume = 1;
						$(this).toggleClass('ui-icon-volume-on ui-icon-volume-off');
						$(this).text(element.videobackground.settings.controlText[2]);
					} 
					else {
						$('video', element).attr('muted', true);
						$('video', element).get(0).volume = 0;
						$(this).toggleClass('ui-icon-volume-on ui-icon-volume-off');
						$(this).text(element.videobackground.settings.controlText[3]);
					}
				});	
				/*
				 * Firefox doesn't currently use the loop attribute.
				 * Loop bound to the video ended event.
				 *
				 */	
				if (element.videobackground.settings.loop) {		
					$('video', element).bind('ended', function(){ 
						$('video', element).get(0).play();
						$(this).toggleClass('paused');
						$(this).text(element.videobackground.settings.controlText[1]);
					});
				}
			}
		}
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
			$.error('Method ' +  method + ' does not exist on jQuery.personalisation.');
		}
	};
	/*
	 *	Defaults combined with options form the plugin settings.
	 *
	 */
	$.fn.videobackground.settings = {};
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