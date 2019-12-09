import AccountWithAssetsDto from "@/models/account/AccountWithAssetsDto";

export default interface MobileAssetDto
{
    id: number;
    name: string;
    inUse: boolean;
    price: number;
    purchaseDate: string;
    warrantyEndDate: string;
    userId: number;
    user: AccountWithAssetsDto;
}
