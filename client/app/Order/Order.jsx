import React from "react";
import {
  Jumbotron
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

export class Order extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let orders = [
      {
        id: 1,
        name: "Customer name 1",
        total: 100
      },
      {
        id: 2,
        name: "Customer name 2",
        total: 100
      },
      {
        id: 3,
        name: "Customer name 3",
        total: 100
      },
      {
        id: 4,
        name: "Customer name 4",
        total: 100
      },
      {
        id: 5,
        name: "Customer name 5",
        total: 100
      },
    ];

    let columns = [
      {
        dataField: "id",
        text: "Order ID"
      },
      {
        dataField: "name",
        text: "Order Name",
      },
      {
        dataField: "total",
        text: "Order Total"
      }
    ];

    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Orders</h1>
          <br/>
          <BootstrapTable
            keyField="id"
            data={orders}
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
