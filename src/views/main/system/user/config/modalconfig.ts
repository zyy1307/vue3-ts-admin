import { IForm } from '@/base-ui/form/type';
export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'input',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      //部门和角色不能写死，可能有变化
      //但也不需要实时通信（websocket）or 轮询（性能不高）
      //只需要刷新的时候拿到新数据就行
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
};
