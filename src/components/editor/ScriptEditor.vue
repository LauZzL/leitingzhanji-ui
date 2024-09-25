<template>
  <div>
    <el-space style="margin-bottom: 10px">
      <el-button plain>打开</el-button>
      <el-button plain>运行</el-button>
      <el-button plain>编译</el-button>
    </el-space>
    <codemirror v-model="props.code" :extensions="[javascript(), oneDark, basicSetup]" :options="options"></codemirror>
  </div>
</template>


<script setup>
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {basicSetup} from "codemirror";
import {ref, defineProps} from "vue";
import {Codemirror} from "vue-codemirror";

const props = defineProps({
  code: String,
})

const options = ref({
  lineNumbers: true,
      line: true,
      extraKeys: {
    Ctrl: "autocomplete",
  },
  matchBrackets: true,
})



</script>

<style scoped>
</style>