import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:1001",
  withCredentials: true,
});
export default apiRequest;
