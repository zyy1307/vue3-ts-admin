import * as echarts from 'echarts';
import ChinaMap from '../data/china.json';

echarts.registerMap('china', ChinaMap as any);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };
  const setResize = () => {
    echartInstance.resize();
  };
  window.addEventListener('resize', () => {
    setResize();
  });
  return { echartInstance, setOptions, setResize };
}
