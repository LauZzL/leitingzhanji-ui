<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    router
  >
    <template v-for="item in menuList">
      <el-menu-item
        v-if="!item.children || item.children.length === 0 || !item.showChildren"
        :index="item.path"
        :key="item.path"
      >
        <el-icon size="24px">
          <svg-icon :iconName="item.meta.icon" />
        </el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.path" :key="item.path">
        <template #title>
          <el-icon size="24px">
            <svg-icon :iconName="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :index="child.path"
          :key="child.path"
        >
          <el-icon size="24px">
            <svg-icon :iconName="item.meta.icon" />
          </el-icon>
          <template #title>{{ child.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
    <div class="collapse-btn">
      <el-button @click="isCollapse = !isCollapse" style="border: none; width: 95%;">
        <el-icon size="24px">
          <svg-icon :iconName="isCollapse ? 'icon-zhankai' : 'icon-zhankai'" />
        </el-icon>
      </el-button>
    </div>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
// 获取router
import { useRouter } from "vue-router";
const router = useRouter();
// 获取所有路由
const routes = router.getRoutes();
// 获取所有菜单
const menuList = routes.filter(
  (item) => item.meta && item.meta.title && item.meta.isMenu
);
const activeIndex = ref("/framework/index");
const isCollapse = ref(true);
</script>

<style>
/* 样式可以根据需要自行调整 */
.el-menu-vertical-demo {
  padding-top: 10px;
}
.el-menu-item {
  border-radius: 0.5rem;
  width: 95%;
  margin: auto;
}
.el-menu-item.is-active {
  background-color: #409eff1a;
}
.el-menu-item:hover {
  background-color: #fff;
  color: #409eff;
}
.el-menu-item.is-active:hover {
  background-color: #409eff1a;
}
.el-sub-menu__title:hover {
  background: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.collapse-btn {
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 10px;
  justify-content: center;
}
</style>