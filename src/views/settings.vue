<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

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
                <b-row style="margin:20px 0 20px 0">

              <b-form style="width:90%" v-on:submit.prevent="sendData">
              <b-col sm="15">
                <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="input.fin_year_start_month" :allowFiltering="true" id='department' :dataSource='month'  :fields='month_fields'  popupHeight='300' :placeholder="$ml.get('pholdfysm')"></ejs-dropdownlist>
              </b-col>
              <br>
              <!-- <b-col sm="15">
              <ejs-textbox v-model="input.fin_year" floatLabelType="Auto" :placeholder="$ml.get('pholdfy')"></ejs-textbox>
            </b-col> -->
            <br>
            <b-col sm="15">
              <span id="contentText" style="font-size:18px" >Budget Management
            <ejs-dropdownlist :showClearButton="true" id='employee' :dataSource='options' :popupHeight='height' :width='width' cssClass='inlinecss' :popupWidth='popupWidth' value='Monthly' :placeholder="$ml.get('pholdimport')">
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
            <b-form-group :visible="false">
            
            <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLevel1" :uncheckedValue="false" :checkedValue="true"/>
            </b-form-group>
          <div v-if="isLevel1">
            <b-form-group>
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbydesig')"></label>
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isDesig1" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isDesig1">
                  <br>
                <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddesig')" v-model="input.level1.designation" :multiple="false" :options="designations"/>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group v-if="false">
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbylabel')"></label> &nbsp;&nbsp;&nbsp;
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLabel1" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isLabel1">
                  <br>
            <ejs-dropdownlist :showClearButton="true" :enabled="islabel" v-model="input.level1.designation_label" :dataSource='label1' :fields='label_fields' :allowFiltering="true" popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group>
            <ejs-textbox @change="validateAmount(`${input.level1.amount}`,1,isLevel1)" v-model="input.level1.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
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
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbydesig')"></label>
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isDesig2" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isDesig2">
                  <br>
                  <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddesig')" v-model="input.level2.designation" :multiple="false" :options="designations" />
                </b-col>
            </b-row>
            </b-form-group>
            <b-form-group v-if="false">
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbylabel')"></label> &nbsp;&nbsp;&nbsp;
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLabel2" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isLabel2">
                  <br>
            <ejs-dropdownlist :showClearButton="true" :enabled="islabel" v-model="input.level2.designation_label" :dataSource='label1' :fields='label_fields' :allowFiltering="true" popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group>
            <ejs-textbox @change="validateAmount(`${input.level2.amount}`,2)" v-model="input.level2.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
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
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbydesig')"></label>
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isDesig3" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isDesig3">
                  <br>
                  <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddesig')" v-model="input.level3.designation" :multiple="false" :options="designations"/>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group v-if="false">
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbylabel')"></label> &nbsp;&nbsp;&nbsp;
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLabel3" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isLabel3">
                  <br>
            
              <ejs-dropdownlist :showClearButton="true" :enabled="islabel" v-model="input.level3.designation_label" :dataSource='label1' :fields='label_fields' :allowFiltering="true" popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>

          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group>
            <ejs-textbox @change="validateAmount(`${input.level3.amount}`,3)" v-model="input.level3.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
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
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbydesig')"></label>
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isDesig4" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isDesig4">
                  <br>
            <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddesig')" v-model="input.level4.designation" :multiple="false" :options="designations"/>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group v-if="false">
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbylabel')"></label> &nbsp;&nbsp;&nbsp;
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLabel4" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isLabel4">
                  <br>
            <ejs-dropdownlist :showClearButton="true" :enabled="islabel" v-model="input.level4.designation_label" :dataSource='label1' :fields='label_fields' :allowFiltering="true" popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group>
            <ejs-textbox @change="validateAmount(`${input.level4.amount}`,4)" v-model="input.level4.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
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
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbydesig')"></label>
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isDesig5" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isDesig5">
                  <br>
            <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddesig')" v-model="input.level5.designation" :multiple="false" :options="designations"/>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group v-if="false">
              <b-row>
                <b-col sm="4">
                  <label v-text="$ml.get('approvedbylabel')"></label> &nbsp;&nbsp;&nbsp;
                  <c-switch style="margin-top:5px;" class="mx-1" color="primary" unchecked name="switch1" v-model="isLabel5" :uncheckedValue="false" :checkedValue="true"/>
                </b-col>
                <b-col sm="8" v-if="isLabel5">
                  <br>
            <ejs-dropdownlist :showClearButton="true" :enabled="islabel" v-model="input.level5.designation_label" :dataSource='label1' :fields='label_fields' :allowFiltering="true" popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>
          </b-col>
        </b-row>
            </b-form-group>
            <b-form-group>
            <ejs-textbox @change="validateAmount(`${input.level5.amount}`,5)" v-model="input.level5.amount" type="number" floatLabelType="Auto" :placeholder="$ml.get('threshholdamount')"></ejs-textbox>
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
      </div>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import Vue from 'vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueNotifications from 'vue-notifications'
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import miniToastr from 'mini-toastr' 
import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
Vue.use(MultiSelectPlugin);
Vue.use(TextBoxPlugin);
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
Vue.use(VueNotifications, options)
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

var api = axios.create({
  withCredentials:true
});
var designation = []
var d = new Date();
var groupVue = Vue.component("groupTemplate", {
    template: `<strong>{{data.parent_designation_id}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    async mounted() {
      if(this.data.parent_designation_id!=null) {
      await api.get(`${apiUrl}`+`designation/desig/get/one/`+`${this.data.parent_designation_id}`).then((res) => {
        console.log(res.data)
        this.data.parent_designation_id = res.data.name
        designation.push(this.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
    }
    }
  });

export default {
	  name: 'settings',
  components: {
    cSwitch,
    Treeselect
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
    islabel:true,
    label1:null,
    options:[
      "Monthly",
      "Quarterly"
    ],
    clicked:false,
    clicked1:false,
    clicked2:false,
    clicked3:false,
    clicked4:false,
    designations:[{
      id:"LM1",
      label:"Line Manager 1"
    },{
      id:"LM2",
      label:"Line Manager 2"
    },{
      id:"LM3",
      label:"Line Manager 3"
    },{
      id:"LM4",
      label:"Line Manager 4"
    },{
      id:"LM5",
      label:"Line Manager 5"
    }],
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
    label_fields:{text:"label_name",value:"_id"},
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
      },
      or_desig:[],
      isDesig1:false,
      isDesig2:false,
      isDesig3:false,
      isDesig4:false,
      isDesig5:false,
      isLabel1:false,
      isLabel2:false,
      isLabel3:false,
      isLabel4:false,
      isLabel5:false,
      desig:[]
    }

  },
   async mounted (){
    api.get(`${apiUrl}`+`label/label/find/by/Designations`).then((res) => {
      this.label1 = res.data
    }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
    api.get(`${apiUrl}`+`designation/desig/get/all`).then((response) =>{
        this.or_desig = JSON.parse(JSON.stringify(response.data))
        this.desig=this.list_to_tree_desig(response.data)
        for(var i=0;i<this.desig.length;i++) {
          this.designations.push(this.desig[i])
        }
    }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
  	api.get(`${apiUrl}`+`super/com/view`).then((response) =>{
      this.data = response.data
      console.log(response.data);
  	}).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
    api.get(`${apiUrl}/super/settings/budget/budSet/get`,{withCredentials:true}).then((res) => {
      this.input = res.data
      if(this.input.level1.designation) {
        this.isLevel1 = true
        this.isDesig1 = true 
      }
      if(this.input.level2.designation) {
        this.isLevel2 = true
        this.isDesig2 = true 
      }
      if(this.input.level3.designation) {
        this.isLevel3 = true
        this.isDesig3 = true 
      }
      if(this.input.level4.designation) {
        this.isLevel4 = true
        this.isDesig4 = true 
      }
      if(this.input.level5.designation) {
        this.isLevel5 = true
        this.isDesig5 = true 
      }
      if(this.input.level1.designation_label) {
        this.isLevel1 = true
        this.isLabel1 = true 
      }
      if(this.input.level2.designation_label) {
        this.isLevel1 = true
        this.isLabel2 = true 
      }
      if(this.input.level3.designation_label) {
        this.isLevel1 = true
        this.isLabel3 = true 
      }
      if(this.input.level4.designation_label) {
        this.isLevel1 = true
        this.isLabel4 = true 
      }
      if(this.input.level5.designation_label) {
        this.isLevel1 = true
        this.isLabel5 = true 
      }
      console.log(res.data)
    }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
  },
  watch:{
    'isDesig1' : function(args) {
      if(args) {
        this.isLabel1 = false
      }
    },
    'isDesig2' : function(args) {
      if(args) {
        this.isLabel2 = false
      }
    },
    'isDesig3' : function(args) {
      if(args) {
        this.isLabel3 = false
      }
    },
    'isDesig4' : function(args) {
      if(args) {
        this.isLabel4 = false
      }
    },
    'isDesig5' : function(args) {
      if(args) {
        this.isLabel5 = false
      }
    },
    'isLabel1' : function(args) {
      if(args) {
        this.isDesig1 = false
      }
    },
    'isLabel2' : function(args) {
      if(args) {
        this.isDesig2 = false
      }
    },
    'isLabel3' : function(args) {
      if(args) {
        this.isDesig3 = false
      }
    },
    'isLabel4' : function(args) {
      if(args) {
        this.isDesig4 = false
      }
    },
    'isLabel5' : function(args) {
      if(args) {
        this.isDesig5 = false
      }
    }
  },
  methods : {
    list_to_tree_desig(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_designation_id != undefined && this.checkExistDesig(node.parent_designation_id)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_designation_id]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDesig(roots)
          return roots
      },
      checkExistDesig(node) {
        for (var i=0; i < this.or_desig.length; i++) {
            if (this.or_desig[i]._id == node)
                return true;
        }
        return false;
      },
      convertDataDesig(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDesig(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].name;
        delete roots[i]._id;
        delete roots[i].name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
    validateAmount(args,i,check) {
          if(i == 1) {
            if(args<=0 && this.input.level1.designation != null && args != "") {
              this.input.level1.amount = 1
            }
          }
          else if(i == 2){
            if(args<=0 && this.input.level2.designation != null && args != "") {
              this.input.level2.amount = 1
            }

          }else if(i == 3){
            if(args<=0 && this.input.level3.designation != null && args != "") {
              this.input.level3.amount = 1
            }

          }else if(i == 4){
            if(args<=0 && this.input.level4.designation != null && args != "") {
              this.input.level4.amount = 1
            }

          }else if(i == 5){
            if(args<=0 && this.input.level5.designation != null && args != "") {
              this.input.level5.amount = 1
            }

          }
        },
    settingRoute(val) {
      this.$router.push(`/settings/${val}`);
    },
    async sendData() {
      if(!this.isLevel1) {
        this.input.level1.designation = undefined
        this.input.level1.designation_label = undefined
        this.input.level1.amount = 0
        this.input.level2.designation = undefined
        this.input.level2.designation_label = undefined
        this.input.level2.amount = 0
        this.input.level3.designation = undefined
        this.input.level3.designation_label = undefined
        this.input.level3.amount = 0
        this.input.level4.designation = undefined
        this.input.level4.designation_label = undefined
        this.input.level4.amount = 0
        this.input.level5.designation = undefined
        this.input.level5.designation_label = undefined
        this.input.level5.amount = 0
      }
      if(!this.isLevel2) {
        this.input.level2.designation = undefined
        this.input.level2.designation_label = undefined
        this.input.level2.amount = 0
        this.input.level3.designation = undefined
        this.input.level3.designation_label = undefined
        this.input.level3.amount = 0
        this.input.level4.designation = undefined
        this.input.level4.designation_label = undefined
        this.input.level4.amount = 0
        this.input.level5.designation = undefined
        this.input.level5.designation_label = undefined
        this.input.level5.amount = 0
      }
      if(!this.isLevel3) {
        this.input.level3.designation = undefined
        this.input.level3.designation_label = undefined
        this.input.level3.amount = 0
        this.input.level4.designation = undefined
        this.input.level4.designation_label = undefined
        this.input.level4.amount = 0
        this.input.level5.designation = undefined
        this.input.level5.designation_label = undefined
        this.input.level5.amount = 0
      }
      if(!this.isLevel4) {
        this.input.level4.designation = undefined
        this.input.level4.designation_label = undefined
        this.input.level4.amount = 0
        this.input.level5.designation = undefined
        this.input.level5.designation_label = undefined
        this.input.level5.amount = 0
      }
      if(!this.isLevel5) {
        this.input.level5.designation = undefined
        this.input.level5.designation_label = undefined
        this.input.level5.amount = 0
      }
      await api.put(`${apiUrl}`+`super/settings/budget/budSet/update`,this.input).then((res)=> {
        if(res.data!=null) {
          toast({
            type: VueNotifications.types.success,
            title: 'Settings Saved',
            message: 'Budget Settings are Updated'
          })
        }
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })

    },
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