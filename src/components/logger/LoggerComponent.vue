<template>
    <el-scrollbar always class="logger" height="200px">
        <div style="margin-top: 5px;display: flex;" v-for="(log, index) in props.logger" :key="index" v-html="log">

        </div>
        <div style="height: 50px; width: 100%;"></div>
    </el-scrollbar>
</template>

<script setup>

const props = defineProps({
    logger: Array
})



</script>

<style scoped>
.logger {
    padding-left: 10px;
    border: max(1px, 0.0625rem) solid #3d444d !important;
}

.el-scrollbar {
    height: auto;
}
</style>