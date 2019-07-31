<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong v-text="$ml.get('add')"></strong>&nbsp;<span v-text="$ml.get('user')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="sendData">
          <b-form-group
            :label="$ml.get('useraccountdetails')"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="User Name" v-model="input.user_name" floatLabelType="Auto" :placeholder="$ml.get('username')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-dropdownlist :showClearButton="true" name="User Type" v-validate="'required'" floatLabelType="Auto" v-model="input.onType" :allowFiltering="true" :dataSource='items' popupHeight='300' :placeholder="$ml.get('placeholderusertype')"></ejs-dropdownlist>
            <span id="errors">{{ errors.first('User Type') }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="Password" v-validate="'required'" type="password" v-model="input.password" floatLabelType="Auto" :placeholder="$ml.get('password')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-dropdownlist :showClearButton="true" :enabled="!isStaff" name="User Group" floatLabelType="Auto" v-model="input.user_group" :allowFiltering="true" :dataSource='user_groups' popupHeight='300' :placeholder="$ml.get('pholdusergroup')"></ejs-dropdownlist>
          </b-col>
        </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('personaldetails')"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="Name" v-model="input.name" floatLabelType="Auto" :placeholder="$ml.get('pholdname')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <label for="street" v-text="$ml.get('profilepic')"></label>
            <b-form-file v-model="input.profile_picture" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <ejs-textbox v-model="input.mothers_name" floatLabelType="Auto" :placeholder="$ml.get('fathersname')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <ejs-textbox v-model="input.fathers_name" floatLabelType="Auto" :placeholder="$ml.get('mothersname')"></ejs-textbox>
          </b-col>
        </b-row>
        <b-row>
              <b-col sm="4">
                <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="input.blood_group" :allowFiltering="true" :dataSource='bloodgroup' popupHeight='300' :placeholder="$ml.get('bloodgroup')"></ejs-dropdownlist>
              </b-col>
              <b-col sm="4">
                <br>
                <b-button type="button" size="sm" variant="primary" @click="idmodal = true"  class="mr-1" v-text="$ml.get('addidentifications')"></b-button>
              </b-col>
              <b-col v-if="input.identification.length!=0" sm="2">
                <br>
                <div v-for="(run,index) in input.identification" :key="index">
                <div class="e-input-group">
                    <input class="e-input" type="text" :value="input.identification[index].id_type" readonly="">
                </div>
              </div>
              </b-col>
              <b-col v-if="input.identification.length!=0" sm="2">
                <br>
                <b-button type="button" size="sm" variant="danger" @click="deleteId"  class="mr-1"><i class="fa fa-trash-o"></i></b-button>
              </b-col>
            </b-row>
        <b-row>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="Email" type="email" v-model="input.email" floatLabelType="Auto" :placeholder="$ml.get('email')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required type="number" v-model="addresslist.phone" floatLabelType="Auto" :placeholder="$ml.get('phone')"></ejs-textbox>
          </b-col>
        </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('address')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <ejs-textbox v-model="addresslist.compAdd" floatLabelType="Auto" :placeholder="$ml.get('addressline1')"></ejs-textbox>
            <b-row>
            <b-col sm="4">
            <ejs-textbox v-model="addresslist.state" floatLabelType="Auto" :placeholder="$ml.get('state')"></ejs-textbox>
          </b-col>
          <b-col sm="4">
            <ejs-textbox v-model="addresslist.zip" floatLabelType="Auto" :placeholder="$ml.get('postalcode')"></ejs-textbox>
          </b-col>
          <b-col sm="4">
            <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="addresslist.country" :allowFiltering="true" :fields="country_fields" :dataSource='countrylist' popupHeight='200' :placeholder="$ml.get('country')"></ejs-dropdownlist>
          </b-col>
          </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('bankaccountdetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <ejs-textbox v-model="input.account_holder_name" floatLabelType="Auto" :placeholder="$ml.get('accountholdername')"></ejs-textbox>
              </b-col>
              <b-col sm="6">
                <ejs-textbox type="number" v-model="input.account_number" floatLabelType="Auto" :placeholder="$ml.get('accountno')"></ejs-textbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <ejs-textbox v-model="input.bank_name" floatLabelType="Auto" :placeholder="$ml.get('bankname')"></ejs-textbox>
              </b-col>
              <b-col sm="4">
                <ejs-textbox v-model="input.branch" floatLabelType="Auto" :placeholder="$ml.get('branch')"></ejs-textbox>
              </b-col>
              <b-col sm="4">
                <ejs-textbox v-model="input.ifsc_code" floatLabelType="Auto" :placeholder="$ml.get('ifsc')"></ejs-textbox>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('pandetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
              <b-row>
              <b-col sm="6">
                <ejs-textbox v-model="input.pan_number" floatLabelType="Auto" :placeholder="$ml.get('panno')"></ejs-textbox>
              </b-col>
              <b-col sm="6">
                <label v-text="$ml.get('pancopy')"></label>
                <b-form-file v-model="input.pan_upload" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
              </b-col>
            </b-row>
            </b-form-group>
          <div v-if="addattr.length!=0">
          <b-form-group
            :label="$ml.get('customattributes')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <div v-for="(run, index) in addattr" :key="index">
              <b-row v-if="addattr[index].field_type == 'Text' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="text" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'Email' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="email" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'Phone' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="phone" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'TexArea' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input :textarea="true" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
            </div>
          </b-form-group>
          </div>
          <div v-if="isVendor">
            <b-form-group
              :label="$ml.get('vendordetails')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-row>
                <b-col sm="4">
                  <ejs-textbox v-model="vendor.vendor_company" floatLabelType="Auto" :placeholder="$ml.get('vendorcompany')"></ejs-textbox>
                </b-col>
                <b-col sm="4">
                  <ejs-textbox type="number" v-model="vendor.gst" floatLabelType="Auto" :placeholder="$ml.get('gst')"></ejs-textbox>
                </b-col>
                <b-col sm="4">
                  <label v-text="$ml.get('gstcerti')"></label>
                  <b-form-file v-model="vendor.gst_certi" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <ejs-textbox type="number" v-model="vendor.turnover" floatLabelType="Auto" :placeholder="$ml.get('turnover')"></ejs-textbox>
                </b-col>
                <b-col sm="4">
                  <ejs-textbox v-model="vendor.kcp_name" floatLabelType="Auto" :placeholder="$ml.get('kcpname')"></ejs-textbox>
                </b-col>
                <b-col sm="4">
                  <ejs-textbox type="number" v-model="vendor.kcp_phone" floatLabelType="Auto" :placeholder="$ml.get('kcpno')"></ejs-textbox>
                </b-col>
              </b-row>
            </b-form-group>
          </div>
          <div v-else>
          </div>
          <div v-if="isStaff">
            <b-form-group
              :label="$ml.get('staffdetails')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
                <b-row>
                  <b-col sm="6">
                    <ejs-dropdownlist :showClearButton="true" v-model="staff.department" :groupTemplate="groupTemplate1"  :allowFiltering="true" :dataSource='department'  :fields='dept_fields'  popupHeight='200' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                  </b-col>
                  <b-col sm="6">
                    <ejs-dropdownlist :showClearButton="true" :change="setUserGroup" v-model="staff.designation" :groupTemplate="groupTemplate2"  :allowFiltering="true" :dataSource='designation'  :fields='desig_fields'  popupHeight='200' :placeholder="$ml.get('pholddesig')"></ejs-dropdownlist>
                  </b-col>
                </b-row>

              </b-form-group>
              <b-form-group
              :label="$ml.get('educationqual')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
                <b-row>
                  <b-col sm="3">
                    <label v-text="$ml.get('undergraduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="UG"  :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="UG">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[0].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col  sm="3">
                    <label v-text="$ml.get('graduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="G" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="G">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[1].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col sm="3">
                    <label v-text="$ml.get('postgraduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="PG" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="PG">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[2].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col  sm="3">
                    <label v-text="$ml.get('doctorate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="Doctrate" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div class="multiline" v-if="Doctrate">
                       <div class="multiline_wrapper">
                      <ejs-textbox id="default" :multiline="true" v-model="staff.education[3].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                </b-row>
              </b-form-group>
          </div>
          <div v-else>
          </div>
          <b-button type="button" variant="primary" @click="primaryModal = true" style="float:right" class="mr-1" v-text="$ml.get('customattributes')"></b-button>
           <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>
          </div>
          </b-form>
          <b-modal :title="$ml.get('customattributes')" class="modal-primary" v-model="primaryModal" @ok="primaryModal = false" hide-footer>
            <b-form v-on:submit.prevent="addAttribute">
              <b-form-group
            :label="$ml.get('fieldtype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <cool-select
                v-model="attribute.field_type"
                :items="field_types"
                :placeholder="$ml.get('fieldtype')"
               >
              </cool-select>
          </b-form-group>
          <input v-model="attribute.context" value="User" hidden>
          <b-form-group
              :label="$ml.get('fieldname')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
                <b-form-input v-model="attribute.field_name" type="text" id="city" :placeholder="$ml.get('placeholderfieldname')"></b-form-input>
            </b-form-group>
            <b-form-group
              
              :label="$ml.get('description')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
                <b-form-input v-model="attribute.description" type="text" id="city" :placeholder="$ml.get('placeholderdescription')"></b-form-input>
            </b-form-group>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>
        </b-card>
        </b-col>
    </b-row>
    <b-modal :title="$ml.get('addidentifications')" size="sm" class="modal-primary" v-model="idmodal" @ok="idmodal = false" hide-footer>
      <b-form v-on:submit.prevent="addId">
      <b-form-group>
        <ejs-dropdownlist :showClearButton="true" v-model="identification.id_type" :allowFiltering="true" :dataSource='idtype' popupHeight='200' :placeholder="$ml.get('idtype')"></ejs-dropdownlist>
        <div v-if="identification.id_type=='Others'">
          <ejs-textbox v-model="identification.type" floatLabelType="Auto" :placeholder="$ml.get('idtype')"></ejs-textbox>
        </div>
        <br>
        <ejs-textbox v-model="identification.id_number" floatLabelType="Auto" :placeholder="$ml.get('idnumber')"></ejs-textbox>
        <br>
        <br>
       <label v-text="$ml.get('idcopy')"></label>
        <b-form-file v-model="identification.upload" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
      </b-form-group>
      <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('add')"><i class="fa fa-dot-circle-o"></i></b-button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import ml from '@/ml';
import countries from '@/resources/countries'
import apiUrl from '@/apiUrl'
  import { Switch as cSwitch } from '@coreui/vue'
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import Vue from 'vue'
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
Vue.use(TextBoxPlugin);
Vue.use(DropDownListPlugin);

var api = axios.create({
  withCredentials:true
})

var groupVue1 = Vue.component("groupTemplate1", {
    template: `<strong>{{val1}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    mounted() {
      axios.get(`${apiUrl}`+`department/dept/get/`+`${this.data.parent_department}`,{withCredentials:true}).then((res) => {
        console.log(res.data)
        this.val1 = res.data.department_name
      });
    }
  });
  var groupVue2 = Vue.component("groupTemplate2", {
    template: `<strong>{{val2}}</strong>`,
    data() {
      return {
        data: {

        },
        val2:""
      };
    },
    async mounted() {
      axios.get(`${apiUrl}`+`designation/desig/get/one/`+`${this.data.parent_designation_id}`,{withCredentials:true}).then((res) => {
        this.val2 = res.data.name
      });
    
    }
  });

export default {
  name: 'Add User',
  components : {
    CoolSelect,
      cSwitch,
  },
  data: function () {
    return {
      identification:{

      },
      groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          idmodal:true,
          groupTemplate2: function () {
              return {
                  template: groupVue2
              }
          },
          user_groups:[],
          staff:{
            education:[
            {},{},{},{}
            ]
          },
      items : ['Admin','Student','Staff','Vendor','Guardian','Guest'],
      selected: 'Month',
      posts: [],
      primaryModal : false,
      resp: [],
      attribute : {
        context : "",
        field_name : "",
        field_type : "",
        description : ""
      },
      isVendor:false,
      addattr : [
        
      ],
      data :[],
      field_types : ['Text','Email','Phone','TexArea'],
      input : {
            user_name : "",
            password : "",
            onType : "",
            user_type:"",
            address : [this.addresslist],
            identification:[]
        },
        idmodal:false,
        taxx : {
            tax_id : "",
            tax_tag : "",
        },
         addresslist : {
        compAdd : "",
        country : "",
        state : "",
        zip : "",
        phone : "",
        email : ""
      },
      idtype:['Aadhar Card','Passport','Voter ID','Driving Licence','Others'],
      vendor : {
        vendor_company:"",
        pan:"",
        gst:"",
        turnover:"",
        kcp_name : "",
        kcp_phone : "",
        acc_no : "",
        acc_name:"",
        ifsc : "",
        bank_name:"",
        pan_copy: null,
        gst_certi:null,
        address:this.addresslist
      },
      isAdmin:false,
      isStudent:false,
      isStaff:false,
      isGuardian:false,
      isGuest:false,
      countrylist : countries,
      designation:null,
      department:null,
      G:false,
      UG:false,
      PG:false,
      Doctrate:false,
      dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
      desig_fields:{groupBy:'parent_designation_id',text:"name",value:"_id"},
      bloodgroup:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
      country_fields:{text:"name",value:"name"}
    }
  },
  async mounted() {
    axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = res.data
      })
      axios.get(`${apiUrl}`+`designation/desig/get/all`,{withCredentials:true}).then((res) => {
        this.designation = res.data
      })
    axios.get(`${apiUrl}`+`super/attrib/view/`,{ withCredentials:true })
    .then(
      response => {
        this.data = response.data
        for(var i=0;i<this.data.length;i++) {
          if(this.data[i].context == "User") {
            this.addattr.push(this.data[i]);
          }
        }
        console.log(this.addattr)
      })
  },
  watch : {
      'input.onType': function() { 
        var value = this.input.onType
        if(value == "Vendor") {
          this.isVendor=true
          this.isAdmin = false
          this.isGuest = false
          this.isGuardian = false
          this.isStaff = false
          this.isStudent = false
        }
        if(value=="Admin") {
          this.isVendor=false
          this.isAdmin = true
          this.isGuest = false
          this.isGuardian = false
          this.isStaff = false
          this.isStudent = false
        }
        if(value=="Staff") {
          this.isVendor=false
          this.isAdmin = false
          this.isGuest = false
          this.isGuardian = false
          this.isStaff = true
          this.isStudent = false
        }
        if(value=="Student") {
          this.isVendor=false
          this.isAdmin = false
          this.isGuest = false
          this.isGuardian = false
          this.isStaff = false
          this.isStudent = true
        }
        if(value=="Guardian") {
          this.isVendor=false
          this.isAdmin = false
          this.isGuest = false
          this.isGuardian = true
          this.isStaff = false
          this.isStudent = false
        }
        if(value=="Guest") {
          this.isVendor=false
          this.isAdmin = false
          this.isGuest = true
          this.isGuardian = false
          this.isStaff = false
          this.isStudent = false
        }
      }
      },
  methods : {
    deleteId() {
      this.input.identification.pop()
    },
    addId() {
      if(this.id_type == "Others") {
        this.identification.id_type = this.identification.type
      }
      this.input.identification.push(this.identification);
        this.identification = {}
        this.idmodal = false
    },
    async addAttribute() {
      this.primaryModal = false
      this.attribute.context = "User";
      console.log(this.attribute);
      axios.post(`${apiUrl}`+`super/attrib/add`,this.attribute,{withCredentials : true}).then((response) => {
        console.log(response);
      })
    },
    setUserGroup(args) {
      var user_group = {
        user_group_name : args.itemData._id
      }
      api.post(`${apiUrl}`+`super/group/subgroup/find/by/name`,user_group).then((res) => {
        this.input.user_group = res.data._id
      })
    },
    sendData(args) {
      this.$validator.validate().then(valid => {
            if (!valid) {
              console.log(this.$validator)
            } 
     else {
      if(this.input.onType=="Vendor") {
        this.vendor.address = this.addresslist;
        this.input.address = [this.addresslist];
        var vfd = new FormData();
        vfd.append('vendor_company',this.vendor.vendor_company);
        vfd.append('address',this.vendor.address);
        vfd.append('pan',this.vendor.pan)
        vfd.append('gst',this.vendor.gst)
        vfd.append('turnover',this.vendor.turnover)
        vfd.append('kcp_name',this.vendor.kcp_name)
        vfd.append('kcp_phone',this.vendor.kcp_phone)
        vfd.append('acc_no',this.vendor.acc_no)
        vfd.append('ifsc',this.vendor.ifsc)
        vfd.append('bank_name',this.vendor.bank_name)
        console.log(this.vendor.pan_copy,this.vendor.gst_certi);
        vfd.append('pan_copy',this.vendor.pan_copy)
        vfd.append('gst_certi',this.vendor.gst_certi)
        axios.post(`${apiUrl}`+`vendor/create`,vfd,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then((response)=> {
          console.log(response);
          this.input.user_type=response.data._id
          axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
              console.log(response);
              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/user");
              }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
        })
      }
      if(this.input.onType=="Staff") {
        // var sfd = new FormData();
        // var sfd.append()
        this.input.address = [this.addresslist];
        axios.post(`${apiUrl}`+`staff/staff/create`,this.staff,{withCredentials:true}).then((response)=> {
          this.input.user_type = response.data._id
          axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
            var update = {
              user : response.data._id
            }
              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                axios.put(`${apiUrl}`+`staff/staff/update/one/${this.input.user_type}`,update,{withCredentials : true}).then((res) => {
                    console.log(update)
                    console.log(res.data)
                  })
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/user");
              }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
        })
      }
      else{
              this.input.address = [this.addresslist];
              this.input.onType = null;
              this.input.user_type = null;
            axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
              console.log(response);

              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/user");
              }
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
          })
      
      

  }
  }
};
</script>
<style>
#errors {
  color:red;
}
@import '../../styles/ejs-vue-base.css';
@import "../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../styles/ej2-vue-lists/styles/material.css";
@import "../../styles/ej2-vue-navigations/styles/material.css";
@import "../../styles/ej2-vue-popups/styles/material.css";
@import "../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../styles/ej2-vue-buttons/styles/material.css";
@import "../../styles/ej2-vue-inputs/styles/material.css";
</style>
