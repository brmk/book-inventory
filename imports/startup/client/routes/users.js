//user-related routes
//Add here routes like sign-in, sign-up, forgot password, etc...

import {
    FlowRouter
} from 'meteor/kadira:flow-router';
import {
    BlazeLayout
} from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/body/body.js';


const usersRoutes = FlowRouter.group({
    name: 'users',
    triggersEnter: [function(context, redirect) {
        // console.log('running group triggers');
    }]
});

usersRoutes.route('/logout', {
    name : 'logout',
    action: function() {
        Meteor.logout();
        FlowRouter.go('home');
    },
});