<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none ml-auto">
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdown/>
        </b-nav-item>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <b-button type="button" variant="dark" @click="myModal = true" class="mr-1">Company Name</b-button>
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
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>
    <b-modal onlyok title="Your Account" v-model="myModal" @ok="myModal = false" >
      <b-button variant="" size="md" block>Company</b-button>
      <b-button size="md" block>Personal</b-button>
      <br>
      <router-link :to="{ name: 'Add Company' }" @click="myModal = false">Add another Company</router-link>
      <hr>
      <i class="icon-user"></i><router-link :to="{ name: 'Add Company' }" @click="myModal = false">Manage your Profile</router-link>
      <br>
      <i class="icon-link"></i><router-link :to="{ name: 'Add Company' }" @click="myModal = false">Logout</router-link>
    </b-modal>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdown from './DefaultHeaderDropdown'

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
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      navItems: nav.items,
      myModal: false
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
}
</script>
