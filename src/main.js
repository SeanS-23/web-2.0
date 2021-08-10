import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from "./axios"
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);


// Put your instance of Axios in `Vue.prototype` which gives you easy global access to it.
// You can pass in configuration that is shared application-wide.
Vue.prototype.$http = axios

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')