import React from "react";
import Grid from "@material-ui/core/Grid";
import cat from "../assets/img/cat.jpg";
class SearchResult extends React.Component {
  //URL is search/:query
  constructor(props) {
    super(props);
    this.state = { query: props.match.params.query };
  }
  render() {
    return (
      <div>
        <h3>Search Result for: {this.state.query}</h3>
        <Grid item xs={1}>
          <img src={cat} />
        </Grid>
        <Grid item xs={11}>
          <div>
            <h4>Title</h4>
            <p>Description</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <img src={cat} />
          <h4>Title</h4>
          <p>Description</p>
        </Grid>
      </div>
    );
  }
}

export default SearchResult;
