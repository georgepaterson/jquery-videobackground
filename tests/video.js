$(document).ready(function () {
	"use strict";
	module('methods');
	var videoFiles = [['../video/big-buck-bunny.mp4', 'video/mp4'],
		['../video/big-buck-bunny.webm', 'video/webm'],
		['../video/big-buck-bunny.ogv', 'video/ogg']];
	test('init', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: ['../video/big-buck-bunny.mp4',
				'../video/big-buck-bunny.webm',
				'../video/big-buck-bunny.ogv']
		}).remove();
		ok(true, '.videobackground() called on element as an array of strings');
		$('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles
		}).remove();
		ok(true, '.videobackground() called on element as an array of arrays with video type');
		$('<div></div>').appendTo('body').videobackground({
			videoSource: [['../video/big-buck-bunny.mp4'],
				['../video/big-buck-bunny.webm'],
				['../video/big-buck-bunny.ogv']]
		}).remove();
		ok(true, '.videobackground() called on element as an array of arrays without video type');
		$([]).appendTo('body').videobackground({
			videoSource: ['../video/big-buck-bunny.mp4',
				'../video/big-buck-bunny.webm',
				'../video/big-buck-bunny.ogv']
		}).remove();
		ok(true, '.videobackground() as an array of strings called on empty collection');
		$([]).videobackground({
			videoSource: videoFiles
		}).remove();
		ok(true, '.videobackground() as an array of arrays called on empty collection');
	});
	test('play', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles
		}).videobackground('play').remove();
		ok(true, '.videobackground(\'play\') called on element');
	});
	test('mute', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles
		}).videobackground('mute').remove();
		ok(true, '.videobackground(\'mute\') called on element');
	});
	test('resize', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles
		}).videobackground('resize').remove();
		ok(true, '.videobackground(\'resize\') called on element');
	});
	test('destroy', function () {
		$('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles
		}).videobackground('destroy').remove();
		ok(true, '.videobackground(\'destroy\') called on element');
	});
	module('callbacks');
	test('preloadCallback', function () {
		var preload = $('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles,
			preloadCallback: function() {
				$(this).addClass('test');
			},
		});
		ok(preload.hasClass('test'), 'preload callback called on element');
		preload.remove();
	});
	test('loadedCallback', function () {
		var loaded = $('<div></div>').appendTo('body').videobackground({
			videoSource: videoFiles,
			loadedCallback: function() {
				$(this).addClass('test');
			},
		});
		ok(loaded.find('video').on('canplaythrough', function () {loaded.hasClass('test')}), 'loaded callback called on element');
		loaded.remove();
	});
});