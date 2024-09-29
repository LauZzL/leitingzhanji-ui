<template>
    <div>
        <el-alert style="margin-bottom: 5px;" type="warning" show-icon
            :closable="false">防检测开启后需要到闯关模式进入关卡后看到日志提示防检测开启成功才有效，若未看到开启成功就进行游戏可能导致数据结算异常。</el-alert>
      <el-alert style="margin-bottom: 5px;" type="error" show-icon
                :closable="false">畅玩卡使用了拦截器，他是不安全的，所以现在默认关闭了他。</el-alert>
        <el-form :inline="true" :model="payload" class="demo-form-inline">
          <el-form-item>
            <el-checkbox v-model="settingStore.setting.other.changwanka" @change="modify('changwanka', settingStore.setting.other.changwanka)">畅玩卡(月卡)</el-checkbox>
          </el-form-item>
            <el-form-item>
                <el-checkbox v-model="settingStore.setting.other.anti_01" @change="modify('anti_01', settingStore.setting.other.anti_01)">防检测</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="settingStore.setting.other.hdsybj" @change="modify('hdsybj', settingStore.setting.other.hdsybj)">核弹使用不减</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="settingStore.setting.other.fhbjzs" @change="modify('fhbjzs', settingStore.setting.other.fhbjzs)">复活钻石不减</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="settingStore.setting.other.wudi" @change="modify('wudi', settingStore.setting.other.wudi)">无敌(被击中触发,无法自杀)</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Webview from '@/utils/webview'
import {useSettingStore} from "@/store/setting.js";

const settingStore = useSettingStore()

const payload = ref({
    cmd: 701,
})

const modify = (key, e) => {
    payload.value.value = e
    payload.value.key = key
    Webview.sendMessageToHost(payload.value)
}


</script>

<style scoped></style>