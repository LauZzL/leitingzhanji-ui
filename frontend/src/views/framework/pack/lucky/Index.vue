<template>
  <div class="synthesis-page">
    <!-- 幸运值 -->
    <el-progress
        style="width: 100%;"
        :text-inside="true"
        :stroke-width="20"
        :percentage="luckyValue"
        status="exception"
    >
      <span>{{ luckyValue }}/100</span>
    </el-progress>
    <!-- 合成结果行 -->
    <div class="result-row">
      <el-image :src="backpackStore.backpack?.lucky?.icon?.url" alt="合成结果" class="item-image" @error="load2img">
        <template #error>
          <div class="error-slot">
            <el-text>请合成</el-text>
          </div>
        </template>
      </el-image>
      <el-text class="result-label" :style="`color:${backpackStore.backpack?.lucky?.color}`">{{ backpackStore.backpack?.lucky?.name ?? '未合成' }}</el-text>
    </div>

    <!-- 材料行 -->
    <div class="materials-row">
      <div v-for="material in materials" :key="material?.data?.id" class="material-item">
        <el-image :src="material?.icon?.url" @click="packSelectVisible = true" alt="选择材料" class="item-image"
                  @error="load2img(material)">
          <template #error>
            <div class="error-slot">
              <el-text>请选择</el-text>
            </div>
          </template>
        </el-image>
        <el-text :style="`color:${material?.color}`" class="result-label">{{ material?.name }}</el-text>
      </div>
    </div>

    <div class="type-select">
      <el-tabs v-model="luckType" tab-position="bottom">
        <el-tab-pane :name="1" label="白色装备"></el-tab-pane>
        <el-tab-pane :name="2" label="绿色装备"></el-tab-pane>
        <el-tab-pane :name="3" label="蓝色装备"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 操作行 -->
    <div class="actions-row">
      <el-button type="primary" @click="synthesize">合成</el-button>
      <el-button @click="resetMaterials">重置</el-button>
    </div>

    <el-dialog
        v-model="packSelectVisible"
        title="选择装备"
        width="500"
    >
      <div>
        <back-pack-select @selectItem="selectItem" :lucky-type="luckType"></back-pack-select>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="packSelectVisible = false">返回</el-button>
          <el-button type="primary" @click="packSelectVisible = false">
            选择
          </el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import BackPackSelect from "@/components/common/BackPackEquipsSelect.vue";
import {useUserStore} from "@/store/user.js";
import {useBackPackStore} from "@/store/backpack.js";
import {ElMessage, ElMessageBox} from "element-plus";
import Webview from '@/utils/webview'

const userStore = useUserStore();
const backpackStore = useBackPackStore();

const packSelectVisible = ref(false);
const materials = ref([{}, {}, {}, {}, {}]);
const luckType = ref(1);

const luckyValue = computed(() => {
  return userStore?.user?.allLuckys.filter(item => item.type === Number(luckType.value))[0]?.luckyValue ?? 0;
})

const load2img = (material) => {
  if (!material && !material.icon) {
    material.icon.url = material?.icon?.url2;
  }
}

const selectItem = (item) => {
  materials.value = [{}, {}, {}, {}, {}]
  materials.value = item.concat(materials.value.slice(item.length))
};

const synthesize = () => {
  // 合成逻辑
  const resultItem = materials.value.filter(item => item.data);
  if (!resultItem || resultItem.length < 5) {
    ElMessage.warning('请选择5个材料');
    return;
  }
  console.log('合成数据', resultItem);
  ElMessageBox.confirm(
      '确认要合成吗?该操作不可逆哦!',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    Webview.sendMessageToHost({
      cmd: 153826,
      type: luckType.value,
      items: new Array(5)
          .fill(0)
          .map((_, index) => resultItem[index].data)
          .filter(item => item.num = 1),
    })
  }).catch(() => {
  })
};

const resetMaterials = () => {
  userStore.user.allLuckys.forEach(lucky => {
    lucky.luckyValue ++
  })
  //materials.value = [{}, {}, {}, {}, {}]
};

</script>

<style scoped>
.synthesis-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-row {
  width: 100px;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.item-image {
  width: 80px;
  height: 80px;
}

.materials-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100px;
}

.material-item {
  cursor: pointer;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.type-select {
  width: 100%;
  margin-bottom: 20px;
}

.error-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

</style>
