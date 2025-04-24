// src/api/strapi.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // change for production
})

export default api
