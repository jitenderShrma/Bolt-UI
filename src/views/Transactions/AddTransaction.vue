<template>
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
                <b-col sm="3">
                  <ejs-dropdownlist id='department' :dataSource='department' :fields='dept_fields' :change='onChange1' popupHeight='auto' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                </b-col>
                <b-col sm="3">
                  <ejs-dropdownlist id='subdept1' :dataSource='subdept1Data' :fields='dept_fields' :change='onChange2' :placeholder="$ml.get('pholdsubdept')" popupHeight='auto'
                    :enabled='subdept1'  :text="subdep1text"></ejs-dropdownlist>
                </b-col>
                <b-col sm="3">
                  <ejs-dropdownlist id='subdept2' :dataSource='subdept2Data' :fields='dept_fields' :placeholder="$ml.get('pholdsubdept')" popupHeight='auto'  :change='onChange3'
                    :enabled='subdept2'  :text='subdep2text'></ejs-dropdownlist>
                </b-col>
                <b-col sm="3">
                  <ejs-dropdownlist id='subdept3' :dataSource='subdept3Data' :fields='dept_fields' :placeholder="$ml.get('pholdsubdept')" popupHeight='auto'
                    :enabled='subdept3'  :text='subdep3text'></ejs-dropdownlist>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('head')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              head select
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
              <b-form-input id="basicName" v-model="input.amount" type="text" :placeholder="$ml.get('pholdtransacammount')" ></b-form-input>
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
                  <c-switch class="mx-1" color="secondary" unchecked name="switch1" v-model="is_po_rasied" :uncheckedValue="false" @change="switchPO" :checkedValue="true"/>
                </b-form-group>
              </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
              <div v-if="is_po_rasied">
                  <b-form-group>
                  <label v-text="$ml.get('ponumber')"></label>
                  <b-form-input id="basicName" v-model="input.po_raised" type="text" :placeholder="$ml.get('pholdponumber')" ></b-form-input>
                </b-form-group>
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
              <b-col sm="2">
                <b-form-group>
            <b-button type="button" size="sm" variant="primary" @click="quoteModal = true"  class="mr-1" v-text="$ml.get('addquotations')"></b-button></b-form-group>
          </b-col>
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
                item-value="vendor_company"
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
            <b-form v-on:submit.prevent="addAttribute">
              <b-form-group
              :label="$ml.get('vendorcompany')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-form-input type="text" :placeholder="$ml.get('pholdvendorcompany')" v-model="vendor.vendor_company" id="vendor_company" ></b-form-input>
            </b-form-group>
            <b-form-group
              :label="$ml.get('pan')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-row>
                <b-col sm="9">
                  <b-form-group>
            <label for="street" v-text="$ml.get('pan')"></label>
            <b-form-input type="text" :placeholder="$ml.get('pholdpan')" v-model="vendor.pan" id="vendor_company"></b-form-input>
          </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group>
                  <label for="street" v-text="$ml.get('pancopy')"></label>
                  <b-form-file v-model="vendor.pan_copy" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
              </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
            <b-form-group
            :label="$ml.get('accountdetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="6">
            <b-form-group>
            <label for="street" v-text="$ml.get('accountname')"></label>
            <b-form-input v-model="vendor.acc_name" type="text" id="street" :placeholder="$ml.get('pholdaccountname')" required></b-form-input>
          </b-form-group>
          </b-col>
          <b-col sm="6">
              <b-form-group>
            <label for="street" v-text="$ml.get('accountno')"></label>
            <b-form-input v-model="vendor.acc_no" type="number" id="street" :placeholder="$ml.get('pholdaccountno')"></b-form-input>
          </b-form-group>
          </b-col>
          </b-row>
          <b-row>
            <b-col sm="8">
              <b-form-group>
                <label for="city" v-text="$ml.get('bankname')"></label>
                <b-form-input  v-model="vendor.bank_name" type="text" id="city" :placeholder="$ml.get('pholdbankname')"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="postal-code" v-text="$ml.get('ifsc')"></label>
                <b-form-input v-model="vendor.ifsc" type="text" id="postal-code" :placeholder="$ml.get('pholdifsc')"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          </b-form-group>
            <b-form-group
              :label="$ml.get('turnover')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-form-input type="number" v-model="vendor.turnover" id="vendor_company" :placeholder="$ml.get('pholdturnover')" ></b-form-input>
            </b-form-group>
            <b-form-group
            :label="$ml.get('kcpdetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="8">
              <b-form-group>
                <label for="city" v-text="$ml.get('kcpname')"></label>
                <b-form-input  v-model="vendor.kcp_name" type="text" id="city" :placeholder="$ml.get('pholdkcpname')"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="postal-code" v-text="$ml.get('kcpno')"></label>
                <b-form-input v-model="vendor.kcp_phone" type="number" id="postal-code" :placeholder="$ml.get('pholdkcpno')"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group
              :label="$ml.get('gst')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true"
              >
              <b-row>
                <b-col sm="9">
                  <b-form-group>
                  <label for="street" v-text="$ml.get('gst')"></label>
                  <b-form-input type="text" :placeholder="$ml.get('gst')" v-model="vendor.gst" id="vendor_company"></b-form-input>
                </b-form-group>
                    </b-col>
                    <b-col sm="3">
                      <b-form-group>
                        <label for="street" v-text="$ml.get('gstcerti')"></label>
                        <b-form-file v-model="vendor.gst_certi" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            </b-form-group>
            <b-form-group
            
            :label="$ml.get('address')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-group>
            <label for="street" v-text="$ml.get('addressline1')"></label>
            <b-form-input v-model="addresslist.compAdd" type="text" id="street" :placeholder="$ml.get('placeholderaddressline1')"></b-form-input>
          </b-form-group>
            <b-row>
            <b-col sm="6">
            <b-form-group>
            <label for="street" v-text="$ml.get('email')"></label>
            <b-form-input v-model="addresslist.email" type="email" id="street" :placeholder="$ml.get('placeholderemail')" required></b-form-input>
          </b-form-group>
          </b-col>
          <b-col sm="6">
              <b-form-group>
            <label for="street" v-text="$ml.get('phone')"></label>
            <b-form-input v-model="addresslist.phone" type="number" id="street" :placeholder="$ml.get('placeholderphone')"></b-form-input>
          </b-form-group>
          </b-col>
          </b-row>
          <b-row>
            <b-col sm="8">
              <b-form-group>
                <label for="city" v-text="$ml.get('state')"></label>
                <b-form-input  v-model="addresslist.state" type="text" id="city" :placeholder="$ml.get('placeholderstate')"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="postal-code" v-text="$ml.get('postalcode')"></label>
                <b-form-input v-model="addresslist.zip" type="text" id="postal-code" :placeholder="$ml.get('placeholderpostalcode')"></b-form-input>
              </b-form-group>
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
          </b-form-group>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>
          <b-modal :title="$ml.get('addquotations')" class="modal-primary" v-model="quoteModal" size="large" @ok="quoteModal = false" hide-footer>
            <b-form v-on:submit.prevent="addAttribute">
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
                  item-value="vendor_company"
                  :placeholder="$ml.get('pholdvendorcompany')"
                 >
                 <div slot="after-items-fixed" class="slot slot--after">
                   <b-button type="button" size="sm" block variant="secondary" @click="vendorModal = true" class="mr-1"><i class="fa fa-plus"></i>&nbsp;<span v-text="$ml.get('addvendor')"></span></b-button>
                 </div>
                </cool-select>
              </b-col></b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('title')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <b-form-input v-model="quote.title" type="text" id="street" :placeholder="$ml.get('pholdtitle')">
                  </b-form-input>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('description')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <b-form-input v-model="quote.description" type="text" id="street" :placeholder="$ml.get('pholddescription')">
                  </b-form-input>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('uploadquote')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <b-form-input v-model="quote.description" type="text" id="street" :placeholder="$ml.get('dropfile')">
                  </b-form-input>
                </b-col>
              </b-row>
            </b-form-group>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>
    </b-row>
</template>

<script>
  import apiUrl from '@/apiUrl';
  import axios from 'axios';
  import Vue from 'vue';
  import { CoolSelect } from 'vue-cool-select'
  import { Switch as cSwitch } from '@coreui/vue'
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  import { Query } from '@syncfusion/ej2-data';
  Vue.use(MultiSelectPlugin);
  Vue.use(DropDownListPlugin);

	export default {
		name : 'AddTransaction',
		components : {
      CoolSelect,
      cSwitch,
      MultiSelectPlugin
		},
		data: function() {
			return {
				input:{
					transaction_type:"",
					category:"",
					department:"",
					po_required:false,
					po_rasied:"",
					head:"",
					amount:"",
					month:"",
					quotes:null,
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
        quotes:[

        ],
        quoteModal :false,
        vendorModal:false,
        subdep1text:null,
        subdep2text:null,
        subdep3text:null,
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
        {
          _id:"0",
          name:"One",
          sub_department:[
            {
              _id:"0",
              name:"1",
              sub_department:[
                {
                  _id:"0",
                  name:"2",
                  sub_department:[
                    {
                      _id:"0",
                      name:"3",
                      sub_department:[
                        {
                          _id:"0",
                          name:"4",
                          sub_department:[
                            {

                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          _id:"1",
          name:"One",
          sub_department:[
            {
              _id:"0",
              name:"5",
              sub_department:[
                {
                  _id:"0",
                  name:"6",
                  sub_department:[
                    {
                      _id:"0",
                      name:"7",
                      sub_department:[
                        {
                          _id:"0",
                          name:"8",
                          sub_department:[
                            {

                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
        ],
        head:[],
        dept_fields:{value:"_id",text:"name"},
        subdept1:false,
        subdept2:false,
        subdept3:false,
        
        subdept1Data:null,
        subdept2Data:null,
        subdept3Data:null
			}
		},
		async mounted() {
      axios.get(`${apiUrl}`+`vendor/get/all`,{withCredentials:true}).then((res) => {
        this.vendors = res.data
      });
		},
		watch :{

		},
		methods : {
      switchQuote() {
        console.log(this.quotation)
      },
      switchPO() {
        console.log(this.input.po_required)
      },
      onChange1(args) {
        var i = args.value;
        this.subdept1 = true;
        this.subdept1Data = this.department[i].sub_department
            
      },
      onChange2(args){
        var i = args.value;
        this.subdept2 = true;
        this.subdept2Data = this.subdept1Data[i].sub_department
      },
      onChange3(args) {
        var i = args.value;
        this.subdept3 = true;
        this.subdept3Data = this.subdept2Data[i].sub_department
      }
    }
	};
</script>