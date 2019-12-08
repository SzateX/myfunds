const routes: any = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children:
        [
            {path: '', redirect: {name: 'main.page'}},
            {
                path: "dashboard",
                name: 'main.page',
                component: () => import('@/components/TempComponent.vue'),
                icon: 'mdi-home',
                description: 'Home',
                meta: { auth: true }
            },

            {
                path: 'admin',
                component: () => import('@/layouts/EmptyLayout.vue'),
                children:
                [
                    {
                        path: 'users',
                        name: 'admin.allUsers',
                        component: () => import('@/views/admin/AllUsers.vue'),
                        icon: 'mdi-home',
                        description: 'Users',
                        meta: { auth: true, admin: true }
                    },
                    {
                        path: 'buildings',
                        name: 'admin.allBuildings',
                        component: () => import('@/views/admin/AllBuildings.vue'),
                        icon: 'mdi-home',
                        description: 'Buildings',
                        meta: { auth: true, admin: true }
                    },
                    {
                        path: 'building/:id',
                        name: 'admin.building',
                        component: () => import('@/views/admin/Building.vue'),
                        meta: { auth: true, admin: true }
                    },
                    {
                        path: 'room/:id',
                        name: 'admin.room',
                        component: () => import('@/views/admin/Room.vue'),
                        meta: { auth: true, admin: true }
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'account.login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'account.register',
        component: () => import('@/views/Register.vue')
    }
];

export default routes;