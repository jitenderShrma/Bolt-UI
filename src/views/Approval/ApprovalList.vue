<template>
 <div className="animated fadeIn">
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar :clicked="addEditHandler">
                <e-items>
                  <e-item  id="add" :template="addTemplate" :text="$ml.get('add')"></e-item>
                  <e-item  id="excelexport" :text="$ml.get('exportexcel')"></e-item>
                  <e-item  id="pdfexport" :text="$ml.get('exportpdf')"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowExcelExport="true" :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='ref_id' headerText='Reference ID'  :filter='filter' ></e-column>
                    <e-column field='approval_type' headerText='Type'  :filter='filter' ></e-column>
                    <e-column field='recurring_rate' headerText='Recurring Rate'  :filter='filter' ></e-column>
                    <e-column field='budget_head.name' headerText='Head'  :filter='filter' ></e-column>
                    <e-column field='department.department_name' headerText='Department'  :filter='filter' ></e-column>
                    <e-column field='month' :template="monthTemplate" headerText='Month' :filter='filter' ></e-column>
                    <e-column field='description' headerText='Description'  :filter='filter' ></e-column>
                </e-columns>
                </ejs-grid>
                 </div>
        </div>
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
  FieldList,
  IDataSet
} from "@syncfusion/ej2-vue-pivotview";
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    
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
                if (args.item.text === 'Excel Export') {
                    this.$refs.overviewgrid.excelExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            addEditHandler(args) {
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