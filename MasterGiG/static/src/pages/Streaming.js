/* import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/auth";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
var configStart = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/b8k7bksb/start",
  headers: {
    "wsc-api-key":
      "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
    "wsc-access-key":
      "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
  },
};
var configStop = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/b8k7bksb/stop",
  headers: {
    "wsc-api-key":
      "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
    "wsc-access-key":
      "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
  },
};
@connect(mapStateToProps, mapDispatchToProps)
class Streaming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stream: {}, state: "" };
  }
  startandStopStream() {
    // if (this.state.state === "stopped") {
    return <button onClick={this.createStream}>Start</button>;
    // }
  }
  createStream() {
    axios.post("https://api.cloud.wowza.com/api/v1.6/live_streams", {
      headers: {
        "wsc-api-key":
          "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
        "wsc-access-key":
          "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
        "Content-Type": "application/json",
      },

      live_stream: {
        aspect_ratio_height: 1080,
        aspect_ratio_width: 1920,
        billing_mode: "pay_as_you_go",
        broadcast_location: "asia_pacific_singapore",
        delivery_method: "push",
        encoder: "other_rtmp",
        name: "API test 1",
        transcoder_type: "transcoded",
      },
    });
  }
  stopStream() {
    axios(configStop)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  startStream() {
    axios(configStart)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
    /*     axios
      .put("https://api.cloud.wowza.com/api/v1.6/live_streams/b8k7bksb/start", {
        headers: {
          "wsc-api-key":
            "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
          "wsc-access-key":
            "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      ); */
  }
  componentDidMount() {
    axios
      .get("https://api.cloud.wowza.com/api/v1.6/live_streams/b8k7bksb/", {
        headers: {
          "wsc-api-key":
            "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
          "wsc-access-key":
            "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          this.setState({
            stream: response.data.live_stream.source_connection_information,
          });
          axios
            .get(
              "https://api.cloud.wowza.com/api/v1.6/live_streams/b8k7bksb/state",
              {
                headers: {
                  "wsc-api-key":
                    "oudPq3We9AOUGCQvVWlMULJJPAZT015L2kJHGK9ZnupgmjkItWRjcuwUb0PO332c",
                  "wsc-access-key":
                    "e0UqPV7oLTwQANHc5DFrwI21tPhs2eQS56fsKbCZlwVaQVGqV0yX1VUwclSr3350",
                  "Content-Type": "application/json",
                },
              }
            )
            .then(
              (response) => {
                this.setState({ state: response.data.live_stream.state });
                console.log(this.state.state);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      liveui: true,
      sources: [
        {
          src:
            //
            //https://cdn3.wowza.com/1/VmpxSVhmMmxrSXVa/b3FLZHl5/hls/live/playlist.m3u8
            "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          type: "application/x-mpegURL",
        },
      ],
    };
    return (
      <div>
        <VideoPlayer {...videoJsOptions} />
        <div>Steps for OBS:</div>
        <div>Server: {this.state.stream.primary_server}</div>
        <div>Stream Key: {this.state.stream.stream_name}</div>
        <div>Check use authentication</div>
        <div>Username: {this.state.stream.username}</div>
        <div>Password: {this.state.stream.password}</div>
        {this.startandStopStream()}
      </div>
    );
  }
}

export default Streaming;

/*
"live_stream": {

    "aspect_ratio_height": 1080,
    "aspect_ratio_width": 1920,
    "billing_mode": "pay_as_you_go",
    "broadcast_location": "asia_pacific_singapore",
    "delivery_method": "push",
    "encoder": "other_rtmp", 
    "name": "API test 1", up to here ok
    "transcoder_type": "transcoded",
    "closed_caption_type": "none",
      //
    "delivery_protocols": 

        [
            "string"
        ],
        "delivery_type": "single-bitrate",
        "disable_authentication": false,
        "hosted_page": false,
        "hosted_page_description": "My Hosted Page Description",
        "hosted_page_logo_image": "",
        "hosted_page_sharing_icons": true,
        "hosted_page_title": "My Hosted Page",
        "low_latency": false,
        "password": "",
        "player_countdown": true,
        "player_countdown_at": "2020-02-01T17:00:00.000Z",
        "player_logo_image": "",
        "player_logo_position": "top-right",
        "player_responsive": false,
        "player_type": "wowza_player",
        "player_video_poster_image": "",
        "player_width": 640,
        "recording": true,
        "remove_hosted_page_logo_image": true,
        "remove_player_logo_image": true,
        "remove_player_video_poster_image": true,
        "source_url": "xyz.streamlock.net/vod/mp4:Movie.mov",
        "target_delivery_protocol": "hls-https",
        "use_stream_source": false,
        "username": "client2",
        "vod_stream": true
    }

}
*/
 */