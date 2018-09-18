import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddProject from '@/components/AddProject'
import Settings from '@/components/Settings'
import Projects from '@/components/Projects'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/add_project',
        name: 'AddProject',
        component: AddProject
    },
  ]
})
