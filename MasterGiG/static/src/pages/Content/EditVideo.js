import React from "react";
import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card";
import { TextField } from "material-ui/TextField";
import { Link } from "react-router";

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};

class ContentOwner extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
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
  seePic() {
    if (this.state.selectedFile === null) {
      return;
    } else {
      console.log(URL.createObjectURL(this.state.selectedFile));
      return <video src={URL.createObjectURL(this.state.selectedFile)} />;
    }
  }
  ifUploaded() {
    if (this.state.selectedFile != null) {
      return (
        <div>
          <br />
          Pick your thumbnail
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={this.onUploadImage}
          />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="col-md-8">
        <input
          type="file"
          name="file"
          accept="video/*"
          onChange={this.onUpload}
        />
        {this.ifUploaded()}
      </div>
    );
  }
}

export default ContentOwner;
