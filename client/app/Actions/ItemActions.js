import { itemService } from "../Services";
import { history } from "../Helpers";



export const itemActions = {
  create,
  update,
  getAll,
  remove
};

function create(name, quantity,description, images, productIdType, brand, price) {
  return new Promise((resolve, reject) => {
    itemService.create(name, quantity,description, images, productIdType, brand, price).then(
      item => {
        resolve(item);
      },
      error => {
        reject(error);
      }
    );
  });
}

function update(id, store, description, file) {
  return new Promise((resolve, reject) => {
    itemService.update(name, quantity,description, images, price).then(
      item => {
        resolve(item);
      },
      error => {
        reject(error);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    itemService.getAll().then(
        items => {
        resolve(items);
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

    itemService.delete(id).then(
      deleted => {
        resolve(deleted);
      },
      error => {
        reject(error);
      }
    );
  };
}