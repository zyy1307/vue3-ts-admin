export const rules = {
  //message是提示信息，数组内每个对象是一个规则
  userName: [
    { required: true, message: '用户名是必填项', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10位的字母和数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码是必填项', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '密码必须是5-10位的字母和数字',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    { required: false },
    {
      pattern: /^[0-9]{11}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ]
};
