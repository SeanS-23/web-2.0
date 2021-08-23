import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Log from '@/views/Log.vue'
import Register from '@/views/Register.vue'
import Auth from "@/views/Auth.vue";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: "/auth",
    component: Auth,
    children: [
        {
            path: '/sign_in',
            name: 'Log',
            component: Log
        },
        {
            path: '/sign_up',
            name: 'Register',
            component: Register
        },
        {
            path: "",
            redirect: "/",
        },
        {
            path: "*",
            redirect: "/",
        },
    ],
},
{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/About.vue')
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router