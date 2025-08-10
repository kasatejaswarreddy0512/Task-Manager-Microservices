import axios from "axios";

// ✅ Base URL setup
export const BASE_URL = "http://localhost:9090";

// ✅ Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// ✅ Token setup
export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
