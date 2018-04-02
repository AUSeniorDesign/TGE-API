import React from "react";
import { ErrorMessage } from "../Components";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon
} from "reactstrap";
import { Link } from "react-router-dom";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    return (
      <Jumbotron className="login">
        <h1 className="display-4">Register</h1>
        <Input placeholder="name" />
        <InputGroup className="mt-3">
          <Input placeholder="username" />
          <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
        </InputGroup>
        <Input placeholder="password" />
        <Input placeholder="re-enter password" />
        <p className="text-danger" hidden>
          Incorrect Username / Password.
        </p>
        <Button color="primary">Register</Button>
        <p className="mt-3">Already Signed Up?</p>
        <Button tag={Link} to="/login" color="primary">Login</Button>
      </Jumbotron>
    );
  }
}
