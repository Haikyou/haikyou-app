var message = $$({
  model: {},
  view:{
    format: 
    '<li id="message"><div data-bind="from" /><div data-bind="to" /><div data-bind="message" /></li>'
  }, 
  controller: {}
}).persist($$.adapter.restful, {collection: 'conversation', baseUrl: 'http://haikyou.herokuapp.com/'});

var conversation = $$({}, '<div>Conversation: <ul/></div').persist();

$$.document.append(conversation, '#conversation-container');

conversation.gather(message, 'append', 'ul');