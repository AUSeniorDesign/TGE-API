import React from "react";
import {
  Jumbotron
} from "reactstrap";
// import BootstrapTable from "react-bootstrap-table-next";
import Button from "material-ui/Button";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const qualityType = {
  0: 'Pending',
  1: 'Shipped',
  2: 'Late'
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}
export class Order extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let orders = [
      {
        id: 1,
        name: "Customer name 1",
        total: 200,
        status: 0
      },
      {
        id: 2,
        name: "Customer name 2",
        total: 30,
        status: 0
      },
      {
        id: 3,
        name: "Customer name 3",
        total: 10,
        status: 2
      },
      {
        id: 4,
        name: "Customer name 4",
        total: 900,
        status: 1
      },
      {
        id: 5,
        name: "Customer name 5",
        total: 500,
        status: 2
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
      },
      {
        dataField: "status",
        text: "Order Status"
      }
    ];

    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Orders</h1>
          <br/>
          <BootstrapTable data={ orders }>
        <TableHeaderColumn dataField='id' isKey>Order ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Order Name</TableHeaderColumn>
        <TableHeaderColumn dataField='total'>Order Total</TableHeaderColumn>
        <TableHeaderColumn dataField='status' filterFormatted dataFormat={ enumFormatter } formatExtraData={ qualityType }
          filter={ { type: 'SelectFilter', options: qualityType } }>Order Status</TableHeaderColumn>
      </BootstrapTable>
        </Jumbotron>
      </div>
    );
  }
}