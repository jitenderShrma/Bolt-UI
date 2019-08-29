<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <div id="target" class="col-lg-12 control-section">
        <div>
          <ejs-toolbar id="toolbar" :clicked="clickHandler">
            <e-items>
              <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate" ></e-item>
              <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
            </e-items>
          </ejs-toolbar>
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
             :treeColumnIndex='1' childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true'
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column field='head_key' headerText='Head Key' ></e-column>
                    <e-column :allowEditing="true" field='department.department_name' headerText='Department' width='170' ></e-column>
                    <e-column field='labels[0].label_name' :template="labelTemplate" headerText='Labels' ></e-column>
                    <e-column field='accounting_head' headerText='Account Head' ></e-column>
                    <e-column field='notes' headerText='Notes'></e-column>
                    <e-column :allowEditing="true" :visible="false" field="parent_head" headerText="Parent Head">
                    </e-column>
                     <!-- <e-column headerText='Manage Permissions' width='140' :commands='commands'></e-column> -->
                </e-columns>
            </ejs-treegrid>
            <ejs-dialog id='dialog' height="400" style="max-height:fit-content !important" header='Add A Label' showCloseIcon='true' :isModal='LabelModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
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
            <b-modal :title="$ml.get('addhead')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
              <div>
                <b-form v-on:submit.prevent="addHead">
                  <b-tabs>
                  <b-tab :title="$ml.get('head')" active>
                  <b-form-group style="padding:5%">
                 <div class="e-float-input e-control-wrapper">
                  <input v-validate="'required'" v-model="input.name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontrolname" name="Head Name" style="text-align:undefined" aria-labelledby="label__gridcontrolname">
                  <span class="e-float-line"></span>
                  <span id="errors">{{ errors.first('Head Name') }}</span>
                  <label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Head Name</label>
                </div>
                  <div class="e-float-input e-control-wrapper">
                    <input v-validate="'required'" v-model="input.head_key" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column2" id="_gridcontrolhead_key" name="Head Key" style="text-align:undefined" aria-labelledby="label__gridcontrolhead_key">
                    <span class="e-float-line"></span>
                    <span id="errors">{{ errors.first('Head Key') }}</span>
                    <label class="e-float-text e-label-top" id="label__gridcontrolhead_key" for="_gridcontrolhead_key">Head Key</label>
                  </div>
                    <div class="e-float-input e-control-wrapper">
                      <input v-model="input.accounting_head" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column3" id="_gridcontrolaccounting_head" name="accounting_head" style="text-align:undefined" aria-labelledby="label__gridcontrolaccounting_head">
                      <span class="e-float-line"></span>
                      <label class="e-float-text e-label-top" id="label__gridcontrolaccounting_head" for="_gridcontrolaccounting_head">Account Head</label>
                    </div>
                    <div class="e-float-input e-control-wrapper">
                      <input v-model="input.notes" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column4" id="_gridcontrolnotes" name="notes" style="text-align:undefined" aria-labelledby="label__gridcontrolnotes">
                      <span class="e-float-line"></span>
                      <label class="e-float-text e-label-top" id="label__gridcontrolnotes" for="_gridcontrolnotes">Notes</label>
                    </div>
                    <br>
                    
                    <label v-text="$ml.get('department')"></label>
                      <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddept')" v-model="input.department" :multiple="false" :options="department" />
                    <label v-text="$ml.get('parenthead')"></label>
                      <treeselect :default-expand-level="10" :placeholder="$ml.get('pholdparenthead')" v-model="input.parent_head" :multiple="false" :options="head" />
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
                </div>
            </b-modal>
            <b-modal :title="$ml.get('edithead')+` : `+`${editinput.name}`" class="modal-primary" v-model="editmodal" @ok="editmodal = false" hide-footer>

              <b-form v-on:submit.prevent="editHead">
                <b-tabs>
                  <b-tab :title="$ml.get('head')" active>
                <b-form-group>
                  <div class="e-float-input e-control-wrapper"><input v-model="editinput.name" class="e-field e-defaultcell" type="text" e-mappinguid="grid-column168" id="_gridcontrolname" name="name" style="text-align:undefined" aria-labelledby="label__gridcontrolname"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Head Name</label></div>
                  <div class="e-float-input e-control-wrapper">
                    <input v-model="editinput.head_key" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column2" id="_gridcontrolhead_key" name="Head Key" style="text-align:undefined" aria-labelledby="label__gridcontrolhead_key">
                    <span class="e-float-line"></span>
                    <label class="e-float-text e-label-top" id="label__gridcontrolhead_key" for="_gridcontrolhead_key">Head Key</label>
                  </div><div class="e-float-input e-control-wrapper"><input v-model="editinput.accounting_head" class="e-field e-defaultcell" type="text" e-mappinguid="grid-column170" id="_gridcontrolaccounting_head" name="accounting_head" style="text-align:undefined" aria-labelledby="label__gridcontrolaccounting_head"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolaccounting_head" for="_gridcontrolaccounting_head">Account Head</label></div><div class="e-float-input e-control-wrapper"><input v-model="editinput.notes" class="e-field e-defaultcell" type="text"  e-mappinguid="grid-column171" id="_gridcontrolnotes" name="notes" style="text-align:undefined" aria-labelledby="label__gridcontrolnotes"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolnotes" for="_gridcontrolnotes">Notes</label></div>
                    <label v-text="$ml.get('department')"></label>
                      <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddept')" v-model="editinput.department" :multiple="false" :options="department" />
                      <label v-text="$ml.get('parenthead')"></label>
                      <treeselect @open="checkParent" :default-expand-level="10" :placeholder="$ml.get('pholdparenthead')" v-model="editinput.parent_head" :multiple="false" :options="head" />
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
                </b-tabs>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
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
        </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
// import { addRecord } from "@syncfusion/ej2-vue-grids";
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import {CoolSelect} from 'vue-cool-select'
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(TextBoxPlugin);

Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)
Vue.use(DialogPlugin)
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
var api = axios.create({
  withCredentials :true
})

var groupVue1 = Vue.component("groupTemplate1", {
    template: `<strong>{{val1}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    async mounted() {
      await axios.get(`${apiUrl}`+`department/dept/get/`+`${this.data.parent_department}`,{withCredentials:true}).then((res) => {
        this.val1 = res.data.department_name
      });
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
    name: "HeadList",
    components :  {
      Treeselect,
      CoolSelect,
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page
    },
    data : function() {
        return {
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
                      template: `<div ><b-badge id="label" style="font-weight:100;margin:3px" v-for="label in data.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          labels:[],
          editlabelmodal:false,
          editlabel:{},
          formdata: {
                  label_name : "",
                  color : "2196f3",
                  context : "Heads",
                  description : ""
                },
          editinput:{
          },
          editmodal:false,
          groupTemplate: function () {
              return {
                  template: groupVue
              }
          },
          groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          getflag:0,
          LabelModal:false,
          animationSettings: { effect: 'Zoom' },
          modal:false,
          link:"",
          key:"",
          addModal:false,
          head:[],
          selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4} ,
             editSettings: { allowDeleting: true,mode: 'Dialog', allowAdding: true, newRowPosition: 'Child' },
             rowHeight: 30,
              toolbar: [
          'CsvExport','Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
            selectionSettings : {type:"Single"},
            data: [],
            department:[],
            input:{
              labels:[]
            },
            or_head:[],
            or_dept:[],
            selectedLabel:null,
            module:null,
            isRoot:false,
            squarePalettesColn: 7,
        circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
            
   };
  },
  watch:{
    '$route' : async function() {
      if(this.$route.path == '/heads/list') {
        await api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
      this.or_head = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_head(response.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
     }
     else{
      await api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
        .then((response) => {
          this.or_head = JSON.parse(JSON.stringify(response.data))
          this.data = this.list_to_tree_head(response.data)
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
     }
     await axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = res.data
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
    }
  },
  async mounted() {
    this.$refs.dialogObj.hide();
    this.link = window.location.href;
     this.key = this.link.split(`head/`).pop()
     if(this.$route.path == '/heads/list') {
        await api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
      this.or_head = JSON.parse(JSON.stringify(response.data))
      this.data = this.list_to_tree_head(response.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
     }
     else{
      await api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
        .then((response) => {
          this.or_head = JSON.parse(JSON.stringify(response.data))
          this.data = this.list_to_tree_head(response.data)
          this.input.department = this.key 
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
     }
     await axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = this.list_to_tree_dept(res.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
     axios.get(`${apiUrl}`+`label/label/find/by/Heads`,{withCredentials:true}).then((res) => {
        this.labels = res.data
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
    },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
    checkParent(args) {
        api.get(`${apiUrl}`+`head/head/get`)
        .then((response) => {
          for(var i=0;i<response.data.length;i++) {
            if(response.data[i]._id == this.editinput._id) {
              response.data[i].isDisabled = true
            }
          }
          this.head = this.list_to_tree_head(response.data)
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
      },
    editdeptLabel() {
      var id = this.editlabel._id
      this.editlabel._id = undefined
      api.put(`${apiUrl}label/label/edit/${id}`,this.editlabel).then((res) => {
        console.log(res.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
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
      api.put(`${apiUrl}head/head/pop/label/${id}`,body).then((res) => {
        console.log(res.data)
      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
    },
    editLabeladd(args) {
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
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
      }
      },
      checkExistDept(node) {
        for (var i=0; i < this.or_dept.length; i++) {
            if (this.or_dept[i]._id == node)
                return true;
        }
        return false;
      },
      checkExistHead(node) {
        for (var i=0; i < this.or_head.length; i++) {
            if (this.or_head[i]._id == node)
                return true;
        }
        return false;
      },
    addLabel (args) {
      this.addModal =false
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((label)=>{
                var id = {
                  labels :  label.data._id
                }
                  api.get(`${apiUrl}`+`label/label/find/by/Heads`).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.editinput.labels)
              }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
      },
      selectLabel(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.editinput.labels.push(label);
        }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })

        var data = {
          labels : this.selectedLabel
        }
        api.put(`${apiUrl}head/head/push/label/${args}`,data).then((res) => {
            
        }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
      }
      },
    list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.checkExistDept(node.parent_department)) {
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
    async load(args) {


    //   if(this.$route.path == '/heads/list') {
    //     await api.get(`${apiUrl}`+`head/head/get`)
    // .then((response) => {
    //   this.data = this.list_to_tree_head(response.data)
    //   });
    //  }
    //  else{
    //   await api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
    //     .then((response) => {
    //       this.data = this.list_to_tree_head(response.data)
    //       });
    //  }
    //  await axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
    //     this.department = res.data
    //   })
    // },
    // addLabel (args) {
    //     this.$refs.dialogObj.hide();
    //     let val = this.$refs.treegrid.getSelectedRecords()
    //           api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) =>{
    //             var id = {
    //               labels :  response.data._id
    //             }
    //             api.put(`${apiUrl}`+`head/head/push/label/`+`${val[0]._id}`,id).then((response)=>{
    //                 api.get(`${apiUrl}`+`head/head/get`)
    //                 .then((response) => {
    //                   this.data = response.data
    //                   });
    //             });
    //             this.formdata=null
    //           });
            
    //   },
  },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
        this.editlabel.color = args.currentValue.hex.slice(1);
      }, 
      addHead() {
        this.$validator.validate().then((valid) =>{
            if (!valid) {

            }
            else{
              let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
              
              api.post(`${apiUrl}`+`head/head/create`,this.input).then((response) =>{
                if(this.$route.path == '/heads/list') {
                    api.get(`${apiUrl}`+`head/head/get`)
                .then((response) => {
                  this.or_head = JSON.parse(JSON.stringify(response.data))
                  this.data = this.list_to_tree_head(response.data)
                  });
     
                    this.modal = false       

                      this.input={
                        labels:[]
                      }  
                    }
                    else {
                      api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
                        .then((response) => {
                          this.or_head = JSON.parse(JSON.stringify(response.data))
                          this.data = this.list_to_tree_head(response.data)
                          this.input.department = this.key 
                          });
     
                    this.modal = false    

                      this.input={department:this.key,labels:[]}
                    }
              }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
            
              
            }
          });
      },  
      editHead() {
        if(this.editinput.parent_head == undefined) {
          this.editinput.parent_head =null
        }
        if(this.editinput.department == undefined) {
          this.editinput.department =null
        }
        var sendData = {
          name:this.editinput.name,
          head_key:this.editinput.head_key,
          accounting_head:this.editinput.accounting_head,
          notes:this.editinput.notes,
          department:this.editinput.department,
          parent_head : this.editinput.parent_head
        }
        api.put(`${apiUrl}`+`head/head/update/one/`+`${this.editinput._id}`,sendData).then((response)=>{
            if(this.$route.path == '/heads/list') {
                api.get(`${apiUrl}`+`head/head/get`)
            .then((response) => {
              this.or_head = JSON.parse(JSON.stringify(response.data))
              this.data = this.list_to_tree_head(response.data)
              });
             }
             else{
              api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
                .then((response) => {
                  this.or_head = JSON.parse(JSON.stringify(response.data))
                  this.data = this.list_to_tree_head(response.data)
                  this.input.department = this.key 
                  });
             }
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
        this.editmodal = false
      },
      rowSelected(args) {
        this.selected = true
      },
      rowDeselecting(args) {
        this.selected = false
      },
      actionComplete(args) {
        if(args.action=="edit") {
          var id=args.data._id
          var sendData = {
            name:args.data.name,
            accounting_head:args.data.accounting_head,
            notes:args.data.notes,
            department:args.data.department,
            head_key:args.data.head_key
          }
          api.put(`${apiUrl}`+`head/head/update/one/`+`${id}`,sendData).then((response) => {
            this.$router.go(0)
          }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
        }
      },
      beginEdit(args) {
        if(args.rowData.parentItem==null) {
          this.isRoot = true
          if(this.getflag==0) {

          this.head = this.data
          this.getflag=1
        }
        }
        else{
          this.isRoot = false
          if(this.getflag==0) {
          this.head = this.data
          this.getflag=1
        }
        }
        this.editmodal =true
        this.editinput = args.rowData
        this.editinput.department = args.rowData.department._id
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
      list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined && this.checkExistHead(node.parent_head)) {
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
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
      clickHandler(args){
        if(this.getflag==0) {
          this.head = this.data
	  this.getflag=1
        }
        
        if(args.item.id === 'add') {
          this.modal =true
          }
          if(args.item.id == 'collapse') {
            this.$refs.treegrid.collapseAll()
          }
          if(args.item.id == 'expand') {
            this.$refs.treegrid.expandAll()
          }
        if(args.item.id == 'delete') {
                            var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
                               api.delete(`${apiUrl}`+`head/head/delete/one/`+`${data[0].head_key}`).then((res)=>{
                                  if(this.$route.path == '/heads/list') {
                                      api.get(`${apiUrl}`+`head/head/get`)
                                  .then((response) => {
                                    this.or_head = JSON.parse(JSON.stringify(response.data))
                                    this.data = this.list_to_tree_head(response.data)
                                    });
                                   }
                                   else{
                                    api.get(`${apiUrl}`+`head/head/find/`+`${this.key}`)
                                      .then((response) => {
                                        this.or_head = JSON.parse(JSON.stringify(response.data))
                                        this.data = this.list_to_tree_head(response.data)
                                        this.input.department = this.key 
                                        });
                                   }
                              }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
                              
                            
                          }
        if (args.item.text === 'PDF Export') {
            this.$refs.treegrid.pdfExport({hierarchyExportMode: 'All'});
        }
         if (args.item.text === 'CSV Export') {
            this.$refs.treegrid.csvExport({hierarchyExportMode: 'All'});
        }
        if(args.item.id == 'label') {
            if(this.$refs.treegrid.getSelectedRecords().length>0) {
              this.$refs.dialogObj.show();
            }
            else { 
              alert("Please select a record to label it");
            }
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
  font-size:12px;
}
#label1 {
  font-weight:lighter;
  font-size:17px;
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
    #errors {
  color:red;
}
</style>