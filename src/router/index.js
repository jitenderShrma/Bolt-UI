import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Login Pages
const SuperUserLogin = () => import('@/views/login_pages/SuperUserLogin');
const UserLogin = () => import('@/views/login_pages/UserLogin');
const UserRegistration = () => import('@/views/login_pages/UserRegistration');


// Company Routes

const CompanyList = () => import('@/views/Company/CompanyList');
const CompanyDetails = () => import('@/views/Company/CompanyDetails');
const AddCompany = () => import('@/views/Company/AddCompany');

// User Routes
const UserCategory = () => import('@/views/Users/UserCategory');


Vue.use(Router)



export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta : { requiresAuth : true },
          component: {
            render (c) { return c('router-view') }
          },
          children:[
            {
              path:'',
              component: Dashboard
            },
            {
              path:'/company',
              meta: { label: 'CompanyList'},
              component: {
                render (c) { return c('router-view') }
              },
              children:[
                {
                  path:'',
                  component: CompanyList,
                },
                {
                  path: '/company/:companyId',
                  meta: { label: 'Company Details'},
                  name: 'ComapanyDetails',
                  component: CompanyDetails
                },
                {
                  path:'/add',
                  name: 'Add Company',
                  component: AddCompany
                },
              ]

            },
          ]
        },
      ]
    },
    {
      path : '/permissions',
      name : 'Permissions',
      component: {
        render (c) { return c('router-view') }
      },
      children : [
        {
          path: '',
          name: 'User Category',
          component: UserCategory
        }
      ]
    },
    {
      path: '/login',
      redirect: '/login',
      name: 'Login',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'SuperUserLogin',
          component: SuperUserLogin
        },
        {
          path: 'user',
          name: 'UserLogin',
          component: UserLogin
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: UserRegistration
    }
  ]
})
