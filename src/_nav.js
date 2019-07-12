


var items = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'primary',
      text: 'NEW'
    }
  },
  {
    name: 'Login Pages',
    url: '/login',
    icon: 'icon-star',
    children: [
      {
        name: 'SuperUserLogin',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'UserLogin',
        url: '/login/user',
        icon: 'icon-star'
      },
    ]
  },
  
  {
    name: 'Users',
    url: '/user/list',
    icon: 'icon-star',
  },
  {
    name: 'User Groups',
    url: '/usertype/list',
    icon: 'icon-star',
  },
  {
    name: 'Custom Attributes',
    url: '/attribute',
    icon: 'icon-star',
  },
  {
    name : "Templates",
    url : '/templates',
    icon : 'icon-envelope',
    children : [
      {
        name : 'Email Templates',
        url : '/templates/email',
        icon : 'icon-envelope',
      },
      {
        name : 'SMS Templates',
        url : '/templates/sms',
        icon : 'icon-envelope',
      },
    ]
  },
  {
    name: 'Communication Log',
    url: '/plugin/log',
    icon: 'icon-settings',
  },
  {
    name : "Departments",
    url : "/department/list",
    icon : "icon-star"
  },
  {
    name : "Designations",
    url : "/designation/list",
    icon : "icon-star"
  },
  {
    name : "Heads",
    url : "/heads/list",
    icon : "icon-star"
  },
  {
    name: "Test",
    url : "/test",
    icon:"icon-star"
  },
  {
    name:"Transaction",
    url:"/transaction/add",
    icon:"icon-calculator"
  }
]

export default {
  items: items
}
