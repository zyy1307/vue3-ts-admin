<template>
  <div class="bar">
    <BaseEchart :option="options"></BaseEchart>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import BaseEchart from '@/base-ui/echarts';
import * as echarts from 'echarts';

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
        title: { text: props.title },
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            //x轴文本在柱子里
            inside: true,
            color: '#fff',
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.yValues
          }
        ]
      };
    });

    return { options };
  }
});
</script>
<style lang="less" scoped></style>
