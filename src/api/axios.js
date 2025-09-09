import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true, //this is v imp i forgot it
});
