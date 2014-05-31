// Message Prototype
var message = $$({
	model: {},
	view:{
		format: '<li class="message-card fade in"><div data-bind="from" /><div data-bind="to" /><div data-bind="message" /><div data-bind="date" /></li>',
	}, 
	controller: {}
}).persist($$.adapter.restful, {collection: 'conversation', baseUrl: 'http://localhost:3000/'});


// Conversation Container
var conversation = $$({}, '<div><ul/></div', {
	'persist:start': function(){
	},

	'persist:stop': function(){
	}
}).persist();


// Where new messages are typed
var messageBox = $$({}, '<div><form class="form" role="form"><div class="formgroup"><textarea id="message-text" /></div><div class="formgroup"><button type="button" id="new-message-btn" class="btn btn-primary">Send</button></div></form</div', {
	'click button': function(){

		var item = $$(message, {
			controller: {
				'persist:start':function(){
				},

				'persist:error':function(){
					console.log('Could not save :(');
				},

				'persist:save:success':function(){
					$$.document.prepend(this, '#conversation-container div ul');
				}
			}
		});

		item.model.set({'message':$('#message-text').val(), 'from':'Bebop', 'to':'Rocksteady'});
		item.save();
	},

});

$$.document.append(messageBox, '#new-message-container');
$$.document.append(conversation, '#conversation-container');

conversation.gather(message, 'append', 'ul');