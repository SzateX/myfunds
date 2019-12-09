<template>
    <main>
        <h1>All Buildings</h1>
        <v-card :loading="loading">
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th style="width: 70%;" class="text-left">Address</th>
                            <th style="width: 20%;" class="text-right">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in buildings">
                            <td>{{ entry.id }}</td>
                            <td>{{ getAddressString(entry.address) }}</td>
                            <td class="text-right">
                                <v-item-group >
                                    <v-btn outlined color="info" :to="{ name: 'admin.building', params: { id: entry.id } }">INFO</v-btn>&nbsp;
                                </v-item-group>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card :loading="loading2" v-if="newBuilding !== null">
            <v-card-title>Add new building</v-card-title>
            <v-card-subtitle>Here you can add new asset</v-card-subtitle>
            <v-card-text>
                <v-alert v-if="errors.length > 0" type="error" outlined>
                    Whoops... Something went wrong! Try to fix issues listed below:<br />
                    <ul>
                        <li :key="index" v-for="(entry, index) in errors">{{ entry }}</li>
                    </ul>
                </v-alert>
                <v-form ref="formAddAsset">
                    <v-text-field label="Street" v-model="newBuilding.street" type="text" />
                    <v-text-field label="City" v-model="newBuilding.city" type="text" />
                    <v-text-field label="Postcode" v-model="newBuilding.postcode" type="text" />
                    <v-text-field label="Country" v-model="newBuilding.country" type="text" />

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="createNewBuilding()">ADD NEW BUILDING</v-btn>
            </v-card-actions>
        </v-card>
    </main>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import BuildingDto from "@/models/buildings/BuildingDto";
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import AddressDto from "@/models/buildings/AddressDto";
    import AddBuildingDto from "@/models/buildings/AddBuildingDto";
    import {GetStringsFromValidationResponse} from "@/helpers/ValidationHelper";

    @Component
    export default class AllBuildings extends Vue
    {
        private buildings: BuildingDto[] = [];
        private loading = true;
        private loading2 = false;
        private newBuilding: AddBuildingDto | null = null;

        private errors: string[] = [];

        public async created(): Promise<void>
        {
            await this.loadData();
            this.loading = false;
        }

        public async loadData(): Promise<void> {
            this.buildings = await AdminBuildingsService.GetAllBuildings();
            this.clearForm();

        }

        public async createNewBuilding(): Promise<void> {
            if (this.newBuilding === null)
                return;

            this.errors = [];

            try
            {
                this.loading2 = true;
                const response = await AdminBuildingsService.CreateNewBuilding(this.newBuilding);

                if (response.status === 201)
                {
                    this.$toasted.show('Building created successfully.', {
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
            finally
            {
                this.loading2 = false;
            }
        }

        public clearForm(): void {
            this.newBuilding = {
              city: '',
              country: '',
              id: 0,
              postcode: '',
              street: ''
            };
        }

        public getAddressString(address: AddressDto): string
        {
            return `${address.street}, ${address.postcode} ${address.city} (${address.country})`;
        }
    }

</script>

<style scoped>

</style>
