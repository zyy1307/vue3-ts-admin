<template>
  <div class="overview">
    <YY-card title="关于">
      <div class="c-left">
        Vue3Admin 是一个基于 Vue3、Vuex、VueRouter、 ElementPlus
        、TypeScript、Echart5 的后台管理系统解决方案。
      </div>
    </YY-card>
    <Yy-card title="技术栈">
      <div class="padding">
        <hy-text-link :text-arrs="technologyStacks" />
      </div>
    </Yy-card>
    <Yy-card title="项目结构">
      <div class="c-left">
        <hy-code language="bash" :code="projectDir" />
      </div>
    </Yy-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YYCard from '@/base-ui/card';

import HyTextLink from '@/base-ui/text-link';
import HyCode from '@/base-ui/code';

import { technologyStacks, projectDir } from './config';
export default defineComponent({
  components: {
    YYCard,
    HyTextLink,
    HyCode
  },

  setup() {
    return {
      technologyStacks,
      projectDir
    };
  }
});
</script>

<style scoped lang="less">
.overview {
  .padding {
    padding-left: 50px;
    padding-top: 10px;
  }
  .c-left {
    text-align: left;
  }

  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }

  .description {
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-descriptions__title) {
      // ::v-deep .el-descriptions__title {
      font-weight: 400;
    }
  }
}
</style>
