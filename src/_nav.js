

export default {
  items: [
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
          url: '/login/superuser',
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
      name: 'User Groups',
      url: '/user',
      icon: 'icon-star',
      children: [
        {
          name: 'SuperUserLogin',
          url: '/login/superuser',
          icon: 'icon-star'
        },
        {
          name: 'UserLogin',
          url: '/login/user',
          icon: 'icon-star'
        },
      ]
    }
  ]
  
}
