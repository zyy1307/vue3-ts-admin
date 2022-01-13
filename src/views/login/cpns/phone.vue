<template>
  <div class="phone">
    <el-form label-width="60px" :rules="rules" :model="phoneValid">
      <el-form-item label="手机号" prop="phoneNumber"
        ><el-input v-model="phoneValid.phoneNumber"></el-input
      ></el-form-item>
      <el-form-item label="验证码"
        ><div class="verify-code">
          <el-input v-model="phoneValid.vertificationCode"></el-input>
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div></el-form-item
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { rules } from '../rule';

export default defineComponent({
  setup() {
    const phoneValid = reactive({
      phoneNumber: '',
      vertificationCode: ''
    });
    return { phoneValid, rules };
  }
});
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
