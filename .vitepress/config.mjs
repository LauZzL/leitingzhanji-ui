import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "leitingzhanji-docs",
  title: "LTZJ-NEM",
  description: "LTZJ-NEM Documentation",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/what-is-ltzj-nem' },
      { text: '封包', link: '/packet/what-is-packet' },
      { text: 'API', link: '/javascript-api/what-is-javascript-api' },
    ],

    sidebar: {
      '/guide/':{
        items: [
          { text: '什么是LTZJ-NEM？', link: '/guide/what-is-ltzj-nem' },
          { text: '快速开始', link: '/guide/get-started' },
        ]
      },
      '/packet/':{
        items: [
          { text: '什么是封包？', link: '/packet/what-is-packet' },
          { text: '导入封包', link: '/packet/import_packet' },
          { text: '创建第一个封包', link: '/packet/create-first-packet' },
          { text: '调试封包', link: '/packet/executor_debug' },
          { text: '编译封包', link: '/packet/build' },
        ]
      },
      '/javascript-api/':{
        items: [
          { text: '什么是JavaScriptApi？', link: '/javascript-api/what-is-javascript-api' },
        ]
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LauZzL/leitingzhanji-ui' }
    ],
    editLink: {
      pattern: 'https://github.com/LauZzL/leitingzhanji-docs/edit/main/:path'
    }
  }
})
