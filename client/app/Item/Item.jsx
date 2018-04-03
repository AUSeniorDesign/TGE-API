import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Jumbotron>
        <h1 className="display-4">Item</h1>
      </Jumbotron>
    );
  }
}
