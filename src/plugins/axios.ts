import axios from 'axios';
import { API_BASE_URL } from "@/parameters";
import AccountService from "@/services/AccountService";

export function configureAxios(): void {
    axios.defaults.baseURL = API_BASE_URL;

    axios.interceptors.request.use(request => {
       const accessToken = AccountService.GetAccountToken();
       if (accessToken !== null)
       {
           request.headers["Authorization"] = `Bearer ${accessToken as string}`;
       }

        return request;
    });

    axios.interceptors.response.use(response => {
        return response;
    },
    error => {

        // todo

        throw error;
    });
}