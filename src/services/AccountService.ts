import axios from 'axios';
import RegisterDto from "@/models/account/RegisterDto";
import ApiResponse from "@/models/api/ApiResponse";


class AccountService
{


    public async CreateAccountAsync(model: RegisterDto): Promise<ApiResponse>
    {
        return await axios.post('Account/Register', model);
    }

    // public async Remove(userToken: string): Promise<ApiResponse> {
    //     return await this.axios.post(API_BASE_URL + "Accounts/Remove", {
    //         headers: {
    //             Authorization: "Bearer " + userToken
    //         }
    //     });
    // }
}

export default new AccountService();