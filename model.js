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
    return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, programs, fields, modifier) {
    return _.all(programs, function (program) {
      return true;
      if (userId !== program.owner)
        return false; // not the owner

      return true;
    });
  },
  remove: function (userId, programs) {
  	return true;
    return ! _.any(programs, function (program) {
     if (userId !== program.owner)
        return false; // not the owner

      return true;
    });
  }
});


Meteor.methods({
  createProgram: function (options) {
    options = options || {};
    return Programs.insert({
      owner: this.userId,
      title: options.title,
      description: options.description,
      public: !! options.public,
      invited: [],
      xml: options.xml
    });
  }
});
