<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <div id="target" class="col-lg-12 control-section px-0">
        <div>
          <ejs-toolbar id="toolbar" :clicked="clickHandler">
            <e-items>
              <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate" ></e-item>
              <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
            </e-items>
          </ejs-toolbar>
          <div v-if="loading" id="loader">
          <div class="sk-fading-circle">
              <div class="sk-circle1 sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
        </div>
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex='1' childMapping='children' :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :rowSelected="rowSelected"
            :rowDeselecting="rowDeselecting"
            :enableCollapseAll="false" :dataBound="dataBound"
            :toolbar="toolbar" :toolbarClick="clickHandler"
            :allowSorting='true' :recordDoubleClick="editPage" :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <e-column :visible="false" field='id'></e-column>
                    <e-column  field='label' headerText='Designation Name' ></e-column>
                    <e-column field='department.department_name' headerText='Department' width='170' ></e-column>
                    <e-column  field='labels[0].label_name' :allowEditing="false" :template="labelTemplate" headerText='Labels' ></e-column>
                     <!-- <e-column headerText='Manage Permissions' width='140' :commands='commands'></e-column> -->
                </e-columns>
            </ejs-treegrid>
            <ejs-dialog header='Add A Label' showCloseIcon='true' :isModal='LabelModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
            target='#target' >
            <b-tabs>
                <b-tab :title="$ml.get('label')" active>
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
        </b-tab>
        <b-tab :title="$ml.get('pholdlabel')">
          <b-form v-on:submit.prevent = "selectLabel">
            <ejs-dropdownlist :showClearButton="true" v-model="selectedLabel" :allowFiltering="true" :dataSource='labels' :fields='label_fields' popupHeight='300' :placeholder="$ml.get('pholdlabel')"></ejs-dropdownlist>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
        </b-tab>
      </b-tabs>
        </ejs-dialog>
            <b-modal :title="$ml.get('adddesig')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
              <div>
                <b-form v-on:keydown.enter.prevent="prevent" v-on:submit.prevent="addDesig">
                  <b-form-group style="padding:5%">
                    <b-tabs>
                      <b-tab :title="$ml.get('designation')" active>
                  <div class="e-float-input e-control-wrapper">
                  <input v-validate="'required'" v-model="input.name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontrolname" name="Designation Name" style="text-align:undefined" aria-labelledby="label__gridcontrolname">
                  <span class="e-float-line"></span>
                  <span id="errors">{{ errors.first('Designation Name') }}</span>
                  <label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Designation Name</label>
                </div>
                    <br>
                    <div v-if="!selected">
                      <div v-if="!clicked">
                      <ejs-dropdownlist :showClearButton="true" @close="switchNow" floatLabelType="Auto" v-model="input.department" :groupTemplate="groupTemplate1"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                    </div>
                    <div v-else>
                      <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="input.department"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                    </div>
                  </div>
                </b-tab>
                <b-tab :title="$ml.get('permissions')">
                  <b-form-group>
                    <label v-text="$ml.get('modulename')"></label>
                  <ejs-dropdownlist :showClearButton="true" v-on:keydown.enter='changeFields' floatLabelType="Auto" v-model="module"  :allowFiltering="true" id='department' :dataSource='modules'  :fields='module_fields'  popupHeight='300' :placeholder="$ml.get('pholdmodule')"></ejs-dropdownlist>
                </b-form-group>
                <b-form-group v-for="(run,index) in permissions" :key="index">
                  <label v-text="permissions[index].module_name"></label>
                  <b-row>
                    <b-col sm="3">
                      <label v-text="$ml.get('read')"></label>
                      <br>
                      <c-switch class="mx-1" color="primary" unchecked name="read" v-model="permissions.read"  :uncheckedValue="false" :checkedValue="true"/>
                    </b-col>
                    <b-col sm="3">
                      <label v-text="$ml.get('write')"></label>
                      <br>
                      <c-switch class="mx-1" color="primary" unchecked name="read" v-model="permissions.write"  :uncheckedValue="false" :checkedValue="true"/>
                    </b-col>
                    <b-col sm="3">
                      <label v-text="$ml.get('edit')"></label>
                      <br>
                      <c-switch class="mx-1" color="primary" unchecked name="read" v-model="permissions.edit"  :uncheckedValue="false" :checkedValue="true"/>
                    </b-col>
                    <b-col sm="3">
                      <label v-text="$ml.get('delete')"></label>
                      <br>
                      <c-switch class="mx-1" color="primary" unchecked name="read" v-model="permissions.delete"  :uncheckedValue="false" :checkedValue="true"/>
                    </b-col>
                  </b-row>
                </b-form-group>
                </b-tab>
              </b-tabs>
                </b-form-group>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                </div>
            </b-modal>
            <b-modal size="sm" :title="$ml.get('confirm')" class="modal-primary" v-model="confirmDeleteModal" @ok="deleteDesignation">
              <h5 v-text="$ml.get('confirmdelete')"></h5><span style="color:green">{{deleteDesig.name}} </span><span>?</span>
            </b-modal>
        </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { Switch as cSwitch } from '@coreui/vue'
import { addRecord,actionComplete, ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr' 

import { ToolbarPlugin,ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)
Vue.use(DialogPlugin)
Vue.use(TextBoxPlugin)
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);


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



var departments=[]
var new_department = ""
var groupVue1 = Vue.component("groupTemplate1", {
    template: `<strong>{{data.parent_department}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    async mounted() {
      if(this.data.parent_department!=null) {
      await api.get(`${apiUrl}`+`department/dept/get/`+`${this.data.parent_department}`).then((res) => {
        this.loading =true
        this.data.parent_department = res.data.department_name
        departments.push(this.data)
      });
    }
    }
  });
var departmentVue = Vue.component("departmentTemplate", {
  template: `<ejs-dropdownlist :showClearButton="true" v-model="data.department" :groupTemplate="groupTemplate1" :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>`,
    data() {
      return {
        groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
        data: {

        },
        val1:"",
        clicked:true,
        department:[],
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"}
      };
    },
    async mounted() {
      await api.get(`${apiUrl}`+`department/dept/get`).then((res) => {
        this.loading =true
        this.department = res.data
      })
    },
    methods:{
      changedept(args) {
        if(this.data.department!=null) {
        var new_dept = this.data.department
        new_department = new_dept
      }
      }
    }
});

var groupVue = Vue.component("groupTemplate", {
    template: `<strong>{{val1}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    async mounted() {
      if(this.data.department !=null) {
      await axios.get(`${apiUrl}`+`department/dept/get/`+`${this.data.department}`,{withCredentials:true}).then((res) => {
        this.val1 = res.data.department_name
      });
    }
    }
  });

export default {
    name: "DesignationList",
    components :  {
      cSwitch,
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page
    },
    data : function() {
        return {
          confirmDeleteModal:false,
          deleteDesig:{},
          excelTemplate : function() {
          return {
            template:Vue.component('excelTemplate', {
              template:`<b-badge id="label1" variant="primary" ><img :src="images.csv"></img>&nbsp<span id="hide" v-text="$ml.get('csv')"></span></b-badge>`,
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
        toolbar: [
          'CsvExport','Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
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
          groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          groupTemplate: function () {
              return {
                  template: groupVue
              }
          },
          departmentTemplate: function (){
            return{
              template: departmentVue
            }
          },
          loading:false,
        labels:[],
        label_fields:{text:"label_name",value:"_id"},
          selected:false,
          link:"",
          key:"",
            department:[],
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4 },
             editSettings: { allowDeleting: true,mode: 'Dialog', allowEditing: true,allowAdding: true, newRowPosition: 'Child' },
             rowHeight: 30,
            selectionSettings : {type:"Single"},
            data: [],
            modal :false,
            input:{},
            selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
          permissions:{},
          clicked:false,
          modules:[
            {value:"company",text:"Company"},{value:"subuser",text:"User"},
            {value:"subgroup",text:"User Group"},{value:"dept",text:"Department"},
            {value:"desig",text:"Designation"},{value:"head",text:"Head"},
            {value:"label",text:"Label"},{value:"preApp",text:"Approval"},
            {value:"budSet",text:"Budget Settings"},
            {value:"staff",text:"Staff"}
          ],
          or_dept:[],
          or_desig:[],
          module_fields:{text:"text",value:"value"},
          selectedLabel:null, 
   };
  },
  watch : {
    '$route' : async function() {
      await api.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.loading =true
        this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    if(this.$route.path == '/settingviews/designation/list') {
    await api.get(`${apiUrl}`+`designation/desig/get/all`)
    .then((response) => {
      this.loading =true
      this.or_desig = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_desig(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
  }
  else{
    await api.get(`${apiUrl}`+`dropdown/desig/only/${this.key}`)
    .then((response) => {
      this.loading =true
      this.or_desig = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_desig(response.data)
      for(var i =0;i<this.data.length;i++) {
        if(!(this.data.some(item => this.data[i].parent_designation_id == item._id))) {
          this.data[i].parent_designation_id = undefined
        }
      }
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
  }
    await api.get(`${apiUrl}`+`label/label/find/by/Designations`).then((res) => {
      this.loading =true
        this.labels = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    }
  },
  async mounted() {
    this.$refs.dialogObj.hide();
    this.link = window.location.href;
     this.key = this.link.split(`designation/`).pop()
    await api.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
      this.loading =true
      this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    if(this.$route.path == '/settingviews/designation/list') {
    await api.get(`${apiUrl}`+`designation/desig/get/all`)
    .then((response) => {
      this.loading =true
      this.or_desig = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_desig(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
  }
  else{
    await api.get(`${apiUrl}`+`dropdown/desig/only/${this.key}`)
    .then((response) => {
      this.loading =true
      console.log(response.data)
      this.or_desig = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_desig(response.data)
      for(var i =0;i<this.data.length;i++) {
        if(!(this.data.some(item => this.data[i].parent_designation_id == item._id))) {
          this.data[i].parent_designation_id = undefined
        }
      }
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
  }
    await api.get(`${apiUrl}`+`label/label/find/by/Designations`).then((res) => {
        this.labels = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
    deleteDesignation() {
       api.delete(`${apiUrl}`+`designation/desig/delete/`+`${this.deleteDesig._id}`).then((res) => {
        if(res.data.deleted.n>0) {
                                toast({type: VueNotifications.types.success, title: `${this.deleteDesig.name} is deleted successfully`})
                              }
                                api.get(`${apiUrl}`+`designation/desig/get/all`)
                                .then((res) => {
                                  this.loading =true
                                  this.data = this.list_to_tree_desig(res.data)
                                  });
                              }).catch((err)=> {
                                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
    },
    async load(args) {
    },
    addLabel (args) {
        this.$refs.dialogObj.hide();
        let val = this.$refs.treegrid.getSelectedRecords()
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) => {
                
                var id = {
                  labels :  response.data._id
                }
                api.put(`${apiUrl}`+`designation/desig/push/label/`+`${val[0]._id}`,id).then((response) => {
                  
                    this.$router.go(0)
                });
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
            
      },
      list_to_tree_desig(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_designation_id != undefined && this.checkExistDesig(node.parent_designation_id)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_designation_id]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDesig(roots)
          return roots
      },
      convertDataDesig(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDesig(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
          }
      },
      dataBound() {
        this.loading =false
      },
      editPage(args) {
        this.$router.push(`/settingviews/designation/edit/${args.rowData.id}`)
      },
      onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
      }, 
      changeFields(args) {
       
      },
      addDesig(args) {
        this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              
              this.permissions.module_name = "subgroup"
              var user_group = {
                user_type:"Staff",
                user_group_name:this.input.name,
                permissions:[this.permissions]
              }
              let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          if(parent.length == 0) {
              api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
                api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.loading =true
                  this.data = res.data
                  });           
                this.modal = false
                this.input = {}
                }).catch((err)=> {
                  if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
              api.post(`${apiUrl}`+`super/group/subgroup/add`,user_group).then((res) => {
                this.permissions = {}
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        }
          else {
              this.input.parent_designation_id = parent[0]._id
          api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
            api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.loading =true
                  this.data = res.data
                  });
                this.modal = false
                this.input = {}
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
        }
            }
          })
      
      },
      selectLabel() {
        let val = this.$refs.treegrid.getSelectedRecords()
        var id = {
                  labels :  this.selectedLabel
                }
        api.put(`${apiUrl}`+`designation/desig/push/label/`+`${val[0]._id}`,id).then((response) => {
                  
                    this.$router.go(0)
                }).catch((err)=> {
                  if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
      },
      actionComplete(args) {
        if(args.action=="edit") {
          
          var id = args.data._id
          var sendData = {
            name:args.data.name,
            department : new_department,
            parent_designation_id : args.data.parent_designation_id
          }
          api.put(`${apiUrl}`+`designation/desig/update/`+`${id}`,sendData).then((response) => {
               api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.loading =true
                  this.data = res.data
                  });
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
        }
      },
      checkExistDept(node) {
        for (var i=0; i < this.or_dept.length; i++) {
            if (this.or_dept[i]._id == node)
                return true;
        }
        return false;
      },
      checkExistDesig(node) {
        for (var i=0; i < this.or_desig.length; i++) {
            if (this.or_desig[i]._id == node)
                return true;
        }
        return false;
      },
       onClick(args) {
            let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            
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
      clickHandler(args){
        var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
        if(args.item.id === 'add') {
          if(data.length>0) {
            this.$router.push(`/settingviews/designation/add/${data[0]._id}`)
          }
          else {
            this.$router.push(`/settingviews/designation/add/`)
          }
        }
        if(args.item.id == 'label') {
            if(this.$refs.treegrid.getSelectedRecords().length>0) {
              this.$refs.dialogObj.show();
            }
            else { 
              alert("Please select a record to label it");
            }
          }
          if(args.item.id == 'collapse') {
            this.$refs.treegrid.collapseAll()
          }
          if(args.item.id == 'expand') {
            this.$refs.treegrid.expandAll()
          }
        if(args.item.id == 'delete') {
          if(data.length>0) {
            this.confirmDeleteModal = true
            this.deleteDesig = data[0]
                              }
                            
                          }
        if (args.item.text === 'PDF Export') {
            this.$refs.treegrid.pdfExport({hierarchyExportMode: 'All'});
        }
         if (args.item.text === 'CSV Export') {
            this.$refs.treegrid.csvExport({hierarchyExportMode: 'All'});
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
        this.department = departments
      },
      rowSelected(args) {
        this.selected = true
        
      },
      rowDeselecting(args) {
        this.selected = false
        
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


<style>
@import '../../styles/ejs-vue-base.css';
@import "../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../styles/ej2-vue-lists/styles/material.css";
@import "../../styles/ej2-vue-navigations/styles/material.css";
@import "../../styles/ej2-vue-popups/styles/material.css";
@import "../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../styles/ej2-vue-buttons/styles/material.css";
@import "../../styles/ej2-vue-inputs/styles/material.css";
</style>
<style>
#label {
  font-weight:lighter;
    font-size: 12px;
}
#label1 {
  font-size:17px;
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
 #errors {
  color:red;
}
    @font-face {
font-family: 'e-grid-rowheight';
src:
url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
font-weight: normal;
font-style: normal;
}

    .e-small-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e707';
    }

   .e-medium-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e701';
    }

    .e-big-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e702';
    }
    .e-spinner-pane.e-spin-show {
             display: none;
        }
</style>
<style src="spinkit/scss/spinkit.scss" lang="scss" />

<style scoped>
#loader{
    height: 0;
    position: absolute;
    left: 15%;
    top: -9%;
}
      .sk-fading-circle {
    margin: 20px auto;
    width: 20px;
    height: 20px;
    position: relative;
    z-index:1001;
}
  .sk-three-bounce {
    height: 20px;
  }
</style>