<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
     <div id="target" class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar :clicked="addEditHandler">
                <e-items>
                  <e-item  id="add" :template="addTemplate" :text="$ml.get('add')"></e-item>
                  <e-item  id="excelexport" :text="$ml.get('exportexcel')"></e-item>
                  <e-item  id="pdfexport" :text="$ml.get('exportpdf')"></e-item>
              <e-item id="label" :text="$ml.get('label')"></e-item>

                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='ref_id' headerText='Reference ID'  :filter='filter' ></e-column>
                    <e-column field='approval_type' headerText='Type'  :filter='filter' ></e-column>
                    <e-column field='labels' headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column>
                    <e-column field='status' headerText='Status'  :filter='filter' ></e-column>
                    <e-column field='recurring_rate' headerText='Recurring Rate'  :filter='filter' ></e-column>
                    <e-column field='budget_head.name' headerText='Head'  :filter='filter' ></e-column>
                    <e-column field='department.department_name' headerText='Department'  :filter='filter' ></e-column>
                    <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' ></e-column>
                    <e-column field='description' headerText='Description'  :filter='filter' ></e-column>
                    <e-column field='amount' headerText='Amount'  :filter='filter' ></e-column>
                    <e-column headerText='Accept/Reject' width='140' :template="buttonTemplate"></e-column>
                </e-columns>
                </ejs-grid>
                 </div>
        </div>
        <ejs-dialog id='dialog' height="auto" header='Add A Label' showCloseIcon='true' :isModal='LabelModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
            target='#target' >
            <b-form v-on:submit.prevent="addLabel">
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
        </ejs-dialog>
        <ejs-dialog :buttons='alertDlgButtons' ref="alertDialog" v-bind:visible="false" :header='alertHeader' :animationSettings='animationSettings' :content='alertContent' :showCloseIcon='showCloseIcon' :target='target'
            :width='alertWidth'>
        </ejs-dialog>
  </div>
 </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import { Browser } from '@syncfusion/ej2-base';
import {ClientTable, Event} from 'vue-tables-2'
import { ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList,
  IDataSet
} from "@syncfusion/ej2-vue-pivotview";
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


var api = axios.create({
  withCredentials:true
})
  Vue.use(ClientTable)
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
      ClientTable,
      Event,
      ToolbarPlugin,
      
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
        GroupingBar,
        FieldList,
        IDataSet,
        Edit
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser]
        },
    data: function () {
      return {
        buttonTemplate: function () {
              return {
                  template: Vue.component('buttonTemplate', {
                      template: `<div>
                                  <b-button @click="acceptReq" type="submit" size="sm" variant="primary" v-text="$ml.get('accept')"><i class="fa fa-dot-circle-o"></i></b-button>
                                  <b-button @click="rejectReq" type="submit" size="sm" variant="danger" v-text="$ml.get('reject')"><i class="fa fa-dot-circle-o"></i></b-button>
                                </div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      },
                      methods : {
                        acceptReq() {
                          axios.get(`${apiUrl}`+`/approval/level1/accept/${this.data.approvalCode}`).then((res) => {
                            console.log(res.data)
                          })
                        },
                        rejectReq() {
                          axios.get(`${apiUrl}`+`/approval/level1/reject/${this.data.approvalCode}`).then((res) => {
                            console.log(res.data)
                          })
                        }
                      }
                })
              }
          },
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
                      template: `<b-badge id="label1" variant="primary" v-text="$ml.get('add')"></b-badge>`,
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
           height : window.innerHeight*0.695,
          toolbar: [
          'ExcelExport','PdfExport',
            
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
                fields: { text: 'text', value: 'value' },
                
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
            actionBegin: function(args) {
                console.log(args)
            },
            
            addLabel (args) {
        this.$refs.dialogObj.hide();
        let val = this.$refs.overviewgrid.getSelectedRecords()
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) => {
                var id = {
                  labels :  response.data._id
                }
                api.put(`${apiUrl}`+`approvals/preApp/push/label/`+`${val[0]._id}`,id).then((response) => {
                  console.log(response.data)
                    this.$router.go(0)
                });
                this.formdata=null
              });
            
      },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
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
                if (args.item.text === 'Excel Export') {
                    this.$refs.overviewgrid.excelExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            addEditHandler(args) {
              if(args.item.id == 'label') {
                  if(this.$refs.overviewgrid.getSelectedRecords().length>0) {
                    this.$refs.dialogObj.show();
                  }
                  else { 
                    alert("Please select a record to label it");
                  }
                }
                if(args.item.id == "add") {
                    console.log(args)
                    this.$router.push('/approval/add');
                }
                
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
            
        },
        async mounted () { 
                this.$refs.dialogObj.hide();
                api.get(`${apiUrl}`+`approvals/preApp/get/all`).then((response) => {
                    this.datasrc = response.data;
                })
        },
        computed: {
            getTradeData: async function () {
                this.data = this.datasrc.slice(0)
                return this.data
            }
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
#label1 {
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

.badge-red {
  background-color: red;
  color:white;
}
.badge-#ff000 {
  background-color: red;
}
</style>