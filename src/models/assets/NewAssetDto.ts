export default interface NewAssetDto
{
    inUse: boolean;
    name: string;
    price: number;
    purchaseDate: string;
    warrantyEndDate: string;
    type: string;
    userId: number | null;
    roomId: number;
}