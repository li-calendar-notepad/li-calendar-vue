import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/layout/HomeView.vue'
import AdminView from '../views/layout/AdminView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.history),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      name: 'root',
      component: HomeView,
      children: [
        {
          path: 'calendar',
          name: 'calendar',
          component: () => import('../views/CalendarView.vue'),
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'system',
          name: 'root',
          children: [
            {
              path: 'userInfoUpdate',
              name: 'userInfoUpdate',
              component: () => import('../views/system/UserInfoUpdate.vue'),
            },
            {
              path: 'userSetting',
              name: 'userSetting',
              component: () => import('../views/system/UserSetting.vue'),
            },
          ]
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: 'styleSetting',
          name: 'StyleSetting',
          component: () => import('../views/admin/StyleSetting.vue'),
        },
        {
          path: 'mailSetting',
          name: 'mailSetting',
          component: () => import('../views/admin/MailSetting.vue'),
        },
        {
          path: 'applicationSetting',
          name: 'applicationSetting',
          component: () => import('../views/admin/ApplicationSetting.vue'),
        },
        {
          path: 'users',
          name: 'adminUsers',
          component: () => import('../views/admin/Users.vue'),
        },
        {
          path: 'specialDay',
          name: 'adminSpecialDay',
          component: () => import('../views/admin/SpecialDay.vue'),
        },
        
      ]
    },
    {
      path: '/test',
      name: 'test',
      children: [
        {
          path: 'test3',
          name: 'test3',
          component: () => import('../views/test/TestView3.vue'),
        },
        {
          path: 'test4',
          name: 'test4',
          component: () => import('../views/test/TestView4.vue'),
        },
        {
          path: 'calendar',
          name: 'testCalendar',
          component: () => import('../views/test/Calendar.vue'),
        },
        {
          path: 'subjectDesignExtend',
          name: 'subjectDesignExtend',
          component: () => import('../views/test/DesignExtend.vue'),
        },
        {
          path: 'cache',
          name: 'testcache',
          component: () => import('../views/test/cache.vue'),
        },
        {
          path: 'echarts',
          name: 'echarts',
          component: () => import('../views/test/Echarts.vue'),
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/forgotPassword.vue')
    },
    {
      path: '/register',
      name: 'register',
      component:()=>import('../views/register/index.vue')
    }
  ]
})

export default router
