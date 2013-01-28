Meteor.startup(function() {
	// code to run on server at startup
});

Meteor.publish("programs", function () {
  return Programs.find();
});
