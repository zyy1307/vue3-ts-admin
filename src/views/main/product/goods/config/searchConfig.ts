import { IForm, IFormItem } from '@/base-ui/form/type';
const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '商品名称',
    placeholder: '请输入商品名称'
  },
  {
    field: 'oldPrice',
    type: 'input',
    label: '原价格',
    placeholder: '请输入原价格'
  },
  {
    field: 'newPrice',
    type: 'input',
    label: '现价格',
    placeholder: '请输入现价格'
  },
  {
    field: 'status',
    type: 'select',
    label: '商品状态',
    placeholder: '请输入商品状态',
    options: [
      { title: '启用', value: 1 },
      { title: '禁用', value: 0 }
    ]
  },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
];
const itemStyle = {
  padding: '5px 10px'
};
export const formConfig: IForm = {
  labelWidth: '120px',
  itemStyle: itemStyle,
  formItems: formItems
};
