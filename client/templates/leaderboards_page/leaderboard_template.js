Template.leaderboardTemplate.created = function() {
    switch(this.data.boardType) {
        case 'dailyRank':
            this.subscribe('dailyRanks');
            break;
        case 'completedAchievements':
            this.subscribe('completedAchievements');
            break;
        case 'completedGames':
            this.subscribe('completedGames');
            break;
        default:
            this.subscribe('overallRanks');
            return;
    }
}

Template.leaderboardTemplate.helpers({
    boardTitle: function() {
        var boardType = Template.instance().data.boardType;
        switch(boardType) {
            case 'dailyRank':
                return 'Top Gamerscore Today';
                break;
            case 'completedAchievements':
                return 'Completed Achievements';
                break;
            case 'completedGames':
                return 'Completed Games';
                break;
            default:
                return 'Top All-Time Gamerscore';
        }
    },
    rank: function() {
        var boardType = Template.instance().data.boardType;
        switch(boardType) {
            case 'dailyRank':
                return userLeaderboards.find({
                    'dailyRank.value': { $gt: 1 }
                }, {
                    sort: { 'dailyRank.rank': 1 },
                    limit: 100
                });
                break;
            case 'completedAchievements':
                return userLeaderboards.find({
                    'completedAchievements.count': { $gt: 1 }
                }, {
                    sort: { 'completedAchievements.rank': 1 },
                    limit: 100
                });
                break;
            case 'completedGames':
                return userLeaderboards.find({
                    'completedGames.count': { $gt: 1 }
                }, {
                    sort: { 'completedGames.rank': 1 },
                    limit: 100
                });
                break;
            default:
                return userLeaderboards.find({ overallRank: {$gt: 0 } }, {
                    sort: { overallRank: 1 },
                    limit: 50
                });
        }
    },
    getUserRank: function() {
        var boardType = Template.parentData(1).boardType;
        console.log('user rank log ' + boardType);
        switch(boardType) {
            case 'dailyRank':
                return this.dailyRank.rank;
                break;
            case 'completedAchievements':
                return this.completedAchievements.rank;
                break;
            case 'completedGames':
                return this.completedGames.rank;
                break;
            default:
                return this.overallRank;
        }
    },
    getUserRankValue: function() {
        var user = Meteor.users.findOne({ _id: this.userId });
        var boardType = Template.parentData(1).boardType;
        console.log('rank value log ' + boardType);
        switch(boardType) {
            case 'dailyRank':
                return this.dailyRank.value;
                break;
            case 'completedAchievements':
                return this.completedAchievements.count;
                break;
            case 'completedGames':
                return this.completedGames.count;
                break;
            default:
                return user.gamercard.gamerscore;
        }
    },
    getUser: function() {
        var user = Meteor.users.findOne({ _id: this.userId });
        return user.gamercard.gamertag;
    },
    getUserImage: function() {
        var user = Meteor.users.findOne({ _id: this.userId });
        var defaultGamerImage = '/img/gamerpic-default.jpg';
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        return defaultGamerImage;
    }
});

Template.currentUserLeaderboard.created = function() {
    this.subscribe('currentUserLeaderboard');
}

Template.currentUserLeaderboard.helpers({
    getCurrentUser: function() {
        var user = Meteor.user();
        return user.gamercard.gamertag;
    },
    getCurrentUserImage: function() {
        var user = Meteor.user();
        return "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
    },
    getCurrentUserLBRank: function() {
        var user = Meteor.user();
        var boardType = Template.instance().data.boardType;
        var userLb = userLeaderboards.findOne({ userId: user._id });
        switch(boardType) {
            case 'dailyRank':
                return userLb.dailyRank.rank;
                break;
            case 'completedAchievements': 
                return userLb.completedAchievements.rank;
                break;
            case 'completedGames':
                return userLb.completedGames.rank;
                break;
            default:
                return userLb.overallRank;
        }
    },
    getCurrentUserLBCount: function() {
        var user = Meteor.user();
        var boardType = Template.instance().data.boardType;
        var userLb = userLeaderboards.findOne({ userId: user._id });
        switch(boardType) {
            case 'dailyRank':
                return userLb.dailyRank.value;
                break;
            case 'completedAchievements': 
                return userLb.completedAchievements.count;
                break;
            case 'completedGames':
                return userLb.completedGames.count;
                break;
            default:
                return user.gamercard.gamerscore;
        }
        
    }
});