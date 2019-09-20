import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/Auth.js';
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');

//Additional Attributes
const AttributeList = () => import('@/views/Attributes/AttributeList');
const AttributeEdit = () => import('@/views/Attributes/AttributeEdit');

//Test Page
const test = () => import('@/views/test');

// Login Pages
const SuperUserLogin = () => import('@/views/login_pages/SuperUserLogin');
const UserLogin = () => import('@/views/login_pages/UserLogin');
const UserRegistration = () => import('@/views/login_pages/UserRegistration');


// Templates
const EmailTemplate = () => import('@/views/Templates/EmailTemplate');
const SmsTemplate =() => import('@/views/Templates/SmsTemplate');
const EmailTemplateList = () => import('@/views/Templates/EmailTemplateList');
const SmsTemplateList = () => import('@/views/Templates/SmsTemplateList');
const SmsTemplateEdit = () => import('@/views/Templates/SmsTemplateEdit');
const EmailTemplateEdit = () => import('@/views/Templates/EmailTemplateEdit')

//UserGroups
const Category = () => import('@/views/Category');
const CategoryList = () => import('@/views/User Type/UserTypes');
const PermissionList = () => import('@/views/User Type/PermissionList');
const UGPermissionList = () => import('@/views/User Type/UGPermissionList');

const UserGroups = () => import('@/views/UserGroups');
const UserGroupsDetails = () => import('@/views/UserGroupDetail');
const SettingEdit = () => import('@/views/SettingEdit');



//Communication
const  PluginList = () => import('@/views/Communication/Plugin');
const CommunicationLog = () => import('@/views/Communication/CommunicationLog');

// Company Routes
const CompanyList = () => import('@/views/Company/CompanyList');
const CompanyDetails = () => import('@/views/Company/CompanyDetails');
const AddCompany = () => import('@/views/Company/AddCompany');

// User Routes
const UserDetails = () => import('@/views/Users/UserDetails');
const UserList = () => import('@/views/Users/UserList');
const AddUser = () => import('@/views/Users/AddUser');
const StaffList = () => import('@/views/Staff/StaffList'); 
const AddStaff = () => import('@/views/Staff/AddStaff');
const StaffDetails = () => import('@/views/Staff/StaffDetails');


//Transaction Routes
const AddTransaction = () => import('@/views/Transactions/AddTransaction');
const TransactionList = () => import('@/views/Transactions/TransactionList');
const EditTransaction = () => import('@/views/Transactions/EditTransaction');

//Approval Routes
const AddApproval = () => import('@/views/Approval/AddApproval');
const ApprovalList = () => import('@/views/Approval/ApprovalList');
const EditApproval = () => import('@/views/Approval/EditApproval');

//Label Routes
const LabelList = () => import('@/views/Label/LabelList');

//Setting Routes
const Settings = () => import('@/views/settings');

//Department Routes
const DepartmentList = () => import('@/views/Departments/DepartmentList');

//Pivot Routes
const TotalBudget = () => import('@/views/PivotTables/BudgetTables/TotalBudget');
const ApprovedBudget = () => import('@/views/PivotTables/BudgetTables/ApprovedBudget');
const BudgetGraph = () => import('@/views/PivotTables/BudgetTables/BudgetGraph');
const CarryOverBudget = () => import('@/views/PivotTables/BudgetTables/CarryOverBudget');

//Budget Transfer Routes
const BudgetTransfer =() => import('@/views/BudgetTransfer');
const BudgetTransferList =() => import('@/views/BudgetTransfer/BudgetTransferList');

//Head Routes
const HeadList = () => import('@/views/Heads/HeadList');

//Designation Routes
const DesignationList = () => import('@/views/Designations/DesignationList');
const AddDesignation = () => import('@/views/Designations/AddDesignation');
const EditDesignation = () => import('@/views/Designations/EditDesignation');

//Vendor Routes
const VendorList = () => import('@/views/Vendor/VendorList');
const VendorDetail = () => import('@/views/Vendor/VendorDetail');

//Error Pages
const NotFound = () => import('@/views/NotFound');

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'Dashboard',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children:[
            {
              path:'',
              meta : { requiresAuth : true },
              component: Dashboard
            },
            {
              path:'/finance',
              component : {
                render (c) {
                  return c('router-view')
                } 
              },
              children : [
                {
                  meta : { requiresAuth : true },
                  name : `Heads`,
                  path : `/finance/heads`,
                  redirect : `/finance/heads/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/finance/heads/list',
                      component: HeadList
                    },
                  ]
                },
                {
                  path : "/finance/vendor",
                  redirect:'/finance/vendor',
                  name:"Vendors",
                  meta : { requiresAuth : true },
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      path : "/finance/vendor",
                      meta : { requiresAuth : true },
                      component : VendorList
                    },
                    {
                      name:"Vendor Detail",
                      path : "/finance/vendor/:id",
                      meta : { requiresAuth : true },
                      component : VendorDetail
                    }
                  ]
                },
                {
                  path : "/finance/budget",
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name:"Total Budget",
                      path : "/finance/budget/total",
                      component : TotalBudget
                    },
                    {
                      name:"Remaining Budget",
                      path : "/finance/budget/approved",
                      component : ApprovedBudget
                    },
                    {
                      name:"Budget Graph",
                      path : "/finance/budget/graph",
                      props:true,
                      component : BudgetGraph
                    },
                    {
                      name:"CarryOver Budget",
                      path : "/finance/budget/carryover",
                      component : CarryOverBudget
                    }
                  ]
                },
                {
                  path: '/finance/budgettrans',
                  name:"Budget Transfer List",
                  redirect:'/finance/budgettrans/list/add',
                  meta : { requiresAuth : true },
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      meta : { requiresAuth : true },
                      path : `/finance/budgettrans/list/:id`,
                      component : BudgetTransferList
                    },
                    {
                      name : `Add Budget Transfer`,
                      meta : { requiresAuth : true },
                      path : `/finance/budgettrans/add`,
                      component : BudgetTransfer
                    }
                  ]
                },
                {
                  path: '/finance/transaction',
                  meta : { requiresAuth : true },
                  redirect:'/finance/transaction/list',
                  name:'Transaction List',
                  component : {
                    render(c) { return c('router-view') }
                  },
                  children : [
                    {
                      name:'Add Transaction',
                      meta : { requiresAuth : true },
                      path:'/finance/transaction/add',
                      props:true,
                      component : AddTransaction
                    },
                    {
                      path:'/finance/transaction/list',
                      component : TransactionList
                    },
                    {
                      path:'/finance/transaction/edit/:id',
                      meta : { requiresAuth : true },
                      name:'Edit Transaction',
                      component : EditTransaction
                    }

                  ]
                },
                {
                  path: '/finance/approval',
                  meta : { requiresAuth : true },
                  redirect:'/finance/approval/view/all',
                  name:'Approval List',
                  component : {
                    render(c) { return c('router-view') }
                  },
                  children : [
                    {
                      name:'Add Approval',
                      meta : { requiresAuth : true },
                      path:'/finance/approval/add',
                      component : AddApproval
                    },
                    {
                      path:'/finance/approval/edit/:id',
                      meta : { requiresAuth : true },
                      name:'Edit Approval',
                      component : EditApproval
                    },
                    {
                      path:'/finance/approval/view/:id',
                      meta : { requiresAuth : true },
                      component : ApprovalList
                    }
                  ]
                }
              ]
            },
            {
              path:'/settingviews',
              component : {
                render (c) {
                  return c('router-view')
                } 
              },
              children : [
                {
                  path:'/settingviews/staff',
                  redirect:'/settingviews/staff/list',
                  meta:{requiresAuth : true},
                  component : {
                    render(c) {return c('router-view')}
                  },
                  children:[
                    {
                      
                      meta : { requiresAuth : true },
                      path : `/settingviews/staff/list`,
                      name:"Staff List",
                      component : StaffList
                    },
                    {
                      path: '/settingviews/staff/add',
                      meta : { requiresAuth : true },
                      name: 'Add Staff',
                      component: AddStaff
                    },
                    {
                      path: '/settingviews/staff/details/:staffId',
                      meta : { requiresAuth : true },
                      name: 'Staff Details',
                      component: StaffDetails
                    }
                  ]
                },
                {
                  
                  meta : { requiresAuth : true },
                  path : `/settingviews/templates/email`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name : `E-Mail Template`,
                      meta : { requiresAuth : true },
                      path : '',
                      component: EmailTemplateList
                    },
                    {
                      name : `E-Mail Template Add`,
                      meta : { requiresAuth : true },
                      path : `/settingviews/templates/email/add`,
                      component: EmailTemplate
                    },
                    {
                      name : `E-mail Template Edit`,
                      meta : { requiresAuth : true },
                      path : `/settingviews/templates/email/edit/:id`,
                      component: EmailTemplateEdit
                    }
                  ]
                },
                
                {
                  
                  meta : { requiresAuth : true },
                  name : `Departments`,
                  path : `/settingviews/department`,
                  redirect : `/settingviews/department/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/settingviews/department/list',
                      component: DepartmentList
                    },
                    {
                      name : `Heads`,
                      meta : { requiresAuth : true },
                      path : '/settingviews/department/head/:deptId',
                      component: HeadList
                    },
                    {
                      name : `Designation`,
                      meta : { requiresAuth : true },
                      path : '/settingviews/department/designation/:deptId',
                      component: DesignationList
                    }
                  ]
                },
                {
                  meta : { requiresAuth : true },
                  name : `Designations`,
                  path : `/settingviews/designation`,
                  redirect : `/settingviews/designation/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/settingviews/designation/list',
                      component: DesignationList
                    },
                    {
                      name:"Add Designation",
                      meta : { requiresAuth : true },
                      path : '/settingviews/designation/add',
                      component: AddDesignation
                    },
                    {
                      name:"Add Designation",
                      meta : { requiresAuth : true },
                      path : '/settingviews/designation/add/:id',
                      component: AddDesignation
                    },
                    {
                      name:"Edit Designation",
                      meta : { requiresAuth : true },
                      path : '/settingviews/designation/edit/:id',
                      component: EditDesignation
                    }
                  ]
                },
                {
                  meta : { requiresAuth : true },
                  path : `/settingviews/templates/sms/`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name : `SMS Template`,
                      meta : { requiresAuth : true },
                      path : ``,
                      component: SmsTemplateList
                    },
                    {
                      name : `SMS Template Add`,
                      meta : { requiresAuth : true },
                      path : `/settingviews/templates/sms/add`,
                      component: SmsTemplate
                    },
                    {
                      name : `SMS Template Edit`,
                      meta : { requiresAuth : true },
                      path : `/settingviews/templates/sms/edit/:id`,
                      component: SmsTemplateEdit
                    }
                  ]
                },
                {
                  path : "/settingviews/label",
                  meta : { requiresAuth : true },
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name:"Labels",
                      path : "/settingviews/label",
                      meta : { requiresAuth : true },
                      component : LabelList
                    }
                  ]
                },
                {
                  path: '/settingviews/plugin',
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
                    },
                    {
                      name : `Communication Log`,
                      meta : { requiresAuth : true },
                      path : `/settingviews/plugin/log`,
                      component : CommunicationLog
                    },
                  ]
                },
              ]
            },
            {
              path:'/academics',
              component : {
                render (c) {
                  return c('router-view')
                } 
              },
              children : [
              ]
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
              name : 'Users',
              component: {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  path: '/user/list',
                  meta : { requiresAuth : true },
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
                }
              ]
            },
            {
              path:'/staff',
              redirect:'/staff/list',
              meta:{requiresAuth : true},
              component : {
                render(c) {return c('router-view')}
              },
              children:[
                {
                  
                  meta : { requiresAuth : true },
                  path : `/staff/list`,
                  name:"Staff List",
                  component : StaffList
                },
                {
                  path: '/staff/add',
                  meta : { requiresAuth : true },
                  name: 'Add Staff',
                  component: AddStaff
                },
                {
                  path: '/staff/details/:staffId',
                  meta : { requiresAuth : true },
                  name: 'Staff Details',
                  component: StaffDetails
                }
              ]
            },
            {
              path :'/attribute',
              meta : { requiresAuth : true },
              redirect : '/attribute/list',
              name : 'Custom Attributes',
              component: {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  path : '/attribute/list',
                  meta : { requiresAuth : true },
                  component : AttributeList
                },
                {
                  path : '/attribute/details/:attrId',
                  name : 'Edit Attribute',
                  meta : { requiresAuth : true },
                  component : AttributeEdit
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
                  name : `Super Admin`,
                  meta : { requiresAuth : true },
                  path : `/category/SuperAdmin`,
                  props : {key:'SuperAdmin'},
                  component : Category
                },
                {
                  name : `Guest`,
                  meta : { requiresAuth : true },
                  props : {key:'Guest'},
                  path : `/category/Guest`,
                  component : Category
                },
                {
                  name : `Vendor`,
                  meta : { requiresAuth : true },
                  props : {key:'Vendor'},
                  path : `/category/Vendor`,
                  component : Category
                },
                {
                  name : `Student`,
                  meta : { requiresAuth : true },
                  props : {key:'Student'},
                  path : `/category/Student`,
                  component : Category
                },
                {
                  name : `Guardian`,
                  meta : { requiresAuth : true },
                  props : {key:'Guardian'},
                  path : `/category/Guardian`,
                  component : Category
                },
                {
                  name : `Staff`,
                  meta : { requiresAuth : true },
                  props : {key:'Staff'},
                  path : `/category/Staff`,
                  component : Category
                },
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
                },
                {
                  name : `Communication Log`,
                  meta : { requiresAuth : true },
                  path : `/plugin/log`,
                  component : CommunicationLog
                },
              ]
            },
            {
              path: '/usertype',
              name : `User Groups`,
              redirect : '/usertype/list',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  meta : { requiresAuth : true },
                  path : `/usertype/list`,
                  component : CategoryList
                },
                {
                  name : 'Permissions',
                  meta : {requiresAuth :true},
                  path : '/usertype/per/:id',
                  component : PermissionList
                },
                {
                  name : 'Permissions',
                  meta : {requiresAuth :true},
                  path : '/usertype/:typeid/per/:id',
                  component : UGPermissionList
                }
              ]
            },
            {
              path: '/templates',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  
                  meta : { requiresAuth : true },
                  path : `/templates/email`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name : `E-Mail Template`,
                      meta : { requiresAuth : true },
                      path : '',
                      component: EmailTemplateList
                    },
                    {
                      name : `E-Mail Template Add`,
                      meta : { requiresAuth : true },
                      path : `/templates/email/add`,
                      component: EmailTemplate
                    },
                    {
                      name : `E-mail Template Edit`,
                      meta : { requiresAuth : true },
                      path : `/templates/email/edit/:id`,
                      component: EmailTemplateEdit
                    }
                  ]
                },

                {
                  
                  meta : { requiresAuth : true },
                  name : `Departments`,
                  path : `/department`,
                  redirect : `/department/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/department/list',
                      component: DepartmentList
                    },
                    {
                      name : `Heads`,
                      meta : { requiresAuth : true },
                      path : '/department/head/:deptId',
                      component: HeadList
                    },
                    {
                      name : `Designation`,
                      meta : { requiresAuth : true },
                      path : '/department/designation/:deptId',
                      component: DesignationList
                    }
                  ]
                },
                {
                  meta : { requiresAuth : true },
                  name : `Heads`,
                  path : `/heads`,
                  redirect : `/heads/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/heads/list',
                      component: HeadList
                    },
                  ]
                },
                {
                  meta : { requiresAuth : true },
                  name : `Designations`,
                  path : `/designation`,
                  redirect : `/designation/list`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      meta : { requiresAuth : true },
                      path : '/designation/list',
                      component: DesignationList
                    },
                    {
                      name:"Add Designation",
                      meta : { requiresAuth : true },
                      path : '/designation/add',
                      component: AddDesignation
                    },
                    {
                      name:"Add Designation",
                      meta : { requiresAuth : true },
                      path : '/designation/add/:id',
                      component: AddDesignation
                    },
                    {
                      name:"Edit Designation",
                      meta : { requiresAuth : true },
                      path : '/designation/edit/:id',
                      component: EditDesignation
                    }
                  ]
                },
                {
                  meta : { requiresAuth : true },
                  path : `/templates/sms/`,
                  component : {
                    render (c) { return c('router-view') }
                  },
                  children : [
                    {
                      name : `SMS Template`,
                      meta : { requiresAuth : true },
                      path : ``,
                      component: SmsTemplateList
                    },
                    {
                      name : `SMS Template Add`,
                      meta : { requiresAuth : true },
                      path : `/templates/sms/add`,
                      component: SmsTemplate
                    },
                    {
                      name : `SMS Template Edit`,
                      meta : { requiresAuth : true },
                      path : `/templates/sms/edit/:id`,
                      component: SmsTemplateEdit
                    }
                  ]
                },
              ]
            },
            {
              path: '/settings',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  name : `Settings`,
                  meta : { requiresAuth : true },
                  path : ``,
                  component : Settings
                },
                {
                  name : `Settings Edit`,
                  meta : { requiresAuth : true },
                  path : `/settings/:settingId`,
                  component : SettingEdit
                },
                
              ]
            },
            {
              path: '/budgettrans',
              name:"Budget Transfer List",
              redirect:'/budgettrans/list/add',
              meta : { requiresAuth : true },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  meta : { requiresAuth : true },
                  path : `/budgettrans/list/:id`,
                  component : BudgetTransferList
                },
                {
                  name : `Add Budget Transfer`,
                  meta : { requiresAuth : true },
                  path : `/budgettrans/add`,
                  component : BudgetTransfer
                }
              ]
            },
            {
            path : '/test',
            component: {
              render(c) {return c('router-view')},
            },
            children : [
              {
                path:'',
                name:"Test",
                props:true,
                component :test
              }
            ]},
            {
              path: '/transaction',
              meta : { requiresAuth : true },
              redirect:'/transaction/list',
              name:'Transaction List',
              component : {
                render(c) { return c('router-view') }
              },
              children : [
                {
                  name:'Add Transaction',
                  meta : { requiresAuth : true },
                  path:'/transaction/add',
                  props:true,
                  component : AddTransaction
                },
                {
                  path:'/transaction/list',
                  component : TransactionList
                },
                {
                  path:'/transaction/edit/:id',
                  meta : { requiresAuth : true },
                  name:'Edit Transaction',
                  component : EditTransaction
                }

              ]
            },
            {
              path : "/budget",
              component : {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  name:"Total Budget",
                  path : "/budget/total",
                  component : TotalBudget
                },
                {
                  name:"Remaining Budget",
                  path : "/budget/approved",
                  component : ApprovedBudget
                },
                {
                  name:"Budget Graph",
                  path : "/budget/graph",
                  props:true,
                  component : BudgetGraph
                },
                {
                  name:"CarryOver Budget",
                  path : "/budget/carryover",
                  component : CarryOverBudget
                }
              ]
            },
            {
              path : "/label",
              meta : { requiresAuth : true },
              component : {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  name:"Labels",
                  path : "/label",
                  meta : { requiresAuth : true },
                  component : LabelList
                }
              ]
            },
            {
              path : "/vendor",
              redirect:'/vendor',
              name:"Vendors",
              meta : { requiresAuth : true },
              component : {
                render (c) { return c('router-view') }
              },
              children : [
                {
                  path : "/vendor",
                  meta : { requiresAuth : true },
                  component : VendorList
                },
                {
                  name:"Vendor Detail",
                  path : "/vendor/:id",
                  meta : { requiresAuth : true },
                  component : VendorDetail
                }
              ]
            },
            {
              path: '/approval',
              meta : { requiresAuth : true },
              redirect:'/approval/view/all',
              name:'Approval List',
              component : {
                render(c) { return c('router-view') }
              },
              children : [
                {
                  name:'Add Approval',
                  meta : { requiresAuth : true },
                  path:'/approval/add',
                  component : AddApproval
                },
                {
                  path:'/approval/edit/:id',
                  meta : { requiresAuth : true },
                  name:'Edit Approval',
                  component : EditApproval
                },
                {
                  path:'/approval/view/:id',
                  meta : { requiresAuth : true },
                  component : ApprovalList
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
    { path: '/404', component: NotFound },  
    { path: '*', redirect: '/404' }
    
    
  ]
})



router.beforeEach((to, from, next) => {
  if(localStorage['session_key']!=null) {
    var sessionExists = localStorage['session_key']
    if(sessionExists) {
    if (to.matched.some(record => record.meta.requiresAuth) && !sessionExists) {
      next({ path: '/login', query: { redirect: to.fullPath }});
    } else {
      next();
    }
  }
  else {
      next();
    }
  }
  else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        next({ path: '/login', query: { redirect: to.fullPath }});
      } else {
        next();
      }
  }
});


export default router