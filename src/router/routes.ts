import Main from '@/Main.vue'
import Dashboard from '@/views/dashboard/index.vue'

export default [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    component: Main,
    name: 'BBot Console',
    children: [
      {
        path: '',
        name: 'dashboard',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        component: Dashboard,
        name: '概览',
        meta: {
          title: '概览 | BBot Console',
        },
      },
      {
        path: 'groups',
        component: () => import('@/views/groups/index.vue'),
        name: '群列表',
        meta: {
          title: '群列表 | BBot Console',
        },
        children: [
          {
            name: '群信息',
            path: ':groupId(\\d+)',
            component: () => import('@/views/groups/detail.vue'),
            meta: {
              name: '群组详细信息',
              title: '群组详细信息 | BBot Console',
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'modules',
        component: () => import('@/views/modules/index.vue'),
        name: '模块列表',
        meta: {
          title: '模块列表 | BBot Console',
        },
        children: [
          {
            name: '模块信息',
            path: ':moduleId',
            component: () => import('@/views/modules/detail.vue'),
            meta: {
              name: '模块详细信息',
              title: '模块详细信息 | BBot Console',
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: ':catchAll(.*)',
        component: () => import('@/views/error/404NotFound.vue'),
        name: '404',
        meta: {
          title: '404 Not Found | BBot Console',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/404NotFound.vue'),
    meta: {
      title: '404 Not Found | BBot Console',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]
