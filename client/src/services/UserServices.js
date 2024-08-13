import apiRequest from "../lib/apiRequest";
class UserServices {
  async getUser(id) {
    const response = await apiRequest.post("/api/user/get-user", {id});
    return response.data.data;
  }
}
export default new UserServices();
