import Ably from "ably/promises";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
            this.setState({ members: presence.members.map});
        });
        presence.enter('ME');
    }

    componentWillUnmount() {
        // Use Ably's realtime presence detection
        const presence = this.channel.presence;
        // DAS BOOT FROM CHANNEL!
        this.setState({ members: presence.members.map});
        presence.unsubscribe();
    }

    render() {
        const membersList = Object.values(this.state.members).map((member) => {
            return <FontAwesomeIcon key={member.connectionId} icon={faUser}  size="9x" />
        })
        return (
            <div>{membersList}</div>
        );
    }
}

export default PresenceComponent;