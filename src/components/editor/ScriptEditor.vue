<template>
  <div>
    <el-space style="margin-bottom: 10px">
      <el-button plain>打开</el-button>
      <el-button @click="evalScript" plain>运行</el-button>
      <el-button plain>编译</el-button>
    </el-space>
    <codemirror v-model="scriptStore.code" :extensions="[javascript(), oneDark, basicSetup]" :options="options"></codemirror>
    <LoggerComponent style="position: fixed; z-index: 999; width: calc(100% - 130px); bottom: 20px;"
                     :logger="loggerStore.script_logger"/>
  </div>
</template>


<script setup>
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {basicSetup} from "codemirror";
import {ref, defineProps} from "vue";
import {Codemirror} from "vue-codemirror";
import LoggerComponent from "@/components/logger/LoggerComponent.vue";
import {useLoggerStore} from "@/store/logger";
import {useScriptStore} from "@/store/script";
import Webview from "@/utils/webview.js";

const loggerStore = useLoggerStore()
const scriptStore = useScriptStore()

console.log(scriptStore)


const options = ref({
  lineNumbers: true,
      line: true,
      extraKeys: {
    Ctrl: "autocomplete",
  },
  matchBrackets: true,
})

const evalScript = async () => {
  Webview.sendMessageToHost({
    cmd: 3001,
    script: btoa(encodeURIComponent(scriptStore.code))
  });
};


</script>

<style scoped>
</style>