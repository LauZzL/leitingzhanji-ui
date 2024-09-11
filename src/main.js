import { createApp } from 'vue'
import './style.css'
import Router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/css/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/js/iconfont.js'
import SvgIcon from '@/components/iconfont/SvgIcon.vue';
import { createPinia } from 'pinia'
import App from './App.vue'


const app = createApp(App)

app.config.errorHandler = function (err, vm, info) {
  console.error('Error: ', err);
  console.info('Info: ', info);
};


app.component('SvgIcon', SvgIcon)
app.use(Router)
app.use(ElementPlus)
app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
