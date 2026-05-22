import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE,
});

export const authHeaders = (idToken) => {
  if (!idToken) {
    return { headers: {} };
  }

  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };
};