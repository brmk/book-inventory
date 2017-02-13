// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Books } from '../books.js';
//TODO: ADD CHECKERS
Meteor.methods({
    'books.insert' (formData) {
    	if(!Meteor.userId()){
    		throw new Meteor.Error(500, 'You must be logged in');
    	}

    	const extraFields = {
    		createdBy : Meteor.userId(),
    		createdAt : new Date()
    	}

    	_.extend(formData, extraFields);

        return Books.insert(formData);
    },
    'books.remove' (bookId) {
    	const book = Books.findOne(bookId);

    	if(!book) {
    		throw new Meteor.Error(404, 'Book not found');
    	}

        if(book.createdBy !== Meteor.userId()){
    		throw new Meteor.Error(500, 'You must be owner of the book');
    	}

        return Books.remove(bookId);
    },
    'books.update' (bookId, formData) {
        const book = Books.findOne(bookId);

        if(!book) {
            throw new Meteor.Error(404, 'Book not found');
        }
        
	    if(book.createdBy !== Meteor.userId()){
			throw new Meteor.Error(500, 'You must be owner of the book');
		}

        return Books.update(bookId, {$set:formData});
    },
});