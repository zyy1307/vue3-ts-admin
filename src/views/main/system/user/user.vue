<template>
  <div class="user">
    <div class="search">
      <Page-search
        :formConfig="formConfig"
        @queryClick="handleQuery"
        @resetClick="handleReset"
      ></Page-search>
    </div>
    <Page-content
      pageName="users"
      :contentTableConfig="contentTableConfig"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></Page-content>
    <Page-modal
      :modalConfig="modalConfigCp"
      ref="pageModalRef"
      pageName="users"
      :defaultInfo="defaultInfo"
      title="新建用户"
    ></Page-modal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { formConfig } from './config/searchConfig';
import { modalConfig } from './config/modalconfig';
import { contentTableConfig } from './config/contentConfig';
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';
import { useStore } from '@/store';
export default defineComponent({
  name: 'users',
  setup() {
    const store = useStore();
    const { pageContentRef, handleQuery, handleReset } = usePageSearch();
    //页面逻辑，但是由hook操作(通过函数传参)
    const newCallback = () => {
      const pwItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      pwItem!.isHidden = false;
    };
    const editCallback = () => {
      const pwItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      pwItem!.isHidden = true;
    };
    //动态添加角色和部门列表
    const modalConfigCp = computed(() => {
      //异步请求的数据在组件创立时还没有，所以上文给modalConfig搞一个computed对象，在modalConfig改变时重跑
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      );
      //vuex变-modal变-动态数据需要重新渲染都可参考此种思路
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modalConfig;
    });

    const { handleEditData, handleNewData, defaultInfo, pageModalRef } =
      usePageModal(newCallback, editCallback);

    return {
      formConfig,
      contentTableConfig,
      pageContentRef,
      handleQuery,
      handleReset,
      handleNewData,
      handleEditData,
      modalConfigCp,
      pageModalRef,
      defaultInfo
    };
  }
});
</script>
<style lang="less" scoped></style>
