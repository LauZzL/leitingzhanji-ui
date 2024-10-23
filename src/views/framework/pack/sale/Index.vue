<script setup>
import BackPackSelect from "@/components/common/BackPackSelect.vue";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import Webview from "@/utils/webview.js";


const items = ref([])
const selectType = ref(1);

const selectItem = (item) => {
  items.value = []
  items.value = item.concat(items.value.slice(item.length))
  console.log(items.value)
};

const saleBox = () => {
  if (!items.value || items.value.length < 1) {
    ElMessage.warning('请选择一个物品');
    return;
  }
  const itemText = items.value.map(item => item.name).join(',');
  ElMessageBox.confirm(
      `确认出售[${itemText}]吗？该操作不可逆哦~`,
      '警告',
      {
        confirmButtonText: '出售',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    Webview.sendMessageToHost({
      cmd: 153827,
      items: new Array(items.value.length)
          .fill(0)
          .map((_, index) => items.value[index].data),
    })
  }).catch(() => {
  })
}

</script>

<template>
  <div>
    <div class="type-select">
      <el-tabs v-model="selectType" tab-position="bottom">
        <el-tab-pane :name="1" label="装备"></el-tab-pane>
        <el-tab-pane :name="2" label="道具"></el-tab-pane>
      </el-tabs>
    </div>
    <back-pack-select @selectItem="selectItem" :type="selectType"></back-pack-select>
    <el-space wrap style="margin-top: 20px">
      <el-button type="danger" @click="saleBox">出售</el-button>
      <el-button>重置</el-button>
    </el-space>
  </div>
</template>

<style scoped>

</style>