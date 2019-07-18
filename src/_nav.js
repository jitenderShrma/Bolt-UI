


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
    name: "Budget",
    url : "/budget",
    icon:"icon-star"
  },
  {
    name:"Transaction",
    url:"/transaction",
    icon:"icon-calculator"
  },
  {
    name:"Approval",
    url:"/approval",
    icon:"icon-calculator"
  },
  {
    name:"Label",
    url:"/label",
    icon:"icon-calculator"
  },
  
]

export default {
  items: items
}
