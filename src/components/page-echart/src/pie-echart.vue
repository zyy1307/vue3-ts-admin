<template>
  <div class="pie">
    <BaseEchart :option="options"></BaseEchart>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import BaseEchart from '@/base-ui/echarts';
import { IDataType } from '../type';
export default defineComponent({
  components: { BaseEchart },
  props: {
    pieData: { type: Array as PropType<IDataType[]> }
  },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });

    return { options };
  }
});
</script>
<style lang="less" scoped></style>
