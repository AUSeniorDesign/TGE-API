import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export class User extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      isAdmin :true,
      currentState: "not-panic",
      users: []
    };

    this.onAfterInsertRow = this.onAfterInsertRow.bind(this);

    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);


    }  

    onAfterInsertRow(row) {
      let newRowStr = '';
    
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
      }
    
      this.setState({ users: [...this.state.users, row.target] });

    }
    onAfterDeleteRow(rowKeys) {
      this.setState({ users: [...this.state.users, rowKeys.target] });
    }
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);

      
      fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
      });
    }

  componentDidMount() {
    fetch('/orders', {
      headers : { 
        accept: 'application/json',

       }

    }) 
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
        let users = this.state.users
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
      <BootstrapTable data={ users } insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } search={ true } options={ options }>
          <TableHeaderColumn dataField='id' isKey>Item ID</TableHeaderColumn>
          <TableHeaderColumn dataField='user'>Item Name</TableHeaderColumn>
          <TableHeaderColumn dataField='address'>Item Price</TableHeaderColumn>
          <TableHeaderColumn dataField='order_item'>Item Quantity</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Item Quantity</TableHeaderColumn>
      </BootstrapTable>
      </CardBody>
      </Card>
      </Jumbotron>
    );
  }
}
