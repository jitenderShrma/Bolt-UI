<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
 
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
                <e-items>
                  <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate"></e-item>
                 <!-- <e-item align="right" id="edit" :text="$ml.get('edit')" :template="editTemplate"></e-item> --><!-- 
                 <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item> -->
                  <e-item align="right" id="upload" :template="uploadTemplate" :text="$ml.get('upload')"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
            <ejs-grid ref='overviewgrid' :allowGrouping='true' :groupSettings='groupOptions'  :rowHeight='rowHeight' :sortSettings='sortOptions' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc" :allowReordering='true' :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin"
            :rowSelected="rowSelected"
                :height="height" :enableHover='false' :toolbar="toolbar" :toolbarClick="clickHandler">
                <e-columns>
                    <e-column field='approvalCode' headerText='Ref ID'  :filter='filter' ></e-column>
                    <e-column field='transaction_id' :template="printTemplate" headerText='Transaction ID' :filter='filter'></e-column>
                    <e-column field='amount' headerText='Amount' :filter='filter' :width="130"></e-column>
                    <e-column field='department.department_name' headerText='Department' :filter='filter'  ></e-column>
                    <e-column field='head.name' headerText='Head' :filter='filter'></e-column>
                    <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' :width="119" ></e-column>
                    <e-column field='labels[0].label_name' headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column>
                    <e-column field='user.user_name' headerText='Requested By'  :filter='filter' ></e-column>
                    <e-column field='transaction_type'  headerText='Type' :filter='filter' :isPrimaryKey='true'></e-column>
                    <e-column field='category' headerText='Category'  :filter='filter' ></e-column>
                    <e-column field='vendor.vendor_company' headerText='Vendor'  :filter='filter' ></e-column>
                    <e-column field='po_raised' headerText='PO Number'  :filter='filter' ></e-column>
                    <e-column field='createdAt' :visible="true" :format='formatOptions' type='date' :filter='filter2' ></e-column>
                </e-columns>
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
  </div>
 </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import moment from 'moment'

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
PdfExport,ExcelExport, Edit,Group, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
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
    components: {      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        TextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList,
  Edit
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder,Group]
        },
    data: function () {
      return {
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
        printData:[],
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
                      template : `<div style="line-height:4">{{data.transaction_id}}<b-button class="bg-transparent py-0 px-2" style="border:0px"><i class="icon-printer"></i></b-button>&nbsp;&nbsp;<span v-if="data.status == 'PAID'"><b-button class="bg-success py-0 px-2" style="border:0px"><b-badge id="label" variant="success" v-text="$ml.get('paid')"></b-badge></b-button></span><span v-else><b-button class="bg-transparent py-0 px-2" style="border:0px"><b-badge variant="warning" id="label" v-text="$ml.get('markaspaid')"></b-badge></b-button></span></div>`,
                      data()  {
                        return {
                          data: {}
                        };
                      }
                    
                    })
                  }
                },
                log:[],
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
           height : window.innerHeight*0.695,
          toolbar: [
          'CsvExport','Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4},
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
            };
        },
  methods: {
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
            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                    this.datasrc = response.data;
                    for(var i =0;i<this.datasrc.length;i++) {
                      if(this.datasrc[i].user == null) {
                        this.datasrc[i].user = {
                          user_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].head == null) {
                        this.datasrc[i].head = {
                          name:"No longer exists!"
                        }
                      }
                    }
                    this.paymentModal =false
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
            actionBegin: function(args) {
              if(args.requestType == "filtering") {
                console.log(args)
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
                if (args.item.text === 'CSV Export') {
                    this.$refs.overviewgrid.csvExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            addEditHandler(args) {
                if(args.item.id == "add") {
                    this.$router.push('/transaction/add');
                }
                if(args.item.id=="upload") {
                  this.browseModal = true
                }
                if(args.item.id == "edit") {
                    var selected = this.$refs.overviewgrid.getSelectedRecords()
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
                api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                    this.datasrc = response.data;
                    console.log(response.data)
                    for(var i =0;i<this.datasrc.length;i++) {
                      this.datasrc[i].createdAt = new Date(this.datasrc[i].createdAt)
                      if(this.datasrc[i].user == null) {
                        this.datasrc[i].user = {
                          user_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].head == null) {
                        this.datasrc[i].head = {
                          name:"No longer exists!"
                        }
                      }
                    }
                }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
            
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
</style>