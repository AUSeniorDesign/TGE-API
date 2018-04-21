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
import { history } from '../Helpers';
import { userActions } from "../Actions";

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    userActions.logout();

    this.state = {
      user: {
        name: "",
        username: "",
        password: "",
        passwordVerified: ""
      },
      submitted: false,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.setState({ submitted: true });
    // const { user } = this.state;
    // const { dispatch } = this.props;
    // if (user.name && user.username && user.password) {
    //   userActions
    //     .signup(username, password)
    //     .then(user => {
    //       if (user) {
    //         history.push("/waitForAdmin");
    //       }
    //     })
    //     .catch(error => {
    //       this.setState({ error: error });
    //     });
    // }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <Jumbotron className="login">
        <h1 className="display-4">New User</h1>
        <Input
          placeholder="name"
          name="name"
          value={user.name}
          onChange={this.handleChange}
        />
        {submitted && !user.name && <ErrorMessage message="Name is required" />}
        <Input
            placeholder="username"
            name="username"
            value={user.username}
            onChange={this.handleChange}
          />
        {submitted &&
          !user.username && <div><br/><ErrorMessage message="Username is required" /></div>}
        <Input
          placeholder="password"
          name="password"
          type="password"
          value={user.password}
          onChange={this.handleChange}
        />
        {submitted &&
          !user.password && <ErrorMessage message="Password is required" />}
        <Input
          placeholder="re-enter password"
          name="passwordVerified"
          type="password"
          value={user.passwordVerified}
          onChange={this.handleChange}
        />
        {submitted && user.password &&
          !user.passwordVerified && (
            <ErrorMessage message="Both Passwords required" />
          )}
        {submitted && user.passwordVerified &&
          user.password != user.passwordVerified && (
            <ErrorMessage message="Passwords don't match" />
          )}
          {/* <Button color="primary" onClick={this.handleSubmit}> */}
        <Button tag={Link} to="/waitForAdmin" color="primary">
          Register
        </Button>
        <br />
        <br />
        <p className="mt-3">Already Signed Up?</p>
        <Button tag={Link} to="/login" color="primary">
          Login
        </Button>
      </Jumbotron>
    );
  }
}