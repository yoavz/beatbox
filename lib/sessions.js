// See session_manager for how this collection is used
// UserSessions = new Meteor.Collection("sessions");

if (Meteor.isClient) {
  UserConnections = new Meteor.Collection("user_status_sessions");
}
