import React from "react";
import Grid from "@material-ui/core/Grid";
import { Image } from "@themesberg/react-bootstrap";
import { Col, Row } from "@themesberg/react-bootstrap";
import cat from "../assets/img/cat.jpg";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

class SearchResult extends React.Component {
  //URL is search/:query
  constructor(props) {
    super(props);
    this.state = { query: props.match.params.query };
  }
  componentDidUpdate() {
    if (this.state.query != this.props.match.params.query) {
      this.setState({ query: this.props.match.params.query });
    }
  }
  render() {
    return (
      <div>
        <h3>Search Result for: {this.state.query}</h3>
        <div className="media d-flex align-items-center">
          <Image src={cat} className="user-avatar md-avatar rounded-circle" />
          <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
            <span className="mb-0 font-small fw-bold">Maria</span>
          </div>
        </div>
        <div className="media d-flex align-items-center">
          <Image
            src={Profile3}
            className="user-avatar md-avatar rounded-circle"
          />
          <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
            <span className="mb-0 font-small fw-bold">Sufiyan</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
