import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/Auth.js'
import axios from 'axios';
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

//Additional Attributes

const AttributeList = () => import('@/views/Attributes/AttributeList')
const AttributeEdit = () => import('@/views/Attributes/AttributeEdit')

// Login Pages
const SuperUserLogin = () => import('@/views/login_pages/SuperUserLogin');
const UserLogin = () => import('@/views/login_pages/UserLogin');
const UserRegistration = () => import('@/views/login_pages/UserRegistration');


//UserGroups
const Category = () => import('@/views/Category');
const UserGroups = () => import('@/views/UserGroups');
const UserGroupsDetails = () => import('@/views/UserGroupDetail');

//Permissions
const AddPermission = () => import('@/views/Permission/AddPermission')
const PermissionDetails = () => import('@/views/Permission/PermissionDetails')


//Communication 
const  PluginList = () => import('@/views/Communication/Plugin');

// Company Routes

const CompanyList = () => import('@/views/Company/CompanyList');
const CompanyDetails = () => import('@/views/Company/CompanyDetails');
const AddCompany = () => import('@/views/Company/AddCompany');

// User Routes
const UserDetails = () => import('@/views/Users/UserDetails');
const UserList = () => import('@/views/Users/UserList');
const AddUser = () => import('@/views/Users/AddUser');

Vue.use(Router)

var router = new Router({
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
              meta : { requiresAuth : true },
              component: Dashboard
            },
            {
              path:'/company',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children:[
                {
                  path : '',
                  meta : { requiresAuth : true },
                  name : 'Company',
                  component : CompanyList
                },
                {
                  path: '/company/:companyId',
                  meta : { requiresAuth : true },
                  name: 'Company Details',
                  component: CompanyDetails
                },
                {
                  path:'/add/company',
                  meta : { requiresAuth : true },
                  name: 'Add Company',
                  component: AddCompany
                },
              ]

            },
            {
              path : '/user',
              meta : { requiresAuth : true },
              redirect: '/user/list',
              component: {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  path: '/user/list',
                  meta : { requiresAuth : true },
                  name: 'User List',
                  component: UserList
                },
                {
                  path: '/user/add',
                  meta : { requiresAuth : true },
                  name: 'Add User',
                  component: AddUser
                },
                {
                  path: '/user/details/:userId',
                  meta : { requiresAuth : true },
                  name: 'User Details',
                  component: UserDetails
                },
              ]
            },
            {
              path: '/usergroups',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  name : `User Groups`,
                  meta : { requiresAuth : true },
                  path : `/usergroups/:userType`,
                  component : UserGroups
                },
                {
                  name : `User Group Edit`,
                  meta : { requiresAuth : true },
                  path : `/usergroupsdetails/:userType`,
                  component : UserGroupsDetails
                }
              ]
            },
            {
              path :'/attr',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  path : '',
                  name : "Attribute List",
                  meta : { requiresAuth : true },
                  component : AttributeList
                },
                {
                  path : '/attr/:attrId',
                  name : 'Edit Attribute',
                  meta : { requiresAuth : true },
                  component : AttributeEdit
                },

              ]
            },
            {
              path: '/permission',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  name : `Add Permission`,
                  meta : { requiresAuth : true },
                  path : `/permission/add`,
                  component : AddPermission
                },
                {
                  name : `Permission Details`,
                  meta : { requiresAuth : true },
                  path : `/permission/details/:userType`,
                  component : PermissionDetails
                },
              ]
            },
            {
              path: '/category',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  name : `Category`,
                  meta : { requiresAuth : true },
                  path : `/category/:categoryType`,
                  component : Category
                }
              ]
            },
            {
              path: '/plugin',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  name : `Plugin List`,
                  meta : { requiresAuth : true },
                  path : ``,
                  component : PluginList
                }
              ]
            }
          ]
        },
        
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
        },
        {
          path: 'register',
          name : 'Register',
          component : UserRegistration
        },
      ]
    },
    
    
  ]
})
router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});


export default router