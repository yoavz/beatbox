Template.login.helpers({
});

Template.login.events({
  "click #login": function (e) {
    Meteor.loginWithTwitter({
      //twitter options here?
    }, function (error) {
      if (error)
        console.log(error);
    });
  },

  "click #logout": function (e) {
    Meteor.logout(function (error) {
      if (error)
        console.log(error);
    });
  }



});
