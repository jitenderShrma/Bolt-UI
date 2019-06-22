<template>
  <div className="animated fadeIn">
    <b-card>
      <b-card-header>
        <i class="icon-menu mr-1"></i><span v-text="$ml.get('users')"></span>
        <router-link :to="{ name: 'Add User' }">
          <h5><b-badge variant="primary" v-text="$ml.get('adduser')"></b-badge></h5>
        </router-link>
      </b-card-header>
      <b-card-body style="padding : 0 1.25rem 0 1.25rem !important;">
        <v-client-table @row-click="onRowClick" :columns="columns" :data="data"  :options="options" :theme="theme" id="dataTable">
          <router-link slot="_id" slot-scope="props" target="_blank" :to="`user/details/${props.row._id}`" class="icon-eye"></router-link>
        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import ml from '@/ml'
  import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import axios from 'axios'
  import apiUrl from '@/apiUrl'


  Vue.use(ClientTable)

  export default {
    name: 'DataTable',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['user_name','user_type','address'],
        data: [],
        options: {
          headings: {
            user_name : "User Name",
            user_type : "User Type",
            address : "Address",
            _id : 'URL'
          },
          listColumns : {},
          sortable: ['user_name','user_type','address'],
          filterable: ['user_name','user_type','address'],
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
    async mounted() {
    axios.get(`${apiUrl}`+`user/see/all`,{ withCredentials : true})
    .then(response => {this.data = response.data})
  },
  methods : {
    onRowClick(event){
        window.location.href = `#/user/details/${event.row._id}`
      }
  }
  };

// </script>

<style lang="scss">


</style>
