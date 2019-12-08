export default interface UpdateAssetDto
{
    "id": number,
    "inUse": boolean,
    "name": string,
    "price": number,
    "purchaseDate": string,
    "warrantyEndDate": string,
    "type": string,
    "userId": number | null,
    "roomId": number | null
}