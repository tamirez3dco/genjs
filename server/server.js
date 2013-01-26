Meteor.publish("programs", function () {
  return Programs.find(
    {$or: [{"public": true}, {invited: this.userId}, {owner: this.userId}]});
});
