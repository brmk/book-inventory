//books-related routes
//Add here routes like sign-in, sign-up, forgot password, etc...

import {
    FlowRouter
} from 'meteor/kadira:flow-router';
import {
    BlazeLayout
} from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/book-details/book-details.js';
import '/imports/ui/pages/books-list/books-list.js';


const booksRoutes = FlowRouter.group({
    name: 'books',
    triggersEnter: [function(context, redirect) {
        // console.log('running group triggers');
    }]
});

booksRoutes.route('/books', {
    name : 'books.list',
    action: function() {
        BlazeLayout.render('App_body', { main: 'Books_list' });
    },
});

booksRoutes.route('/books/:id', {
    name : 'books.details',
    action: function() {
        BlazeLayout.render('App_body', { main: 'Books_details' });
    },
});