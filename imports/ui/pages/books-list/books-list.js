import './books-list.html';
import '/imports/ui/components/books/books-list-item/books-list-item.js';

import { Template } from 'meteor/templating';
import { Books } from '/imports/api/books/books.js';

const DEFAULT_BOOKS_LIMIT = 10,
	  BOOKS_INCREMENT_STEP = 10;

Template.Books_list.onCreated(function(){
	this.limit = new ReactiveVar(DEFAULT_BOOKS_LIMIT);
	this.autorun(()=>{
		const limit = this.limit.get();

		this.subscribe('books.ownedByUser', {}, {limit});
	});
});

Template.Books_list.helpers({
	books() {
		console.log(Books.find().fetch())
		return Books.find({}).fetch();
	}
});

Template.Books_list.events({
	'click [action=load-more-books]'(event,instance) {
		instance.limit.set(instance.limit.get() + BOOKS_INCREMENT_STEP);
	}
});
