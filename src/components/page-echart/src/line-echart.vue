<template>
  <div class="rose">
    <BaseEchart :option="options"></BaseEchart>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import BaseEchart from '@/base-ui/echarts';

export default defineComponent({
  components: { BaseEchart },
  props: {
    xLabels: { type: Array, default: () => [] },
    yValues: { type: Array, default: () => [] },
    title: { type: String, default: '' }
  },
  setup(props) {
    const options = computed(() => {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xLabels
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '分别销量',
            data: props.yValues,
            type: 'line',
            areaStyle: {}
          }
        ]
      };
    });

    return { options };
  }
});
</script>
<style lang="less" scoped></style>
