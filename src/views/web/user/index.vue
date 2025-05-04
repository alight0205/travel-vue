<script setup lang="ts">
import Main from '@/components/common/Main.vue'
</script>

<template>
      <div class="uCom">
        <div class="ucontainer">
         <router-view></router-view>
        </div>
    </div>
</template>

<style lang="less" scoped>
.uCom {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 65px;
    background-color: var(--color-neutral-2);

    >.ucontainer {
        width: 1200px;
        min-height: calc(100vh - 122px);
    }
}
</style>