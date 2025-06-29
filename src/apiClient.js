// src/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9999', // Change this to your production URL when deploying
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  if (token) {
    console.log('token ==== :'+token)
    config.headers['Authorization'] = token; // Attach the token to the headers
  }
  return config;
});

export default apiClient;
