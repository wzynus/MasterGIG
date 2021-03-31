import React from "react";
import axios from "axios";
import { Button } from "@themesberg/react-bootstrap";
const configStart = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/start",
  headers: {
    "wsc-api-key":
      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
    "wsc-access-key":
      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
  },
};
const configStop = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/stop",
  headers: {
    "wsc-api-key":
      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
    "wsc-access-key":
      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
  },
};

class StreamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stream: {}, state: "" };
    this.startStream = this.startStream.bind(this);
    this.stopStream = this.stopStream.bind(this);
  }
  getState = () => {
    axios
      .get("https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/state", {
        headers: {
          "wsc-api-key":
            "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
          "wsc-access-key":
            "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.setState({ state: response.data.live_stream.state });
          console.log(this.state.state);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    axios
      .get("https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/", {
        headers: {
          "wsc-api-key":
            "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
          "wsc-access-key":
            "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          this.setState({
            stream: response.data.live_stream.source_connection_information,
          });
          this.getState();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  stopStream() {
    axios(configStop)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ state: "loading" });
    setTimeout(() => {
      this.setState({ state: "stopped" });
      console.log(this.state.state);
    }, 5000);
  }
  startStream() {
    axios(configStart)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ state: "loading" });
    setTimeout(() => {
      this.setState({ state: "started" });
      console.log(this.state.state);
    }, 20000);
  }
  startandStopStream() {
    if (this.state.state === "stopped") {
      return (
        <Button variant="secondary" onClick={this.startStream} className="m-1">
          Start Stream
        </Button>
      );
    } else if (this.state.state === "started") {
      return (
        <Button variant="secondary" onClick={this.stopStream} className="m-1">
          Stop Stream
        </Button>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return (
      <div>
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
export default StreamInfo;

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
/*   createStream() {
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
  } */
/*  axios
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
      ); 
    }
    componentDidMount() {
      axios
        .get("https://api.cloud.wowza.com/api/v1.6/live_streams/a436fa9f/", {
          headers: {
            "wsc-api-key":
              "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
            "wsc-access-key":
              "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
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
                      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
                    "wsc-access-key":
                      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
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
    }*/
