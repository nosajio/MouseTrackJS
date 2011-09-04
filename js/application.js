// 
//  application.js
//  Main Applicaion Document
//  
//  Created by Jason Howmans on 2010-09-11.
//  jasonhowmans.com
// 

$(document).ready( function() {
	
	
	// Build the interface to interact with the Class
	// - Stylesheet
	$('head').prepend('<link rel="stylesheet" href="css/screen.css" type="text/css" media="screen" />');

	// - Add Elements
	$("body").append('<div id="mouseTrackerUI"><ul id="mouseTrackerUIControlls"><li class="mouseTrackerRecord"><a href="javascript:;">Rec</a></li><li class="mouseTrackerStop"><a href="javascript:;">Stop</a></li><li class="mouseTrackerPlay"><a href="javascript:;">Play</a></li><li class="mouseTrackerHide"><a href="javascript:;">Hide</a></li></ul></div>');
	$('body').prepend('<span id="cursor"></span>');

	// - Element Interactivity
	$('#mouseTrackerUI').hide();
	$('#mouseTrackerUI').fadeIn(200);

	// Hide Controlls
	$('.mouseTrackerHide').click( function() {
		$('#mouseTrackerUI').fadeOut(100);
	});

	// Record Click
	$('.mouseTrackerRecord a').click( function() {
		if (mouseTracker.recording) {
			mouseTracker.recording = false;
		}else{
			mouseTracker.recording = true;
			mouseTracker.playing = false;
		}
	});

	// Play Click
	$('.mouseTrackerPlay a').click( function() {
		if (mouseTracker.playing == false) {
			mouseTracker.playing = true;
			mouseTracker.recording = false;
		}
	});

	// Stop Click
	$('.mouseTrackerStop a').click( function() {
		mouseTracker.recording = false;
		mouseTracker.playing = false;
		console.log(mouseTracker.movementStorage.data());
	});
	
	mouseTracker.init();
	
});