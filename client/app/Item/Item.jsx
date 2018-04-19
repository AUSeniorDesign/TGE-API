import React from "react";
import { Button, Jumbotron } from "reactstrap";
import Dropzone from "react-dropzone";
// import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";
import { userActions } from "../Actions";
import { connect } from "react-redux";
import { history } from '../Helpers';
import { itemAction } from '../Actions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];
function onCellEdit (row, fieldName, value) {
  const { data } = this.state;
  let rowIdx;
  const targetRow = data.find((prod, i) => {
    if (prod.id === row.id) {
      rowIdx = i;
      return true;
    }
    return false;
  });
  if (targetRow) {
    targetRow[fieldName] = value;
    data[rowIdx] = targetRow;
    this.setState({ data });
  }
}

function onAddRow  (row) {
  this.products.push(row);
  this.setState({
    data: this.products
  });
}

function onDeleteRow (row) {
  this.products = this.products.filter((product) => {
    return product.id !== row[0];
  });

  this.setState({
    data: this.products
  });
}
class RemoteStoreAlternative extends React.Component {
  constructor(props) {
    super(props);
    this.products = getProducts();
    this.state = {
      data: this.products
    };
  }



  render() {
    return (
      <RemoteAlternative
        onCellEdit={ this.onCellEdit }
        onAddRow={ this.onAddRow }
        onDeleteRow={ this.onDeleteRow }
        { ...this.state } />
    );
  }
}


class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  remote(remoteObj) {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  render() {
    const cellEditProp = {
      mode: 'click'
    };
    const selectRow = {
      mode: 'checkbox',
      cliclToSelct: true
    };
    return (
      <BootstrapTable data={ this.props.data }
                      selectRow={ selectRow }
                      remote={ this.remote }
                      insertRow deleteRow search pagination
                      cellEdit={ cellEditProp }
                      options={ {
                        onCellEdit: this.props.onCellEdit,
                        onDeleteRow: this.props.onDeleteRow,
                        onAddRow: this.props.onAddRow
                      } }>
        <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price' dataSort>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
function mapStateToProps(state) {
  //const { registering } = state.registration;
  return {};
}
const connectedItemPage = connect(mapStateToProps)(Item);
export { connectedItemPage as Item };