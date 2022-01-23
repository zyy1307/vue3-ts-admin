<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      center
      destroy-on-close
    >
      <YYForm
        v-bind="modalConfig"
        :modelValue="formData"
        @update:modelValue="test"
      ></YYForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import YYForm from '@/base-ui/form';
import { useStore } from '@/store';

export default defineComponent({
  components: { YYForm },
  props: {
    modalConfig: { type: Object, required: true },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '新建'
    },
    //如果有不一样的逻辑是原form表单里没有，需要外界传的
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData: any = ref({});
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    //test是因为我v-model双绑不起效，但是分开写就能起效
    const test = (e: any) => {
      //解决了但我不知道为什么解决？？
      //console.log(e.value);
      formData.value = { ...e.value };
    };
    const store = useStore();
    const handleConfirm = () => {
      dialogVisible.value = false;
      //封装弹窗需要区分是编辑还是新建-通过defaultINfo（usePageModal中写得逻辑）是否为空对象
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };
    return {
      dialogVisible,
      formData,
      handleConfirm,
      test
    };
  }
});
</script>
<style lang="less" scoped></style>
