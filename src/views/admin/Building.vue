<template>
    <div v-if="buildingInfo !== null">
        <h1>Building info</h1>
        <v-card>
            <v-card-title>Address</v-card-title>
            <v-card-subtitle>This is an address of the building {{ buildingInfo.id }}</v-card-subtitle>
            <v-card-text>
                {{ buildingInfo.address.street }}<br />
                {{ buildingInfo.address.postcode }}, {{ buildingInfo.address.city }}<br />
                {{ buildingInfo.address.country }}
            </v-card-text>
        </v-card>

        <br />

        <v-card>
            <v-card-title>Rooms</v-card-title>
            <v-card-subtitle>Rooms in this building</v-card-subtitle>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th class="text-left">Area</th>
                            <th class="text-left">Floor</th>
                            <th class="text-left">Type</th>
                            <th class="text-right">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in buildingInfo.rooms">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.area }} m<sup>2</sup></td>
                            <td>{{ entry.floor }}</td>
                            <td>{{ entry.typeName }}</td>
                            <td class="text-right"><v-btn :to="{ name: 'admin.room', params: { id: entry.id } }" color="info" outlined>INFO</v-btn></td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card :loading="loading2" v-if="newRoom !== null">
            <v-card-title>Add new room</v-card-title>
            <v-card-subtitle>Here you can add new room</v-card-subtitle>
            <v-card-text>
                <v-alert v-if="errors.length > 0" type="error" outlined>
                    Whoops... Something went wrong! Try to fix issues listed below:<br />
                    <ul>
                        <li :key="index" v-for="(entry, index) in errors">{{ entry }}</li>
                    </ul>
                </v-alert>
                <v-form ref="formAddAsset">
                    <v-text-field label="Area" v-model="newRoom.area" type="number" />
                    <v-text-field label="Floor" v-model="newRoom.floor" type="number" />
                    <v-select :items="roomTypes" label="Type" v-model="newRoom.type" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="createNewRoom()">ADD NEW ROOM</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import BuildingDto from "@/models/buildings/BuildingDto";
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import AddRoomDto from "@/models/buildings/AddRoomDto";
    import {GetStringsFromValidationResponse} from "@/helpers/ValidationHelper";

    @Component
    export default class Building extends Vue
    {
        private buildingInfo: BuildingDto | null = null;

        private errors: string[] = [];
        private loading2 = false;
        private loading = true;
        private newRoom: AddRoomDto | null = null;

        private roomTypes = ['Workplace', 'Sanitary', 'Warehouse', 'Other'];

        public async created() : Promise<void> {
            await this.loadData();
            this.clearForm();
            this.loading = false;
        }

        public async createNewRoom(): Promise<void> {
            if (this.newRoom === null)
                return;

            this.errors = [];

            if (this.newRoom.area <= 0) {
                this.errors.push('Area must be greater than zero.');
                return;
            }

            if (this.newRoom.floor <= 0) {
                this.errors.push('Floor must be greater than zero.');
                return;
            }

            try
            {
                this.loading2 = true;
                const response = await AdminBuildingsService.CreateNewRoomAsync(this.newRoom);

                if (response.status === 201)
                {
                    this.$toasted.show('Room created successfully.', {
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
            this.newRoom = {
              area: 0,
              buildingId: parseInt(this.$route.params.id),
              floor: 0,
              id: 0,
              type: ''
            };
        }

        public async loadData(): Promise<void> {
            this.buildingInfo = await AdminBuildingsService.GetBuildingDataAsync(parseInt(this.$route.params.id));
        }
    }

</script>

<style scoped>

</style>
