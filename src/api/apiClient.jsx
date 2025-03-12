import axios from "axios";
import {getBearerToken} from "./authentification.jsx";

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${getBearerToken()}`
    }
})

export default apiClient;