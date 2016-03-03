'use strict'

import Login from './views/Login'
import App from './views/App'
import Events from './views/Events'


export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: App
    },
    '/events': {
      name: 'events',
      component: Events
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
