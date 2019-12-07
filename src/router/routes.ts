const routes: any = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children:
        [
            {
                path: "",
                name: "main.page",
                component: () => import('@/components/TempComponent.vue'),
                icon: "mdi-home",
                description: "Strona główna",
                meta: { auth: true }
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