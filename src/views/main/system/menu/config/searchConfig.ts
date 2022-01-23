import { IForm, IFormItem } from '@/base-ui/form/type';
const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '权限名称',
    placeholder: '请输入权限名称'
  },
  {
    field: 'intro',
    type: 'input',
    label: '权限介绍',
    placeholder: '请输入权限介绍'
  },
  {
    field: 'createTime',
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
