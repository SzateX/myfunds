<template>
    <main>
        <h1>All Buildings</h1>
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
    </main>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import BuildingDto from "@/models/buildings/BuildingDto";
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import AddressDto from "@/models/buildings/AddressDto";

    @Component
    export default class AllBuildings extends Vue
    {
        private buildings: BuildingDto[] = [];

        public async created(): Promise<void>
        {
            this.buildings = await AdminBuildingsService.GetAllBuildings();
        }

        public getAddressString(address: AddressDto): string
        {
            return `${address.street}, ${address.postcode} ${address.city} (${address.country})`;
        }
    }

</script>

<style scoped>

</style>