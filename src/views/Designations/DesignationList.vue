<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <div class="col-lg-12 control-section">
        <div>
          <ejs-toolbar :clicked="clickHandler">
            <e-items>
              <e-item  id="add" :text="$ml.get('add')"></e-item>
              <e-item id="delete" :text="$ml.get('delete')"></e-item>
              <e-item id="exportPdf" :text="$ml.get('exportpdf')"></e-item>
              <e-item id="exportExcel" :text="$ml.get('exportexcel')"></e-item>
              <e-item id="small" prefixIcon='e-small-icon' ></e-item>
              <e-item id="medium" prefixIcon='e-medium-icon' ></e-item>
              <e-item id="big" prefixIcon='e-big-icon' ></e-item>
              <e-item id="collapse" :text="$ml.get('collapseall')"></e-item>
              <e-item id="expand" :text="$ml.get('expandall')"></e-item>
            </e-items>
          </ejs-toolbar>
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            idMapping='_id' :treeColumnIndex='1' parentIdMapping='parent_designation_id' :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :rowSelected="rowSelected"
            :rowDeselecting="rowDeselecting"
            :enableCollapseAll="false"
            :allowSorting='true' :editSettings='editSettings' :allowTextWrap='true'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' >
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column  field='name' headerText='Designation Name' ></e-column>
                    <e-column :template="groupTemplate" field='department' :editTemplate="departmentTemplate" headerText='Department' width='170' ></e-column>
                     <!-- <e-column headerText='Manage Permissions' width='140' :commands='commands'></e-column> -->
                </e-columns>
            </ejs-treegrid>
            <b-modal :title="$ml.get('adddesig')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
              <div>
                <b-form v-on:submit.prevent="addDesig">
                  <b-form-group style="padding:5%">
                  <div class="e-float-input e-control-wrapper">
                  <input v-validate="'required'" v-model="input.name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontrolname" name="Designation Name" style="text-align:undefined" aria-labelledby="label__gridcontrolname">
                  <span class="e-float-line"></span>
                  <span id="errors">{{ errors.first('Designation Name') }}</span>
                  <label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Designation Name</label>
                </div>
                    <br>
                    <div v-if="!selected">
                      <div v-if="!clicked">
                      <ejs-dropdownlist @close="switchNow" floatLabelType="Auto" v-model="input.department" :groupTemplate="groupTemplate1"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                    </div>
                    <div v-else>
                      <ejs-dropdownlist floatLabelType="Auto" v-model="input.department"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                    </div>
                  </div>
                  <br>
                  <label v-text="$ml.get('permissions')"></label>
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
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                </div>
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
// import { addRecord } from "@syncfusion/ej2-vue-grids";
import { ToolbarPlugin,ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
// import mydata from './datasrc';
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)

var api = axios.create({
  withCredentials :true
})
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
        console.log(res.data)
        this.data.parent_department = res.data.department_name
        departments.push(this.data)
      });
    }
    }
  });
var departmentVue = Vue.component("departmentTemplate", {
  template: `<ejs-dropdownlist @close="switchNow" v-model="data.department" :groupTemplate="groupTemplate1" @change="changedept"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>`,
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
        console.log(res.data)
        this.val1 = res.data.department_name
      });
    }
    }
  });

export default {
    name: "HeadList",
    components :  {
      cSwitch,
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page
    },
    data : function() {
        return {
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
          selected:false,
          link:"",
          key:"",
            department:[],
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 15},
             editSettings: { allowDeleting: true,mode: 'Dialog', allowEditing: true,allowAdding: true, newRowPosition: 'Child' },
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
            modal :false,
            input:{},
            selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
          permissions:{},
          clicked:false 
   };
  },
  async mounted() {
    api.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = res.data
      })
     api.get(`${apiUrl}`+`designation/desig/get/all`)
    .then((response) => {
      this.data = response.data
      });
    },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
    
      addDesig(args) {
        this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              console.log(this.permissions)
              this.permissions.module_name = "subgroup"
              var user_group = {
                user_type:"Staff",
                user_group:this.input.name,
                permissions:[this.permissions]
              }
              let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          if(parent.length == 0) {
              api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
                api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.data = res.data
                  });           
                this.modal = false
                this.input = {}
                });
              api.post(`${apiUrl}`+`super/group/subgroup/add`,user_group).then((res) => {
                console.log(res.data)
              })
        }
          else {
              this.input.parent_designation_id = parent[0]._id
          api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
            api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.data = res.data
                  });
                this.modal = false
                this.input = {}
          });
        }
            }
          })
      
      },
      actionComplete(args) {
        if(args.action=="edit") {
          console.log(args.data)
          var id = args.data._id
          var sendData = {
            name:args.data.name,
            department : new_department,
            parent_designation_id : args.data.parent_designation_id
          }
          api.put(`${apiUrl}`+`designation/desig/update/`+`${id}`,sendData).then((response) => {
               api.get(`${apiUrl}`+`designation/desig/get/all`)
                .then((res) => {
                  this.data = res.data
                  });
          });
        }
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
      clickHandler(args){
        if(args.item.id === 'add') {
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
        this.department = departments
      },
      rowSelected(args) {
        this.selected = true
        console.log(this.selected)
      },
      rowDeselecting(args) {
        this.selected = false
        console.log(this.selected)
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
 #errors {
  color:red;
}
    @font-face {
font-family: 'e-grid-rowheight';
src:
url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1uSfkAAAEoAAAAVmNtYXDOLM5rAAABkAAAAEJnbHlm/CWF1QAAAeAAAAGIaGVhZBRfqPEAAADQAAAANmhoZWEIUQQFAAAArAAAACRobXR4EAAAAAAAAYAAAAAQbG9jYQDyALYAAAHUAAAACm1heHABFAB4AAABCAAAACBuYW1l2jjwtgAAA2gAAAKRcG9zdJYOJ5oAAAX8AAAARgABAAAEAAAAAFwEAAAAAAAD9AABAAAAAAAAAAAAAAAAAAAABAABAAAAAQAAWBvKcl8PPPUACwQAAAAAANimsgAAAAAA2KayAAAAAAAD9AP0AAAACAACAAAAAAAAAAEAAAAEAGwABgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wHnBwQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAEAAAABAAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQALgAAAAYABAABAALnAucH//8AAOcB5wf//wAAAAAAAQAGAAgAAAACAAEAAwAAAAAAAAAuALYAxAAAAAYAAAAAA8UD9AADAAcACwAPABMAFwAANyE1ISchNSE1ITUhNyE1ITchNSEnITUhPQOH/HkCA4f8eQOH/HkCA4f8eQEDh/x5AQOH/HkMX1dfVl9WXlVfV18AAAAAAwAAAAAD9ANtACMARwBrAAA3FR8HIT8HNS8HIQ8GAxUfByE/BzUvByEPBgMVHwchPwc1LwchDwYMAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwIBAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwIBAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwLgJwgIBgYEBAIBAQIEBAYGCAgnCAcHBQUDAgEBAgMFBQcHASsmCQcHBQUDAgEBAgMFBQcHCSYICAcFBQMCAQECAwUFBwgBLCcIBwcFBQMCAQECAwUFBwcIJwgIBgYEBAIBAQIEBAYGCAAAAAABAAAAAAP0AlIAAwAAEyE1IQwD6PwYAa2mAAAAAAASAN4AAQAAAAAAAAABAAAAAQAAAAAAAQAQAAEAAQAAAAAAAgAHABEAAQAAAAAAAwAQABgAAQAAAAAABAAQACgAAQAAAAAABQALADgAAQAAAAAABgAQAEMAAQAAAAAACgAsAFMAAQAAAAAACwASAH8AAwABBAkAAAACAJEAAwABBAkAAQAgAJMAAwABBAkAAgAOALMAAwABBAkAAwAgAMEAAwABBAkABAAgAOEAAwABBAkABQAWAQEAAwABBAkABgAgARcAAwABBAkACgBYATcAAwABBAkACwAkAY8gZS1ncmlkLXJvd2hlaWdodFJlZ3VsYXJlLWdyaWQtcm93aGVpZ2h0ZS1ncmlkLXJvd2hlaWdodFZlcnNpb24gMS4wZS1ncmlkLXJvd2hlaWdodEZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABSAGUAZwB1AGwAYQByAGUALQBnAHIAaQBkAC0AcgBvAHcAaABlAGkAZwBoAHQAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMQAuADAAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIAB1AHMAaQBuAGcAIABTAHkAbgBjAGYAdQBzAGkAbwBuACAATQBlAHQAcgBvACAAUwB0AHUAZABpAG8AdwB3AHcALgBzAHkAbgBjAGYAdQBzAGkAbwBuAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQIBAwEEAQUADWFsaWduLWp1c3RpZnkEbWVudQVtaW51cwAAAAA=) format('truetype');
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
</style>