<template>
  <div class="nav-header">
    <el-icon class="menu-icon" v-show="isFold" :size="28" @click="handleFold()"
      ><fold
    /></el-icon>
    <el-icon class="menu-icon" :size="28" v-show="!isFold" @click="handleFold()"
      ><expand
    /></el-icon>
    <div class="content">
      <div><Bread-crumb :breadcrumbs="breadcrumbs"></Bread-crumb></div>
      <User-info></User-info>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Expand, Fold } from '@element-plus/icons-vue';
import UserInfo from './user-info.vue';
import BreadCrumb from '@/base-ui/breadcrumb/src/breadCrumb.vue';
import { pathMapBreadcrumbs } from '@/utils/map-menus';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: { Expand, Fold, UserInfo, BreadCrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    //折叠按钮
    const isFold = ref(true);
    const handleFold = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    //面包屑
    const store = useStore();

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      isFold,
      handleFold,
      breadcrumbs
    };
  }
});
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;

  .menu-icon {
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
