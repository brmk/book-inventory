import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/not-found/not-found.js';
import '/imports/ui/pages/home/home.js';

FlowRouter.notFound = {
  	action() {
    	BlazeLayout.render('App_body', { main: 'notFound' });
  	}
};

FlowRouter.route('/', {
    name: 'home',
    action() {
    	BlazeLayout.render('App_body', { main: 'home' });
    },
});

