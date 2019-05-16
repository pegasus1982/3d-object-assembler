import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'assembly',
      component: require('@/components/Assembly').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
