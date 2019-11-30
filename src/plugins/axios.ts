import axios from 'axios';
import { API_BASE_URL } from "@/parameters";

export function configureAxios(): void {
    axios.defaults.baseURL = API_BASE_URL;
}