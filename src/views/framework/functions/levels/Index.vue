<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="攻打" name="one">
                <div>
                    <el-form :inline="true" :model="level_payload" class="demo-form-inline">
                        <el-form-item label="关卡">
                            <el-input-number style="width: 180px;" :min="1" v-model="level_payload.level" size="small"
                                placeholder="请输入攻打的关卡" clearable />
                        </el-form-item>
                        <el-form-item label="次数">
                            <el-input-number style="width: 180px;" :min="1" v-model="level_payload.num" size="small"
                                placeholder="请输入攻打次数" clearable />
                        </el-form-item>
                        <el-form-item label="间隔">
                            <el-input-number style="width: 180px;" :step="100" :min="500" v-model="level_payload.sleeps"
                                size="small" placeholder="请输入攻打间隔" clearable />
                        </el-form-item>
                        <br>
                        <el-form-item label="操作">
                            <el-space>
                                <el-button type="primary" @click="attack(48, level_payload)">攻打</el-button>
                                <el-button type="warning" @click="stop(49)">停止</el-button>
                            </el-space>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="材料" name="cailiao">
                <div>

                    <el-form :inline="true" :model="cailiao_payload" class="demo-form-inline">
                        <el-form-item label="材料">
                            <el-radio-group v-model="cailiao_payload.cailiao">
                                <el-radio :value="0">绿色</el-radio>
                                <el-radio :value="1">蓝色</el-radio>
                                <el-radio :value="2">紫色</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <br>
                        <el-form-item label="间隔">
                            <el-input-number style="width: 180px;" :step="100" :min="500"
                                v-model="cailiao_payload.sleeps" size="small" placeholder="请输入攻打间隔" clearable />
                        </el-form-item>
                        <br>
                        <el-form-item label="操作">
                            <el-space>
                                <el-button type="primary" @click="attack(50, cailiao_payload)">攻打</el-button>
                            </el-space>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="自定义" name="custom">
                <div>
                    <el-form :model="rule_payload" class="demo-form-inline">
                        <el-form-item label="规则">
                            <el-input v-model="rule_payload.attack_rule" style="width: 100%" resize="none" :rows="2" type="textarea"
                                placeholder="请输入规则" />
                        </el-form-item>
                        <el-form-item label="间隔">
                            <el-input-number style="width: 180px;" :step="100" :min="500"
                                v-model="rule_payload.sleeps" size="small" placeholder="请输入攻打间隔" clearable />
                        </el-form-item>
                        <el-form-item label="操作">
                            <el-space>
                                <el-button type="primary" @click="attack(51, rule_payload)">攻打</el-button>
                                <el-button type="warning" @click="stop(52)">停止</el-button>
                            </el-space>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其他" name="other">
                <div>
                    <el-form :inline="true" :model="cailiao_payload" class="demo-form-inline">
                        <el-form-item>
                            <el-checkbox v-model="three_two" @change="toggleThree">3经验双倍</el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Webview from '@/utils/webview'

const level_payload = ref({
    level: 1,
    num: 1,
    sleeps: 1000,
})

const cailiao_payload = ref({
    cailiao: 0,
    sleeps: 1000,
})

const rule_payload = ref({
    attack_rule: '95,96',
    sleeps: 1000
})


const three_two = ref(true)

const attack = (cmd, e) => {
    e.cmd = cmd
    Webview.sendMessageToHost(e)
}

const stop = (e) => {
    Webview.sendMessageToHost({
        cmd: e
    })
}

const toggleThree = (e) => {
    Webview.sendMessageToHost({
        cmd: 701,
        key: "three_two",
        value: e
    })
}

const activeName = ref('one')

const handleClick = (tab, event) => {

}
</script>

<style scoped></style>