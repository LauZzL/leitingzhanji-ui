<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="关卡">
                <el-radio-group v-model="level">
                    <el-radio :value="'loong'">天龙座(装甲)</el-radio>
                    <el-radio :value="'bird'">白鸟座(副武器)</el-radio>
                    <el-radio :value="'horse'">天马座(战机)</el-radio>
                    <el-radio :value="'female'">仙女座(僚机)</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="难度">
                <el-radio-group v-model="sub">
                    <el-radio :value="0">简单</el-radio>
                    <el-radio :value="1">普通</el-radio>
                    <el-radio :value="2">困难</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="攻打次数">
                <el-input-number style="width: 100px;" :step="1" :min="1" v-model="nums" size="small"
                    placeholder="请输入攻打次数" clearable />
            </el-form-item>
            <el-form-item label="Timer">
                <el-input-number style="width: 180px;" :step="1" :min="1" v-model="attack_timer" size="small"
                    placeholder="请输入整数" clearable />
            </el-form-item>
            <br>
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
    'loong': 1,
    'bird': 2,
    'horse': 0,
    'female': 3
})

const level = ref('horse')
const sub = ref(2)

const nums = ref(1)
const attack_timer = ref(35)

const attack = () => {
    Webview.sendMessageToHost({
        cmd: 802,
        type: level.value,
        id: form.value[level.value],
        sub: sub.value,
        nums: nums.value,
        attack_timer: attack_timer.value
    })
}

</script>

<style scoped></style>