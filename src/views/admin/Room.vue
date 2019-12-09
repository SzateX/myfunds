<template>
    <div v-if="roomInfo !== null">
        <h1>Room info</h1>
        <v-card>
            <v-card-title>Building</v-card-title>
            <v-card-subtitle>This is an address of the building {{ roomInfo.building.id }}</v-card-subtitle>
            <v-card-text>
                {{ roomInfo.building.address.street }}<br />
                {{ roomInfo.building.address.postcode }}, {{ roomInfo.building.address.city }}<br />
                {{ roomInfo.building.address.country }}
            </v-card-text>
            <v-card-actions>
                <v-btn outlined color="info" :to="{ name: 'admin.building', params: { id: roomInfo.building.id } }">INFO</v-btn>
            </v-card-actions>
        </v-card>

        <br />

        <v-card :loading="loading">
            <v-card-title>Fixed assets</v-card-title>
            <v-card-subtitle>Assets linked with this room</v-card-subtitle>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th class="text-left">In Use</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">Purchase Date</th>
                            <th class="text-left">Warranty Date</th>
                            <th class="text-left">Type</th>
                            <th class="text-left">User</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in roomInfo.fixedAssets">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.inUse }}</td>
                            <td>{{ entry.name }}</td>
                            <td>{{ entry.price }} PLN</td>
                            <td>{{ new Date(entry.purchaseDate).toLocaleDateString() }}</td>
                            <td>{{ new Date(entry.warrantyEndDate).toLocaleDateString() }}</td>
                            <td>{{ entry.typeName }}</td>
                            <td>
                                <v-select v-if="entry.type === 2" :items="allUsers" item-text="userName" item-value="id" :value="entry.userId" single-line @change="modifyUserAsset(entry.id, $event)" />
                                <span v-else>n/a</span>
                            </td>
<!--                            <td class="text-right"><v-btn :to="{ name: 'admin.room', params: { id: entry.id } }" color="info" outlined>INFO</v-btn></td>-->
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card :loading="loading3">
            <v-card-title>Add new asset</v-card-title>
            <v-card-subtitle>Here you can add new asset</v-card-subtitle>
            <v-card-text>
                <v-alert v-if="errors.length > 0" type="error" outlined>
                    Whoops... Something went wrong! Try to fix issues listed below:<br />
                    <ul>
                        <li :key="index" v-for="(entry, index) in errors">{{ entry }}</li>
                    </ul>
                </v-alert>
                <v-form ref="formAddAsset">
                    <v-text-field label="Name" v-model="newAsset.name" type="text" />
                    <v-text-field label="Price" v-model="newAsset.price" type="number" />
                    <v-select :items="assetTypes" label="Type" v-model="newAsset.type" />

                    <v-dialog
                            ref="dialog"
                            v-model="purchaseDate"
                            :return-value.sync="newAsset.purchaseDate"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="newAsset.purchaseDate" label="Purchase date" prepend-icon="mdi-calendar" readonly v-on="on" />
                        </template>
                        <v-date-picker v-model="newAsset.purchaseDate" scrollable>
                            <v-spacer />
                            <v-btn text color="primary" @click="purchaseDate = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(newAsset.purchaseDate)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog
                        ref="dialog2"
                        v-model="warrantyDate"
                        :return-value.sync="newAsset.warrantyEndDate"
                        persistent
                        width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="newAsset.warrantyEndDate" label="Warranty end date" prepend-icon="mdi-calendar" readonly v-on="on" />
                        </template>
                        <v-date-picker v-model="newAsset.warrantyEndDate" scrollable>
                            <v-spacer />
                            <v-btn text color="primary" @click="warrantyDate = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog2.save(newAsset.warrantyEndDate)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="createNewAsset()">ADD NEW ASSET</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import RoomDto from "../../models/buildings/RoomDto";
    import NewAssetDto from "@/models/assets/NewAssetDto";
    import {GetStringsFromValidationResponse} from "@/helpers/ValidationHelper";
    import FixedAssetDto from "@/models/assets/FixedAssetDto";
    import AccountDto from "@/models/account/AccountDto";
    import AdminUserService from "@/services/AdminUserService";
    import UpdateAssetDto from "@/models/assets/UpdateAssetDto";

    @Component
    export default class Room extends Vue
    {
        private roomInfo: RoomDto | null = null;

        private loading = false;
        private loading3 = false;

        private newAsset: NewAssetDto = {
            inUse: false,
            name: '',
            price: 0,
            purchaseDate: '',
            roomId: 0,
            type: '',
            userId: null,
            warrantyEndDate: ''
        };

        private allUsers: AccountDto[] | null = null;

        private editAssetData: FixedAssetDto | null = null;

        private assetTypes = ['Static', 'Rentable'];
        private warrantyDate = false;
        private purchaseDate = false;

        private editAssetDialog = false;

        private errors: string[] = [];

        public clearForm(): void {
            this.errors = [];
            this.newAsset = {
                inUse: false,
                name: '',
                price: 0,
                purchaseDate: '',
                roomId: 0,
                type: '',
                userId: null,
                warrantyEndDate: ''
            };
        }

        public async createNewAsset(): Promise<void>
        {
            this.errors = [];
            this.newAsset.roomId = parseInt(this.$route.params.id);

            if (this.newAsset.price <= 0)
            {
                this.errors.push("Bad price");
                return;
            }

            try
            {
                this.loading3 = true;
                const response = await AdminBuildingsService.CreateNewFixedAsset(this.newAsset);

                if (response.status === 201)
                {
                    this.$toasted.show('Asset created successfully.', {
                        duration: 5000
                    });
                    this.clearForm();
                    this.loadData();
                }
            }
            catch (ex)
            {
                this.errors = GetStringsFromValidationResponse(ex.response.data);
            }
            finally {
                this.loading3 = false;
            }
        }

        public async created() : Promise<void>
        {
            await this.loadData();
        }

        public async modifyUserAsset(assetId: number, user: number): Promise<void>
        {

            this.loading = true;

            const assetData = await AdminBuildingsService.GetFixedAsset(assetId);
            const updatedAsset: UpdateAssetDto = {
                id: assetData.id,
                inUse: user !== 0,
                name: assetData.name,
                price: assetData.price,
                purchaseDate: assetData.purchaseDate,
                roomId: assetData.roomId as any,
                type: assetData.typeName,
                userId: user === 0 ? null : user,
                warrantyEndDate: assetData.warrantyEndDate
            };

            const response = await AdminBuildingsService.UpdateFixedAsset(updatedAsset);
            if (response.status === 200)
            {
                this.$toasted.show('User was changed.', { duration: 5000 });
                await this.loadData();
                this.loading = false;
            }
        }

        public async loadData(): Promise<void>
        {
            this.allUsers = await AdminUserService.GetAllUsersAsync();
            this.allUsers.push({
                userName: '-',
                email: '',
                id: 0,
                isAdmin: false
            });
            this.roomInfo = await AdminBuildingsService.GetRoomDataAsync(parseInt(this.$route.params.id));
        }
    }

</script>
