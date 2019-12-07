import AccountService from "@/services/AccountService";
import AccountDto from "@/models/account/AccountDto";

class AuthService
{
    private _loggedAccount: AccountDto | null = null;

    public get isUserLoggedIn() : boolean
    {
       return this._loggedAccount !== null;
    }

    public async loadUserData(): Promise<void> {
        const accessToken = AccountService.GetAccountToken();
        if (accessToken !== null)
        {
            try
            {
                this._loggedAccount = await AccountService.GetAccountInfo();
            }
            catch (ex)
            {
                // ignore
            }
        }
    }
}

export default new AuthService();