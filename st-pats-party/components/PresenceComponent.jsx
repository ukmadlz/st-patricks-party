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
            const { connectionId, action } = data;
            const membersObject = { members: presence.members.map };
            // Irish G'bye
            if(action == 'leave') {
                membersObject.bounce = connectionId;
            }
            this.setState(membersObject);
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
            return <div
                key={member.connectionId}
                className="p-3 "
            >
                <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                />
            </div>
        })
        if (this.state.bounce) {
            const bouncer = <div
                key={this.state.bounce}
                className="p-3 animate-spin"
            >
                <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                />
            </div>
            membersList.push(bouncer);
        }
        return (
            <div className="flex justify-center pt-2">{membersList}</div>
        );
    }
}

export default PresenceComponent;