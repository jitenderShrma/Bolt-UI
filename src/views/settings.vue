<template>
	<b-card>
          <div slot="header">
            <p v-text="$ml.get('settings')"></p>
          </div>
         
          <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
            <b-tab active>
              <template slot="title">
                <i class="icon-envelope "></i> {{tabs[0]}}
              </template>
              
                <div v-for="(run,i) in data" :key="i">
                  <b-row>
              	<b-col sm="5">

              		

              	<p v-text="data[i].module_name"></p></b-col>
              	<b-col sm="3">
              		<c-switch class="mx-1" color="success" v-model="data[i].in_use" label />
              	</b-col>
                <b-col sm="3">
              		<b-btn @click="settingRoute(data[i].module_name)"><i class="icon-settings"></i></b-btn>
              	</b-col>
                </b-row>
                <hr>
                </div> 
          		
          		
          		
             
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
    data:[
  

    ],
    switch : {
      smtp : false,
      sms : false,
      sendgrid : false
    },
      tabIndex: [0, 0,0,0],
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
  	axios.get(`${apiUrl}`+`super/com/view`,{withCredentials :true}).then((response) =>{
      this.data = response.data
      console.log(response.data);
  	});
  },
  methods : {
    settingRoute(val) {
      this.$router.push(`/settings/${val}`);
    }
  }
}
</script>