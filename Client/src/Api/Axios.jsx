import axios from "axios";

//The url of the backend server
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

export default axios;