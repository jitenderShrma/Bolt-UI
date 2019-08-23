<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
  <AppAside id="new_aside" style="height: calc(100vh - 60px);top:-8.7%">
        <div style="float:right ">
        <DefaultToggler style="line-height:2"/>
        </div>
        <b-tabs>
    <b-tab>
      <template slot="title">
        <i class='icon-list'></i>
      </template>
      <b-list-group class="list-group-accent">
        <b-list-group-item class="list-group-item-accent-secondary py-1 bg-light text-center font-weight-bold text-muted text-uppercase small">
          Timeline
        </b-list-group-item>
        <div v-for="(lg,i) in log.slice().reverse()">
        <b-list-group-item href="#" :class="color[i]">
          <div class="avatar float-left mr-1">
            <img class="img-avatar" src="img/avatars/7.jpg" alt="admin@bootstrapmaster.com">
          </div>
          <div>
            <span v-if="!lg.approved">{{lg.event}}</span>
            <span id="approved" v-if="lg.approved">{{lg.approved}}</span>
            <span v-if="lg.approved">{{lg.more}}</span>
            <span v-if="lg.by"> by <span id="name">{{lg.by}}</span></span>&nbsp;<span style="float:right" v-if="iconEnable && i==0"><i class="fa fa-exclamation-circle"></i></span><span style="float:right" v-if="lg.iconDouble"><i style="color:blue;font-weight:bold" class="icon-check"></i></span><span style="float:right" v-if="lg.iconTick && !lg.iconDouble"><i class="icon-check"></i></span>
          </div>
          <small class="text-muted mr-3">
            <i class="icon-calendar"></i>&nbsp;&nbsp;{{lg.date | moment("MMM Do YY, h:mm a")}}
          </small>
        </b-list-group-item>
        </div>
      </b-list-group>
      
    </b-tab>
  </b-tabs>
      </AppAside>
     <div id="target" class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar ref="toolbar" id="toolbargrid2" :clicked="addEditHandler">
              <e-items>
                  <e-item  align="right" id="add" :template="addTemplate" :text="$ml.get('add')"></e-item>
                  <e-item  align="right" id="cancel" :template="cancelTemplate" :text="$ml.get('cancel')"></e-item>
                  <e-item  align="right" id="release" :template="releaseTemplate" :text="$ml.get('release')"></e-item>
                <!-- <e-item align="right" id="label" :text="$ml.get('editlabels')"></e-item> -->
              </e-items>
            </ejs-toolbar>
            <div class="control-section">
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true' :allowReordering='true'  id='overviewgrid' :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="datasrc" :allowTextWrap='true' :allowFiltering='true' :sortSettings='sortOptions' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :actionBegin="actionBegin" :toolbar="toolbar" :toolbarClick="clickHandler" :rowSelected="rowSelected" :rowDeselected="rowDeselected"
                :height="height" :enableHover='false'> 
                <e-columns>
                    <e-column :visible="enableColumn" headerText='Accept/Reject' width='140' :template="buttonTemplate"></e-column>
                    <e-column :visible="false" field="last_updated" headerText='last_updated' width='140'></e-column>
                    <e-column field='ref_id' :template="buttonLM" headerText='Ref ID' width="141"  :filter='filter' ></e-column>
                    <e-column :sortComparer='sortComparer' field='status' headerText='Status' width="137" :filter='filter' ></e-column>
                    <e-column field='request_by.user_name' width="120" headerText='Req By'  :filter='filter' ></e-column>
                    <e-column field='month' :template="monthTemplate" width="117" headerText='Month' :filter='filter' ></e-column>
                    <e-column field='amount' headerText='Amount' width="126" :filter='filter' ></e-column>
                    <e-column field='approval_type' headerText='Type' width="108" :filter='filter' ></e-column>
                    <e-column field='labels[0].label_name' width="116" headerText='Labels' :template="labelTemplate" :filter='filter' ></e-column>
                    
                    <e-column field='recurring_rate' headerText='Recur Rate' width="138" :filter='filter' ></e-column>
                    <e-column field='budget_head.name' headerText='Head' width="110" :filter='filter' ></e-column>
                    <e-column field='department.department_name' headerText='Department' width="145" :filter='filter' ></e-column>
                    <e-column field='description' headerText='Description' width="143" :filter='filter' ></e-column>
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
              <b-row>
                  <b-col>
                  <b-badge style="font-weight:lighter;margin:5px;font-size:15px;" :variant="editinput.labels[i].color">{{editinput.labels[i].label_name}}</b-badge>
                </b-col>
                <b-col>
                  <b-btn v-on:click="editLabel(editinput.labels[i])" size="sm" variant="primary" v-text="$ml.get('edit')"></b-btn>
                </b-col>
                <b-col>
                  <b-btn v-on:click="delLabel(`${editinput.labels[i]._id}`,`${editinput._id}`,`${i}`)" size="sm" variant="danger"><i class="fa fa-trash-o"></i></b-btn>
                </b-col>
              </b-row>
            </div>
            <b-form v-on:submit.prevent = "selectLabel(`${editinput._id}`)">
                      <label v-text="$ml.get('labels')"></label>
                      <cool-select menuItemsMaxHeight="100px" :items="labels" item-text="label_name" item-value="_id" v-model="selectedLabel">
                        <div slot="item" slot-scope = "{item :label}">
                          <b-badge style="font-weight:lighter;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="selection" slot-scope = "{item :label}">
                          <b-badge style="font-weight:lighter;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
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
              </div>
              <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </div>
                </b-form>
            </b-modal>
            <b-modal size="sm" :title="$ml.get('editlabel')" class="modal-primary" v-model="editlabelmodal" @ok="editlabelmodal = false" hide-footer>
              <b-form v-on:submit.prevent="editdeptLabel(`${editinput._id}`)">
              <div class="content-wrapper textbox-default">
              <div class="row">
              <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                      <ejs-textbox v-model="editlabel.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
              </div>
              </div>
              <br>
              <div class="row">
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <p>Label Color</p>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                          <ejs-colorpicker :modeSwitcher="false" :value="editlabel.color" mode="Palette" :columns="squarePalettesColn" :presetColors="circlePaletteColors" :change="onChange" id="color-picker"></ejs-colorpicker>
                  </div>
              </div>
              <br>
              <div class="multiline_wrapper">
                  <ejs-textbox v-model="editlabel.description" ref="textareaObj" id="default" :multiline="true" floatLabelType="Auto" placeholder="Description" required></ejs-textbox>
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
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '../../shared/classes'
import toggleClasses from '../../shared/toggle-classes'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import AsideToggler from '../../shared/AsideToggler'
import DefaultToggler from '../../shared/AsideTogglerClose'
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
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
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
      GridPlugin,
      AsideToggler,
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
        SidebarMinimizer,DatePickerPlugin,
        NumericTextBoxPlugin
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder]
        },
    data: function () {
      return {
        labels:[],
        write:true,
                delete_own:true,
        addModal:false,
        sortOptions:{columns: [{field: 'status', direction: 'Descending'},{field: 'last_updated', direction: 'Descending'}]},
        buttonLM: function () {
              return {
                  template: Vue.component('buttonLM', {
                      template: `<div style="line-height:4">{{data.ref_id}}<AsideToggler id="toggler"/></div>`,
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
                          axios.get(`${apiUrl}`+`/approval/level1/accept/${this.data.ref_id}`,{withCredentials:true}).then((res) => {
                            console.log(res.data)
                            window.location.reload();
                          })
                        },
                        rejectReq() {
                          axios.get(`${apiUrl}`+`/approval/level1/reject/${this.data.ref_id}`,{withCredentials:true}).then((res) => {
                            console.log(res.data)
                            window.location.reload();
                          })
                        }
                      },
                      mounted() {
                        var data =  JSON.parse(localStorage['session_key'])
                        if(data.user) {
                          this.designation = data.user.user_type.designation
                          if(this.data.assigned_to_designation == this.designation && this.data.status=="PENDING") {
                            this.yes=true
                            console.log(data.user.user_type.designation)
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
                      template: `<div ><b-badge style="font-weight:lighter;margin:3px" v-for="label in data.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          headlabelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div><b-badge style="font-weight:lighter;margin:3px" v-for="label in data.budget_head.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
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
                  color : "2196f3",
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
            cancelTemplate: function () {
              return {
                  template: Vue.component("cancelTemplate", {
                      template: `<b-badge id="label1" variant="warning" ><i class="fa fa-trash-o"></i>&nbsp<span id="hide" v-text="$ml.get('cancel')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                releaseTemplate: function () {
              return {
                  template: Vue.component("releaseTemplate", {
                      template: `<b-badge id="label1" variant="danger" ><i class="icon-action-undo"></i>&nbsp<span id="hide" v-text="$ml.get('release')"></span></b-badge>`,
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
          enableColumn:false,
          link:'',
          key:'',
          pending:false,
           height : window.innerHeight*0.695,
          toolbar: [
          'CsvExport',
            'Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
            editlabelmodal:false,
            editlabel:{},
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
                selectedLabel:null,
                filter: {
                    type: 'CheckBox'
                },
                log:[],
                color:['list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-success list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-success list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-success list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3','list-group-item-accent-success list-group-item-divider py-3','list-group-item-accent-info list-group-item-divider py-3','list-group-item-accent-primary list-group-item-divider py-3','list-group-item-accent-danger list-group-item-divider py-3','list-group-item-accent-warning list-group-item-divider py-3'],
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                iconEnable : false,
                loglen:0,
                iconTick :false,
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { persistSelection: true, type: 'Multiple' }
            };
        },
  methods: {
    editdeptLabel() {
      var id = this.editlabel._id
      this.editlabel._id = undefined
      api.put(`${apiUrl}label/label/edit/${id}`,this.editlabel).then((res) => {
        console.log(res.data)
      })
      this.$router.go(0)
    },
    rowSelected(args) {
      if(args.target.outerHTML == `<span class="icon-people"></span>`) {
        api.get(`${apiUrl}approvals/preApp/timeline/get/${args.data._id}`).then((res) =>{
            if(res.data) {
              this.log = JSON.parse(JSON.stringify(res.data.log))
              this.loglen = this.log.length - 1
              console.log(this.log[this.loglen])
              if(this.log[this.loglen].event.includes("Request sent to")
                || this.log[this.loglen].event.includes("Approval sent for")) {
                this.iconEnable = true
              }
              else{
                this.iconEnable = false
              }
              if(this.log[this.loglen].event.includes("Approved at Level")
                ) {
                this.log[this.loglen].iconDouble = true
              console.log("icon")
              }
              else{
                this.log[this.loglen].iconDouble = false
              }
              for(var i=0;i<this.log.length;i++) {
                if(this.log[i].event == "Approved at Level 1") {
                  if(res.data.approval_id.level1approved.by) {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 1"
                    this.log[i].by = res.data.approval_id.level1approved.by.personal_details.name
                    this.log[i].iconTick = true
                  }
                  else {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 1"
                    this.log[i].by = "Admin"
                    this.log[i].iconTick = true
                  }
                }
                if(this.log[i].event == "Approved at Level 2") {
                  if(res.data.approval_id.level2approved.by) {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 2"
                    this.log[i].by = res.data.approval_id.level2approved.by.personal_details.name
                    this.log[i].iconTick = true
                  }
                  else {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 2"
                    this.log[i].by = "Admin"
                    this.log[i].iconTick = true
                  }
                }
                if(this.log[i].event == "Approved at Level 3") {
                  if(res.data.approval_id.level3approved.by) {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 3"
                    this.log[i].by = res.data.approval_id.level3approved.by.personal_details.name
                    this.log[i].iconTick = true
                  }
                  else {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 3"
                    this.log[i].by = "Admin"
                    this.log[i].iconTick = true
                  }
                }
                if(this.log[i].event == "Approved at Level 4") {
                  if(res.data.approval_id.level4approved.by) {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 4"
                    this.log[i].by = res.data.approval_id.level4approved.by.personal_details.name
                    this.log[i].iconTick = true
                  }
                  else {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 4"
                    this.log[i].by = "Admin"
                    this.log[i].iconTick = true
                  }
                }
                if(this.log[i].event == "Approved at Level 5") {
                  if(res.data.approval_id.level5approved.by) {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 5"
                    this.log[i].by = res.data.approval_id.level5approved.by.personal_details.name
                    this.log[i].iconTick = true
                  }
                  else {
                    this.log[i].approved = "Approved"
                    this.log[i].more = " at Level 5"
                    this.log[i].by = "Admin"
                    this.log[i].iconTick = true
                  }
                }
              }
            }
            // for(var i=0;i<this.lineManagers.length;i++) {
            //   this.designation.push(this.lineManagers[i][0].designation.name)
            //   this.department.push(this.lineManagers[i][0].department.department_name)
            // }
        })
      }
    },
    rowDeselected(args) {
      this.log = []
    },
    editLabel(args) {
      console.log(args)
      this.editlabelmodal = true
      this.editlabel._id = args._id
      this.editlabel.label_name = args.label_name
      this.editlabel.description =args.description
      this.editlabel.color =`#`+`${args.color}`
      
    },
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
        this.editlabel.color = args.currentValue.hex.slice(1);
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
                    this.$router.push('/approval/add');
                }
                if(args.item.id == "cancel") {
                  if(data.length>0) {
                    axios.put(`${apiUrl}approvals/preApp/cancel/label/${data[0].ref_id}`).then((res) => {
                        console.log(res)
                    })
                  }
                }
                if(args.item.id == "release") {
                  if(data.length>0) {

                    axios.get(`${apiUrl}approvals/preApp/release/${data[0].ref_id}`).then((res) => {
                        
                        api.get(`${apiUrl}`+`approvals/preApp/get/all`).then((response) => {
                          console.log(response.data)
                          var user =  JSON.parse(localStorage['session_key'])
                            this.datasrc = response.data;
                            for(var i =0;i<this.datasrc.length;i++) {
                              if(user.user) {
                                if(this.datasrc[i].status=="PENDING" && this.datasrc[i].assigned_to_designation==user.user.user_type.designation) {
                                   this.enableColumn =  true
                                }
                              }
                              else {
                                console.log("user")
                                if(this.datasrc[i].status=="PENDING") {
                                   this.enableColumn =  true
                                }
                              }
                              if(this.datasrc[i].request_by == null) {
                                this.datasrc[i].request_by = {
                                  user_name:"No longer exists!"
                                }
                              }
                              if(this.datasrc[i].department == null) {
                                this.datasrc[i].department = {
                                  department_name:"No longer exists!"
                                }
                              }
                              if(this.datasrc[i].budget_head == null) {
                                this.datasrc[i].budget_head = {
                                  name:"No longer exists!"
                                }
                              }
                              this.datasrc[i].labellist = "";
                              for(var j=0;j<this.datasrc[i].labels.length;i++) {
                                this.datasrc[i].labellist = this.datasrc[i].labellist+`${this.datasrc[i].labels[j].label_name},`
                              }
                            }
                            console.log(this.datasrc)
                })
                    })
                  }
                }
                
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
                sortComparer(reference,comparer) {
                  if(comparer == "PENDING"){
                    return -1;
                  }
                  else{
                    return 0
                  }
                }
            
        },
        watch:{
            'someval' : function() {
              console.log(this.someval);
            },
            $route (to, from){
              if(to.params.id == 'pending') {
                api.get(`${apiUrl}`+`approvals/preApp/view/requests`).then((response) => {
                    this.datasrc = response.data;
                })
                this.pending = true
              }
              else {
                api.get(`${apiUrl}`+`approvals/preApp/get/all`).then((response) => {
                    this.datasrc = response.data;
                })
                this.pending = false
              }
            }
        }, 
        async mounted () {
                this.$refs.dialogObj.hide();
                this.link = window.location.href;
                this.key = this.link.split('view/').pop()
                this.pending = false
                await api.get(`${apiUrl}`+`approvals/preApp/get/all`).then((response) => {
                  var user =  JSON.parse(localStorage['session_key'])
                    this.datasrc = response.data;
                    for(var i=0;i<this.datasrc.length;i++) {
                      if(user.user) {
                        if(this.datasrc[i].status=="PENDING" && this.datasrc[i].assigned_to_designation==user.user.user_type.designation) {
                           this.enableColumn =  true
                        }
                      }
                      else {
                        if(this.datasrc[i].status=="PENDING") {
                           this.enableColumn =  true
                        }
                      }
                      if(this.datasrc[i].request_by == null) {
                        this.datasrc[i].request_by = {
                          user_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].department == null) {
                        this.datasrc[i].department = {
                          department_name:"No longer exists!"
                        }
                      }
                      if(this.datasrc[i].budget_head == null) {
                        this.datasrc[i].budget_head = {
                          name:"No longer exists!"
                        }
                      }
                      this.datasrc[i].labellist = "";
                      for(var j=0;j<this.datasrc[i].labels.length;j++) {
                        this.datasrc[i].labellist = this.datasrc[i].labellist+`${this.datasrc[i].labels[j].label_name},`
                      }
                    }
                })
                api.get(`${apiUrl}`+`label/label/find/by/Approval`).then((res) => {
                  this.labels = res.data
                })
              
              // else{
              //   this.pending = true
              //   api.get(`${apiUrl}`+`approvals/preApp/view/requests`).then((response) => {
              //       this.datasrc = response.data;
              //       for(var i =0;i<this.datasrc.length;i++) {
              //         if(this.datasrc[i].request_by == null) {
              //           this.datasrc[i].request_by = {
              //             user_name:"No longer exists!"
              //           }
              //         }
              //         if(this.datasrc[i].department == null) {
              //           this.datasrc[i].department = {
              //             department_name:"No longer exists!"
              //           }
              //         }
              //         if(this.datasrc[i].budget_head == null) {
              //           this.datasrc[i].budget_head = {
              //             name:"No longer exists!"
              //           }
              //         }
              //         this.datasrc[i].labellist = "";
              //         for(var j=0;j<this.datasrc[i].labels.length;i++) {
              //           this.datasrc[i].labellist = this.datasrc[i].labellist+","+`this.datasrc[i].labels[j].label_name`
              //         }
              //       }
              //       console.log(response.data)
              //   })
              // }
        },
};
</script>
<style>
#approved {
  color:green;
}
#name{
  color:lightblue;
}
#label {
  font-weight:lighter;
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
  font-weight:lighter;
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
#toggler {
  float:right;
  margin:10px;
  border-radius: 50px;
  height: 20px;
  width:20px;
  padding:0;
  margin-top:5;
  content:'\E81E';
}
#toggler:hover {
  margin:10px;
  border-radius: 50px;
  background: grey;
  height: 20px;
  width:20px;
  content:'\E81E';
  padding:0;
  margin-top:5;
}
#toggler:focus {
  margin:10px;
  border-radius: 50px;
  height: 20px;
  background: grey;
  width:20px;
  content:'\E81E';
  padding:0;
  margin-top:5;
}
/*#toggler:focus {
  margin:10px;
  border-radius: 50px;
  height: 20px;
  background: grey;
  width:20px;
  content:'\E81E';
  padding:0;
  margin-top:5;
}*/
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
    margin-right: 0px;
}
html:not([dir="rtl"]) .aside-menu-fixed #new_aside, html:not([dir="rtl"]) .aside-menu-off-canvas .#new_aside {
    right: 0;
}
}

</style>