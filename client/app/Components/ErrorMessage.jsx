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
    const { message } = this.props;
    return <p className="text-danger">{message}</p>;
  }
}
