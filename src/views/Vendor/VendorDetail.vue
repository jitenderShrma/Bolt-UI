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
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowReordering='true' :allowResizing='true'  id='overviewgrid' :recordDoubleClick="beginEdit" :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="vendortransactions"  :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler" :rowSelected="rowSelected"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='amount' headerText='Amount' width="auto" :filter='filter' ></e-column>
                    <e-column field='category' headerText='Category' width="auto" :filter='filter'></e-column>
                    <e-column field='po_raised' :template="poTemplate" headerText='Purchase Order' width="auto"  :filter='filter'></e-column>
                    <e-column field='createdAt' headerText='Date' width="auto" :template="dateTemplate"  :filter='filter'></e-column>
                    <e-column field='status' headerText='Status' width="auto" :template="statusTemplate"  :filter='filter'></e-column>
                </e-columns>
                </ejs-grid>
                <b-modal size="lg" :title="$ml.get('uploadpo')" class="modal-primary" v-model="uploadModal" @ok="uploadModal = false" hide-footer>
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
                    <ejs-textbox v-model="input.po_raised" floatLabelType="Auto" :files="files" :placeholder="$ml.get('pholdpoid')" required></ejs-textbox>
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('raisepo')"></b-button>
                  </b-form>
                </b-modal>
              </div>
              
</template>
<script>
  import apiUrl from '@/apiUrl'
  import axios from 'axios'
  import moment from 'moment'
  import Vue from 'vue'
  import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
  Vue.use(UploaderPlugin);
  import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
  import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
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
            grid: [PdfExport,ExcelExport,Edit,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder,]
        },
    data: function() {
      return {
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
      initialfiles:[],
      input:{},
      uploadModal:false,
      totalunpaid:0,
      totalpo:0,
      transaction:{},
      extensions : '*',
      raisePO:false,
          path: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
          },
        toolbar: [
        'CsvExport',
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
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      if(this.$route.params.id) {
      api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}transaction/trans/vendordetail/${this.$route.params.id}`).then((res) => {
          this.vendortransactions = res.data
          this.paidtransactions = []
          this.unpaidtransactions = []
          this.totalapproved = 0 
          this.pos=[]
          for(var i=0;i<this.vendortransactions.length;i++) {
            this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
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
          }
          this.totalpaid = 0
          for(var j=0;j<this.paidtransactions.length;j++) {
            this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
          }
          this.totalunpaid = 0
          for(var k=0;k<this.unpaidtransactions.length;k++) {
            this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
          }
          this.totalpo = this.pos.length
          this.totalpaid = this.convertAmount(this.totalpaid)
          this.totalunpaid = this.convertAmount(this.totalunpaid)
          this.totalapproved = this.convertAmount(this.totalapproved)
          console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
        })
      })
    }
    },
    methods:{
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
        api.put(`${apiUrl}transaction/trans/edit/${this.transaction._id}`,this.input).then((res) => {
          api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {

          this.vendor = res.data
          api.get(`${apiUrl}transaction/trans/vendordetail/${this.$route.params.id}`).then((res) => {
            this.vendortransactions = res.data
            this.paidtransactions = []
            this.unpaidtransactions = []
            this.totalapproved = 0 
            this.pos=[]
            for(var i=0;i<this.vendortransactions.length;i++) {
              this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
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
            }
            this.totalpaid = 0
            for(var j=0;j<this.paidtransactions.length;j++) {
              this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
            }
            this.totalunpaid = 0
            for(var k=0;k<this.unpaidtransactions.length;k++) {
              this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
            }
            this.totalpo = this.pos.length
            this.totalpaid = this.convertAmount(this.totalpaid)
            this.totalunpaid = this.convertAmount(this.totalunpaid)
            this.totalapproved = this.convertAmount(this.totalapproved)
            console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
          })
        })
          this.raisePO = false
        })
      },
      rowSelected(args) {
        if(args.target.outerHTML == `<i class="icon-plus"></i>`) {
          this.raisePO =true
          this.transaction = args.data
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
                    this.$refs.overviewgrid.csvExport()
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
  color:white;
}
#addbutton:hover {
  color:black;
}
</style>