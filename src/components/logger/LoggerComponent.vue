<template>
    <el-scrollbar always class="logger" height="200px" ref="loggerScrollbarRefs">
        <div style="margin-top: 5px;" v-for="(log, index) in props.logger" :key="index" v-html="log">

        </div>
        <div style="height: 50px; width: 100%;"></div>
    </el-scrollbar>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';

const props = defineProps({
    logger: Array
})

const loggerScrollbarRefs = ref(null);

function scrollToBottom() {
    const loggerHeight = document.querySelector('.el-scrollbar__view').scrollHeight;
    const content = loggerScrollbarRefs.value;
    if (!content) return;
    content.scrollTo({
        top: loggerHeight,
        behavior: 'smooth',
    })
}

watch(props.logger, () => {
    nextTick(() => {

    })
})

</script>

<style scoped>
.logger {
    padding-left: 10px;
    border: 1px solid #ccc;
}

.el-scrollbar {
    height: auto;
}
</style>