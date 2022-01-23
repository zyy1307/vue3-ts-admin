import { Module } from 'vuex';
import { ILoginState } from './type';
import { IRootState } from '../type';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login';
import { Iaccount } from '@/service/login/type';
import cache from '@/utils/cache';
import router from '@/router';
import { mapMenuToRoutes, mapMenusToPermissions } from '@/utils/map-menus';
//S是当前模块的类型，R是根模块的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return { token: '', userInfo: {}, userMenus: [], permissions: [] };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
      cache.setCache('token', token);
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
      cache.setCache('userInfo', userInfo);
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      cache.setCache('userMenus', userMenus);
      const routes = mapMenuToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });
      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: Iaccount) {
      //之前封装的方法要求传入返回值的类型
      const loginResult = await accountLoginRequest({
        name: payload.userName,
        password: payload.password
      });
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      //接下来的每个请求都需要token
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenuResult.data;
      commit('changeUserMenus', userMenus);
      //跳到首页
      router.push('/main');
    },
    loadLocalLogin({ commit }) {
      const token = cache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }
      const userInfo = cache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = cache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
