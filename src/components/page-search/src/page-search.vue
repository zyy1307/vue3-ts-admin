<template>
  <div class="page-search">
    <YYForm
      v-bind="formConfig"
      :modelValue="formData"
      @update:modelValue="test"
    >
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" @click="handleReset">重置</el-button>
          <el-button @click="handleQuery">搜索</el-button>
        </div>
      </template>
    </YYForm>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import YYForm from '@/base-ui/form';
export default defineComponent({
  components: { YYForm },
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetClick', 'queryClick'],
  setup(props, { emit }) {
    //formData不能写死，是由formconfig中的field决定的
    const formItems = props.formConfig.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[`${item.field}`] = '';
    }
    const formData = ref({ ...formOriginData });
    //组件v-model看来都得这么写？
    const test = (e: any) => {
      for (const key in formData.value) {
        formData.value[key] = e.value[key];
      }
    };

    //监听重置按钮
    const handleReset = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit('resetClick');
      //console.log(formData.value);
    };

    const handleQuery = () => {
      emit('queryClick', formData);
      //console.log(formData.value);
    };
    return { formData, handleReset, handleQuery, test };
  }
});
</script>
<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
