import yyRequest from '@/service';
//import { IDataType } from '@/service/type';
enum DashboardAPI {
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  categoryGoodsCount = '/goods/category/count',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return yyRequest.get({
    url: DashboardAPI.addressGoodsSale
  });
}
