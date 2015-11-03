//reactive var that gets set by meteor method 'getGameAchievementCount'. 
//This allows us to get our total achievement count server side while still being reactive on achievements earned
var totalAchievementDependency = new ReactiveVar();

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
    totalAchievementDependency.set(100);
    //console.log(this.data);
    Meteor.call('getGameAchievementCount', self.data.gameId, function(error, result) {
        if (error) {
            console.log(error);
            totalAchievementDependency.set(100);
            return;
        }
        totalAchievementDependency.set(result);
    });
}

Template.recentActivityLine.rendered = function() {
    $('li.activity-line .games-thumb .game-image').error(function() {
        $(this).attr('src', '/img/game-default.jpg');
    });
    console.log("does this run?");
    // var self = this;
    // Meteor.call('getGameAchievementCount', this.data.gameId, function(error, result) {
    //     if (error) {
    //         console.log(error);
    //         self.data.totalAchievements = 100;
    //         return;
    //     }
    //     self.data.totalAchievements = result;
    //     totalAchievementDependency.changed();
    // });
}

Template.recentActivityLine.helpers({
    xbdGame: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var totalAchievements = this.totalAchievements;
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
         var parentData = Template.parentData(1);
         var totalAchievements = totalAchievementDependency.get();
        if (parentData && totalAchievements) {
            return Math.round(parentData.earnedAchievements / totalAchievements * 100);
        }
        // if (this.totalAchievements) {
        //     return Math.round(parentData.earnedAchievements / this.totalAchievements * 100);
        // }
        //return 50;
    },
    remainingAchievements: function () {
        var parentData = Template.parentData(1);
        var totalAchievements = totalAchievementDependency.get();
        if (parentData && totalAchievements) {
            return totalAchievements - parentData.earnedAchievements;
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