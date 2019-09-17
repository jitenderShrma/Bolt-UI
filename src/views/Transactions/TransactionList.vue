<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
 
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
                <e-items>
                  <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate"></e-item>
                 <!-- <e-item align="right" id="edit" :text="$ml.get('edit')" :template="editTemplate"></e-item> --> 
                 <e-item align="right" id="cancel" :text="$ml.get('cancel')" :template="cancelTemplate"></e-item>
                  <e-item align="right" id="upload" :template="uploadTemplate" :text="$ml.get('upload')"></e-item>
                </e-items>
                </ejs-toolbar>
                <div v-if="loading" id="loader">
          <div class="sk-fading-circle">
              <div class="sk-circle1 sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
        </div>
             <div class="control-section">
            <ejs-grid ref='overviewgrid' :allowGrouping='true' :groupSettings='groupOptions'  :rowHeight='rowHeight' :sortSettings='sortOptions' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc" :allowReordering='true' :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin" :actionComplete="actionComplete"
            :rowSelected="rowSelected" :dataBound="dataBound"
                :height="height" :enableHover='false' :toolbar="toolbar" :toolbarClick="clickHandler">
                <e-columns>
                    <e-column field='approvalCode' headerText='Ref ID' :filter='filter' ></e-column>
                    <e-column field='transaction_id' :template="printTemplate" headerText='Transaction ID' :filter='filter'></e-column>
                    <e-column field='amount' format="C0" headerText='Transaction AMT' :filter='filter' :width="180"></e-column>
                    <e-column field='total_amount' format="C0" headerText='Approved' :allowFiltering="false" :width="130"></e-column>
                    <e-column field='spent' format="C0" headerText='Spent' :allowFiltering="false" :width="130"></e-column>
                    <e-column field='amount_left' format="C0" headerText='Left' :allowFiltering="false" :width="130"></e-column>
                    <e-column field='status' :template="statusTemplate" headerText='Status' :filter='filter' :width="130"></e-column>
                    <e-column field='department.department_name' headerText='Department' :filter='filter'  ></e-column>
                    <e-column field='head.name' headerText='Head' :filter='filter'></e-column>
                    <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' :width="119" ></e-column>
                    <e-column field='labels[0].label_name' :allowFiltering="false" headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column>
                    <e-column field='user.user_name' headerText='Requested By'  :filter='filter' ></e-column>
                    <e-column field='transaction_type'  headerText='Type' :filter='filter' :isPrimaryKey='true'></e-column>
                    <e-column field='category' headerText='Category'  :filter='filter' ></e-column>
                    <e-column field='vendor.vendor_company' headerText='Vendor'  :filter='filter' ></e-column>
                    <e-column field='po_raised' headerText='PO Number'  :filter='filter' ></e-column>
                    <e-column field='createdAt' headerText='Created At' :visible="true" :format='formatOptions' type='date' :filter='filter2' ></e-column>
                </e-columns>
                <e-aggregates>
                    <e-aggregate :showChildSummary='false'>
                        <e-columns>
                            <e-column type="Sum" field="amount" :footerTemplate='footerMax'></e-column>
                            <e-column type="Custom" field="total_amount" :customAggregate="customAggregateFn" :footerTemplate='footerTTL'></e-column>
                            <e-column type="Custom" field="spent" :customAggregate="customAggregateFn1" :footerTemplate='footerSPT'></e-column>
                            <e-column type="Custom" field="amount_left" :customAggregate="customAggregateFn2" :footerTemplate='footerLFT'></e-column>
                        </e-columns>
                  </e-aggregate>
                </e-aggregates>
                </ejs-grid>
                 </div>
        </div>
        <ejs-dialog :buttons='alertDlgButtons' ref="alertDialog" v-bind:visible="false" :header='alertHeader' :animationSettings='animationSettings' :content='alertContent' :showCloseIcon='showCloseIcon' :target='target'
            :width='alertWidth'>
        </ejs-dialog>
          <b-modal :title="$ml.get('upload')" size="sm" class="modal-primary" v-model="browseModal" @ok="browseModal = false" hide-footer>
          <div id="modalTarget" class="control-section; position:relative" style="height:300px;">
              <ejs-uploader ref="uploadObj" id='defaultfileupload' :multiple = "false" :success="onUploadSuccess" :progress="onProgress" :failure="onUploadFailed"  :allowedExtensions="extensions" :asyncSettings="path" name="UploadFiles"></ejs-uploader>
            </div>
  </b-modal>
  <b-modal :title="$ml.get('print')" class="modal-primary" v-model="printModal" size="lg" @ok="printModal = false" hide-footer>
    <template slot="modal-header">
      <h5 v-text="$ml.get('print')"></h5>
      <div>
      <span v-if="printData[0]">Ref-ID : {{printData[0].text}} </span>
      <br>
      <span v-if="printData[1]">Category : {{printData[1].text}}</span>
    </div>
      <div>
      <b-button type="submit" size="sm" variant="primary" @click="printPDF"><i class="icon-printer font-2xl"></i></b-button>
      &nbsp;&nbsp;
      <b-button class="bg-transparent" style="border:none" type="submit" size="sm" @click="printModal = false" variant="secondary"><i class="icon-close font-2xl"></i></b-button>
    </div>
    </template>
    <div ref="pdf" id="print">
      <b-table striped hover :items="printData" thead-class="hidden_header">
      </b-table>
      <br>
      <b-table striped hover :items="log">
      </b-table>
    </div>
  </b-modal>
  <b-modal :title="$ml.get('paymentorder')" class="modal-primary" v-model="paymentModal" size="md" @ok="paymentModal = false" hide-footer>
    <b-form style="padding:3%" v-on:submit.prevent="paymentDone">
      <b-form-group>
        <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" :dataSource='paymentTypes' v-model="payment.payment_method" :placeholder="$ml.get('pholdpaymenttype')">
        </ejs-dropdownlist>
      </b-form-group>
      <b-form-group>
        <ejs-textbox v-model="payment.payment_ref_number" floatLabelType="Auto" :placeholder="$ml.get('paymentref')" required></ejs-textbox>
      </b-form-group>
      <b-form-group>
        <ejs-textbox v-model="payment.notes" floatLabelType="Auto" :placeholder="$ml.get('notes')"></ejs-textbox>
      </b-form-group>
      <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"></b-button>
    </b-form>
  </b-modal>
  <b-modal :title="$ml.get('filter')" class="modal-primary" v-model="filterModal" size="md" @ok="filterModal = false" hide-footer>
    <b-form style="padding:3%" v-on:submit.prevent="applyFilter">
      <b-form-group>
        <ejs-dropdownlist :showClearButton="true" :fields='fieldsformat' floatLabelType="Auto" :dataSource='fields' v-model="filterform.field" :placeholder="$ml.get('pholdfilterfield')">
        </ejs-dropdownlist>
      </b-form-group>
      <div v-if="filterform.field == 'department.department_name' ">
        <treeselect ref='treeselect1' :default-expand-level="10" v-model="filterform.value" :placeholder="$ml.get('pholddept')" :multiple="false" :options="department" />
      </div>
      <div v-if="filterform.field == 'head.name' ">
        <treeselect ref='treeselect1' :default-expand-level="10" :placeholder="$ml.get('pholdhead')" v-model="filterform.value" :multiple="false" :options="head" />
      </div>
      <div v-if="filterform.field == 'user.user_name'">
        <ejs-textbox v-model="filterform.value" floatLabelType="Auto" :placeholder="$ml.get('contains')"></ejs-textbox>
        <b-button style="float:right" type="submit" @click="filterform.value='ADMIN'" size="sm" variant="primary" v-text="$ml.get('filterbyadmin')"></b-button>
      </div>
      <div v-if="filterform.field == 'vendor.vendor_company' ">
        <ejs-dropdownlist :showClearButton="true" :fields='vendorfields' floatLabelType="Auto" :dataSource='vendors' v-model="filterform.value" :placeholder="$ml.get('pholdvendor')">
        </ejs-dropdownlist>
      </div>
      <div v-if="filterform.field == 'labels[0].label_name'">
        <ejs-dropdownlist :showClearButton="true" :fields='labelfields' floatLabelType="Auto" :dataSource='labels' v-model="filterform.value" :placeholder="$ml.get('pholdlabel')">
        </ejs-dropdownlist>
      </div>
      <div v-if="filterform.field == 'month' ">
        <ejs-dropdownlist :showClearButton="true" :fields='monthfields' floatLabelType="Auto" :dataSource='months' v-model="filterform.value" :placeholder="$ml.get('pholdmonth')">
        </ejs-dropdownlist>
      </div>
      <div v-if="filterform.field == 'createdAt' ">
        <vue-daterange-picker 
            double
            :start-date="startdate"
            format="DD/MM/YYYY"
            place-holders="dd/mm/yyyy"
            @get-dates="getDates"/>
      </div>
      <div v-if="filterform.field == 'transaction_type' || filterform.field == 'category' || filterform.field == 'transaction_id' || filterform.field == 'ref_id' || filterform.field == 'amount' || filterform.field == 'status' || filterform.field == 'po_raised'">
        <ejs-textbox v-model="filterform.value" floatLabelType="Auto" :placeholder="$ml.get('equalto')"></ejs-textbox>
      </div>
      <br>
      <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"></b-button>
    </b-form>
  </b-modal>
  </div>
 </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueDaterangePicker from 'vue-daterange-picker';
import apiUrl from '@/apiUrl'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import {Parser} from 'json2csv'
Vue.prototype.moment = moment
import Vue from 'vue'
import html2pdf from 'html2pdf.js'
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {
PdfExport,ExcelExport,Aggregate, Edit,Group, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, ForeignKey, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    import VueHtmlToPaper from 'vue-html-to-paper';
 
 
    Vue.use(VueHtmlToPaper);
    Vue.use(UploaderPlugin);
    
    Vue.use(PivotViewPlugin);
    Vue.use(GridPlugin);
    Vue.use(ToolbarPlugin);

    Vue.use(DialogPlugin);
    Vue.use(DropDownListPlugin);
    Vue.use(DatePickerPlugin);
    Vue.use(TextBoxPlugin)
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
  props:[
  'ref_id'],
    name: 'TransactionList',
    components: { Treeselect,VueDaterangePicker,ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        TextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList,
  Edit
    },
     provide: {
            grid: [Aggregate,ForeignKey,PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder,Group]
        },
    data: function () {
      return {
        foreign:[],
        filterform:{

        },
        fieldsformat: { text: 'name', value: 'ID' },
        monthfields: { text: 'name', value: 'value' },
        vendorfields: { text: 'vendor_company', value: '_id' },
        labelfields: { text: 'label_name', value: '_id' },
        filterModal:false,
        formatOptions: { type: 'date', format: 'dd/MM/yyyy' },
        groupOptions:{
          columns:['approvalCode'],
          showDropArea: false,
          captionTemplate: function() {
            return {
              template : Vue.component('captionTemplate',{
                template:`<div>{{data.headerText}} - {{data.key}}</div>`,
                data () {
                  return {
                    data:{}
                  }
                }
              })
            }
          }},
      footerMax: function () {
        return  { template : Vue.component('maxTemplate', {
            template: `<span>TRA: {{data.Sum}}</span>`,
            data () {return { data: {}};},
            mounted() {
                this.data.Sum = this.changeAmounttoFormat(this.data.Sum)
            },
            methods : {
                changeAmounttoFormat(amount) {
                    var x=amount;
                    x=x.toString();
                    var lastThree = x.substring(x.length-3);
                    var otherNumbers = x.substring(0,x.length-3);
                    if(otherNumbers != '')
                        lastThree = ',' + lastThree;
                    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                    return `₹ ${res}`
                },
            }
            })
          }
      },

      fields:[
      {name:'Ref ID',ID:'approvalCode'},
        {name:'Transaction ID',ID:'transaction_id'},
        {name:'Amount',ID:'amount'},
        {name:'Status',ID:'status'},
        {name:'Department',ID:'department.department_name'},
        {name:'Head',ID:'head.name'},
        {name:'Requested By',ID:'user.user_name'},
        {name:'Month',ID:'month'},
        {name:'Vendor',ID:'vendor.vendor_company'},
        {name:'Type',ID:'transaction_type'},
        {name:'Category',ID:'category'},
        {name:'Vendor',ID:'vendor.vendor_company'},
        {name:'PO Number',ID:'po_raised'},
        {name:"Created At",ID:"createdAt"}
      ],
      footerTTL: function (datasrc) {
        return  { template : Vue.component('sumTemplate', {
            template: `<span>TOT: {{data.Custom}}</span>`,
            data () {return { data: {}};},
            mounted() {
                this.data.Custom = this.changeAmounttoFormat(this.data.Custom)
            },
            methods : {
                changeAmounttoFormat(amount) {
                    var x=amount;
                    x=x.toString();
                    var lastThree = x.substring(x.length-3);
                    var otherNumbers = x.substring(0,x.length-3);
                    if(otherNumbers != '')
                        lastThree = ',' + lastThree;
                    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                    return `₹ ${res}`
                },
            }
            })
          }
      },
      footerSPT: function (datasrc) {
        return  { template : Vue.component('sumTemplate', {
            template: `<span>SPT: {{data.Custom}}</span>`,
            data () {return { data: {}};},
            mounted() {
                this.data.Custom = this.changeAmounttoFormat(this.data.Custom)
            },
            methods : {
                changeAmounttoFormat(amount) {
                    var x=amount;
                    x=x.toString();
                    var lastThree = x.substring(x.length-3);
                    var otherNumbers = x.substring(0,x.length-3);
                    if(otherNumbers != '')
                        lastThree = ',' + lastThree;
                    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                    return `₹ ${res}`
                },
            }
            })
          }
      },
      footerLFT: function (datasrc) {
        return  { template : Vue.component('sumTemplate', {
            template: `<span>LFT: {{data.Custom}}</span>`,
            data () {return { data: {}};},
            mounted() {
                this.data.Custom = this.changeAmounttoFormat(this.data.Custom)
            },
            methods : {
                changeAmounttoFormat(amount) {
                    var x=amount;
                    x=x.toString();
                    var lastThree = x.substring(x.length-3);
                    var otherNumbers = x.substring(0,x.length-3);
                    if(otherNumbers != '')
                        lastThree = ',' + lastThree;
                    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                    return `₹ ${res}`
                },
            }
            })
          }
      },
        printData:[],
        filterTemplate: function () {
              return {
                  template: Vue.component("filterTemplate", {
                      template: `<div>Filter</div>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
        addTemplate: function () {
              return {
                  template: Vue.component("addTemplate", {
                      template: `<b-badge id="label1" variant="success" ><i class="fa fa-plus"></i>&nbsp<span id="hide" v-text="$ml.get('add')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                printTemplate: function() {
                  return {
                    template: Vue.component("printTemplate", {
                      template : `<div style="line-height:4">{{data.transaction_id}}<b-button class="bg-transparent py-0 px-2" style="border:0px"><i class="icon-printer"></i></b-button>&nbsp;&nbsp;<span v-if="data.status == 'PAID'"><b-button class="bg-success py-0 px-2" style="border:0px"><b-badge id="label" variant="success" v-text="$ml.get('paid')"></b-badge></b-button></span><span v-if="data.status == 'UNPAID'"><b-button class="bg-transparent py-0 px-2" style="border:0px"><b-badge variant="warning" id="label" v-text="$ml.get('markaspaid')"></b-badge></b-button></span></div>`,
                      data()  {
                        return {
                          data: {}
                        };
                      }
                    
                    })
                  }
                },
                log:[],
                cancelTemplate: function () {
              return {
                  template: Vue.component("cancelTemplate", {
                      template: `<div><b-badge v-if="isPermitted" id="label1" variant="warning" ><i class="fa fa-trash-o"></i>&nbsp<span id="hide" v-text="$ml.get('cancel')"></span></b-badge></div>`,
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
                            if(Session.permission[i].module_name=="trans" && Session.permission[i].delete) {
                              this.isPermitted = true
                              break;
                            }
                          }
                        }
                        else{
                          this.isPermitted = true
                        }
                      }
                    })
                  }
                },
                deleteTemplate: function () {
              return {
                  template: Vue.component("deleteTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-trash-o"></i>&nbsp<span id="hide" v-text="$ml.get('delete')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                editTemplate: function () {
              return {
                  template: Vue.component("editTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-edit"></i>&nbsp<span id="hide" v-text="$ml.get('edit')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                uploadTemplate: function () {
              return {
                  template: Vue.component("uploadTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-upload"></i>&nbsp<span id="hide" v-text="$ml.get('upload')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                paymentTypes:['Cash','Cheque','NEFT','RTGS','IMPS','E-Wallet','UPI'],
                selectedTrans:{},
                printModal:false,
        browseModal:false,
      allowCalculatedField:true,
          complete:false,
          upload:false,
          extensions : '.csv',
          path: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
          },
          dropElement: '.control-fluid',
          change: (args) => {
            this.$refs.uploadObj.autoUpload = args.checked;
            this.$refs.uploadObj.clearAll();
        },
        changed: (args) => {
            this.$refs.uploadObj.sequentialUpload = args.checked;
            this.$refs.uploadObj.clearAll();
        },
        statusTemplate: function() {
          return {
            template:Vue.component('statusTemplate', {
                      template: `<div><b-badge style="font-weight:lighter;margin:3px" id="label" :variant="data.status">{{data.status}}</b-badge></div>`,
                  data: function() {
                          return {
                              data: {}
                          }
                      }
                    })
                  }
                },
          labels:[],
          vendors:[],
          months:[ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"}
        ],
        labelTemplate: function() {
          return {
            template:Vue.component('labelTemplate', {
                      template: `<div><b-badge style="font-weight:lighter;margin:3px" v-for="label in labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                              labels:[]
                          }
                      },
                      mounted() {
                        axios.get(`${apiUrl}`+`approvals/preApp/get/one/${this.data.approvalCode}`,{withCredentials:true}).then((res) => {
                          
                            if(res.data !=null) {
                              this.labels = res.data.labels
                            }
                        }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
                      }
                })
          }
        },
        filterqueries : [],
            dropdownValue: 'Top',
            datasrc: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true,mode:'Dialog'},
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
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
          loading:false,
           height : window.innerHeight*0.695,
          toolbar: [
          { prefixIcon: 'e-csvexport', text:"CSV Export Filtered", id: 'exportfiltered', align: 'Left' },
          { prefixIcon: 'e-csvexport', text:"CSV Export All", id: 'exportall', align: 'Left' },
          'Search',{ prefixIcon: 'e-excl-filter-icon', text:"Clear", id: 'clearfilter', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: {pageSize:true,pageSize:50, pageSizes: [50,100,200,300,400,500], pageCount: 4},
        ddData: [{ value: 1000, text: '1,000 Rows and 11 Columns' }, { value: 10000, text: '10,000 Rows and 11 Columns' }],
                ddValue: 1000,
                stTime: null,
                loadTime: null,
                dReady: false,
                showCloseIcon: false,
                isDataChanged: true,
                payment:{},
                paymentModal:false,
                filterOptions: {
                    type: 'Menu'
                },
                filterTID:false,
                startdate:null,
                filter: {
                    type: 'CheckBox'
                },
                filter2: {
                    type: 'Excel'
                },
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { persistSelection: true, type: 'Multiple' },
                sortOptions:{columns: [{field: 'approvalCode', direction: 'Descending'},{field: 'createdAt', direction: 'Descending'}],isMulti:true},
                department:[],
                head:[]
            };
        },
  methods: {
    customAggregateFn : function (data) {
      var total = 0
      var group = _.groupBy(this.datasrc,'approvalCode')
      for(var i=0;i<this.foreign.length;i++) {
        if(group[this.foreign[i].ref_id]) {
        total = total + group[this.foreign[i].ref_id][0].total_amount
      }
      }
      console.log(total)
      return total;
    },
    customAggregateFn1 : function (data) {
      var total = 0
      var group = _.groupBy(this.datasrc,'approvalCode')
      for(var i=0;i<this.foreign.length;i++) {
        if(group[this.foreign[i].ref_id]) {
        total = total + group[this.foreign[i].ref_id][0].spent
      }
      }
      console.log(total)
      return total;
    },
    applyFilter() {
      var link = `transaction/trans/filter/get`
      if(this.filterform.field == "department.department_name") {
        this.filterform.field = "department"
      }
      if(this.filterform.field == "status" && this.filterform.value=="UNPAID") {
        this.filterform.value = "Approved"
      }
      if(this.filterform.field == "head.name") {
        this.filterform.field = "head"
      }
      if(this.filterform.field == "vendor.vendor_company") {
        this.filterform.field = "vendor"
      }
      if(this.filterform.field == "user.user_name") {
        link = `transaction/trans/filter/user`
      }
      if(this.filterform.field == "user.user_name" && this.filterform.value=="ADMIN") {
        link = `transaction/trans/superuser/get`
      }
      console.log(this.filterform)
      api.get(`${apiUrl}approvals/preApp/get/all `).then((res) => {
            this.loading= true
            this.foreign = res.data
                    this.filterModal =false

            api.post(`${apiUrl}`+`${link}`,this.filterform).then((response) => {
                  console.log(response.data)
                    this.datasrc = response.data;
                    for(var i =0;i<this.datasrc.length;i++) {
                      this.datasrc[i].amount = parseInt(this.datasrc[i].amount)
                      this.datasrc[i].date = moment(this.datasrc[i].createdAt).format('L')
                      this.datasrc[i].time = moment(this.datasrc[i].createdAt).format('h:mm')
                      this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                      if(this.datasrc[i].user == null) {
                        this.datasrc[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.datasrc[i].status == "Approved") {
                        this.datasrc[i].status = "UNPAID"
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.datasrc[i].head == null) {
                        this.datasrc[i].head = {
                          name:"NONE"
                        }
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.datasrc[i].approvalCode == this.foreign[j].ref_id) {
                          this.datasrc[i].total_amount = this.foreign[j].amount
                          this.datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.datasrc[i].spent = this.datasrc[i].total_amount - this.datasrc[i].amount_left
                        }
                      }
                    }
                    this.filterform = {}
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
          })
    },
    getDates(args) {
      this.filterform.value = args
    },
    customAggregateFn2 : function (data) {
      var total = 0
      var group = _.groupBy(this.datasrc,'approvalCode')
      for(var i=0;i<this.foreign.length;i++) {
        if(group[this.foreign[i].ref_id]) {
        total = total + group[this.foreign[i].ref_id][0].amount_left
      }
      }
      console.log(total)
      return total;
    },
    sumofUnique(array) {
      var flags = [], output = [], l = array.length, i;
      for( i=0; i<l; i++) {
          if( flags[array[i].approvalCode]) continue;
          flags[array[i].approvalCode] = true;
          output.push(array[i]);
      }
      console.log(output)
      return 0
    },
    paymentDone() {
      if(this.payment.payment_method == null || this.payment.payment_method == "") {
        toast({
          type:VueNotifications.types.warn,
          title:"Please Select a Payment Mode"
        })
      }
      else {
        api.post(`${apiUrl}payments/paymentorder/create`,this.payment).then((res) => {
          api.put(`${apiUrl}transaction/trans/edit/${this.payment.transaction_id}`,{status:"PAID"}).then((trans) => {
            api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
                    this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                    this.datasrc = response.data;
                    this.paymentModal = false
                    for(var i =0;i<this.datasrc.length;i++) {
                      this.datasrc[i].amount = parseInt(this.datasrc[i].amount)
                      this.datasrc[i].date = moment(this.datasrc[i].createdAt).format('L')
                      this.datasrc[i].time = moment(this.datasrc[i].createdAt).format('h:mm')
                      this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                      if(this.datasrc[i].user == null) {
                        this.datasrc[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.datasrc[i].status == "Approved") {
                        this.datasrc[i].status = "UNPAID"
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.datasrc[i].head == null) {
                        this.datasrc[i].head = {
                          name:"NONE"
                        }
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.datasrc[i].approvalCode == this.foreign[j].ref_id) {
                          this.datasrc[i].total_amount = this.foreign[j].amount
                          this.datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.datasrc[i].spent = this.datasrc[i].total_amount - this.datasrc[i].amount_left
                        }
                      }
                    }
                    
                })
          })
          })
          
        }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
      }
    },
    printPDF() {
      this.$htmlToPaper('print');
      // var pdf = new html2pdf()
      // var source = this.$refs.pdf
      // var opt = {
      //   margin:       [.5,.5,.5,.5],
      //   filename:     `${this.selectedTrans.approvalCode}.pdf`,
      //   html2canvas:  { scale: 2 },
      //   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      // };
      // html2pdf().set(opt).from(source).output("dataurlnewwindow")
    },
    onProgress(args) {
      },
       onUploadSuccess: function (args) {
          var formData = new FormData();
          formData.append('csv',args.file.rawFile);
          this.upload = true
          api.post(`${apiUrl}`+`import/importTrans/transactions/all`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                    this.datasrc = response.data;
                })
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
          this.browseModal = false
        },
        onUploadFailed: function (args) {
        },
        onFileRemove: function (args) {
            args.postRawFile = false;
        },
        checkField(field) {
          console.log(field)
          for(var i=0;i<this.filterqueries.length;i++) {
            if(this.filterqueries[i].field == field) {
              return true
            }
          }
          return false
        },
            actionBegin: function(args) {
              console.log(args)
              if(args.requestType == "filterchoicerequest") {
                this.filterform.field = args.query.distincts[0]
                this.filterModal = true
                args.filterModel.dialogObj.hide()
              }
              
            },
            actionComplete(args) {
              this.filterqueries=[]
              console.log(args)
              if(args.requestType=="filtering") {
                if(args.columns) {
                for(var i=0;i<args.columns.length;i++) {
                    if(args.columns[i].ignoreAccent==false) {
                      this.filterqueries.push({field:args.columns[i].properties.field,operators:args.columns[i].properties.operator,value:args.columns[i].properties.value})
                    }
                }
              }
                console.log(this.filterqueries)
              }
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
                if (args.item.text === 'CSV Export Filtered') {
                  var datasrc = this.datasrc
                  // api.get(`${apiUrl}transaction/trans/get/all`).then((res) => {
                  //   datasrc = res.data
                  //   for(var i=0;i<datasrc.length;i++) {
                  //     datasrc[i].date = moment(datasrc[i].createdAt).format('L')
                  //     datasrc[i].time = moment(datasrc[i].createdAt).format('h:mm')
                  //     for(var j=0;j<this.foreign.length;j++) {
                  //       if(datasrc[i].approvalCode == this.foreign[j].ref_id) {
                  //         datasrc[i].total_amount = this.foreign[j].amount
                  //         datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                  //         datasrc[i].spent = datasrc[i].total_amount - datasrc[i].amount_left
                  //       }
                  //     }
                  // //   }
                  //   datasrc = this.convertAmount(datasrc)
                       const fields = [{
                        label: 'Approval Reference ID',
                        value: 'approvalCode'
                      },{
                        label: 'Transaction ID',
                        value: 'transaction_id'
                      },
                      {
                        label: 'Amount',
                        value: 'amount'
                      },
                      {
                        label: 'Approved',
                        value: 'total_amount'
                      },
                      {
                        label: 'Spent',
                        value: 'spent'
                      },
                      {
                        label: 'Left',
                        value: 'amount_left'
                      },
                      {
                        label: 'Status',
                        value: 'status'
                      },
                      {
                        label: 'Department',
                        value: 'department.department_name'
                      },
                      {
                        label: 'Head',
                        value: 'head.name'
                      },
                      {
                        label: 'Month',
                        value: 'month'
                      },
                      {
                        label: 'Label 1',
                        value: 'labels[0].label_name'
                      },
                      {
                        label: 'Label 2',
                        value: 'labels[1].label_name'
                      },
                      {
                        label: 'Requested By',
                        value: 'user.user_name'
                      },
                      {
                        label: 'Transaction Type',
                        value: 'transaction_type'
                      },
                      {
                        label: 'Category',
                        value: 'category'
                      },
                      {
                        label: 'Vendor',
                        value: 'vendor.name'
                      },
                      {
                        label: 'Purchase Order',
                        value: 'po_raised'
                      },
                      {
                        label: 'Date',
                        value: 'date'
                      },
                      {
                        label: 'Time',
                        value: 'time'
                      }];
                    
                    const json2csvParser = new Parser({ fields });
                    const csv = json2csvParser.parse(datasrc);
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'transactions.csv';
                    hiddenElement.click();
                  // })
                 
                    // this.$refs.overviewgrid.csvExport()
                }
                if (args.item.text === 'CSV Export All') {
                  var datasrc = []
                  api.get(`${apiUrl}transaction/trans/get/all`).then((res) => {
                    datasrc = res.data
                    for(var i=0;i<datasrc.length;i++) {
                      datasrc[i].amount = parseInt(datasrc[i].amount)
                      datasrc[i].date = moment(datasrc[i].createdAt).format('L')
                      datasrc[i].time = moment(datasrc[i].createdAt).format('h:mm')
                      for(var j=0;j<this.foreign.length;j++) {
                        if(datasrc[i].approvalCode == this.foreign[j].ref_id) {
                          datasrc[i].total_amount = this.foreign[j].amount
                          datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          datasrc[i].spent = datasrc[i].total_amount - datasrc[i].amount_left
                        }
                      }
                    }
                    datasrc = this.convertAmount(datasrc)
                       const fields = [{
                        label: 'Approval Reference ID',
                        value: 'approvalCode'
                      },{
                        label: 'Transaction ID',
                        value: 'transaction_id'
                      },
                      {
                        label: 'Amount',
                        value: 'amount'
                      },
                      {
                        label: 'Approved',
                        value: 'total_amount'
                      },
                      {
                        label: 'Spent',
                        value: 'spent'
                      },
                      {
                        label: 'Left',
                        value: 'amount_left'
                      },
                      {
                        label: 'Status',
                        value: 'status'
                      },
                      {
                        label: 'Department',
                        value: 'department.department_name'
                      },
                      {
                        label: 'Head',
                        value: 'head.name'
                      },
                      {
                        label: 'Month',
                        value: 'month'
                      },
                      {
                        label: 'Label 1',
                        value: 'labels[0].label_name'
                      },
                      {
                        label: 'Label 2',
                        value: 'labels[1].label_name'
                      },
                      {
                        label: 'Requested By',
                        value: 'user.user_name'
                      },
                      {
                        label: 'Transaction Type',
                        value: 'transaction_type'
                      },
                      {
                        label: 'Category',
                        value: 'category'
                      },
                      {
                        label: 'Vendor',
                        value: 'vendor.name'
                      },
                      {
                        label: 'Purchase Order',
                        value: 'po_raised'
                      },
                      {
                        label: 'Date',
                        value: 'date'
                      },
                      {
                        label: 'Time',
                        value: 'time'
                      }];
                    
                    const json2csvParser = new Parser({ fields });
                    const csv = json2csvParser.parse(datasrc);
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'transactions.csv';
                    hiddenElement.click();
                  })
                 
                    // this.$refs.overviewgrid.csvExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
                if (args.item.id === 'clearfilter') {
                  this.$refs.overviewgrid.clearFiltering()
                    api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
                      this.loading= true
                      this.foreign = res.data
                      api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                            console.log(response.data)
                              this.datasrc = response.data;
                              for(var i =0;i<this.datasrc.length;i++) {
                                this.datasrc[i].amount = parseInt(this.datasrc[i].amount)
                                this.datasrc[i].date = moment(this.datasrc[i].createdAt).format('L')
                                this.datasrc[i].time = moment(this.datasrc[i].createdAt).format('h:mm')
                                this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                                if(this.datasrc[i].user == null) {
                                  this.datasrc[i].user = {
                                    user_name:"ADMIN"
                                  }
                                }
                                if(this.datasrc[i].status == "Approved") {
                                  this.datasrc[i].status = "UNPAID"
                                }
                                if(this.datasrc[i].department == null) {
                                  this.datasrc[i].department = {
                                    department_name:"NONE"
                                  }
                                }
                                if(this.datasrc[i].head == null) {
                                  this.datasrc[i].head = {
                                    name:"NONE"
                                  }
                                }
                                for(var j=0;j<this.foreign.length;j++) {
                                  if(this.datasrc[i].approvalCode == this.foreign[j].ref_id) {
                                    this.datasrc[i].total_amount = this.foreign[j].amount
                                    this.datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                                    this.datasrc[i].spent = this.datasrc[i].total_amount - this.datasrc[i].amount_left
                                  }
                                }
                              }
                              
                          }).catch((err)=> {
                  toast({
                    type: VueNotifications.types.error,
                    title: 'Network Error'
                  })
                })
                    })
                }
            },
            dataBound(args) {
              this.loading= false
            },
            addEditHandler(args) {
               var selected = this.$refs.overviewgrid.getSelectedRecords()
               var deleteperm = false
               var Session = JSON.parse(localStorage.session_key)
                        if(Session.user) {
                          for(var i=0;i<Session.permission.length;i++) {
                            if(Session.permission[i].module_name=="trans" && Session.permission[i].delete) {
                              deleteperm = true
                              break;
                            }
                          }
                        }
                        else{
                          deleteperm = true
                        }
                if(args.item.id == "add") {
                    this.$router.push('/transaction/add');
                }
                if(args.item.id=="upload") {
                  this.browseModal = true
                }
                if(args.item.id=="cancel") {
                  if(selected.length>0) {
                    if(deleteperm) {
                      if(selected[0].status == "PAID") {
                        toast({
                          type: VueNotifications.types.warn,
                          title: 'Already Paid',
                          message:"Paid Transactions cannot be Cancelled"
                        })
                      }
                      else{
                        api.put(`${apiUrl}transaction/trans/cancel/${selected[0]._id}`).then((res) => {
                          if(res.data) {
                            toast({
                              type: VueNotifications.types.success,
                              title: 'Transaction Cancelled'
                            })
                            api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
                              this.foreign = res.data
                            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                              this.datasrc = response.data;
                              for(var i =0;i<this.datasrc.length;i++) {
                                this.datasrc[i].amount = parseInt(this.datasrc[i].amount)
                                this.datasrc[i].date = moment(this.datasrc[i].createdAt).format('L')
                                this.datasrc[i].time = moment(this.datasrc[i].createdAt).format('h:mm')
                                this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                                if(this.datasrc[i].user == null) {
                                  this.datasrc[i].user = {
                                    user_name:"ADMIN"
                                  }
                                }
                                if(this.datasrc[i].status == "Approved") {
                                  this.datasrc[i].status = "UNPAID"
                                }
                                if(this.datasrc[i].department == null) {
                                  this.datasrc[i].department = {
                                    department_name:"NONE"
                                  }
                                }
                                if(this.datasrc[i].head == null) {
                                  this.datasrc[i].head = {
                                    name:"NONE"
                                  }
                                }
                                for(var j=0;j<this.foreign.length;j++) {
                                  if(this.datasrc[i].approvalCode == this.foreign[j].ref_id) {
                                    this.datasrc[i].total_amount = this.foreign[j].amount
                                    this.datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                                    this.datasrc[i].spent = this.datasrc[i].total_amount - this.datasrc[i].amount_left
                                  }
                                }
                              }
                              
                          })
                          })
                          }

                        })
                      }
                    }
                    else{
                      console.log("Not Permitted")
                    }
                  }
                }
                if(args.item.id == "edit") {
                    if(selected.length>0) {
                        this.$router.push('/transaction/edit/'+`${selected[0]._id}`);
                    }
                }
                if(args.item.id == "delete") {
                    var selected = this.$refs.overviewgrid.getSelectedRecords()
                    if(selected.length>0) {
                        axios.delete(`${apiUrl}`+`transaction/trans/delete/`+`${selected[0]._id}`,{withCredentials:true}).then((response) => {
                                axios.get(`${apiUrl}`+`transaction/trans/get/all`,{withCredentials:true}).then((response) => {
                            this.datasrc = response.data;
                        })
                    }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
                    }
                }
            },
            convertAmount(list) {
              for(var i=0;i<list.length;i++) {
                list[i].total_amount = this.AmountToString(list[i].total_amount)
                list[i].spent = this.AmountToString(list[i].spent)
                list[i].amount_left = this.AmountToString(list[i].amount_left)
              } 
              return list
            },
            AmountToString(amount) {
              var x=amount;
              x=x.toString();
              var lastThree = x.substring(x.length-3);
              var otherNumbers = x.substring(0,x.length-3);
              if(otherNumbers != '')
                  lastThree = ',' + lastThree;
              var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
              return res
            },
            list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined  && this.checkExistDept(node.parent_department)) {
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
      checkExistDept(node) {
        for (var i=0; i < this.dept.length; i++) {
            if (this.dept[i]._id == node)
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
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
                rowSelected(args) {
                  if(args.target.outerHTML == `<span id="label" class="badge badge-warning">Mark As Paid</span>`) {
                    this.paymentModal = true
                    this.payment.transaction_id = args.data._id
                  }
                  if(args.target.outerHTML == `<i class="icon-printer"></i>`) {
                    this.printModal = true
                    var new_val =[]
                    this.log = []
                    this.selectedTrans= args.data
                    if(args.data.approvalCode)
                      new_val.push({name:"Reference ID",text:args.data.approvalCode})
                    if(args.data.category)
                      new_val.push({name:"Category",text:args.data.category})
                    if(args.data.bill_number)
                      new_val.push({name:"Bill Number",text:args.data.bill_number})
                    if(args.data.amount)
                      new_val.push({name:"Amount",text:args.data.amount})
                    if(args.data.department.department_name)
                    new_val.push({name:"Department",text:args.data.department.department_name})
                    if(args.data.head.name)
                      new_val.push({name:"Head",text:args.data.head.name})
                    if(args.data.month)
                      new_val.push({name:"Month",text:`${parseInt(args.data.month)+1}`})
                    if(args.data.labels)
                      new_val.push({name:"Labels",text:args.data.labels})
                    if(args.data.user.user_name)
                      new_val.push({name:"Requested By",text:args.data.user.user_name})
                    if(args.data.type)
                      new_val.push({name:"Type",text:args.data.type})
                    if(args.data.vendor)
                      new_val.push({name:"Vendor",text:args.data.vendor.vendor_company})
                    if(args.data.po_raised)
                      new_val.push({name:"Purchase Order",text:args.data.po_raised.purchase_id})
                    this.printData = new_val
                    api.get(`${apiUrl}/approvals/preApp/get/one/${args.data.approvalCode}`).then((res) =>{
                      api.get(`${apiUrl}approvals/preApp/timeline/get/${res.data._id}`).then((resp) =>{
                        for(var i=resp.data.log.length-1;i>=0;i--) {
                          this.log.push({Approval_Log:resp.data.log[i].event,Time:moment(resp.data.log[i].date).format('MMM Do YYYY, h:mm a')})
                        }
                      })
                    }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
                  }
                  
                }
            
        },
        async mounted () { 
          console.log(this.ref_id);
          api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
            this.loading= true
            this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                  console.log(response.data)
                    this.datasrc = response.data;
                    for(var i =0;i<this.datasrc.length;i++) {
                      this.datasrc[i].amount = parseInt(this.datasrc[i].amount)
                      this.datasrc[i].date = moment(this.datasrc[i].createdAt).format('L')
                      this.datasrc[i].time = moment(this.datasrc[i].createdAt).format('h:mm')
                      this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                      if(this.datasrc[i].user == null) {
                        this.datasrc[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.datasrc[i].status == "Approved") {
                        this.datasrc[i].status = "UNPAID"
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.datasrc[i].head == null) {
                        this.datasrc[i].head = {
                          name:"NONE"
                        }
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.datasrc[i].approvalCode == this.foreign[j].ref_id) {
                          this.datasrc[i].total_amount = this.foreign[j].amount
                          this.datasrc[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.datasrc[i].spent = this.datasrc[i].total_amount - this.datasrc[i].amount_left
                        }
                      }
                    }
                    
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
          })
          // Department Tree
      axios.get(`${apiUrl}`+`dropdown/department/get/all`,{withCredentials:true}).then((res) => {
        this.dept = JSON.parse(JSON.stringify(res.data))
        this.department = this.list_to_tree_dept(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      // Head Tree
      axios.get(`${apiUrl}`+`head/head/get`,{withCredentials:true}).then((res) => {
        console.log(res.data);
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

      axios.get(`${apiUrl}`+`label/label/find/by/Approval`,{withCredentials:true}).then((res) => {
        this.labels = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      axios.get(`${apiUrl}`+`vendor/vendor/get/all`,{withCredentials:true}).then((res) => {
        this.vendors = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })      
      var year = new Date().getFullYear()
      this.startdate  = new Date(`04/01/${year}`)
            
        }
};
</script>


<style>


#label {
    font-size: 12px;
    font-weight:lighter;
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
  .badge-PAID{
    background-color:lightgreen;
    color:black;
  }
  .badge-UNPAID{
    background-color:yellow;
    color:black;
  }
  .badge-CANCELLED{
    background-color:red;
    color:white;
  }
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
.e-spinner-pane.e-spin-show {
             display: none;
        }
</style>
<style src="spinkit/scss/spinkit.scss" lang="scss" />

<style scoped>
#loader {
    height: 0;
    position: absolute;
    left: 33% !important;
    top: -8%;
}
      .sk-fading-circle {
    margin: 20px auto;
    width: 20px;
    height: 20px;
    position: relative;
    z-index:1001;
}
  .sk-three-bounce {
    height: 20px;
  }
</style>