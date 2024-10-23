<template>
  <div class="music-player-container">
    <div class="indicator" @mouseenter="showPlayer = true" @mouseleave="showPlayer = false"></div>
    <div class="player" v-show="showPlayer">
      <iframe @mouseenter="showPlayer = true" @mouseleave="showPlayer = false" frameborder="no" border="0" marginwidth="0" marginheight="0" width="330" height="110"
              :src="playerUrl"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const playerUrl = ref('https://music.163.com/outchain/player?type=0&id=7338953439&auto=1&height=90')
const showPlayer = ref(false)
</script>

<style scoped>
.music-player-container {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 5px;
}

.indicator {
  width: 30px; /* 小方块的宽度 */
  height: 100px; /* 小方块的高度 */
  background-color: #c62f2f; /* 小方块的背景颜色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999; /* 确保小方块在播放器之上 */
}

.player {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 330px;
  height: 110px;
  overflow: hidden;
  transition: right 0.3s ease-in-out;
  z-index: 999;
}

.player iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
