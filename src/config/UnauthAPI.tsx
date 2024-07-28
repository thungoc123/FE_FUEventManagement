import axios from "axios";
const config = {
    baseURL: "http://localhost:7979/",
    
}

const UnauthAPI = axios.create(config);

export default UnauthAPI;