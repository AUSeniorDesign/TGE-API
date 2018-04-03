import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class User extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Jumbotron className="login">
        <h1 className="display-4">User</h1>
      </Jumbotron>
    );
  }
}
