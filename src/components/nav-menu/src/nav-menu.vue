<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@\assets\img\logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="currentItemId"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 都用id做key和index标识（for elePlus记录选中） -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- item.type= 1（第一级：有sub）=else 直接展示即可 -->
        <!--一级菜单-->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><document /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuClick(subitem)"
              >
                <i v-if="item.icon" :class="item.icon"></i
                ><span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!--一级菜单-->
        <template v-else>
          <el-menu-item :index="item.id + ''"
            ><i v-if="item.icon" :class="item.icon"></i
            ><span>{{ item.name }}</span></el-menu-item
          >
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { computed, defineComponent, ref } from 'vue';
import { Document } from '@element-plus/icons-vue';
import { pathMapToMenu } from '@/utils/map-menus';
export default defineComponent({
  components: { Document },
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const store = useStore();
    const userMenus = computed(() => {
      return store.state.login.userMenus;
    });

    //通过当前route对象拿到path
    const route = useRoute();
    const currentPath = route.path;
    const menu = pathMapToMenu(userMenus.value, currentPath);
    const currentItemId = ref(menu.id + '');

    const router = useRouter();
    const handleMenuClick = (item: any) => {
      router.push(item.url ?? 'not-found');
    };
    return { userMenus, handleMenuClick, currentItemId };
  }
});
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  //侧边大menu色
  .el-menu-vertical {
    background-color: #001529;
  }
  // 目录
  .el-sub-menu {
    background-color: #001529;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      //padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
