const baseUrl = "http://localhost:3001";
const defaultHeaders = {
  "Content-Type": "application/json",
};

function getHeaders(withAuth = false) {
  const headers = { ...defaultHeaders };
  if (withAuth) {
    const token = localStorage.getItem("jwt");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

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
    headers: getHeaders(true),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return handleServerResponse(res);
  });
}

export function removeItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getHeaders(true),
  }).then((res) => handleServerResponse(res));
}

export function updateUserProfile({ name, avatar }, token) {
  const headers = { ...defaultHeaders };
  const authToken = token || localStorage.getItem("jwt");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ name, avatar }),
  }).then((res) => handleServerResponse(res));
}

export function addCardLike(id, token) {
  const headers = { ...defaultHeaders };
  const authToken = token || localStorage.getItem("jwt");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers,
  }).then((res) => handleServerResponse(res));
}

export function removeCardLike(id, token) {
  const headers = { ...defaultHeaders };
  const authToken = token || localStorage.getItem("jwt");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers,
  }).then((res) => handleServerResponse(res));
}
