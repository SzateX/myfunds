import axios from 'axios';
import AccountDto from "@/models/account/AccountDto";

class AdminUserService
{
    public async GetAllUsersAsync(): Promise<AccountDto[]>
    {
        return (await axios.get('Admin/GetAllUsers')).data;
    }
}

export default new AdminUserService();