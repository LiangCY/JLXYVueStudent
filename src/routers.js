'use strict'

import Login from './views/Login'
import App from './views/App'
import User from './views/User'
import Events from './views/Events'

export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: App,
      auth: true
    },
    '/login': {
      name: 'login',
      component: Login
    },
    '/user': {
      name: 'user',
      component: User,
      auth: true
    },
    '/events': {
      name: 'events',
      component: Events,
      auth: true
    },
    /* 404路由 */
    '*': {
      component: {}
    }
  })
}
