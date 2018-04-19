export const itemService = {
    getAll,
    getById,
    update,
    remove
  };

 

function getAll() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
  
    return fetch("/items", requestOptions).then(handleResponse);

  }
  
  function getById(id) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
  
    return fetch("/items/" + _id, requestOptions).then(handleResponse);
  }

  function update(item) {
    const requestOptions = {
      method: "PUT",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(item)
    };
  
    return fetch("/items/" + item.id, requestOptions).then(handleResponse);
  }

  function remove(id) {
    const requestOptions = {
      method: "DELETE",
      headers: authHeader()
    };
  
    return fetch("/items/" + id, requestOptions).then(handleResponse);
  }
  
  function handleResponse(response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
  
    return response.json();
  }