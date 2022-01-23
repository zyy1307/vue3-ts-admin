import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import cache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = cache.getCache('token');
    if (!token) {
      //没token就回首页
      return '/login';
    }
  }
  //to'/main'重定向到菜单第一栏
  if (to.path === '/main') {
    return firstMenu.url;
  }
});
export default router;
