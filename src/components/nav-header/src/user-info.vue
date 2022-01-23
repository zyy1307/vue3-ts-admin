<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="default"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <!--<span class="name">{{ userName }}</span>-->
        <span class="name">zyy</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="CircleClose" @click="handleExit"
            >退出登录</el-dropdown-item
          >
          <!--divided 分割线
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>-->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CircleClose } from '@element-plus/icons-vue';
import { useStore } from '@/store';
import cache from '@/utils/cache';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const userName = computed(() => store.state.login.userInfo.name);
    const router = useRouter();
    const handleExit = () => {
      cache.deleteCache('token');
      router.push('/login');
    };
    return { CircleClose, userName, handleExit };
  }
});
</script>
<style lang="less" scoped>
.user-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
    }
  }

  .operation {
    margin-right: 20px;
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
