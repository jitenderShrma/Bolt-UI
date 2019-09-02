<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
    <div id="target" class="control-section">
        <div>
          <ejs-toolbar id="toolbar" :clicked="clickHandler">
            <e-items>
              <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate" ></e-item>
              <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
            </e-items>
          </ejs-toolbar>
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight' :dataSource='data' 
            :treeColumnIndex='1' childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :enableCollapseAll="false"
            :recordDoubleClick="beginEdit"
            :allowSorting='true' :toolbar="toolbar" :toolbarClick="clickHandler" :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :load="load">
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='department_name' headerText='Department Name' width='170' ></e-column>
                    <e-column field='labels[0].label_name' :template="labelTemplate" headerText='Labels'></e-column>
                    <e-column :template="buttonDesig" width='80' headerText='Manage Designations' ></e-column>
                     <e-column :template="buttonHead" width='80' headerText='Manage Heads' ></e-column>
                     <!-- <e-column headerText='Manage Permissions' width='140' :commands='commands'></e-column> -->
                </e-columns>
            </ejs-treegrid>
            
            <b-modal :title="$ml.get('adddept')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
                <b-form v-on:submit.prevent="adddept">
                  <b-tabs>
                  <b-tab :title="$ml.get('department')" active>
                  <b-form-group>
                  <div class="e-float-input e-control-wrapper"><input v-model="input.department_name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontroldepartment_name" name="department_name" style="text-align:undefined" aria-labelledby="label__gridcontroldepartment_name"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontroldepartment_name" for="_gridcontroldepartment_name">Department Name</label></div>
                  </b-form-group>
                </b-tab>
                <b-tab :title="$ml.get('labels')">
                  <b-form-group>
                    <div v-for="(run,i) in input.labels" :key="i">
                      <b-row>
                      <b-col>
                      <b-badge style="font-weight:lighter;margin:5px;font-size:15px;" :variant="input.labels[i].color">{{input.labels[i].label_name}}</b-badge>
                    </b-col>
                    <b-col>
                      <b-btn v-on:click="editLabeladd(input.labels[i])" size="sm" variant="primary" v-text="$ml.get('edit')"></b-btn>
                    </b-col>
                    <b-col>
                      <b-btn v-on:click="delLabeladd(`${input.labels[i]._id}`,`${input._id}`,`${i}`)" size="sm" variant="danger"><i class="fa fa-trash-o"></i></b-btn>
                    </b-col>
                  </b-row>
                    </div>
                    <b-form v-on:submit.prevent = "selectLabeladd(`${input._id}`)">
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
                  </b-form-group>
                </b-tab>
              </b-tabs>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                
            </b-modal>
            <b-modal :title="$ml.get('editdept')+' : '+`${editinput.department_name}`
            " class="modal-primary" v-model="editmodal" @ok="editmodal = false" hide-footer>
               <b-form v-on:submit.prevent="editdept">
                <b-tabs>
                  <b-tab :title="$ml.get('department')" active>
                  <b-form-group style="padding:5%">
                    <div class="e-float-input e-control-wrapper"><input v-model="editinput.department_name" class="e-field e-defaultcell" type="text" value="asdasddas" e-mappinguid="grid-column843" id="_gridcontroldepartment_name" name="department_name" style="text-align:undefined" aria-labelledby="label__gridcontroldepartment_name"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontroldepartment_name" for="_gridcontroldepartment_name">Department Name</label></div>
                    <label v-text="$ml.get('parentdept')"></label>
                    <treeselect ref='treeselect1' @open="checkParent" :default-expand-level="10" :placeholder="$ml.get('pholdparentdesig')" v-model="editinput.parent_department" :multiple="false" :options="treedept" />
                  </b-form-group>
                </b-tab>
                <b-tab :title="$ml.get('labels')">
                  <b-form-group>
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
                  </b-form-group>
                </b-tab>
                  <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </b-tabs>
                </b-form>
            </b-modal>
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
            <b-modal size="sm" :title="$ml.get('confirm')" class="modal-primary" v-model="confirmDeleteModal" @ok="deleteDepartment">
              <h5 v-text="$ml.get('confirmdelete')"></h5><span style="color:green">{{deleteDept.department_name}} </span><span>?</span>
            </b-modal>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import {CoolSelect} from 'vue-cool-select'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
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
Vue.use(CoolSelect);
var api = axios.create({
  withCredentials :true
})
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

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
    name: "DepartmentList",
    components : { Treeselect, TreeGridComponent, CoolSelect },
    data : function() {
        return {
          buttonHead : function() {
            return {
              template : Vue.component('buttonHead',{
                template:`<div class="e-unboundcelldiv" style="display: inline-block;float:right"><button @click="gotoPage" id="_gridcontrolDesignations_0" type="button" title="Designations" class="e-lib e-btn e-control e-flat e-icon-btn"><span class="e-btn-icon  e-icons e-edit"></span></button></div>`,
                data : function() {
                  return {
                    data:{}
                  }
                },
                methods:{
                  gotoPage() {
                    window.location.href = `#/department/`+`head/${this.data._id}`
                  }
                }
              })
            }
          },
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
        toolbar: [
          'CsvExport','Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
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
          addModal:false,
          buttonDesig : function() {
            return {
              template : Vue.component('buttonDesig',{
                template:`<div style="float:right" class="e-unboundcelldiv" style="display: inline-block;float:right"><button @click="gotoPage" id="_gridcontrolDesignations_0" type="button" title="Designations" class="e-lib e-btn e-control e-flat e-icon-btn"><span class="e-btn-icon  e-icons e-edit"></span></button></div>`,
                data : function() {
                  return {
                    data:{}
                  }
                },
                methods:{
                  gotoPage() {
                    window.location.href = `#/department/`+`designation/${this.data._id}`
                  }
                }
              })
            }
          },
          label1Template: function () {
              return {
                  template: Vue.component('label1Template', {
                      template: `<b-badge style="font-weight:lighter;"  id="label" :variant="data.color">{{data.label_name}}</b-badge>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
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
          tab:null,
          treedept :[],
          module:null,
          selectedLabel:null,
          formdata: {
                  label_name : "",
                  color : "2196f3",
                  context : "Departments",
                  description : ""
                },
          LabelModal:false,
          animationSettings: { effect: 'Zoom' },
          squarePalettesColn: 7,
          labels:[],
          label_fields:{text:"label_name",value:"_id"},
          circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
          editinput:{},
          link:"",
          key:"",
          input:{
            labels:[],
          },
          confirmDeleteModal:false,
          editlabelmodal:false,
          editlabel:{},
          modal:false,
          editmodal:false,
          command1: [{ type:"Designations",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClickDes } }, ],
          command2: [{ type:"Heads",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClickHead } }, ],
          height : window.innerHeight*0.65,
          filterSettings: { type: "Menu" },
          pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4 },
          editSettings: { allowDeleting: true,mode: 'Dialog',allowAdding: true, newRowPosition: 'Child' },
          dept:[],
          deleteDept : {},
          rowHeight: 30,
          selectionSettings : {type:"Single"},
          data:null
   };
  },
  watch : {
    '$route' : function() {
      api.get(`${apiUrl}`+`department/dept/get`)
    .then((response) => {
      this.dept = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_dept(response.data);
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    api.get(`${apiUrl}`+`label/label/find/by/Departments`).then((res) => {
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
  mounted() {
     api.get(`${apiUrl}`+`department/dept/get`)
    .then((response) => {
      this.dept = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_dept(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    api.get(`${apiUrl}`+`label/label/find/by/Departments`).then((res) => {
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
    created() {
     api.get(`${apiUrl}`+`department/dept/get`)
    .then((response) => {
      this.data = this.list_to_tree_dept(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    api.get(`${apiUrl}`+`label/label/find/by/Departments`).then((res) => {
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
    editdeptLabel() {
      var id = this.editlabel._id
      this.editlabel._id = undefined
      api.put(`${apiUrl}label/label/edit/${id}`,this.editlabel).then((res) => {
        console.log(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      this.$router.go(0)
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
      api.put(`${apiUrl}department/dept/pop/label/${id}`,body).then((res) => {
        console.log(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      
    },
    editLabeladd(args) {
      console.log(args)
      this.editlabelmodal = true
      this.editlabel._id = args._id
      this.editlabel.label_name = args.label_name
      this.editlabel.description =args.description
      this.editlabel.color =`#`+`${args.color}`
      
    },
    delLabeladd(args,id,label) {
      console.log(this.input.labels.splice(label,1))
      
    },
    selectLabeladd(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.input.labels.push(label);
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
    async load(args) {
      api.get(`${apiUrl}`+`department/dept/get`)
    .then((response) => {
      this.data = this.list_to_tree_dept(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    api.get(`${apiUrl}`+`label/label/find/by/Departments`).then((res) => {
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
    addLabel (args) {
      this.addModal =false
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((label)=>{
                var id = {
                  labels :  label.data._id
                }
                  api.get(`${apiUrl}`+`label/label/find/by/Departments`).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.editinput.labels)
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
      },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
        this.editlabel.color = args.currentValue.hex.slice(1);
      }, 
      checkExist(node) {
        for (var i=0; i < this.dept.length; i++) {
            if (this.dept[i]._id == node)
                return true;
        }
        return false;
      },
      adddept(args) {
        var parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          if(parent.length == 0) {
            api.post(`${apiUrl}`+`department/dept/create`,this.input).then((response)=>{
                api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.dept = JSON.parse(JSON.stringify(response.data))
                  this.data = this.list_to_tree_dept(response.data)
                  });
                this.$refs.treegrid.collapseAll()
                this.$refs.treegrid.expandAll()            
                }).catch((err)=> {
                  if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
            this.modal=false
            this.input = {
              labels:[]
            }
          }
          else {
            this.input.parent_department = parent[0]._id
             api.post(`${apiUrl}`+`department/dept/create`,this.input).then((response)=>{
               api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.dept = JSON.parse(JSON.stringify(response.data))
                  this.data = this.list_to_tree_dept(response.data)
                  });
            }).catch((err)=> {
              if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
            this.input = {
              labels:[]
            }
            this.modal=false
          }
      },
      editdept() {
        if(this.editinput.parent_department == undefined) {
          this.editinput.parent_department = null
        }
        var sendData = {
          department_name:this.editinput.department_name,
          parent_department:this.editinput.parent_department
        }
        api.put(`${apiUrl}`+`department/dept/edit/`+`${this.editinput._id}`,sendData).then((res)=>{
          console.log(res.data)
            api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = this.list_to_tree_dept(response.data)
              });
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
        this.editmodal=false
      },
        
       onClickDes(args) {
            let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
           
            this.$router.push(`/department/`+`designation/${data[0]._id}`)
       },
       onClickHead(args) {
            let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
           
            this.$router.push(`/department/`+`head/${data[0]._id}`)
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
       beginEdit(args) {
        this.editinput = args.rowData
        this.editmodal = true
       },
       failure: function(args) {
        debugger;
      },
      deleteDepartment() {
        api.delete(`${apiUrl}`+`department/dept/delete/`+`${this.deleteDept._id}`).then((res)=>{
                              if(res.data.deleted.n>0) {
                                toast({type: VueNotifications.types.success, title: `${this.deleteDept.department_name} is deleted successfully`})
                              }
                              api.get(`${apiUrl}`+`department/dept/get`) .then((response) => {this.data = this.list_to_tree_dept(response.data) }) }).catch((err)=> {if(err.toString().includes("Network Error")) {toast({type: VueNotifications.types.error, title: 'Network Error'}) } }); 
      },
      clickHandler(args){
        if(args.item.id === 'add') {
              this.modal = true
          }
          if(args.item.id == 'collapse') {
            this.$refs.treegrid.collapseAll()
          }
          if(args.item.id == 'expand') {
            this.$refs.treegrid.expandAll()
          }
          if(args.item.id == 'label') {
            if(this.$refs.treegrid.getSelectedRecords().length>0) {
              this.$refs.dialogObj.show();
            }
            else { 
              alert("Please select a record to label it");
            }
          }
        if(args.item.id == 'delete') {
          var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
                    if(data.length>0) {
                      api.get(`${apiUrl}dropdown/designation/count/${data[0]._id}`).then((desig) => {
                        api.get(`${apiUrl}dropdown/head/count/${data[0]._id}`).then((head)=> {
                          if(head.data == 0 && desig.data == 0) {
                            this.confirmDeleteModal = true
                            this.deleteDept = data[0]
                            }
                            else{
                              toast({type: VueNotifications.types.error, title: 'Please delete associated Heads and Designations first'})
                            }
                        })
                      }).catch((err)=> {if(err.toString().includes("Network Error")) {toast({type: VueNotifications.types.error, title: 'Network Error'}) } });
                    }
                }
        if (args.item.text === 'PDF Export') {
            this.$refs.treegrid.pdfExport();
        }
         if (args.item.text === 'CSV Export') {
            this.$refs.treegrid.csvExport();
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
      selectLabel(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.editinput.labels.push(label);
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })

        var data = {
          labels : this.selectedLabel
        }
        api.put(`${apiUrl}department/dept/push/label/${args}`,data).then((res) => {
            
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
      cellSave(args) {
        if(args.action == "edit") {
          var sendData = {
            department_name : args.data.department_name
          }
          api.put(`${apiUrl}`+`department/dept/edit/`+`${args.data._id}`,sendData).then((res)=>{
            api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = this.list_to_tree_dept(response.data)
                  })
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
      // disableProp(args) {
      //   console.log(args)
      //   // if(args.children != null || args.children.length>0) {
      //   //   if(args.id == this.editinput._id) {
      //   //     args.isDisabled = true
      //   //     return args
      //   //   }
      //   //   else{
      //   //     for(var i=0;i<args.children.length;i++) {
      //   //       return this.disableProp(args.children[i])
      //   //     }
      //   //   }
      //   // }
      //   // else {
      //   //   return args
      //   // }
        
      // },
      checkParent(args) {
        api.get(`${apiUrl}`+`department/dept/get`)
        .then((response) => {
          for(var i=0;i<response.data.length;i++) {
            if(response.data[i]._id == this.editinput._id) {
              response.data[i].isDisabled = true
            }
          }
          this.treedept = this.list_to_tree_dept(response.data)
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      },
      list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.checkExist(node.parent_department)) {
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
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
      changeTabs(args) {
        this.tab = args.target.text
        console.log(this.tab)
      }
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
    #label1 {
  font-size:17px;
  font-weight:lighter;
}
</style>