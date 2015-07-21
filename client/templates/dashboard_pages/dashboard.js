Template.dashboard.created = function() {

};

Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    if (!Meteor.user().userSeenReferralBox) {
        bootbox.dialog({
            title: "Invite a Friend",
            message: "<div class='row'>" +
                    "<div class='col-sm-12'>" + 
                    "<p>Get $5 off the exclusive XboxDash Launch T-Shirt when you invite 2 Xbox&reg; Live friends!</p>" +
                    "<p>Proceeds from this shirt campaign will help fund the hosting and maintenance needed to run this website.</p>" +
                    "</div>" +
                    "</div>" + 
                    "<div class='row'>" +
                    "<div class='col-sm-12 referral-form'>" + 
                    "<form id='referrals' method='post' class='form' role='form'>" + 
                    "<div class='row'>" + 
                        "<div class='col-xs-12 col-md-12 form-group'>" +
                            "<input id='email-one' name='email1' type='email' placeholder='Email 1' class='form-control input-xlarge'>" +
                        "</div>" + 
                        "<div class='col-xs-12 col-md-12 form-group'>" +
                            "<input id='email-two' name='email2' type='email' placeholder='Email 2' class='form-control input-xlarge'>" +
                        "</div>" +  
                    "</div>" + 
                    "</form>" +
                    "</div>" +
                    "</div>" + 
                    "<div class='row'>" +
                    "<div class='col-sm-12'>" + 
                    "<div id='share-it'></div>" +
                    "</div>" +
                    "</div>",
            buttons: {
                success: {
                    label: "Send Invites",
                    className: "btn-success",
                    callback: function () {
                        var email1 = $('#email-one').val();
                        var email2 = $('#email-two').val();
                        var user = Meteor.user();
                        var subject = user.username + " has invited you to XboxDash";
                        var inviteLink = "Link here";
                        var text = "Greetings,<br /><br />" +
                        "You've been invited by " + user.username + " to join XboxDash, a new platform to help manage your achievements, your games, and become a top Xbox gamer.<br /><br />" + 
                        "By inviting you, " + user.username + " gets $5 off the exclusive XboxDash launch T-shirt! You can get $5 off as well when you sign up and invite 2 friends from Xbox Live!<br /><br />" +
                        "Click here to get started<br />" + 
                        inviteLink +
                        "<br /><br />Cheers,<br />" +
                        "Keith and Tyler<br />" +
                        "Co-Founders";
                        Meteor.call(
                            'referralEmail',
                            email1,
                            email2,
                            subject,
                            text,
                            function (error, result) {
                                if (error) {
                                    toastr.success("There was a problem sending your invites. Please correct the emails and make sure they're in the right format.", "Error");
                                } else {
                                    toastr.success("Invites sent! We'll send you your promotional code to get $5 off!", "Thank You");
                                }
                            }
                        );
                    }
                }
            },
            onEscape: function() {
                bootbox.hideAll();
                Meteor.call('userHasSeenReferralBox', function(error, result) {
                    if (error) {
                        console.log("there was an error with the box setting: " + error);
                    }
                });
            },
            backdrop: true
        });
        Blaze.render(Template.referralShareButtons,$("#share-it")[0]);
    }
}

Template.dashboard.events({
});






Template.dashboardApp.helpers({
    achievementsCompleted: function () {
        var achievementsCount = userAchievements.find({ progressState: true }).count();
        return numberFormatter(achievementsCount);
    },
    totalAchievements: function () {
        var totalAchievements = userAchievements.find({}).count();
        return numberFormatter(totalAchievements);
    },
    achievementsPercentage: function () {
        var achievementsCount = userAchievements.find({ progressState: true }).count();
        var totalAchievements = userAchievements.find({}).count();
        var achievementsPercentage = Math.round(achievementsCount / totalAchievements * 100);
        return numberFormatter(achievementsPercentage);
    },
    gamesCompleted: function () {
        var gameCount = 0;
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        userGamesFind.forEach(function(g) {
            var gameId = g.gameId;
            var currentGamerscore = g.currentGamerscore;
            var getGame = xbdGames.findOne({ _id: gameId });
            if (typeof getGame !== 'undefined') {
                var maxGamerscore = getGame.maxGamerscore;
            }
            //console.log(maxGamerscore);
            if ( currentGamerscore === maxGamerscore ) gameCount += 1;
        });
        return numberFormatter(gameCount);
    },
    totalGames: function () {
        var totalGames = userGames.find({}).count();
        return numberFormatter(totalGames);
    },
    gamesPercentage: function () {
        var gameCount = 0;
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        userGamesFind.forEach(function(g) {
            var gameId = g.gameId;
            var currentGamerscore = g.currentGamerscore;
            var getGame = xbdGames.findOne({ _id: gameId });
            if (typeof getGame !== 'undefined') {
                var maxGamerscore = getGame.maxGamerscore;
            }
            if ( currentGamerscore === maxGamerscore ) gameCount += 1;
        });
        var totalGames = userGames.find({}).count();
        var gamesPercentage = Math.round(gameCount / totalGames * 100);
        return numberFormatter(gamesPercentage);
    },
    currentGamerscore: function () {
        var user = Meteor.user();
        return numberFormatter(user.profile.gamercard.gamerscore);
    },
    maxGamerscore: function () {
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        var maxGamerscore = 0;
        userGamesFind.forEach(function(userGame) {
            var gameId = userGame.gameId;
            var getGame = xbdGames.findOne({ _id: gameId });
            maxGamerscore += getGame.maxGamerscore;
        });
        return numberFormatter(maxGamerscore);
    },
    gamerscorePercentage: function () {
        var user = Meteor.user();
        var currentGamerscore = user.profile.gamercard.gamerscore;
        var userGamesFind = userGames.find({ userId: user._id });
        var maxGamerscore = 0;
        userGamesFind.forEach(function(userGame) {
            var gameId = userGame.gameId;
            var getGame = xbdGames.findOne({ _id: gameId });
            maxGamerscore += getGame.maxGamerscore;
        });
        var gamerscorePercentage = Math.round(currentGamerscore / maxGamerscore * 100);
        return numberFormatter(gamerscorePercentage);
    },
    gamesList: function () {
        var user = Meteor.user();
        return userGames.find({ userId: user._id, currentGamerscore: { $gt: 1 }}, { sort: { lastUnlock: -1 }, limit: 10 });
    },
    gamesListImage: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt') {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt') {
                    image =  art.Url;
                }
            });
        }
        return image;
    },
    gameName: function (userGameId) {
        var game = xbdGames.findOne({ _id: userGameId });
        return game.name;
    },
    percentageComplete: function (gameId, earnedAchievements) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return Math.round(earnedAchievements / achievementCount * 100);
    },
    remainingAchievements: function (gameId) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return achievementCount - this.earnedAchievements;
    },
    debugger: function () {
        console.log(this);
    }
});

Tracker.autorun(function() {
});