const title = '角色列表';

const propList = [
  { prop: 'name', label: '角色名', minWidth: '90' },
  { prop: 'intro', label: '权限介绍', minWidth: '100' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '170',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '170',
    slotName: 'updateAt'
  },
  //最后一列，根据权限可能有删除用户的操作权限
  { label: '操作', minWidth: '100', slotName: 'handler' }
];
//是否有前面的序号
const showIndexColumn = true;
//是否可以选中
const showSelectColumn = true;

export const contentTableConfig = {
  title: title,
  showIndexColumn: showIndexColumn,
  showSelectColumn: showSelectColumn,
  propList: propList
};
