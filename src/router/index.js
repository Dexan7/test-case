import Vue from 'vue'
import Router from 'vue-router'
// import AuthGuard from './auth-guard'
import Home from '@/components/home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Results from '@/components/Score/Results'
import Test from '@/components/Tests/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/results',
      name: 'results',
      component: Results
      // beforeEnter: AuthGuard
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ],
  mode: 'history'
})
