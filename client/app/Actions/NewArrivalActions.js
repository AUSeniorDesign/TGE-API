import { newArrivalService } from "../Services";
import { history } from "../Helpers";

export const newArrivalActions = {
  create,
  update,
  getAll,
  remove
};

function create(store, description, file) {
  return new Promise((resolve, reject) => {
    newArrivalService.create(store, description, file).then(
      post => {
        resolve(post);
      },
      error => {
        reject(error);
      }
    );
  });
}

function update(id, store, description, file) {
  return new Promise((resolve, reject) => {
    newArrivalService.update(id, store, description, file).then(
      post => {
        resolve(post);
      },
      error => {
        reject(error);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    newArrivalService.getAll().then(
      posts => {
        resolve(posts);
      },
      error => {
        reject(error);
      }
    );
  });
}

function remove(id) {
  return dispatch => {
    dispatch(request(id));

    newArrivalService.delete(id).then(
      deleted => {
        resolve(deleted);
      },
      error => {
        reject(error);
      }
    );
  };
}
