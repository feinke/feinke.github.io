var Preload = (function(){
	var tl = new TimelineMax({ repeat: -1 });

	return {
		init: function(){
			Preload.stop();
			Events.create();
			theFAnim.init();
		},
		play : function(){
			tl.add(TweenMax.staggerFrom($("#loading span"), 1, { autoAlpha: "0.2", ease: Sine.easeIn }, 0.2));
			tl.add(TweenMax.staggerTo($("#loading span"), 1, { autoAlpha: "0.2", ease: Sine.easeIn }, 0.2), "-=0.2");
		},
		stop: function(){
			tl.stop();
			TweenMax.staggerTo($("#loading span"), 0.5, { autoAlpha: "0", ease: Sine.easeIn }, 0.2);
		}
	}
})();

var Utils = (function(){
	
	return {
		getRandom: function(arr){
			return arr[Math.floor(Math.random() * arr.length)]
		}
	}
})();

var Overlay = (function() {
	var exitTransitionList = [
		{ top: '100%', ease: Expo.easeOut },
		{ top: '-100%', ease: Expo.easeOut },
		{ left: '-100%', ease: Expo.easeOut },
		{ left: '100%', ease: Expo.easeOut }
	];

	var prevTransition = { top:"-100%", left: "0%"};

	return {
		open: function(overlayID) {
			TweenMax.fromTo($(overlayID), 1, prevTransition, { top: "0%", left:"0%", ease: Expo.easeIn});
		},
		close: function (overlayID){
			var tweenObj = Utils.getRandom(exitTransitionList);
			prevTransition = tweenObj;
			TweenMax.to($(overlayID), 1, tweenObj);
		}
	}
})();

var Events = (function() {
	var $about = $('#theF-wrapper');
	var $footerA = $('#footer a');
	
	return {
		create: function() {
			$about.on('click', function(){
				Overlay.open('#about-overlay');
			});

			$footerA.on('click', function(){
				Overlay.open('#about-overlay');
			});

			$('.back-btn').on('click', function(e){
				e.preventDefault();
				Overlay.close($(this).attr('href'));
			});

			$('.arrows.next').on('click', function(e){
				TweenMax.to('.current', 1, { left: '-100%', ease: Sine.easeIn });
			});
		}
	}
})();

var theFAnim = (function(){
	var timeline;
	return {
		init: function() {
			timeline = new TimelineMax({ onComplete: Label.update, onCompleteParams: ['about', '#about-overlay']});
			timeline.add(
				TweenMax.fromTo('#theF-wrapper', 1, { scale: '2', autoAlpha: 0 }, { scale: '1', autoAlpha: 1, ease: Sine.easeIn })
			);
			timeline.add(TweenMax.from('.theF-vert', 1, { bottom: '-100%', ease: Sine.easeIn }), '-=1');
			timeline.add(TweenMax.from('.theF-hori.mid', 1, { width: '0%', ease: Sine.easeIn }), '-=0.6');
			timeline.add(TweenMax.from('.theF-hori.top', 1, { width: '0%', ease: Sine.easeIn }), '-=0.8');
		},
		timeline: timeline
	}
})();


var Label = (function(){
	var $text = $('#footer .text');
	return {
		update: function(label, href){
			$text.html(label);
			$text.attr('href', href);
			TweenMax.to($text, 1, { autoAlpha: 1});
		}
	}
})();


(function($, TweenMax){
	Preload.play();
	$(window).on('load', Preload.init);
})(jQuery, TweenMax);