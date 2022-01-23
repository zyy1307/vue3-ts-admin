<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <YY-card title="分类商品数量（饼图）"
          ><Pie :pieData="categoryGoodsCount"></Pie
        ></YY-card>
      </el-col>
      <el-col :span="10">
        <YY-card title="不同省市商品数量">
          <Map :mapData="addressGoodsSale"></Map>
        </YY-card>
      </el-col>
      <el-col :span="7">
        <YY-card title="分类商品数量（玫瑰图）">
          <Rose :roseData="categoryGoodsCount"></Rose>
        </YY-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <YY-card title="分类商品的销量">
          <Line v-bind="categoryGoodsSale"></Line>
        </YY-card>
      </el-col>
      <el-col :span="12">
        <YY-card title="分类商品的收藏">
          <Bar v-bind="categoryGoodsFavor"></Bar>
        </YY-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import YYCard from '@/base-ui/card';
import { Pie, Rose, Line, Bar, Map } from '@/components/page-echart';

export default defineComponent({
  name: 'dashboard',
  components: { YYCard, Pie, Rose, Line, Bar, Map },
  setup() {
    const store = useStore();
    store.dispatch('dashboard/getDashboardDataAction');
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const yValues: string[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        yValues.push(item.goodsCount);
      }
      return { xLabels, yValues };
    });
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const yValues: string[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name);
        yValues.push(item.goodsFavor);
      }
      return { xLabels, yValues };
    });
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      });
    });
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    };
  }
});
</script>
<style lang="less" scoped>
.content-row {
  margin-top: 20px;
}
</style>
