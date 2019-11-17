import {API_BASE_URL} from "@/parameters";
import {ApiResponse} from "@/helpers/ApiResponse";

export class UserService {
    private axios = require('axios');

    public async GetUser(userToken: string, userId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetUser/" + userId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllUsers(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllUsers", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetFixedAsset(userToken: string, fixedAssetId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetFixedAsset/" + fixedAssetId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllFixedAssets(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllFixedAssets", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetMobileAsset(userToken: string, mobileAssetId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetMobileAsset/" + mobileAssetId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllMobileAssets(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllMobileAssets", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetMe(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetMe", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetMeWithAssets(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetMeWithAssets", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetRoom(userToken: string, roomId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetRoom/" + roomId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllRooms(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllRooms", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetBuilding(userToken: string, buildingId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetBuilding/" + buildingId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllBuildings(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllBuildings", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetBuildingWithRooms(userToken: string, buildingId: number): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetBuildingWithRooms/" + buildingId, {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async GetAllBuildingsWithRooms(userToken: string): Promise<ApiResponse> {
            return await this.axios.get(API_BASE_URL + "User/GetAllBuildingsWithRooms", {
                headers: {
                    Authorization: "Bearer " + userToken
                }
            });
    }

    public async UpdateFixedAsset(userToken: string, id: number, inUse: boolean, name: string, price: number, purchaseDate: Date, warrantyEndDate: Date, type: string, userId: number, roomId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/UpdateFixedAsset", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    inUse: inUse,
                    name: name,
                    price: price,
                    purchaseDate: purchaseDate.toISOString(),
                    warrantyEndDate: warrantyEndDate.toISOString(),
                    type: type,
                    userId: userId,
                    roomId: roomId
                }});
    }

    public async AddFixedAsset(userToken: string, id: number, inUse: boolean, name: string, price: number, purchaseDate: Date, warrantyEndDate: Date, type: string, userId: number, roomId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/AddFixedAsset", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    inUse: inUse,
                    name: name,
                    price: price,
                    purchaseDate: purchaseDate.toISOString(),
                    warrantyEndDate: warrantyEndDate.toISOString(),
                    type: type,
                    userId: userId,
                    roomId: roomId
                }});
    }

    public async UpdateMobileAsset(userToken: string, id: number, inUse: boolean, name: string, price: number, purchaseDate: Date, warrantyEndDate: Date, userId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/UpdateMobileAsset", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    inUse: inUse,
                    name: name,
                    price: price,
                    purchaseDate: purchaseDate.toISOString(),
                    warrantyEndDate: warrantyEndDate.toISOString(),
                    userId: userId,
                }});
    }

    public async AddMobileAsset(userToken: string, id: number, inUse: boolean, name: string, price: number, purchaseDate: Date, warrantyEndDate: Date, userId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/AddMobileAsset", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    inUse: inUse,
                    name: name,
                    price: price,
                    purchaseDate: purchaseDate.toISOString(),
                    warrantyEndDate: warrantyEndDate.toISOString(),
                    userId: userId,
                }});
    }

    public async UpdateRoom(userToken: string, id: number, area: number, floor: number, type: string, buildingId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/UpdateRoom", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    area: area,
                    floor: floor,
                    type: type,
                    buildingId: buildingId
                }});
    }

    public async AddRoom(userToken: string, id: number, area: number, floor: number, type: string, buildingId: number): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/AddRoom", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    area: area,
                    floor: floor,
                    type: type,
                    buildingId: buildingId
                }});
    }

    public async UpdateBuilding(userToken: string, id: number, country: string, city: string, street: string, postcode: string): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/UpdateBuilding", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    country: country,
                    city: city,
                    street: street,
                    postcode: postcode
                }});

    }

    public async AddBuilding(userToken: string, id: number, country: string, city: string, street: string, postcode: string): Promise<ApiResponse> {
            return await this.axios.post(API_BASE_URL + "User/AddBuilding", {
                headers: {
                    Authorization: "Bearer " + userToken
                },
                body: {
                    id: id,
                    country: country,
                    city: city,
                    street: street,
                    postcode: postcode
                }});
    }
}
