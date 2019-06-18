<template>
  <AppHeaderDropdown right no-caret v-if="tab">
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong v-text="ssnCompany.company_name"></strong>&nbsp; &nbsp; &nbsp;<b-badge variant="primary" @click="toggleNavs">Switch</b-badge>
      
      </b-dropdown-header>
      <b-dropdown-item @click="reRoute(ssnCompany._id)" ><i class="fa fa-edit" /> Company Details
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        
      </b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item @click = "Settings"><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>
      <b-dropdown-item @click = "Logout"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
  <AppHeaderDropdown right no-caret v-else-if="!tab">
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Company List</strong>&nbsp; &nbsp; &nbsp;<b-badge variant="primary" @click="toggleNavs">Switch</b-badge>
      </b-dropdown-header>
      <v-for >
      <b-dropdown-item v-for="(run, index) in data"
       :key="index" @click="setSsn(data[index]._id)" ><i class="fa fa-user" /><span v-text="data[index].company_name"></span>
      </b-dropdown-item>
      </v-for>
      <b-dropdown-divider />
      <b-dropdown-item @click="addCompany"><i class="fa fa-plus"  /> Add new Company</b-dropdown-item>
      <b-dropdown-divider />

      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>
      <b-dropdown-item @click = "Logout"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import axios from 'axios';
import Auth from '@/Auth.js'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 42,
      tab : true,
      data : [],
      ssnCompany : {
        _id : "",
        company_name : ""
      }
      }
  },
  async mounted() {
    axios.get("http://127.0.0.1:3000/api/company/list",{withCredentials : true})
    .then(response => {
      this.data = response.data
      this.ssnCompany = this.data[0];
      axios.get(`http://127.0.0.1:3000/api/company/${ssnCompany._id}`,{withCredentials : true})
      .then(response => {
      this.ssnCompany = response.data;
      this.tab = !this.tab;
      console.log(this.ssnCompany)})
    
      console.log(this.data)})
  },
  methods : {

    toggleNavs () {
      this.tab = !this.tab;
      console.log("toggle");
    },
    addCompany () {
      console.log("add company");
      this.$router.push("/add/company");
    },
    async setSsn (id) {
      axios.get(`http://127.0.0.1:3000/api/company/${id}`,{withCredentials : true})
      .then(response => {
      this.ssnCompany = response.data;
      this.tab = !this.tab;
      console.log(this.ssnCompany)})
    },
    async Logout() {
      axios.get("http://127.0.0.1:3000/api/super/logout",{withCredentials :true}).then((response) =>{
              Auth.logout();
              console.log(Auth.loggedIn);            
              this.$router.push('/login');
            })
            .catch(function(error) {
              console.log(error);
            })
    },
    reRoute(id) {
      this.$router.push(`/company/${id}`);
    }
  }
}
</script>
<style>
  .app-header .nav-item .nav-link .badge {
    position  : unset;
}

</style>