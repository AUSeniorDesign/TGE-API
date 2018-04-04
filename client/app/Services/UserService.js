export const userService = {
  login,
  logout,
  loggedIn,
  signUp,
  getAll,
  getById,
  update,
  remove
};

function loggedIn() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("/users/me", requestOptions)
    .then(response => {
      // Check if user logged in
      if (!response.ok) {
        // Not logged in, 
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch("/users/", requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("/users", requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("/users/" + _id, requestOptions).then(handleResponse);
}

function signUp(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  localStorage.setItem('user', JSON.stringify(user));

  return fetch("/users/signup", requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch("/users/" + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch("/users/" + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
