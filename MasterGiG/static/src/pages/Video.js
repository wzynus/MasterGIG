import React from "react";

import VideoPlayer from "./VideoPlayer";
import video from "../assets/sample_960x400_ocean_with_audio.mp4";
import video2 from "./Sample_Video.mp4";
export default class Video extends React.Component {
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,

      width: 720,
      sources: [
        {
          src: video2,
          type: "video/mp4",
        },
      ],
    };
    return (
      <>
        <VideoPlayer {...videoJsOptions} />
      </>
    );
  }
}

/* import { Form } from '@themesberg/react-bootstrap';
import React from "react";


export default () => {
    return (
        <>
        <Form>
            <Form.Control type="file" />
        </Form>
       
        </>        
);
} */
