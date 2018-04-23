export const itemService = {
  create,
  update,
  getAll,
  remove
};

const base_url = "http://tge.mybluemix.net"
 function create(name, quantity, description, images,  price ) {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('quantity', quantity);
  // formData.append('sku', sku);
  formData.append('description', description);
  formData.append('images', images);
  // formData.append('productIdType', productIdType);
  // formData.append('brand', brand);
  formData.append('price', price);


  console.log(formData);
  const requestOptions = {
    method: "POST",
    credentials: 'include',
    body: formData
  };

  return fetch(`${base_url}/items`, requestOptions)
    .then(response => {
      // Check if user logged in
      if (!response.ok) {
        // Not logged in, 
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

  return fetch(`${base_url}/items/`, requestOptions).then(handleResponse);
}

function update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(item)
  };

  return fetch(`${base_url}/items/` + item.sku, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetch(`${base_url}/items/` + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}