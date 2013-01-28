Meteor.startup(function() {
	// code to run on server at startup
});

Meteor.publish("programs", function () {
  return allPrograms();
});

Meteor.publish("program-names", function () {
  return programNames();
});
