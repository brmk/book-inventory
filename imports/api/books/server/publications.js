// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Books } from '../books.js';

Meteor.publish('books.ownedByUser', function (query, options={}) {
	const createdBy = this.userId;
	_.extend(query, {createdBy});
	let defaultOptions = {
		limit: 10,
		sortBy: {
			createdAt: -1
		}
	}

	options = _.extend(defaultOptions, options)

	return Books.find(query, options);
});

Meteor.publish('books.details', function (_id) {
	const createdBy = this.userId;
	const query = {
		_id,
		createdBy
	}
	return Books.find(query);
});
