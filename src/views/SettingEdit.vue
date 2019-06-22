<template>
    <div>
        <div v-if="key == 'smtp'">
            <b-card>
          <div slot="header">
            <strong v-text="key"></strong>&nbsp;<span v-text="$ml.get('settings')"></span>
          </div>
          <b-form v-on:submit.prevent="sendData(key)">
          <b-form-group
            :label="$ml.get('useremail')"
            label-for="basicEmail"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="smtp.user_email" id="basicEmail" type="email" :placeholder="$ml.get('useremail')" autocomplete="email"></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$ml.get('password')"
            label-for="basicPassword"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="smtp.user_password" id="basicText" type="password" :placeholder="$ml.get('password')"></b-form-input>
          </b-form-group>
          <b-form-group
              :description="$ml.get('pholdconnection')"
            :label="$ml.get('connection')"
            label-for="basicSelect"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="basicSelect"
              :plain="true"
              class="connection"
              v-model="smtp.connection"
              :options="['Please select','Secured', 'Normal']"
              value="Please select">
            </b-form-select>
          </b-form-group>
          <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
        </b-card>
        </div>
        <div v-if="key == 'sms'">
            <b-card>
          <div slot="header">
            <strong v-text="key"></strong>&nbsp;<span v-text="$ml.get('settings')"></span>
          </div>
          <b-form v-on:submit.prevent="sendData(key)">
            <b-form-group
            :label="$ml.get('sendername')"
            label-for="basicEmail"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="sms.sender_name" id="basicEmail" type="text" maxlength="6" :placeholder="$ml.get('pholdsendername')" autocomplete="email"></b-form-input>
          </b-form-group>
          <b-form-group

            :label="$ml.get('authkey')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="sms.api_key" @keyup.native="allLetter" id="basicName" type="password" autocomplete="password" :placeholder="$ml.get('pholdauthkey')" name="fullname"></b-form-input>
          </b-form-group>
          <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
        </b-card>
        </div>
        <div v-if="key == 'sendgrid'">
            <b-card>
          <div slot="header">
            <strong v-text="key"></strong>&nbsp;<span v-text="$ml.get('settings')"></span>
          </div>
          <b-form v-on:submit.prevent="sendData(key)">
          <b-form-group
            :label="$ml.get('authkey')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="sendgrid.api_key" @keyup.native="allLetter" id="basicName" type="password" autocomplete="name" :placeholder="$ml.get('pholdauthkey')"  name="fullname"></b-form-input>
          </b-form-group>
          <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
        </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '@/apiUrl'

export default {
	  name: 'SettingEdit',
  components: {},
  data : function() {
      return { 
          link : "",
          key : "",
          smtp : {
              user_email  : "",
              user_password : "",
              connection : ""
          },
          sms : {
              sender_name : "",
              api_key : ""
          },
          sendgrid : {
              api_key : ""
          }
      }
  },
  mounted () {
      this.link = window.location.href;
      this.key = this.link.split("settings/",24).pop()
      console.log(this.key)
      axios.get(`${apiUrl}`+`super/settings/`+`${this.key}/`+`view`,{withCredentials:true}).then((response)=> {
          console.log(response.data);
          if(this.key == 'smtp') {
              this.smtp = response.data
          }
          if(this.key == 'sms') {
              this.sms = response.data
          }
          if(this.key == 'sendgrid') {
              this.sendgrid = response.data
          }
      })
  },
  methods : {
      sendData (val) {
          if(val == 'smtp') {
            axios.put(`${apiUrl}`+`super/settings/`+`${val}/`+`update`, this.smtp,{withCredentials:true}).then((response) => {
                console.log(response.data)
            }) 
          }
          if(val == 'sms') {
            axios.put(`${apiUrl}`+`super/settings/`+`${val}/`+`update`, this.sms,{withCredentials:true}).then((response) => {
                console.log(response.data)
            }) 
          }
          if(val == 'sendgrid') {
            axios.put(`${apiUrl}`+`super/settings/`+`${val}/`+`update`, this.sendgrid,{withCredentials:true}).then((response) => {
                console.log(response.data)
            }) 
          }
      }
  }
}
</script>