import React from "react";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Media,
  Card,
  CardBody
} from "reactstrap";
import Dropzone from "react-dropzone";
import BootstrapTable from "react-bootstrap-table-next";
import Notifications, {notify} from 'react-notify-toast';
import { newArrivalActions } from "../Actions";
import cellEditFactory from 'react-bootstrap-table2-editor';



export class NewArrival extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts:[],
      newPost: {
        description: "",
        store: "",
        image: null
      },
      submitted: false,
      dropzone: null,
      selected:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPost = this.createPost.bind(this);
    this.editPost = this.editPost.bind(this);

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

  editPost() {
    this.setState({ submitted: true });

    const { newPost } = this.state;
    const { dispatch } = this.props;
 
    if (newPost.store && newPost.description && newPost.image) {
      newArrivalActions
        .update(newPost.store, newPost.description, newPost.image)
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
  deletePost(keyField) {
    this.setState({ submitted: true });

    const { newPost } = this.state;
    const { dispatch } = this.props;
 
      newArrivalActions
        .remove(keyField)
        .then(post => {
          notify.show("Post deleted!", "success", 5000);
        })
        .catch(error => {
          console.log(error);
          notify.show("Error Creating Post.", "error", 5000);
          this.setState({ error: error });
        });
    
  }
  componentDidMount() {
    const { postList } = this.state;
    newArrivalActions.getAll()
      .then(postList => {
        this.setState({ posts: postList });
      })
      .catch(error => {
        notify.show("Error Adding Item.", "error", 5000);
        this.setState({ error: error });
      });

  }
  // handleBtnClick () {
  //   if (!this.state.selected.includes(2)) {
  //     this.setState(() => ({
  //       selected: [...this.state.selected, 2]
  //     }));
  //   } else {
  //     this.setState(() => ({
  //       selected: this.state.selected.filter(x => x !== 2)
  //     }));
  //   }
  // }


  render() {
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
    };
    let { newPost, submitted, dropzone, posts } = this.state;
    // let p = [
    //   {
    //     id: '1',
    //     description: "Post ID",
    //     store: 'Nashville'
    //   },
    //   {
    //     id: '2',
    //     description: "Post ID",
    //     store: 'Nashville'
    //   },
    //   {
    //     id: '3',
    //     description: "Post ID",
    //     store: 'Nashville'
    //   }
    // ];

    let columns = [
      {
        dataField: 'id',
        text: "Post ID"
      },
      {
        dataField: 'description',
        text: "Post Description"
      },
      {
        dataField: 'store',
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
        <Card>
          <CardBody>
          <h1 className="display-4">All Posts</h1>
          <br />
          <button className="btn btn-success" onClick={() => {
              this.deletePost(this.keyField);
            }}>Delete Post</button>
          <BootstrapTable
            keyField='id'
            data={posts}
            columns={columns}
            selectRow={ selectRow } 
            cellEdit={ cellEditFactory({ mode: 'dbclick', 
               beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
            afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); } }) }
            striped
            hover
            condensed
          />
          </CardBody>
          </Card>
        </Jumbotron>
      </div>
    );
  }
}
