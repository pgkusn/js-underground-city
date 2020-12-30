import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Challenge from '../views/Challenge.vue';
import Final from '../views/Final.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/challenge',
        name: 'Challenge',
        component: Challenge
    },
    {
        path: '/final',
        name: 'Final',
        component: Final
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
