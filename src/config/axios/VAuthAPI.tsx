import axios from "axios";

// FOR PRODUCTION
const config = {
  baseURL: "https://eventmanagementfu.azurewebsites.net/",
  headers: {
   "Content-Type": "application/json",
  },
}

const VAuthAPI = axios.create(config);

export default VAuthAPI;
