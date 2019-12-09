<template>
    <main>
        <h1>All Users</h1>
        <v-card :loading="loading">
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th style="width: 10%;" class="text-left">Id</th>
                            <th class="text-left">Username</th>
                            <th class="text-left">E-mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="entry.id" v-for="entry in users">
                            <td>{{ entry.id }}</td>
                            <td>{{ entry.userName }}</td>
                            <td>{{ entry.email }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </main>
</template>

<script lang="ts">

    import Component from "vue-class-component";
    import Vue from 'vue';
    import AccountDto from "@/models/account/AccountDto";
    import AdminUserService from "@/services/AdminUserService";

    @Component
    export default class AllUsers extends Vue
    {
        private users: AccountDto[] = [];
        private loading = true;

        public async created(): Promise<void>
        {
            this.users = await AdminUserService.GetAllUsersAsync();
            this.loading = false;
        }
    }

</script>

<style scoped>

</style>
