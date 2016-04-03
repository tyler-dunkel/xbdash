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
    var self = this;
    self.totalAchievements = new ReactiveVar(100);
    Meteor.call('getGameAchievementCount', self.data.gameId, function(error, result) {
        if (error) {
            self.totalAchievements.set(100);
            return;
        }
        self.totalAchievements.set(result);
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
                    image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt') {
                    image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
                }
            });
        }
        return image;
    },
    percentageComplete: function () {
        var parentData = Template.parentData(1);
        var achievementsCount = Template.instance().totalAchievements.get();
        if (parentData && achievementsCount) {
            return Math.round(parentData.earnedAchievements / achievementsCount * 100);
        }
    },
    remainingAchievements: function () {
        var parentData = Template.parentData(1);
        var achievementsCount = Template.instance().totalAchievements.get();
        if (parentData && achievementsCount) {
            return achievementsCount - parentData.earnedAchievements;
        }
    }
});