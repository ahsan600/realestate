import apiRequest from "../lib/apiRequest";

class AuthServices {
  async login(data) {
    try {
      const { email, password } = data;
      const response = await apiRequest.post("/api/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async signin(data) {
    try {
      const response = await apiRequest.post("/api/auth/register", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      const response = await apiRequest.get("/api/auth/logout");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new AuthServices();
