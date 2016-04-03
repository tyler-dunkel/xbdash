Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
};

Template.dashboard.helpers({
    chkBuilding: function() {
        var user = Meteor.user();
        if (user.gamertagScanned.status === 'building') return true;
    }
});