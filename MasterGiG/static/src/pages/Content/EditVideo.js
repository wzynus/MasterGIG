import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
/* import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card"; */
import { Link } from "react-router-dom";
import ContentFree from "./ContentFree";
import ContentPremium from "./ContentPremium";
import ContentOwner from "./ContentOwner";
import { Button } from "@themesberg/react-bootstrap";
const styleBlur = {
  filter: "blur(20px)",
};
const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};
const imgStyle = {
  position: "relative",
  width: "100%",
  paddingTop: "56.25%",
};
const pushForward = {
  zIndex: 2,
  backgroundColor: "rgba(0,0,0, 0.4)",
  position: "relative",
  top: "50%",
  color: "white",
  left: "25%",
  transform: " translate(0, -200%)",
  padding: "20px",
  width: "50%",
  textAlign: "center",
};

class EditVideo extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  //If users is sub to the Content Creator, all vid are shown
  //If not, premium are locked
  //Plan is check if user sub to Content Creator
  //If yes show all as if free, else lock behind ContentPreimum
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-8">
        <h1>Edit Video</h1>
        <ContentOwner />
        <ContentOwner />
      </div>
    );
  }
}

export default EditVideo;
