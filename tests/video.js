$(document).ready( function () {
	module("methods");
	test('init', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'], 
				['../video/big-buck-bunny.ogv', 'video/ogg']], 
		}).remove();
		ok(true, '.videobackground() initiated on element with video type');
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4'],
				['../video/big-buck-bunny.webm'], 
				['../video/big-buck-bunny.ogv']], 
		}).remove();
		ok(true, '.videobackground() initiated on element without video type');
	})
	test('play', function () {

	})
	test('mute', function () {

	})
	test('resize', function () {

	})
	test('destroy', function () {

	})
})