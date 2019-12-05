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
                                <v-toolbar-title>Register form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert v-if="errors.length > 0" type="error" outlined>
                                    Whoops... Something went wrong! Try to fix issues listed below:<br />
                                    <ul>
                                        <li :key="index" v-for="(entry, index) in errors">{{ entry }}</li>
                                    </ul>
                                </v-alert>
                                <v-form ref="form" v-model="isValid" lazy-validation>
                                    <v-text-field
                                            label="Login"
                                            v-model="formData.userName"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            :rules="nameRules"
                                    />

                                    <v-text-field
                                            label="E-mail"
                                            v-model="formData.email"
                                            prepend-icon="mdi-at"
                                            type="text"
                                            :rules="emailRules"
                                    />

                                    <v-text-field
                                            label="Password"
                                            v-model="formData.password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            :rules="passwordRules"
                                    />

                                    <v-text-field
                                            label="Password confirmation"
                                            v-model="formData.confirmPassword"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            :rules="passwordConfirmationRules"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
<!--                                <router-link :to="{ name: 'account.login' }">Back to login</router-link>-->
                                <v-btn color="secondary" outlined :to="{ name: 'account.login' }">Back to login</v-btn>
                                <v-spacer />
                                <v-btn color="primary" @click="tryToRegister()" :loading="isRegistering" :disabled="isRegistering">Create account</v-btn>
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
    import RegisterDto from "@/models/account/RegisterDto";
    import AccountService from "@/services/AccountService";
    import {GetStringsFromValidationResponse} from "@/helpers/ValidationHelper";

    @Component
    export default class RegisterView extends Vue
    {
        public isValid = true;
        public isRegistering = false;
        public errors: string[] = [];

        public nameRules = [
            // @ts-ignore
            v => !!v || 'Name is required',
            // @ts-ignore
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ];

        public emailRules = [
            // @ts-ignore
            v => !!v || 'E-mail is required',
            // @ts-ignore
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ];

        public passwordRules = [
            // @ts-ignore
            v => !!v || 'Password is required'
        ];

        public passwordConfirmationRules = [
            // @ts-ignore
            v => !!v || 'Password confirmation is required',
            // @ts-ignore
            v => v == this.formData.password || 'Passwords don\'t match'
        ];

        public formData: RegisterDto = {
           email: "",
           password: "",
           userName: "",
           confirmPassword: ""
        } ;



        public async tryToRegister()
        {
            if (this.isRegistering)
                return;

            // @ts-ignore
            if (this.$refs.form.validate())
            {
                this.isRegistering = true;
                this.errors = [];

                try {
                    const data = await AccountService.CreateAccountAsync(this.formData);
                    if (data.status === 200)
                    {
                        this.$router.push({ name: 'account.login' });
                    }
                }
                catch (ex) {
                    if (ex.response.status === 400)
                    {
                        this.errors = GetStringsFromValidationResponse(ex.response.data);
                    }


                }
                finally {
                    this.isRegistering = false;
                }



            }
        }
    }
</script>

<style scoped>

</style>