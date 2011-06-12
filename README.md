# [jQuery Video Background plugin](http://www.georgepaterson.com)

Example of the jQuery Video Background plugin. Will place a resizable video in to the background of the page or designated element. Browsers that don't support the HTML5 video element will get an image if a poster image was provided.

If the containing element's width and height does not match the aspect ration of the video, the video will not stretch to fill the container but will render based on the largest dimension.

Plugin parameters include:

*	videoSource: An array of possible video source URL's. Separate video source attributes with be generated per instance. No default.
*	poster: The URL string of the image used for the video poster attribute. No default.
*	autoplay: Video autoplay attribute boolean. Default is true.
*	preload: Video prelod attribute string. Default is none.
*	loop: Video loop attribute boolean. Default is false.
*	controlPosition: Position of the video controls, will append the controls to choose DOM element. Default is null.  If null will append controls to the element the video background has been applied to.
*	controlText: An array of text options for the video control elements.
*	resize: Boolean which will trigger the video background to resize to match the browser height. Set to false is video background is used on another element. Default is true.
*	preloadHtml: If required, a user controlled HTML string can be injected in to the control area of the page while the video is preloading. It will be over written by the video controls when the video is ready to play.
*	preloadCallback: Allows a function to be triggered when the video preload is initiated.
*	loadedCallback: Allows a function to be triggered when the video is loaded.

Video trailer from [http://www.bigbuckbunny.org/](http://www.bigbuckbunny.org/). An open source [http://www.blender.org/](Blender) <a href="http://www.blender.org/">Blender</a> project.

---
	
Please use the [GitHub issue tracker](http://github.com/georgepaterson/jquery-videobackground/issues) for bug reports and feature requests.