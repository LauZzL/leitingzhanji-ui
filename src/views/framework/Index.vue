<template>
  <el-watermark class="common-layout" :color="font.color" :content="['网易云音乐3']">
    <music-player></music-player>
    <el-container>
      <el-aside style="width: auto;">
        <menu-component style="height: 100%"></menu-component>
      </el-aside>
      <el-main style="overflow: auto; margin: 0; padding-top: 0;">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
        </router-view>
      </el-main>
    </el-container>
  </el-watermark>
</template>

<script setup>
import MenuComponent from "@/components/aside/menuComponent.vue";
import { useMessageStore } from '@/store/message';
import { useLoggerStore } from '@/store/logger';
import { useUserStore } from "@/store/user";
import { useShopStore } from "@/store/shop";
import { useExecutorStore } from "@/store/executor";
import { useNemStore } from '@/store/nem';
import {useScriptStore} from "@/store/script.js";
import {useSettingStore} from "@/store/setting.js";
import {useBackPackStore} from "@/store/backpack.js";
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import Webview from '@/utils/webview'

import { reactive, watch } from 'vue'
import { useDark } from '@vueuse/core'
import gain from "@/utils/gain";
import MusicPlayer from "@/components/common/MusicPlayer.vue";

const isDark = useDark()

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

watch(
  isDark,
  () => {
    font.color = isDark.value
      ? 'rgba(255, 255, 255, .15)'
      : 'rgba(0, 0, 0, .15)'
  },
  {
    immediate: true,
  }
)

const messageStore = useMessageStore();
const loggerStore = useLoggerStore();
const userStore = useUserStore();
const shopStore = useShopStore();
const executorStore = useExecutorStore();
const nemStore = useNemStore();
const scriptStore = useScriptStore();
const settingStore = useSettingStore();
const backpackStore = useBackPackStore();

chrome.webview.addEventListener("message", function messageEvent(evt) {
  let data = evt.data
  data = JSON.parse(decodeURIComponent(data))
  if (data.cmd == -1) {
    ElMessage({
      showClose: true,
      message: data.message,
      type: data.type
    })
  }else if (data.cmd == 10216) {
    settingStore.setting.cdk_str = data.data.join('\n')
  }else if(data.cmd == 77){
    userStore.setUser(data.data)
    backpackStore.backpack.equips = [];
    backpackStore.backpack.items = [];
    backpackStore.backpack.items = gain.json_parse4equips(data.data.items)
    backpackStore.backpack.equips = gain.json_parse4equips(data.data.equips)
  }else if(data.cmd == 999){
    hasUpdate(data.message)
  }else if(data.cmd == 233){
    settingStore.setting.autoDay = data.data
  }else if(data.cmd == 153826){
    const lucky_gain = gain.gain_raw2json(data.data.gain_raw, true)
    const used_items = data.data.used_items
    const luckyValue = data.data.luckyValue
    const luckyType = data.data.luckyType
    // 将最新的幸运值更新到本地
    userStore?.user?.allLuckys.forEach(lucky => {
      if (lucky.type === Number(luckyType)) {
        lucky.luckyValue = Number(luckyValue)
      }
    })
    // 获取使用的物品的id集合
    let usedItemIds = new Set(used_items.map(item => item.id));
    // 过滤掉所有物品中使用的物品
    backpackStore.backpack.equips = backpackStore.backpack.equips.filter(item => !usedItemIds.has(item.data.id));
    backpackStore.backpack.lucky = lucky_gain
  }else if(data.cmd == 153827){
    const used_items = data.data.used_items
    let usedItemIds = new Set(used_items.map(item => item.id));
    backpackStore.backpack.equips = backpackStore.backpack.equips.filter(item => !usedItemIds.has(item.data.id))
    backpackStore.backpack.items = backpackStore.backpack.items.filter(item => !usedItemIds.has(item.data.id))
  }else if (data.cmd == 301 && messageStore.capture) {
    data.index = messageStore.network.length + 1
    messageStore.addNetwork(data)
  }else if (200 < data.cmd && data.cmd < 300) {
    loggerStore.add(decodeURI(data.message))
  }else if (data.cmd == 48 || data.cmd == 49) {
    loggerStore.add(decodeURI(data.message))
  }else if (data.cmd == 793) {
    shopStore.setShop(data.data)
  }else if (data.cmd == 1002) {
    executorStore.setExecutor(data.data)
  }else if (data.cmd == 1003) {
    loggerStore.add_packet(data.message)
  }else if (data.cmd == 1007) {
    nemStore.setNem(data.data)
  }else if (data.cmd == 3002) {
    scriptStore.setScript(decodeURIComponent(atob(data.data.code)))
    return
  }else if (data.cmd == 3007) {
    scriptStore.setScripts(data.data)
    return
  }else if (data.cmd >= 3000 && data.cmd <= 3100) {
    loggerStore.add_script(data.message)
  }
  return 
})

const hasUpdate = (msg) => {
  ElMessageBox.confirm(
    msg,
    '更新提示',
    {
      confirmButtonText: '前往更新',
      cancelButtonText: '取消更新',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      window.open('https://github.com/LauZzL/leitingzhanji-ui/releases')
    })
    .catch(() => {
      // on cancel
    })
}

Webview.sendMessageToHost({
  cmd: '999'
})

</script>

<style scoped>
.common-layout,
.el-container {
  height: 100%;
  width: 100%;
}
</style>