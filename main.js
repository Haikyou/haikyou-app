// Message Prototype
var message = $$({
	model: {},
	view:{
		format: '<div class="message-card fade in media"><div class="media-body"><h4 class="media-heading" data-bind="message" /><span data-bind="from" /> &middot; <span data-bind="to" /> &middot; <span data-bind="date" /></div></div>',
	}, 
	controller: {}
}).persist($$.adapter.restful, {collection: 'conversation', baseUrl: 'http://haikyou.herokuapp.com/'});


// Conversation Container
var conversation = $$({}, '<div/>', {
	'persist:start': function(){
	},

	'persist:stop': function(){
	}
}).persist();


// Where new messages are typed
var messageBox = $$({}, '<div><form class="form" role="form"><div class="formgroup"><textarea class="form-control" id="message-text" /></div><div class="formgroup"><button type="button" id="new-message-btn" class="btn btn-primary from-control">Send</button></div></form</div', {
	'click button': function(){

		var item = $$(message, {
			controller: {
				'persist:start':function(){
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

conversation.gather(message, 'append');