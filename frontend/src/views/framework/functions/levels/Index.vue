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
            <el-form-item label="Timer">
              <el-input-number style="width: 180px;" :step="1" :min="1"
                               v-model="settingStore.setting.level.level_payload.attack_timer" size="small"
                               placeholder="请输入整数" clearable/>
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
            <el-form-item label="Timer">
              <el-input-number style="width: 180px;" :step="1" :min="1"
                               v-model="settingStore.setting.level.cailiao_payload.attack_timer" size="small"
                               placeholder="请输入整数" clearable/>
            </el-form-item>
            <br>
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
                <el-button type="warning" @click="stop(53)">停止</el-button>
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
            <el-form-item label="操作">
              <el-space>
                <el-button type="info" @click="editor_visible = true">规则编辑器</el-button>
                <el-button type="primary" @click="attack(51, {
                  attack_rule: JSON.parse(settingStore.setting.level.rule_payload.attack_rule)
                })">攻打
                </el-button>
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
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="editor_visible" :show-close="false" width="450">
      <template #header="{ close, titleId, titleClass }">
        <div class="edit_header">
          <h4 :id="titleId" :class="titleClass">规则编辑器</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled/>
            </el-icon>
            关闭
          </el-button>
        </div>
      </template>
      <div>
        <el-form>
          <el-form-item label="关卡">
            <el-input type="number" v-model="edit_form.level"></el-input>
          </el-form-item>
          <el-form-item label="难度">
            <el-checkbox v-model="edit_form.is_hero">英雄</el-checkbox>
          </el-form-item>
          <el-form-item label="双倍">
            <el-radio-group v-model="edit_form.two_gain">
              <el-radio :value="0">关闭</el-radio>
              <el-radio :value="1">任何情况</el-radio>
              <el-radio :value="2">3经验双倍</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Timer">
            <el-input-number style="width: 180px;" :step="1" :min="1" v-model="edit_form.attack_timer" size="small"
                             placeholder="请输入整数" clearable/>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="add_rule" plain>添加</el-button>
            <el-button type="success" @click="editor_visible = false" plain>完成</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="rules" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="level" label="关卡"></el-table-column>
          <el-table-column prop="is_hero" label="难度">
            <template #default="scope">
              {{ scope.row.is_hero ? '英雄' : '普通' }}
            </template>
          </el-table-column>
          <el-table-column prop="two_gain" label="双倍领取">
            <template #default="scope">
              {{ scope.row.two_gain === 0 ? '关闭' : scope.row.two_gain === 1 ? '任何情况' : '3经验双倍' }}
            </template>
          </el-table-column>
          <el-table-column prop="attack_timer" label="Timer"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type="danger" size="small" @click="delete_rule(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import Webview from '@/utils/webview'
import {useSettingStore} from "@/store/setting.js";
import {CircleCloseFilled} from "@element-plus/icons-vue";
import {ref, computed} from "vue";

const settingStore = useSettingStore()
const editor_visible = ref(false)
const edit_form = ref({
  level: 1,
  is_hero: false,
  two_gain: 0,
  attack_timer: 10
})
const rules = computed(() => {
  try {
    return JSON.parse(settingStore.setting.level.rule_payload.attack_rule)
  } catch (e) {
    return []
  }
})


const add_rule = () => {
  const rules = JSON.parse(settingStore.setting.level.rule_payload.attack_rule);
  if (Array.isArray(rules)) {
    rules.push(JSON.parse(JSON.stringify(edit_form.value)));
    settingStore.setting.level.rule_payload.attack_rule = JSON.stringify(rules);
  } else {
    settingStore.setting.level.rule_payload.attack_rule = JSON.stringify(edit_form.value);
  }
}

const delete_rule = (e) => {
  const rules = JSON.parse(settingStore.setting.level.rule_payload.attack_rule);
  rules.splice(e, 1);
  settingStore.setting.level.rule_payload.attack_rule = JSON.stringify(rules);
}


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
</script>

<style scoped>
.edit_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}
</style>