<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import useEchart from '../hooks/useEchart';
export default defineComponent({
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: '350px' },
    option: { type: Object, required: true, default: () => ({}) }
  },
  setup(props) {
    const echartRef = ref<HTMLElement>();
    onMounted(() => {
      const { setOptions } = useEchart(echartRef.value!);
      watchEffect(() => {
        setOptions(props.option);
      });
    });

    return { echartRef };
  }
});
</script>

<style lang="less" scoped></style>
