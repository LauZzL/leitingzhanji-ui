<template>
  <div class="framework-functions-container">
    <div class="functions-header">
      <el-link :underline="false" @click="changePage('Framework-Functions-AutoDay')">自动化</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Day')">日常</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-PVP')">PVP</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Levels')">闯关</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Endless')">无尽</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Huodong')">活动关卡</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Boss')">BOSS关卡</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Shuzhi')">数值</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Gold')">金币</el-link>
      <el-divider direction="vertical"/>
      <el-link :underline="false" @click="changePage('Framework-Functions-Other')">其他</el-link>
    </div>
    <el-divider/>
    <div class="functions-content">
      <div class="functions-content-main">
        <el-scrollbar :height="`${height}px`">
          <router-view/>
        </el-scrollbar>
      </div>
      <div class="functions-content-log">
        <logger-component :logger="loggerStore.logger" ref="logger"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoggerComponent from "@/components/logger/LoggerComponent.vue";
import {useLoggerStore} from '@/store/logger';
import Router from "@/router";
import {ref,onMounted,onUnmounted} from "vue";

const loggerStore = useLoggerStore();

const changePage = (name) => {
  Router.push({name: name});
}

const logger = ref(null);


const height = ref(window.innerHeight - 360)

// 监听窗口大小变化
window.onresize = () => {
  height.value = window.innerHeight - 360;
}

const handleResize = () => {
  height.value = window.innerHeight - 360;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});


</script>

<style scoped>
.framework-functions-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.functions-header {
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