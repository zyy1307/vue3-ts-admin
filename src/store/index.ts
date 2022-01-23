import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './type';
import login from './login/login';
import system from './main/system/system';
import dashboard from './main/analysis/dashboard';
import { getPageListData } from '@/service/main/system/system';
const store = createStore<IRootState>({
  //createStore时可以传泛型
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list: any[]) {
      state.entireMenu = list;
    }
  },
  getters: {},
  actions: {
    async getInitialDataAciton({ commit }) {
      //全部部门数据
      const resultD = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      });
      //全部角色数据
      const { list: Dlist } = resultD.data;
      const resultR = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      });
      const { list: Rlist } = resultR.data;
      //全部菜单数据
      const resultM = await getPageListData('menu/list', {});
      const { list: Mlist } = resultM.data;
      commit('changeEntireDepartment', Dlist);
      commit('changeEntireRole', Rlist);
      commit('changeEntireMenu', Mlist);
    }
  },
  modules: { login, system, dashboard }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
  store.dispatch('getInitialDataAciton');
}
//自己声明了一个类型IStoreType来帮助vuex显示对应的模块中的值
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
