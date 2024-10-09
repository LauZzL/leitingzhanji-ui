<template>
  <div>
    <el-tabs v-model="settingStore.setting.level.activeName" class="demo-tabs">
      <el-tab-pane label="攻打" name="one">
        <div>
          <el-form :inline="true" :model="settingStore.setting.level.level_payload" class="demo-form-inline">
            <el-form-item label="关卡">
              <el-input-number style="width: 180px;" :min="1" v-model="settingStore.setting.level.level_payload.level"
                               size="small"
                               placeholder="请输入攻打的关卡" clearable/>
            </el-form-item>
            <el-form-item label="次数">
              <el-input-number style="width: 180px;" :min="1" v-model="settingStore.setting.level.level_payload.num"
                               size="small"
                               placeholder="请输入攻打次数" clearable/>
            </el-form-item>
            <br>
            <el-form-item label="难度">
              <el-checkbox v-model="settingStore.setting.level.level_payload.is_hero">英雄</el-checkbox>
            </el-form-item>
            <el-form-item label="间隔">
              <el-input-number style="width: 180px;" :step="100" :min="500"
                               v-model="settingStore.setting.level.level_payload.sleeps"
                               size="small" placeholder="请输入攻打间隔" clearable/>
            </el-form-item>
            <br>
            <el-form-item label="操作">
              <el-space>
                <el-button type="primary" @click="attack(48, settingStore.setting.level.level_payload)">攻打</el-button>
                <el-button type="warning" @click="stop(49)">停止</el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="材料" name="cailiao">
        <div>
          <el-form :inline="true" :model="settingStore.setting.level.cailiao_payload" class="demo-form-inline">
            <el-form-item label="材料">
              <el-radio-group v-model="settingStore.setting.level.cailiao_payload.cailiao">
                <el-radio :value="0">绿色</el-radio>
                <el-radio :value="1">蓝色</el-radio>
                <el-radio :value="2">紫色</el-radio>
                <el-radio :value="3">战神</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="间隔">
              <el-input-number style="width: 180px;" :step="100" :min="500"
                               v-model="settingStore.setting.level.cailiao_payload.sleeps" size="small"
                               placeholder="请输入攻打间隔" clearable/>
            </el-form-item>
            <el-form-item label="贵族">
              <el-radio-group v-model="settingStore.setting.level.cailiao_payload.vip_level">
                <el-radio :value="0">默认</el-radio>
                <el-radio :value="1">V4及以上</el-radio>
                <el-radio :value="2">V8</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="操作">
              <el-space>
                <el-button type="primary" @click="attack(50, settingStore.setting.level.cailiao_payload)">攻打
                </el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自定义" name="custom">
        <div>
          <el-form :model="settingStore.setting.level.rule_payload" class="demo-form-inline" :inline="true">
            <el-form-item label="规则" style="width: 100%">
              <el-input v-model="settingStore.setting.level.rule_payload.attack_rule" style="width: 100%" resize="none"
                        :rows="2" type="textarea"
                        placeholder="请输入规则"/>
            </el-form-item>
            <br>
            <el-form-item label="难度">
              <el-checkbox v-model="settingStore.setting.level.rule_payload.is_hero">英雄</el-checkbox>
            </el-form-item>
            <el-form-item label="间隔">
              <el-input-number style="width: 180px;" :step="100" :min="500"
                               v-model="settingStore.setting.level.rule_payload.sleeps" size="small"
                               placeholder="请输入攻打间隔" clearable/>
            </el-form-item>
            <br>
            <el-form-item label="操作">
              <el-space>
                <el-button type="primary" @click="attack(51, settingStore.setting.level.rule_payload)">攻打</el-button>
                <el-button type="warning" @click="stop(52)">停止</el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他" name="other">
        <div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="双倍领取">
              <el-radio-group v-model="settingStore.setting.level.two_gain" @change="toggleTwoGain">
                <el-radio value="0">关闭</el-radio>
                <el-radio value="1">任何情况</el-radio>
                <el-radio value="2">3经验双倍</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-alert type="warning" style="margin-bottom: 10px;" :closable="false">
              (原分数修改，不安全，可能封号)金币为分数加成修改，100≈15W分，修改300≈1200金币(仅供参考)，修改过大金币可能不增加，每局最高3000W金币，开启后攻打即可，无需进入关卡，建议换低等级装备刷金币，切勿过大，可能会封号，请三思而后行。
            </el-alert>
            <el-form-item label="金币">
              <el-input v-model="settingStore.setting.level.gold_times" placeholder="请输入分数"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="settingStore.setting.level.enable_gold_times" @change="toggleScore">启用修改
              </el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import Webview from '@/utils/webview'
import {useSettingStore} from "@/store/setting.js";

const settingStore = useSettingStore()

const attack = (cmd, e) => {
  e.cmd = cmd
  Webview.sendMessageToHost(e)
}

const stop = (e) => {
  Webview.sendMessageToHost({
    cmd: e
  })
}

const toggleTwoGain = (e) => {
  Webview.sendMessageToHost({
    cmd: 701,
    key: "two_gain",
    value: e
  })
}

const toggleScore = (e) => {
  Webview.sendMessageToHost({
    cmd: 702,
    key: "gold_times",
    score: settingStore.setting.level.gold_times,
    value: e
  })
}
</script>

<style scoped></style>