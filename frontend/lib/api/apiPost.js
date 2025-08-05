import apiClient from "../ apiClient";
import { toast } from 'react-hot-toast';

const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      toast.error("You don't have permission to modify this post");
      return Promise.reject("Permission denied");
    }
    if (error.response.status === 401) {
      toast.error("Please login to perform this action");
      return Promise.reject("Unauthorized");
    }
  }
  toast.error("An error occurred");
  return Promise.reject(error);
};

export const fetchPosts = () =>
  apiClient.get('/posts/')
    .then(res => res.data)
    .catch(handleError);

export const getPost = (id) =>
  apiClient.get(`/posts/${id}/`)
    .then(res => res.data)
    .catch(handleError);

export const createPost = (postData) =>
  apiClient.post('/posts/', postData)
    .then(res => res.data)
    .catch(handleError);

export const updatePost = (id, putData) =>
  apiClient.put(`/posts/${id}/`, putData)
    .then(res => res.data)
    .catch(handleError);

export const deletePost = (id) =>
  apiClient.delete(`/posts/${id}/`)
    .then(res => res.data)
    .catch(handleError);