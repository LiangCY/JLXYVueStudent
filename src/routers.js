'use strict'

import App from './views/App'
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
    /* 404路由 */
    '*': {
      component: {}
    }
  })
}
