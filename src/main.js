import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBnibQT4HvS0KRujqueCPNpnYwuronjR1o',
      authDomain: 'test-case-3bd19.firebaseapp.com',
      databaseURL: 'https://test-case-3bd19.firebaseio.com',
      projectId: 'test-case-3bd19',
      storageBucket: 'test-case-3bd19.appspot.com',
      messagingSenderId: '454364379249'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})
