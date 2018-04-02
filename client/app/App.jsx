import React from "react";
import { Router, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { Navigation } from "./Components";
import { Container, Row } from "reactstrap";
import { history } from "./Helpers";
import { Login } from "./Login";
import { Register } from "./Register";
import { User } from "./User";
import { Order } from "./Order";
import { Item } from "./Item";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://npmcdn.com/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        />
        <link
          rel="text/javascript"
          href="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/4.8.0/reactstrap.min.js"
        />
        <Router history={history}>
          <div>
            <Navigation />
            <Container className="main-container">
              <div>
                <PrivateRoute exact path="/" component={Order} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/order" component={Order} />
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/item" component={Register} />
              </div>
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}
