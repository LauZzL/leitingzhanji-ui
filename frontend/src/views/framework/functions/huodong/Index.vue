<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="关卡">
        <el-radio-group v-model="settingStore.setting.huodong.level">
          <el-radio :value="'meteorite'">陨石陷阱(金币)</el-radio>
          <el-radio :value="'laser'">激光迷宫(经验)</el-radio>
          <el-radio :value="'missile'">导弹猎场(材料)</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="难度">
        <el-radio-group v-model="settingStore.setting.huodong.sub">
          <el-radio :value="0">简单</el-radio>
          <el-radio :value="1">普通</el-radio>
          <el-radio :value="2">困难</el-radio>
          <el-radio :value="3">极难</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="攻打次数">
        <el-input-number style="width: 100px;" :step="1" :min="1" v-model="settingStore.setting.huodong.nums"
                         size="small"
                         placeholder="请输入攻打次数" clearable/>
      </el-form-item>
      <el-form-item label="Timer">
        <el-input-number style="width: 180px;" :step="1" :min="1"
                         v-model="settingStore.setting.huodong.attack_timer" size="small"
                         placeholder="请输入整数" clearable/>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="attack">攻打</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Webview from '@/utils/webview'
import {useSettingStore} from "@/store/setting.js";

const settingStore = useSettingStore()

const form = ref({
  'meteorite': 0,
  'laser': 1,
  'missile': 2
})


const attack = () => {
  Webview.sendMessageToHost({
    cmd: 801,
    type: settingStore.setting.huodong.level,
    id: form.value[settingStore.setting.huodong.level],
    sub: settingStore.setting.huodong.sub,
    nums: settingStore.setting.huodong.nums,
    attack_timer: settingStore.setting.huodong.attack_timer
  })
}

</script>

<style scoped></style>