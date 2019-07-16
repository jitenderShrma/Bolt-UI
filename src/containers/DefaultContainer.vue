<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img style="position:relative; top:-5%;" src="favicon-16x16.png" alt="">
        &nbsp;
        <h3  style="color:black">BOLT</h3>
       <!-- <img class="navbar-brand-full" src="favicon-16x16.png" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="favicon-16x16.png" width="30" height="30" alt="CoreUI Logo"> -->
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none ml-auto">
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdown/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownAccnt/>
        </b-nav-item>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
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
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
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
          name: 'Permissions',
          url: '/permissions',
          icon: 'icon-settings',
        }
      ],
    }
  },
  beforeMount: function () {
    if(this.$session.has('permissions')) {
      var permission = this.$session.get('permissions')
      for(var i=0;i<permission.length;i++) {
        if(permission[i].module_name != undefined)
        {
           this.navItems.push({
           name : `${permission[i].module_name}`,
           url: `${permission[i].module_name}/list`,
           icon: 'icon-star',
          })
      }
    }
    }
    else {
    this.navItems = nav.items
    }
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
         display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0 1rem;
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
@media (min-width: 992px) {
.header-fixed .app-body {
    margin-top: 50px;
}
}
.app-header  {
  height:50px;
}

</style>
