<template>
  <div class="account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="userName"
        ><el-input v-model="account.userName"></el-input
      ></el-form-item>
      <el-form-item label="密码" prop="password"
        ><el-input v-model="account.password" show-password></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../rule';
import cache from '@/utils/cache';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      userName: cache.getCache('userName') ?? '',
      password: cache.getCache('password') ?? ''
    });

    //typeof 需要import，这里使用formRef是为了拿到表单的值
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isPassMemo: boolean) => {
      formRef.value?.validate((value) => {
        //此value就是是否通过验证的boolean
        if (value) {
          //真正的逻辑
          //是否需要记住密码，开始进行记录密码
          if (isPassMemo) {
            cache.setCache('userName', account.userName);
            cache.setCache('password', account.password);
          } else {
            cache.deleteCache('userName');
            cache.deleteCache('password');
          }
          store.dispatch('login/accountLoginAction', { ...account });
        }
      });
    };
    return { account, rules, loginAction, formRef };
  }
});
</script>

<style lang="less" scoped></style>
