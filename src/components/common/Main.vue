<script setup lang="ts"></script>


<template>
    <div class="mainCom">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="less">
.mainCom {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 65px;
    background-color: var(--color-neutral-2);

    >.container {
        width: 1200px;
        min-height: calc(100vh - 122px);
    }
}
</style>