<template>
  <el-scrollbar :height="content_height">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="免广告领取" name="1">
        <el-space wrap>
          <el-button @click="sendCmd({ cmd:206 })">每日广告体力×1次</el-button>
          <el-button @click="sendCmd({ cmd:201 })">每日广告体力×4次</el-button>
          <el-button @click="sendCmd({ cmd:202 })">商城广告奖励</el-button>
          <el-button @click="sendCmd({ cmd:203 })">寻宝装备宝箱</el-button>
          <el-button @click="sendCmd({ cmd:204 })">星际探索</el-button>
        </el-space>
      </el-collapse-item>
      <el-collapse-item title="一键领取" name="2">
        <el-space wrap>
          <el-button @click="sendCmd({ cmd:205 })">幸运转盘</el-button>
          <el-button @click="sendCmd({ cmd:207 })">弹幕钻石</el-button>
          <el-button @click="sendCmd({ cmd:208 })">桌面启动钻石</el-button>
          <el-button @click="sendCmd({ cmd:214 })">助战金币领取</el-button>
        </el-space>
      </el-collapse-item>
      <el-collapse-item title="活跃度奖励" name="3">
        <el-space wrap>
          <el-button @click="sendCmd({ cmd:209 })">奖励-无尽宝箱x3</el-button>
          <el-button @click="sendCmd({ cmd:210 })">奖励-100体力</el-button>
          <el-button @click="sendCmd({ cmd:211 })">活跃度领取</el-button>
        </el-space>
      </el-collapse-item>
      <el-collapse-item title="贵族奖励" name="5">
        <el-space wrap>
          <div>
            <el-input-number v-model="vip_level" :min="0" :max="8">
              <template #suffix>
                <span>贵族</span>
              </template>
            </el-input-number>
          </div>
          <el-button @click="sendCmd({ cmd:215, vip_level: vip_level })">贵族奖励领取</el-button>
        </el-space>
      </el-collapse-item>
      <el-collapse-item title="CDK领取" name="6">
        <el-space wrap>
          <div>
            <el-input v-model="settingStore.setting.cdk_str" placeholder="请输入CDK，每行一个" type="textarea">

            </el-input>
          </div>
          <br>
          <el-button @click="exchangeCDK">CDK领取</el-button>
        </el-space>
      </el-collapse-item>
      <el-collapse-item title="宝箱抽奖(消耗钥匙)" name="4">
        <el-space wrap>
          <div>
            <el-input-number v-model="box_num" :min="1">
              <template #suffix>
                <span>次</span>
              </template>
            </el-input-number>
          </div>
          <el-button @click="sendCmd({ cmd:212, nums: box_num })">白银宝箱</el-button>
          <el-button @click="sendCmd({ cmd:213, nums: box_num })">黄金宝箱</el-button>
        </el-space>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>

<script setup>
import {ref} from 'vue'
import  Webview from "@/utils/webview"
import {useSettingStore} from "@/store/setting.js";

const settingStore = useSettingStore();

const sendCmd = (data) => {
    Webview.sendMessageToHost(data)
}

const box_num = ref(1);
const vip_level = ref(0);

const activeNames = ref(['1'])

const content_height = ref(window.innerHeight - 360)

// 监听窗口大小变化
window.onresize = () => {
  content_height.value = window.innerHeight - 360;
}

const exchangeCDK = () => {
  sendCmd({ cmd:216, cdks: settingStore.setting.cdk_str.split(/\s+/) })
}


</script>

<style scoped>
.space_warp{
  flex-wrap: wrap;
  gap: 5px 8px !important;
}

</style>