<script setup>
import {useSettingStore} from "@/store/setting.js";
import Webview from "@/utils/webview.js";

const settingStore = useSettingStore();

const toggleScore = (e) => {
  Webview.sendMessageToHost({
    cmd: 702,
    key: "gold_times",
    score: settingStore.setting.level.gold_times,
    value: e
  })
}

</script>

<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-alert type="error" style="margin-bottom: 10px;" :closable="false">
        该功能将不再支持
      </el-alert>
      <el-alert type="warning" style="margin-bottom: 10px;" :closable="false">
        (原分数修改，不安全，可能封号)金币为分数加成修改，100≈15W分，修改300≈1200金币(仅供参考)，修改过大金币可能不增加，每局最高3000W金币，开启后攻打即可，无需进入关卡，建议换低等级装备刷金币，切勿过大，可能会封号，请三思而后行。
      </el-alert>
      <el-alert type="success" style="margin-bottom: 10px;" :closable="true">
        修改成功后攻打闯关、BOSS关卡、活动关卡均会生效。
      </el-alert>
      <el-form-item label="金币">
        <el-input v-model="settingStore.setting.level.gold_times" placeholder="请输入分数" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="settingStore.setting.level.enable_gold_times" @change="toggleScore" disabled>启用修改
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>