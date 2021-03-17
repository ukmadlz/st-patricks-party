import Ably from "ably/promises";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

class PresenceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.irishGoodbye = 300000;
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
            const membersObject = {
                members: presence.members.map,
                bounce: this.state.bounce || [],
            };
            // Irish G'bye
            if(action == 'leave') {
                membersObject.bounce.push({
                    connectionId,
                    timestamp: (new Date()),
                });
            }
            this.setState(membersObject);
        });
        presence.enter('ME');
    }

    componentWillUnmount() {
        // Use Ably's realtime presence detection
        const presence = this.channel.presence;
        // DAS BOOT FROM CHANNEL!
        this.setState({
            members: presence.members.map,
            bounce: this.state.bounce,
        });
        presence.unsubscribe();
    }

    render() {
        let membersList = Object.values(this.state.members).map((member) => {
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
        if (this.state.bounce && this.state.bounce.length) {
            const bouncer = this.state.bounce.filter((member) => {
                const difference = (((new Date()).getTime() - member.timestamp.getTime()) < this.irishGoodbye)
                console.log(difference);
                return difference;
            })
            .map((member) => {
                return <div
                    key={member.connectionId}
                    className="p-3 animate-spin"
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        size="2x"
                    />
                </div>
            });
            console.log(membersList);
            membersList = membersList.concat(bouncer);
        }
        return (
            <div className="flex justify-center pt-2">{membersList}</div>
        );
    }
}

export default PresenceComponent;