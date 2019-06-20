<template>
  <div className="animated fadeIn">
          <b-card no-body>
          <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
            <b-tab active>
              <template slot="title">
                {{tabs[0]}}
              </template>
              <b-row>
      <b-col md="12">
        
          <div slot="header">
            <strong v-text="$ml.get('updatedelete')"></strong>&nbsp;<span v-text="$ml.get('usergroup')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="updateData">
            <b-form-group
            :label="$ml.get('nameofusergroup')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.user_group" type="text" autocomplete="user_name" :placeholder="$ml.get('placeholderusergroup')" ></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$ml.get('nameofparentgroup')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <cool-select
                v-model="input.parent_group"
                :items="items"
                :placeholder="$ml.get('placeholderparentgroup')"
               >
              </cool-select>
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
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
        </b-col>
    </b-row>
            </b-tab>
            <b-tab>
              <template slot="title">
                {{tabs[1]}}
              </template>
              <b-row>
          <b-col sm="2">
              <h4><strong v-text="$ml.get('modulename')"></strong></h4>
          </b-col>
          <b-col sm="10">
              <b-row>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col><h4><strong v-text="$ml.get('permissions')"></strong></h4></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
              </b-row>
              <b-row>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col><strong v-text="$ml.get('all')"></strong></b-col>
                  <b-col><strong v-text="$ml.get('read')"></strong></b-col>
                  <b-col><strong v-text="$ml.get('edit')"></strong></b-col>
                  <b-col><strong v-text="$ml.get('delete')"></strong></b-col>
                  <b-col><strong v-text="$ml.get('more')">...</strong></b-col>

              </b-row>
          </b-col>
      </b-row>
      <hr>
      <b-row v-for="(run, index) in data" :key="index">
          <b-col sm="2">
              <input v-model="data[index].module_name" hidden/>
              <p v-text="data[index].module_name"></p>
          </b-col>
          <b-col sm="10">
            <b-form-group
            label-for="basicInlineCheckboxes"
            :label-cols="3"
            :horizontal="true">
            <b-form-checkbox-group id="basicInlineCheckboxes" v-model="data[index].permission"  name="InlineCheckboxes" >
            <b-row>
              <b-col>
                  <b-form-checkbox value="All"></b-form-checkbox>
              </b-col>
              <b-col>
                <b-form-checkbox value="Read"></b-form-checkbox>  
              </b-col>
              <b-col>
                  <b-form-checkbox value="Edit"></b-form-checkbox>
              </b-col>
              <b-col>
                  <b-form-checkbox value="Delete"></b-form-checkbox>
              </b-col>
              <b-col>
              <b-btn v-text="$ml.get('addmore')"></b-btn>
              </b-col>
              </b-row>
              
            </b-form-checkbox-group>
            
          </b-form-group>
          </b-col>
      </b-row>
            </b-tab>
            
          </b-tabs>
          </b-card>
    
  </div>
  
</template>

<script>
  import ml from '@/ml'
  import apiUrl from '@/apiUrl'
   import Vue from 'vue'
  import {ClientTable, Event} from 'vue-tables-2'
  import axios from 'axios'
  import UserGroups from '@/views/UserGroups'
import { CoolSelect } from 'vue-cool-select'

 Vue.use(ClientTable)
  export default {
    name: 'User Group Edit',
    components: {
      ClientTable,
      Event,
      CoolSelect,
      UserGroups
    },
    data: function () {
      return {
          tabIndex: [0, 0],
      tabs: [
        "Basic Information",
        "Permissions"
      ],
      items : ['Super Admin','Student','Staff','Vendor','Guardian','Guest'],
  input : {
    user_group : "",
    parent_group : ""
  },
      link : "",
      key : "",
        columns: ['user_type','modules'],
        data: [],
        options: {
          headings: {
            user_type : "User Group",
            modules : "Modules"
          },
          sortable: ['user_type','modules'],
          filterable: ['user_type','modules'],
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
     this.link = window.location.href
     this.key = this.link.split("usergroupsdetails/",24).pop()
  console.log(this.key)
    axios.get(`${apiUrl}`+`super/permission/get/${this.key}`,{ withCredentials : true})
    .then(response => {this.data = response.data.modules}).catch(function(error) {
        console.log(error);
    });
 },
 async updated() {
     this.link = window.location.href
     this.key = this.link.split("usergroupsdetails/",24).pop()
    axios.get(`${apiUrl}`+`super/permission/get/${this.key}`,{ withCredentials : true})
    .then(response => {this.data = response.data.modules}).catch(function(error) {
        console.log(error);
    })
 },
  methods : {
    
  }
  };

</script>

<style lang="scss">
 

</style>
