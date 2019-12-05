<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="navbar"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <v-list-item-group v-model="checkedMenu">
                    <v-list-item
                            v-for="(item, i) in navbarItems"
                            :key="i"
                            :to="{ name: item.routeName }"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title color="success" v-text="item.description" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-app-bar-nav-icon @click.stop="navbar = !navbar" />
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">MY FUNDS <small>app</small></span>
            </v-toolbar-title>
            <v-spacer />
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";

    import routes from "@/router/routes";
    import NavBarItem from "@/models/navbar/NavBarItem";

    @Component
    export default class DefaultLayout extends Vue
    {
        public checkedMenu: number = 0;
        public navbar = true;
        public navbarItems: NavBarItem[] = [];


        public created() : void
        {
            for (let i = 0; i < routes.length; i++)
            {
                const entry = routes[i];
                if (entry.children !== undefined)
                {
                    this.buildNavData(entry.children);
                }
            }
        }

        public buildNavData(childrenData: any): void
        {
            for (let i = 0; i < childrenData.length; i++)
            {
                const entry = childrenData[i];
                if (entry.name && entry.description)
                {
                    let output: NavBarItem = {
                        routeName: entry.name,
                        description: entry.description,
                        icon: entry.icon

                    };

                    this.navbarItems.push(output);

                    if (this.$route.name === output.routeName)
                    {
                        this.checkedMenu = this.navbarItems.indexOf(output);
                    }
                }

                if (entry.children !== undefined)
                {
                    this.buildNavData(entry.children);
                }
            }
        }

    }
</script>

<style scoped>

</style>