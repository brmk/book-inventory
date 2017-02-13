import './books-list.html';
import '/imports/ui/components/books/books-list-item/books-list-item.js';

import { Template } from 'meteor/templating';
import { Books } from '/imports/api/books/books.js';

const DEFAULT_BOOKS_LIMIT = 10,
	  BOOKS_INCREMENT_STEP = 10;

Template.Books_list.onCreated(function(){
	this.limit = new ReactiveVar(DEFAULT_BOOKS_LIMIT);
	this.autorun(()=>{
		const limit = this.limit.get() + 1;
		let scrollTop = $('body').scrollTop();

		this.subscribe('books.ownedByUser', {}, {limit});
		Tracker.afterFlush(()=>{
			Meteor.setTimeout(()=>{
				$('body').scrollTop(scrollTop);
			}, 300)
		});
	});
});

Template.Books_list.helpers({
	books() {
		const limit = Template.instance().limit.get();		
		// console.log(Books.find().fetch())
		return Books.find({}, {limit}).fetch();
	},
	hasMore() {
		const limit = Template.instance().limit.get();
		return Books.find().count() !== Books.find({},{limit}).count();
	}
});

Template.Books_list.events({
	'click [action=load-more]'(event,instance) {
		instance.limit.set(instance.limit.get() + BOOKS_INCREMENT_STEP);
	}
});
