/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    name: 'Example',
    redirect: { name: 'Framework' },
    children: [
      {
        path: '/framework',
        name: 'Framework',
        component: () => import('@/views/framework/Index.vue'),
        redirect: { name: 'Framework-Index' },
        children: [
          {
            path: '/framework/index',
            name: 'Framework-Index',
            component: () => import('@/views/framework/index/Index.vue'),
            meta: {
              title: '首页',
              icon: 'icon-shouye-zhihui',
              keepAlive: true,
              isMenu: true
            }
          },
          {
            path: '/framework/functions',
            name: 'Framework-Functions',
            component: () => import('@/views/framework/functions/Index.vue'),
            meta: {
              title: '功能',
              icon: 'icon-jichugongneng',
              keepAlive: true,
              isMenu: true
            },
            redirect: { name: 'Framework-Functions-Day' },
            children: [
              {
                path: '/framework/functions/day',
                name: 'Framework-Functions-Day',
                component: () => import('@/views/framework/functions/day/Index.vue'),
                meta: {
                  title: '日常',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/levels',
                name: 'Framework-Functions-Levels',
                component: () => import('@/views/framework/functions/levels/Index.vue'),
                meta: {
                  title: '闯关',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/huodong',
                name: 'Framework-Functions-Huodong',
                component: () => import('@/views/framework/functions/huodong/Index.vue'),
                meta: {
                  title: '活动关卡',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/shuzhi',
                name: 'Framework-Functions-Shuzhi',
                component: () => import('@/views/framework/functions/shuzhi/Index.vue'),
                meta: {
                  title: '数值',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/endless',
                name: 'Framework-Functions-Endless',
                component: () => import('@/views/framework/functions/endless/Index.vue'),
                meta: {
                  title: '无尽',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/boss',
                name: 'Framework-Functions-Boss',
                component: () => import('@/views/framework/functions/boss/Index.vue'),
                meta: {
                  title: 'BOSS关卡',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/functions/other',
                name: 'Framework-Functions-Other',
                component: () => import('@/views/framework/functions/other/Index.vue'),
                meta: {
                  title: 'BOSS关卡',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
            ]
          },
          {
            path: '/framework/request',
            name: 'Framework-Request',
            component: () => import('@/views/framework/request/Index.vue'),
            meta: {
              title: '封包',
              icon: 'icon-http',
              keepAlive: true,
              isMenu: true
            },
            redirect: { name: 'Framework-Request-Network' },
            children: [
              {
                path: '/framework/request/network',
                name: 'Framework-Request-Network',
                component: () => import('@/views/framework/request/network/Index.vue'),
                meta: {
                  title: '网络',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/request/mock',
                name: 'Framework-Request-Mock',
                component: () => import('@/views/framework/request/mock/Index.vue'),
                meta: {
                  title: '调试',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
              {
                path: '/framework/request/local',
                name: 'Framework-Request-Local',
                component: () => import('@/views/framework/request/local/Index.vue'),
                meta: {
                  title: '本地封包',
                  icon: '',
                  keepAlive: true,
                  isMenu: false,
                }
              },
            ]
          },
        ]
      }
    ]
  },
]

export default constantRouterMap