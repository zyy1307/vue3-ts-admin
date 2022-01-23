const title = '商品列表';

const propList = [
  { prop: 'name', label: '商品名称', minWidth: '80' },
  { prop: 'oldPrice', label: '原价格', minWidth: '80' },
  { prop: 'newPrice', label: '现价格', minWidth: '80' },
  { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '80', slotName: 'status' },
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
