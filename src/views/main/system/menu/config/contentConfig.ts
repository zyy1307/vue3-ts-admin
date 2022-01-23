const title = '菜单列表';

const propList = [
  { prop: 'name', label: '菜单名称', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '60' },
  { prop: 'url', label: '菜单url', minWidth: '100' },
  { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
const showIndexColumn = false;
//是否可以选中
const showSelectColumn = false;

export const contentTableConfig = {
  title: title,
  showIndexColumn: showIndexColumn,
  showSelectColumn: showSelectColumn,
  propList: propList,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
};
