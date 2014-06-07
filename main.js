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
			// Sync Agility id with Mongodb _id
			this.model.set({'id':this.model.get('_id')});

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
}).persist($$.adapter.restful, {collection: 'conversation', baseUrl: 'http://haikyou.herokuapp.com/'});


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
				'persist:start':function(){
					start();
					$('#new-message-btn').button('loading');
				},

				'persist:stop':function(){
					stop();
					$('#new-message-btn').button('reset');
				},

				'persist:error':function(){
				},

				'persist:save:success':function(){
					$$.document.prepend(this, '#conversation-container');
				}
			}
		});

		item.model.set({'message':$('#message-text').val(), 'from':'Bebop', 'to':'Rocksteady'});
		item.save();
	},

});






$$.document.append(messageBox, '#new-message-container');
$$.document.append(conversation, '#conversation-container');


// Gather conversation from API
conversation.gather(message, 'append');