import './books-list-item.html';

Template.Books_listItem.events({
	'click .books-list-item'(event, instance) {
		FlowRouter.go(FlowRouter.path('books.details', {id:this._id}));
	} 
});