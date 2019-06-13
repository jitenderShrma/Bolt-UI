<template>
  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Add</strong> Company
          </div>
          <b-form action="CompanyList" v-on:submit.prevent="sendData">
          <b-form-group
            description="Name of Company"
            label="Name"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.company_name" type="text" autocomplete="company_name" placeholder="Enter the name of your Company" required ></b-form-input>
          </b-form-group>
          <b-form-group
            description="Type of Company"
            label="Type"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.type" type="text" autocomplete="type" placeholder="Enter the Type of your Company" required ></b-form-input>
          </b-form-group>
          <!-- <b-form-group
            description="Add new Attributes"
            label="Additional Attributes"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.add_attributes" type="text" autocomplete="type" placeholder="Add Attributes" required ></b-form-input>
          </b-form-group>
          <b-button class="float-right" type="button" @click="addcontact()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> + Add Contact</b-button> -->

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
</template>

<script>
import axios from 'axios';


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
  methods : {
    async sendData() {
            axios.post("http://localhost:3000/company/add",this.input).then((response) =>{
              console.log(response);
            })
            .catch( function (error){
              console.log(error);
            });
      }
  }
  
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
