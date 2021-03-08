import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import ReactHlsPlayer from 'react-hls-player';




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


@connect(mapStateToProps, mapDispatchToProps)
class Streaming extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef()
    
  }


  render() {
  return (
    <div>
     <ReactHlsPlayer
    url='https://cdn3.wowza.com/1/VmpxSVhmMmxrSXVa/b3FLZHl5/hls/live/playlist.m3u8'
    autoplay={false}
    controls={true}
    width={500}
    height={375}
/>
    </div>
    
  );
}
}

export default Streaming;
