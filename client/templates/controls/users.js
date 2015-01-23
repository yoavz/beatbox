Template.users.helpers({
  users: function () {
    return UserConnections.find().fetch();
  },

  totalUsers: function () {
    var count = UserConnections.find().count();
    return count + " collaborator" + (count > 1 ? "s" : "");
  },
});

Template.user.helpers({

  userIcon: function () {
    if (this.userId) { 
      var user = Meteor.users.findOne(this.userId);
      if (user && user.services && user.services.twitter) {
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
      if (user && user.services && user.services.twitter) {
        var twitterName = user.services.twitter.screenName;
        if (twitterName)
          return twitterName
      }
    }
    
    return null;
  },

  userIsOwner: function () {
    var track = Template.parentData(2);
    return track.owner === this.userId;
  }

});

function twitterDataReady() {
  return Session.get("twitterDataReady") === true ;
}
