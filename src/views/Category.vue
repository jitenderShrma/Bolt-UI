<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
  
    <b-card>
      <b-card-header>
        <i class="icon-menu mr-1"></i> <span v-text="$ml.get('usergroups')"></span>
        <router-link :to="{ name: 'Add Permission' }">
          <h5><b-badge variant="primary" v-text="$ml.get('addusergroups')"></b-badge></h5>
        </router-link>
      </b-card-header>
      <b-card-body style="padding : 0 1.25rem 0 1.25rem !important;">
        <v-client-table @row-click="onRowClick" :columns="columns" :data="data"  :options="options" :theme="theme" id="dataTable">
          <router-link slot="_id" slot-scope="props" target="_blank" :to="`user/drtails/${props.row._id}`" class="icon-eye"></router-link>
        </v-client-table>
      </b-card-body>
    </b-card>
    
  </div>
  
</template>

<script>

    import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import axios from 'axios'
  import apiUrl from '@/apiUrl'


  Vue.use(ClientTable)

  export default {
    name: 'Category',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['user_group','modules'],
        data: [],
        
        options: {
          headings: {
            user_group : "User Group",
            modules : "Modules"
          },
          sortable: ['user_group','modules'],
          filterable: ['user_group','modules'],
          sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default'
      }
    },
    props :['key'],
    async mounted() {
      axios.get(`${apiUrl}`+`super/group/getall/`+`${this.key}`,{ withCredentials : true})
    .then(response => {this.data = response.data})
  },
  async updated() {
    
      axios.get(`${apiUrl}`+`super/group/getall/`+`${this.key}`,{ withCredentials : true})
    .then(response => {this.data = response.data})
    
      
  },
  methods : {
    onRowClick(event){
        window.location.href = `#/usergroupsdetails/${event.row.user_group}`
      }
  }
  };

// </script>

<style lang="scss">

</style>
