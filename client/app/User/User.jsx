import React from "react";
import {
  Jumbotron
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let users = [
      {
        id: 1,
        name: "User name 1",
        type: 100
      },
      {
        id: 2,
        name: "User name 2",
        type: 100
      },
      {
        id: 3,
        name: "User name 3",
        type: 100
      },
      {
        id: 4,
        name: "User name 4",
        type: 100
      },
      {
        id: 5,
        name: "User name 5",
        type: 100
      },
    ];

    let columns = [
      {
        dataField: "id",
        text: "User ID"
      },
      {
        dataField: "name",
        text: "User Name",
      },
      {
        dataField: "type",
        text: "User Type"
      }
    ];

    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Users</h1>
          <br/>
          <BootstrapTable
            keyField="id"
            data={users}
            columns={columns}
            striped
            hover
            condensed
          />
        </Jumbotron>
      </div>
    );
  }
}
