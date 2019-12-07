import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes";
import AuthService from "@/services/AuthService";

Vue.use(VueRouter);


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(t => t.meta.auth))
  {
    if (!AuthService.isUserLoggedIn) {
      next({ name: 'account.login' });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router
