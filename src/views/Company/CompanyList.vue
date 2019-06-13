<template>
  <div className="animated">
    <b-card>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Company List
        <router-link :to="{ name: 'Add Company' }">
          <h5><b-badge variant="primary">Add Company</b-badge></h5>
        </router-link>
      </b-card-header>
      <b-card-body style="padding : 0 1.25rem 0 1.25rem !important;">
        <v-client-table @row-click="onRowClick" :columns="columns" :data="data"  :options="options" :theme="theme" id="dataTable">
          <router-link slot="_id" slot-scope="props" target="_blank" :to="`sites/${props.row._id}`" class="icon-eye"></router-link>
        </v-client-table>
      </b-card-body>
    </b-card>
    
  </div>
  
</template>

<script>
    import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'


  Vue.use(ClientTable)

  export default {
    name: 'CompanyList',
    components: {
      ClientTable,
      Event
    },
    // data: function () {
    //   return {
        // columns: ['siteid','Owner','Group_Chat_Allowed', 'url'],
//         data: [],
//         options: {
//           headings: {
//             siteid : 'Site Name',
//             Owner : 'Owner',
//             Group_Chat_Allowed : 'Group Chat Allowed',
//             url : 'URL',
//             _id: 'URI'
//           },
//           sortable: ['siteid','Owner','Group_Chat_Allowed', 'url'],
//           filterable: ['siteid','Owner','Group_Chat_Allowed', 'url'],
//           sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
//           pagination: {
//             chunk: 5,
//             edge: false,
//             nav: 'scroll'
//           }
//         },
//         useVuex: false,
//         theme: 'bootstrap4',
//         template: 'default'
//       }
//     },
//     async mounted() {
//     axios.get("https://selacious-cloud-siteapi.herokuapp.com/sites")
//     .then(response => {this.data = response.data})
//   },
//   methods : {
//     onRowClick(event){
//         window.location.href = `#/sites/${event.row._id}`
//       }
//   }
  };

</script>

<style lang="scss">
  
  .table th, .table td {
    padding: 0.5rem !important;
    vertical-align: top;
    border-top: 1px solid #c8ced3;
  }
  table {
    cursor:pointer !important;
  }
  h5 {
    float:right;
  }
  .badge {
    float:right;
    
  }
  b-card {
    margin:0px !important;
    padding:0px !important;
  }
  .main .container-fluid {
    padding: 0 20px !important; 
  }
  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0 0 0  0 !important;
  }

  #dataTable {

    .VuePagination {
      text-align: center;
      justify-content: center;
    }

    .vue-title {
      text-align: center ;
      margin-bottom: 10px;
    }

    .VueTables__search-field {
      display: flex;
      padding: 1.25rem 0 0 0;

    }
    .VueTables__search-field input {
      margin-left: 0.25rem;
    }

    .VueTables__limit-field {
      display: flex;
    }

    .VueTables__limit-field select {
      margin-left: 0.25rem !important;
    }

    .VueTables__table th {
      text-align: center;

    }

    .VueTables__child-row-toggler {
      width: 16px;
      height: 16px;
      line-height: 16px;
      display: block;
      margin: auto;
      text-align: center;
    }

    .VueTables__child-row-toggler--closed::before {
      content: "+";
    }

    .VueTables__child-row-toggler--open::before {
      content: "-";
    }
  }

</style>
