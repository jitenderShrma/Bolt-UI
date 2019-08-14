<template>
  <AppHeaderDropdown right no-caret v-if="tab">
    <template slot="header">
      <i class="fa fa-user font-3xl"></i>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong @click="reRoute(ssnCompany._id)" v-text="ssnCompany.company_name"></strong>&nbsp; &nbsp; &nbsp;<b-badge variant="primary" @click="toggleNavs" v-text="$ml.get('switch')"></b-badge>
      </b-dropdown-header>
      <div v-if="isUser">
      <b-dropdown-item @click = "userDetails">
        <b-card style="border:none">
          <b-row>
          <b-col sm="2"><i class="fa fa-user font-2xl"/></b-col>
          <b-col sm="6"><span v-text="user.user_name"></span>
          </b-col>
        </b-row>
        </b-card>
      </b-dropdown-item>
    </div>
    <b-dropdown-item @click = "Settings"><i class="fa fa-wrench" /> <span  v-text="$ml.get('settings')"></span></b-dropdown-item>
      <b-dropdown-item @click = "Plugin"><i class="fa fa-file" /> <span  v-text="$ml.get('extensions')"></span>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click = "Logout"><i class="fa fa-lock" /> <span  v-text="$ml.get('logout')"></span></b-dropdown-item>
    </template>
  </AppHeaderDropdown>
  <AppHeaderDropdown right no-caret v-else-if="!tab">
    <template slot="header">
      <i class="fa fa-user font-3xl"></i>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong  v-text="$ml.get('companylist')"></strong>&nbsp; &nbsp; &nbsp;<b-badge variant="primary" @click="toggleNavs" v-text="$ml.get('switch')"></b-badge>
      </b-dropdown-header>
      <v-for >
      <b-dropdown-item v-for="(run, index) in data"
       :key="index" @click="setSsn(data[index]._id)" ><i class="fa fa-user" /><span v-text="data[index].company_name"></span>
      </b-dropdown-item>
      </v-for>
      <b-dropdown-divider />
      <b-dropdown-item @click="addCompany"><i class="fa fa-plus"  /> <span  v-text="$ml.get('addnewcompany')"></span></b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click = "Logout"><i class="fa fa-lock" /> <span  v-text="$ml.get('logout')"></span></b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import ml from '@/ml'
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import axios from 'axios';
import Auth from '@/Auth.js'
import apiUrl from '@/apiUrl'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      tab : true,
      data : [],
      ssnCompany : {
        },
      user:null,
      isUser : false
      };
  },
  async mounted() {
    var Session = JSON.parse(localStorage['session_key'])
    if(Session.length==24) {
      axios.get(`${apiUrl}`+`company/list`,{withCredentials : true})
      .then(response => {
        this.data = response.data
        this.ssnCompany = this.data[0]
        axios.get(`${apiUrl}`+`company/${this.ssnCompany._id}`,{withCredentials : true})
        .then(response => {
        this.$session.set('company',response.data._id);
      })
    })
  }
  else{
      var list = JSON.parse(localStorage.session_key)
      this.user = list.user
      this.isUser = true;
        axios.get(`${apiUrl}`+`company/${this.user.company}`,{withCredentials : true})
        .then(response => {
          console.log(response.data)
          this.data = [response.data]
        this.ssnCompany = response.data
        this.$session.set('company',response.data._id);
        })
      }
  },
  methods : {
    userDetails() {
      this.$router.push(`staff/details/${this.user._id}`);
    },
    Settings(){
      console.log("settings");
      this.$router.push("/settings");
    },
    Plugin(){
      console.log("plugin");
      this.$router.push("/plugin");
    },
    toggleNavs () {
      this.tab = !this.tab;
      console.log("toggle");
    },
    addCompany () {
      console.log("add company");
      this.$router.push("/add/company");
    },
    async setSsn (id) {
      axios.get(`${apiUrl}`+`company/${id}`,{withCredentials : true})
      .then(response => {
      this.ssnCompany = response.data;
      this.tab = !this.tab;
      console.log(this.ssnCompany)})
    },
    async Logout() {
      delete localStorage['session_key'];
      if(this.$session.has('Subuser')) {
        axios.post(`${apiUrl}`+`user/subuser/logout`,{withCredentials :true}).then((response) =>{
              Auth.logout();
              this.$session.destroy();
              delete sessionStorage['vue-session-key'];
              delete localStorage['session_key'];
              console.log(Auth.loggedIn);            
              this.$router.push('/login');
            })
            .catch(function(error) {
              console.log(error);
            })
      }
      else {
        axios.get(`${apiUrl}`+`auth/super/logout`,{withCredentials :true}).then((response) =>{
              Auth.logout();
              this.$session.destroy();
              delete sessionStorage['vue-session-key'];
              delete localStorage['session_key'];
              console.log(Auth.loggedIn);            
              this.$router.push('/login');
            })
            .catch(function(error) {
              console.log(error);
            })
      }
      
    },
    reRoute(id) {
      this.$router.push(`/company/${id}`);
    }
  }
};
</script>
<style>
  .app-header .nav-item .nav-link .badge {
    position  : unset;
}

</style>