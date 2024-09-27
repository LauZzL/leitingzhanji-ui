<template>
  <div style="height: 100%;">
    <el-dialog v-model="dialogVisible" title="请输入脚本密码，无密码留空" width="500">
      <el-form>
        <el-form-item label="密码">
          <el-input type="password" v-model="pwd"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="executor">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-table :data="scriptStore.scripts" style="width: 100%; height: calc(100% - 205px);">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button @click="openPwd(scope.row)" size="small">
            运行
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <LoggerComponent :logger="loggerStore.script_logger" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Webview from '@/utils/webview';
import {useScriptStore} from "@/store/script.js";
import { useLoggerStore } from '@/store/logger';
import LoggerComponent from "@/components/logger/LoggerComponent.vue";


const scriptStore = useScriptStore();
const loggerStore = useLoggerStore();

const dialogVisible = ref(false);
const run = ref(null)
const pwd = ref('');

onMounted(() => {
  Webview.sendMessageToHost({
    cmd: 3007
  })
});

const executor = () => {
  dialogVisible.value = false;
  Webview.sendMessageToHost({
    cmd: 3008,
    password: pwd.value,
    path: encodeURIComponent(run.value.path)
  })
}

const openPwd = (e) => {
  run.value = e
  dialogVisible.value = true;
};


</script>

<style></style>