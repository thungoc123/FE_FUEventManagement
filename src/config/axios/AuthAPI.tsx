import axios from "axios";

// FOR PRODUCTION
const config = {
  baseURL: "https://eventmanagementfu.azurewebsites.net/",
  headers: {
   "Content-Type": "application/json",
  },
}

const AuthAPI = axios.create(config);

export default AuthAPI;
