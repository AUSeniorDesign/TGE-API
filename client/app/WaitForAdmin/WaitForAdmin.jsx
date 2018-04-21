import React from "react";
import {
  Jumbotron
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

export class WaitForAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Sign Up Successful!</h1>
          <br/>
          <p className="mt-3">Thanks for registering. Please have a supervisor update your privleges to "Employee" or "Admin" to use the Admin Portal</p>
        </Jumbotron>
      </div>
    );
  }
}
