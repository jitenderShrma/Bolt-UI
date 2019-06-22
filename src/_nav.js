

var users = ['SuperAdmin','Guest','Vendor','Student','Guardian','Staff'];




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
    name: 'Company',
    url: '/company',
    icon: 'icon-star',
  },
  {
    name: 'Category',
    url: '/category',
    icon: 'icon-star',
    children: [
      
    ]
  },
  {
    name: 'Additional Attributes',
    url: '/attr',
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
      }
    ]
  }
]
for(var i=0;i<users.length;i++) {
  items[3].children.push({
    name : `${users[i]}`,
    url: `/category/${users[i]}`,
    icon: 'icon-star',
  })
}



export default {
  items: items
}
