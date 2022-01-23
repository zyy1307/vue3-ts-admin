<template>
  <div class="yy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"> </slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 作用域插槽,要访问el-tabel-column的数据，调用row：代表当前被遍历出来的每行信息(对象)。
          { "id": 13262, "name": "阁下还在吗?看到请回复~", "realname": "asdf", "cellphone": 18338323926, "enable": 1, "departmentId": 1, "roleId": 3, "createAt": "2022-01-18", "updateAt": "2022-01-18" }
          -->
          <!-- scope是自定义的作用域变量名，这里还是个插槽，因为最初绑定数据是在element中完成 -->
          <template #default="scope">
            <!--动态插槽名,通过row再把数据传出去-->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 没有插槽默认显示数据 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- footer -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    listData: { type: Array, required: true },
    propList: { type: Array, required: true },
    listCount: {
      type: Number,
      default: 0
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    //value就是勾选的数据
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value);
    };
    //footer分页函数
    const handleCurrentChange = (currentPage: number) => {
      //这里运用1：prop简写currentPage：currentPage；2：覆盖同名属性：currentPage将会更新原page里的currentPage
      emit('update:page', { ...props.page, currentPage });
    };
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize });
    };
    return { handleSelectionChange, handleCurrentChange, handleSizeChange };
  }
});
</script>
<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
