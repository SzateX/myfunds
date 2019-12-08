import BuildingDto from "@/models/buildings/BuildingDto";
import FixedAssetDto from "@/models/assets/FixedAssetDto";

export default interface RoomDto
{
    id: number;
    area: number;
    floor: number;
    type: number;
    typeName: string;
    buildingId: number;
    building: BuildingDto;
    fixedAssets: FixedAssetDto[];
}