import './book-details.html';

import { Template } from 'meteor/templating';
import { Books } from '/imports/api/books/books.js';

const DEFAULT_STATE = 'view';

Template.Books_details.onCreated(function(){
	this.autorun(()=>{
		let bookId = FlowRouter.getParam('id');
		this.subscribe('books.details', bookId);
	});

	this.state = new ReactiveVar(Template.currentData().state || DEFAULT_STATE);
});

Template.Books_details.helpers({
	book() {
		let bookId = FlowRouter.getParam('id');
		return Books.findOne(bookId);
	},
	formatDate(date) {
		let m = new moment(date);
		return m.format('MMM D, YYYY');
	},
	state(state) {
		return Template.instance().state.get() === state;
	}
});

Template.Books_details.events({
	'submit #book-form'(event, instance){
		event.preventDefault();
	},

	'click [action="set-state"]'(event, instance) {
		event.preventDefault();
		let state = event.currentTarget.dataset['state'];
		instance.state.set(state);
	},

	'click [action="remove-book"]'(event, instance) {
		event.preventDefault()
		BootstrapModalPrompt.prompt({
		    title: "Confirm action",
		    content: "Do you really want to remove the book?"
		}, (result) => {
		  if (result) {
		    // User confirmed it, so go do something.
		    Meteor.call('books.remove', (error) => {
		    	if(error){
		    		toastr.error(error.reason);
		    		console.log(error);
		    		return;
		    	}
		    	toastr.success('Book was successfully removed');
		    	FlowRouter.go('home');
		    });
		  }
		  else {
		    // User did not confirm, do nothing.
		  }
		});
	},


});
