<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

	<b-row>
      <b-col md="12">
        <b-card style="position:relative;height:auto">
          <b-card id="xs" class="col-sm-6 bg-info" v-if="verified" style="position: absolute; top: 20%; right: 1%;">
            <b-row>
              <b-col sm="4">
                Total Approved Amount
              </b-col>
              <b-col sm="4">
                Amount Used
              </b-col>
              <b-col sm="4">
                Amount Left
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                {{totalamount}}
              </b-col>
              <b-col sm="4">
                {{totalamount - boundaryAmount}}
              </b-col>
              <b-col sm="4">
                {{boundaryAmount}}
              </b-col>
            </b-row>
          </b-card>
          <div slot="header">
            <span v-text="$ml.get('transactionform')"></span>
          </div>
          <b-form action="UserList" v-on:keydown.enter.prevent="prevent" v-on:submit.prevent="sendData">
            <div ref="pdf">
          <b-form-group
            :label="$ml.get('refid')"
            label-for="basicName"
            :label-cols="2"
            :horizontal="true"
            >
            <b-row>
                <b-col sm="8">
                  <b-form v-on:submit.prevent="changeFields">
                    <b-row>
                    <b-col>
                      <span style="color:red;float:right;height:2px;font-size:20px">*</span>
                      <ejs-textbox v-on:keydown.enter='changeFields' v-model="input.approvalCode" :placeholder="$ml.get('pholdrefid')" ></ejs-textbox>
                    </b-col><b-col><b-button type="submit" size="sm" variant="primary" v-text="$ml.get('go')"><i class="fa fa-dot-circle-o"></i></b-button></b-col></b-row>
                  </b-form>
                </b-col>
              </b-row>
            </b-form-group>
            <div v-if="verified">
          <b-form-group
            :label="$ml.get('transactype')"
            label-for="basicName"
            :label-cols="2"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <cool-select
              disabled
                v-model="input.transaction_type"
                :items="types"
                :placeholder="$ml.get('pholdtransactype')"
               >
              </cool-select>
            </b-col>
          </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('transaccategory')"
            label-for="basicName"
            :label-cols="2"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <cool-select
                :disabled="disableCategory"
                v-model="input.category"
                :items="category"
                :placeholder="$ml.get('pholdtransaccategory')"
               >
              </cool-select>
            </b-col>
          </b-row>
          </b-form-group>
          <b-form-group
              :label="$ml.get('department')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <treeselect disabled :placeholder="$ml.get('pholddept')" v-model="input.department" :multiple="false" :options="department" />
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('head')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <span style="color:red;float:right;height:2px;font-size:20px">*</span>
                  <treeselect disabled required :placeholder="$ml.get('pholdhead')" v-model="input.head" :multiple="false" :options="head" />
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('month')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <span style="color:red;float:right;height:2px;font-size:20px">*</span>
              <cool-select
                v-model="input.month"
                :items="month"
                item-text="name"
                item-value="value"
                :placeholder="$ml.get('pholdmonth')"
               >
              </cool-select>
            </b-col>
          </b-row>
            </b-form-group>
            <div v-if="input.category == 'Bill/Invoice' || input.category=='Imprest' ">
            <b-form-group
            :label="$ml.get('vendorcompany')"
            label-for="basicName"
            :label-cols="2"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
                <span v-if="!isImprest" style="color:red;float:right;height:2px;font-size:20px">*</span>
            <cool-select
                v-model="input.vendor"
                :items="vendors"
                item-text="vendor_company"
                item-value="_id"
                :placeholder="$ml.get('pholdvendorcompany')"
               >
               <div v-if="isPermittedVendor" slot="after-items-fixed" class="slot slot--after">
                 <b-button type="button" size="sm" block variant="secondary" @click="vendorModal = true" class="mr-1"><i class="fa fa-plus"></i>&nbsp;<span v-text="$ml.get('addvendor')"></span></b-button>
               </div>
              </cool-select>
            </b-col></b-row>
          </b-form-group>
            <b-form-group
              :label="$ml.get('billno')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <span v-if="!isImprest" style="color:red;float:right;height:2px;font-size:20px">*</span>
              <div v-if="isImprest"><ejs-textbox type="text" v-model="input.bill_number"  :placeholder="$ml.get('pholdbillno')"></ejs-textbox></div>
              <div v-else>
                <ejs-textbox required type="text" v-model="input.bill_number"  :placeholder="$ml.get('pholdbillno')"></ejs-textbox>
              </div>
            </b-col>
          </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('ponumber')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <!-- <span style="color:red;float:right;height:2px;font-size:20px">*</span> -->
              <ejs-textbox type="text" v-model="input.po_raised"  :placeholder="$ml.get('ponumber')"></ejs-textbox>
            </b-col>
          </b-row>
            </b-form-group>
          <b-form-group
            :label="$ml.get('quotations')"
            label-for="basicName"
            :label-cols="2"
            :horizontal="true">
            <b-row>
              <b-col sm="4">
                <b-form-group>
            <b-button type="button" size="sm" variant="primary" @click="quoteModal = true"  class="mr-1" v-text="$ml.get('addquotations')"></b-button></b-form-group>
          </b-col>
          <div v-if="quotes.length!=0">
          <b-col v-for="(run,index) in quotes" :key="index">
              <div class="e-input-group">
                    <input class="e-input" type="text" :value="quotes[index].title" readonly="">
                </div>
          </b-col>
        </div>
          </b-row>
          </b-form-group>
          
        </div>
            <b-form-group
              :label="$ml.get('transacammount')"
              label-for="basicText"
              :label-cols="2"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <span style="color:red;float:right;height:2px;font-size:20px">*</span>
              <ejs-textbox @change="validateAmount" required type="number" v-model="input.amount"  :placeholder="$ml.get('pholdtransacammount')"></ejs-textbox>
            </b-col>
            <b-col sm="1" id="xs">
              <i class="fa fa-rupee font-2xl"></i>
              &nbsp;
              &nbsp;
              &nbsp;
              <!-- <div v-if="visible">
              <label v-text="$ml.get('maxamount')"></label>&nbsp;:&nbsp;
              <span v-text="boundaryAmount"></span>
            </div> -->
            </b-col>
          </b-row>
            </b-form-group>
            <div v-if="input.category == 'Purchase Order'">
         
        </div>
          
        <div v-else>
        </div>
        </div>
      </div>
           <div slot="footer" v-if="verified">
              <b-button :disabled="!verified" type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
        </b-card>
        </b-col>

        <!-- Vendor Form -->
        <b-modal :title="$ml.get('addvendor')" size="lg" class="modal-primary" v-model="vendorModal" @ok="vendorModal = false" hide-footer>
            <b-form v-on:submit.prevent="addVendor" class="py-1">
              <b-form-group
              :label="$ml.get('basic')"
              label-for="basicName"
              :label-cols="3"
              label-size="md"
              label-class="py-3"
              :horizontal="true"
              >
                <b-row>
                  <b-col>
                    <ejs-textbox floatLabelType="Auto" v-model="vendor.name" :placeholder="$ml.get('name')" required></ejs-textbox>
                  </b-col>
                  <b-col>
                    <ejs-textbox floatLabelType="Auto" v-model="vendor.vendor_company" :placeholder="$ml.get('company')" required></ejs-textbox>
                  </b-col>
                </b-row>
                  <b-row>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto"  v-model="addresslist.phone" type="number" id="city" :placeholder="$ml.get('contact1')"></ejs-textbox>
                  </b-col>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto" v-model="vendor.kcp_phone" type="number" id="postal-code" :placeholder="$ml.get('contact2')"></ejs-textbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="py-2">
                    <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('panno')" v-model="vendor.pan" id="vendor_company"></ejs-textbox>
                  </b-col>
                  <b-col class="py-2">
                    <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('gst')" v-model="vendor.gst" id="vendor_company"></ejs-textbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label for="street" v-text="$ml.get('pancopy')"></label>
                      <b-form-file v-model="vendor.pan_copy" accept="image/*" id="fileInput"></b-form-file>
                  </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group>
                      <label for="street" v-text="$ml.get('gstcerti')"></label>
                        <b-form-file v-model="vendor.gst_certi" accept="image/*" id="fileInput"></b-form-file>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <ejs-textbox floatLabelType="Auto" type="number" :placeholder="$ml.get('turnover')" v-model="vendor.turnover"></ejs-textbox>
                  </b-col>
                </b-row>
              </b-form-group>
              <b-row class="justify-content-center">
                <b-btn size="md" href="#" v-b-toggle.expand variant="primary"><i class="cui-chevron-bottom"></i>&nbsp;<span v-text="$ml.get('more')"></span></b-btn>
              </b-row>
              <b-collapse id="expand">
                <b-btn style="float:right" size="sm" href="#" v-b-toggle.bank variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
              <b-form-group
              :label="$ml.get('bankinfo')"
              label-for="basicName"
              :label-cols="3"
              label-size="md"
              label-class="py-3"
              :horizontal="true"
              >
              <b-collapse id="bank" accordion="my-accordion">
                <b-row>
                  <b-col sm="6">
                  <ejs-textbox floatLabelType="Auto" v-model="vendor.acc_name" type="text" id="street" :placeholder="$ml.get('beneficiaryname')" ></ejs-textbox>
                </b-col>
                <b-col sm="6">
                  <ejs-textbox floatLabelType="Auto" v-model="vendor.acc_no" type="number" id="street" :placeholder="$ml.get('accno')"></ejs-textbox>
                </b-col>
                </b-row>
                <b-row>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto"  v-model="vendor.bank_name" type="text" id="city" :placeholder="$ml.get('bankname')"></ejs-textbox>
                  </b-col>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto" v-model="vendor.ifsc" type="text" id="postal-code" :placeholder="$ml.get('ifsc')"></ejs-textbox>
                  </b-col>
                </b-row>
              </b-collapse>
            </b-form-group>
            <b-btn style="float:right" size="sm" href="#" v-b-toggle.address variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
            <b-form-group
              :label="$ml.get('address')"
              label-for="basicName"
              :label-cols="3"
              label-size="md"
              label-class="py-3"
              :horizontal="true">
                <b-collapse id="address" accordion="my-accordion">
                    <b-textarea v-model="addresslist.compAdd" floatLabelType="Auto" :placeholder="$ml.get('address')"></b-textarea>
                    <b-row>
                      <b-col sm="6">
                        <ejs-textbox floatLabelType="Auto" v-model="addresslist.email" type="email" id="street" :placeholder="$ml.get('email')"></ejs-textbox>
                      </b-col>
                    </b-row>
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
              </b-collapse>
            </b-form-group>
          </b-collapse>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>

          <!-- //End Vendor Modal -->


          <b-modal :title="$ml.get('addquotations')" class="modal-primary" v-model="quoteModal" size="large" @ok="quoteModal = false" hide-footer>
            <b-form v-on:submit.prevent="addQuote">
             <b-form-group
              :label="$ml.get('vendorcompany')"
              label-for="basicName"
              :label-cols="2"
              :horizontal="true"
              >
              <b-row>
                <b-col sm="12">
              <cool-select
                  v-model="quote.vendor"
                  :items="vendors"
                  item-text="vendor_company"
                  item-value="_id"
                  :placeholder="$ml.get('pholdvendorcompany')"
                 >
                 <div slot="after-items-fixed" class="slot slot--after">
                   <b-button type="button" size="sm" block variant="secondary" @click="vendorModal = true" class="mr-1"><i class="fa fa-plus"></i>&nbsp;<span v-text="$ml.get('addvendor')"></span></b-button>
                 </div>
                </cool-select>
              </b-col></b-row>
            </b-form-group>
            
              <b-row>
                <b-col sm="12">
                  <ejs-textbox floatLabelType="Auto" v-model="quote.title" type="text" id="street" :placeholder="$ml.get('pholdtitle')">
                  </ejs-textbox>
                </b-col>
              </b-row>
            
              <b-row>
                <b-col sm="12">
                  <ejs-textbox floatLabelType="Auto" v-model="quote.description" type="text" id="street" :placeholder="$ml.get('placeholderdescription')">
                  </ejs-textbox>
                </b-col>
              </b-row>
            
            <b-form-group
              :label="$ml.get('uploadquote')"
              label-for="basicName"
              :label-cols="2"
              :horizontal="true">
              <b-row>
                <b-col sm="12">
                  <b-form-file v-model="quote.file" type="text" id="street" :placeholder="$ml.get('dropfile')">
                  </b-form-file>
                </b-col>
              </b-row>
            </b-form-group>
            
              <b-row>
                <b-col sm="12">
                  <ejs-textbox floatLabelType="Auto" v-model="quote.price" type="text" id="street" :placeholder="$ml.get('pholdprice')">
                  </ejs-textbox>
                </b-col>
              </b-row>
            
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>



          <b-modal :title="$ml.get('addpo')" class="modal-primary" v-model="poModal" size="large" @ok="poModal = false" hide-footer>
            <b-form v-on:submit.prevent="addPO">
              <b-row>
                <b-col sm="12">
                  <ejs-textbox floatLabelType="Auto" v-model="purchase_order.purchase_id" type="text" id="street" :placeholder="$ml.get('pholdpoid')">
                  </ejs-textbox>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <ejs-textbox floatLabelType="Auto" v-model="purchase_order.amount" type="text" id="street" :placeholder="$ml.get('pholdamount')">
                  </ejs-textbox>
                </b-col>
              </b-row>
              
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>
    </b-row>
  </div>
</template>

<script>
  import apiUrl from '@/apiUrl';
  import axios from 'axios';
  import Vue from 'vue';
  import countries from '@/resources/countries'
  import { CoolSelect } from 'vue-cool-select'
    import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
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
    props:['ref_id'],
		name : 'AddTransaction',
		components : {
      CoolSelect,
      cSwitch,
      Treeselect,
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
          countrylist : countries,
          verified:false,
				input:{
					transaction_type:"",
					category:"",
					
					po_required:false,
					po_raised:null,
					boundaryAmount:999999999,
          status:"Pending",
          isApproved:false,
          approvalCode:"",
					amount:"",
					month:"",
					quotes:[],
					cash:"",
				},
        addresslist : {
      },
      totalamount:0,
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
      isImprest:false,
      country_fields:{text:"name",value:"name"},
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
        isPermittedVendor:false,
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
					"Bill/Invoice","Imprest"
				],
        month:[ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"}
        ],
        department:[
        ],
        approvals :[
          
        ],
        head:[],
        or_dept:[],
        or_head:[],
        visible : false,
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
        approvalFields:{text:"description",value:"_id"},
        head_fields:{groupBy:'parent_head',text:"name",value:"_id"},
        
			}
		},
    watch : {
      'input.category' : function(){
        if(this.input.category == "Imprest") {
          this.isImprest = true
        }
        else{
          this.isImprest =false
        }
      },
      'input.department' : function() {
        if(this.input.department == null || this.input.department == "") {
          axios.get(`${apiUrl}dropdown/head/no/dept`,{withCredentials:true}).then((res) => {
            this.or_head = JSON.parse(JSON.stringify(res.data))
            this.head = this.list_to_tree_head(res.data)
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        }
        else {
          axios.get(`${apiUrl}dropdown/head/find/${this.input.department}`,{withCredentials:true}).then((res) => {
            this.or_head = JSON.parse(JSON.stringify(res.data))
            this.head = this.list_to_tree_head(res.data)
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        }
      }
    },
		async mounted() {
      var Session = JSON.parse(localStorage.session_key)
    if(Session.user) {
      for(var i=0;i<Session.permission.length;i++) {
      if(Session.permission[i].text=="Vendor" && (Session.permission[i].write)) {
        this.isPermittedVendor = true
        break;
      }
    }
    }
    else{
      this.isPermittedVendor = true
    }
    if(this.ref_id) {
      this.input.approvalCode = this.ref_id
    }
      this.month.splice(0,new Date().getMonth())
      if(this.$session.has('subuser')) {
        this.visible = false
      };
      if(this.$session.has('user')) {
        this.visible = true
      }
      axios.get(`${apiUrl}`+`approvals/preApp/get/all`,{withCredentials:true}).then((res) => {
        this.approvals = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
      
      axios.get(`${apiUrl}`+`po/get/all`,{withCredentials:true}).then((res) => {
        this.purchase_orders = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
      axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = this.list_to_tree_dept(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      axios.get(`${apiUrl}`+`head/head/get`,{withCredentials:true}).then((res) => {
        this.or_head = JSON.parse(JSON.stringify(res.data))
        this.head = this.list_to_tree_head(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
        console.log(res.data)
        this.vendors = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
		},
		methods : {
      checkExistDept(node) {
        for (var i=0; i < this.or_dept.length; i++) {
            if (this.or_dept[i]._id == node)
                return true;
        }
        return false;
      },
      checkExistHead(node) {
        for (var i=0; i < this.or_head.length; i++) {
            if (this.or_head[i]._id == node)
                return true;
        }
        return false;
      },
      list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.checkExistDept(node.parent_department)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_department]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDept(roots)
          return roots
      },
      convertDataDept(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDept(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].department_name;
        delete roots[i]._id;
        delete roots[i].department_name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
      list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined && this.checkExistHead(node.parent_head)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_head]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataHead(roots)
          return roots
      },
      convertDataHead(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataHead(roots[i].children);
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
       filtering(e) {
        var department = this.department
           var query = new Query();
            //frame the query based on search string with filter type.
            query = query.where("department_name", "startswith", e.text, true);
            //pass the filter data source, filter query to updateData method.
            e.updateData(department, query);
        },
        sendData() {
          if(this.input.approvalCode!=null) {
            this.input.status = "Approved"
          }
          console.log(this.input)
          if(this.input.amount > this.boundaryAmount || this.input.amount==0 || this.input.amount=="") {
              toast({
                  type: VueNotifications.types.warn,
                  title: 'Invalid Amount'
              })
          }
          else if(this.input.category=="" || this.input.category == null) {
              toast({
                  type: VueNotifications.types.warn,
                  title: 'Please Select a Transaction Category'
              })
            }
            else if(this.input.category == "Bill/Invoice" && this.input.vendor == null || this.input.vendor == "") {
              toast({
                  type: VueNotifications.types.warn,
                  title: 'Please Select a Vendor'
              })
            }
          else{
          console.log(this.input)
          axios.post(`${apiUrl}`+`transaction/trans/create`,this.input,{withCredentials:true}).then((res) => { console.log(res.data)
            this.$router.push("/transaction/list")}).catch((err)=> {
              if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
          }
        },
        addVendor() {
          this.vendor.address = this.addresslist
          var vfd = new FormData();
          vfd.append('name',this.vendor.name);
        vfd.append('vendor_company',this.vendor.vendor_company);
        vfd.append('compAdd',this.vendor.address.compAdd);
        vfd.append('country',this.vendor.address.country);
        vfd.append('email',this.vendor.address.email);
        vfd.append('phone',this.vendor.address.phone);
        vfd.append('state',this.vendor.address.state);
        vfd.append('zip',this.vendor.address.zip);
        vfd.append('pan',this.vendor.pan)
        vfd.append('gst',this.vendor.gst)
        vfd.append('turnover',this.vendor.turnover)
        vfd.append('kcp_name',this.vendor.kcp_name)
        vfd.append('kcp_phone',this.vendor.kcp_phone)
        vfd.append('acc_no',this.vendor.acc_no)
        vfd.append('acc_name',this.vendor.acc_name)

        vfd.append('ifsc',this.vendor.ifsc)
        vfd.append('bank_name',this.vendor.bank_name)
        console.log(this.vendor.pan_copy,this.vendor.gst_certi);
        vfd.append('pan_copy',this.vendor.pan_copy)
        vfd.append('gst_certi',this.vendor.gst_certi)
        axios.post(`${apiUrl}`+`vendor/vendor/create`,vfd,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then((response)=> {
          console.log(response.data)
            this.input.user_type=response.data._id
            axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
            this.vendors = res.data
          });
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        this.vendorModal =false
        },
        addQuote() {
          this.quotes.push(this.quote);
          var qfd = new FormData();
          qfd.append('vendor',this.quote.vendor);
          qfd.append('title',this.quote.title);
          qfd.append('description',this.quote.description);
          qfd.append('file',this.quote.file);
          qfd.append('price',this.quote.price);
          qfd.append('isPurchased',this.quote.isPurchased);
          qfd.append('purchase_order',this.quote.purchase_order);
          this.quoteModal =false
          axios.post(`${apiUrl}`+`quote/create`,qfd,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then((response)=> {
            console.log(response.data)
                  this.input.quotes.push(response.data._id)
            }).catch((err)=> {
              if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })

        },
        switchPO() {
          console.log("ASd")
          this.is_po_raised = !this.is_po_raised
        },
        addPO() {
          console.log(this.purchase_order)
          axios.post(`${apiUrl}`+`po/create`,this.purchase_order,{withCredentials:true}).then((res)=>{
            this.poModal = false
            this.quote.purchase_order = res.data._id
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });

          axios.get(`${apiUrl}`+`po/get/all`,{withCredentials:true}).then((res) => {
          this.purchase_orders = res.data
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
        },
        changeFields(args) {
          axios.get(`${apiUrl}`+`approvals/preApp/get/one/`+`${this.input.approvalCode}`,{withCredentials:true}).then((res) => {
            console.log(res.data)
            if(res.data==null || res.data.status=="PENDING" || res.data.status=="CANCELLED" || res.data.status=="CLOSED" || res.data.status=="RELEASED") {
              toast({
                type: VueNotifications.types.error,
                title: 'Not Approved',
                message: 'Approval is Pending or Cancelled or Released'
              })
            }
            else{
              var date = new Date()
              var year = date.getFullYear()
              this.month = [ {name:`January`,value:`0`},{name:`February`,value:`1`},{name:`March`,value:`2`},{name:`April`,value:`3`},{name:`May`,value:`4`},{name:`June`,value:`5`},{name:`July`,value:`6`},{name:`August`,value:`7`},{name:`September`,value:`8`},{name:`October`,value:`9`},{name:`November`,value:`10`},{name:`December`,value:`11`}]
              this.verified = true
              this.totalamount = res.data.amount
              this.input.transaction_type = res.data.approval_type
              this.input.department = res.data.department
              this.input.head = res.data.budget_head
              this.input.month = res.data.month
              var rest_months = this.month.slice(0,res.data.month)
              var select_month = this.month.slice(res.data.month,12)
              for(var i=0;i<rest_months.length;i++) {
                rest_months[i].name = `${rest_months[i].name} - ${year+1}`
              }
              for(var i=0;i<select_month.length;i++) {
                select_month[i].name = `${select_month[i].name} - ${year}`
              }
              this.month = select_month.concat(rest_months)
              this.boundaryAmount = res.data.approval_amount_left[res.data.month]
              this.is_po_raised = res.data.request_for_quote
              if(res.data.imprest_required != null) {
                this.category.push("Imperest/Advance")
              }
              else{
                this.category = [
                        "Bill/Invoice","Imprest"
                      ]
              }
            }
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        },
        validateAmount(args) {
          if(args.value<0) {
            this.input.amount = 1
          }
          if(args.value>this.boundaryAmount) {
            this.input.amount = this.boundaryAmount
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
  .e-ddl .e-dropdownbase .e-fixed-head {
  visibility: hidden;
}
</style>