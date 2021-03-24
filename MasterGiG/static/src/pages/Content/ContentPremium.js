import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/auth";
import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card";
import { Link } from "react-router";
import { FlatButton } from "material-ui/FlatButton";

function mapStateToProps(state) {
  return {
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
const styleBlur = {
  filter: "blur(20px)",
  pointerEvents: "none",
  userSelect: "none",
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
  border: "",
};
@connect(mapStateToProps, mapDispatchToProps)
class ContentPremium extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.addBorder = this.addBorder.bind(this);
  }
  addBorder() {}
  render() {
    return (
      <div className="col-md-8">
        <Card style={style}>
          <div style={styleBlur}>
            <img src="../src/assets/cat.jpg" alt="cat" />
            <div>Lorem Ipsum</div>
          </div>
          <div style={pushForward}>Subscribe to view</div>
        </Card>
      </div>
    );
  }
}

export default ContentPremium;
