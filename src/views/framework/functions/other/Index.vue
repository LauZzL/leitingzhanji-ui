<template>
    <div>
        <el-alert style="margin-bottom: 5px;" type="warning" show-icon
            :closable="false">防检测开启后需要到闯关模式进入关卡后看到日志提示防检测开启成功才有效，若未看到开启成功就进行游戏可能导致数据结算异常。</el-alert>
        <el-form :inline="true" :model="payload" class="demo-form-inline">
            <el-form-item>
                <el-checkbox v-model="anti_01" @change="modify('anti_01', anti_01)">防检测</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="hdsybj" @change="modify('hdsybj', hdsybj)">核弹使用不减</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="fhbjzs" @change="modify('fhbjzs', fhbjzs)">复活钻石不减</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="wudi" @change="modify('wudi', wudi)">无敌(被击中触发,无法自杀)</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Webview from '@/utils/webview'


const anti_01 = ref(false)
const hdsybj = ref(false)
const fhbjzs = ref(false)
const wudi = ref(false)


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