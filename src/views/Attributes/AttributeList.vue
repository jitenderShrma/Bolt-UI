<template>
  <div className="animated fadeIn">
    <b-card>
      <b-card-header>
        <span v-text="$ml.get('customattributes')"></span>
          <!-- <h5><b-badge variant="primary">Add Attribute</b-badge></h5> -->
      </b-card-header>
      <b-card-body>
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
    name: 'DataTable',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['context','field_name','field_type','description'],
        data: [],
        options: {
          headings: {
            context : 'Context',
            field_name : 'Field Name',
            feild_type : 'Field Type',
            description : 'Description'
          },
          sortable: ['context','field_name','field_type','description'],
          filterable: ['context','field_name','field_type','description'],
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
    axios.get(`${apiUrl}`+`super/attrib/view/`,{ withCredentials:true })
    .then(
      response => {
        this.data = response.data
      })  
  },
  methods : {
    onRowClick(event){
        window.location.href = `#/attribute/details/${event.row._id}`
      }
  }
  };

</script>

<style>
  .card-body { 
  padding:0px !important;
}

#add-badge { 
  float:right;
  margin-top: -20px;
}

</style>
