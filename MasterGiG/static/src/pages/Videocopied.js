import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/auth";
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
//sadly need play hls video from sctrach
@connect(mapStateToProps, mapDispatchToProps)
class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      aspectRatio: "16:9",
      sources: [
        {
          src: "../src/assets/Sample_Video.mp4",
          type: "video/mp4",
        },
      ],
    };
    return (
      <div>
        <br />
        <VideoPlayer {...videoJsOptions} />
      </div>
    );
  }
}

export default Video;
