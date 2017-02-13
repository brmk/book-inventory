import './books-list-item.html';

Template.Books_listItem.events({
	'click .books-list-item'(event, instance) {
		FlowRouter.go('books.details', {id:this._id});
	} 
});

Template.Books_listItem.helpers({
	formatDate(date) {
		let m = new moment(date);
		return m.format('MMM D, YYYY');
	}
});
