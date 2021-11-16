import Vue from 'vue'
import Router from 'vue-router'
import RegisterLogin from "../views/Pages/RegisterLogin"
import HomePage from "../views/HomePage";
import JobseekerProfile from "../views/Pages/JobseekerProfile";
import EmployerProfile from "../views/Pages/EmployerProfile";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'RegisterLogin',
      component: RegisterLogin,
      props: true
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      props: true
    },
    {
      path: '/jobseekerProfile',
      name: 'JobseekerProfile',
      component: JobseekerProfile
    },
    {
      path: '/employerProfile',
      name: 'EmployerProfile',
      component: EmployerProfile
    }
  ]
})