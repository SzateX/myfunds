import axios from 'axios';
import BuildingDto from "@/models/buildings/BuildingDto";

class AdminBuildingsService
{
    public async GetAllBuildings(): Promise<BuildingDto[]>
    {
        return (await axios.get('Admin/GetAllBuildings')).data;
    }
}

export default new AdminBuildingsService();