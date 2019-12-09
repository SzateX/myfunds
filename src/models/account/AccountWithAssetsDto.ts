import AccountDto from "@/models/account/AccountDto";
import FixedAssetDto from "@/models/assets/FixedAssetDto";
import MobileAssetDto from "@/models/assets/MobileAssetDto";

export default interface AccountWithAssetsDto extends AccountDto
{
    fixedAssets: FixedAssetDto[];
    mobileAssets: MobileAssetDto[];
}
