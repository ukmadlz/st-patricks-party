import Ably from "ably/promises";
import React, { useEffect, useState } from 'react';

class PresenceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { members: [] };
        this.channelName = "slainte";
        this.ably = new Ably.Realtime.Promise({ authUrl: '/api/ablyTokenRequest' });
        this.channel = this.ably.channels.get(this.channelName);
    }

    componentDidMount() {
        // Use Ably's realtime presence detection
        const presence = this.channel.presence;
        // Individual events
        presence.subscribe((data, err) => {
            console.log(presence.members);
            this.setState({ members: presence.members.map});
        });
        presence.enter('ME');
    }

    componentWillUnmount() {
        // Use Ably's realtime presence detection
        const presence = this.channel.presence;
        // DAS BOOT FROM CHANNEL!
        presence.unsubscribe();
    }

    render() {
        const membersList = Object.values(this.state.members).map((member) => {
            return <li>{member.connectionId}</li>
        })
        return (
            <ul>{membersList}</ul>
        );
    }
}

export default PresenceComponent;