<template>
    <div class="framework-request-container">
        <div class="request-header">
            <el-link :underline="false" @click="changePage('Framework-Request-Network')">网络</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Request-Mock')">封包</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Request-Local')">运行</el-link>
        </div>
        <el-divider />
        <div class="request-content" >
            <div class="request-content-main">
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
.framework-request-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
}

.request-header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px
}

.request-content {
    top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
}

.request-content-main {
    width: 100%;
    height: 100%;
}
</style>
