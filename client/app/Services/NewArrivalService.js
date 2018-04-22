export const newArrivalService = {
  create,
  update,
  getAll,
  remove
};

const base_url = "http://localhost:3000"

// Quick function to check if user is currently logged in 
// and is of correct user type to access the Admin Portal
function create() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`${base_url}/users/me`, requestOptions)
    .then(response => {
      // Check if user logged in
      if (!response.ok) {
        // Not logged in, 
        return Promise.reject(response.statusText);
      }

      return false;
    })
    .then(user => {
      if (user && (user.type == 'admin' || user.type == 'employee')) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user.type == 'admin' || user.type == 'employee'
    });
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${base_url}/users/login`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      if (user && (user.type == 'admin' || user.type == 'employee')) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(JSON.parse(localStorage.user).type);
      }
      return user;
    });
}

function logout() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`${base_url}/users/logout`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response;
    })
    .then(result => {
      localStorage.removeItem("user");

      return result;
    });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${base_url}/users/`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${base_url}/users/` + _id, requestOptions).then(handleResponse);
}

function signUp(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${base_url}/users/signup/`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${base_url}/users/` + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${base_url}/users/` + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
