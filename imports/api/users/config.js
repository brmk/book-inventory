import { Accounts } from 'meteor/accounts-base';
Meteor.startup(()=>{
	console.log('Setting up Accounts config');
	Accounts.config({
		// forbidClientAccountCreation: true,
		sendVerificationEmail: false,
		loginExpirationInDays: 90, //default 90
		passwordResetTokenExpirationInDays: 3, //default 3
		passwordEnrollTokenExpirationInDays: 30 //default 30
	});

	Meteor.users.deny({
		update: function () { return true; },
		insert: function () {return true;},
		remove: function() {return true;}
	});

})