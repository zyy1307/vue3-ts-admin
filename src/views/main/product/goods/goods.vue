<template>
  <div>
    <Page-search
      :formConfig="formConfig"
      @queryClick="handleQuery"
      @resetClick="handleReset"
    ></Page-search>
    <Page-content
      pageName="goods"
      :contentTableConfig="contentTableConfig"
      ref="pageContentRef"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :z-index="zoom"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </Page-content>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { contentTableConfig } from './config/contentConfig';
import { formConfig } from './config/searchConfig';
import { usePageSearch } from '@/hooks/usePageSearch';
export default defineComponent({
  name: 'goods',
  setup() {
    const zoom = 9999;
    const { handleQuery, handleReset, pageContentRef } = usePageSearch();
    return {
      contentTableConfig,
      zoom,
      formConfig,
      handleQuery,
      handleReset,
      pageContentRef
    };
  }
});
</script>
<style lang="less" scoped></style>
