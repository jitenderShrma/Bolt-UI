<template>
  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong  v-text="$ml.get('add')"></strong>&nbsp;<span  v-text="$ml.get('usergroup')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="sendData">
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
        </b-card>
        </b-col>
    </b-row>
</template>

<script>
import axios from 'axios';
import ml from '@/ml';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr
import Vue from 'vue'
import apiUrl from '@/apiUrl'
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
      items : ['SuperAdmin','Student','Staff','Vendor','Guardian','Guest'],
      input : {
          user_group : "",
          parent_group : "",
        },
    }
  },
  methods : {
    async sendData() {
            axios.post(`${apiUrl}`+`super/group/add`,this.input, {withCredentials : true}).then((response) =>{
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
