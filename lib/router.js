Router.configure({
  layoutTemplate: 'layout',
  waitOn: function () {
    return Meteor.subscribe("Rooms");
  }
});

Router.route('/', {
  name: 'home',
});

Router.route('/room/:_id', {
  name: 'room',
  waitOn: function () {
    return Meteor.subscribe('Tracks', this.params._id);
  },
  data: function () {
    return Rooms.findOne(this.params._id)
  }
});
