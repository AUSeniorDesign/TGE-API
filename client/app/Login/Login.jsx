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
import { userActions } from "../Actions";
import { history } from "../Helpers";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    userActions.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      error: null
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
      userActions
        .login(username, password)
        .then(user => {
          console.log(user);
          if (user) {
            history.push("/order");
          }
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }
  }

  render() {
    const { username, password, submitted, error } = this.state;
    return (
      <Jumbotron className="jumbotron login">
        <h1 className="display-4">Login</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <Input
            placeholder="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={this.handleChange}
          />
          <br />
          <Input
            placeholder="password"
            name="password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />
          {error && (
            <p className="text-danger">Login Failed.</p>
          )}
          <Button color="primary" onClick={this.handleSubmit}>
            Login
          </Button>
          <br />
          <br />
          <p className="mt-3">Don't have an account?</p>
          <Button tag={Link} to="/signup" color="primary">
            Create Account
          </Button>
        </form>
      </Jumbotron>
    );
  }
}
