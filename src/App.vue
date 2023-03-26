<script setup lang="ts">
// import { useRouterStoreWithOut } from '@/store/models/router'
import { ref, onMounted, watch, ComponentCustomProperties, getCurrentInstance, ComponentInternalInstance, onUnmounted } from 'vue'
const global = (getCurrentInstance() as ComponentInternalInstance)!.appContext
  .config.globalProperties as ComponentCustomProperties;
// const routerStore = useRouterStoreWithOut()
onMounted(() => {
  // routerStore.routerInit();// 后期更改pinia设置
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- keep 缓存 -->
    <keep-alive :include="[]">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
