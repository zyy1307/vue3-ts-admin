import { IRootState } from '@/store/type';
import { Module } from 'vuex';
import { ISystemState, create } from './type';
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system';
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
    departmentCount: 0,
    departmentList: [],
    storyCount: 0,
    storyList: [],
    categoryCount: 0,
    categoryList: []
  },
  mutations: {
    changeDepartmentTotalCount(state, totalCount: number) {
      state.departmentCount = totalCount;
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList;
    },
    changeStoryTotalCount(state, totalCount: number) {
      state.storyCount = totalCount;
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList;
    },
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
    changeCategoryCount(state, totalCount: number) {
      state.categoryCount = totalCount;
    },
    changeCategoryList(state, roleList: any) {
      state.categoryList = roleList;
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList;
          case 'role':
            return state.roleList;
          case 'goods':
            return state.goodsList;
          case 'menu':
            return state.menuList;
          case 'department':
            return state.departmentList;
          case 'story':
            return state.storyList;
          case 'category':
            return state.categoryList;
        }
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount;
          case 'role':
            return state.roleCount;
          case 'goods':
            return state.goodsCount;
          case 'menu':
            return state.menuCount;
          case 'department':
            return state.departmentCount;
          case 'story':
            return state.storyCount;
          case 'category':
            return state.categoryCount;
        }
      };
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      const pageUrl = '/' + pageName + '/list';
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      //pageResult:data:list+totalcount
      const { list, totalCount } = pageResult.data;

      switch (pageName) {
        case 'users':
          commit('changeUserList', list);
          commit('changeUserCount', totalCount);
          break;
        case 'role':
          commit('changeRoleList', list);
          commit('changeRoleCount', totalCount);
          break;
        case 'goods':
          commit('changeGoodsList', list);
          commit('changeGoodsCount', totalCount);
          break;
        case 'menu':
          commit('changeMenuList', list);
          commit('changeMenuCount', totalCount);
          break;
        case 'story':
          commit('changeStoryTotalCount', totalCount);
          commit('changeStoryList', list);
          break;
        case 'department':
          commit('changeDepartmentTotalCount', totalCount);
          commit('changeDepartmentList', list);
          break;
        case 'category':
          commit('changeCategoryCount', totalCount);
          commit('changeCategoryList', list);
          break;
      }
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      //这些网络请求封装在service
      await deletePageData(pageUrl);
      //删除后重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    },
    async createPageDataAction({ dispatch }, payload: create) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    },
    async editPageDataAction({ dispatch }, payload: create) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      });
    }
  }
};
export default systemModule;
