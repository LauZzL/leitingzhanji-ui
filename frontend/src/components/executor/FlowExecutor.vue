<template>
  <div>
    <el-dialog v-model="dialogVisible" title="请输入封包密码，无密码留空" width="500">
      <el-form>
        <el-form-item label="密码">
          <el-input type="password" v-model="pwd"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="importFlow">
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
        <el-form-item label="封包名称" prop="name">
          <el-input v-model="buildOptions.name" placeholder="请输入封包名称"></el-input>
        </el-form-item>
        <el-form-item label="封包密码" prop="password">
          <el-input v-model="buildOptions.password" placeholder="请输入封包密码"></el-input>
        </el-form-item>
        <el-form-item label="封包授权" prop="auth_uid">
          <el-input v-model="buildOptions.auth_uid" placeholder="请输入授权的UID"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="buildExecutor">编译</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-form ref="form">
      <el-form-item label="操作" style="position:fixed; z-index: 999">
        <el-button @click="addStep('')">添加步骤</el-button>
        <el-button type="primary" @click="executeFlow" plain>执行</el-button>
        <el-button type="primary" @click="builder_visable = true" plain>编译</el-button>
        <el-button typeof="info" @click="confirmPwd" plain>导入</el-button>
      </el-form-item>
      <br>
      <br>
      <el-scrollbar :height="`${form_height}px`">
        <el-form-item v-for="(step, index) in executorStore.executor" :key="index">
          <el-card shadow="hover" style="width: 100%;">
            <template #header>
              <div class="card-header">
                <el-tag type="success" plain>步骤{{ index + 1 }}</el-tag>
              </div>
            </template>
            <el-select class="form-item-mt w30" v-model="step.type" placeholder="请选择步骤类型">
              <el-option label="延迟等待" value="sleep"></el-option>
              <el-option label="发送封包" value="request"></el-option>
              <el-option label="输出日志" value="log"></el-option>
              <el-option label="信息弹窗" value="dialog"></el-option>
            </el-select>
            <el-input class="form-item-mt" v-if="step.type === 'sleep'" v-model="step.duration"
                      placeholder="延迟时间(毫秒)"></el-input>
            <el-input type="textarea" class="form-item-mt" v-if="step.type === 'request'" v-model="step.payload"
                      placeholder="封包数据"></el-input>
            <el-input type="textarea" class="form-item-mt" v-if="step.type === 'log' || step.type === 'dialog'"
                      v-model="step.message"
                      placeholder="消息内容"></el-input>
            <el-select class="form-item-mt w30" v-if="step.type === 'dialog'" v-model="step.dialogType"
                       placeholder="请选择弹窗类型">
              <el-option label="成功" value="success"></el-option>
              <el-option label="警告" value="warning"></el-option>
              <el-option label="信息" value="info"></el-option>
              <el-option label="错误" value="error"></el-option>
            </el-select>
            <el-select class="form-item-mt w30" v-if="step.type === 'log'" v-model="step.logType"
                       placeholder="请选择日志类型">
              <el-option label="主要" value="primary"></el-option>
              <el-option label="成功" value="success"></el-option>
              <el-option label="警告" value="warning"></el-option>
              <el-option label="危险" value="danger"></el-option>
              <el-option label="信息" value="info"></el-option>
              <el-option label="默认" value=""></el-option>
            </el-select>
            <el-input type="textarea" class="form-item-mt" v-model="step.description" placeholder="步骤说明"></el-input>
            <el-button type="danger" class="form-item-mt" @click="removeStep(index)" plain>移除</el-button>
          </el-card>
        </el-form-item>
      </el-scrollbar>
      <span class="logger-block">

          </span>
    </el-form>
    <LoggerComponent style="position: fixed; z-index: 999; width: calc(100% - 130px); bottom: 20px;"
                     :logger="loggerStore.packet_logger"/>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useLoggerStore} from '@/store/logger';
import {useExecutorStore} from '@/store/executor';
import LoggerComponent from "@/components/logger/LoggerComponent.vue";
import Webview from '@/utils/webview';

const loggerStore = useLoggerStore();
const executorStore = useExecutorStore();

const builder_visable = ref(false);
const dialogVisible = ref(false);
const pwd = ref('');

const form_height = ref(window.innerHeight - 360);

// 监听窗口大小变化
window.onresize = () => {
  form_height.value = window.innerHeight - 360;
}

const handleResize = () => {
  form_height.value = window.innerHeight - 360;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const rules = {
  name: [
    {required: true, message: '请输入封包名称', trigger: 'blur'}
  ]
}

const buildOptions = ref({
  private: false, // 是否为私有，若未是则编译后进允许执行，不允许查看、编辑源数据
  password: '', // 设置后导入或编辑需要输入密码
  auth_uid: '', // 授权的用户uid，若为空则允许所有用户执行，若为指定用户则只有指定用户才能执行，若为指定用户组则只有指定用户组才能执行
  name: '', // 封包名称

})

const addStep = (type) => {
  executorStore.executor.push({
    type,
    duration: '',
    payload: '',
    message: '',
    description: '',
    dialogType: type === 'dialog' ? 'success' : '',
    logType: type === 'log' ? 'primary' : ''
  });
};

const removeStep = (index) => {
  executorStore.executor.splice(index, 1);
};

const executeFlow = async () => {
  Webview.sendMessageToHost({
    cmd: 1003,
    executor: encodeURIComponent(JSON.stringify(executorStore.executor))
  });
};

const buildExecutor = () => {
  let build = {...buildOptions.value, executor: executorStore.executor}
  build = JSON.stringify(build, null, 2);
  Webview.sendMessageToHost({
    cmd: 1001,
    data: encodeURIComponent(build)
  })
};

const confirmPwd = () => {
  dialogVisible.value = true;
};

const importFlow = () => {
  dialogVisible.value = false;
  Webview.sendMessageToHost({
    cmd: 1002,
    password: pwd.value,
    path: ''
  })
};

</script>


<style scoped>
.form-item-mt {
  margin-top: 5px;
}

.w30 {
  width: 30%;
}

.logger-block {
  height: 200px;
  display: block;
}
</style>