//tracker dependency for total achievements count
var totalAchievementDependency = new Tracker.Dependency;

Template.recentActivityColumn.created = function() {
    this.subscribe('dashboardRecentActivity');
}

Template.recentActivityColumn.helpers({
    gamesList: function () {
        var userId = Meteor.userId();
        var gameList = userGames.find({ userId: userId }, { sort: { lastUnlock: -1 }, limit: 10 });
        return gameList;
    }
});

Template.recentActivityLine.created = function() {
    //this.subscribe('dashboardRecentActivityAchievements');
    var self = this;
    console.log(this.data);
    Meteor.call('getGameAchievementCount', this.data.gameId, function(error, result) {
        if (error) {
            console.log(error);
            self.data.totalAchievements = 100;
            return;
        }
        self.data.totalAchievements = result;
        totalAchievementDependency.changed();
    });
}

Template.recentActivityLine.rendered = function() {
    $('li.activity-line .games-thumb .game-image').error(function() {
        $(this).attr('src', '/img/game-default.jpg');
    });
}

Template.recentActivityLine.helpers({
    xbdGame: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        return {
            game: game,
            gameDetails: gameDetail
        };
    },
    gamesListImage: function () {
        var xbdGame = this.game;
        var gameDetail = this.gameDetails;
        var image = "/img/game-default.jpg";
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
    percentageComplete: function () {
        totalAchievementDependency.depend();
        var parentData = Template.parentData(1);
        if (parentData && parentData.totalAchievements) {
            return Math.round(parentData.earnedAchievements / parentData.totalAchievements * 100);
        }
        //return 50;
    },
    remainingAchievements: function () {
        totalAchievementDependency.depend();
        var parentData = Template.parentData(1);
        if (parentData && parentData.totalAchievements) {
            return parentData.totalAchievements - parentData.earnedAchievements;
        }
        //return 100;
    }
});

/*,
    remainingAchievements: function (gameId) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return achievementCount - this.earnedAchievements;
    }
    */