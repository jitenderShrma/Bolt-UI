<template>
	<b-card>
          <div slot="header">
            SETTINGS
          </div>
         
          <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
            <b-tab active>
              <template slot="title">
                <i class="icon-envelope "></i> {{tabs[0]}}
              </template>
              <b-row>
              	<b-col sm="2">

              		

              	<p>SMTP</p></b-col>
              	<b-col sm="7">
              		<c-switch class="mx-1" color="success" v-model="smtp" label />
              	</b-col> 
          		</b-row>
          		<b-row>
          		<b-col sm="2">
          		<p>SMS</p></b-col>
          		<b-col sm="7">
              	<c-switch class="mx-1" color="success" v-model="sms" label /></b-col>
          		</b-row>
          		<b-row>
          			<b-col sm="2">	
          		<p>SEND GRID</p></b-col>
          		<b-col sm="7">
              <c-switch class="mx-1" color="success" v-model="sendgrid" label /></b-col>
          		</b-row>
             
            </b-tab>
 
          </b-tabs>
     
        </b-card>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'

export default {
	  name: 'settings',
  components: {
    cSwitch
  },
  data: function() {
    return {
    data:{
  

    },
    smtp: false,
    sms:false,
    sendgrid:false,	
      tabIndex: [0, 0],
      tabs: [
        'Communications',
      ],
      labelIcon: {
        dataOn: '\u2713',
        dataOff: '\u2715'
      },
      labelTxt: {
        dataOn: 'yes',
        dataOff: 'no'
      }
    }

  },
   async mounted (){
  	axios.get(`${apiUrl}`+`super/get/settings`,{withCredentials :true}).then((response) =>{
  		this.smtp = response.data[0].smtp;
  		this.sms = response.data[0].sms;
  		this.sendgrid = response.data[0].sendgrid;
  		

  	});
  }
}
</script>