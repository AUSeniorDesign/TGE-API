import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { history } from '../Helpers';

export class Order extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      isAdmin :true,
      currentState: "not-panic",
      orders: []
    };

    this.onAfterInsertRow = this.onAfterInsertRow.bind(this);

    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);


    }  

    onAfterInsertRow(row) {
      let newRowStr = '';
    
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
      }
    
      this.setState({ orders: [...this.state.orders, row.target] });

    }
    onAfterDeleteRow(rowKeys) {
      this.setState({ orders: [...this.state.orders, row.target] });
      
    }


  componentDidMount() {
    fetch('/orders', {
      headers : { 
        accept: 'application/json'
             }

    }) 
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }
  render() {
        let orders = this.state.orders
        let options = {
          afterInsertRow: this.onAfterInsertRow,
          afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
          // A hook for after insert rows
        };
        const selectRowProp = {
          mode: 'radio'
        };
    return (
      <Jumbotron>
        <Card>
          <CardBody>
      <BootstrapTable data={ orders } insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } search={ true } options={ options }>
          <TableHeaderColumn dataField='id' isKey>Item ID</TableHeaderColumn>
          <TableHeaderColumn dataField='user'>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='address'>Item Price</TableHeaderColumn>
          <TableHeaderColumn dataField='order_item'>Item Name</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Item Quantity</TableHeaderColumn>
      </BootstrapTable>
      </CardBody>
      </Card>
      </Jumbotron>
    );
  }
}
