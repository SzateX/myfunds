import {API_BASE_URL} from "@/parameters";
import {ApiResponse} from "@/helpers/ApiResponse";

export class AccountService {
    private axios = require('axios');

    public async Register(username: string, email: string, password: string, confirmPassword: string): Promise<ApiResponse> {
        return await this.axios.post(API_BASE_URL + "Accounts/Register", {
            body: {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        });
    }

    public async Remove(userToken: string): Promise<ApiResponse> {
        return await this.axios.post(API_BASE_URL + "Accounts/Remove", {
            headers: {
                Authorization: "Bearer " + userToken
            }
        });
    }
}
