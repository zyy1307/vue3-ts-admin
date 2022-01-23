<template>
  <div>
    <h2>您要去的页面不存在哦~</h2>
    <el-button type="primary" @click="$router.push('/main')"
      >返回主页</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {}
});
</script>
<style lang="less" scoped></style>
