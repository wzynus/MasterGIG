import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactHlsPlayer from 'react-hls-player';
//import { WowzaWebRTCPlayer } from 'wowza-webrtc-player';
import ReactDOM from "react-dom";
class App extends React.Component {
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

export default App;
