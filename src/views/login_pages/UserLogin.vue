<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

  <div class="app flex-row align-items-center">
    <div class="container">
        
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                  <AppHeaderDropdown style="list-style:none !important;">
                    <template slot="header">
                    <i class="fa fa-language fa-lg "></i>
                    
                    </template>
                    <template slot="dropdown">
                    <div class="dropdown-menu-lg">
                        <b-dropdown-item v-for="lang in $ml.list"
                        :key="lang">
                        <div class="message">
                            <div class="text-truncate font-weight-bold" @click="$ml.change(lang)" v-text="lang"></div>
                        </div>
                        </b-dropdown-item>
                    </div>
                    </template>
                </AppHeaderDropdown>
                <b-form action="dashboard" v-on:submit.prevent="sendData">
                  <h1 v-text="$ml.get('login')"></h1>
                  <p class="text-muted" v-text="$ml.get('signin')"></p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="login_details.user_name" type="text" class="form-control" :placeholder="$ml.get('username')" autocomplete="username email" required/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="login_details.password" type="password" class="form-control" :placeholder="$ml.get('password')" autocomplete="current-password" required/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                            <b-button type="submit" variant="primary" class="px-4" v-text="$ml.get('login')"></b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" v-text="$ml.get('forgotpassword')"></b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
              <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
            
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import ml from '@/ml.js';
import apiUrl from '@/apiUrl';
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import Vue from 'vue'
import Auth from '@/Auth'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

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

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
//  VueNotifications.setPluginOptions(options)

Vue.use(VueNotifications, options)

export default {
  name: 'UserLogin',
  components : {
    AppHeaderDropdown
  },
  data: function () {
      return {
      login_details : {
          user_name : "", 
          password : ""
      },
      response : [],
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello there',
      message: 'That\'s the success!'
    },
    showInfoMsg: {
      type: VueNotifications.types.info,
      title: 'Hey you',
      message: 'Here is some info for you'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: 'Wow, man',
      message: 'That\'s the kind of warning'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: 'That\'s the error'
    }
  },
  methods : {
      async sendData() {
            axios.post(`${apiUrl}`+`user/subuser/login`,this.login_details, {withCredentials : true}).then((response) =>{
              console.log(response.data)
              this.$session.set('Subuser',response.data.user)
              this.$router.push(this.$route.query.redirect || '/dashboard')
            })
            .catch(function(error) {
              console.log(error)
                toast({
                    type: VueNotifications.types.error,
                    title: 'Login Error',
                    message: 'Wrong Username or Password'
                    })
            });
      },
  }
}
</script>
