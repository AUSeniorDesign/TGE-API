import { orderService } from "../Services";
import { history } from "../Helpers";

export const orderActions = {
  create,
  update,
  getAll,
  remove
};

function create(name, quantity,description, images, productIdType, brand, price) {
  return new Promise((resolve, reject) => {
    orderService.create(name, quantity,description, images, productIdType, brand, price).then(
        order => {
        resolve(order);
      },
      error => {
        reject(error);
      }
    );
  });
}

function update(id, store, description, file) {
  return new Promise((resolve, reject) => {
    orderService.update(name, quantity,description, images, price).then(
      order => {
        resolve(order);
      },
      error => {
        reject(error);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    orderService.getAll().then(
        orders => {
        resolve(orders);
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

    orderService.delete(id).then(
      deleted => {
        resolve(deleted);
      },
      error => {
        reject(error);
      }
    );
  };
}