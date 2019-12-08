<template>
    <main>
        <h1>All Users</h1>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th style="width: 10%;" class="text-left">Id</th>
                    <th style="width: 35%;" class="text-left">Username</th>
                    <th style="width: 35%;" class="text-left">E-mail</th>
                    <th style="width: 20%;" class="text-right">Options</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="entry.id" v-for="entry in users">
                    <td>{{ entry.id }}</td>
                    <td>{{ entry.userName }}</td>
                    <td>{{ entry.email }}</td>
                    <td class="text-right">
                        <v-btn outlined color="warning">EDIT</v-btn>
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
    import AccountDto from "@/models/account/AccountDto";
    import AdminUserService from "@/services/AdminUserService";

    @Component
    export default class AllUsers extends Vue
    {
        private users: AccountDto[] = [];

        public async created(): Promise<void>
        {
            this.users = await AdminUserService.GetAllUsersAsync();
        }
    }

</script>

<style scoped>

</style>