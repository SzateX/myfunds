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

        <v-card>
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
<!--                            <td class="text-right"><v-btn :to="{ name: 'admin.room', params: { id: entry.id } }" color="info" outlined>INFO</v-btn></td>-->
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card>
            <v-card-title>Add new asset</v-card-title>
            <v-card-subtitle>Here you can add new asset</v-card-subtitle>
            <v-card-text>
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
        </v-card>
    </div>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import AdminBuildingsService from "@/services/AdminBuildingsService";
    import RoomDto from "../../models/buildings/RoomDto";
    import NewAssetDto from "@/models/assets/NewAssetDto";

    @Component
    export default class Room extends Vue
    {
        private roomInfo: RoomDto | null = null;

        private newAsset: NewAssetDto = {
            inUse: false,
            name: '',
            price: 0,
            purchaseDate: '',
            roomId: 0,
            type: '',
            userId: 0,
            warrantyEndDate: ''
        };

        private assetTypes = ['Static', 'Rentable'];
        private warrantyDate = false;
        private purchaseDate = false;

        public async created() : Promise<void>
        {
            this.roomInfo = await AdminBuildingsService.GetRoomDataAsync(parseInt(this.$route.params.id));
        }
    }

</script>

<style scoped>

</style>