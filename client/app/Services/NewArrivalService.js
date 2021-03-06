export const newArrivalService = {
  create,
  update,
  getAll,
  remove
};

const base_url = "http://tge.mybluemix.net"
// const base_url = "http://0.0.0.0:3000"

function create(store, description, file) {
  let formData = new FormData();
  formData.append('store', store);
  formData.append('description', description);
  formData.append('image', file);
  console.log(formData);

  const requestOptions = {
    method: "POST",
    credentials: 'include',
    body: formData
  };

  return fetch(`${base_url}/feed`, requestOptions)
    .then(response => {
      
      if (!response.ok) {
        console.log(response.json());
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(post => {
      return post;
    });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetch(`${base_url}/feed/`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(user)
  };

  return fetch(`${base_url}/feed/` + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetch(`${base_url}/users/` + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
