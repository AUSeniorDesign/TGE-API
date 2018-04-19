import React from "react";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon
} from "reactstrap";
import Dropzone from "react-dropzone";
import BootstrapTable from "react-bootstrap-table-next";

export class NewArrival extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        store: ""
      },
      submitted: false,
      files: [],
      dropzone: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { post } = this.state;
    const { dispatch } = this.props;
    if (post.store) {
      // localStorage.setItem('user', JSON.stringify(user));
      // history.push('/order');
      //dispatch(userActions.signUp(user));
      alert("Post Created!");
    }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    let { post, submitted, files, dropzone } = this.state;

    let posts = [
      {
        id: 1,
        name: "Post description 1",
        store: "Nashville"
      },
      {
        id: 2,
        name: "Post description 2",
        store: "Nashville"
      },
      {
        id: 3,
        name: "Post description 3",
        store: "Nashville"
      },
      {
        id: 4,
        name: "Post description 4",
        store: "Nashville"
      },
      {
        id: 5,
        name: "Post description 5",
        store: "Nashville"
      }
    ];

    let columns = [
      {
        dataField: "id",
        text: "Post ID"
      },
      {
        dataField: "name",
        text: "Post Description"
      },
      {
        dataField: "store",
        text: "Store"
      }
    ];

    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">New Product Post</h1>
          <br />
          <h3 className="display-6">Description</h3>
          <Input
            placeholder="description"
            name="description"
            type="textarea"
            value={post.description}
            onChange={this.handleChange}
          />
          <br />
          <Input
            placeholder="store"
            name="store"
            value={post.store}
            onChange={this.handleChange}
          />
          {submitted &&
            !post.store && <ErrorMessage message="Store is required" />}
          <br />

          <h3 className="display-6">Pictures</h3>
          <Dropzone
            className="dropzone"
            ref={node => {
              dropzone = node;
            }}
            onDrop={this.onDrop.bind(this)}
          >
            <p>Drag image files here or click button to upload</p>
          </Dropzone>
          <br />
          <Input type="file" name="file" id="exampleFile"/>
        </Jumbotron>
        <Jumbotron>
          <h1 className="display-4">All Posts</h1>
          <br />
          <BootstrapTable
            keyField="id"
            data={posts}
            columns={columns}
            striped
            hover
            condensed
          />
        </Jumbotron>
      </div>
    );
  }
}
