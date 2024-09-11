import axios from "axios";

//  Creating Instance
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get Method using axios API
export const getData = async () => {
  return api.get("/posts");
};

// delete method using axios API
export const deleteData = async (id) => {
  return api.delete(`/posts/${id}`);
};

// post method using axios API
export const postData = async (post) => {
  return api.post("/posts", post);
};

// put method using axios API
export const updateData = async (id, post) => {
  return api.put(`/posts/${id}`, post);
};
