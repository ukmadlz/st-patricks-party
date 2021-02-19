// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d49ff4b567cb9d97664a', {
  cluster: 'eu'
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(JSON.stringify(data));
});