import './book-details.html';

import { Template } from 'meteor/templating';
import { Books } from '/imports/api/books/books.js';

const DEFAULT_DATE_FORMAT = 'MMM D, YYYY';

Template.Books_details.onCreated(function(){
	this.autorun(()=>{
		let bookId = FlowRouter.getParam('id');
		this.subscribe('books.details', bookId);
	});
	let state = FlowRouter.getParam('id') ? 'view' : 'edit';
	this.state = new ReactiveVar(state);
	this.image = new ReactiveVar();
});

Template.Books_details.onRendered(function(){
	this.autorun(()=>{
		let state = this.state.get();
		Tracker.afterFlush(()=>{
			this.$('.datepicker').datepicker();
		});
	});
});

Template.Books_details.helpers({
	book() {
		let bookId = FlowRouter.getParam('id');
		return Books.findOne(bookId) || {};
	},
	formatDate(date) {
		let m = new moment(date);
		// console.log(format)
		return m.format(DEFAULT_DATE_FORMAT);
	},
	state(state) {
		return Template.instance().state.get() === state;
	},
	uploadedImage(defaultImage) {
		return Template.instance().image.get() || defaultImage;
	}
});

Template.Books_details.events({
	'submit #book-form'(event, instance){
		event.preventDefault();
		const form = event.currentTarget;

		const formData = {
			name : form.name.value,
			author : form.author.value,
			ISBN : form.ISBN.value,
		}

		let publishedAt = form.publishedAt.value;
		if(publishedAt) {
			let m = new moment(publishedAt, DEFAULT_DATE_FORMAT);
			publishedAt = m.toDate();
			formData.publishedAt = publishedAt;
		}

		if(instance.image.get()) formData.image = instance.image.get();

		// console.log(formData);

		let bookId = FlowRouter.getParam('id');
		if(bookId) {
			Meteor.call('books.update', bookId, formData, (error, res) => {
				if(error) {
					toastr.error(error.reason);
					console.log(error);
					return;
				} 
				toastr.success('Successfully updated');
				instance.state.set('view');
			});
		} else {
			Meteor.call('books.insert', formData, (error, res) => {
				if(error) {
					toastr.error(error.reason);
					console.log(error);
					return;
				} 
				toastr.success('Successfully added');
				FlowRouter.go('books.details', {id: res});
				instance.state.set('view');
			});
		}

	},

	'click [action="set-state"]'(event, instance) {
		event.preventDefault();
		let state = event.currentTarget.dataset['state'];
		if(state==='edit'){
			instance.image.set('');
		}
		instance.state.set(state);
	},

	'click [action="remove-book"]'(event, instance) {
		event.preventDefault()
		BootstrapModalPrompt.prompt({
		    title: "Confirm action",
		    content: "Do you really want to remove the book?"
		}, (result) => {
		  if (result) {
		  	const bookId = FlowRouter.getParam('id');
		    // User confirmed it, so go do something.
		    Meteor.call('books.remove', bookId, (error) => {
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

	'change input[name="image"]'(event,instance){
		if (event.currentTarget.files && event.currentTarget.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
            	let image = e.target.result;
            	instance.image.set(image);
            };
            reader.readAsDataURL(event.currentTarget.files[0]);
        }
	}


});
