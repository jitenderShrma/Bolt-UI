<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

 <div id="target" className="animated fadeIn">
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid2" :clicked="addEditHandler">
                <e-items >
                 <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate"></e-item>
                 <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowReordering='true' :allowResizing='true'  id='overviewgrid' :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler"
                :height="height" :enableHover='false' :recordDoubleClick="beginEdit">
                <e-columns>
                    <e-column field='name' headerText='Name' :filter='filter' ></e-column>
                    <e-column field='vendor_company' headerText='Vendor Company' :filter='filter'></e-column>
                    <e-column field='address.phone' headerText='Contact 1'  :filter='filter'></e-column>     
                    <e-column field='kcp.kcp_phone' headerText='Contact 2'  :filter='filter'></e-column>
                    <!-- <e-column field='description' :visible="false" headerText='Name'  :filter='filter' ></e-column>  -->
                </e-columns>
                </ejs-grid>
        <b-modal :title="$ml.get('addvendor')" size="lg" class="modal-primary" v-model="vendorModal" @ok="vendorModal = false" hide-footer>
          <b-row class="px-1 py-1">
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
          </b-row>
          </b-modal>


          <!-- VENDOR EDIT -->

          <b-modal :title="$ml.get('editvendor')" size="lg" class="modal-primary" v-model="editvendorModal" @ok="editvendorModal = false" hide-footer>
            <b-form v-on:submit.prevent="editVendor" class="py-1">
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
                    <ejs-textbox floatLabelType="Auto" v-model="editvendor.name" :placeholder="$ml.get('name')" required></ejs-textbox>
                  </b-col>
                  <b-col>
                    <ejs-textbox floatLabelType="Auto" v-model="editvendor.vendor_company" :placeholder="$ml.get('company')" required></ejs-textbox>
                  </b-col>
                </b-row>
                  <b-row>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto"  v-model="editaddresslist.phone" type="number" id="city" :placeholder="$ml.get('contact1')"></ejs-textbox>
                  </b-col>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto" v-model="editvendor.kcp.kcp_phone" type="number" id="postal-code" :placeholder="$ml.get('contact2')"></ejs-textbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="py-2">
                    <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('panno')" v-model="editvendor.pan" id="vendor_company"></ejs-textbox>
                  </b-col>
                  <b-col class="py-2">
                    <ejs-textbox floatLabelType="Auto" type="text" :placeholder="$ml.get('gst')" v-model="editvendor.gst" id="vendor_company"></ejs-textbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <ejs-textbox floatLabelType="Auto" type="number" :placeholder="$ml.get('turnover')" v-model="editvendor.turnover"></ejs-textbox>
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
                  <ejs-textbox floatLabelType="Auto" v-model="editvendor.payment.acc_name" type="text" id="street" :placeholder="$ml.get('beneficiaryname')" ></ejs-textbox>
                </b-col>
                <b-col sm="6">
                  <ejs-textbox floatLabelType="Auto" v-model="editvendor.payment.acc_no" type="number" id="street" :placeholder="$ml.get('accno')"></ejs-textbox>
                </b-col>
                </b-row>
                <b-row>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto"  v-model="editvendor.payment.bank_name" type="text" id="city" :placeholder="$ml.get('bankname')"></ejs-textbox>
                  </b-col>
                  <b-col>
                      <ejs-textbox floatLabelType="Auto" v-model="editvendor.payment.ifsc" type="text" id="postal-code" :placeholder="$ml.get('ifsc')"></ejs-textbox>
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
                        <ejs-textbox floatLabelType="Auto" v-model="editaddresslist.email" type="email" id="street" :placeholder="$ml.get('email')"></ejs-textbox>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="4">
                        <ejs-textbox v-model="editaddresslist.state" floatLabelType="Auto" :placeholder="$ml.get('state')"></ejs-textbox>
                      </b-col>
                      <b-col sm="4">
                        <ejs-textbox v-model="editaddresslist.zip" floatLabelType="Auto" :placeholder="$ml.get('postalcode')"></ejs-textbox>
                      </b-col>
                      <b-col sm="4">
                        <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="editaddresslist.country" :allowFiltering="true" :fields="country_fields" :dataSource='countrylist' popupHeight='200' :placeholder="$ml.get('country')"></ejs-dropdownlist>
                      </b-col>
                    </b-row>
              </b-collapse>
            </b-form-group>
          </b-collapse>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
          </b-modal>

          <!-- Vendor Details -->
          <!-- <b-modal :title="vendordetails.vendor_company" size="xl" class="modal-primary" v-model="editvendorModal" @ok="editvendorModal = false" hide-footer>
            <b-row>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0"></h4>
                    <p>Members online</p>
                  </b-card-body> -->
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
             <!--    </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">9.823</h4>
                    <p>Members online</p>
                  </b-card-body> -->
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
               <!--  </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">9.823</h4>
                    <p>Members online</p>
                  </b-card-body> -->
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                <!-- </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">9.823</h4>
                    <p>Members online</p>
                  </b-card-body> -->
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                <!-- </b-card>
              </b-col>
            </b-row>
          </b-modal> -->


        </div>

      </div>
  </div>
 </div>
</div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import countries from '@/resources/countries'
import { Browser } from '@syncfusion/ej2-base';
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";

import miniToastr from 'mini-toastr' 
Vue.use(ColorPickerPlugin);

import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    
    Vue.use(PivotViewPlugin);
    Vue.use(GridPlugin);
    Vue.use(ToolbarPlugin);
Vue.use(TextBoxPlugin);

    Vue.use(DialogPlugin);
    Vue.use(DropDownListPlugin);
    Vue.use(DatePickerPlugin);
    Vue.use(NumericTextBoxPlugin)
var api = axios.create({
  withCredentials :true
})
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

export default {
    name: 'LabelList',
    components: {
      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
        GroupingBar,
        FieldList,
        Edit
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder]
        },
    data: function () {
      return {
        editvendorModal:false,
        addresslist : {
      },
      countrylist:countries,
      country_fields:{text:"name",value:"name"},
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
        gst_certi:null
      },
      editvendor : {
        kcp:{},
        payment:{}
      },
        excelTemplate : function() {
          return {
            template:Vue.component('excelTemplate', {
              template:`<b-badge id="label1" variant="primary" ><img :src="images.csv"></img>&nbsp<span id="hide" v-text="$ml.get('csv')"></span></b-badge>`,
            data : function() {
              return {
                data:{},
                images: {
                    csv: require('../../assets/images/csv.png')
                },
              }
            }
          })
          }
        },
        pdfTemplate : function() {
          return {
            template:Vue.component('pdfTemplate', {
              template:`<b-badge id="label1" variant="primary" ><img :src="images.pdf"></img>&nbsp<span id="hide" v-text="$ml.get('pdf')"></span></b-badge>`,
            data : function() {
              return {
                data:{},
                images: {
                    pdf: require('../../assets/images/pdf.png')
                },
              }
            }
          })
          }
        },
        addTemplate: function () {
              return {
                  template: Vue.component("addTemplate", {
                      template: `<div ><div v-if="isPermitted"><b-badge id="label1" variant="success" ><i class="fa fa-plus"></i>&nbsp<span id="hide" v-text="$ml.get('add')"></span></b-badge></div><div v-else stye="display:none"></div><div>`,
                      data() {
                        return {
                          data: {
                          },
                          isPermitted:false,
                        };
                      },
                      mounted() {
                        var Session = JSON.parse(localStorage.session_key)
                          if(Session.user) {
                          for(var i=0;i<Session.permission.length;i++) {
                            if(Session.permission[i].text=="Vendor" && Session.permission[i].write) {
                              this.isPermitted = true
                              break;
                            }
                          }
                      }
                      else {
                        this.isPermitted =true
                      }
                    }
                    })
                  }
                },
                deleteTemplate: function () {
              return {
                  template: Vue.component("deleteTemplate", {
                      template: `<div><div v-if="isPermitted"><b-badge id="label1" variant="primary" ><i class="fa fa-trash-o"></i>&nbsp<span id="hide" v-text="$ml.get('delete')"></span></b-badge></div><div v-else></div></div>`,
                      data() {
                        return {
                          data: {
                          },
                          isPermitted:false
                        };
                      },
                      mounted() {

                        var Session = JSON.parse(localStorage.session_key)
                        console.log(Session.permission)

                          if(Session.user) {
                          for(var i=0;i<Session.permission.length;i++) {
                            if(Session.permission[i].text=="Vendor" && Session.permission[i].delete) {
                              this.isPermitted = true
                              break;
                            }
                          }
                      }
                      else {
                        this.isPermitted =true
                      }
                    }
                    })
                  }
                },
                editTemplate: function () {
              return {
                  template: Vue.component("editTemplate", {
                      template: `<div><div v-if="isPermitted"><b-badge id="label1" variant="primary" ><i class="fa fa-edit"></i>&nbsp<span id="hide" v-text="$ml.get('edit')"></span></b-badge></div><div v-else stye="display:none"></div></div>`,
                      data() {
                        return {
                          data: {
                          },
                          isPermitted:false
                        };
                      },
                      mounted() {
                        var Session = JSON.parse(localStorage.session_key)
                          if(Session.user) {
                          for(var i=0;i<Session.permission.length;i++) {
                            if(Session.permission[i].text=="Vendor" && Session.permission[i].edit) {
                              this.isPermitted = true
                              break;
                            }
                          }
                      }
                      else {
                        this.isPermitted =true
                      }
                    }
                    })
                  }
                },
        labelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div><b-badge style="font-weight:lighter;margin:3px" id="label" :variant="data.color">{{data.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
            fields: { text: 'text', value: 'value' },
            dropdownValue: 'Top',
            datasrc: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true,mode:'Dialog'},
            circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
                    squarePalettesColn: 7,
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
           searchTemplate: function () {
              return {
                  template: Vue.component("searchTemplate", {
                      template: `<div class="e-input-group e-search" role="search"><input id="overviewgrid_searchbar" class="e-input" name="input" type="search" v-on:keydown.enter="searchValues" v-model="data.search" placeholder="Search"><span id="overviewgrid_searchbutton" class="e-input-group-icon e-search-icon e-icons" tabindex="-1" title="Search" aria-label="search"></span></div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      },
                      methods:{
                        searchValues(args) {
                          
                        }
                      }
                })
              }
          },
           monthTemplate: function () {
              return {
                  template: Vue.component("monthTemplate", {
                      template: `<div>{{month}}</div>`,
                      data() {
                        return {
                          data: {
                          },
                          month:null,
                        };
                      },
                      mounted() {
                        switch(this.data.month) {
                          case "0": this.month = "January"
                                  break;
                          case "1": this.month = "February"
                                  break;
                          case "2": this.month = "March"
                                  break;
                          case "3": this.month = "April"
                                  break;
                          case "4": this.month = "May"
                                  break;
                          case "5": this.month = "June"
                                  break;        
                          case "6": this.month = "July"
                                  break;
                          case "7": this.month = "August"
                                  break;
                          case "8": this.month = "September"
                                  break;
                          case "9": this.month = "October"
                                  break;        
                          case "10": this.month = "November"
                                  break;        
                          case "11": this.month = "December"
                                  break;
                        }
                      }
                    })
              }
          },
          label:0,
          vendorModal :false,
           height : window.innerHeight*0.695,
          toolbar: ['Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
            options:['Approval','Heads','Designations','Departments'],
        ddData: [{ value: 1000, text: '1,000 Rows and 11 Columns' }, { value: 10000, text: '10,000 Rows and 11 Columns' }],
                ddValue: 1000,
                stTime: null,
                loadTime: null,
                dReady: false,
                showCloseIcon: false,
                isDataChanged: true,
                fields: { text: 'text', value: 'value' },
                
                filterOptions: {
                    type: 'Menu'
                },
                openVendorModal:false,
                filter: {
                    type: 'CheckBox'
                },
                formdata1: {
                  label_name : "",
                  color : "2196f3",
                  context : "",
                  description : ""
                },
                formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "",
                  description : ""
                },
                LabelEditModal: "",
                LabelAddModal:"",
                animationSettings: { effect: 'Zoom' },
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { persistSelection: true, type: 'Multiple' },
                editaddresslist:{}
            };
        },
        watch : {
      'label' : function() {
        api.get(`${apiUrl}`+`label/label/get/all`).then((response) => {
                    this.datasrc = response.data;
                }).catch((err)=> {
                  if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      }
    },
  methods: {
    beginEdit(args){
      var edit = false 
               var Session = JSON.parse(localStorage.session_key)
                 if(Session.user) {
                 for(var i=0;i<Session.permission.length;i++) {
                   
                   if(Session.permission[i].text=="Vendor" && Session.permission[i].edit) {
                      edit= true
                      break;
                   }
                 }
               }
               else{
                edit = true
               }
               if(edit) {
      this.editvendorModal = true
        this.editvendor = args.rowData
        if(args.rowData.address != null) {
          this.editaddresslist = args.rowData.address
        }
      }
    },
            addLabel(args) {
              axios.post(`${apiUrl}`+`label/label/create`,this.formdata1,{withCredentials:true}).then((res) => {
                this.label++
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
            },
            editLabel(args) {
              var id = this.$refs.overviewgrid.getSelectedRecords()
              axios.put(`${apiUrl}`+`label/label/edit/`+`${id[0]._id}`,this.formdata,{withCredentials:true}).then((res) => {
                this.label++
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
            },
            onChange(args) {
              this.formdata.color = args.currentValue.hex.slice(1);
            }, 
            load: function() {
                let proxy = this;
                this.$refs.overviewgrid.$el.ej2_instances[0].on('data-ready', function () {
                    proxy.dReady =  true;
                 })
                this.$refs.overviewgrid.$el.addEventListener('DOMSubtreeModified', function () {
                    if (proxy.dReady && proxy.stTime && proxy.isDataChanged) {
                        let e = performance.now() - proxy.stTime;
                        proxy.loadTime = "Load Time: <b>" + e.toFixed(0) + "</b><b>ms</b>";
                        proxy.stTime = null;
                        proxy.dReady = false;
                        proxy.isDataChanged = false;
                        proxy.$refs.msgelement.classList.remove('e-hide');
                    }
                })
            },
            searchValues(args) {
              console.log("ASdasd")
            },
            openVendorModal() {
              this.openVendorModal = true
              console.log("asd")
            },
            clickHandler (args) {
                    if(this.$refs.overviewgrid.getSelectedRecords().length>0){
                    let withHeader = false;
                    if (args.item.id === 'copyHeader') {
                        withHeader = true;
                    }
                    this.$refs.overviewgrid.copy(withHeader);
                } else if(args.item.id === 'copyHeader' || args.item.id === 'copy'){
                    this.$refs.alertDialog.show();
                }
                 if (args.item.id === 'small') {
                    this.rowHeight = 20;
                }
                if (args.item.id === 'medium') {
                    this.rowHeight = 40;
                }
                if (args.item.id === 'big') {
                    this.rowHeight = 60;
                }
                if (args.item.text === 'CSV Export') {
                    this.$refs.overviewgrid.csvExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            addEditHandler(args) {
              var add=false
              var edit=false
              var deleteper = false 
               var Session = JSON.parse(localStorage.session_key)
                 if(Session.user) {
                 for(var i=0;i<Session.permission.length;i++) {
                   if(Session.permission[i].text=="Vendor" && Session.permission[i].write) {
                      write= true
                   }
                   if(Session.permission[i].text=="Vendor" && Session.permission[i].edit) {
                      edit= true
                   }
                   if(Session.permission[i].text=="Vendor" && Session.permission[i].delete) {
                      deleteper= true
                   }
                 }
             }
              else {
                 add = true
                 edit = true
                 deleteper = true
               }
                if(args.item.id == "add" && add) {
                    this.vendorModal = true
                }
                
                if(args.item.id == "delete" && deleteper ) {
                    var selected = this.$refs.overviewgrid.getSelectedRecords()
                    if(selected.length>0) {
                        axios.delete(`${apiUrl}`+`vendor/vendor/delete/`+`${selected[0]._id}`,{withCredentials:true}).then((response) => {
                          axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
                                    this.datasrc = res.data
                                  });
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
                if (args.item.id === 'excelexport') {
                    this.$refs.overviewgrid.excelExport()
                }
                if (args.item.id === 'pdfexport') {
                    this.$refs.overviewgrid.pdfExport()
                }
                 if (args.item.id === 'small') {
                    this.rowHeight = 20;
                }
                if (args.item.id === 'medium') {
                    this.rowHeight = 40;
                }
                if (args.item.id === 'big') {
                    this.rowHeight = 60;
                }
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
                addVendor() {
          this.vendor.address = this.addresslist
          console.log(this.vendor.address)
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
        console.log(vfd)
        axios.post(`${apiUrl}`+`vendor/vendor/create`,vfd,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then((response)=> {
          console.log(response.data)
            axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
              console.log(res.data)
            this.datasrc = res.data
            this.vendor = {
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
                address:[]
              }
              this.addresslist=[]
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
        editVendor() {
          this.editvendor.address = this.editaddresslist
          console.log(this.editvendor.address.phone)
          var id = this.editvendor._id
          this.editvendor._id = undefined
        axios.put(`${apiUrl}`+`vendor/vendor/edit/${id}`,this.editvendor,{withCredentials:true}).then((response)=> {
            axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
            this.datasrc = res.data
          });
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        this.editaddresslist = []
        this.editvendorModal =false
        },
            
        },
        async mounted () {
                api.get(`${apiUrl}`+`vendor/vendor/get/all`).then((response) => {
                    this.datasrc = response.data;
                    console.log(response.data)
                }).catch((err)=> {
                  if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
            
        }
};
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


#label {
  font-weight:lighter;
    font-size: 12px;
}
#label1 {
  font-weight:lighter;
    font-size: 17px;
}
    .badge-f44336 {
    background-color:#f44336;
    color:white;
  }
  .badge-e91e63{
    background-color:#e91e63;
    color:white;
  }
  .badge-9c27b0{
    background-color:#9c27b0;
    color:white;
  }
  .badge-673ab7{
    background-color:#673ab7;
    color:white;
  }
  .badge-2196f3{
    background-color:#2196f3;
    color:white;
  }
  .badge-03a9f4{
    background-color:#03a9f4;
    color:white;
  }
  .badge-00bcd4{
    background-color:#00bcd4;
    color:white;
  }
  .badge-009688{
    background-color:#009688;
    color:white;
  }
  .badge-8bc34a{
    background-color:#8bc34a;
    color:white;
  }
  .badge-cddc39{
    background-color:#cddc39;
    color:black;
  }
  .badge-ffeb3b{
    background-color:#ffeb3b;
    color:black;
  }
  .badge-ffc107{
    background-color:#ffc107;
    color:black;
  }
#customization {
        display: table;
        margin: 0 auto;
    }
    #app {
        color: #008cff;
        height: 40px;
        left: 45%;
        position: absolute;
        top: 45%;
        width: 30%;
    }
    .control-section {
        height: 100%;
        min-height: 340px;
     }
    .animate {
        display: table-cell;
        padding-left: 20px;
    }
    #customization .e-btn.e-outline:hover,
    #customization .e-css.e-btn.e-outline:hover,
    #customization .e-btn.e-outline:hover:focus,
    #customization .e-css.e-btn.e-outline:hover:focus,
    #customization .e-btn.e-outline:focus,
    #customization .e-css.e-btn.e-outline:focus {
        background-color: #ffffff;
        border-color: #0078d6;
        color:#0078d6;
        outline: none;
    }

.badge-red {
  background-color: red;
  color:white;
}
.badge-#ff000 {
  background-color: red;
}
</style>