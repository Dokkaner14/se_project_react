const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return handleServerResponse(res);
  });
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return handleServerResponse(res);
  });
}

export function removeItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => handleServerResponse(res));
}
