
import React, { useEffect, useState } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.vidRef = React.createRef();
    }

    componentDidMount() {
        const video = this.vidRef.current; //get the video element
        setInterval(() => {
            // video.currentTime = 8
        }, 4000)
    }

    render() {
        return(<CloudinaryContext cloudName="elsmore-me" >
                <Video
                    innerRef={this.vidRef}
                    publicId="st-pats-party/dog"
                    controls="true"
                />
            </CloudinaryContext>);
    }
}

export default VideoComponent;