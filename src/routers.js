'use strict'

import App from './views/App'
import Hi from './views/Hi'
import Login from './views/Login'

export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: App
    },
    '/login': {
      name: 'login',
      component: Login
    },
    '/hello': {
      name: 'hello',
      component: Hi
    },
    /* 404路由 */
    '*': {
      component: {}
    }
  })
}
