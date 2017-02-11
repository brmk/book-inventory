// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/books/books.js';

Meteor.startup(() => {
    // if the Books collection is empty
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({email:'user@user.com', password:'user'})
    }
    if (Books.find().count() === 0) {
        console.log('Running fixtures for Books');
        const data = [{
            name: 'George Washington Written Upon the Land',
            author: 'Philip Levy',
            ISBN: '1940425905',
            publishedAt: new Date(),
            image: 'http://wvupressonline.com/sites/default/files/covers/9781940425900.jpg',
            createdAt: new Date(),
            createdBy: Meteor.users.findOne()._id,
        }, {
            name: 'George Washington Written Upon the Land',
            author: 'Philip Levy',
            ISBN: '1940425905',
            publishedAt: new Date(),
            image: 'http://wvupressonline.com/sites/default/files/covers/9781940425900.jpg',
            createdAt: new Date(),
            createdBy: Meteor.users.findOne()._id,
        }, {
            name: 'George Washington Written Upon the Land',
            author: 'Philip Levy',
            ISBN: '1940425905',
            publishedAt: new Date(),
            image: 'http://wvupressonline.com/sites/default/files/covers/9781940425900.jpg',
            createdAt: new Date(),
            createdBy: Meteor.users.findOne()._id,
        }, ];

        data.forEach(book => Books.insert(book));
    }
});