export interface ISystemState {
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
  goodsList: any[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
  departmentCount: number;
  departmentList: any[];
  storyCount: number;
  storyList: any[];
  categoryCount: number;
  categoryList: any[];
}

export interface create {
  pageName: string;
  newData?: any;
  editData?: any;
  id?: number;
}
