<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <b-row>
    <b-col sm="4" v-for="(run,i) in data" :key="i">
    <b-card no-body style="padding:0 !important" :class="data[i].plugin_color">
      <b-card-header>
        <h5 v-text="data[i].plugin_name"></h5>
        <b-dropdown class="float-right" variant="transparent" style="margin:-20px;" right>
              <template slot="button-content">
                <i class="icon-settings" ></i>
              </template>
              <b-dropdown-item @click="install(data[i].plugin_name)"><span v-text="$ml.get('install')"></span></b-dropdown-item>
            </b-dropdown>
      </b-card-header>
      <b-card-body style="padding:1.25rem">
      
        <center><i :class="data[i].icon_class"></i>
        <p v-text="data[i].plugin_description">
        </p></center>
        
      </b-card-body>
    </b-card>
    </b-col>
    </b-row>
    <b-modal  class="modal-primary" v-model="primaryModal" @ok="primaryModal = false" hide-footer>
            <div class="modal-title">
                <strong><center v-text="$ml.get('installing')"></center></strong>
            </div>
            <div class="sk-fading-circle">
              <div class="sk-circle1 sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
        
     </b-modal>
    </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr
var api = axios.create({
  withCredentials :true
})
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
    name: 'Plugin',
    data : function () {
        return {
            data : [
                
            ],
            communication : {
              module_name : ""
            },
            primaryModal :false,
        }
    },
    async mounted() {
    axios.get(`${apiUrl}`+`super/plugin/see`,{ withCredentials:true })
    .then(
      response => {this.data = response.data
      console.log(this.data)
      })
    },
    
    methods : {
        async install (val) {
            this.communication.module_name = val
             api.post(`${apiUrl}`+`super/com/install`,this.communication).then((response) => {
                console.log(response.data)
                if(response.data.code == 11000) {
                    toast({
                    type: VueNotifications.types.error,
                    title: 'Already Installed',
                    message: 'You have Already Installed this Plugin'
                    })
                }
                    else {
                      this.primaryModal = true
                        setTimeout(() => {
                        toast({
                            type: VueNotifications.types.success,
                            title: 'Plugin Succesfully Installed',
                            message: 'You can configure the plugin the settings panel'
                            })
                        this.primaryModal = false
                        }, 2000);
                       api.post(`${apiUrl}`+`super/settings/`+`${val}/`+`add`).then((response) => {
                        console.log(response)
                      })
                    }
            }).catch(function(error) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!..',
                    message: 'An Error has Occured'
                    })
            })
            
        },

    }
}
</script>

<style src="spinkit/scss/spinkit.scss" lang="scss" />

<style scoped>
  .sk-fading-circle .sk-circle {
    margin: 0 auto;
  }
  .sk-three-bounce {
    height: 40px;
  }
</style>
