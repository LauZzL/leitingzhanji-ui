<template>
    <div>
        <el-space>
            <el-button @click="sendCmd({ cmd:201 })">每日广告体力×1次</el-button>
            <el-button @click="sendCmd({ cmd:206 })">每日广告体力×4次</el-button>
            <el-button @click="sendCmd({ cmd:202 })">商城广告奖励</el-button>
            <el-button @click="sendCmd({ cmd:203 })">寻宝装备宝箱</el-button>
            <el-button @click="sendCmd({ cmd:204 })">星际探索</el-button>
            <el-button @click="sendCmd({ cmd:205 })">幸运转盘</el-button>
        </el-space>
    </div>
</template>

<script setup>
import  Webview from "@/utils/webview"

const sendCmd = (data) => {
    Webview.sendMessageToHost(data)
}


</script>

<style scoped>

</style>