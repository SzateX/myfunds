import axios from 'axios';
import BuildingDto from "@/models/buildings/BuildingDto";
import RoomDto from "@/models/buildings/RoomDto";
import NewAssetDto from "@/models/assets/NewAssetDto";
import ApiResponse from "@/models/api/ApiResponse";

class AdminBuildingsService
{
    public async GetAllBuildings(): Promise<BuildingDto[]>
    {
        return (await axios.get('Admin/GetAllBuildings')).data;
    }

    public async GetBuildingDataAsync(buildingId: number): Promise<BuildingDto>
    {
        return (await axios.get('Admin/GetBuildingWithAssets/' + buildingId)).data;
    }

    public async GetRoomDataAsync(roomId: number): Promise<RoomDto>
    {
        return (await axios.get('Admin/GetRoomWithAssets/' + roomId)).data;
    }

    public async CreateNewFixedAsset(model: NewAssetDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/AddFixedAsset', model);
    }
}

export default new AdminBuildingsService();