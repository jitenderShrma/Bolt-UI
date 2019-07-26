<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

	<b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <span v-text="$ml.get('transactionform')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="sendData">
          <b-form-group
            :label="$ml.get('transactype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <cool-select
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
                  <ejs-dropdownlist v-model="input.head" id='head' :dataSource='head' :fields='head_fields' :allowFiltering="true" :groupTemplate="groupTemplate2" popupHeight='300' :placeholder="$ml.get('pholdhead')"></ejs-dropdownlist>
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
              <b-col sm="4">
              <ejs-textbox floatLabelType="Auto" v-model="input.amount" :placeholder="$ml.get('pholdtransacammount')"></ejs-textbox>
            </b-col></b-row>
            </b-form-group>
          <b-form-group
            :label="$ml.get('po')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                <label v-text="$ml.get('porequired')"></label>
                <br>
                <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="input.po_required" :uncheckedValue="false" @change="switchPO"  :checkedValue="true"/>
              </b-form-group>
              </b-col>
              <b-col sm="6">
              <div v-if="this.input.po_required">
                  <b-form-group>
                  <label v-text="$ml.get('poraised')"></label>
                  <br>
                  <c-switch class="mx-1" color="secondary" unchecked name="switch1" v-model="is_po_rasied" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
              </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
              <div v-if="is_po_rasied">
                  <ejs-textbox floatLabelType="Auto" id="basicName" v-model="input.po_raised" type="text" :placeholder="$ml.get('pholdponumber')" ></ejs-textbox>
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
           <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>
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
  import { Switch as cSwitch } from '@coreui/vue'
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  import { Query } from '@syncfusion/ej2-data';
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
				input:{
					transaction_type:"",
					category:"",
					department:null,
					po_required:false,
					po_raised:null,
					head:null,
					amount:"",
					month:"",
					quotes:[],
					vendor:"",
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
				category:[
					"Purchase Order","Bill","Invoice","Reimburstement","Interest","Advance"
				],
        month:[
          "January","February","March","April","May","June","July","August","September","October","November","December"
        ],
        department:[
        ],
        head:[],
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
        head_fields:{groupBy:'parent_head',text:"name",value:"_id"},
        
			}
		},
		async mounted() {
      var key = window.location.href.split('/edit').pop()
      axios.get(`${apiUrl}`+`transaction/get`+`${key}`,{withCredentials:true}).then((res) => {
        this.input = res.data
      });
      axios.get(`${apiUrl}`+`vendor/get/all`,{withCredentials:true}).then((res) => {
        this.vendors = res.data
      });
      axios.get(`${apiUrl}`+`po/get/all`,{withCredentials:true}).then((res) => {
        this.purchase_orders = res.data
      });
      axios.get(`${apiUrl}`+`/department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = res.data
      })
      axios.get(`${apiUrl}`+`/head/head/get`,{withCredentials:true}).then((res) => {
        console.log(res.data);
        this.head = res.data
      })
		},
		watch :{

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
          console.log(this.input)
          // axios.post(`${apiUrl}`+`transaction/create`,this.input,{withCredentials:true}).then((res) => { console.log(res.data)
          //   this.$router.push("/transaction/list")});
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
        }
      
    }
	};
</script>

<style>
  .e-ddl .e-dropdownbase .e-fixed-head {
  visibility: hidden;
}
</style>