<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
     <div id="target" class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
              <e-items>
                <e-item  align="right" id="add" :template="addTemplate" :text="$ml.get('add')"></e-item>
                <e-item align="right" id="label" :text="$ml.get('label')"></e-item>
              </e-items>
            </ejs-toolbar>
            <div class="control-section">
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :sortSettings='sortOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin" :toolbar="toolbar" :toolbarClick="clickHandler"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column :visible="enableColumn" headerText='Accept/Reject' width='140' :template="buttonTemplate"></e-column>
                    <e-column :visible="false" field="last_updated" headerText='last_updated' width='140'></e-column>
                    <!-- <e-column field='ref_id' headerText='Reference ID'  :filter='filter' ></e-column>
                    <e-column field='approval_type' headerText='Type'  :filter='filter' ></e-column> -->
                    <e-column field='requested_by.user_name' headerText='Requested By'  :filter='filter' ></e-column>
                    <e-column field='status' headerText='Status'  :filter='filter' ></e-column>
                    <!-- <e-column field='labels[0].label_name' headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column> -->
                    <e-column field='amount' headerText='Amount'  :filter='filter' ></e-column>
                    <e-column field='month' headerText='Month'  :filter='filter' ></e-column>
                    <e-column field='source_head.name' headerText='Source Head'  :filter='filter' ></e-column>
                    <e-column field='destination_head.name' headerText='Destination Head'  :filter='filter' ></e-column>
                    <!-- <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' ></e-column>
                    <e-column field='description' headerText='Description'  :filter='filter' ></e-column>
                    <e-column field='amount' headerText='Amount'  :filter='filter' ></e-column> -->
                </e-columns>
                </ejs-grid>
                 </div>
        </div>
        <ejs-dialog id='dialog' height="auto" header='Add A Label' showCloseIcon='true' :isModal='LabelModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
            target='#target' >
            <b-form v-on:submit.prevent="addLabel">
        <div class="content-wrapper textbox-default">
          <br>
          <div v-for="(run,i) in editinput.labels" :key="i">
              <b-badge style="font-weight:400;margin:5px;font-size:15px;" :variant="editinput.labels[i].color">{{editinput.labels[i].label_name}}</b-badge>
              <b-btn style="float:right" v-on:click="delLabel(`${editinput.labels[i]._id}`,`${editinput._id}`,`${i}`)" size="sm" variant="danger"><i class="fa fa-trash-o"></i></b-btn>
            </div>
            <b-form v-on:submit.prevent = "selectLabel(`${editinput._id}`)">
                      <label v-text="$ml.get('labels')"></label>
                      <cool-select menuItemsMaxHeight="100px" :items="labels" item-text="label_name" item-value="_id" v-model="selectedLabel">
                        <div slot="item" slot-scope = "{item :label}">
                          <b-badge style="font-weight:100;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="selection" slot-scope = "{item :label}">
                          <b-badge style="font-weight:100;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="after-items-fixed">
                          <b-btn block @click="addModal = true" variant="primary" v-text="$ml.get('label')"></b-btn>
                        </div>
                      </cool-select>
                      <br>
                        <div slot="footer">
                          <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('add')"><i class="fa fa-dot-circle-o"></i></b-button>
                        </div>
                </b-form>
              </div>
          </b-form>
        </ejs-dialog>
        <ejs-dialog :buttons='alertDlgButtons' ref="alertDialog" v-bind:visible="false" :header='alertHeader' :animationSettings='animationSettings' :content='alertContent' :showCloseIcon='showCloseIcon' :target='target'
            :width='alertWidth'>
        </ejs-dialog>
        <b-modal size="sm" :title="$ml.get('label')" class="modal-primary" v-model="addModal" @ok="addModal = false" hide-footer>
              <b-form v-on:submit.prevent="addLabel(`${editinput._id}`)">
              <div class="content-wrapper textbox-default">
              <div class="row">
              <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                      <ejs-textbox v-model="formdata.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
              </div>
              </div>
              <br>
              <div class="row">
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <p>Label Color</p>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                          <ejs-colorpicker :modeSwitcher="false" value="#000" mode="Palette" :columns="squarePalettesColn" :presetColors="circlePaletteColors" :change="onChange" id="color-picker"></ejs-colorpicker>
                  </div>
              </div>
              <br>
              <div class="multiline_wrapper">
                  <ejs-textbox v-model="formdata.description" ref="textareaObj" id="default" :multiline="true" floatLabelType="Auto" placeholder="Description" required></ejs-textbox>
              </div>
              </div>
              <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </div>
                </b-form>
            </b-modal>
  </div>
 </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import { Browser } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {CoolSelect} from 'vue-cool-select';
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

Vue.use(TextBoxPlugin)
Vue.use(ColorPickerPlugin);
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
    name: 'ApprovalList',
    components: {
      ToolbarPlugin,
      CoolSelect,
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
        labels:[],
        addModal:false,
        excelTemplate : function() {
          return {
            template:Vue.component('excelTemplate', {
              template:`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="overviewgrid_excelexport" tabindex="-1" style="width: auto;"><span id="hide" class="e-btn-icon e-csv-icon e-icons e-icon-left"></span><div class="e-tbar-btn-text">Excel Export</div></button>`,
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
        
        buttonTemplate: function () {
              return {
                  template: Vue.component('buttonTemplate', {
                      template: `<div>
                                <div v-if="yes">
                                  <b-button @click="acceptReq" type="submit" size="sm" variant="primary"><i class="icon-check"></i></b-button>
                                  <b-button @click="rejectReq" type="submit" size="sm" variant="danger"><i class="icon-close"></i></b-button>
                                  </div>
                                </div>`,
                  data: function() {
                          return {
                              data: {},
                              designation:null,
                              yes:false
                          }
                      },
                      methods : {
                        acceptReq() {
                          api.post(`${apiUrl}`+`transfer/budtrans/accept/requests/${this.data._id}`).then((res) => {
                            console.log(res.data)
                            window.location.reload();
                          })
                        },
                        rejectReq() {
                          api.post(`${apiUrl}`+`transfer/budtrans/reject/requests/${this.data._id}`).then((res) => {
                            console.log(res.data)
                            window.location.reload();
                          })
                        }
                      },
                      mounted() {
                        var data =  JSON.parse(localStorage['session_key'])
                        if(data.user) {
                          this.designation = data.user.user_type.designation
                          if(this.data.assigned_to == this.designation && this.data.status=="PENDING") {
                            this.yes=true
                          }
                        }
                        if(data.length == 24 && this.data.status=="PENDING") {
                          console.log("yes")
                          this.yes=true
                        }
                      }
                })
              }
          },
          editinput : {},
        labelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div ><b-badge style="font-weight:100;margin:3px" v-for="label in data.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          module:null,
          formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "Approval",
                  description : ""
                },
          LabelModal:false,
          animationSettings: { effect: 'Zoom' },
          squarePalettesColn: 7,
        circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
            fields: { text: 'text', value: 'value' },
            dropdownValue: 'Top',
            datasrc: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true,mode:'Dialog'},
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
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
          link:'',
          key:'',
          pending:false,
          sortOptions:{columns: [{field: 'status', direction: 'Descending'},{field: 'last_updated', direction: 'Descending'}]},
           height : window.innerHeight*0.695,
          toolbar: [
          'CsvExport','Search',
            
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4 },
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
                enableColumn:false,
                selectedLabel:null,
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
    delLabel(args,id,label) {
      console.log(this.editinput.labels.splice(label,1))
      var body = {
        labels : args
      }
      console.log(body)
      api.put(`${apiUrl}approvals/preApp/pop/label/${id}`,body).then((res) => {
        console.log(res.data)
      })
      
    },
            actionBegin: function(args) {
                console.log(args)
            },
            addLabel (args) {
            this.addModal =false
                    api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((label)=>{
                      var id = {
                        labels :  label.data._id
                      }
                  api.get(`${apiUrl}`+`label/label/find/by/Approval`).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.editinput.labels)
              });
      },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
      }, 
      selectLabel(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.editinput.labels.push(label);
        })

        var data = {
          labels : this.selectedLabel
        }
        api.put(`${apiUrl}approvals/preApp/push/label/${args}`,data).then((res) => {
            
        })
      }
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
              var data = this.$refs.overviewgrid.getSelectedRecords()
              if(args.item.id == 'label') {
                  if(data.length>0) {
                    this.$refs.dialogObj.show();
                    this.editinput = data[0]
                    console.log(this.editinput)
                  }
                  else { 
                    alert("Please select a record to label it");
                  }
                }
                if(args.item.id == "add") {
                    console.log(args)
                    this.$router.push('/budgettrans/add');
                }
                
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
            
        },
        watch:{
            'someval' : function() {
              console.log(this.someval);
            },
            // $route (to, from){
            //   if(to.params.id == 'pending') {
            //     api.get(`${apiUrl}`+`transfer/budtrans/view/requests/pending`).then((response) => {
            //         this.datasrc = response.data;
            //         for(var i =0;i<this.datasrc.length;i++) {
            //           if(this.datasrc[i].requested_by == null) {
            //             this.datasrc[i].requested_by = {
            //               user_name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].department == null) {
            //             this.datasrc[i].department = {
            //               department_name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].source_head == null) {
            //             this.datasrc[i].source_head = {
            //               name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].destination_head == null) {
            //             this.datasrc[i].destination_head = {
            //               name:"No longer exists!"
            //             }
            //           }
                      
            //         }
            //     })
            //     this.pending = true
            //   }
            //   else {
            //     api.get(`${apiUrl}`+`transfer/budtrans/view/requests/all`).then((response) => {
            //         this.datasrc = response.data;
            //         for(var i =0;i<this.datasrc.length;i++) {
            //           if(this.datasrc[i].requested_by == null) {
            //             this.datasrc[i].requested_by = {
            //               user_name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].department == null) {
            //             this.datasrc[i].department = {
            //               department_name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].source_head == null) {
            //             this.datasrc[i].source_head = {
            //               name:"No longer exists!"
            //             }
            //           }
            //           if(this.datasrc[i].destination_head == null) {
            //             this.datasrc[i].destination_head = {
            //               name:"No longer exists!"
            //             }
            //           }
                      
            //         }
            //     })
            //     this.pending = false
            //   }
            // }
        }, 
        async mounted () {
                this.$refs.dialogObj.hide();
                this.link = window.location.href;
                this.key = this.link.split('list/').pop()
                if(this.key == 'all') {
                  this.pending = false
                  var user =  JSON.parse(localStorage['session_key'])
                api.get(`${apiUrl}`+`transfer/budtrans/view/requests/all`).then((response) => {
                  console.log(response.data)
                    this.datasrc = response.data;
                    for(var i =0;i<this.datasrc.length;i++) {
                      if(user.user) {
                        console.log("user exists")
                        if(this.datasrc[i].status=="PENDING" && this.datasrc[i].assigned_to==user.user.user_type.designation) {
                           this.enableColumn =  true
                        }
                      }
                      else {
                        console.log("user")
                        if(this.datasrc[i].status=="PENDING") {
                           this.enableColumn =  true
                        }
                      }
                      if(this.datasrc[i].requested_by == null) {
                        this.datasrc[i].requested_by = {
                          user_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].source_head == null) {
                        this.datasrc[i].source_head = {
                          name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].destination_head == null) {
                        this.datasrc[i].destination_head = {
                          name:"No longer exists!"
                        }
                      }
                      
                    }
                    console.log(this.datasrc)
                })
                api.get(`${apiUrl}`+`label/label/find/by/Approval`).then((res) => {
                  this.labels = res.data
                })
              }
              else{
                this.pending = true
                api.get(`${apiUrl}`+`transfer/budtrans/view/requests/pending`).then((response) => {
                    this.datasrc = response.data;
                    for(var i =0;i<this.datasrc.length;i++) {
                      if(this.datasrc[i].requested_by == null) {
                        this.datasrc[i].requested_by = {
                          user_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].source_head == null) {
                        this.datasrc[i].source_head = {
                          name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].destination_head == null) {
                        this.datasrc[i].destination_head = {
                          name:"No longer exists!"
                        }
                      }
                      
                    }
                    console.log(response.data)
                })
              }
        },
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
#label1 {
  font-size:17px;
  font-weight: 1;
}
#ddown_primary {
  font-size:17px;
  font-weight: 1;
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
.btn-primary:focus, .btn-primary.focus {
     -webkit-box-shadow: 0 0 0 0.2rem rgba(65, 181, 222, 0.5); 
     box-shadow: 0 0 0 0.0;
}
.badge-red {
  background-color: red;
  color:white;
}
.badge-#ff000 {
  background-color: red;
}
</style>