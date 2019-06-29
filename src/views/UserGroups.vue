<template>
  <div className="animated fadeIn">
      <b-row>
          <b-col sm="3">
              <h4><strong>Module Name</strong></h4>
          </b-col>
          <b-col sm="6">
              <b-row>
                  <b-col></b-col>
                  <b-col><h4><strong>Permissions</strong></h4></b-col>
                  <b-col></b-col>
              </b-row>
              <b-row>
                  <b-col></b-col>
                  <b-col><strong>All</strong></b-col>
                  <b-col><strong>Read</strong></b-col>
                  <b-col><strong>Edit</strong></b-col>
                  <b-col><strong>Delete</strong></b-col>
                  <b-col><strong>More...</strong></b-col>

              </b-row>
          </b-col>
      </b-row>
      <hr>
      <b-row v-for="(run, index) in data" :key="index">
          <b-col>
              <input v-model="data[index].module_name" hidden/>
              <p v-text="data[index].module_name"></p>
          </b-col>
          <b-col>
            <b-form-group
            label=""
            label-for="basicInlineCheckboxes"
            :label-cols="3"
            :horizontal="true">
            <b-form-checkbox-group id="basicInlineCheckboxes" v-model="data[index].permission" :value="data[index].permission" name="InlineCheckboxes" >
                <b-row>
              <b-col>
                  <b-form-checkbox  value="All"></b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox value="Read"></b-form-checkbox>  
              </b-col>
              <b-col>
                  <b-form-checkbox  value="Edit"></b-form-checkbox>
              </b-col>
              <b-col>
                  <b-form-checkbox  value="Delete"></b-form-checkbox>
              </b-col>
              <b-col>
              <b-btn>Add More</b-btn>
              </b-col>
              </b-row>
              
            </b-form-checkbox-group>
            
          </b-form-group>
          </b-col>
      </b-row>
  </div>
  
</template>

<script>

    import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import axios from 'axios'
  import apiUrl from '@/apiUrl'

  Vue.use(ClientTable)
var link = window.location.href
  var key = link.split("usergroups/",24).pop()
  console.log(key)
  export default {
    name: 'User Groups',
    components: {
      ClientTable,
      Event
    },
    data: function () {
      return {
        columns: ['module_name','permission'],
        data: [],
        options: {
          headings: {
            module_name : "Module",
            permission : "Permissions",
          },
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
    props :['key'],
 async mounted() {
     var link = window.location.href
  var key = link.split("usergroups/",24).pop()
  console.log(key)
    axios.get(`${apiUrl}`+`super/group/get/${this.key}`,{ withCredentials : true})
    .then(response => {this.data = response.data.modules})
 },
 async updated() {
     var link = window.location.href
  var key = link.split("usergroups/",24).pop()
  console.log(key)
    axios.get(`${apiUrl}`+`super/group/get/${key}`,{ withCredentials : true})
    .then(response => {this.data = response.data.modules})
 },
 
  methods : {
    onRowClick(event){
        window.location.href = `#/usergroups/details/${key}`
      }
  }
  };

// </script>

<style lang="scss">
  
//   .table th, .table td {
//     padding: 0.5rem !important;
//     vertical-align: top;
//     border-top: 1px solid #c8ced3;
//   }
//   table {
//     cursor:pointer !important;
//   }
//   h5 {
//     float:right;
//   }
//   .badge {
//     float:right;
    
//   }
//   b-card {
//     margin:0px !important;
//     padding:0px !important;
//   }
//   .main .container-fluid {
//     padding: 0 20px !important; 
//   }
//   .card-body {
//     -webkit-box-flex: 1;
//     -ms-flex: 1 1 auto;
//     flex: 1 1 auto;
//     padding: 0 0 0  0 !important;
//   }

//   #dataTable {

//     .VuePagination {
//       text-align: center;
//       justify-content: center;
//     }

//     .vue-title {
//       text-align: center ;
//       margin-bottom: 10px;
//     }

//     .VueTables__search-field {
//       display: flex;
//       padding: 1.25rem 0 0 0;

//     }
//     .VueTables__search-field input {
//       margin-left: 0.25rem;
//     }

//     .VueTables__limit-field {
//       display: flex;
//     }

//     .VueTables__limit-field select {
//       margin-left: 0.25rem !important;
//     }

//     .VueTables__table th {
//       text-align: center;

//     }

//     .VueTables__child-row-toggler {
//       width: 16px;
//       height: 16px;
//       line-height: 16px;
//       display: block;
//       margin: auto;
//       text-align: center;
//     }

//     .VueTables__child-row-toggler--closed::before {
//       content: "+";
//     }

//     .VueTables__child-row-toggler--open::before {
//       content: "-";
//     }
//   }

</style>
