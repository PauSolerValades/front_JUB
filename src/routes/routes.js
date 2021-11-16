import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      {
        path: '/registerLogin',
        name: 'registerLogin',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/RegisterLogin.vue')
      }
      //{ path: '*', component: NotFound }
    ]
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Home Page',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/jobseeker',
        name: 'jobseeker Profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/JobseekerProfile.vue')
      },
      {
        path: '/employer',
        name: 'employer Profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/EmployerProfile.vue')
      },
      {
        path: '/jobseekerJobs',
        name: 'jobseeker jobs',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/JobseekerJobs.vue')
      },
       {
        path: '/createjob',
        name: 'create jobs',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/EmployerCreateJob.vue')
      },
      {
        path: '/employerJobs',
        name: 'employer jobs',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/EmployerJobs.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
