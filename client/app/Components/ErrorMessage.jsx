import React from "react";

export class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      show: false
    };
  }
  render() {
    return <p className="text-danger">{message}</p>;
  }
}
