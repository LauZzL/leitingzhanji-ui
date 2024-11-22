<script setup>
import BackPackItem from "@/components/common/BackPackItem.vue";
import {useBackPackStore} from "@/store/backpack.js";
import {useSettingStore} from "@/store/setting.js";
import {Refresh} from "@element-plus/icons-vue";
import Webview from "@/utils/webview.js";

const backPackStore = useBackPackStore();
const settingStore = useSettingStore();

const getUserInfo = () => {
  Webview.sendMessageToHost({
    cmd: 77
  })
}
</script>

<template>
  <div>
    <div class="framework-pack-backpack">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>背包</span>
            <el-button circle :icon="Refresh" @click="getUserInfo"></el-button>
          </div>
        </template>
        <el-tabs v-model="settingStore.setting.backpack.activeName" class="demo-tabs">
          <el-tab-pane label="装备" name="equips">
            <el-space wrap v-if="backPackStore.backpack?.equips">
              <back-pack-item v-for="item in backPackStore.backpack.equips" :item='item' :type="0"></back-pack-item>
            </el-space>
          </el-tab-pane>
          <el-tab-pane label="物品" name="items">
            <el-space wrap v-if="backPackStore.backpack?.items">
              <back-pack-item v-for="item in backPackStore.backpack.items" :item='item' :type="1"></back-pack-item>
            </el-space>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>