<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <!--标签卡-->
        <template #label>
          <span>
            <el-icon :size="12"><user /></el-icon>账号登录
          </span>
        </template>
        <!--下部内容-->
        <Login-account ref="accountRef"></Login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon :size="12"><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="passMemo">
      <el-checkbox v-model="isPassMemo">记住密码</el-checkbox>
      <el-link type="primary" @click="isPassMemo = false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="login()"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
//用icon要import
import { User, Iphone } from '@element-plus/icons-vue';
import LoginAccount from './account.vue';
import LoginPhone from './phone.vue';

export default defineComponent({
  components: { User, Iphone, LoginAccount, LoginPhone },
  setup() {
    const isPassMemo = ref(true);
    //注意typeof 推断
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    //elementplus属性：可以知道当前选中的是哪个tab
    const currentTab = ref<string>('account');

    const login = () => {
      //通过ref调用子组件上的方法
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isPassMemo.value);
      } else {
        console.log('我选择了手机登录');
      }
    };

    return { isPassMemo, login, accountRef, currentTab };
  }
});
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .passMemo {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
