<template>
  <div class="rose">
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
    roseData: { type: Array as PropType<IDataType[]> }
  },
  setup(props) {
    const options = computed(() => {
      return {
        //legend: {
        //  top: 'bottom'
        //},
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      };
    });

    return { options };
  }
});
</script>
<style lang="less" scoped></style>
