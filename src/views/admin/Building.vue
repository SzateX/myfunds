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
    </div>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import BuildingDto from "@/models/buildings/BuildingDto";
    import AdminBuildingsService from "@/services/AdminBuildingsService";

    @Component
    export default class Building extends Vue
    {
        private buildingInfo: BuildingDto | null = null;

        public async created() : Promise<void>
        {
            this.buildingInfo = await AdminBuildingsService.GetBuildingDataAsync(parseInt(this.$route.params.id));
        }
    }

</script>

<style scoped>

</style>