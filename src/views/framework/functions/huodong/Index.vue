<template>
    <div>
        <el-form>
            <el-form-item label="关卡">
                <el-radio-group v-model="level">
                    <el-radio :value="'meteorite'">陨石陷阱(金币)</el-radio>
                    <el-radio :value="'laser'">激光迷宫(经验)</el-radio>
                    <el-radio :value="'missile'">导弹猎场(材料)</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="难度">
                <el-radio-group v-model="sub">
                    <el-radio :value="0">简单</el-radio>
                    <el-radio :value="1">普通</el-radio>
                    <el-radio :value="2">困难</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="attack">攻打</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Webview from '@/utils/webview'

const form = ref({
    'meteorite': 0,
    'laser': 1,
    'missile': 2
})

const level = ref('meteorite')
const sub = ref(2)

const attack = () => {
    Webview.sendMessageToHost({
        cmd: 801,
        type: level.value,
        id: form.value[level.value],
        sub: sub.value
    })
}

</script>

<style scoped></style>