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
            <b-tab>
              <template slot="title">
                <i class="icon-envelope "></i> {{tabs[1]}}
              </template>
                <b-row class="justify-content-center">

              <b-form style="width:50%" v-on:submit.prevent="sendData">
              <b-col sm="15">
                <ejs-dropdownlist  floatLabelType="Auto" v-model="input.fin_year_start_month"   :allowFiltering="true" id='department' :dataSource='month'  :fields='month_fields'  popupHeight='300' :placeholder="$ml.get('pholdfysm')"></ejs-dropdownlist>
              </b-col>
              <br>
              <!-- <b-col sm="15">
              <ejs-textbox v-model="input.fin_year" floatLabelType="Auto" :placeholder="$ml.get('pholdfy')"></ejs-textbox>
            </b-col> -->
            <br>
            <b-col sm="15">
              <span id="contentText" style="font-size:18px" >Budget Management
            <ejs-dropdownlist id='employee' :dataSource='options' :popupHeight='height' :width='width' cssClass='inlinecss' :popupWidth='popupWidth' value='Monthly' :placeholder="$ml.get('pholdimport')">
            </ejs-dropdownlist></span>
          </b-col>
          <br>
          <b-col sm="15">
              <ejs-textbox v-model="input.auto_cancel_time" floatLabelType="Auto" :placeholder="$ml.get('pholdautorejection')"></ejs-textbox>
            </b-col>
          <br>
            <b-form-group
            :label="$ml.get('level1approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-form-group>
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel1" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel1">
            <b-form-group>
            <ejs-dropdownlist v-model="input.level1.designation" :dataSource='designations' :fields='desig_fields' :allowFiltering="true" :groupTemplate="groupTemplate" popupHeight='300' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level1.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level1.alert_time" floatLabelType="Auto" :placeholder="$ml.get('alerttime')"></ejs-textbox>
            </b-form-group>
          </div>
          </b-form-group>
          <div v-if="isLevel1">
            <b-form-group
            :label="$ml.get('level2approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-form-group>
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel2" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel2">
            <b-form-group>
            <ejs-dropdownlist v-model="input.level2.designation" :dataSource='designations' :fields='desig_fields' :allowFiltering="true" :groupTemplate="groupTemplate" popupHeight='300' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level2.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level2.alert_time" floatLabelType="Auto" :placeholder="$ml.get('alerttime')"></ejs-textbox>
            </b-form-group>
          </div>
        </b-form-group>
          </div>
          <div v-if='isLevel1 && isLevel2'>
            <b-form-group
            :label="$ml.get('level3approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-form-group>
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel3" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel3">
            <b-form-group>
            <ejs-dropdownlist v-model="input.level3.designation" :dataSource='designations' :fields='desig_fields' :allowFiltering="true" :groupTemplate="groupTemplate" popupHeight='300' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level3.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level3.alert_time" floatLabelType="Auto" :placeholder="$ml.get('alerttime')"></ejs-textbox>
            </b-form-group>
          </div>
        </b-form-group>
            </div>
            <div v-if='isLevel1 && isLevel2 && isLevel3'>
            <b-form-group
            :label="$ml.get('level4approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-form-group>
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel4" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel4">
            <b-form-group>
            <ejs-dropdownlist v-model="input.level4.designation" :dataSource='designations' :fields='desig_fields' :allowFiltering="true" :groupTemplate="groupTemplate" popupHeight='300' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level4.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level4.alert_time" floatLabelType="Auto" :placeholder="$ml.get('alerttime')"></ejs-textbox>
            </b-form-group>
          </div>
        </b-form-group>
            </div>
            <div v-if='isLevel1 && isLevel2 && isLevel3 && isLevel4'>
            <b-form-group
            :label="$ml.get('level5approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-form-group>
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel5" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel5">
            <b-form-group>
            <ejs-dropdownlist v-model="input.level5.designation" :dataSource='designations' :fields='desig_fields' :allowFiltering="true" :groupTemplate="groupTemplate" popupHeight='300' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level5.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
            </b-form-group>
            <b-form-group>
            <ejs-textbox v-model="input.level5.alert_time" floatLabelType="Auto" :placeholder="$ml.get('alerttime')"></ejs-textbox>
            </b-form-group>
          </div>
        </b-form-group>
            </div>
          
          <div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
              </b-form>
              </b-row>
            </b-tab>
          
          </b-tabs>
     
        </b-card>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import Vue from 'vue'
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
Vue.use(MultiSelectPlugin);
Vue.use(TextBoxPlugin);

var api = axios.create({
  withCredentials:true
});

var d = new Date();
var groupVue = Vue.component("groupTemplate", {
    template: `<strong>{{val1}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    mounted() {
      api.get(`${apiUrl}`+`designation/desig/get/one/`+`${this.data.parent_designation_id}`).then((res) => {
        console.log(res.data)
        this.val1 = res.data.name
      });
    }
  });

export default {
	  name: 'settings',
  components: {
    cSwitch
  },
  data: function() {
    return {
      height: '220px',
            width: '80px',
            popupWidth: '140px',
    data:[
    ],
    desig_fields:{groupBy:'parent_designation_id',text:"name",value:"_id"},
    input:{
      fin_year:d.getFullYear(),
      level1:{
        designation:null,
        alert_time:null,
        amount:null,
      },
      level2:{
        designation:null,
        alert_time:null,
        amount:null,
      },
      level3:{
        designation:null,
        alert_time:null,
        amount:null,
      },
      level4:{
        designation:null,
        alert_time:null,
        amount:null,
      },
      level5:{
        designation:null,
        alert_time:null,
        amount:null,
      }
    },
    options:[
      "Monthly",
      "Quarterly"
    ],
    designations:[],
    groupTemplate: function () {
              return {
                  template: groupVue
              }
          },
    isLevel1:false,
    isLevel2:false,
    isLevel3:false,
    isLevel4:false,
    isLevel5:false,
    month:[
      {name:"January",value:"Jan"},
      {name:"February",value:"Feb"},
      {name:"March",value:"Mar"},
      {name:"April",value:"Apr"},
      {name:"May",value:"May"},
      {name:"June",value:"Jun"},
      {name:"July",value:"Jul"},
      {name:"August",value:"Aug"},
      {name:"September",value:"Sept"},
      {name:"October",value:"Oct"},
      {name:"November",value:"Nov"},
      {name:"December",value:"Dec"},
    ],
    month_fields:{text:"name",value:"value"},
    switch : {
      smtp : false,
      sms : false,
      sendgrid : false
    },
      tabIndex: [0, 0,0,0],
      tabs: [
        'Communications',
        'Budget Settings'
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
    api.get(`${apiUrl}`+`designation/desig/get/all`).then((response) =>{
      this.designations = response.data
    });
  	api.get(`${apiUrl}`+`super/com/view`).then((response) =>{
      this.data = response.data
      console.log(response.data);
  	});
  },
  watch:{
    'isLevel1' : function() {

    }
  },
  methods : {
    settingRoute(val) {
      this.$router.push(`/settings/${val}`);
    }
  }
};
</script>
<style>
.inlinecss.e-ddl .e-input-group-icon.e-ddl-icon {
        display: none;
    }

    .inlinecss.e-ddl .e-control.e-dropdownlist.e-input {
        font-size: 17px;
        font-weight: 500;
        margin: -5px 0px 0px 0px;
        padding: 0px;
    }

    .material .inlinecss.e-ddl .e-control.e-dropdownlist.e-input {
        margin: 4px 0px 0px 0px;
    }

    .bootstrap .inlinecss.e-ddl .e-control.e-dropdownlist.e-input {
        margin-top: -1px;
    }

    #contentText .e-input-group.e-control-wrapper.e-ddl::before,
    #contentText .e-input-group.e-control-wrapper.e-ddl::after {
        content: none;
    }

    #contentText .e-input-group.e-control-wrapper.e-ddl,
    #contentText .e-input-group.e-control-wrapper.e-ddl:hover,
    #contentText .e-input-group.e-ddl.e-input-focus,
    #contentText .e-input-group.e-ddl.e-input-focus::before,
    #contentText .e-input-group.e-ddl.e-input-focus::after {
        border-width: 0px;
        border: none;
        border-bottom: 1px dashed black;
        box-shadow: none;
    }
</style>