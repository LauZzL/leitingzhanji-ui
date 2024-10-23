<template>
  <div class="framework-pack-container">
    <div class="pack-header">
      <el-link :underline="false" @click="changePage('Framework-Pack-Index')">背包</el-link>
      <el-divider direction="vertical" />
      <el-link :underline="false" @click="changePage('Framework-Pack-Lucky')">合成</el-link>
      <el-divider direction="vertical" />
      <el-link :underline="false" @click="changePage('Framework-Pack-Sale')">出售</el-link>
    </div>
    <el-divider />
    <div class="pack-content" >
      <div class="pack-content-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Router from "@/router";

const changePage = (name) => {
  Router.push({ name: name });
}

</script>

<style scoped>
.framework-pack-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.pack-header {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px
}

.pack-content {
  top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
}

.pack-content-main {
  width: 100%;
  height: 100%;
}
</style>
