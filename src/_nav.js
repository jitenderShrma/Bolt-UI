import apiUrl from '@/apiUrl'
import axios from 'axios'

var pendingCount;

// async function getCount() {
//   var val
//   await axios.get(`${apiUrl}`+`approvals/preApp/view/requests`,{withCredentials:true}).then((res) => {
//       val = res.data.length
//       console.log(res.data)
//     })
//   return val
// }
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
    icon: 'icon-user',
    children:[
      {
        name: 'Staff',
        url: '/staff',
        icon: 'icon-user'
      }
    ]
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
    name:"Transaction",
    url:"/transaction",
    icon:"icon-calculator"
  },
  {
    name:"Approval",
    url:"/approval",
    icon:"icon-calculator",
    children : [
      {
        name:"All Approvals",
        url:"/approval/view/all",
        icon:'icon-calculator'
      },
      {
        name:'Approval Requests',
        url: '/approval/view/pending',
        icon:'icon-calculator',
        badge: {
          variant: 'danger',
          text: pendingCount
        }
      }

    ]
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
