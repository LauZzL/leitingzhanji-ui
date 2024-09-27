<template>
  <div>
    <el-dialog v-model="dialogVisible" title="请输入脚本密码，无密码留空" width="500">
      <el-form>
        <el-form-item label="密码">
          <el-input type="password" v-model="pwd"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="importScriptCode">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="builder_visable" title="Builder" :with-header="true" size="60%">
      <el-form :model="buildOptions" :rules="rules" status-icon :inline="false" label-width="auto">
        <el-form-item>
          <el-checkbox v-model="buildOptions.private">禁止编辑</el-checkbox>
        </el-form-item>
        <el-form-item label="脚本名称" prop="name">
          <el-input v-model="buildOptions.name" placeholder="请输入脚本名称"></el-input>
        </el-form-item>
        <el-form-item label="脚本密码" prop="password">
          <el-input v-model="buildOptions.password" placeholder="请输入脚本密码"></el-input>
        </el-form-item>
        <el-form-item label="脚本授权" prop="auth_uid">
          <el-input v-model="buildOptions.auth_uid" placeholder="请输入授权的UID"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="buildScript">编译</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-space style="margin-bottom: 10px">
      <el-button @click="dialogVisible = true" plain>打开</el-button>
      <el-button @click="evalScript" plain>运行</el-button>
      <el-button @click="builder_visable = true" plain>编译</el-button>
    </el-space>
    <el-scrollbar :height="`${editor_height}px`">
      <codemirror v-model="scriptStore.code" :extensions="[javascript(), oneDark, basicSetup]" :options="options"></codemirror>
    </el-scrollbar>
    <LoggerComponent style="position: fixed; z-index: 999; width: calc(100% - 115px); bottom: 20px;"
                     :logger="loggerStore.script_logger"/>
  </div>
</template>


<script setup>
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {basicSetup} from "codemirror";
import {ref, defineProps, onMounted, onUnmounted} from "vue";
import {Codemirror} from "vue-codemirror";
import LoggerComponent from "@/components/logger/LoggerComponent.vue";
import {useLoggerStore} from "@/store/logger";
import {useScriptStore} from "@/store/script";
import Webview from "@/utils/webview.js";

const loggerStore = useLoggerStore()
const scriptStore = useScriptStore()

const dialogVisible = ref(false)
const builder_visable = ref(false)
const pwd = ref('')
const buildOptions = ref({
  private: false,
  name: '',
  password: '',
  auth_uid: ''
})

const rules = {
  name: [
    {required: true, message: '请输入脚本名称', trigger: 'blur'}
  ]
}




const importScriptCode = () => {
  dialogVisible.value = false;
  Webview.sendMessageToHost({
    cmd: 3002,
    password: pwd.value,
    path: ''
  })
}

const editor_height = ref(window.innerHeight - 360)

// 监听窗口大小变化
window.onresize = () => {
  editor_height.value = window.innerHeight - 360;
}

const handleResize = () => {
  editor_height.value = window.innerHeight - 360;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});


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

const buildScript = async () => {
  let build = {...buildOptions.value, script: btoa(encodeURIComponent(scriptStore.code))}
  Webview.sendMessageToHost({
    cmd: 3003,
    data: encodeURIComponent(JSON.stringify(build))
  })
};


</script>

<style scoped>
</style>