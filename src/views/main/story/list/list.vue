<template>
  <div class="list">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="story"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { contentTableConfig } from './config/content.config';

export default defineComponent({
  name: 'list',

  setup() {
    return {
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
