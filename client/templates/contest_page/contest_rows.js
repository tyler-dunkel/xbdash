// Template.referralContestsRow.created = function() {
// 	this.autorun(function() {
// 		Meteor.subscribe('referralContestPub');
// 	});
// }

// Template.referralContestsRow.rendered = function() {
// 	$(".referral-contests").delay(250).fadeIn('slow', function() {
// 		setTimeout(function() {
// 			$(".referral-contests").slick({
// 				"arrows": true,
// 				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
// 				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
// 				"draggable": true,
// 				"focusOnSelect": true,
// 				"edgeFriction": 0.20,
// 				"infinite": false,
// 				"mobileFirst": true,
// 				"rows": 1,
// 				"slidesPerRow": 1,
// 				"slidesToShow": 1,
// 				"swipeToSlide": true,
// 				"responsive": [
// 				{
// 					breakpoint: 1024,
// 					settings: {
// 						"slidesPerRow": 2,
// 						"slidesToShow": 2
// 					}
// 				},
// 				{
// 					breakpoint: 768,
// 					settings: {
// 						"slidesPerRow": 1,
// 						"slidesToShow": 1
// 					}
// 				}
// 				]
// 			});
// 		}, 250);
// 	});
// }

// Template.referralContestsRow.helpers({
// 	contest: function () {
// 		return xbdContests.find({ 'status': 'active', 'type': 'referral' });
// 	}
// });

// Template.achievementCompletionContestsRow.created = function() {
// 	this.autorun(function() {
// 		Meteor.subscribe('curatedContestPub');
// 	});
// }

// Template.achievementCompletionContestsRow.rendered = function() {
// 	$(".curated-contests").fadeIn(750, function() {
// 		setTimeout(function() {
// 			$(".curated-contests").slick({
// 				"arrows": true,
// 				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
// 				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
// 				"draggable": true,
// 				"focusOnSelect": true,
// 				"edgeFriction": 0.20,
// 				"infinite": false,
// 				"mobileFirst": true,
// 				"rows": 1,
// 				"slidesPerRow": 4,
// 				"slidesToShow": 4,
// 				"swipeToSlide": true,
// 				"responsive": [
// 				{
// 					breakpoint: 1024,
// 					settings: {
// 						"slidesPerRow": 2,
// 						"slidesToShow": 2
// 					}
// 				},
// 				{
// 					breakpoint: 768,
// 					settings: {
// 						"slidesPerRow": 1,
// 						"slidesToShow": 1
// 					}
// 				}
// 				]
// 			});
// 		}, 50);
// 	});
// }

// Template.achievementCompletionContestsRow.helpers({
// 	contest: function () {
// 		return xbdContests.find({ 'status': 'active', 'type': 'completeAchievements' });
// 	}
// });

// Template.gameCompletionContestsRow.created = function() {
// 	this.autorun(function() {
// 		Meteor.subscribe('completionContestPub');
// 	});
// }

// Template.gameCompletionContestsRow.rendered = function() {
// 	$(".completion-contests").delay(750).fadeIn('slow', function() {
// 		setTimeout(function() {
// 			$(".completion-contests").slick({
// 				"arrows": true,
// 				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
// 				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
// 				"draggable": true,
// 				"focusOnSelect": true,
// 				"edgeFriction": 0.20,
// 				"infinite": false,
// 				"mobileFirst": true,
// 				"rows": 1,
// 				"slidesPerRow": 4,
// 				"slidesToShow": 4,
// 				"swipeToSlide": true,
// 				"responsive": [
// 				{
// 					breakpoint: 1024,
// 					settings: {
// 						"slidesPerRow": 2,
// 						"slidesToShow": 2
// 					}
// 				},
// 				{
// 					breakpoint: 768,
// 					settings: {
// 						"slidesPerRow": 1,
// 						"slidesToShow": 1
// 					}
// 				}
// 				]
// 			});
// 		}, 250);
// 	});
// }

// Template.gameCompletionContestsRow.helpers({
// 	contest: function () {
// 		return xbdContests.find({ 'status': 'active', 'type': 'completeGame' });
// 	}
// });

// Template.timeAttackContestsRow.created = function() {
// 	this.autorun(function() {
// 		Meteor.subscribe('timeAttackContestPub');
// 	});
// }

// Template.timeAttackContestsRow.rendered = function() {
// 	$(".time-attack-contests").delay(1000).fadeIn('slow', function() {
// 		setTimeout(function() {
// 			$(".time-attack-contests").slick({
// 				"arrows": true,
// 				"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
// 				"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
// 				"draggable": true,
// 				"focusOnSelect": true,
// 				"edgeFriction": 0.20,
// 				"infinite": false,
// 				"mobileFirst": true,
// 				"rows": 1,
// 				"slidesPerRow": 4,
// 				"slidesToShow": 4,
// 				"swipeToSlide": true,
// 				"responsive": [
// 				{
// 					breakpoint: 1024,
// 					settings: {
// 						"slidesPerRow": 2,
// 						"slidesToShow": 2
// 					}
// 				},
// 				{
// 					breakpoint: 768,
// 					settings: {
// 						"slidesPerRow": 1,
// 						"slidesToShow": 1
// 					}
// 				}
// 				]
// 			});
// 		}, 250);
// 	});
// }

// Template.timeAttackContestsRow.helpers({
// 	contest: function () {
// 		return xbdContests.find({ 'status': 'active', 'type': 'timeAttack' });
// 	}
// });

// Template.contestLoader.rendered = function() {
// 	$(".curated-contests").delay(1000).fadeIn('show');
// 	$('.contest-loaders').slick({
// 		"arrows": true,
// 		"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
// 		"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
// 		"draggable": true,
// 		"focusOnSelect": true,
// 		"edgeFriction": 0.20,
// 		"infinite": false,
// 		"mobileFirst": true,
// 		"rows": 1,
// 		"slidesPerRow": 4,
// 		"slidesToShow": 4,
// 		"swipeToSlide": true,
// 		"responsive": [
// 		{
// 			breakpoint: 1024,
// 			settings: {
// 				"slidesPerRow": 3,
// 				"slidesToShow": 3
// 			}
// 		},
// 		{
// 			breakpoint: 768,
// 			settings: {
// 				"slidesPerRow": 2,
// 				"slidesToShow": 2
// 			}
// 		}
// 		]
// 	});
// 	$('.contest-loaders').fadeOut('slow');
// }