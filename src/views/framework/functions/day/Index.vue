<template>
  <div>
    <el-space wrap>
      <el-button @click="sendCmd({ cmd:206 })">每日广告体力×1次</el-button>
      <el-button @click="sendCmd({ cmd:201 })">每日广告体力×4次</el-button>
      <el-button @click="sendCmd({ cmd:202 })">商城广告奖励</el-button>
      <el-button @click="sendCmd({ cmd:203 })">寻宝装备宝箱</el-button>
      <el-button @click="sendCmd({ cmd:204 })">星际探索</el-button>
      <el-button @click="sendCmd({ cmd:205 })">幸运转盘</el-button>
      <el-button @click="sendCmd({ cmd:207 })">弹幕钻石</el-button>
      <el-button @click="sendCmd({ cmd:208 })">桌面启动钻石</el-button>
      <el-button @click="sendCmd({ cmd:209 })">奖励-无尽宝箱x3</el-button>
      <el-button @click="sendCmd({ cmd:210 })">奖励-100体力</el-button>
      <el-button @click="sendCmd({ cmd:211 })">活跃度领取</el-button>
      <el-button @click="sendCmd({ cmd:212 })">白银宝箱10连抽</el-button>
      <el-button @click="sendCmd({ cmd:213 })">黄金宝箱10连抽</el-button>
      <el-button @click="sendCmd({ cmd:214 })">助战金币领取</el-button>
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