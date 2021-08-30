import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import SignUp from "@/components/SignUpUser.vue"
import Edit from "@/components/EditUser.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: { name: 'home' }
},
{
    path: '/home',
    name: 'Home',
    component: Home
},
{
    path: '/create',
    name: 'Create',
    component: Create
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