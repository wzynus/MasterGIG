import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
/* import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card"; */
import { Link } from "react-router-dom";

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
  }
  /*  home() {
    history.push("/");
  } */
  render() {
    return (
      <div className="col-md-8">
        <Link to="/video">
          <Card style={style}>
            <img src="../../src/assets/cat.jpg" alt="cat" />
            <div>Lorem Ipsum</div>
            <br />
            <Link to="/edit">
              <button> Edit</button>
            </Link>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ContentOwner;
