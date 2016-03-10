'use strict'

import Login from './views/Login'
import App from './views/App'
import User from './views/User'
import Events from './views/Events'
import Lessons from './views/Lessons'
import Lesson from './views/Lesson'
import Tasks from './views/Tasks'
import Task from './views/Task'

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
    '/lessons': {
      name: 'lessons',
      component: Lessons,
      auth: true
    },
    '/lesson/:lessonId': {
      name: 'lesson',
      component: Lesson,
      auth: true
    },
    '/tasks': {
      name: 'tasks',
      component: Tasks,
      auth: true
    },
    '/task/:taskId': {
      name: 'task',
      component: Task,
      auth: true
    },
    /* 404路由 */
    '*': {
      component: {}
    }
  })
}
