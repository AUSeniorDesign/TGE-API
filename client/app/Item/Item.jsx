import React from "react";
import {
  Jumbotron
} from "reactstrap";

export class Item extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Jumbotron>
        <h1 className="display-4">Items</h1>
      </Jumbotron>
    );
  }
}
