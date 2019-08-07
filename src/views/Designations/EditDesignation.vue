<template>
	<div class="animated slideInLeft" style="animation-duration:100ms">
		<b-card>
                <b-form v-on:submit.prevent="editDesig">
                    <b-tabs>
                      <b-tab :title="$ml.get('designation')" active>
                      	<b-form-group style="padding:2%">
                          <b-col sm="6">
                      		<ejs-textbox v-model="input.name" floatLabelType="Auto" :placeholder="$ml.get('designation')"></ejs-textbox>
                        </b-col>
                      		<b-col sm="6">
                            <label v-text="$ml.get('parentdesig')"></label>
                            <treeselect :default-expand-level="10" :placeholder="$ml.get('pholdparentdesig')" v-model="input.parent_designation_id" :multiple="false" :options="data" />
                          </b-col>
                          <!-- <div v-if="!clicked">
                            <b-col sm="6">
                              
                          <ejs-dropdownlist :change="changeDesig" :showClearButton="true"  v-model="input.parent_designation_id" floatLabelType="Auto" :groupTemplate="desigTemplate" :allowFiltering="true" :dataSource='data' :fields='desig_fields' popupHeight='300' :placeholder="$ml.get('pholdparentdesig')" ></ejs-dropdownlist>
                        </b-col>
                        </div>
                        <div v-else>
                          <b-col sm="6">
                            <label v-text="$ml.get('designation')"></label>
                            <treeselect :placeholder="$ml.get('pholddesig')" v-model="input.designation" :multiple="false" :options="data" />
                          <ejs-dropdownlist :change="changeDesig" :showClearButton="true" v-model="input.parent_designation_id" :allowFiltering="true" :dataSource='data' :fields='desig_fields'  popupHeight='300' :placeholder="$ml.get('pholdparentdesig')" ></ejs-dropdownlist>
                        </b-col>
                        </div> -->
                        <b-col sm="6">
                          <label v-text="$ml.get('department')"></label>
                          <treeselect :default-expand-level="10" @select="changeDesig" :placeholder="$ml.get('pholdparentdept')" v-model="input.department" :multiple="false" :options="department" />
                        </b-col>
				  		</b-form-group>
				  	  </b-tab>
			  		  <b-tab :title="$ml.get('permissions')">
			  		    <div class="col-lg-15 control-section">
					        <div class="content-wrapper">
					             <div class="control-section">
                        <b-row>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('modulename')"></span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('readown')"></span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('readall')"></span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('addall')"></span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('editall')"></span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('deleteall')"></span>
                          </b-col>
                          <b-col>
                            <span v-text="$ml.get('others')"></span>
                          </b-col>
                        </b-row>
                        <hr>
                        <div v-for="(run,i) in datasrc" :key="i">
                          <b-row style="margin:10px;">
                          <b-col style="padding-right:0px">
                            <span>{{datasrc[i].text}}</span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_own" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_own" @change="setReadOwn(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_all" :uncheckedValue="false" :checkedValue="true" disabled/>
                          </div>
                          <div v-else>
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_all" @change="setReadAll(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                          </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].write" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].edit" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].edit" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                            
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].delete" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].delete" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                            
                          </b-col>
                          <b-col style="padding-right:0px;">
                            <b-tooltip target="exButton1" title="Additional Permissions Available!"></b-tooltip>
                            <div v-if="i==7">
                            <b-btn id="exButton1" variant="primary" size="sm" @click="toggle(`${i}`)" ><i class="fa fa-plus-square"></i></b-btn>
                          </div>
                          <div v-else>
                            <b-btn id="exButton2" variant="primary" size="sm" @click="toggle(`${i}`)" disabled><i class="fa fa-plus-square"></i></b-btn>
                          </div>
                          </b-col>
                        </b-row>
                        </div>
					            <!-- <ejs-grid ref='overviewgrid' :editSettings='editSettings' :rowHeight='rowHeight' :allowResizing='true'   id='overviewgrid' :dataSource="datasrc"  :allowSorting='true' :allowSelection="true" :actionComplete="actionComplete" :rowSelected="rowSelected" :rowDeselected="rowDeselected" :selectionSettings="selectionSettings"
					                 :enableHover='true' :dataBound="dataBound" :load="load">
					                <e-columns>
					                    <e-column field='text'  headerText='Module Name'  :isPrimaryKey='true'></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='edit' headerText='Edit'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='delete' headerText='Delete'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='read' headerText='Read'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='write' headerText='Add'   ></e-column>
					                </e-columns>
					            </ejs-grid> -->
					        </div>
					    </div>
					</div>
			    </b-tab>
          <b-tab :title="$ml.get('labels')">
            <b-form-group>
                    <div v-for="(run,i) in input.labels" :key="i">
                      <b-badge style="font-weight:400;margin:5px;font-size:15px;" :variant="input.labels[i].color">{{input.labels[i].label_name}}</b-badge>
                      <b-btn style="float:right" @click="delLabel(`${input.labels[i]._id}`,`${input._id}`,`${i}`)" size="sm" variant="danger"><i class="fa fa-trash-o"></i></b-btn>
                    </div>
                    <b-form v-on:submit.prevent = "selectLabel(`${input._id}`)">
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
                  </b-form-group>
          </b-tab>
              </b-tabs>
              <br>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
            </b-card>
            <b-modal size="sm" :title="$ml.get('label')" class="modal-primary" v-model="addModal" @ok="addModal = false" hide-footer>
              <b-form v-on:submit.prevent="addLabel(`${input._id}`)">
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
            <b-modal size="md" :title="module+' Permissions'" class="modal-primary" v-model="permissionmodal" @ok="permissionmodal = false" hide-footer>
              <div v-if="module =='Company'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='User'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='User Group'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='Department'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='Designation'">
                <br>
                No Additional Permissions
                <br>
              </div>

              <div v-if="module =='Head'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='Label'">
                <br>
                No Additional Permissions
                <br>
              </div>
              <div v-if="module =='Approval'">
                
                <label v-text="$ml.get('bydept')"></label>
                <br>
                <c-switch class="mx-1" @change="setDept" color="primary" name="switch1" v-model="by_dept" :uncheckedValue="false" :checkedValue="true"/>
                <br>
                <label v-text="$ml.get('byhead')"></label>
                <br>
                <c-switch class="mx-1" @change="setHead" color="primary" name="switch1" v-model="by_heads" :uncheckedValue="false" :checkedValue="true"/>
                <br>
                <div v-if="by_heads">
                <label v-text="$ml.get('heads')"></label>
                <treeselect :default-expand-level="10" :flat="true" :placeholder="$ml.get('pholdheads')" v-model="approval_permissions.by_heads.allowed_heads" :multiple="true" :options="heads" />
              </div>
              </div>
              <div v-if="module =='Budget Settings'">
                <br>
                No Additional Permissions
                <br>
                
              </div>
              <div v-if="module =='Staff'">
                <br>
                No Additional Permissions
                <br>
                
              </div>
            </b-modal>
                </div>
</template>

<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import ml from '@/ml'
import Vue from 'vue'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Browser } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import miniToastr from 'mini-toastr' 
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import { Switch as cSwitch } from '@coreui/vue'
import {CoolSelect} from 'vue-cool-select';
import { Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    Vue.use(ToolbarPlugin);
    Vue.use(TextBoxPlugin)
    Vue.use(PivotViewPlugin);
    Vue.use(GridPlugin);
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

var departments = []
var designations = []
var new_department = ""

export default {
    name: "EditDesignation",
    components :  {
      cSwitch,
      CoolSelect,
      Treeselect,
      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList,
  Edit
    },
    data : function() {
        return {
          by_dept:false,
          by_heads:false,
          groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          desigTemplate: function () {
              return {
                  template: desigVue
              }
          },
          approval_permissions:{
            by_department:{
              status:false
            },
            by_heads:{
              status:false,
              allowed_heads:null
            },

          },
          addModal :false,
          selected:false,
          link:"",
          key:"",
          formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "Designations",
                  description : ""
                },
                isShowRight:false,
          clicked1:false,
            department:[],
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 15},
             editSettings: { allowSelection:true, allowEditing: true, allowAdding: true, allowDeleting: true},
             rowHeight: 30,
              toolbar: [     
          'Add', 'Delete', 'Update', 'Cancel',
          'ExcelExport','PdfExport',
                { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
                { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
                { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
            ],
            selectionSettings : {type:"Single"},
            data: [],
            datasrc:[
            	{module_name:"company",text:"Company",read:false,write:false,edit:false,delete:false},{module_name:"subuser",text:"User",read:false,write:false,edit:false,delete:false},
	            {module_name:"subgroup",text:"User Group",read:false,write:false,edit:false,delete:false},{module_name:"dept",text:"Department",read:false,write:false,edit:false,delete:false},
	            {module_name:"desig",text:"Designation",read:false,write:false,edit:false,delete:false},{module_name:"head",text:"Head",read:false,write:false,edit:false,delete:false},
	            {module_name:"label",text:"Label",read:false,write:false,edit:false,delete:false},{module_name:"preApp",text:"Approval",read:false,write:false,edit:false,delete:false},
	            {module_name:"budSet",text:"Budget Settings",read:false,write:false,edit:false,delete:false},
	            {module_name:"staff",text:"Staff",read:false,write:false,edit:false,delete:false},
	            {module_name:"trans",text:"Transaction",read:false,write:false,edit:false,delete:false},
              {module_name:"importTrans",text:"Transaction Upload",write:false},
              {module_name:"budtrans",text:"Budget Transfer",read:false,write:false,edit:false,delete:false},
              {module_name:"paymentorder",text:"Payment Order",read:false,write:false,edit:false,delete:false}
              ],
              additionalpermission:[
              {module_name:"company",text:"Company",read_own:false},{module_name:"subuser",text:"User",read_own:false},
              {module_name:"subgroup",text:"User Group",read_own:false},{module_name:"dept",text:"Department",read_own:false},
              {module_name:"desig",text:"Designation",read_own:false},{module_name:"head",text:"Head",read_own:false},
              {module_name:"label",text:"Label",read_own:false},{module_name:"preApp",text:"Approval",read_own:false},
              {module_name:"budSet",text:"Budget Settings",read_own:false},
              {module_name:"staff",text:"Staff",read_own:false},
              {module_name:"trans",text:"Transaction",read_own:false},
              {module_name:"importTrans",text:"Transaction Upload",read_own:false},
              {module_name:"budtrans",text:"Budget Transfer",read_own:false},
              {module_name:"paymentorder",text:"Payment Order",read_own:false}
              ],
              selectedLabel:null,
            modal :false,
            input:{},
            selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
          desig_fields:{groupBy:'parent_designation_id',text:"name",value:"_id"},
          permissions:{},
          clicked:false,
          modules:[
            
          ],
          heads:[],
          module:"",
          permissionmodal:false,
          squarePalettesColn: 7,
          circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
          labels:[],
          module_fields:{text:"text",value:"value"} 
   };
  },
  
  async mounted() {
  	this.link = window.location.href
  	this.key = this.link.split('edit/').pop()
  	api.get(`${apiUrl}`+`designation/desig/get/one/${this.key}`).then((res) =>{
  		this.input.department = res.data.department
      this.input._id = res.data._id
      this.input.parent_designation_id = res.data.parent_designation_id
      this.input.name = res.data.name
      this.input.labels = res.data.labels
      console.log(this.input.labels)
  	})
    api.get(`${apiUrl}`+`label/label/find/by/Designations`).then((res) => {
        this.labels = res.data
      })
    api.get(`${apiUrl}/super/group/subgroup/find/by/${this.key}`).then((res) => {
      this.datasrc = res.data.permissions
      this.additionalpermission = res.data.additional_permissions
      this.approval_permissions = res.data.approval_permissions
      this.by_heads = this.approval_permissions.by_heads.status
      this.by_dept = this.approval_permissions.by_department.status
    })
    axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = this.list_to_tree_dept(res.data)
      })
      axios.get(`${apiUrl}`+`designation/desig/get/all`,{withCredentials:true}).then((res) => {
        this.data = this.list_to_tree_desig(res.data)
      })
      api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
      this.heads = this.list_to_tree_head(response.data)
      });

    },
  provide: {
            grid: [Edit,Resize, Selection, Sort,Toolbar]
        },
  watch : {
    'by_dept' : function(){
      if(this.by_dept) {
        this.by_heads = false
      }
    },
    'by_heads' : function(){
      if(this.by_heads) {
        this.by_dept = false
      }
    },
    'input.department' : function(){
      console.log("asd")
      if(this.input.department == null || this.input.department == "") {
        axios.get(`${apiUrl}dropdown/designation/no/dept`,{withCredentials:true}).then((res) => {
          this.data = this.list_to_tree_desig(res.data)
        })
      }
      else {
        axios.get(`${apiUrl}dropdown/designation/find/${this.input.department}`,{withCredentials:true}).then((res) => {
          this.data = this.list_to_tree_desig(res.data)
        })
      }
    }
  },
   methods:{
    setReadAll(args) {
      
      if(this.datasrc[args].read_all) {
        this.additionalpermission[args].read_own = false
        this.additionalpermission[args].read = true
      }
    },
    setReadOwn(args) {
      if(this.additionalpermission[args].read_own) {
        this.additionalpermission[args].read_all = false
        this.datasrc[args].read = true
      }
    },
    setDept(args) {
      this.approval_permissions.by_department.status = args
      this.approval_permissions.by_heads.status = !args
    },
    setHead(args) {
      this.approval_permissions.by_heads.status = args
      this.approval_permissions.by_department.status = !args
    },
    list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined ) {
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
    rowSelected(args) {
      this.$refs.overviewgrid.startEdit(args.data)
    },
    rowDeselected(args) {

    }, 
    toggle(i) {
      this.module = this.datasrc[i].text
      this.permissionmodal = true
    },
    load(args) {
      
    },
    dataBound(args) {
      
    },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
      }, 
    delLabel(args,id,label) {
      console.log(args,id,label)
      var body = {
        labels : args
      }
      api.put(`${apiUrl}designation/desig/pop/label/${id}`,body).then((res) => {
        api.get(`${apiUrl}`+`designation/desig/get/one/${this.key}`).then((res) =>{
          this.input.labels = res.data.labels
          console.log(this.input.labels)
        })
      })
      
    },
    addLabel (args) {
      this.addModal =false
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((label)=>{
                var id = {
                  labels :  label.data._id
                }
                  api.get(`${apiUrl}`+`label/label/find/by/Designations`).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.input.labels)
              });
      },
    selectLabel(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.input.labels.push(label);
          this.selectedLabel = null
        })

        var data = {
          labels : this.selectedLabel
        }
        api.put(`${apiUrl}designation/desig/push/label/${args}`,data).then((res) => {
            
        })
      }
      },
    list_to_tree_desig(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_designation_id != undefined ) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_designation_id]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDesig(roots)
          return roots
      },
      list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined ) {
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
      convertDataDesig(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDesig(roots[i].children);
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
   	actionComplete(args) {
   		console.log(args)
   	},
      changeDept(args) {
      	if(args.e!=null) {
      		console.log(args.itemData._id)
      		// api.get(`${apiUrl}`+`designation/desig/find/`+`${args.itemData._id}`).then((res) => {
      		// 	if(this.input.parent_designation_id !=null) {
      		// 		console.log("ASdasd")
      		// 	this.input.parent_designation_id = null
      		// 	this.data.shift()
      		// }
      		// 	this.data = res.data
      		// })
      	}
      },
      editDesig(args) {
        this.$validator.validate().then(valid => {
            if (!valid) {
              console.log(valid)
            }
            else{
              var user_group = {
                permissions:this.datasrc,
                additional_permissions : this.additionalpermission,
                approval_permissions : this.approval_permissions,
              }
              console.log(this.input)
              api.put(`${apiUrl}`+`designation/desig/update/${this.key}`,this.input).then((response) => {
                console.log(response.data)
                    api.put(`${apiUrl}`+`super/group/subgroup/edit/by/${this.key}`,user_group).then((res) => {
                        console.log(res)
                        this.$router.push('/designation/list')
                    })
                })
            }
            
          })
      
      },
      actionComplete(args) {
        
      },
       onClick(args) {
            let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            console.log(data);
            if(data[0].user_type == "SuperAdmin" || 
               data[0].user_type == "Staff" || 
               data[0].user_type == "Vendor" ||
               data[0].user_type == "Student" || 
               data[0].user_type == "Guest") {
                this.$router.push(`/usertype/per/`+`${data[0].user_type}`)
            }
            else {
                this.$router.push(`/usertype/`+`${data[0].parentItem.user_type}/per/`+`${data[0]._id}`)
            }
       },

       Add(args) {
           let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            console.log(data);
            if(data.user_type == "SuperAdmin" || 
                        data.user_type == "Staff" || 
                        data.user_type == "Vendor" ||
                        data.user_type == "Student" || 
                        data.user_type == "Guest") {
            }
       },
       failure: function(args) {
        debugger;
      },
      prevent(args) {
          this.changeFields(args)
      },
      changeDesig(args) {
      	if(this.input.department == null || this.input.department == "") {
          axios.get(`${apiUrl}dropdown/designation/no/dept`,{withCredentials:true}).then((res) => {
            this.data = this.list_to_tree_desig(res.data)
          })
        }
        else {
          axios.get(`${apiUrl}dropdown/designation/find/${this.input.department}`,{withCredentials:true}).then((res) => {
            this.data = this.list_to_tree_desig(res.data)
          })
        }
      },
      clickHandler(args){
        if(args.item.id === 'add') {
            this.$router.push('/designation/add')
              this.modal = true
              departments=[]
          }
          if(args.item.id == 'collapse') {
            this.$refs.treegrid.collapseAll()
          }
          if(args.item.id == 'expand') {
            this.$refs.treegrid.expandAll()
          }
        if(args.item.id == 'delete') {
                            var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
                              api.delete(`${apiUrl}`+`designation/desig/delete/`+`${data[0]._id}`).then((res) => {
                                api.get(`${apiUrl}`+`designation/desig/get/all`)
                                .then((res) => {
                                  this.data = res.data
                                  });
                              });
                            
                          }
        if (args.item.id === 'exportPdf') {
            this.$refs.treegrid.pdfExport({hierarchyExportMode: 'All'});
        }
         if (args.item.id === 'exportExcel') {
            this.$refs.treegrid.excelExport();
        }
        
        if (args.item.id === 'small') {
            this.rowHeight = 20;
            }
        
        if (args.item.id === 'medium') {
            this.rowHeight = 30;
        }
        if (args.item.id === 'big') {
            this.rowHeight = 60;
        }
      },
      switchNow() {
        this.clicked=true
        this.data = designations
      },
      switchNow1() {
        this.clicked1=true
      },
      
    //    rowDataBound(args) {
    //             let value = this.$refs.rows.ej2Instances.value;
    //             let rowval = getValue('taskID', args.data );
    //             if (value.indexOf(rowval) !== -1) {
    //                 addClass([args.row as Element], 'disableRow');
    //             } else {
    //                 removeClass([args.row as Element], 'disableRow');
    //             }
    //         },
  },
};
</script>