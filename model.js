///////////////////////////////////////////////////////////////////////////////
// Users

var displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};


///////////////////////////////////////////////////////////////////////////////
// Programs

Programs = new Meteor.Collection("programs");

Programs.allow({
  insert: function (userId, program) {
    return true; 
  },
  update: function (userId, programs, fields, modifier) {
  	return true;
  },
  remove: function (userId, programs) {
  	return true;
  }
});

Meteor.methods({
  createProgram: function (options) {
    options = options || {};
    return Programs.insert({
      name: options.name,
      xml: options.xml
    });
  }
});
