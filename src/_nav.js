
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
        name: 'Staff',
        url: '/staff',
        icon: 'icon-user'
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
    icon:"icon-star",
    url:"/budget",
    children : [
      {
        name:"Total Budget",
        url:"/budget/total",
        icon:"icon-star"
      },
      {
        name:"Approved Budget",
        url:"/budget/approved",
        icon:"icon-star"
      }
    ]
  },
  {
    name: "Budget Transfer",
    icon:"icon-star",
    url:"/budgettrans/list/all"
  },
  {
    name:"Transaction",
    url:"/transaction",
    icon:"icon-calculator"
  },
  {
    name:"Approval Requests",
    url:"/approval/view/all",
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
