//tracker dependency for total achievements count
var totalAchievementDependency = new Tracker.Dependency;

Template.recentActivityColumn.created = function() {
    this.subscribe('dashboardRecentActivity');
}

Template.recentActivityColumn.helpers({
    gamesList: function () {
        var userId = Meteor.userId();
        var game = userGames.find({ userId: userId, currentGamerscore: { $gt: 1 }}, { sort: { lastUnlock: -1 }, limit: 10 });
        return game;
    }
});

Template.recentActivityLine.created = function() {
    this.subscribe('dashboardRecentActivityAchievements');
    var self = this;
    Meteor.call('getGameAchievementCount', this.data.gameId, function(error, result) {
        if (error) {
            console.log(error);
            self.data.totalAchievements = 100;
        }
        totalAchievementDependency.changed();
        self.data.totalAchievements = result;
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
    },
    remainingAchievements: function () {
        totalAchievementDependency.depend();
        var parentData = Template.parentData(1);
        if (parentData && parentData.totalAchievements) {
            return parentData.totalAchievements - parentData.earnedAchievements;
        }
    }
});

/*,
    remainingAchievements: function (gameId) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return achievementCount - this.earnedAchievements;
    }
    */