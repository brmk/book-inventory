// All users-related publications

import { Meteor } from 'meteor/meteor';

Meteor.publish('users.all', function () {
    return Meteor.users.find();
});
