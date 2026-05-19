import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({ baseURL: API_BASE });

export const authHeaders = (idToken) => ({
  headers: { Authorization: `Bearer ${idToken}` },
});
