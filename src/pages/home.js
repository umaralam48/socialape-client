import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "../components/Scream.js";
import PostScream from "../components/PostScream.js";
export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screams: null
    };
    this.addScream = this.addScream.bind(this);
  }

  componentDidMount() {
    axios
      .get("/screams")
      .then(res => {
        console.log(res.data);
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }
  addScream(s) {
    this.setState({
      screams: [s, ...this.state.screams]
    });
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <PostScream addScream={this.addScream} />
        </Grid>
      </Grid>
    );
  }
}

export default home;
