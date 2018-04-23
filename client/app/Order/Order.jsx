import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

import { history } from '../Helpers';
import Notifications, { notify } from 'react-notify-toast';
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

    if (order.name && order.quantity && order.description && order.price) {
      itemActions
        .create(order.name, order.quantity, order.description, order.images, order.price)
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
    const { orderList } = this.state;
    orderActions.getAll()
      .then(orderList => {
        this.setState({ orders: orderList });
      })
      .catch(error => {
        // notify.show("Error Adding Item.", "error", 5000);
        this.setState({ error: error });
      });

  }
  render() {
//     let orders = this.state.orders;
//     let item = this.state.item;

//         let options = {
//           afterInsertRow: this.onAfterInsertRow,
//           afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
//           // A hook for after insert rows
//         };
//         const selectRowProp = {
//           mode: 'radio'
//         };
//         let mock = [
//           {
//             id: 1,
//             itemName: "TGE comic",
//             usernamename: "Customer name 1",
//             total: 100,
//             status: "pending"
//           },
//           {
//             id: 2,
//             itemName: "TGE comic",
//             usernamename: "Customer name 2",
//             total: 0,
//             status: "shipped"
//           },
//           {
//             id: 3,
//             itemName: "TGE comic",
//             usernamename: "Customer name 3",
//             total: 4.44,
//             status: "pending"
//           },
//           {
//             id: 4,
//             itemName: "TGE comic",
//             usernamename: "Customer name 4",
//             total: 30.55,
//             status: "shipped"
//           },
//           {
//             id: 5,
//             itemName: "TGE comic",
//             usernamename: "Customer name 4",
//             total: 2.00,
//             status: "shipped"
//           },
//         ];
//     return (
//       <Jumbotron>
//         <Card>
//           <CardBody>
//       <BootstrapTable data={ mock } insertRow={ true } deleteRow={ true } selectRow={ selectRowProp } search={ true } options={ options }>
//           <TableHeaderColumn isKey dataField='id' >Oder ID</TableHeaderColumn>
//           <TableHeaderColumn dataField='itemName'>Item Name</TableHeaderColumn>
//           <TableHeaderColumn dataField='userName'>User Name</TableHeaderColumn>
//           <TableHeaderColumn  dataField='total'>Order Total</TableHeaderColumn>
//           <TableHeaderColumn dataField='status'>Oder Status</TableHeaderColumn>
//       </BootstrapTable>
//       </CardBody>
//       </Card>
//       </Jumbotron>
//     );
//   }
// }
const selectOptions = {
  0: 'pending',
  1: 'shipped',
  2: 'in progress',
  3: 'cancelled'

};
    let mock = [
      {
        id: 1,
        itemName: "TGE comic",
        usernamename: "Customer name 1",
        shippingAddress:"Nashville,TN",
        total: 100,
        status: '0'
      },
      {
        id: 2,
        itemName: "TGE comic",
        usernamename: "Customer name 2",
        shippingAddress:"Nashville,TN",
        total: 0,
        status: '1'
      },
      {
        id: 3,
        itemName: "TGE comic",
        usernamename: "Customer name 3",
        shippingAddress:"Nashville,TN",
        total: 4.44,
        status: '2'
      },
      {
        id: 4,
        itemName: "TGE comic",
        usernamename: "Customer name 4",
        shippingAddress:"Nashville,TN",
        total: 30.55,
        status: '1'
      },
      {
        id: 5,
        itemName: "TGE comic",
        usernamename: "Customer name 4",
        shippingAddress:"Nashville,TN",
        total: 2.00,
        status: '3'
      },
    ];

    let columns = [
      {
        dataField: "id",
        text: "Order ID"
      },
      {
        dataField: "itemName",
        text: "Item Name",
      },
      {
        dataField: "usernamename",
        text: "Buyer",
      },
      {
        dataField: "total",
        text: "Order Total"
      },
      {
        dataField: "status",
        text: "Order status",
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
          options: selectOptions
        })
      }
    ];
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Orders</h1>
          <br />
          <BootstrapTable
            keyField="id"
            data={mock}
            columns={columns}
            filter={ filterFactory()}
            striped
            hover
            condensed
          />
        </Jumbotron>
      </div>
    );
  }

}

