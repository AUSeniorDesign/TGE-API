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
import { connect } from "react-redux";
import { userActions } from "../Actions";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        username: "",
        password: ""
      },
      submitted: false
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
    console.log(name);
    console.log(value);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.name && user.username && user.password) {
      dispatch(userActions.signUp(user));
    }
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
        {submitted && !user.name &&
            <ErrorMessage className="help-block">Name is required</ErrorMessage>
        }
        <InputGroup className="mt-3">
          <Input placeholder="username" name="username" value={user.username} onChange={this.handleChange} />
          <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
        </InputGroup>
        <Input placeholder="password" />
        <Input placeholder="re-enter password" />
        <p className="text-danger" hidden>
          Incorrect Username / Password.
        </p>
        <Button color="primary">Register</Button>
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

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedSignup = connect(mapStateToProps)(Signup);
export { connectedSignup as Signup };
