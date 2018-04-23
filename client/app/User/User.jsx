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
    fetch('http://tge.mybluemix.net/users', {
      headers : { 
        accept: 'application/json',
       },
       credentials: 'include',
    }) 
      .then(res => res.json())
      .then(users => {
        users.map(user => user.username = user.Credential ? user.Credential.email : 'Facebook');
        this.setState({ users: users });
      });
  }
  render() {
        let users = this.state.users
        let options = {
          afterInsertRow: this.onAfterInsertRow,
          afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
          // A hook for after insert rows
        };
        // const selectRowProp = {
        //   mode: 'radio'
        // };
    return (
      <Jumbotron>
        <Card>
          <CardBody>
      <BootstrapTable data={ users } insertRow={ true } deleteRow={ true } search={ true } options={ options }>
          <TableHeaderColumn width='100' dataField='id' isKey>User ID</TableHeaderColumn>
          <TableHeaderColumn width='200' dataField='username'>Username</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>Role</TableHeaderColumn>
      </BootstrapTable>
      </CardBody>
      </Card>
      </Jumbotron>
    );
  }
}
