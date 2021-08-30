import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router"
import store from './store'
import axios from "./axios"
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);


// Put your instance of Axios in `Vue.prototype` which gives you easy global access to it.
// You can pass in configuration that is shared application-wide.
Vue.prototype.$http = axios

Vue.prototype.$http.interceptors.request.use((config) => {
    const headers = store.getters['auth']
  
    // object that holds configuration of the request that's about to be made
    config.headers = headers
    return config
  })

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')