import React from "react";
import { Button, Jumbotron } from "reactstrap";
import Dropzone from "react-dropzone";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";


export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = { files: [], dropzone: null };
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  priceFormatter(cell, row) {
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  render() {
    let { files, dropzone } = this.state;

    let products = [
      {
        id: 1,
        name: "Item name 1",
        price: 100
      },
      {
        id: 2,
        name: "Item name 2",
        price: 100
      },
      {
        id: 3,
        name: "Item name 3",
        price: 100
      },
      {
        id: 4,
        name: "Item name 4",
        price: 100
      },
      {
        id: 5,
        name: "Item name 5",
        price: 100
      },
    ];

    let columns = [
      {
        dataField: "id",
        text: "Product ID"
      },
      {
        dataField: "name",
        text: "Product Name",
        filter: textFilter()
      },
      {
        dataField: "price",
        text: "Product Price"
      }
    ];

    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Items Upload</h1>
          <br/>
          <Dropzone
            className="dropzone"
            ref={node => {
              dropzone = node;
            }}
            onDrop={this.onDrop.bind(this)}
          >
            <p>Drag .csv file here or click Browse Files to upload</p>
          </Dropzone>
          <br />
          <Button color="primary">Browse Files</Button>
        </Jumbotron>
        <br />
        <Jumbotron>
          <h1 className="display-4">All Items</h1>
          <br/>
          <BootstrapTable
            keyField="id"
            data={products}
            columns={columns}
            striped
            hover
            condensed
            filter={ filterFactory() }
          />
        </Jumbotron>
      </div>
    );
  }
}
