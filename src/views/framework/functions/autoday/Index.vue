<script setup>
import {ref} from "vue";
import {useSettingStore} from "@/store/setting.js";
import Webview from "@/utils/webview.js";

const settingStore = useSettingStore();

const content_height = ref(window.innerHeight - 360)

// 监听窗口大小变化
window.onresize = () => {
  content_height.value = window.innerHeight - 360;
}

const executor = () => {
  Webview.sendMessageToHost({
    cmd: 233,
    task: encodeURIComponent(JSON.stringify(settingStore.setting.autoDay))
  })
}

const editAuto = (e) => {
  console.log(e)
}
</script>

<template>
  <el-scrollbar :height="content_height">
    <el-form :inline="false" label-width="auto">
      <el-form-item label="领取">
        <el-space wrap>
          <el-checkbox-group v-model="settingStore.setting.autoDay.c" @change="editAuto">
            <el-checkbox label="商城奖励" value="202" />
            <el-checkbox label="体力x4次"  value="201"/>
            <el-checkbox label="装备宝箱"  value="203"/>
            <el-checkbox label="星际探索"  value="204"/>
            <el-checkbox label="幸运转盘"  value="205"/>
            <el-checkbox label="弹幕钻石"  value="207"/>
            <el-checkbox label="桌面启动钻石"  value="208"/>
            <el-checkbox label="助战金币"  value="214"/>
          </el-checkbox-group>
        </el-space>
      </el-form-item>
      <el-form-item label="闯关">
        <el-checkbox label="攻打" v-model="settingStore.setting.autoDay.a.enable"></el-checkbox>
        <el-checkbox label="英雄" v-model="settingStore.setting.autoDay.a.is_hero"></el-checkbox>
        <el-input style="margin-left: 10px" placeholder="请输入规则" v-model="settingStore.setting.autoDay.a.attack_rule"></el-input>
      </el-form-item>
      <el-form-item label="BOSS">
        <el-form-item v-for="item in settingStore.setting.autoDay.b.n" :label="item.label">
          <el-input-number style="width: 100%" v-model="item.nums"></el-input-number>
        </el-form-item>
      </el-form-item>
      <el-form-item label="操作">
        <el-button @click="executor">执行</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<style scoped>

</style>