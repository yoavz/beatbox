Router.configure({
  layoutTemplate: 'layout',
  // waitOn: function () {
  //   return [Meteor.subscribe("allTracks"), Meteor.subscribe("allBeats")]
  // }
});

Router.route('/', {
  name: 'beatbox',
  data: function () {
    return Tracks.find()
  }
});
