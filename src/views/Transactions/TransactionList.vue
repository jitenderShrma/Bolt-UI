<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
 
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
                <e-items>
                  <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate"></e-item>
                 <e-item align="right" id="edit" :text="$ml.get('edit')" :template="editTemplate"></e-item>
                 <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
                  <e-item align="right" id="upload" :template="uploadTemplate" :text="$ml.get('upload')"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin"
                :height="height" :enableHover='false' :toolbar="toolbar" :toolbarClick="clickHandler">
                <e-columns>
                    <e-column field='vendor.vendor_company' headerText='Vendor'  :filter='filter' ></e-column>
                    <e-column field='status' headerText='Status'  :filter='filter' ></e-column>
                    <e-column field='user.user_name' headerText='Requested By'  :filter='filter' ></e-column>
                    <e-column field='approvalCode' headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column>
                    <e-column field='po_raised.purchase_id' headerText='PO Number'  :filter='filter' ></e-column>
                    <e-column field='approvalCode' headerText='Approval Code'  :filter='filter' ></e-column>
                    <e-column field='transaction_type'  headerText='Type' :filter='filter' :isPrimaryKey='true'></e-column>
                    <e-column field='category' headerText='Category'  :filter='filter' ></e-column>
                    <e-column field='department.department_name' headerText='Department' :filter='filter'  ></e-column>
                    <e-column field='head.name' headerText='Head' :filter='filter'></e-column>
                    <e-column field='amount' headerText='Amount' :filter='filter'></e-column>
                    <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' ></e-column>
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
  </div>
 </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {
PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    Vue.use(UploaderPlugin);
    
    Vue.use(PivotViewPlugin);
    Vue.use(GridPlugin);
    Vue.use(ToolbarPlugin);

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


var api = axios.create({
  withCredentials:true
})
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
    name: 'TransactionList',
    components: {      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList,
  Edit
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser]
        },
    data: function () {
      return {
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
                      template: `<div><b-badge style="font-weight:100;margin:3px" v-for="label in labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                              labels:[]
                          }
                      },
                      mounted() {
                        axios.get(`${apiUrl}`+`approvals/preApp/get/one/${this.data.approvalCode}`,{withCredentials:true}).then((res) => {
                          console.log(res.data)
                            if(res.data !=null) {
                              this.labels = res.data.labels
                            }
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
          'CsvExport',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: { pageSizes: [12,50,100,200], pageCount: 4 },
        ddData: [{ value: 1000, text: '1,000 Rows and 11 Columns' }, { value: 10000, text: '10,000 Rows and 11 Columns' }],
                ddValue: 1000,
                stTime: null,
                loadTime: null,
                dReady: false,
                showCloseIcon: false,
                isDataChanged: true,
                
                filterOptions: {
                    type: 'Menu'
                },
                filter: {
                    type: 'CheckBox'
                },
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { persistSelection: true, type: 'Multiple' }
            };
        },
  methods: {
    onProgress(args) {
      },
       onUploadSuccess: function (args) {
          var formData = new FormData();
          formData.append('csv',args.file.rawFile);
          console.log(formData);
          this.upload = true
          console.log("req called");
          api.post(`${apiUrl}`+`import/importTrans/transactions/all`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            console.log(res);
            api.get(`${apiUrl}`+`transaction/trans/get/all`).then((response) => {
                    this.datasrc = response.data;
                })
          })
          this.browseModal = false
        },
        onUploadFailed: function (args) {
            console.log('Upload fails');
        },
        onFileRemove: function (args) {
            args.postRawFile = false;
        },
            actionBegin: function(args) {
                console.log(args)
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
                    console.log(args)
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
                    })
                    }
                }
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
            
        },
        async mounted () { 
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
                    console.log(this.datasrc)
                })
            
        }
};
</script>


<style>

#label {
    font-size: 12px;
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