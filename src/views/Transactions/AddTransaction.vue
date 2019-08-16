<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

	<b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <span v-text="$ml.get('transactionform')"></span>
          </div>
          <b-form action="UserList" v-on:keydown.enter.prevent="prevent" v-on:submit.prevent="sendData">
          <b-form-group
            :label="$ml.get('approval')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                  <label v-text="$ml.get('isapproved')"></label>
                  <br>
                  <c-switch class="mx-1" color="secondary" unchecked name="switch1" v-model="input.isApproved" @change="changeVerified" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
                </b-col>
                <b-col sm="4">
                <div v-if="input.isApproved">
                    <ejs-textbox v-on:keydown.enter='changeFields' floatLabelType="Auto" v-model="input.approvalCode" :placeholder="$ml.get('pholdapprovalcode')" ></ejs-textbox>
                </div>
                </b-col>
              </b-row>
            </b-form-group>
            <div v-if="verified">
          <b-form-group
            :label="$ml.get('transactype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <cool-select
                :disabled="input.isApproved"
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
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
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
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <treeselect :placeholder="$ml.get('pholddept')" v-model="input.department" :multiple="false" :options="department" />
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
                  <treeselect required :placeholder="$ml.get('pholdhead')" v-model="input.budget_head" :multiple="false" :options="head" />
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('month')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
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
            <b-form-group
              :label="$ml.get('transacammount')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="2">
              <ejs-textbox type="number" floatLabelType="Auto" v-model="input.amount"  :placeholder="$ml.get('pholdtransacammount')"></ejs-textbox>
            </b-col>
            <b-col sm="2">
              <br>
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
          <b-form-group
            :label="$ml.get('po')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="4">
                <b-form-group>
                <label v-text="$ml.get('porequired')"></label>
                <br>
                <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="input.po_required" :uncheckedValue="false" @change="switchPO"  :checkedValue="true"/>
              </b-form-group>
              </b-col>
              <b-col sm="4">
              <div v-if="this.input.po_required">
                  <b-form-group>
                  <label v-text="$ml.get('poraised')"></label>
                  <br>
                  <c-switch class="mx-1" color="secondary" unchecked name="switch1" v-model="is_po_rasied" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
              </div>
              </b-col>
              <b-col sm="4">
              <div v-if="is_po_rasied">
              <label v-text="$ml.get('ponumber')"></label>
              <cool-select
                  v-model="input.po_raised"
                  :items="purchase_orders"
                  item-text="purchase_id"
                  item-value="_id"
                  :placeholder="$ml.get('pholdpo')"
                 >
                 <div slot="after-items-fixed" class="slot slot--after">
                   <b-button type="button" size="sm" block variant="secondary" @click="poModal = true" class="mr-1"><i class="fa fa-plus"></i>&nbsp;<span v-text="$ml.get('addpo')"></span></b-button>
                 </div>
                </cool-select>
              
              </div>
            </b-col>
            </b-row>
          </b-form-group>
          <div v-if="this.input.po_required">
          <b-form-group
            :label="$ml.get('quotations')"
            label-for="basicName"
            :label-cols="3"
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
          <b-form-group
            :label="$ml.get('vendorcompany')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
            <cool-select
                v-model="input.vendor"
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
        </div>
        </div>
           <div slot="footer">
              <b-button :disabled="!verified" type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
        </b-card>
        </b-col>
        <b-modal :title="$ml.get('addvendor')" size="lg" class="modal-primary" v-model="vendorModal" @ok="vendorModal = false" hide-footer>
            <b-form v-on:submit.prevent="addVendor">
              <ejs-textbox floatLabelType="Auto" v-model="vendor.vendor_company" :placeholder="$ml.get('vendorcompany')"></ejs-textbox>
            
              <b-row>
                <b-col sm="4">
            
            <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('pholdpan')" v-model="vendor.pan" id="vendor_company"></ejs-textbox>
              </b-col>
              <b-col sm="8">
                <b-form-group>
                  <label for="street" v-text="$ml.get('pancopy')"></label>
                  <b-form-file v-model="vendor.pan_copy" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" required></b-form-file>
              </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
            
            <b-row>
            <b-col sm="6">
            
            
            <ejs-textbox floatLabelType="Auto" v-model="vendor.acc_name" type="text" id="street" :placeholder="$ml.get('pholdaccountname')" required></ejs-textbox>
          
          </b-col>
          <b-col sm="6">
              
            <ejs-textbox floatLabelType="Auto" v-model="vendor.acc_no" type="number" id="street" :placeholder="$ml.get('pholdaccountno')"></ejs-textbox>
          </b-col>
          </b-row>
          <b-row>
            <b-col sm="8">
              
                
                <ejs-textbox floatLabelType="Auto"  v-model="vendor.bank_name" type="text" id="city" :placeholder="$ml.get('pholdbankname')"></ejs-textbox>
            </b-col>
            <b-col sm="4">
              
                
                <ejs-textbox floatLabelType="Auto" v-model="vendor.ifsc" type="text" id="postal-code" :placeholder="$ml.get('pholdifsc')"></ejs-textbox>
              
            </b-col>
          </b-row>
          
            
              <ejs-textbox floatLabelType="Auto" type="number" v-model="vendor.turnover" id="vendor_company" :placeholder="$ml.get('pholdturnover')" ></ejs-textbox>
            
            <b-row>
            <b-col sm="6">
              
                
                <ejs-textbox floatLabelType="Auto"  v-model="vendor.kcp_name" type="text" id="city" :placeholder="$ml.get('pholdkcpname')"></ejs-textbox>
              
            </b-col>
            <b-col sm="6">
              
                
                <ejs-textbox floatLabelType="Auto" v-model="vendor.kcp_phone" type="number" id="postal-code" :placeholder="$ml.get('pholdkcpno')"></ejs-textbox>
              
            </b-col>
          </b-row>
        
        
              <b-row>
                <b-col sm="4">
                  
                  <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('gst')" v-model="vendor.gst" id="vendor_company"></ejs-textbox>
                    </b-col>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="street" v-text="$ml.get('gstcerti')"></label>
                        <b-form-file v-model="vendor.gst_certi" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" required></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            
            <ejs-textbox floatLabelType="Auto" v-model="addresslist.compAdd" type="text" id="street" :placeholder="$ml.get('placeholderaddressline1')"></ejs-textbox>
          
            <b-row>
            <b-col sm="6">
            
            
            <ejs-textbox floatLabelType="Auto" v-model="addresslist.email" type="email" id="street" :placeholder="$ml.get('placeholderemail')" required></ejs-textbox>
          
          </b-col>
          <b-col sm="6">
              
            
            <ejs-textbox floatLabelType="Auto" v-model="addresslist.phone" type="number" id="street" :placeholder="$ml.get('placeholderphone')"></ejs-textbox>
          
          </b-col>
          </b-row>
          <b-row>
            <b-col sm="8">
              
                
                <ejs-textbox floatLabelType="Auto"  v-model="addresslist.state" type="text" id="city" :placeholder="$ml.get('placeholderstate')"></ejs-textbox>
              
            </b-col>
            <b-col sm="4">
              
                
                <ejs-textbox floatLabelType="Auto" v-model="addresslist.zip" type="text" id="postal-code" :placeholder="$ml.get('placeholderpostalcode')"></ejs-textbox>
              
            </b-col>
          </b-row>
          <b-form-group>
            <label for="country" v-text="$ml.get('country')"></label>
            <cool-select
                v-model="addresslist.country"
                :items="countrylist"
                item-text="name"
                item-value="name"
                :placeholder="$ml.get('placeholdercompany')"
                required>
              </cool-select>
          </b-form-group>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>
          <b-modal :title="$ml.get('addquotations')" class="modal-primary" v-model="quoteModal" size="large" @ok="quoteModal = false" hide-footer>
            <b-form v-on:submit.prevent="addQuote">
             <b-form-group
              :label="$ml.get('vendorcompany')"
              label-for="basicName"
              :label-cols="3"
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
              :label-cols="3"
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
              <b-form-group>
                  <label v-text="$ml.get('ispurchased')"></label>
                  <br>
                  <c-switch class="mx-1" color="secondary" unchecked name="switch1" v-model="quote.isPurchased" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
                <div v-if="quote.isPurchased">
                  <b-form-group
              :label="$ml.get('purchaseorder')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-row>
                <b-col sm="12">
              <cool-select
                  v-model="quote.purchase_order"
                  :items="purchase_orders"
                  item-text="purchase_id"
                  item-value="_id"
                  :placeholder="$ml.get('pholdpo')"
                 >
                 <div slot="after-items-fixed" class="slot slot--after">
                   <b-button type="button" size="sm" block variant="secondary" @click="poModal = true" class="mr-1"><i class="fa fa-plus"></i>&nbsp;<span v-text="$ml.get('addpo')"></span></b-button>
                 </div>
                </cool-select>
              </b-col></b-row>
            </b-form-group>
                </div>
            
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
        visible : false,
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
        approvalFields:{text:"description",value:"_id"},
        head_fields:{groupBy:'parent_head',text:"name",value:"_id"},
        
			}
		},
    watch : {
      'input.department' : function() {
        if(this.input.department == null || this.input.department == "") {
          axios.get(`${apiUrl}dropdown/head/no/dept`,{withCredentials:true}).then((res) => {
            this.head = this.list_to_tree_head(res.data)
          })
        }
        else {
          axios.get(`${apiUrl}dropdown/head/find/${this.input.department}`,{withCredentials:true}).then((res) => {
            this.head = this.list_to_tree_head(res.data)
          })
        }
      }
    },
		async mounted() {
      this.month.splice(0,new Date().getMonth())
      if(this.$session.has('subuser')) {
        this.visible = false
      };
      if(this.$session.has('user')) {
        this.visible = true
      }
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
        this.department = this.list_to_tree_dept(res.data)
      })
      axios.get(`${apiUrl}`+`head/head/get`,{withCredentials:true}).then((res) => {
        this.head = this.list_to_tree_head(res.data)
      })
		},
		methods : {
      list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined ) {
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
              if (node.parent_head != undefined ) {
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
          if(this.input.isApproved == true && this.input.approvalCode!=null) {
            this.input.status = "Approved"
          }
          console.log(this.input)
          axios.post(`${apiUrl}`+`transaction/trans/create`,this.input,{withCredentials:true}).then((res) => { console.log(res.data)
            this.$router.push("/transaction/list")});
        },
        addVendor() {
          this.vendor.address = this.addresslist
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
          this.input.user_type=response.data._id
            })
        axios.get(`${apiUrl}`+`vendor/get/all`,{withCredentials:true}).then((res) => {
          this.vendors = res.data
        });
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
          });

          axios.get(`${apiUrl}`+`po/get/all`,{withCredentials:true}).then((res) => {
          this.purchase_orders = res.data
        });
        },
        changeFields(args) {
          axios.get(`${apiUrl}`+`approvals/preApp/get/one/`+`${args.target.value}`,{withCredentials:true}).then((res) => {
            console.log(res.data)
            if(res.data==null || res.data.status=="PENDING" || res.data.status=="CANCELLED") {
              toast({
                type: VueNotifications.types.error,
                title: 'Not Approved',
                message: 'Approval is either Pending or Cancelled'
              })
            }
            else{
              this.month = [ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"}]
              this.verified = true
              this.input.transaction_type = res.data.approval_type
              this.input.head = res.data.budget_head
              this.input.month = res.data.month
              this.month = this.month.splice(res.data.month)
              if(this.$session.has('user')){
                this.boundaryAmount = res.data.amount
              } 
              this.is_po_raised = res.data.request_for_quote
              if(res.data.imprest_required != null) {
                this.category.push("Imperest/Advance")
              }
              else{
                this.category = [
                        "Purchase Order","Bill","Invoice","Reimburstement"
                      ]
              }
            }
          })
        },
        validateAmount(args) {
          console.log(args)
          if(args.value>this.boundaryAmount || args.value<0) {
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