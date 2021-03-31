import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
/* import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card"; */
import { Link } from "react-router-dom";
import cat from "../../assets/img/cat.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};
class ContentFree extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-8">
        <Link to="/video/play">
          <Card style={style}>
            <img src={cat} alt="cat" />
            <div>Lorem Ipsum</div>
            <br />
            <div>like : 2 View : 2</div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ContentFree;
