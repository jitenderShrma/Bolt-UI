<template>
  <div class="animated slideInLeft" style="animation-duration:100ms">
	<b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <span v-text="$ml.get('approvalform')"></span>
          </div>
          <div v-if="!loader">
          <b-form action="UserList" v-on:keydown.enter.prevent="prevent" v-on:submit.prevent="sendData">
          <b-form-group
            :label="$ml.get('transactype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <cool-select
                v-validate="'required'"
                v-model="input.approval_type"
                :items="types"
                name="ApprovalType"
                :placeholder="$ml.get('pholdapprovaltype')"
               >
              </cool-select>
              <span id="errors">{{ errors.first('ApprovalType') }}</span>
            </b-col>
          </b-row>
          </b-form-group>
          <div v-if="input.approval_type == 'Recurring'">
            <b-form-group
            :label="$ml.get('recurringrate')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                   <ejs-textbox type="number" v-model="input.recurring_rate" floatLabelType="Auto" :placeholder="$ml.get('pholdrecurringrate')"></ejs-textbox>
                </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
          </div>
          <b-form-group
              :label="$ml.get('month')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <cool-select
                v-validate="'required'"
                name="Month"
                v-model="input.month"
                :items="month"
                item-text="name"
                item-value="value"
                :placeholder="$ml.get('pholdmonth')"
               >
              </cool-select>
              <span id="errors">{{ errors.first('Month') }}</span>
            </b-col>
          </b-row>
            </b-form-group>
          <b-form-group
              :label="$ml.get('department')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <ejs-dropdownlist v-model="input.department" :groupTemplate="groupTemplate1"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('head')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <ejs-dropdownlist name="Head" v-validate="'required'" @change="changeFields" v-model="input.budget_head" :dataSource='head' :fields='head_fields' :allowFiltering="true" :groupTemplate="groupTemplate2" popupHeight='300' :placeholder="$ml.get('pholdhead')"></ejs-dropdownlist>
                  <span id="errors">{{ errors.first('Head') }}</span>
                </b-col>
              </b-row>
            </b-form-group>
            
            <b-form-group
              :label="$ml.get('approvalamount')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="2">
              <ejs-textbox type="number" :max="boundaryAmount" @change="validateAmount" floatLabelType="Auto" v-model="input.amount"  :placeholder="$ml.get('pholdapprovalamount')" :required="validate"></ejs-textbox>
            </b-col>
            <b-col sm="2">
              <br>
              <i class="fa fa-rupee font-2xl"></i>
              &nbsp;
              &nbsp;
              &nbsp;
            </b-col>
          </b-row>
            </b-form-group>
          <b-form-group
            :label="$ml.get('reqforquote')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                  <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="input.request_for_quote" @change="changeVerified" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
            :label="$ml.get('description')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                   <ejs-textbox v-model="input.description" :multiline="true" floatLabelType="Auto" :placeholder="$ml.get('placeholderdescription')"></ejs-textbox>
                </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
           <div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
        </div>
          <div v-else>
            <div class="justify-content-center">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>

          </div>
          </div>
        </b-card>

        </b-col>
    </b-row>
  </div>
</template>

<script>
  import apiUrl from '@/apiUrl';
  import axios from 'axios';
  import Vue from 'vue';
  import { CoolSelect } from 'vue-cool-select'
  import { Switch as cSwitch } from '@coreui/vue'
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  import { Query } from '@syncfusion/ej2-data';
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
  Vue.use(MultiSelectPlugin);
Vue.use(TextBoxPlugin);

  Vue.use(DropDownListPlugin);
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
      axios.get(`${apiUrl}`+`head/head/view/one/`+`${this.data.parent_head}`,{withCredentials:true}).then((res) => {
        console.log(res.data)
        this.val2 = res.data.name
      });
    
    }
  });


	export default {
		name : 'AddTransaction',
		components : {
      CoolSelect,
      cSwitch,
      MultiSelectPlugin
		},
		data: function() {
			return {
        groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          
          groupTemplate2: function () {
              return {
                  template: groupVue2
              }
          },
          quotes:[
          ],
          verified:false,
				input:{
					department:null,
          approval_type:"",
          recurring_rate:"",
          budget_head:null,
          month:"",
          amount:"",
          request_for_quote:"",
          description:""
				},
        addresslist : {
        compAdd : "",
        country : "",
        state : "",
        zip : "",
        phone : "",
        email : ""
      },
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
        vendors:[],
        is_po_rasied:false,
        quotation:false,
        quote:{
          vendor:"",
          title:"",
          description:"",
          file:"",
          price:"",
          isPurchased:false,
          purchase_order:""
        },
        validate:true,
        purchase_orders:[],
        purchase_order:{},
        poModal:false,
        quoteModal :false,
        vendorModal:false,
				types:[
          "One Time","Recurring"
				],
        disableCategory:false,
				category:[
					"Purchase Order","Bill","Invoice","Reimburstement"
				],
        month:[ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"}
        
        
        ],
        department:[
        ],
        approvals :[
          
        ],
        head:[],
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
        approvalFields:{text:"description",value:"_id"},
        head_fields:{groupBy:'parent_head',text:"name",value:"_id"},
        loader:false
			}
		},
		async mounted() {
      axios.get(`${apiUrl}`+`approvals/preApp/get/all`,{withCredentials:true}).then((res) => {
        this.approvals = res.data
      });
      axios.get(`${apiUrl}`+`vendor/get/all`,{withCredentials:true}).then((res) => {
        this.vendors = res.data
      });
      axios.get(`${apiUrl}`+`po/get/all`,{withCredentials:true}).then((res) => {
        this.purchase_orders = res.data
      });
      axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = res.data
      })
      axios.get(`${apiUrl}`+`head/head/get`,{withCredentials:true}).then((res) => {
        console.log(res.data);
        this.head = res.data
      })
		},
		methods : {
       filtering(e) {
        var department = this.department
           var query = new Query();
            //frame the query based on search string with filter type.
            query = query.where("department_name", "startswith", e.text, true);
            //pass the filter data source, filter query to updateData method.
            e.updateData(department, query);
        },
        sendData() {
          this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              console.log(this.input)
              axios.post(`${apiUrl}`+`approvals/preApp/create`,this.input,{withCredentials:true}).then((res) => { console.log(res.data)
                 this.loader = true
              })
              setTimeout(function(){window.location.href = ('#/approval/list')},2000)
              
            }
          });
          },
        validateAmount(args) {
          if(args.value>this.boundaryAmount || args.value<0) {
            this.input.amount = this.boundaryAmount
          }
        },
        changeFields(args) {
          console.log(args.itemData)
          if(this.input.month!=null) {
            this.boundaryAmount = args.itemData.amount_left[this.input.month]
          }
        },
        prevent(args) {
          this.changeFields(args)
        },
        changeVerified(args) {
          if(!args) {
            this.verified = false
          }
        }
      
    }
	};
</script>

<style>

#errors {
  color:red;
}

  .e-ddl .e-dropdownbase .e-fixed-head {
  visibility: hidden;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 50px #7ac142;
  }
}
</style>