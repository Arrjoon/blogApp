import apiClient from '../apiClient';

export const fetchPosts = () =>
  apiClient.get('/posts/').then(res => res.data);

export const getPost = (id) =>
  apiClient.get(`/posts/${id}/`).then(res => res.data);

export const createPost = (postData) =>
  apiClient.post('/posts/', postData).then(res => res.data);
