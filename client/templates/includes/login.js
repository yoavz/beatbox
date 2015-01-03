Template.login.helpers({
   
});

Template.login.events({
  "click a": function (e) {
    // console.log(Accounts);
    Meteor.loginWithTwitter({
        
    }, function (error) {
      console.log(error);
    });
  }
});
