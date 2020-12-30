import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/Index.vue')
        },
        {
            path: '/challenge',
            name: 'challenge',
            component: () => import('@/views/Challenge.vue')
        },
        {
            path: '/final',
            name: 'final',
            component: () => import('@/views/Final.vue')
        },
    ]
})
