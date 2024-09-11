<template>
    <div class="framework-functions-container">
        <div class="functions-header">
            <el-link :underline="false" @click="changePage('Framework-Functions-Day')">日常</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Levels')">闯关</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Endless')">无尽</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Huodong')">活动关卡</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Boss')">BOSS关卡</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Shuzhi')">数值</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Functions-Other')">其他</el-link>
        </div>
        <el-divider />
        <div class="functions-content">
            <div class="functions-content-main">
                <router-view />
            </div>
            <div class="functions-content-log">
                <logger-component :logger="loggerStore.logger" ref="logger" />
            </div>
        </div>
    </div>
</template>

<script setup>
import LoggerComponent from "@/components/logger/LoggerComponent.vue";
import { useLoggerStore } from '@/store/logger';
import Router from "@/router";
import { ref } from "vue";

const loggerStore = useLoggerStore();

const changePage = (name) => {
    Router.push({ name: name });
}

const logger = ref(null);
</script>

<style scoped>
.framework-functions-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.functions-header{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px
}

.functions-content {
    top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
}

.functions-content-main {
    width: 100%;
}

.functions-content-log {
    width: 100%;
    overflow: hidden;
}
</style>