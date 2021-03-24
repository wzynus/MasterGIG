import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/auth";
import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card";
import { Link } from "react-router";

function mapStateToProps(state) {
  return {
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};

@connect(mapStateToProps, mapDispatchToProps)
class ContentFree extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-8">
        <Link to="/video">
          <Card style={style}>
            <img src="../src/assets/cat.jpg" alt="cat" />
            <div>Lorem Ipsum</div>
            <br />
            <div>like</div>
            <div>dislike</div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ContentFree;
