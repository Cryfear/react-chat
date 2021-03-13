import axios from "axios";

const config = {
  baseURL: "http://127.0.0.1:8888",
  withCredentials: true,
};

export default axios.create(config);