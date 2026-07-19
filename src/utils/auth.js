const baseUrl = "http://localhost:3001";
const defaultHeaders = {
  "Content-Type": "application/json",
};

function handleResponse(res) {
  if (res.ok) return res.json();

  return res
    .json()
    .then((body) => Promise.reject(body.message || res.status))
    .catch(() => Promise.reject(res.status));
}

function getHeaders(withAuth = false, token) {
  const headers = { ...defaultHeaders };
  if (withAuth) {
    const authToken = token || localStorage.getItem("jwt");
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
}

export function register({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
}

export function authorize({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getHeaders(true, token),
  }).then(handleResponse);
}

export default { register, authorize, checkToken };
