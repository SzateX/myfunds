import AddressDto from "@/models/buildings/AddressDto";
import RoomDto from "@/models/buildings/RoomDto";

export default interface BuildingDto
{
    id: number;
    address: AddressDto;
    rooms: RoomDto[];
}