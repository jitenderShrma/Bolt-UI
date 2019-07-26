<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
  
        <router-link :to="{ name: 'Add Company' }">
          <b-btn variant="primary" v-text="$ml.get('addcompany')"></b-btn>
        </router-link>
        <br>
        <br>
        <router-link :to="{ name: 'Add User' }">
          <b-btn variant="primary" v-text="$ml.get('adduser')"></b-btn>
        </router-link>
        <br>
        <br>
        <router-link :to="{ name: 'User List' }">
          <b-btn variant="primary" v-text="$ml.get('getallusers')"></b-btn>
        </router-link>
    
  </div>
  </div>
</template>

<script>
    import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import apiUrl from '@/apiUrl'

  Vue.use(ClientTable)

  export default {
    name: 'CompanyList',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['company_name','company_type'],
        data: [],
        options: {
          headings: {
            siteid : 'Site Name',
            Owner : 'Owner',
            Group_Chat_Allowed : 'Group Chat Allowed',
            url : 'URL',
            _id: 'URI'
          },
          sortable: ['company_name','company_type'],
          filterable: ['company_name','company_type'],
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
    axios({ method: "GET", "url": `${apiUrl}`+`company/list`,"headers": { 'withCredentials': 'true' } }).then(result => {
                    this.data = result.data;
                }, error => {
                    console.error(error);
                });
  },
  methods : {
    onRowClick(event){
        window.location.href = `#/company/${event.row._id}`
      }
  }
  };

</script>

<style lang="scss">
  
  

</style>
