<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
      <AppAside id="new_aside" style="height: calc(100vh - 65px);top:-8%">
        <div style="float:right">
        <DefaultToggler style="line-height:2"/>
        </div>
        <b-tabs>
    <b-tab>
      <template slot="title">
        Approval Matrix
      </template>
      <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-secondary py-1 bg-light text-center text-muted text-uppercase small">Approval Level-1 <div style="display:inline" v-if="designationBudget[0]!=null && designationBudget[0]!=''">{{designationBudget[0]}} - {{departmentBudget[0]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagersBudget[0]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-secondary py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagersBudget[0][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-warning py-1 bg-light text-center  text-muted text-uppercase small">
        Approval Level-2 <div style="display:inline" v-if="designationBudget[1]!=null && designationBudget[1]!=''">{{designationBudget[1]}} - {{departmentBudget[1]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagersBudget[1]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-warning py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagersBudget[1][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-info py-1 bg-light text-center  text-muted text-uppercase small">
        Approval Level-3 <div style="display:inline" v-if="designationBudget[2]!=null && designationBudget[2]!=''">{{designationBudget[2]}} - {{departmentBudget[2]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagersBudget[2]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-info py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagersBudget[2][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-danger py-1 bg-light text-center  text-muted text-uppercase small">
        Approval Level-4 <div style="display:inline" v-if="designationBudget[3]!=null && designationBudget[3]!=''">{{designationBudget[3]}} - {{departmentBudget[3]}}</div>
      </b-list-group-item>

      <div v-for="(run,i) in lineManagersBudget[3]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-danger py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagersBudget[3][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-success py-1 bg-light text-center  text-muted text-uppercase small">
        Approval Level-5 <div style="display:inline" v-if="designationBudget[4]!=null && designationBudget[4]!=''">{{designationBudget[4]}} - {{departmentBudget[4]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagersBudget[4]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-success py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagersBudget[4][i].user.personal_details.name}}</div>
        </div>
        </b-list-group-item>
      </div>
    </b-list-group>
    </b-tab>
    <b-tab>
      <template slot="title">
        Line Managers
      </template>
      <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-secondary py-1 bg-light text-center  text-muted text-uppercase small">
        LM-1 <div style="display:inline" v-if="designation[0]!=null">{{designation[0]}} - {{department[0]}}</div>
      </b-list-group-item>
      <div class="py-0 px-0 col-lg-6" v-for="(run,i) in lineManagers[0]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-secondary py-3">
        <div class="py-1 message ">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagers[0][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-warning py-1 bg-light text-center  text-muted text-uppercase small">
        LM-2 <div style="display:inline" v-if="designation[1]!=null">{{designation[1]}} - {{department[1]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagers[1]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-warning py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagers[1][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-info py-1 bg-light text-center  text-muted text-uppercase small">
        LM-3 <div style="display:inline" v-if="designation[2]!=null">{{designation[2]}} - {{department[2]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagers[2]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-info py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagers[2][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-danger py-1 bg-light text-center  text-muted text-uppercase small">
        LM-4 <div style="display:inline" v-if="designation[3]!=null">{{designation[3]}} - {{department[3]}}</div>
      </b-list-group-item>

      <div v-for="(run,i) in lineManagers[3]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-danger py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagers[3][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    <b-list-group class="list-group-accent">
      <b-list-group-item class="list-group-item-accent-success py-1 bg-light text-center  text-muted text-uppercase small">
        LM-5 <div style="display:inline" v-if="designation[4]!=null">{{designation[4]}} - {{department[4]}}</div>
      </b-list-group-item>
      <div v-for="(run,i) in lineManagers[4]" :key="i">
      <!-- <div class="p-3"> -->
        <b-list-group-item class="list-group-item-accent-success py-3">
        <div class="py-1 message">
          <div class=" mr-1 float-left">
            <div class="avatar">
              <img src="img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
            </div>
          </div>
          <div class="text-truncate py-1 ">{{lineManagers[4][i].user.personal_details.name}}</div>
        </div>
      </b-list-group-item>
      </div>
    </b-list-group>
    </b-tab>
  </b-tabs>
      </AppAside>
     <div id="target" class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
                <e-items>
                  <e-item align="right" id="add" :template="addTemplate" :text="$ml.get('add')"></e-item>
                  <e-item align="right" id="delete" :template="deleteTemplate" :text="$ml.get('delete')"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :allowPdfExport="true" :allowReordering="true" :allowExcelExport="true" :pageSettings='pageSettings' :dataSource="datasrc" :allowFiltering='true' :filterSettings='filterOptions' :allowTextWraping="true" :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin" :toolbarClick="clickHandler" 
             :recordDoubleClick="editStaff" :toolbar="toolbar" :rowSelected="rowSelected"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='personal_details.name' headerText='Name'  :filter='filter' ></e-column>
                    <e-column field='user_name' headerText='Username'  :filter='filter' ></e-column>
                    <e-column field='user_type.designation.name' :template="buttonLM" headerText='Designation' :filter='filter'></e-column>
                    <e-column field='user_type.department.department_name' headerText='Department'  :filter='filter' ></e-column>
                    <e-column field='user_type.designation.labels[0].label_name' :template="labelTemplate" headerText='Labels '  :filter='filter' ></e-column>
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
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '../../shared/classes'
import toggleClasses from '../../shared/toggle-classes'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import AsideTogglerStaff from '../../shared/AsideTogglerStaff'
import DefaultToggler from '../../shared/AsideTogglerClose'
import { Browser } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(ToolbarPlugin)
Vue.use(DialogPlugin)
Vue.use(TextBoxPlugin)
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort,Reorder, Filter, Selection, GridComponent,Group } from "@syncfusion/ej2-vue-grids";
    
    Vue.use(GridPlugin);

    Vue.use(DropDownListPlugin);
    Vue.use(DatePickerPlugin);
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

var captionVue = Vue.component('captionTemplate',{
  template:`<div><div v-if="!empty"><strong>{{data.key}} - {{data.headerText}}<strong></div>
  <div v-else><strong>{{data.key}}{{data.headerText}}<strong></div></div>`,
  data: function(){
    return {
      data:{},
      empty:false,
    }
  },
  mounted() {
    if(this.data.key == "" || this.data.key == null) {
      this.empty = true
    }
  }
})

Vue.use(VueNotifications, options)
import { Switch as cSwitch } from '@coreui/vue'

export default {
    name: 'StaffList',
    components: {
      ToolbarPlugin,
      GridPlugin,
        AsideTogglerStaff,
        AppHeader,
        DefaultToggler,
        AppSidebar,
        AppAside,
        TheFooter,
        Breadcrumb,
        SidebarForm,
        SidebarFooter,
        SidebarToggler,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer,
        cSwitch
    },
     provide: {
            grid: [ Group,PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, ColumnChooser,Reorder ]
    },
    data: function () {
      return {
        labelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div ><b-badge style="font-weight:lighter;margin:3px" v-for="label in data.user_type.designation.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          lineManagers : [],
          buttonLM: function () {
              return {
                  template: Vue.component('buttonLM', {
                      template: `<div style="line-height:4">{{data.user_type.designation.name}}<AsideTogglerStaff id="toggler"/></div>`,
                      components:{
                        AsideTogglerStaff,
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
          module:null,
          formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "Designations",
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
            department:[],
            designation:[],
            designationBudget:[],
            departmentBudget:[],
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
           addTemplate: function () {
              return {
                  template: Vue.component("addTemplate", {
                      template: `<b-badge id="label1" variant="success" ><i class="fa fa-plus"></i>&nbsp<span v-text="$ml.get('add')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                dateTemplate: function () {
              return {
                  template: Vue.component("dateTemplate", {
                      template: `<span>{{ data.created_date | moment("dddd, MMMM Do YYYY") }}</span>`,
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
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-edit"></i>&nbsp<span v-text="$ml.get('edit')"></span></b-badge>`,
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
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-trash-o"></i>&nbsp<span v-text="$ml.get('delete')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
            LMTemplate: function () {
              return {
                  template: Vue.component("LMTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="icon-people"></i>&nbsp<span v-text="$ml.get('viewlm')"><AsideTogglerStaff/></span></b-badge>
                      `,
                      components:{
                        AsideTogglerStaff
                      },
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
          groupOptions: { showDropArea: false, columns: ['user_type.department.department_name', 'user_type.designation.name'],
          captionTemplate: function() {
            return {
              template : captionVue
            }
          } },
           height : window.innerHeight*0.695,
          toolbar: [
          'Search',
          { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4} ,
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
                lineManagersBudget:[],
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
            editStaff(args) {
              console.log(args)

              this.$router.push(`/staff/details/${args.rowData._id}`);
            },
            rowSelected(args) {
              if(args.target.outerHTML == `<span class="icon-people"></span>`) {
                this.lineManagers = []
                this.lineManagersBudget = []
                api.get(`${apiUrl}line/managers/find/all/${args.data._id}`).then((res) =>{
                    this.lineManagers = res.data
                    this.designation =[]
                    this.department = []
                    for(var i=0;i<this.lineManagers.length;i++) {
                      this.designation.push(this.lineManagers[i][0].designation.name)
                      this.department.push(this.lineManagers[i][0].department.department_name)
                    }
                })
                api.get(`${apiUrl}line/managers/find/settings/${args.data._id}`).then((res) => {
                  this.lineManagersBudget = res.data
                  console.log(res.data)
                  this.designationBudget =[]
                    this.departmentBudget = []
                  for(var i=0;i<this.lineManagersBudget.length;i++) {
                    
                    if(!this.lineManagersBudget[i][0]) {
                      this.designationBudget.push("")
                      this.departmentBudget.push("")
                    }
                    else {
                      this.designationBudget.push(this.lineManagersBudget[i][0].designation.name)
                      this.departmentBudget.push(this.lineManagersBudget[i][0].department.department_name)
                    }
                  }
                })
              }
            },
            addEditHandler(args) {
              var selected = this.$refs.overviewgrid.getSelectedRecords()
                if(args.item.id == "add") {
                    console.log(args)
                    this.$router.push('/staff/add');
                }
                if(selected.length>0) {
                if(args.item.id == "edit") {
                    this.$router.push(`/staff/details/${selected[0]._id}`);
                }
                if(args.item.id == "delete") {
                  axios.delete(`${apiUrl}staff/staff/delete/one/${selected[0].user_type._id}`,{withCredentials:true}).then((resp) => {
                    console.log(resp.data)
                    axios.delete(`${apiUrl}user/subuser/delete/${selected[0]._id}`,{withCredentials:true}).then((res) => {
                        axios.get(`${apiUrl}`+`user/subuser/see/all`,{ withCredentials : true})
                       .then(response => {this.datasrc = response.data})
                    })
                  })
                }
              }
              if (args.item.text === 'Export Excel') {
                    this.$refs.overviewgrid.excelExport()
                }
                if (args.item.text === 'Export Pdf') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
                clickHandler(args) {
                  if (args.item.id === 'small') {
            this.rowHeight = 20;
            }
        
        if (args.item.id === 'medium') {
            this.rowHeight = 30;
        }
        if (args.item.id === 'big') {
            this.rowHeight = 60;
        }
                }
            
        },
        async mounted () { 
          
                axios.get(`${apiUrl}`+`user/subuser/see/all`,{ withCredentials : true})
              .then(response => {
                console.log(response.data)
                this.datasrc = response.data})
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
  font-weight:lighter;
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
  .e-grid .e-groupcaption, .e-grid .e-indentcell, .e-grid .e-recordplusexpand, .e-grid .e-recordpluscollapse {
    background-color: white;
    color: #000;
}
.e-grid .e-groupcaption, .e-grid .e-indentcell, .e-grid .e-recordplusexpand, .e-grid .e-recordpluscollapse {
    background-color: white;
    color: #000;
}
.e-grid .e-rowcell, .e-grid .e-groupcaption, .e-grid .e-indentcell, .e-grid .e-recordplusexpand, .e-grid .e-recordpluscollapse, .e-grid .e-detailrowcollapse, .e-grid .e-detailrowexpand, .e-grid .e-detailindentcell, .e-grid .e-detailcell {
    border-color: white;
    border-top-color: white;
    border-right-color: white;
    border-bottom-color: white;
    border-left-color: white;
}
#toggler {
  margin-top:10px;
  border-radius: 50px;
  height: 30px;
  width:30px;
  content:'\E81E';
  padding:0;
  margin-top:5;
}
#toggler:focus {
  color:grey;
  margin-top:10px;
  border-radius: 50px;
  height: 30px;
  width:30px;
  content:'\E81E';
  padding:0;
  margin-top:5;
}
#toggler2 {
  margin:10px;
  border-radius: 50px;
  background: black;
  height: 20px;
  width:20px;
  content:'\E81E';
  padding:0;
  margin:0;
}
#new_aside {
  width:350px;
}
html:not([dir="rtl"]) #new_aside {
    margin-right: -350px;
}
@media (min-width: 992px) {
html:not([dir="rtl"]) .aside-menu-show #new_aside, html:not([dir="rtl"]) .aside-menu-lg-show #new_aside {
  margin-right:0px;
}
html:not([dir="rtl"]) .aside-menu-fixed #new_aside, html:not([dir="rtl"]) .aside-menu-off-canvas .#new_aside {
    right: 100px;
}
}
</style>