Template.completedAchievementsRanks.created = function() {
  this.subscribe('completedAchievements');
}

Template.completedAchievementsRanks.helpers({
  completedAchievementsLB: function() {
    return userLeaderboards.find({
      'completedAchievements.count': { $gt: 1 }
    }, {
      sort: { 'completedAchievements.rank': 1 },
      limit: 100
    });
  },
  getUser: function() {
    var user = Meteor.users.findOne({ _id: this.userId });
    return user.profile.gamercard.gamertag;
  },
  getUserImage: function() {
    var user = Meteor.users.findOne({ _id: this.userId });
    if (user.profile.gamercard.gamerpicLargeSslImagePath) {
      return user.profile.gamercard.gamerpicLargeSslImagePath;
    }
    return '/img/gamerpic-default.jpg';
  }
});