const routes: any = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children:
        [
            // { path: '',  },
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
                        description: 'All users',
                        meta: { auth: true, admin: true }
                    },
                    {
                        path: 'buildings',
                        name: 'admin.allBuildings',
                        component: () => import('@/views/admin/AllBuildings.vue'),
                        icon: 'mdi-home',
                        description: 'All buildings',
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