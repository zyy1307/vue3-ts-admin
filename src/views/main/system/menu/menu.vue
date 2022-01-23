<template>
  <div class="menu">
    <Page-search :formConfig="formConfig"></Page-search>
    <Page-content
      pageName="menu"
      :contentTableConfig="contentTableConfig"
    ></Page-content>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { contentTableConfig } from './config/contentConfig';
import { formConfig } from './config/searchConfig';
export default defineComponent({
  name: 'role',
  setup() {
    return { contentTableConfig, formConfig };
  }
});
</script>
<style lang="less" scoped></style>
