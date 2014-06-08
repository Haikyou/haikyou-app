// Message Prototype
var message = $$({
	model: {
	},
	view:{
		format: '<div class="message-card fade in media"><div class="media-body"><h4 class="media-heading" data-bind="message" /><span data-bind="from" /> &middot; <span data-bind="to" /> &middot; <span data-bind="date" /> &middot; <span data-bind="visibility" /> &middot; <i class="starred fa" /> &middot; <i class="delete fa fa-trash-o" /></div></div>',
	}, 
	controller: {
		'click .starred': function(){

			this.model.set({'starred': !this.model.get('starred')});
			this.save();
		},

		'click .delete': function(){
			this.erase();
		},

		'create': function(){
			updateStar(this.model.get('starred'), this.view.$('.starred'));
		},

		'persist:start': function(){
			start();
		},

		'persist:stop': function(){
			stop();
		},

		'persist:save:success':function(){
			updateStar(this.model.get('starred'), this.view.$('.starred'));
		}


	}
}).persist($$.adapter.restful, {collection: 'conversation', baseUrl: 'http://localhost:3000/'});


// Conversation Container
var conversation = $$({
	model: {},

	view: {
		format: '<div/>'
	},

	controller: {
		'persist:start': function(){
			start();
		},

		'persist:stop': function(){
			stop();
		}
	}
}).persist();



// Where new messages are typed
var messageBox = $$({}, '<div><form class="form" role="form"><div class="formgroup"><textarea class="form-control" id="message-text" rows="3" /></div><div class="formgroup"><button type="button" id="new-message-btn" class="btn btn-primary from-control" data-loading-text="Sending...">Send</button></div></form</div', {
	'click button': function(){

		var item = $$(message, {
			controller: {
				'~persist:save:success':function(){
					$$.document.prepend(this, '#conversation-container');
					$('#message-text').val('');
					this.load();
				}
			}
		});

		item.model.set({'message':$('#message-text').val(), 'from':'Bebop', 'to':'Rocksteady'});
		item.save();
	},

});



var user = $$({
	model: {
		id: 'rhymn'
	},

	view: {
		format: '\
		<li>\
			<a href="#">\
				<img src="img/person.jpg" class="profile-picture img-responsive" />\
				<i class="fa fa-file-image-o"></i> Edit profile\
			</a>\
		</li>\
		<li class="divider" />\
		<li>\
			<a data-bind="username" />\
		</li>\
		<li>\
			<a data-bind="email" /></a>'
	},

	controller: {

	}
}).persist($$.adapter.restful, {collection: 'users', baseUrl: 'http://localhost:3000/'});

$$.document.prepend(user, '#me-menu');
user.load();

$$.document.append(messageBox, '#new-message-container');
$$.document.append(conversation, '#conversation-container');


// Gather conversation from API
conversation.gather(message, 'append');