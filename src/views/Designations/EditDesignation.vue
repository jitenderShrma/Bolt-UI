<template>
	<div class="animated slideInLeft" style="animation-duration:100ms">
		<b-card>
                <b-form v-on:submit.prevent="addDesig">
                    <b-tabs>
                      <b-tab :title="$ml.get('designation')" active>
                      	<b-form-group style="padding:5%">
                      		<ejs-textbox v-model="input.name" floatLabelType="Auto" :placeholder="$ml.get('designation')"></ejs-textbox>
                      		<div v-if="!clicked">
                  				<ejs-dropdownlist :change="changeDesig" :showClearButton="true"  v-model="input.parent_designation_id" floatLabelType="Auto" :groupTemplate="desigTemplate" :allowFiltering="true" :dataSource='data' :fields='desig_fields' popupHeight='300' :placeholder="$ml.get('pholdparentdesig')"></ejs-dropdownlist>
                  			</div>
                  			<div v-else>
                  				<ejs-dropdownlist :change="changeDesig" :showClearButton="true" v-model="input.parent_designation_id" :allowFiltering="true" :dataSource='data' :fields='desig_fields'  popupHeight='300' :placeholder="$ml.get('pholdparentdesig')"></ejs-dropdownlist>
                  			</div>
                  			<div v-if="!clicked1">
                  				<ejs-dropdownlist :change="changeDept" :close="switchNow1" :showClearButton="true" v-model="input.department" floatLabelType="Auto" :groupTemplate="groupTemplate1" :allowFiltering="true" :dataSource='department' :fields='dept_fields' popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
                  			</div>
	                  		<div v-else>
	                  			<ejs-dropdownlist :change="changeDept" v-model="input.department" :showClearButton="true" floatLabelType="Auto"  :allowFiltering="true" :dataSource='department' :fields='dept_fields' popupHeight='300' :placeholder="$ml.get('pholddept')"></ejs-dropdownlist>
	                  		</div>
				  		</b-form-group>
				  	  </b-tab>
			  		  <b-tab :title="$ml.get('permissions')">
			  		    <div class="col-lg-15 control-section">
					        <div class="content-wrapper">
					             <div class="control-section">
					            <ejs-grid ref='overviewgrid' :editSettings='editSettings' :rowHeight='rowHeight' :allowResizing='true'   id='overviewgrid' :dataSource="datasrc"  :allowSorting='true' :allowSelection="true" :actionComplete="actionComplete"
					                 :enableHover='true' >
					                <e-columns>
					                    <e-column field='text'  headerText='Module Name'  :isPrimaryKey='true'></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='edit' headerText='Edit'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='delete' headerText='Delete'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='read' headerText='Read'   ></e-column>
					                    <e-column editType= 'booleanedit' :width="60" :displayAsCheckBox='true' field='write' headerText='Add'   ></e-column>
					                    
					                </e-columns>
					            </ejs-grid>
					        </div>
					    </div>
					</div>
			    </b-tab>
              </b-tabs>
              <br>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
            </b-card>
                </div>
</template>

<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import ml from '@/ml'
import Vue from 'vue'
import { Browser } from '@syncfusion/ej2-base';
import {ClientTable, Event} from 'vue-tables-2'
import { ToolbarPlugin,ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
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
  FieldList,
  IDataSet
} from "@syncfusion/ej2-vue-pivotview";
import { Switch as cSwitch } from '@coreui/vue'

import { Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
import { DropDownList, DropDownListPlugin,ChangeEventArgs } from '@syncfusion/ej2-vue-dropdowns';
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

var departments = []
var designations = []
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
      })
    }
    }
  });
var desigVue = Vue.component("desigTemplate", {
    template: `<strong>{{data.parent_designation_id}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    async mounted() {
      if(this.data.parent_designation_id!=null) {
      await api.get(`${apiUrl}`+`designation/desig/get/one/`+`${this.data.parent_designation_id}`).then((res) => {
        console.log(res.data)
        this.val1 = res.data.name
        this.data.parent_designation_id = res.data.name
        designations.push(this.data)
      }).catch((error) => {
        console.log("asda");
      })
    }
    }
  });


export default {
    name: "AddDesignation",
    components :  {
      cSwitch,
        ClientTable,
      Event,
      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,ChangeEventArgs,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList,
  IDataSet,
  Edit
    },
    data : function() {
        return {
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
          selected:false,
          link:"",
          key:"",
          clicked1:false,
            department:[],
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 15},
             editSettings: { allowSelection:true, allowEditing: true, allowAdding: true, allowDeleting: true,allowDblClick:true},
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
	            {module_name:"staff",text:"Staff",read:false,write:false,edit:false,delete:false}
	            ],
            modal :false,
            input:{},
            selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
          desig_fields:{groupBy:'parent_designation_id',text:"name",value:"_id"},
          permissions:{},
          clicked:false,
          modules:[
            
          ],
          module:"",
          module_fields:{text:"text",value:"value"} 
   };
  },
  async mounted() {
  	this.link = window.location.href
  	this.key = this.link.split('add/').pop()
  	this.input.parent_designation_id = this.key
  	api.get(`${apiUrl}`+`designation/desig/get/one/${this.key}`).then((res) =>{
  		this.input.department = res.data.department
  	})
    api.get(`${apiUrl}`+`department/dept/get`).then((res) => {
        this.department = res.data
      })
     api.get(`${apiUrl}`+`designation/desig/get/all`)
    .then((response) => {
      this.data = response.data
      });

    },
  provide: {
            grid: [Edit,Resize, Selection, Sort,Toolbar]
        },
   methods:{
   	actionComplete(args) {
   		console.log(args)
   	},
      changeDept(args) {
      	if(args.e!=null) {
      		console.log(args.itemData._id)
      		api.get(`${apiUrl}`+`designation/desig/find/`+`${args.itemData._id}`).then((res) => {
      			if(this.input.parent_designation_id !=null) {
      				console.log("ASdasd")
      			this.input.parent_designation_id = null
      			this.data.shift()
      		}
      			this.data = res.data
      		})
      	}
      },
      addDesig(args) {
        this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              var user_group = {
                user_type:"Staff",
                user_group_name:this.input.name,
                permissions:this.datasrc
              }
          //     let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          // if(parent.length == 0) {
              api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
                this.input = {}
                });
              api.post(`${apiUrl}`+`super/group/subgroup/add`,user_group).then((res) => {
              	console.log(res.data)
              })
        // }
        //   else {
        //       this.input.parent_designation_id = parent[0]._id
        //   api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
        //     api.get(`${apiUrl}`+`designation/desig/get/all`)
        //         .then((res) => {
        //           this.data = res.data
        //           });
        //         this.input = {}
        //   });
        // }
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
      	if(args.e!=null){
      		this.input.department = args.itemData.department
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