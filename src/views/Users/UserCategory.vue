<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

<div class="app flex-row align-items-center">
    <div class="container">
        
      <b-row class="justify-content-center">
        <b-col md="8">
  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>User</strong> Category
          </div>
          <b-form action="CompanyList" v-on:submit.prevent="sendData">
          <b-form-group
            description="Name of Category"
            label="Name"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.name" type="text" autocomplete="name" placeholder="Enter the name of User Category" required ></b-form-input>
          </b-form-group>
          <label>Permissions</label>
          <b-form-checkbox-group stacked id="basicCustomCheckboxes">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customChk1" value="1" checked>
                <label class="custom-control-label" for="customChk1">Option 1</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customChk2" value="2">
                <label class="custom-control-label" for="customChk2">Option 2</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customChk3" value="3">
                <label class="custom-control-label" for="customChk3">Option 3</label>
              </div>
            </b-form-checkbox-group>
            <br>

           <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
              </router-link>




          </div>
          </b-form>
        </b-card>
        </b-col>
    </b-row>
    
    </b-col>
    </b-row>
    </div>
    </div>
  </div>
</template>

<script>
//   import { Callout } from '@coreui/vue'
//   import axios from 'axios'
//   import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
//   import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
//   import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
//   import CardBarChartExample from './dashboard/CardBarChartExample'
//   import MainChartExample from './dashboard/MainChartExample'
//   import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
//   import CalloutChartExample from './dashboard/CalloutChartExample'

//   var link = window.location.href
//   var key = link.split("8080",24).pop()


export default {
  name: 'Add Company',
  data: function () {
    return {
      selected: 'Month',
      posts: [],
      resp: [],
      errors: [],
      input: {
                    super_user : "",
                    company_name : "",
                    type : "",
                    add_attributes : [],
                    address : "",
                    vendors : "",
                    tags : []
                },
      
      
    }
  },
  async mounted() {
    axios.get("https://selacious-cloud-siteapi.herokuapp.com/products")
    .then(response => {this.posts = response.data})
  },

  
}

</script>

<style>
  b-card {
    margin:0px !important;
    padding:1.25rem !important;
  }
  .card-body {
    padding: 1.25rem !important;
  }
</style>
