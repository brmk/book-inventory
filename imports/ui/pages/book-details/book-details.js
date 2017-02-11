import './book-details.html';

import { Template } from 'meteor/templating';
import { Books } from '/imports/api/books/books.js';


Template.Books_details.onCreated(function(){
	this.autorun(()=>{
		let bookId = FlowRouter.getParam('id');
		this.subscribe('books.details', bookId);
	});
});

Template.Books_details.helpers({
	book() {
		let bookId = FlowRouter.getParam('id');
		return Books.findOne(bookId);
	}
});

Template.Books_details.events({

});
