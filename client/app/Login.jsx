import React from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon
} from "reactstrap";

export default class Login extends React.Component {
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
        <h1 className="display-4">Login</h1>
        <InputGroup className="mt-3">
          <Input placeholder="username" />
          <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
        </InputGroup>
        <Input placeholder="password" />
        <p className="text-danger" hidden>
          Incorrect Username / Password.
        </p>
        <Button color="primary">Login</Button>
        <p className="mt-3">Or</p>
        <Button color="primary">Create Account</Button>
      </Jumbotron>
    );
  }
}
