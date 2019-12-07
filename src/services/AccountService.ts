import axios from 'axios';
import RegisterDto from "@/models/account/RegisterDto";
import ApiResponse from "@/models/api/ApiResponse";
import LoginDto from "@/models/account/LoginDto";
import {IDENTITY_SERVICE_BASE_URL} from "@/parameters";
import AccountDto from "@/models/account/AccountDto";
import AuthService from "@/services/AuthService";


class AccountService
{
    private localStorageNameKey = 'account_token';

    public async CreateAccountAsync(model: RegisterDto): Promise<ApiResponse>
    {
        return await axios.post('Account/Register', model);
    }

    public async OAuthLogin(model: LoginDto): Promise<any>
    {
        try
        {
            let data = new FormData();

            data.set('client_id', 'ro.client');
            data.set('grant_type', 'password');
            data.set('username', model.username);
            data.set('password', model.password);
            data.set('client_secret', 'ClientSecret');
            data.set('scope', 'MyFundsApi');

            return await axios.post(IDENTITY_SERVICE_BASE_URL, data);
        }
        catch (e)
        {
            // ignored
            return null;
        }
    }

    public async SetAccountTokenAsync(token: string): Promise<void> {
        localStorage.setItem(this.localStorageNameKey, token);

        await AuthService.loadUserData();
    }

    public GetAccountToken(): string | null {
        return localStorage.getItem(this.localStorageNameKey);
    }

    public async GetAccountInfo(): Promise<AccountDto>
    {
        return (await axios.get<AccountDto>('User/GetMe')).data;
    }
}

export default new AccountService();