<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <i class="icon-energy font-2xl" style="margin-top:-6px;"></i>
        &nbsp;
        <h3  style="color:black">BOLT</h3>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdown/>
        </b-nav-item>
        <b-nav-item class="">
          <DefaultHeaderDropdownAccnt/>
        </b-nav-item>
      </b-navbar-nav>&nbsp;
      
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        
        <SidebarForm/>
        <SidebarNav :navItems="navItems"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside fixed> -->
        <!--aside-->
        <!-- <DefaultAside/>
      </AppAside> -->
    </div>
    <!-- <TheFooter>
      footer
      
    </TheFooter> -->
  </div>
</template>

<script>
import nav from '@/_nav'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdown,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      pendingCount1:0,
      pendingCount2:0,
      navItems: [
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
          name: 'Finance',
          url:'/finance',
          icon: 'icon-calculator',
          children:[
          ]
        },
        {
          divider:true,
          class:'mt-auto'
        },
        {
          name: 'Settings',
          url:'/settingviews',
          icon: 'icon-settings',
          children:[]
        },
      ],
    }
  },
  beforeMount:function () {
     axios.get(`${apiUrl}approvals/preApp/get/count`,{withCredentials:true}).then((res) => {
      this.pendingCount1 = res.data
      axios.get(`${apiUrl}transfer/budtrans/get/count`,{withCredentials:true}).then((resp) => {
        this.pendingCount2 = resp.data
        var Session = JSON.parse(localStorage['session_key']);
    if(Session.user!=null) {
      var permission = Session.additional_permissions
      for(var i=0;i<permission.length;i++) {
        if(permission[i].module_name != undefined)
        {
          if(permission[i].read_all == true || permission[i].read_own == true ) {
            if(permission[i].text == "Staff") {
              this.navItems[3].children.push({
                  name: 'Staff',
                  url: '/settingviews/staff',
                  icon: 'icon-user'
            })
            }
            if(permission[i].text=="Vendor") {
                this.navItems[1].children.push({
                name : "Vendor",
                url : "/finance/vendor",
                icon : "icon-star"
              },)
            }
            if(permission[i].text=="Department") {
              
                this.navItems[3].children.push({
                  name : "Departments",
                  url : "/settingviews/department/list",
                  icon : "icon-star"
                })
            }
            if(permission[i].text == "Approval") {
              this.navItems[1].children.push(
                {
                  name:"Approval Requests",
                  url:"/finance/approval/view/all",
                  icon:"icon-calculator",
                  badge: {
                    variant: 'primary',
                    text: this.pendingCount1
                  }
                })
            }
            if(permission[i].text=="Designation") {
              
                this.navItems[3].children.push({
                name : "Designations",
                url : "/settingviews/designation/list",
                icon : "icon-star"
              },)
            }
            
            if(permission[i].text=="Head") {
              
                this.navItems[1].children.push(  {
                name : "Heads",
                url : "/finance/heads/list",
                icon : "icon-star"
              },
              {
                name: "Budget",
                icon:"icon-star",
                url:"/finance/budget",
                children : [
                  {
                    name:"Total Budget",
                    url:"/finance/budget/total",
                    icon:"icon-star"
                  },
                  {
                    name:"Remaining Budget",
                    url:"/finance/budget/approved",
                    icon:"icon-star"
                  },
                  {
                    name:"CarryOver Budget",
                    url:"/finance/budget/carryover",
                    icon:"icon-star"
                  }
                ]
              })
            }
            if(permission[i].text=="Label") {
              
                this.navItems[3].children.push({
                  name:"Label",
                  url:"/settingviews/label",
                  icon:"icon-calculator"
                },)
            }
            if(permission[i].text=="Transcation") {
                this.navItems[1].children.push({
                  name:"Transaction",
                  url:"/finance/transaction",
                  icon:"icon-calculator"
                },)
            }
            if(permission[i].text=="Budget Transfer") {
              
                this.navItems[1].children.push({
                  name: "Budget Transfer",
                  icon:"icon-star",
                  url:"/finance/budgettrans/list/all",
                  badge: {
                    variant: 'primary',
                    text: this.pendingCount2
                  }
                })
            }
          }
      }
    }
    }
    else {
    this.navItems = [
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
    name: 'Finance',
    url:'/finance',
    icon: 'icon-calculator',
    children:[
      {
        name: 'Vendor',
        url: '/finance/vendor',
        icon: 'icon-user'
      },
      {
        name : "Heads",
        url : "/finance/heads/list",
        icon : "icon-star"
      },
      {
        name: "Budget",
        icon:"icon-star",
        url:"/finance/budget",
        children : [
          {
            name:"Total Budget",
            url:"/finance/budget/total",
            icon:"icon-star"
          },
          {
            name:"Remaining Budget",
            url:"/finance/budget/approved",
            icon:"icon-star"
          },
          {
            name:"CarryOver Budget",
            url:"/finance/budget/carryover",
            icon:"icon-star"
          }
        ]
      },
      {
        name: "Budget Transfer",
        icon:"icon-star",
        url:"/finance/budgettrans/list/all",
        badge: {
          variant: 'primary',
          text: this.pendingCount2
        }
      },
      {
        name:"Transaction",
        url:"/finance/transaction",
        icon:"icon-calculator"
      },
      {
        name:"Approval Requests",
        url:"/finance/approval/view/all",
        icon:"icon-calculator",
        badge: {
          variant: 'primary',
          text: this.pendingCount1
        }
      },
    ]
  },
  {
    divider:true,
    class:'mt-auto'
  },
  {
    name: 'Settings',
    url:'/settingviews',
    icon: 'icon-settings',
    children:[
      {
        name: 'Staff',
        url: '/settingviews/staff',
        icon: 'icon-user'
      },
      
      {
        name : "Templates",
        url : '/settingviews/templates',
        icon : 'icon-envelope',
        children : [
          {
            name : 'Email Templates',
            url : '/settingviews/templates/email',
            icon : 'icon-envelope',
          },
          {
            name : 'SMS Templates',
            url : '/settingviews/templates/sms',
            icon : 'icon-envelope',
          },
        ]
      },
      {
        name: 'Communication Log',
        url: '/settingviews/plugin/log',
        icon: 'icon-settings',
      },
      {
        name : "Departments",
        url : "/settingviews/department/list",
        icon : "icon-star"
      },
      {
        name : "Designations",
        url : "/settingviews/designation/list",
        icon : "icon-star"
      },
      
      
      
      
      {
        name:"Label",
        url:"/settingviews/label",
        icon:"icon-calculator"
      },
    ]
  },
]
    }
      })
    })
     
    
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
};
</script>
<style>
.card { 
  margin:0px!important;
}
   .breadcrumb {
    margin-bottom:-1px !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0.5rem 1rem;
    margin-bottom: 5px;
    list-style: none;
    background-color: #fff;
    border-radius: 0;
   }
   .container-fluid {
    width: 100%;
    padding-right: 0px !important;
    padding-left: 0px !important;
    margin-right: 0;
    margin-left: 0;
}
/*@media (min-width: 992px) {
.header-fixed .app-body {
    margin-top: 50px;
}
}
.app-header  {
  height:50px;
}*/

</style>
