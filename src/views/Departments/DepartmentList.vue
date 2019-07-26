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
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight' :dataSource='data' 
            idMapping='_id' :treeColumnIndex='1' parentIdMapping='parent_department' :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :enableCollapseAll="false"
            :recordDoubleClick="beginEdit"
            :allowSorting='true' :editSettings='editSettings' :allowTextWrap='true'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' >
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='department_name' headerText='Department Name' width='170' ></e-column>
                    <e-column headerText='Manage Designations' width='140' :commands='command1'></e-column>
                     <e-column headerText='Manage Heads' width='140' :commands='command2'></e-column>
                     <!-- <e-column headerText='Manage Permissions' width='140' :commands='commands'></e-column> -->
                </e-columns>
            </ejs-treegrid>
            <b-modal :title="$ml.get('adddept')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
                <b-form v-on:submit.prevent="adddept">
                  <b-form-group>
                  <div class="e-float-input e-control-wrapper"><input v-model="input.department_name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontroldepartment_name" name="department_name" style="text-align:undefined" aria-labelledby="label__gridcontroldepartment_name"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontroldepartment_name" for="_gridcontroldepartment_name">Department Name</label></div>
                </b-form-group>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                
            </b-modal>
            <b-modal :title="$ml.get('editdept')" class="modal-primary" v-model="editmodal" @ok="editmodal = false" hide-footer>
               <b-form v-on:submit.prevent="editdept">
                  <b-form-group style="padding:5%">
                    <div class="e-float-input e-control-wrapper"><input v-model="editinput.department_name" class="e-field e-defaultcell" type="text" value="asdasddas" e-mappinguid="grid-column843" id="_gridcontroldepartment_name" name="department_name" style="text-align:undefined" aria-labelledby="label__gridcontroldepartment_name"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontroldepartment_name" for="_gridcontroldepartment_name">Department Name</label></div>
                    <ejs-dropdownlist floatLabelType="Auto" v-model="editinput.parent_department" :groupTemplate="groupTemplate1"  :allowFiltering="true" id='department' :dataSource='data'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholdparentdept')"></ejs-dropdownlist>
                  </b-form-group>
                  <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
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
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { ToolbarPlugin,ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
// import mydata from './datasrc';
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)

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
    mounted() {
      api.get(`${apiUrl}`+`department/dept/get/`+`${this.data.parent_department}`).then((res) => {
        console.log(res.data)
        this.val1 = res.data.department_name
      });
    
    }
  });
export default {
    name: "DepartmentList",
    components :  {
      
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page
    },
    data : function() {
        return {
          groupTemplate1: function () {
              return {
                  template: groupVue1
              }
            },
              editinput:{},
          link:"",
          key:"",
          input:{
          },
          modal:false,
          editmodal:false,
             command1: [
                 { type:"Designations",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClickDes } },
                    ],
              command2: [
                { type:"Heads",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClickHead } },
              ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 15},
             editSettings: { allowDeleting: true,mode: 'Dialog',allowAdding: true, newRowPosition: 'Child' },
             rowHeight: 30,
              
            selectionSettings : {type:"Single"},
            data: [],
            dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
   };
  },
  async mounted() {
     api.get(`${apiUrl}`+`department/dept/get`)
    .then((response) => {
      this.data = response.data
      })
    },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
      adddept(args) {
        var parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          if(parent.length == 0) {
            api.post(`${apiUrl}`+`department/dept/create`,this.input).then((response) => {
                api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = response.data
                  });
                this.$refs.treegrid.collapseAll()
                this.$refs.treegrid.expandAll()            
                });
            this.modal=false
            this.input = {}

          }
          else {
            this.input.parent_department = parent[0]._id
              
            api.post(`${apiUrl}`+`department/dept/create`,this.input).then((response) => {
              api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = response.data
                  });
            });
            this.input = {}
            this.modal=false
          }
      },
      editdept() {
        var sendData = {
          department_name:this.editinput.department_name,
          parent_department:this.editinput.parent_department
        }
        api.put(`${apiUrl}`+`department/dept/edit/`+`${this.editinput._id}`,sendData).then((res)=>{
            api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = response.data
              });
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
        if(args.item.id == 'delete') {
                    if(this.$refs.treegrid.getSelectedRecords().length>0) {
                      var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
                              api.delete(`${apiUrl}`+`department/dept/delete/`+`${data[0]._id}`).then((res) => {
                                api.get(`${apiUrl}`+`department/dept/get`)
                                .then((response) => {
                                  this.data = response.data
                                  })
                              });
                              this.$refs.treegrid.collapseAll()
                              this.$refs.treegrid.expandAll()
                    }
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
      cellSave(args) {
        if(args.action == "edit") {
          var sendData = {
            department_name : args.data.department_name
          }
          api.put(`${apiUrl}`+`department/dept/edit/`+`${args.data._id}`,sendData).then((res)=>{
            api.get(`${apiUrl}`+`department/dept/get`)
                .then((response) => {
                  this.data = response.data
                  })
          })
        }
      }
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
</style>