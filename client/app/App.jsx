import React from "react";
import Navigation from "./Navigation.jsx";
import Login from "./Login.jsx";
import { Container, Row } from "reactstrap";

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
        <Navigation/>
        <Container className="main-container">
            <Login/>
        </Container>
      </div>
    );
  }
}
