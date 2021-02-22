var ablyApiKey = "zjPzvA.CK1fnA:5ITWDGoduiK5jONN";
realtime = new Ably.Realtime({
    key: ablyApiKey,
    clientId: 'laka'
}),
channel = realtime.channels.get('slante');
presence = channel.presence;

// join the fun
presence.subscribe('enter', (data, err) => {
    var membersCount = Object.keys(presence.members.map).length;
    console.log(membersCount)
});
presence.enter('mike')