import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import SignUp from "@/views/SignUp.vue"
import Edit from "@/views/Edit.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: { name: 'Home' }
},
{
    path: '/home',
    name: 'Home',
    component: Home
},
{
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
},
{
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
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