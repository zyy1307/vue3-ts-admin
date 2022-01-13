<template>
  <div class="account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="userName"
        ><el-input v-model="account.userName"></el-input
      ></el-form-item>
      <el-form-item label="密码" prop="password"
        ><el-input v-model="account.password" type="password"></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../rule';

export default defineComponent({
  setup() {
    const account = reactive({ userName: '', password: '' });

    //typeof 需要import，这里使用formRef是为了拿到表单的值
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = () => {
      formRef.value?.validate((value) => {
        //此value就是是否通过验证的boolean
        if (value) {
          //真正的逻辑
        }
      });
    };
    return { account, rules, loginAction, formRef };
  }
});
</script>

<style lang="less" scoped></style>
