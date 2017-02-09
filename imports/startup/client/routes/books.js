//books-related routes
//Add here routes like sign-in, sign-up, forgot password, etc...

import {
    FlowRouter
} from 'meteor/kadira:flow-router';
import {
    BlazeLayout
} from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/body/body.js';


const booksRoutes = FlowRouter.group({
    name: 'books',
    triggersEnter: [function(context, redirect) {
        // console.log('running group triggers');
    }]
});

booksRoutes.route('/books', {
    name : 'books.list',
    action: function() {
        // BlazeLayout.render('App_body', { main: 'home' });
    },
});

booksRoutes.route('/books/:id', {
    name : 'books.detail',
    action: function() {
        // BlazeLayout.render('App_body', { main: 'home' });
    },
});