import axios from 'axios';
import BuildingDto from "@/models/buildings/BuildingDto";
import RoomDto from "@/models/buildings/RoomDto";
import NewAssetDto from "@/models/assets/NewAssetDto";
import ApiResponse from "@/models/api/ApiResponse";
import UpdateAssetDto from "@/models/assets/UpdateAssetDto";
import FixedAssetDto from "@/models/assets/FixedAssetDto";

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

    public async UpdateFixedAsset(model: UpdateAssetDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/UpdateFixedAsset', model);
    }

    public async GetFixedAsset(assetId: number): Promise<FixedAssetDto>
    {
        return (await axios.get('Admin/GetFixedAsset/' + assetId)).data;
    }
}

export default new AdminBuildingsService();