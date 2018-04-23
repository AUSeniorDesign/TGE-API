import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { history } from '../Helpers';
import Notifications, {notify} from 'react-notify-toast';
import { orderActions } from "../Actions";


export class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: {
        name: "",
        quantity: 0,
        description: "",
        images: null,
        price: 0.0
      }
    };

    this.onAfterInsertRow = this.onAfterInsertRow.bind(this);

    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);


    }

    // handleChange(event) {
    //   const { id, value } = event;
    //   const { items } = this.state.items;
    //   let newPostCopy = JSON.parse(JSON.stringify(this.state.items));
    //   newPostCopy[id] = value;
    //   this.setState({
    //     item: newPostCopy
    //   });
    //   items.push(item);
    // }
  

    onAfterInsertRow(row) {

      let newRowStr = '';
    
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
      }

        console.log(this.state);
    
        const { order } = this.state;
        const { dispatch } = this.props;
     
        if (order.name && order.quantity && order.description &&  order.price) {
          itemActions
            .create(order.name, order.quantity,order.description, order.images, order.price)
            .then(post => {
              notify.show("Item Added!!", "success", 5000);
            })
            .catch(error => {
              notify.show("Error Adding Item.", "error", 5000);
              this.setState({ error: error });
            });
    
        }
         }
    
    onAfterDeleteRow(rowKeys) {
      this.setState({ orders: [...this.state.orders, row.target] });
      
    }


  componentDidMount() {
    fetch('/orders', {
      headers : { 
        accept: 'application/json',
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
