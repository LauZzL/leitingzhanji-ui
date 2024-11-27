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
        <el-form-item style="width: 100%;" v-for="item in settingStore.setting.autoDay.b.n" :label="item.label">
          <el-input style="width: 80px" v-model="item.nums">
            <template #suffix>
              <span>次</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="活动">
        <el-form-item style="width: 100%;" v-for="item in settingStore.setting.autoDay.h.n" :label="item.label">
          <el-select multiple style="width: auto;" v-model="item.value">
            <el-option label="简单" :value="0" :key="0"></el-option>
            <el-option label="普通" :value="1" :key="1"></el-option>
            <el-option label="困难" :value="2" :key="2"></el-option>
            <el-option label="极难" :value="3" :key="3"></el-option>
          </el-select>
          <el-input style="width: 80px" v-model="item.nums">
            <template #suffix>
              <span>次</span>
            </template>
          </el-input>
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