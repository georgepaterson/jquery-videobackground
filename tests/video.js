$(document).ready(function () {
	"use strict";
	module('methods');
	test('init', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).remove();
		ok(true, '.videobackground() called on element with video type');
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).remove();
		ok(true, '.videobackground() called on element without video type');
		$([]).videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).remove();
		ok(true, '.dialog() called on empty collection');
	});
	test('play', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).videobackground('play').remove();
		ok(true, '.dialog(\'play\') called on element');
	});
	test('mute', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).videobackground('mute').remove();
		ok(true, '.dialog(\'mute\') called on element');
	});
	test('resize', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).videobackground('resize').remove();
		ok(true, '.dialog(\'resize\') called on element');
	});
	test('destroy', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4', 'video/mp4'],
				['../video/big-buck-bunny.webm', 'video/webm'],
				['../video/big-buck-bunny.ogv', 'video/ogg']]
		}).videobackground('destroy').remove();
		ok(true, '.dialog(\'destroy\') called on element');
	});
});