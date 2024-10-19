<template>
  <div class="framework-index-container">
    <div class="framework-index-desc">
      <el-text class="mx-1" type="danger">该项目仅供学习交流，纯免费项目，请勿用于非法行为，谨防金钱交易。</el-text>
      <br>
      <el-text>
        Star 该项目
        <el-link type="primary" target="_blank"
                 href="https://github.com/LauZzL/leitingzhanji-ui">Github
        </el-link>
        ，如有任何问题请访问
        <el-link type="primary" target="_blank"
                 href="https://github.com/LauZzL/leitingzhanji-ui/issues">Github Issues
        </el-link>
        <br>
        <el-alert style="margin-top: 5px;" type="warning" show-icon :closable="false">
          部分情况亮色模式下日志输出可能影响阅读，建议使用暗黑模式
        </el-alert>
      </el-text>
    </div>
    <div class="framework-index-opration">
      <el-card>
        <div style="display: flex;justify-content: space-between;">
          <el-space>
            <el-button @click="initSunnyNetCore" plain>
              <svg-icon style="width: 16px; height: 16px;"
                        iconName="icon-chushihua"/>&nbsp;初始化
            </el-button>
            <el-button @click="closeSunnyNetCore" plain>
              <svg-icon style="width: 16px; height: 16px;"
                        iconName="icon-guanbichushihua"/>&nbsp;关闭
            </el-button>
          </el-space>
          <el-button circle :icon="isDark ? Moon : Sunny" @click="toggleDark"></el-button>
        </div>
      </el-card>
    </div>
    <div class="framework-index-user">
      <el-card style="width: 100%">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
            <el-button circle :icon="Refresh" @click="getUserInfo"></el-button>
          </div>
        </template>
        <div class="framework-index-user-left">
          <div class="framework-index-user-left-avatar">
            <el-image fit="fill" style="width: 100%; height: 100%; border-radius: 5px;"
                      :src="userStore?.user?.avatar?userStore?.user?.avatar:'https://cravatar.cn/avatar/?d=wavatar'"></el-image>
          </div>
          <div class="framework-index-user-left-info">
            <el-descriptions border>
              <el-descriptions-item label="昵称">{{ nickname() }}</el-descriptions-item>
              <el-descriptions-item label="VIP">{{
                  userStore?.user?.vip ? userStore?.user?.vip : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="UID">
                <el-tag size="small">{{ userStore?.user?.uid ? userStore?.user?.uid : '未获取到' }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="体力">{{
                  userStore?.user?.energy ? userStore?.user?.energy : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="背包">{{
                  userStore?.user?.pack ? userStore?.user?.pack : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="金币">{{
                  userStore?.user?.gold ? userStore?.user?.gold : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="钻石">{{
                  userStore?.user?.diamonds ? userStore?.user?.diamonds : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="PVP币">{{
                  userStore?.user?.pvp_coin ? userStore?.user?.pvp_coin : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="今日PVP">
                {{ userStore?.user?.daily_pvp_coin ? userStore?.user?.daily_pvp_coin : '未获取到' }}
              </el-descriptions-item>
              <el-descriptions-item label="氪金">{{
                  userStore?.user?.recharge ? userStore?.user?.recharge : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="战力">{{
                  userStore?.user?.zhanli ? userStore?.user?.zhanli : '未获取到'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="本周无尽">
                {{ userStore?.user?.week_score ? userStore?.user?.week_score : '未获取到' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>
    </div>
    <div class="framework-index-backpack">
      <el-card style="width: 100%">
        <template #header>
          <div class="card-header">
            <span>背包</span>
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

<script setup>
import {Refresh} from '@element-plus/icons-vue'
import {useUserStore} from '@/store/user';
import {useSettingStore} from "@/store/setting.js";
import {useBackPackStore} from "@/store/backpack.js";
import Webview from '@/utils/webview'
import {useDark, useToggle} from '@vueuse/core'
import {Sunny, Moon} from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';
import {nextTick, ref} from 'vue'
import BackPackItem from "@/components/common/BackPackItem.vue";


const isDark = useDark()


const userStore = useUserStore();
const settingStore = useSettingStore();
const backPackStore = useBackPackStore();

const nickname = () => {
  if (userStore?.user?.nickname?.length > 10) {
    return userStore?.user?.nickname.substring(0, 10) + '...'
  }
  return userStore?.user?.nickname ? userStore?.user?.nickname : '未获取到'
}

const toggleDark = (event) => {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
            {
              clipPath: isDark.value
                  ? [...clipPath].reverse()
                  : clipPath,
            },
            {
              duration: 400,
              easing: 'ease-out',
              pseudoElement: isDark.value
                  ? '::view-transition-old(root)'
                  : '::view-transition-new(root)',
            },
        )
      })
}

const initSunnyNetCore = () => {
  ElMessage.info('开始初始化SunnyNetCore')
  Webview.sendMessageToHost({
    cmd: 1
  })
}

const closeSunnyNetCore = () => {
  ElMessage.info('开始关闭SunnyNetCore')
  Webview.sendMessageToHost({
    cmd: 2
  })
}

const getUserInfo = () => {
  Webview.sendMessageToHost({
    cmd: 77
  })
}

</script>

<style scoped>
.framework-index-container {
  margin-top: 20px;
}

.framework-index-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: auto;
}

.framework-index-backpack {
  margin-top: 10px;
}

.framework-index-user-left-avatar {
  width: 72px;
  height: 72px;
  overflow: hidden;
  justify-content: center;
  display: flex;
}

.framework-index-user-left {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.framework-index-user-left-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
}

.framework-index-desc {
  margin: 10px 0 10px;

}

.framework-index-desc h1 {
  line-height: 0;
}

.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>