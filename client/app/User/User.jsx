import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Jumbotron className="login">
        <h1 className="display-4">Users</h1>
      </Jumbotron>
    );
  }
}
