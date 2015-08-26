Template.dashboard.created = function() {
};

Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    if (!Meteor.user().userSeenReferralBox) {
        inviteDialog();
    }
    function inviteDialog() {
        bootbox.dialog({
            title: "Invite a Friend",
            message: "<div class='row'>" +
                    "<div class='col-sm-12'>" + 
                    "<img src='/img/xbox-card-contest.png' class='text-center' />" + 
                    "<p>Get $5 off the exclusive XBdash Launch T-Shirt when you invite 2 Xbox&reg; Live friends!</p>" +
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
                        var subject = user.username + " has invited you to XBdash";
                        var inviteLink = "Link here";
                        var text = "Greetings,<br /><br />" +
                        "You've been invited by " + user.username + " to join XBdash, a new platform to help manage your achievements, your games, and become a top Xbox&reg; gamer.<br /><br />" + 
                        "By inviting you, " + user.username + " gets $5 off the exclusive XBdash launch T-shirt! You can get $5 off as well when you sign up and invite 2 friends from Xbox&reg; Live!<br /><br />" +
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
};

Template.dashboardApp.helpers({
});