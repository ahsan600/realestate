import apiRequest from "../lib/apiRequest";

class PostServices {
  async createPost(data) {
    try {
      const response = await apiRequest.post("/api/posts/create-post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id, data) {
    try {
      const response = await apiRequest.patch(
        "/api/posts/update-post/" + id,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getSinglePost(id) {
    try {
      const response = await apiRequest.get("/api/posts/get-post/" + id);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserPosts(id) {
    try {
      const response = await apiRequest.get("/api/posts/get-posts/" + id);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUserPost(id) {
    try {
      const response = await apiRequest.delete("/api/posts/delete-post/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getListPost(query) {
    try {
      const queryString = new URLSearchParams(query).toString();
      console.log(query)
      const response = await apiRequest.get(
        `/api/posts/get-list-posts?${queryString}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new PostServices();
