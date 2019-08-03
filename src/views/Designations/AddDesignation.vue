<template>
	<div class="animated slideInLeft" style="animation-duration:100ms">
		<b-card>
                <b-form v-on:submit.prevent="addDesig">
                    <b-tabs>
                      <b-tab :title="$ml.get('designation')" active>
                      	<b-form-group style="padding:2%">
                      		<b-col sm="6">
                      			<ejs-textbox v-model="input.name" floatLabelType="Auto" :placeholder="$ml.get('designation')"></ejs-textbox>
                      		</b-col>
                          <b-col sm="6">
                            <label v-text="$ml.get('parentdesig')"></label>
                            <treeselect :placeholder="$ml.get('pholdparentdesig')" v-model="input.parent_designation_id" :multiple="false" :options="data" />
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
                          <treeselect :placeholder="$ml.get('pholdparentdept')" v-model="input.department" :multiple="false" :options="department" />
                        </b-col>
                  			<!-- <div v-if="!clicked1">
                  				<b-col sm="8">
                  					<b-row>
                  						<b-col sm="9">
                  				<ejs-dropdownlist :change="changeDept" :close="switchNow1" :showClearButton="true" v-model="input.department" floatLabelType="Auto" :groupTemplate="groupTemplate1" :allowFiltering="true" :dataSource='department' :fields='dept_fields' popupHeight='300' :placeholder="$ml.get('pholddept')" :footerTemplate="addDesignation"></ejs-dropdownlist>
                  			</b-col>
                  			<b-col sm="1">
                  				<b-button variant="primary" @click="refreshDept" style=" margin-top:10px;"><i class="fa fa-refresh"></i></b-button>
                  			</b-col>
                  		</b-row>
                  			</b-col>
                  			</div>
	                  		<div v-else>
	                  			<b-col sm="8">
                  					<b-row>
                  						<b-col sm="9">
	                  			<ejs-dropdownlist :change="changeDept" v-model="input.department" :showClearButton="true" floatLabelType="Auto"  :allowFiltering="true" :dataSource='department' :fields='dept_fields' popupHeight='300' :placeholder="$ml.get('pholddept')" :footerTemplate="addDesignation"></ejs-dropdownlist>
	                  			</b-col>
                  			<b-col sm="1">
                  				<b-button variant="primary" @click="refreshDept" style=" margin-top:10px;"><i class="fa fa-refresh"></i></b-button>
                  			</b-col>
                  		</b-row>
	                  		</b-col>
	                  		</div> -->
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
import { ToolbarPlugin} from "@syncfusion/ej2-vue-navigations";
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
import { DropDownList, DropDownListPlugin} from '@syncfusion/ej2-vue-dropdowns';
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
var addDesigVue = Vue.component("addDesignation", {
    template: `<div><b-button type="button" size="md" style="width:100%" variant="primary" @click="modal = true"  class="mr-1" v-text="$ml.get('adddesig')"></b-button>
    	<b-modal :title="$ml.get('adddesig')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
              <div>
                <b-form v-on:submit.prevent="addDept">
                  <b-form-group style="padding:5%">
                  <ejs-textbox v-model="input.department_name" floatLabelType="Auto" :placeholder="$ml.get('department')"></ejs-textbox>
                <br>
                <div v-if="!clicked">
                <ejs-dropdownlist floatLabelType="Auto" :showClearButton="true" :close="switchNow" v-model="input.parent_department" :groupTemplate="groupTemplate1"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholdparentdept')"></ejs-dropdownlist>
                </div>
                <div v-else>
                	<ejs-dropdownlist floatLabelType="Auto" :showClearButton="true" v-model="input.parent_department"  :allowFiltering="true" id='department' :dataSource='department'  :fields='dept_fields'  popupHeight='300' :placeholder="$ml.get('pholdparentdept')"></ejs-dropdownlist>
                </div>
                </b-form-group>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                </div>
            </b-modal>
    </div>`,
    data() {
      return {
      	groupTemplate1 : function(){
      		return  {
      			template:groupVue1
      		}
      	},
        data: {

        },
        clicked:false,
        modal:false,
        input:{},
        department:[],
        dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
      };
    },
    mounted(){
    	api.get(`${apiUrl}`+`department/dept/get`).then((res) => {
        this.department = res.data
      })
    },
    methods:{
    	switchNow() {
    		this.clicked = true
    	},
    	addDept() {
    		api.post(`${apiUrl}`+`department/dept/create`,this.input).then((response) => {
    			this.modal = false
    		})
    	}
    }
  });


export default {
    name: "AddDesignation",
    components :  {
      cSwitch,
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
       		addDesignation : function() {
       			return {
       			template : addDesigVue
       		}
       		},
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
            	{module_name:"company",text:"Company",read:true,write:false,edit:false,delete:false},{module_name:"subuser",text:"User",read:false,write:false,edit:false,delete:false},
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
    axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = this.list_to_tree_dept(res.data)
      })
      axios.get(`${apiUrl}`+`designation/desig/get/all`,{withCredentials:true}).then((res) => {
        this.data = this.list_to_tree_desig(res.data)
      })

    },
  provide: {
            grid: [Edit,Resize, Selection, Sort,Toolbar]
        },
  watch : {
    'input.department' : function(){
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
          }
      },
   	actionComplete(args) {
   		console.log(args)
   	},
      changeDept(args) {
      	if(args.e!=null) {
      	// 	if(args.itemData!=null) {
      	// 	api.get(`${apiUrl}`+`designation/desig/find/`+`${args.itemData._id}`).then((res) => {
      	// 		if(this.input.parent_designation_id !=null) {
      	// 			console.log("ASdasd")
      	// 		this.input.parent_designation_id = null
      	// 		this.data.shift()
      	// 	}
      	// 		this.data = res.data
      	// 	})
      	// }
      	// 	else {
      	// 		api.get(`${apiUrl}`+`designation/desig/get/all`)
			    // .then((response) => {
			    //   this.data = response.data
			    //   });
      	// 	}
      	}
      },
      addDesig(args) {
        if(this.input.parent_designation_id == "") {
          this.input.parent_designation_id = undefined
        }
        this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              
          //     let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          // if(parent.length == 0) {
            console.log(this.input)
             api.post(`${apiUrl}`+`designation/desig/create`,this.input).then((response) => {
              		var user_group = {
		                user_type:"Staff",
		                user_group_name:response.data._id || response.data[0]._id,
		                permissions:this.datasrc
		              }
                  console.log(response.data)
	                api.get(`${apiUrl}`+`designation/desig/get/all`)
	                .then((res) => {
	                  this.data = res.data
  		              api.post(`${apiUrl}`+`super/group/subgroup/add`,user_group).then((res) => {
  		              	console.log(res.data)
  		              })
	                  });
                });
              
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
        // // }
        	this.$router.push('/designation/list')
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
      refreshDept() {
      	api.get(`${apiUrl}`+`department/dept/get`).then((res) => {
	        this.department = res.data
	      })
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