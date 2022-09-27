import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'https://sebastianmlottask4.herokuapp.com/'
  baseURL: "http://localhost:3001/"
})