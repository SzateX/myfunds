<template>
    <div v-if="userData !== null">
        <h1>Home</h1>

        <v-card>
            <v-card-title>Fixed Assets</v-card-title>
            <v-card-subtitle>linked to your account</v-card-subtitle>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th class="text-left">Room Id</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">Purchase Date</th>
                            <th class="text-left">Warranty Date</th>
                            <th class="text-left">Type</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in userData.fixedAssets">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.roomId }}</td>
                            <td>{{ entry.name }}</td>
                            <td>{{ entry.price }} PLN</td>
                            <td>{{ new Date(entry.purchaseDate).toLocaleDateString() }}</td>
                            <td>{{ new Date(entry.warrantyEndDate).toLocaleDateString() }}</td>
                            <td>{{ entry.typeName }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <br />

        <v-card>
            <v-card-title>Mobile Assets</v-card-title>
            <v-card-subtitle>linked to your account</v-card-subtitle>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Price</th>
                            <th class="text-left">Purchase Date</th>
                            <th class="text-left">Warranty Date</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in userData.mobileAssets">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.name }}</td>
                            <td>{{ entry.price }} PLN</td>
                            <td>{{ new Date(entry.purchaseDate).toLocaleDateString() }}</td>
                            <td>{{ new Date(entry.warrantyEndDate).toLocaleDateString() }}</td>
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
    import AccountWithAssetsDto from "@/models/account/AccountWithAssetsDto";
    import AccountService from "@/services/AccountService";

    @Component
    export default class DefaultUserView extends Vue
    {
        private userData: AccountWithAssetsDto | null = null;

        public async created(): Promise<void>
        {
            this.userData = await AccountService.GetAccountInfoWithAssetsAsync();
            console.log(this.userData);
        }
    }

</script>

<style scoped>

</style>
