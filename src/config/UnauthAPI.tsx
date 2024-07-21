import axios from "axios";
const config = {
    baseURL: "https://eventmanagementfu.azurewebsites.net/Auth/",
    
}

const UnauthAPI = axios.create(config);

export default UnauthAPI;