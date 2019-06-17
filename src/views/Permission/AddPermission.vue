<template>
  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Add</strong> Permission
          </div>
          <b-form action="UserList" v-on:submit.prevent="sendData">
            <b-form-group
            description="Name of Module"
            label="Name of Module"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.module_name" type="text" autocomplete="user_name" placeholder="Enter the name of the module" ></b-form-input>
          </b-form-group>
          <b-form-group
            description="Name of Module"
            label="Name of Module"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.module_name" type="text" autocomplete="user_name" placeholder="Enter the name of the module" ></b-form-input>
          </b-form-group>
          <b-form-group
            description="Permissions"
            label="Permissions"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-checkbox-group  id="basicInlineCustomCheckboxes">
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" v-model="permis[0]" class="custom-control-input" id="customInChk1" value="All">
                <label class="custom-control-label" for="customInChk1">All</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" v-model="permis[1]" class="custom-control-input" id="customInChk2" value="ReadAndEdit">
                <label class="custom-control-label" for="customInChk2">Read And Edit</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" v-model="permis[2]" class="custom-control-input" id="customInChk3" value="ReadOnly">
                <label class="custom-control-label" for="customInChk3">Read Only</label>
              </div>
            </b-form-checkbox-group>
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
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr
import Vue from 'vue'
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({types: toastTypes})

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}
import { CoolSelect } from 'vue-cool-select'

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
//  VueNotifications.setPluginOptions(options)

Vue.use(VueNotifications, options)


export default {
  name: 'Add Permission',
  components : {
    CoolSelect
  },
  data: function () {
    return {
        items : ['Super Admin','Student','Staff','Vendor','Guardian','Guest'],
      selected: 'Month',
      posts: [],
      resp: [],
      errors: [],
      permis : [],
      input : {
          user_type : "",
          modules : [this.module],
          
        },
        module : {
            module_name : "",
          permission : "",  
        }
    }
  },
  mounted()  {

  var link = window.location.href
  var key = link.split("add/",24).pop()
  console.log(key)
  },
  methods : {
    async sendData() {
            if(this.permis[0]== true) {
                this.input.permission = "All"
            }
            if(this.permis[1] == true) {
                this.input.permission = "ReadAndEdit"
            }
            if(this.permis[2] == true) {
                this.input.permission = "ReadOnly"
            }
            axios.post(`http://127.0.0.1:3000/api/super/permission/add`,this.input, {withCredentials : true}).then((response) =>{
              console.log(this.input);

            //   if(response.data.limit == "exceeded") {
            //     toast({
            //         type: VueNotifications.types.warn,
            //         title: 'Limit Exceeded',
            //         message: 'Please Upgrade your License.'
            //         })
            //   }
            //   else if(response.data.auth == false) {
            //     toast({
            //         type: VueNotifications.types.error,
            //         title: 'User Unauthenticated',
            //         message: 'Please Login.'
            //         })
            //       console.log(response)
            //   }
            //   else {
            //     this.$router.push("/user");
            //   }
            console.log(response)
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
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
