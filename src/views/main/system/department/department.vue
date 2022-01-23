<template>
  <div class="department">
    <page-search
      :formConfig="searchFormConfig"
      @queryClick="handleQuery"
      @resetClick="handleReset"
    />
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      pageName="department"
      title="新建部门"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

export default defineComponent({
  name: 'department',

  setup() {
    const { pageContentRef, handleQuery, handleReset } = usePageSearch();

    // modal配置信息
    const store = useStore();
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      );
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });
      return modalConfig;
    });

    // 处理modal的hook
    const { defaultInfo, pageModalRef, handleNewData, handleEditData } =
      usePageModal();

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      defaultInfo,
      pageModalRef,
      handleQuery,
      handleReset,
      handleNewData,
      handleEditData
    };
  }
});
</script>

<style scoped></style>
