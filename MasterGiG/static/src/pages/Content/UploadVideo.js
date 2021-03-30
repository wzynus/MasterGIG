import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      thumbnail: null,
    };
  }
  onUpload = (e) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
  };
  onUploadImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({ thumbnail: e.target.files[0] });
  };
  render() {
    return (
      <div>
        <input
          type="file"
          name="file"
          accept="video/*"
          onChange={this.onUpload}
        />
        <div className="file-field">
          <div className="d-flex justify-content-xl-center ms-xl-3">
            <div className="d-flex">
              <span className="icon icon-md">
                <FontAwesomeIcon icon={faPaperclip} className="me-3" />
              </span>
              <input type="file" />
              <div className="d-md-block text-start">
                <div className="fw-normal text-dark mb-1">Choose Image</div>
                <div className="text-gray small">
                  JPG, GIF or PNG. Max size of 800K
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadVideo;
