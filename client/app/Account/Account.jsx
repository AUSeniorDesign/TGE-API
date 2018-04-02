import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class Account extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Jumbotron>
        <h1 className="display-4">Account</h1>
      </Jumbotron>
    );
  }
}
