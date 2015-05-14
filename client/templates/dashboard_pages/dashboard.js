Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}

Template.dashboard.events({
    'click #logout': function(event) {
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            } else {
            	Router.go('home');
				return;
            }
        })
    },
    'click [ui-toggle]': function(event) {
        event.preventDefault();
        var $this = $(event.target);
        $this.attr('ui-toggle') || ($this = $this.closest('[ui-toggle]'));
        
        $this.toggleClass('active'); // toggles active class on dedent/indent
        
        var $target = $($this.attr('target')) || $this;
        $target.toggleClass($this.attr('ui-toggle'));
    },
    'click [ui-nav] a': function(event) {
        var $this = $(event.target), $active;
        $this.is('a') || ($this = $this.closest('a'));
        
        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
        
        ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
        $this.parent().toggleClass('active');
        
        $this.next().is('ul') && event.preventDefault();
    }
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
    gamesList: function () {
        var user = Meteor.user();
        return userGames.find({ userId: user._id, currentGamerscore: { $gt: 1 }}, { sort: { lastUnlock: -1 }, limit: 10 });
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