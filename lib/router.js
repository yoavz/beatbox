Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', { name: 'home' });

Router.route('/room/:_id', {
  name: 'room',
  waitOn: function () {
    return Meteor.subscribe('Room', this.params._id);
  },
  data: function () {
    return Rooms.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound', { only: 'room' });
