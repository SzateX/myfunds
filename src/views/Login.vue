<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert v-if="errors.length > 0" type="error" outlined>
                                    Whoops... Something went wrong! Try to fix issues listed below:<br />
                                    <ul>
                                        <li :key="index" v-for="(entry, index) in errors">{{ entry }}</li>
                                    </ul>
                                </v-alert>
                                <v-form v-model="isValid" ref="form" lazy-validation>
                                    <v-text-field
                                            label="Login"
                                            v-model="formData.username"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            :rules="nameRules"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            v-model="formData.password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            :rules="passwordRules"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" outlined :to="{ name: 'account.register' }">Sign Up</v-btn>
                                <v-spacer />
                                <v-btn type="submit" color="primary" :disabled="isLogging" :loading="isLogging" @click="onBtnLoginClicked()">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>


<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import LoginDto from "@/models/account/LoginDto";
    import AccountService from "@/services/AccountService";

    @Component
    export default class LoginView extends Vue
    {
        public isLogging = false;
        public isValid = true;

        public formData: LoginDto = {
            username: '',
            password: ''
        };

        public errors: string[] = [];

        public nameRules = [
            // @ts-ignore
            v => !!v || 'Name is required'
        ];

        public passwordRules = [
            // @ts-ignore
            v => !!v || 'Password is required'
        ];

        public async onBtnLoginClicked(): Promise<void> {
            if (this.isLogging)
                return;

            this.errors = [];

            // @ts-ignore
            if (this.$refs.form.validate())
            {
                this.isLogging = true;
            }

            let response = await AccountService.OAuthLogin(this.formData);

            if (response == null || response.status !== 200)
            {
                // Invalid credentials
                this.errors.push('Invalid username and/or password');
                this.isLogging = false;
            }
            else
            {
                await AccountService.SetAccountTokenAsync(response.data.access_token);
                this.$router.push({ name: 'main.page' });
            }
        }
    }
</script>

<style scoped>

</style>