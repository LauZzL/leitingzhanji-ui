<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="购买道具">
                <el-select v-model="settingStore.setting.endless.daoju" placeholder="道具" style="width: 100px;">
                    <el-option v-for="item in shopStore.shop" :key="item.value" :label="item.name"
                        :value="item.value" />
                </el-select>
                <el-input type="number" :min="1" :max="32767" v-model="settingStore.setting.endless.buy_num" placeholder="购买数量" style="width: 160px;margin-left: 10px;"
                    class="input-with-btn">
                    <template #append>
                        <el-button @click="buy">购买</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <br>
            <el-form-item label="无尽宝箱">
                <el-select v-model="settingStore.setting.endless.boss_num" placeholder="一键数量" style="width: 100px;">
                    <el-option v-for="item in boss_list" :key="item" :label="item" :value="item" />
                </el-select>
                <el-space style="margin-left: 10px;">
                    <el-button @click="attack(0)">
                        攻打BOSS宝箱
                    </el-button>
                    <el-button @click="attack(1)">
                        攻打海盗宝箱(单次限1)
                    </el-button>
                </el-space>
            </el-form-item>
            <br>
            <el-form-item label="攻打次数">
                <el-input-number style="width: 100px;" :step="1" :min="1" v-model="settingStore.setting.endless.nums" size="small"
                    placeholder="请输入攻打次数" clearable />
            </el-form-item>
            <br>
            <el-form-item label="无尽祝福">
                <el-select v-model="settingStore.setting.endless.zhufu" placeholder="祝福类型" style="width: 100px;" @change="modify('zhufu', settingStore.setting.endless.zhufu)">
                    <el-option v-for="item in zhufu_list" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
                <el-checkbox @change="modify('enable_zhufu', settingStore.setting.endless.enable_zhufu)" v-model="settingStore.setting.endless.enable_zhufu"
                    style="margin-left: 10px;">
                    启用
                </el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useShopStore } from '@/store/shop';
import {useSettingStore} from "@/store/setting.js";
import Webview from '@/utils/webview'

const shopStore = useShopStore();
const settingStore = useSettingStore();


const boss_list = ref(Array.from({ length: 5 }, (_, index) => index + 1))
const zhufu_list = ref([
    {
        name: '90级曙光',
        value: 1
    },
    {
        name: '90级异形',
        value: 2
    },
    {
        name: '24波突破',
        value: 3
    }
])

const buy = () => {
    Webview.sendMessageToHost({
        cmd: 793,
        num: settingStore.setting.endless.buy_num,
        daoju: settingStore.setting.endless.daoju
    })
}

const attack = (type) => {
    Webview.sendMessageToHost({
        cmd: 794,
        num: settingStore.setting.endless.boss_num,
        type: type,
        nums: settingStore.setting.endless.nums,
        attack_timer: settingStore.setting.endless.attack_timer
    })
}

const payload = ref({
    cmd: 701,
})

const modify = (key, value) => {
    payload.value.value = value
    payload.value.key = key
    Webview.sendMessageToHost(payload.value)
}

</script>

<style scoped></style>