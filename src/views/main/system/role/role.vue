<template>
  <div class="role">
    <Page-search
      :formConfig="formConfig"
      @queryClick="handleQuery"
      @resetClick="handleReset"
    ></Page-search>
    <Page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      ref="pageContentRef"
    ></Page-content>
    <Page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      title="新建角色"
    >
      <el-tree
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        node-key="id"
        show-checkbox
        :otherInfo="otherInfo"
        @check-change="handleCheck"
        ref="elTreeRef"
      />
    </Page-modal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue';
import { contentTableConfig } from './config/contentConfig';
import { formConfig } from './config/searchConfig';
import { modalConfig } from './config/modalconfig';
import { usePageModal } from '@/hooks/usePageModal';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useStore } from 'vuex';
import { getMenuLeafKeys } from '@/utils/map-menus';
import { ElTree } from 'element-plus';
export default defineComponent({
  name: 'role',
  setup() {
    const { pageContentRef, handleQuery, handleReset } = usePageSearch();
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    //权限树回显
    const editCb = (item: any) => {
      //拿到el-tree，调用方法，把menulist里的东西check上
      const leafKeys = getMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
      usePageModal(undefined, editCb);
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    //监听树形控件的check事件，由elePlus提供的回调监听-用来获取el-tree选中的信息
    //check-change	当复选框被点击的时候触发	共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes(半选状态-比如一个节点三个孩子，只有一个孩子被选中，这个节点就是half)、halfCheckedKeys 四个属性
    const handleCheck = (data1: any, data2: any) => {
      //data1:传递给 data 属性的数组中该节点所对应的对象，,data2:树目前的选中状态对象
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = { ...checkedKeys, ...halfCheckedKeys };
      otherInfo.value = { menuList };
    };
    return {
      contentTableConfig,
      formConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      pageContentRef,
      handleQuery,
      handleReset,
      handleEditData,
      handleNewData,
      handleCheck,
      menus,
      otherInfo,
      elTreeRef
    };
  }
});
</script>
<style lang="less" scoped></style>
