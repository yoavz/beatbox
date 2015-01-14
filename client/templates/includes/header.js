Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.header.helpers({
  headerColor: function () {
    var color = getHexColor(Session.get('homeColor'), 30);
    if (color)
      return 'color: ' + color + ';';
    else 
      return 'color: lightgrey;';
  }
});
