<template>
  <div class="category">
    <page-search
      :formConfig="searchFormConfig"
      @queryClick="handleQuery"
      @resetClick="handleReset"
    />
    <page-content
      ref="pageContentRef"
      pageName="category"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePageSearch } from '@/hooks/usePageSearch';
import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

export default defineComponent({
  name: 'category',

  setup() {
    const { pageContentRef, handleQuery, handleReset } = usePageSearch();

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQuery,
      handleReset
    };
  }
});
</script>

<style scoped></style>
