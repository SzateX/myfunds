import axios from 'axios';
import BuildingDto from "@/models/buildings/BuildingDto";
import RoomDto from "@/models/buildings/RoomDto";
import NewAssetDto from "@/models/assets/NewAssetDto";
import ApiResponse from "@/models/api/ApiResponse";
import UpdateAssetDto from "@/models/assets/UpdateAssetDto";
import FixedAssetDto from "@/models/assets/FixedAssetDto";
import MobileAssetDto from "@/models/assets/MobileAssetDto";
import CreateUpdateMobileAssetDto from "@/models/assets/CreateUpdateMobileAssetDto";
import AddBuildingDto from "@/models/buildings/AddBuildingDto";
import AddRoomDto from "@/models/buildings/AddRoomDto";

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

    public async GetAllMobileAssetsAsync(): Promise<MobileAssetDto[]>
    {
        return (await axios.get('Admin/GetAllMobileAssets')).data;
    }

    public async GetMobileAssetAsync(assetId: number): Promise<MobileAssetDto>
    {
        return (await axios.get('Admin/GetMobileAsset/' + assetId)).data;
    }

    public async UpdateMobileAssetAsync(model: CreateUpdateMobileAssetDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/UpdateMobileAsset', model);
    }

    public async CreateNewMobileAsset(model: CreateUpdateMobileAssetDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/AddMobileAsset', model);
    }

    public async CreateNewBuilding(model: AddBuildingDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/AddBuilding', model);
    }

    public async CreateNewRoomAsync(model: AddRoomDto): Promise<ApiResponse>
    {
        return await axios.post('Admin/AddRoom', model);
    }


}

export default new AdminBuildingsService();
