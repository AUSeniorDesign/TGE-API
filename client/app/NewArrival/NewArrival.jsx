import React from "react";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Media
} from "reactstrap";
import Dropzone from "react-dropzone";
import BootstrapTable from "react-bootstrap-table-next";
import Notifications, {notify} from 'react-notify-toast';
import { newArrivalActions } from "../Actions";



export class NewArrival extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPost: {
        description: "",
        store: "",
        image: null
      },
      submitted: false,
      dropzone: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { newPost } = this.state;
    let newPostCopy = JSON.parse(JSON.stringify(this.state.newPost));
    newPostCopy[name] = value;
    this.setState({
      newPost: newPostCopy
    });
  }

  onDrop(files) {
    const { newPost } = this.state;
    this.setState({
      newPost: {
        ...newPost,
        image: files[0]
      }
    });
    console.log(this.state);
  }

  createPost() {
    this.setState({ submitted: true });

    const { newPost } = this.state;
    const { dispatch } = this.props;
 
    if (newPost.store && newPost.description && newPost.image) {
      newArrivalActions
        .create(newPost.store, newPost.description, newPost.image)
        .then(post => {
          notify.show("Post Published!", "success", 5000);
        })
        .catch(error => {
          console.log(error);
          notify.show("Error Creating Post.", "error", 5000);
          this.setState({ error: error });
        });
    }
  }

  deleteImage() {}

  render() {
    let { newPost, submitted, dropzone } = this.state;

    let posts = [];

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
        <Notifications />
        <Jumbotron>
          <h1 className="display-4">New Arrival Post</h1>
          <br />
          <h3 className="display-6">Description</h3>
          <Input
            placeholder="description"
            name="description"
            type="textarea"
            value={newPost.description}
            onChange={this.handleChange}
          />

          {submitted &&
            !newPost.description && <p className="text-danger">Description required.</p>}
          <br />

          <Input
            placeholder="store"
            name="store"
            value={newPost.store}
            onChange={this.handleChange}
          />
          {submitted &&
            !newPost.store && <p className="text-danger">Store required.</p>}
          <br />

          <h3 className="display-6">Picture</h3>

          {!submitted &&
            newPost.image && (
              <div>
              <Button
                color="muted"
                size="sm"
                onClick={() => {
                  dropzone.open();
                }}>
                Change Image
              </Button>
              <br/>
              <img style={{ height: '200px', margin: '10px 0' }} src={newPost.image.preview} alt="Image Upload" />
              </div>
            )}

          {!newPost.image ?
          <Dropzone className="dropzone" multiple={false} ref={node => { dropzone = node; }}onDrop={this.onDrop.bind(this)}>
            <p>Drag image file or click here to browse files</p>
          </Dropzone>
          :
          <Dropzone hidden className="dropzone" ref={node => { dropzone = node; }}onDrop={this.onDrop.bind(this)}>
            <p>Drag image file or click here to browse files</p>
          </Dropzone>
          }

          {submitted &&
            !newPost.image && <p className="text-danger">Image required.</p>}

          <br />

          <Button
            color="primary"
            onClick={() => {
              this.createPost();
            }}
          >
            Publish Post
          </Button>
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
