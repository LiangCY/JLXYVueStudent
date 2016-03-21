import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import jwtDecode from 'jwt-decode'
import routerMap from './routers'

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter()

router.beforeEach(transition => {
  if (transition.to.auth) {
    var token = window.localStorage.getItem('jlxy_token')
    if (token) {
      let decoded = jwtDecode(token)
      if (decoded.exp <= Date.now()) {
        transition.redirect('/login')
      } else {
        transition.next()
      }
    } else {
      transition.redirect('/login')
    }
  } else {
    transition.next()
  }
})

let app = Vue.extend({})

routerMap(router)

router.start(app, 'body')
