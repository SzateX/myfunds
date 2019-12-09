<template>
    <div>
        <h1>Mobile Assets</h1>

        <v-card :loading="loading">
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
                            <th class="text-left">User</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in allMobileAssets">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.inUse }}</td>
                            <td>{{ entry.name }}</td>
                            <td>{{ entry.price }} PLN</td>
                            <td>{{ new Date(entry.purchaseDate).toLocaleDateString() }}</td>
                            <td>{{ new Date(entry.warrantyEndDate).toLocaleDateString() }}</td>
                            <td>
                                <v-select :items="allUsers" item-text="userName" item-value="id" :value="entry.userId" single-line @change="modifyUserAsset(entry.id, $event)" />
                            </td>
                            <!--                            <td class="text-right"><v-btn :to="{ name: 'admin.room', params: { id: entry.id } }" color="info" outlined>INFO</v-btn></td>-->
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card v-if="newAsset !== null" :loading="loading2">
            <v-card-title>Add new mobile asset</v-card-title>
            <v-card-subtitle>Here you can add new mobile asset</v-card-subtitle>
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
    import MobileAssetDto from "@/models/assets/MobileAssetDto";
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import AccountDto from "@/models/account/AccountDto";
    import AdminUserService from "@/services/AdminUserService";
    import CreateUpdateMobileAssetDto from "@/models/assets/CreateUpdateMobileAssetDto";
    import {GetStringsFromValidationResponse} from "@/helpers/ValidationHelper";

    @Component
    export default class MobileAssets extends Vue
    {
        private loading = true;
        private loading2 = false;
        private allMobileAssets: MobileAssetDto[] = [];
        private allUsers: AccountDto[] = [];
        private warrantyDate = false;
        private purchaseDate = false;


        private newAsset: CreateUpdateMobileAssetDto | null = null;
        private errors: string[] = [];

        public async createNewAsset(): Promise<void> {
            if (this.newAsset === null)
                return;

            this.errors = [];

            if (this.newAsset.price <= 0)
            {
                this.errors.push("Bad price");
                return;
            }

            try
            {
                this.loading2 = true;
                const response = await AdminBuildingsService.CreateNewMobileAsset(this.newAsset);

                if (response.status === 201)
                {
                    this.$toasted.show('Asset created successfully.', {
                        duration: 5000
                    });
                    this.clearForm();
                    await this.loadData();
                }
            }
            catch (ex)
            {
                this.errors = GetStringsFromValidationResponse(ex.response.data);
            }
            finally {
                this.loading2 = false;
            }
        }

        public clearForm(): void {
            this.newAsset = {
              id: 0,
              inUse: false,
              name: '',
              price: 0,
              purchaseDate: '',
              userId: null,
              warrantyEndDate: ''
            };
        }

        public async created(): Promise<void>
        {
            await this.loadData();
            this.clearForm();
            this.loading = false;
        }

        public async loadData(): Promise<void>
        {
            this.allMobileAssets = await AdminBuildingsService.GetAllMobileAssetsAsync();
            this.allUsers = await AdminUserService.GetAllUsersAsync();
            this.allUsers.push({
                userName: '-',
                email: '',
                id: 0,
                isAdmin: false
            });
        }

        public async modifyUserAsset(assetId: number, userId: number): Promise<void>
        {
            this.loading = true;

            const mobileAsset = await AdminBuildingsService.GetMobileAssetAsync(assetId);
            const updateMobileAsset: CreateUpdateMobileAssetDto = {
                id: mobileAsset.id,
                inUse: userId !== 0,
                name: mobileAsset.name,
                price: mobileAsset.price,
                purchaseDate: mobileAsset.purchaseDate,
                warrantyEndDate: mobileAsset.warrantyEndDate,
                userId: userId === 0 ? null : userId
            };
            const response = await AdminBuildingsService.UpdateMobileAssetAsync(updateMobileAsset);

            if (response.status === 200)
            {
                this.$toasted.show('User was changed.', { duration: 5000 });
                await this.loadData();
                this.loading = false;
            }


        }
    }

</script>

<style scoped>

</style>
