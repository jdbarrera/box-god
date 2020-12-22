import axios from "axios";

const axiosBEOG = axios.create({
  baseURL: process.env.REACT_APP_WORDPRESS_URL
});

export default axiosBEOG;