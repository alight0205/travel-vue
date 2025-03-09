<script setup lang="ts">
import wNav from '@/components/web/nav.vue'
</script>

<template>
  <wNav></wNav>
  <router-view />
</template>

<style lang="less">
body{
  background-color: var(--color-neutral-1);
}

</style>
