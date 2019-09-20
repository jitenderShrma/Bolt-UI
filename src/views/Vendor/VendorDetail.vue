<template>
  <div class="animated slideInLeft" style="animation-duration:100ms">
  <b-row class="py-2 px-2">
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalapproved}}</h4>
                    <p v-text="$ml.get('totalapproved')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalpaid}}</h4>
                    <p v-text="$ml.get('totalpaid')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalunpaid}}</h4>
                    <p v-text="$ml.get('totalbalance')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalpo}}</h4>
                    <p v-text="$ml.get('totalnopo')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
            </b-row>
            <ejs-grid ref='overviewgrid' :allowGrouping='true' :groupSettings='groupOptions' :rowHeight='rowHeight' :allowReordering='true' :allowResizing='true'  id='overviewgrid' :recordDoubleClick="beginEdit" :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="vendortransactions" :showColumnChooser="true" :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler" :rowSelected="rowSelected" :sortSettings='sortOptions'
                :height="height" :enableHover='false'>
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
                    <e-column field='vendor.vendor_company' headerText='Vendor'  :allowFiltering="false" ></e-column>
                    <e-column field='po_raised' :template="poTemplate" headerText='Purchase Order' :width="119" :filter='filter'></e-column>
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
                <b-modal size="md" :title="$ml.get('uploadpo')" class="modal-primary" v-model="uploadModal" @ok="uploadModal = false" hide-footer>
                  <div id="modalTarget" class="control-section; position:relative" style="height:auto;">
                    <ejs-uploader :showFileList="false" ref="uploadObj" :uploading="onUploadSuccess" :created="created" :autoUpload="false" :sequentialUpload="true" :multiple = "true" :selected="filelist" :allowedExtensions="extensions" :asyncSettings="path" id="UploadFiles" name="UploadFiles"></ejs-uploader>
                    <div v-for="(run,i) in initialfiles" :key="i">
                      <b-row>
                      <b-col sm="6">
                      <span style="overflow-wrap: break-word;">{{initialfiles[i].name}}</span>
                    </b-col>
                    <b-col sm="4">
                      <span v-if="initialfiles[i].path" style="cursor:pointer" @click="viewPreview(`${i}`)"><i class="icon-eye"></i>/<i class="icon-cloud-download"></i></span>
                      <span v-else v-text="$ml.get('notuploaded')"></span>
                    </b-col>
                    <b-col sm="2">
                      <span style="cursor:pointer" @click="deleteFiles(`${i}`)"><i class="fa fa-trash-o"></i></span>
                    </b-col>
                  </b-row>
                    </div>
                  </div>
                  <br>
                  <b-button style="float:right" type="submit" @click="uploadPO" size="sm" variant="primary" v-text="$ml.get('uploadpo')"></b-button>
                </b-modal>
                <b-modal size="sm" :title="$ml.get('raisepo')" class="modal-primary" v-model="raisePO" @ok="raisePO = false" hide-footer>
                    <b-form v-on:submit.prevent = "raisePOTrans">
                    <ejs-textbox v-model="input.po_raised" floatLabelType="Auto" :placeholder="$ml.get('pholdpoid')" required></ejs-textbox>
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('raisepo')"></b-button>
                  </b-form>
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
  <b-modal :title="$ml.get('uploadbill') + ' for ' +  selectedTrans.transaction_id" class="modal-primary" v-model="uploadBill" size="md" @ok="uploadBill = false" hide-footer>
    <b-form style="padding:3%" v-on:submit.prevent="sendUploadBill">
      <b-form-group>
        <label v-text="$ml.get('billcopy')"></label>
        <b-form-file v-model="billupload.bill_file" accept="*" id="BillFile"></b-form-file>
      </b-form-group>
      <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"></b-button>
    </b-form>
  </b-modal>
              </div>
              
</template>
<script>
  import apiUrl from '@/apiUrl'
  import axios from 'axios'
  import moment from 'moment'
  import Vue from 'vue'
  import {Parser} from 'json2csv'

  import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
  Vue.use(UploaderPlugin);
  import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
  import {Aggregate,PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
  import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '../../shared/classes'
  import toggleClasses from '../../shared/toggle-classes'
  import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
  import AsideToggler from '../../shared/AsideToggler'
  import { Switch as cSwitch } from '@coreui/vue'
  import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr' 
  import DefaultToggler from '../../shared/AsideTogglerClose'
  Vue.use(GridPlugin);
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
    Vue.use(TextBoxPlugin)

Vue.use(VueNotifications, options)
  export default {
    name:"vendorDetail",
    components :{
      GridPlugin, AsideToggler, AppHeader, DefaultToggler, AppSidebar, AppAside, TheFooter, Breadcrumb, SidebarForm, SidebarFooter, SidebarToggler, SidebarHeader, SidebarNav, cSwitch, SidebarMinimizer
    },
    provide: {
            grid: [Aggregate,PdfExport,ExcelExport,Edit,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder,]
        },
    data: function() {
      return {
        formatOptions: { type: 'date', format: 'dd/MM/yyyy' },
        dateTemplate: function () {
          return {
            template : Vue.component('dateTemplate', {
              template : `<div>{{data.createdAt | moment("MMM Do YY, h:mm a") }}</div>`,
              data:function () {
                return {
                  data:{}
                }
              }
            })
          }
        },
        statusTemplate: function () {
              return {
                  template: Vue.component('statusTemplate', {
                      template: `<b-badge id="label" :variant="data.status">{{data.status}}</b-badge>`,
                      data: function() {
                        return {
                          data:{}
                        }
                      }
                    })
                }
              },
              printTemplate: function() {
                  return {
                    template: Vue.component("printTemplate", {
                      template : `<ejs-tooltip ref="tooltip" position="TopCenter" :content='content' :beforeRender="beforeRender"><div>{{data.transaction_id}}&nbsp;&nbsp;&nbsp;&nbsp;<span style="cursor:pointer" title="Print Transaction"><i class="icon-printer"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span title="View/Download Bill" style="cursor:pointer" v-if="data.bill_file_path"><i class="fa fa-clipboard"></i></span><span style="cursor:pointer" title="Upload Bill" v-else><i class="icon-cloud-upload"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span title="Transaction Paid" v-if="data.status == 'PAID'"><span style="cursor:pointer"><b-badge id="label" variant="success" v-text="$ml.get('paid')"></b-badge></span></span><span title="Pay for Transaction" v-if="data.status == 'UNPAID'"><span style="cursor:pointer"><b-badge variant="warning" id="label" v-text="$ml.get('markaspaid')"></b-badge></span></span></div></ejs-tooltip>`,
                      data()  {
                        return {
                          data: {},
                          content:'Loading...'
                        };
                      },
                      methods:{
                        beforeRender(args) {
                          var department=null
                          var head=null
                          var user=null
                          var vendor=null
                          if(this.data.department) {
                            department = this.data.department.department_name
                          }
                          if(this.data.head) {
                            head = this.data.head.name
                          }
                          if(this.data.user) {
                            user = this.data.user.user_name
                          }
                          if(this.data.vendor) {
                            vendor = this.data.vendor.vendor_company
                          }
                          this.content = `<span>Department : ${department}<br>Head : ${head}<br>Date : ${moment(this.data.date).format('L')}<br>Requested By : ${user}<br>Month : ${moment().month(parseInt(this.data.month)).format('MMM')}<br>Type : ${this.data.transaction_type}<br>Category : ${this.data.category}<br>Vendor : ${vendor}<br>PO Number: ${this.data.po_raised}<span>`
                        }
                      }
                    
                    })
                  }
                },
                paymentModal:false,
                payment:{},
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
          printModal:false,
          printData:{},
          log:[],
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
          paymentTypes:['Cash','Cheque','NEFT','RTGS','IMPS','E-Wallet','UPI'],
        poTemplate: function () {
              return {
                  template: Vue.component('poTemplate', {
                      template: `<div>{{data.po_raised}}<span id="addbutton" style="float:right;cursor:pointer" v-if="data.po_raised == null || data.po_raised ==''"><i class="icon-plus"></i></span></div>`,
                      data: function() {
                        return {
                          data:{}
                        }
                      }
                    })
                }
              },    
              po:{},
              po_exists:false,
        filterOptions: {
                    type: 'Menu'
                },
                selectedTrans:{},
                vendortransactions:[],
                vendor:{},
                data:[],
                filter: {
                    type: 'CheckBox'
                },
                rowHeight:30,
           height : window.innerHeight - 270,
                totalapproved:0,
      totalpaid:0,
      pos:[],
      loading:false,
      foreign:[],
      initialfiles:[],
      input:{},
      uploadModal:false,
      totalunpaid:0,
      totalpo:0,
      transaction:{},
      extensions : '*',
      raisePO:false,
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
        uploadBill:false,
          path: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
          },
          billupload:{},
          filter2: {
                    type: 'Excel'
                },
                sortOptions:{columns: [{field: 'approvalCode', direction: 'Descending'},{field: 'createdAt', direction: 'Descending'}],isMulti:true},
        toolbar: [
        'CsvExport','ColumnChooser',
        'Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
            files:[],
            buttonLM: function () {
              return {
                  template: Vue.component('buttonLM', {
                      template: `<div v-if="data.po_raised">{{data.po_raised}}</div>`,
                      components:{
                        AsideToggler,
                        AppHeader,
                        AppSidebar,
                        AppAside,
                        TheFooter,
                        Breadcrumb,
                        SidebarForm,
                        SidebarFooter,
                        SidebarToggler,
                        SidebarHeader,
                        SidebarNav,
                        SidebarMinimizer
                      },
                  data: function() {
                          return {
                              data: {},
                          }
                      },
                  methods: {
                    gotoPage() {
                      console.log("aside on")
                    }
                  }
                })
              }
          },
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
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      if(this.$route.params.id) {
      api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
            this.loading= true
            this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/vendordetail/${this.$route.params.id}`).then((response) => {
                    this.vendortransactions = response.data;
                    this.paidtransactions = []
                    this.unpaidtransactions = []
                    this.totalapproved = 0 
                    this.pos=[]
                    for(var i =0;i<this.vendortransactions.length;i++) {
                      this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].amount = parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].date = moment(this.vendortransactions[i].createdAt).format('L')
                      this.vendortransactions[i].time = moment(this.vendortransactions[i].createdAt).format('h:mm')
                      this.vendortransactions[i].createdAt = new Date(this.vendortransactions[i].createdAt)
                      if(this.vendortransactions[i].user == null) {
                        this.vendortransactions[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.vendortransactions[i].status == "Approved") {
                        this.vendortransactions[i].status = "UNPAID"
                      }
                      if(this.vendortransactions[i].department == null) {
                        this.vendortransactions[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].head == null) {
                        this.vendortransactions[i].head = {
                          name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].po_raised) {
                        if(this.checkExist(this.vendortransactions[i].po_raised,i)) {
                         this.pos.push(this.vendortransactions[i].po_raised)
                        }
                      }
                      if(this.vendortransactions[i].status == "PAID") {
                        this.paidtransactions.push(this.vendortransactions[i])
                      }
                      else {
                        this.vendortransactions[i].status = "UNPAID"
                        this.unpaidtransactions.push(this.vendortransactions[i])
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.vendortransactions[i].approvalCode == this.foreign[j].ref_id) {
                          this.vendortransactions[i].total_amount = this.foreign[j].amount
                          this.vendortransactions[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.vendortransactions[i].spent = this.vendortransactions[i].total_amount - this.vendortransactions[i].amount_left
                        }
                      }
                      this.totalpaid = 0
                      for(var j=0;j<this.paidtransactions.length;j++) {
                        this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
                      }
                      this.totalunpaid = 0
                      for(var k=0;k<this.unpaidtransactions.length;k++) {
                        this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
                      }
                    }
                    this.totalpo = this.pos.length
                    this.totalpaid = this.convertAmount(this.totalpaid)
                    this.totalunpaid = this.convertAmount(this.totalunpaid)
                    this.totalapproved = this.convertAmount(this.totalapproved)
                    console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
                    
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
          })
        
      })
    }
    },
    methods:{
      customAggregateFn : function (data) {
      var total = 0
      var group = _.groupBy(this.vendortransactions,'approvalCode')
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
      var group = _.groupBy(this.vendortransactions,'approvalCode')
      for(var i=0;i<this.foreign.length;i++) {
        if(group[this.foreign[i].ref_id]) {
        total = total + group[this.foreign[i].ref_id][0].spent
      }
      }
      console.log(total)
      return total;
    },
    customAggregateFn2 : function (data) {
      var total = 0
      var group = _.groupBy(this.vendortransactions,'approvalCode')
      for(var i=0;i<this.foreign.length;i++) {
        if(group[this.foreign[i].ref_id]) {
        total = total + group[this.foreign[i].ref_id][0].amount_left
      }
      }
      console.log(total)
      return total;
    },
      downloadFile(i) {
        var api = apiUrl.split('/api')
        console.log(api[0])
        window.open(`${api[0]}/${this.initialfiles[i].path}`, 'download');
      },
      viewPreview(i) {
        console.log(i)
        var api = apiUrl.split('/api')
        console.log(api[0])
        window.open(`${api[0]}/${this.initialfiles[i].path}`, '_blank');
      },
      deleteFiles(i) {
      console.log(this.initialfiles.splice(i,1))
    },
      filelist(args) {
        var x = window.document.getElementById("UploadFiles");
        for(var i=0;i<x.files.length;i++) {
          this.initialfiles.push(x.files[i])
        }
      },
      created(args){
        console.log(this.$refs.uploadObj.getFilesData())
      },
      actionComplete(args) {
        this.files = args.file
      },
      raisePOTrans() {
        var formdata = new FormData()
        formdata.append('po_raised',this.input.po_raised)
        api.put(`${apiUrl}transaction/trans/edit/${this.transaction._id}`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
          api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
            this.loading= true
            this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/vendordetail/${this.$route.params.id}`).then((response) => {
                    this.vendortransactions = response.data;
                    this.paidtransactions = []
                    this.unpaidtransactions = []
                    this.totalapproved = 0 
                    this.pos=[]
                    for(var i =0;i<this.vendortransactions.length;i++) {
                      this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].amount = parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].date = moment(this.vendortransactions[i].createdAt).format('L')
                      this.vendortransactions[i].time = moment(this.vendortransactions[i].createdAt).format('h:mm')
                      this.vendortransactions[i].createdAt = new Date(this.vendortransactions[i].createdAt)
                      if(this.vendortransactions[i].user == null) {
                        this.vendortransactions[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.vendortransactions[i].status == "Approved") {
                        this.vendortransactions[i].status = "UNPAID"
                      }
                      if(this.vendortransactions[i].department == null) {
                        this.vendortransactions[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].head == null) {
                        this.vendortransactions[i].head = {
                          name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].po_raised) {
                        if(this.checkExist(this.vendortransactions[i].po_raised,i)) {
                         this.pos.push(this.vendortransactions[i].po_raised)
                        }
                      }
                      if(this.vendortransactions[i].status == "PAID") {
                        this.paidtransactions.push(this.vendortransactions[i])
                      }
                      else {
                        this.vendortransactions[i].status = "UNPAID"
                        this.unpaidtransactions.push(this.vendortransactions[i])
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.vendortransactions[i].approvalCode == this.foreign[j].ref_id) {
                          this.vendortransactions[i].total_amount = this.foreign[j].amount
                          this.vendortransactions[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.vendortransactions[i].spent = this.vendortransactions[i].total_amount - this.vendortransactions[i].amount_left
                        }
                      }
                      this.totalpaid = 0
                      for(var j=0;j<this.paidtransactions.length;j++) {
                        this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
                      }
                      this.totalunpaid = 0
                      for(var k=0;k<this.unpaidtransactions.length;k++) {
                        this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
                      }
                    }
                    this.totalpo = this.pos.length
                    this.totalpaid = this.convertAmount(this.totalpaid)
                    this.totalunpaid = this.convertAmount(this.totalunpaid)
                    this.totalapproved = this.convertAmount(this.totalapproved)
                    console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
                    
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
          })
        
      })
          this.raisePO = false
        })
      },
      rowSelected(args) {
        console.log(args.target.outerHTML)
        if(args.target.outerHTML == `<i class="icon-plus"></i>`) {
          this.raisePO =true
          this.transaction = args.data
        }
        if(args.target.outerHTML == `<i class="fa fa-clipboard"></i>`) {
                    var apilink = apiUrl.split('/api')
                    window.open(`${apilink[0]}/${args.data.bill_file_path}`,"_blank");
                  }
                  if(args.target.outerHTML == `<i class="icon-cloud-upload"></i>`) {
                    this.uploadBill= true
                    this.selectedTrans =args.data
                  }
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
                  
                
      },
      uploadPO() {
        if(this.po_exists) {
          api.delete(`${apiUrl}po/purchaseOrder/delete/${this.transaction.po_raised}`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
            console.log(res.data)
            var formdata = new FormData()
            for(var i=0;i<this.initialfiles.length;i++) {
                formdata.append('po_file',this.initialfiles[i])
            }
            formdata.append('purchase_id',this.transaction.po_raised)
            this.uploadModal = false
            api.post(`${apiUrl}po/purchaseOrder/create`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
              this.uploadModal = false
              console.log(res.data)
            })
          })
        }
        else{
        var formdata = new FormData()
          for(var i=0;i<this.initialfiles.length;i++) {
              formdata.append('po_file',this.initialfiles[i])
          }
          formdata.append('purchase_id',this.transaction.po_raised)
          this.uploadModal = false
          api.post(`${apiUrl}po/purchaseOrder/create`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
            this.uploadModal = false
            console.log(res.data)
          })
        }
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
          var formdata = new FormData()
          formdata.append('status',"PAID")
          api.put(`${apiUrl}transaction/trans/edit/${this.payment.transaction_id}`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((trans) => {
            this.paymentModal =false
            api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
            this.loading= true
            this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/vendordetail/${this.$route.params.id}`).then((response) => {
                    this.vendortransactions = response.data;
                    this.paidtransactions = []
                    this.unpaidtransactions = []
                    this.totalapproved = 0 
                    this.pos=[]
                    for(var i =0;i<this.vendortransactions.length;i++) {
                      this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].amount = parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].date = moment(this.vendortransactions[i].createdAt).format('L')
                      this.vendortransactions[i].time = moment(this.vendortransactions[i].createdAt).format('h:mm')
                      this.vendortransactions[i].createdAt = new Date(this.vendortransactions[i].createdAt)
                      if(this.vendortransactions[i].user == null) {
                        this.vendortransactions[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.vendortransactions[i].status == "Approved") {
                        this.vendortransactions[i].status = "UNPAID"
                      }
                      if(this.vendortransactions[i].department == null) {
                        this.vendortransactions[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].head == null) {
                        this.vendortransactions[i].head = {
                          name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].po_raised) {
                        if(this.checkExist(this.vendortransactions[i].po_raised,i)) {
                         this.pos.push(this.vendortransactions[i].po_raised)
                        }
                      }
                      if(this.vendortransactions[i].status == "PAID") {
                        this.paidtransactions.push(this.vendortransactions[i])
                      }
                      else {
                        this.vendortransactions[i].status = "UNPAID"
                        this.unpaidtransactions.push(this.vendortransactions[i])
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.vendortransactions[i].approvalCode == this.foreign[j].ref_id) {
                          this.vendortransactions[i].total_amount = this.foreign[j].amount
                          this.vendortransactions[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.vendortransactions[i].spent = this.vendortransactions[i].total_amount - this.vendortransactions[i].amount_left
                        }
                      }
                      this.totalpaid = 0
                      for(var j=0;j<this.paidtransactions.length;j++) {
                        this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
                      }
                      this.totalunpaid = 0
                      for(var k=0;k<this.unpaidtransactions.length;k++) {
                        this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
                      }
                    }
                    this.totalpo = this.pos.length
                    this.totalpaid = this.convertAmount(this.totalpaid)
                    this.totalunpaid = this.convertAmount(this.totalunpaid)
                    this.totalapproved = this.convertAmount(this.totalapproved)
                    console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
                    
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
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
    sendUploadBill(){
      if(this.billupload.bill_file == null) {
        toast({
          type:VueNotifications.types.warn,
          title:"Please Select a File to Upload"
        })
      }
      else {
          var formdata = new FormData()
          formdata.append('bill_file',this.billupload.bill_file)
          api.put(`${apiUrl}transaction/trans/edit/${this.selectedTrans._id}`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((trans) => {
            console.log(trans.data)
            this.uploadBill =false
            api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}approvals/preApp/get/all`).then((res) => {
            this.loading= true
            this.foreign = res.data
            api.get(`${apiUrl}`+`transaction/trans/vendordetail/${this.$route.params.id}`).then((response) => {
                    this.vendortransactions = response.data;
                    this.paidtransactions = []
                    this.unpaidtransactions = []
                    this.totalapproved = 0 
                    this.pos=[]
                    for(var i =0;i<this.vendortransactions.length;i++) {
                      this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].amount = parseInt(this.vendortransactions[i].amount)
                      this.vendortransactions[i].date = moment(this.vendortransactions[i].createdAt).format('L')
                      this.vendortransactions[i].time = moment(this.vendortransactions[i].createdAt).format('h:mm')
                      this.vendortransactions[i].createdAt = new Date(this.vendortransactions[i].createdAt)
                      if(this.vendortransactions[i].user == null) {
                        this.vendortransactions[i].user = {
                          user_name:"ADMIN"
                        }
                      }
                      if(this.vendortransactions[i].status == "Approved") {
                        this.vendortransactions[i].status = "UNPAID"
                      }
                      if(this.vendortransactions[i].department == null) {
                        this.vendortransactions[i].department = {
                          department_name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].head == null) {
                        this.vendortransactions[i].head = {
                          name:"NONE"
                        }
                      }
                      if(this.vendortransactions[i].po_raised) {
                        if(this.checkExist(this.vendortransactions[i].po_raised,i)) {
                         this.pos.push(this.vendortransactions[i].po_raised)
                        }
                      }
                      if(this.vendortransactions[i].status == "PAID") {
                        this.paidtransactions.push(this.vendortransactions[i])
                      }
                      else {
                        this.vendortransactions[i].status = "UNPAID"
                        this.unpaidtransactions.push(this.vendortransactions[i])
                      }
                      for(var j=0;j<this.foreign.length;j++) {
                        if(this.vendortransactions[i].approvalCode == this.foreign[j].ref_id) {
                          this.vendortransactions[i].total_amount = this.foreign[j].amount
                          this.vendortransactions[i].amount_left = this.foreign[j].approval_amount_left[this.foreign[j].month]
                          this.vendortransactions[i].spent = this.vendortransactions[i].total_amount - this.vendortransactions[i].amount_left
                        }
                      }
                      this.totalpaid = 0
                      for(var j=0;j<this.paidtransactions.length;j++) {
                        this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
                      }
                      this.totalunpaid = 0
                      for(var k=0;k<this.unpaidtransactions.length;k++) {
                        this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
                      }
                    }
                    this.totalpo = this.pos.length
                    this.totalpaid = this.convertAmount(this.totalpaid)
                    this.totalunpaid = this.convertAmount(this.totalunpaid)
                    this.totalapproved = this.convertAmount(this.totalapproved)
                    console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
                    
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
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
      beginEdit(args){
        if(args.rowData.po_raised == "" || args.rowData.po_raised == null) {
          toast({
            type: VueNotifications.types.warn,
            title: 'No PO Raised',
            message:"Please raise a PO first"
          })
        }
        else{
          this.transaction = args.rowData
          api.get(`${apiUrl}po/purchaseOrder/get/${args.rowData.po_raised}`).then((res) =>{
            this.po = res.data
            var files=[]
            var apilink = apiUrl.split('/api')
            async function AsyncLoop(po,i,cb) {
              console.log(res.data)
                    if(i < po.po_file.length) {
                        po.po_file[i].path = po.po_file[i].path.replace(`\\`,`/`)
                        await fetch(`${apilink[0]}/${po.po_file[i].path}`).then(r => r.blob()).then(blobFile => {
                          console.log(blobFile)
                          files.push(new File([blobFile], `${po.po_file[i].filename}`))
                          files[i].path = `${po.po_file[i].path}`
                        })
                        AsyncLoop(po,i+1,cb)
                    }
                    else {
                        cb();
                    }
                }
                AsyncLoop(res.data,0,function() {
                    console.log(files)
                })
            // for(var i=0;i<this.po.po_file.length;i++) {
            //   this.po.po_file[i].path = this.po.po_file[i].path.replace(`\\`,`/`)
            //   fetch(`http://127.0.0.1:3000/${this.po.po_file[i].path}`).then(r => r.blob()).then(blobFile => {
            //     console.log(blobFile)
            //     files.push(new File([blobFile], `${this.po.purchase_id}`))
            //   })
            //   // var xhr = new XMLHttpRequest();
            //   // xhr.open('GET', `blob:http%3A//127.0.0.1:3000/${this.po.po_file[i].path}`, true);
            //   // xhr.setRequestHeader('Access-Control-Allow-Headers', '*')
            //   // xhr.responseType = 'blob';
            //   // xhr.onload = function(e) {
            //   //   if (this.status == 200) {
            //   //     var myBlob = this.response;
            //   //     console.log(myBlob)
            //   //     // myBlob is now the blob that the object URL pointed to.
            //   //   }
            //   // };
            //   // xhr.send();
            // }
            this.initialfiles = files
            if(res.data) {
              this.po_exists = true
            }
          })
          this.uploadModal = true
        }
      },
      convertAmount(amount) {
        var x=amount;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res
      },
      checkExist(args,lim) {
        for(var i=0;i<lim;i++) {
          if(args == this.vendortransactions[i].po_raised) {
            return false;
          }
        }
        return true
      },
      onProgress(args) {
      },
       onUploadSuccess: function (args) {
        if(this.uploadModal) {
          this.files = this.$refs.uploadObj.getFilesData()
          var formdata = new FormData()
          for(var i=0;i<this.files.length;i++) {
              formdata.append('po_file',this.files[i].rawFile)
          }
          formdata.append('purchase_id',this.transaction.po_raised)
          this.uploadModal = false
          api.post(`${apiUrl}po/purchaseOrder/create`,formdata,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
            this.uploadModal = false
            console.log(res.data)
          })
        }
        },
        onUploadFailed: function (args) {
        },
        onFileRemove: function (args) {
            console.log(args)
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
                  var datasrc = this.vendortransactions
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
                    
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
    }
  };
</script>
<style>
#label {
  font-weight:lighter;
    font-size: 12px;
}
.badge-PAID {
  background: lightgreen;
}
.badge-UNPAID {
  background: yellow;
}
#addbutton {
  color:black;
}
</style>