import React from "react";

export class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    return <p className="text-danger">Login Failed.</p>;
  }
}
