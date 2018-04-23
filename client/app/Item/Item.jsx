import React from "react";
import {
  Jumbotron, Card, CardBody
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { itemActions } from "../Actions";
import { history } from '../Helpers';
import Notifications, { notify } from 'react-notify-toast';


export class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: {
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
    this.setState({ item: item })
    console.log(this.state);

    const { item } = this.state;
    const { dispatch } = this.props;

    if (item.name && item.quantity && item.description && item.images && price) {
      itemActions
        .create(item.name, item.quantity, item.description, item.images, item.price)
        .then(post => {
          notify.show("Item Added!!", "success", 5000);
        })
        .catch(error => {
          notify.show("Error Adding Item.", "error", 5000);
          this.setState({ error: error });
        });
      var result = this.refs.table.handleAddRow(item);
    }
  }
  onAfterDeleteRow(rowKeys) {
    this.setState({ items: [...this.state.items, row.target] });
  }

  componentDidMount() {
    const { itemList } = this.state;
    itemActions.getAll()
    .then(itemList => {
      this.setState({ items: itemList });
    })
    .catch(error => {
      notify.show("Error Adding Item.", "error", 5000);
      this.setState({ error: error });
    });

  }
  render() {
    let items = this.state.items;
    let item = this.state.item;
    let options = {
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow           // A hook for after droping rows.
      // A hook for after insert rows
    };
    const selectRowProp = {
      mode: 'radio'
    };
    return (
      <Jumbotron>
        <Card>
          <CardBody>
            <BootstrapTable data={items} insertRow={true} deleteRow={true} selectRow={selectRowProp} search={true} options={options} >
              <TableHeaderColumn dataField='id' isKey={true}>Item ID</TableHeaderColumn>
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
