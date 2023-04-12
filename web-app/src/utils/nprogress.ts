import NProgress from 'nprogress';
import type { Router } from 'vue-router';

interface modulesConfig {
  isClient: boolean;
  router: Router;
}

 type moduleFn = (ctx: modulesConfig) => void;

export const nprogress: moduleFn = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path) {
        NProgress.start();
      }
    });
    router.afterEach(() => {
      // NProgress.done();
    });
  }
};

export default nprogress;
