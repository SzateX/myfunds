import AccountDto from "@/models/account/AccountDto";
import RoomDto from "@/models/buildings/RoomDto";

export default interface FixedAssetDto
{
    id: number;
    inUse: boolean;
    name: string;
    price: number;
    purchaseDate: string;
    warrantyEndDate: string;
    type: number;
    typeName: string;
    roomId: number;
    room: RoomDto;
    userId: number;
    user: AccountDto;

}