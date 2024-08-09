import apiRequest from "../lib/apiRequest";

class PostServices {
  async createPost(data) {
    try {
      const response = await apiRequest.post("/api/posts/create-post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new PostServices();
