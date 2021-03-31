import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  ListGroup,
  ProgressBar,
} from "@themesberg/react-bootstrap";

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
import { Form } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      thumbnail: null,
    };
  }
  onUpload = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  showVideoName = () => {
    if (this.state.selectedFile != null) {
      return <>{this.state.selectedFile.name}</>;
    }
  };
  showThumbnailName = () => {
    if (this.state.thumbnail != null) {
      return <>{this.state.thumbnail.name}</>;
    }
  };
  showForm = () => {
    console.log(this.state.selectedFile);
    if (this.state.selectedFile != null) {
      return (
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Name your Video" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Put Description Here"
              />
            </Form.Group>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">Upload your thumbnail</h5>
                <div className="d-xl-flex align-items-center">
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ms-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="me-3"
                          />
                        </span>
                        <input
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={this.onUploadImage}
                          className="m-1"
                        />
                        <div className="d-md-block text-start">
                          <div className="fw-normal text-dark mb-1">
                            Choose Thumbnail
                          </div>
                          {this.showThumbnailName()}
                          {/*                     <div className="text-gray small">
                      JPG, GIF or PNG. Max size of 800K
                    </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Form>
          <Link to="/video/upload">
            <Button variant="secondary" className="m-1">
              Upload
            </Button>
          </Link>
        </div>
      );
    }
  };
  onUploadImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({ thumbnail: e.target.files[0] });
  };
  render() {
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Upload your video</h5>
          <div className="d-xl-flex align-items-center">
            <div className="file-field">
              <div className="d-flex justify-content-xl-center ms-xl-3">
                <div className="d-flex">
                  <span className="icon icon-md">
                    <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                  </span>
                  <input
                    type="file"
                    name="file"
                    accept="video/*"
                    onChange={this.onUpload}
                    className="m-1"
                  />
                  <div className="d-md-block text-start">
                    <div className="fw-normal text-dark mb-1">Choose Video</div>
                    {this.showVideoName()}
                    {/*                     <div className="text-gray small">
                      JPG, GIF or PNG. Max size of 800K
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
        {this.showForm()}
      </Card>
    );
  }
}

export default UploadVideo;
