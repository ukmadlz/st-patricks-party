
import React, { useEffect, useState } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Ably from "ably/promises";
class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.vidRef = React.createRef();
        this.channelName = "slainte";
        this.ably = new Ably.Realtime.Promise({ authUrl: '/api/ablyTokenRequest' });
        this.channel = this.ably.channels.get(this.channelName);
    }

    componentDidMount() {
        const video = this.vidRef.current; //get the video element
        // Individual events
        this.channel.subscribe((message, err) => {
            const { data } = message;
            if (typeof data == 'string') {
                const messageData = JSON.parse(data);
                if (messageData.play) {
                    video.currentTime = messageData.play;
                    video.play();
                    console.log('Play at %s', messageData.play);
                }
            }
        });
    }

    render() {
        return(<CloudinaryContext
                cloudName="elsmore-me"
                className="flex justify-center"
            >
                <Video
                    innerRef={this.vidRef}
                    publicId="st-pats-party/Big_Buck_Bunny_4K.webm.360p.vp9"
                    id="videoplayer"
                />
            </CloudinaryContext>);
    }
}

export default VideoComponent;