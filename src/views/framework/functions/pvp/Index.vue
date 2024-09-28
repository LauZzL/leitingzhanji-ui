<template>
  <div>
    <el-alert title="一键攻打不会胜利，金币不足请使用闯关获取" type="warning" />
    <br>
    <el-form :inline="true">
      <el-form-item label="赛场">
        <el-radio-group v-model="settingStore.setting.pvp.type">
          <el-radio :value="0">金币场</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="次数">
        <el-input-number style="width: 100px;" :step="1" :min="1" v-model="settingStore.setting.pvp.nums" size="small"
                         placeholder="请输入次数" clearable />
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="attack">攻打</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import Webview from '@/utils/webview'
import {useSettingStore} from "@/store/setting.js";

const settingStore = useSettingStore()

const attack = () => {
  Webview.sendMessageToHost({
    cmd: 4002,
    type: settingStore.setting.pvp.type,
    nums: settingStore.setting.pvp.nums,
  })
}

</script>

<style scoped></style>