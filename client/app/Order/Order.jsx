import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class Order extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Jumbotron>
        <h1 className="display-4">Orders</h1>
      </Jumbotron>
    );
  }
}
