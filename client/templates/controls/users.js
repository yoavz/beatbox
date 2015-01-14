Template.users.helpers({
  users: function () {
    return UserConnections.find().fetch();
  },
});

Template.user.helpers({

  loggingIn: function () {
    return Meteor.loggingIn();
  },

  userIcon: function () {
    if (this.userId) { 
      var user = Meteor.users.findOne(this.userId);
      if (user.services.twitter) {
        var twitterPic = user.services.twitter.profile_image_url_https;
        if (twitterPic)
          return '<img src="' + twitterPic + '">';
      } 
    }

    return '<i class="fa fa-music"></i>';
  },

  userName: function () {
    if (this.userId) {
      var user = Meteor.users.findOne(this.userId);
      var name = user.profile.name;
      if (name)
        return name; 
    }

    return 'Anonymous';
  },

  userTwitterName: function () {
    if (this.userId) {
      var user = Meteor.users.findOne(this.userId);
      if (user.services.twitter) {
        var twitterName = user.services.twitter.screenName;
        if (twitterName)
          return twitterName
      }
    }
    
    return null;
  }

});
