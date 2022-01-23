import { Module } from 'vuex';
import { IDashboardState } from './type';
import { IRootState } from '@/store/type';
import {
  getCategoryGoodsCount,
  getAddressGoodsSale,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboard';
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, data: any) {
      state.categoryGoodsCount = data;
    },
    changeCategoryGoodsSale(state, data: any) {
      state.categoryGoodsSale = data;
    },
    changeCategoryGoodsFavor(state, data: any) {
      state.categoryGoodsFavor = data;
    },
    changeAddressGoodsSale(state, data: any) {
      state.addressGoodsSale = data;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCount = await getCategoryGoodsCount();
      commit('changeCategoryGoodsCount', categoryCount.data);
      const addressSale = await getAddressGoodsSale();
      commit('changeAddressGoodsSale', addressSale.data);
      const categoryFavor = await getCategoryGoodsFavor();
      commit('changeCategoryGoodsFavor', categoryFavor.data);
      const categorySale = await getCategoryGoodsSale();
      commit('changeCategoryGoodsSale', categorySale.data);
    }
  }
};

export default dashboardModule;
