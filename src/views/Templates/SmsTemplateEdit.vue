<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

        <b-row>
            
            <b-col sm="7">
              
              <b-card>
          <div slot="header">
            <strong v-text="$ml.get('sms')"></strong>&nbsp;<span v-text="$ml.get('template')"></span>
          </div>
          <b-form v-on:submit.prevent="sendData">
            
              <b-form-group
            :label="$ml.get('context')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            
              <cool-select
                v-model="input.context"
                :items="contextlist"
                item-text="context_name"
                item-value="_id"
                :value="contextlist[0]"
                :placeholder="$ml.get('pholdcontext')"
               >
              </cool-select>
            
          </b-form-group>
            <b-form-group
              :label="$ml.get('sendername')"
              label-for="horizPass"
              description=""

              :label-cols="3"
              :horizontal="true">
              <b-form-input v-model="input.sendername" id="horizPass" type="text" :placeholder="$ml.get('pholdsendername')" maxlength="6"></b-form-input>
            </b-form-group>
            <b-form-group
              :label="$ml.get('message')"
              label-for="horizPass"
              :label-cols="3"
              :horizontal="true">
            <b-form-textarea v-model="input.message" :placeholder="$ml.get('pholdmessage')" rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>

            <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i>a</b-button>
              
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              




          </div>

          </b-form>
        </b-card>
            </b-col>
            <b-col sm="5">
              <b-card>
                <b-card-body style="padding : 0 1.25rem 0 1.25rem !important;">
                  <v-client-table :columns="columns" :data="data"  :options="options" :theme="theme" id="dataTable"></v-client-table>
                </b-card-body>
      
              </b-card>
            </b-col>
        </b-row>
       </div>     
             

</template>
<script>
import axios from 'axios'
import apiUrl from '@/apiUrl'
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2'
import {CoolSelect} from 'vue-cool-select'

Vue.use(CoolSelect)
  Vue.use(ClientTable)
export default {
    name : 'smstemplate',
    components : {
        CoolSelect,
        ClientTable
    },
    data () {
    return {
         columns: ['name','description'],
        data: [],
        options: {
          headings: {
            name : "Short Code Name",
            description : "Description"
          },
          listColumns : {},
          sortable: ['name','description'],
          filterable: ['name','description'],
          sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default',
      tabIndex: [0, 0],
      tabs: [
        'Sms Form',
        'Key Codes',
      ],
      input: {
          context : "",
          sendername : "",
          message : ""
      },
      contextlist : [],
    }
  },
  async mounted() {
      axios.get(`${apiUrl}`+`context/find`,{withCredentials:true}).then((response) => {
            this.contextlist = response.data;
            this.input.context = this.contextlist[0]._id;
            console.log(response.data)
            axios.get(`${apiUrl}`+`context/find/one/`+`${this.input.context}`,{withCredentials:true}).then((response) => {
              this.data = response.data.short_codes
            })
        })
  },
  watch : {
      'input.context': function() { 
        axios.get(`${apiUrl}`+`context/find/one/`+`${this.input.context}`,{withCredentials:true}).then((response) => {
              this.data = response.data.short_codes
            })
      }
    },
  methods : {
      sendData () {
            axios.put(`${apiUrl}`+`/sms/template/add`,this.input,{withCredentials:true}).then((response) => {
              console.log(response.data);
            });
        },
  }
}
</script>
<style>

.container-fluid {
    width: 100%;
    padding-right: 0px !important;
    padding-left: 0px !important;
    margin-right: 0;
    margin-left: 0;
}
.breadcrumb { 
    margin-bottom: 0;
}
</style>