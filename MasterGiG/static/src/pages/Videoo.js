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