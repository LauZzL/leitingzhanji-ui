<script setup>

const defaultProps = defineProps({
  item: Object,
  type: Number
})

</script>

<template>
  <div class="backpack-item">
    <div class="backpack-item-image">
      <el-image style="width: 80px; height: 80px;" src="">
      </el-image>
      <el-text class="backpack-item-level" v-if="type == 0 && item.level">
        lv.{{ item.level }}
      </el-text>
      <el-text class="backpack-item-level" v-else-if="type == 1">
        x{{ item.num }}
      </el-text>
    </div>
    <div class="backpack-item-info">
      <div class="backpack-item-info-name">
        <el-text size="small" :style="`color: ${item.color}`">{{ item.name }}</el-text>
      </div>
    </div>
  </div>
</template>

<style>
.backpack-item {
  width: 100px;
  height: 100px;
}

.backpack-item-image {
  width: 80px;
  height: 80px;
  margin: auto;
  text-align: center;
  align-content: center;
  position: relative;
}

.backpack-item-info-name {
  text-align: center;
}

.backpack-item-level {
  z-index: 999;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  line-height: 0;
}

.el-space {
  gap: 4px !important;
}

.el-space--horizontal {
  gap: 4px !important;
}
</style>