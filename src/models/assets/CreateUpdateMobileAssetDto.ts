export default interface CreateUpdateMobileAssetDto
{
    id: number;
    inUse: boolean;
    name: string;
    price: number;
    purchaseDate: string;
    warrantyEndDate: string;
    userId: number | null;
}
