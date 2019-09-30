import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
const styles = theme => ({
  ...theme.styling
});
export class PostScream extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
      errors: {},
      loading: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const data = {
      body: this.state.body
    };
    Axios.post("/scream", data)
      .then(res => {
        console.log(res.data);
        this.setState({ body: "", errors: {}, loading: false });
        //console.log(this.props.addScream);
        this.props.addScream(res.data);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
        this.setState({ errors: err.response.data, loading: false });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm>
          <img src={icon} alt="monkey" className={classes.image} />
          <Typography variant="h5" className={classes.pageTitle}>
            New Scream
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="body"
              name="body"
              label="What's on your mind?"
              className={classes.textField}
              value={this.state.body}
              onChange={this.handleChange}
              helperText={errors.body}
              error={errors.body ? true : false}
              fullWidth
            />
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={loading}
            >
              Create
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PostScream);
