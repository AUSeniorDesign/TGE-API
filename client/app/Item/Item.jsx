import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export class Item extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      isAdmin:true,
      currentState: "not-panic",
      items: []
    };

    this.onAfterInsertRow = this.onAfterInsertRow.bind(this);

    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);


    }  

    onAfterInsertRow(row) {
      let newRowStr = '';
    
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
      }
    
      this.setState({ items: [...this.state.items, row.target] });

    }
    onAfterDeleteRow(rowKeys) {
      this.setState({ items: [...this.state.items, row.target] });
    }
   

  componentDidMount() {
    fetch('/items', {
      headers : { 
        accept: 'application/json'
       }

    }) 
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }
  render() {
        let items = this.state.items
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
      <BootstrapTable data={ items } insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } search={ true } options={ options }>
          <TableHeaderColumn dataField='id' isKey>Item ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Item Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Item Price</TableHeaderColumn>
          <TableHeaderColumn dataField='quantity'>Item Quantity</TableHeaderColumn>
      </BootstrapTable>
      </CardBody>
      </Card>
      </Jumbotron>
    );
  }
}
