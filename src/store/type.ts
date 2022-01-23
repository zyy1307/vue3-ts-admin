import { ILoginState } from './login/type';
import { ISystemState } from './main/system/type';
import { IDashboardState } from './main/analysis/type';

export interface IRootState {
  name?: string;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}
//又有module又有根state的intersectionType
export type IStoreType = IRootState & IRootWithModule;
