import React, { Component } from 'react';
import { FormErrors } from './FormErrors.jsx';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="Login">
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
          <label htmlFor="username">Username </label>
          <input type="username" required className="form-control" name="username"
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password </label>
          <input type="password" className="form-control" name="password"
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary" enabled={this.state.formValid}>Submit</button>
      </form>
    )
  }
}

export default Login;