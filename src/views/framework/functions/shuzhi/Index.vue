<template>
    <div>
        <el-form :inline="true" :model="payload" class="demo-form-inline">
            <el-form-item label="战机伤害">
                <el-input type="number" :step="100000" v-model="engineDamage" placeholder="请输入战机伤害"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="modify('engineDamage', engineDamage)">修改</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="副武器伤害">
                <el-input type="number" :step="100000" v-model="weaponDamage" placeholder="请输入副武器伤害"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="modify('weaponDamage', weaponDamage)">修改</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="僚机伤害">
                <el-input type="number" :step="100000" v-model="wingmanDamage" placeholder="请输入僚机伤害"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="modify('wingmanDamage', wingmanDamage)">修改</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="战机血量">
                <el-input type="number" :step="100000" v-model="engineHp" placeholder="请输入战机血量"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="modify('engineHp', engineHp)">修改</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="对局分数">
                <el-input type="number" :step="100" v-model="score" placeholder="请输入对局分数"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="modify('score', score)">修改</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-alert style="margin-top: 5px;" type="warning" show-icon :closable="false">伤害数值过大可能造成BOSS血量负数无法击杀，分数修改100≈15W</el-alert>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Webview from '@/utils/webview'

const engineDamage = ref(100000)
const weaponDamage = ref(100000)
const wingmanDamage = ref(100000)
const engineHp = ref(5000000)
const score = ref(100)

const payload = ref({
    cmd: 701,
})

const modify = (key, value) => {
    payload.value.value = value
    payload.value.key = key
    Webview.sendMessageToHost(payload.value)
}

</script>

<style scoped>
.input-with-btn {
    width: 180px;
}
</style>