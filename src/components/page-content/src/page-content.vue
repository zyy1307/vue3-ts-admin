<template>
  <div class="content">
    <YY-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header里的插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handleNew"
          >新建</el-button
        >
        <!--<el-button>
          <el-icon><refresh-left /></el-icon
        ></el-button>-->
      </template>
      <!-- content里的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enabel ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 有的prop是没有slotName的 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row">{{
            item.slotName
          }}</slot>
        </template>
      </template>
    </YY-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import YYTable from '@/base-ui/table';
import { usePermissions } from '@/hooks/usePermissions';
export default defineComponent({
  components: { YYTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore();
    //获取操作权限:增删改查
    const isCreate = usePermissions(props.pageName, 'create');
    const isUpdate = usePermissions(props.pageName, 'update');
    const isDelete = usePermissions(props.pageName, 'delete');
    const isQuery = usePermissions(props.pageName, 'query');
    //双绑pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => {
      getPageData();
    });
    //封装，之后搜索可以多次调用
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo.value
        }
      });
    };
    //组件setup时默认执行一次
    getPageData();
    //未封装前的做法
    //const userList = computed(() => store.state.system.userList);
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    );
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    );
    //获取其他动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false;
        if (item.slotName === 'createAt') return false;
        if (item.slotName === 'updateAt') return false;
        if (item.slotName === 'handler') return false;
        return true;
      }
    );
    //监听新建、删除、编辑操作
    const handleDelete = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      });
    };
    const handleNew = () => {
      //在modal里处理，通过使用这两个组件的共同父组件
      emit('newBtnClick');
    };
    const handleEdit = (item: any) => {
      emit('editBtnClick', item);
    };
    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDelete,
      handleEdit,
      handleNew
    };
  }
});
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
