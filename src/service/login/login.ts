import YYRequest from '@/service';
import { Iaccount, ILoginResult } from './type';
import { IDataType } from '../type';

enum LoginAPI {
  AccountLogin = './login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: Iaccount) {
  return YYRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return YYRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function requestUserMenuByRoleId(id: number) {
  return YYRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  });
}
