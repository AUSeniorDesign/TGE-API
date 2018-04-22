import { userService } from "../Services";
import { history } from "../Helpers";

export const userActions = {
  login,
  logout,
  loggedIn,
  signUp,
  getAll,
  remove
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    userService.login(username, password).then(
      user => {
        resolve(user);
      },
      error => {
        reject(error);
      }
    );
  });
}

function logout() {
  userService.logout();
}

function loggedIn() {
  userService.loggedIn();
}

function signUp(user) {
  return new Promise((resolve, reject) => {
    userService.signUp(user).then(
      user => {
        resolve(user);
      },
      error => {
        reject(error);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    userService.getAll().then(
      users => {
        resolve(users);
      },
      error => {
        reject(error);
      }
    );
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => {
        dispatch(success(id));
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
