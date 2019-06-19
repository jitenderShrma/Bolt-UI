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
              <c-switch class="mx-1" color="success" checked label /></b-col>
          		</b-row>
          		<b-row>
          		<b-col sm="2">
          		<p>SMS</p></b-col>
          		<b-col sm="7">
              <c-switch class="mx-1" color="success" checked label /></b-col>
          		</b-row>
          		<b-row>
          			<b-col sm="2">	
          		<p>SEND GRID</p></b-col>
          		<b-col sm="7">
              <c-switch class="mx-1" color="success" label /></b-col>
          		</b-row>
             
            </b-tab>
 
          </b-tabs>
     
        </b-card>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'

export default {
	  name: 'switches',
  components: {
    cSwitch
  },
  name: 'tabs',
  data () {
    return {
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

  }
}
</script>