// 
//  mousetracker.js
//  Main Mousetracker Object
//  
//  Created by Jason Howmans on 2010-09-11.
// 

var mouseTracker = {
	
	/*
	 * Global Proberties
	 */
	xLocation		: 0,
	yLocation		: 0,
	clickState	: false,
	recording		: false,
	playing			: false,
	movementStorage	: 0,
	frameId			: 1,
	playbackFrame	: 1,
	frameRate		: 50,
	scrollPosition	: $(window).scrollTop(),
	devMode : true,
		
		
	/*
	 * Initiator Method
	 */
	init: function() {
		
		// - Initiate Methods
		mouseTracker.mousePosition();
		mouseTracker.mouseRecord();
		mouseTracker.mousePlay();
		
		// - Add Storage Element for use with jQuery's core data api
		$("body").append('<div id="mouseTrackerStorage"></div>')
		mouseTracker.movementStorage = $('#mouseTrackerStorage');
		
		// Dev Helper
		mouseTracker.devMode ? mouseTracker.devHelper() : false;
		
		// - The Loop
		var periodical = window.setInterval( function() {
			// Animation / constant actions
			mouseTracker.mouseRecord();
			mouseTracker.mousePlay();
			(mouseTracker.devMode && mouseTracker.recording) ? console.log(mouseTracker.i) : false;
		}, mouseTracker.frameRate);
		
	},
	
	
	/*
	 * Get Mouse Position Method	
	 */
	mousePosition: function() {
		$(document).mousemove( function(e) {
			mouseTracker.xLocation = e.pageX;
			mouseTracker.yLocation = e.pageY;
		});
		
	},
	
	
	/*
	 * Mouse Recording Method
	 */
	mouseRecord: function() {
		if (mouseTracker.recording) {
			
			// - Recording Actions
			
			// Clicks
			$(window).mousedown( function() {
				mouseTracker.clickState = true;
			}).mouseup( function() {
				mouseTracker.clickState = false;
			});
			
			// Movement
			mouseTracker.movementStorage.data('Frame'+mouseTracker.frameId,{
				'x': 					mouseTracker.xLocation,
				'y': 					mouseTracker.yLocation,
				'mouseDown': 	mouseTracker.clickState,
				'scroll':			mouseTracker.scrollPosition
			});
			
			// Update Scroll position
			mouseTracker.scrollPosition = $(window).scrollTop();
			
			// Log
			mouseTracker.i = 'Frame: '+mouseTracker.frameId+', X: '+mouseTracker.xLocation+', Y: '+mouseTracker.yLocation+', '+mouseTracker.clickState+', Scroll Position: '+mouseTracker.scrollPosition;
		
			// Increase Frame Count (Last)
			mouseTracker.frameId ++;
		}
	},
	
	
	/*
	 * Playback Method
	 */
	mousePlay: function() {
		if (mouseTracker.playing) {
			var currentX;
			var currentY;
			var mouseDown;
			var scrollLocation;
			
			// - Handle Frame Limits
			if (mouseTracker.frameId <= mouseTracker.playbackFrame) {
				mouseTracker.playing = false;
				mouseTracker.playbackFrame = 1;
			}
			
			// - Create and move cursor
			$('#cursor').fadeIn(200);
			
			// Store data for current frame
			currentX 			 	= (mouseTracker.movementStorage.data('Frame'+mouseTracker.playbackFrame).x)-10;
			currentY 			 	= (mouseTracker.movementStorage.data('Frame'+mouseTracker.playbackFrame).y)-10;
			clickState		 	= mouseTracker.movementStorage.data('Frame'+mouseTracker.playbackFrame).mouseDown;
			scrollLocation	= mouseTracker.movementStorage.data('Frame'+mouseTracker.playbackFrame).scroll;
			
			// Move the cursor
			$('#cursor').css({
				top: currentY+'px',
				left: currentX+'px'
			});
			
			// Click event
			clickState ? $('#cursor').addClass('click') : $('#cursor').removeClass('click')
			
			// Scroll
			$(window).scrollTop(scrollLocation);
			
			// Increase Frame Count (Last)
			mouseTracker.playbackFrame ++;
		}else{
			// Playback 'Stopped' Actions
			$('#cursor').hide();
		}
	},
	
	
	/*
	 * Dev Method
	 */
	devHelper: function() {
		mouseTracker.i = '';	
	},
	
};