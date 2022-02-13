<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import LayoutContent from '@/views/Layout.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LayoutContent,
  },
  setup() {
    const layout = 'layout-content';
    return {
      layout,
    }
  },
})
</script>

