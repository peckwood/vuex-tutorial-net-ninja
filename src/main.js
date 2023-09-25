import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
Vue.config.devtools = true;

new Vue({
  // this view instance is controlling almost everything in our application
  // it's taking over this id in html template and replacing it with all of our view component code
  el: '#app',

  store: store,

  render: h => h(App)
})
