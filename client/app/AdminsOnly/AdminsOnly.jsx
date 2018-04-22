import React from "react";
import {
  Jumbotron
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

export class AdminsOnly extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4 text-danger">Admins Only</h1>
          <br/>
          <p className="mt-3">Sorry, this page is only for Admins. Please have another admin upgrade your privelages to access this page.</p>
        </Jumbotron>
      </div>
    );
  }
}
