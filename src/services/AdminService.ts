import {API_BASE_URL} from "@/parameters";
import {ApiResponse} from "@/helpers/ApiResponse";

export class AdminService {
    private axios = require('axios');

    public async GiveUserAdminRole(userToken: string, userId: number): Promise<ApiResponse>{
            return await this.axios.post(API_BASE_URL + "Admin/GiveUserAdminRole/" + userId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }});
    }

    public async RemoveAdminRole(userToken: string, userId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "Admin/RemoveAdminRole/" + userId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }});
    }

    public async GetUserWithAssets(userToken: string, userId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "Admin/GetUserWithAssets/" + userId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllUsersWithAssets(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "Admin/GetAllUsersWithAssets", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
        }

    public async GetFixedAssetWithArchives(userToken: string, fixedAssetId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "Admin/GetFixedAssetWithArchives/" + fixedAssetId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetMobileAssetWithArchives(userToken: string, mobileAssetId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "Admin/GetMobileAssetWithArchives/" + mobileAssetId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetRoomWithAssets(userToken: string, roomId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "Admin/GetRoomWithAssets/" + roomId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetBuildingWithAssets(userToken: string, buildingId: number) {
        try {
            return await this.axios.get(API_BASE_URL + "Admin/GetBuildingWithAssets/" + buildingId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    public async ExportExcel(userToken: string) {
        try {
            return await this.axios.post(API_BASE_URL + "Admin/ExportExcel/", {
                headers: {
                    Authorization: "Bearer " + userToken
                }});
        }
        catch (e) {
            console.log(e);
        }
    }
}
