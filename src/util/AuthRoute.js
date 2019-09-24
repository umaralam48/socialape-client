import { Route, Redirect } from "react-router-dom";

import React, { Component } from "react";

export class AuthRoute extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     authenticated: this.props.authenticated
  //   };
  // }
  render() {
    const { component: Component, authenticated, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          let tobereturned =
            authenticated === true ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
            );

          return tobereturned;
        }}
      />
    );
  }
}

export default AuthRoute;
