<template>
  <div>
    <el-table ref="selectItemRef" :data="filteredItems" :max-height="tableHeight" style="width: 100%;" :show-header="false" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column width="50">
        <template #default="scope">
          <el-image style="width: 40px; height: 40px" :src="scope.row.icon.url" alt="" @error="load2img(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column property="name">
        <template #default="scope">
          <el-text :style="`color:${scope.row.color}`" class="result-label">{{ scope.row.name }}</el-text>
        </template>
      </el-table-column>
      <el-table-column property="level">
        <template #default="scope">
          <el-text class="result-label">lv.{{ scope.row.level }}</el-text>
        </template>
      </el-table-column>
      <el-table-column property="num">
        <template #default="scope">
          <el-text class="result-label">数量 x {{ scope.row.num }}</el-text>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import { ElTable } from 'element-plus'
import {useBackPackStore} from "@/store/backpack.js";

const props = defineProps({
  type: Number,
})

const emit = defineEmits(['selectItem'])
const selectItemRef = ref()
const tableHeight = ref(window.innerHeight - 233);

const backPackStore = useBackPackStore();

const filteredItems = computed(() => {
  // type: 1=装备，2=道具
  if(props.type === 1){
    return backPackStore.backpack.equips
        .filter(item => item.rarity === 0);
  }else if(props.type === 2){
    return backPackStore.backpack.items;
  }

});

const load2img = (row) => {
  // 修改materials中的icon.url2
  row.icon.url = row.icon.url2;
}

const handleSelectionChange = (val) => {
  // 最多选择5个
  if (val.length > 5) {
    selectItemRef.value.toggleRowSelection(val.shift(), false)
  }
  emit('selectItem', val)
}

// 监听窗口大小变化
window.onresize = () => {
  tableHeight.value = window.innerHeight - 233;
}

const handleResize = () => {
  tableHeight.value = window.innerHeight - 233;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>
