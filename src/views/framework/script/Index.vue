<template>
    <div class="framework-script-container">
        <div class="script-header">
            <el-link :underline="false" @click="changePage('Framework-Script-Editor')">编辑</el-link>
            <el-divider direction="vertical" />
            <el-link :underline="false" @click="changePage('Framework-Script-Local')">运行</el-link>
        </div>
        <el-divider />
        <div class="script-content" >
            <div class="script-content-main">
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
.framework-script-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
}

.script-header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px
}

.script-content {
    top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
}

.script-content-main {
    width: 100%;
    height: 100%;
}
</style>
