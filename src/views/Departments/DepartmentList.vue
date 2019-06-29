<template>
    <div class="col-lg-12 control-section">
        <div>
            <ejs-treegrid ref='treegrid' :toolbar="toolbar" :rowHeight='rowHeight'  :dataSource='data' 
            childMapping='sub_departments' :height='height' :allowReordering='true' :allowFiltering='true'
            :enableCollapseAll="true"
            :allowSorting='true' :editSettings='editSettings' :toolbarClick='clickHandler' :autoCheckHierarchy= 'true' :allowTextWrap='true'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' >
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <!-- <e-column :visible=false field='_id'  headerText='Context'></e-column> -->
                    <e-column field='department_name' headerText='Departments' width='170' ></e-column>
                     <e-column headerText='Manage Heads And Designations' width='140' :commands='commands'></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { addRecord } from "@syncfusion/ej2-vue-grids";
Vue.use(TreeGridPlugin)

var api = axios.create({
  withCredentials :true
})
export default {
    name: "Department List",
    components :  {
      addRecord,
        TreeGridPlugin, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page
    },
    data : function() {
        return {
             commands: [
                 { type:"Heads", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                 { type:"Designations",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                 
                    ],
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 10},
             editSettings: { allowDeleting: true, allowAdding: true, mode: 'Row',newRowPosition: 'Child' },
             rowHeight: 20,
              toolbar: [     
          'Add', 'Delete', 'Update', 'Cancel',
                { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
                { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
                { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
            ],
             data: [
             ],
   };
  },
  async mounted() {
  	this.data = [
  			{
  				department_name:"Academics",
  				sub_departments : [
  					{
  						department_name:"CSE",
  						sub_departments : [
  							{
  								department_name:"1st Year"
  							},
  						]
  					},

  				]
  			},
  			{
  				department_name:"Academics",
  				sub_departments : [
  					{
  						department_name:"CSE",
  						sub_departments : [
  							{
  								department_name:"1st Year"
  							},
  						]
  					},

  				]

  			},
  			{
  				department_name:"Academics",
  				sub_departments : [
  					{
  						department_name:"CSE",
  						sub_departments : [
  							{
  								department_name:"1st Year"
  							},
  						]
  					},

  				]

  			},





  		]
      // await api.get(`${apiUrl}`+`usertype/permission/view/all`).then((response)=>{
      //   console.log(response.data);
      //   this.data = response.data;
      // });
      // for(var i=0;i<this.data.length;i++) {
      //       var test = []
      //       await api.get(`${apiUrl}`+`super/group/subgroup/getall/`+`${this.data[i]._id}`).then((response)=> {
      //         console.log(response.data[0]);
      //         test = response.data[0]
      //       });
      //       console.log(test);
      //       this.data[i].subgroups.push(test)
      //       console.log(this.data[i].subgroups)
      //     }
      //     console.log(this.$refs.treegrid.ej2Instances.getDataRows())
          
  },
  provide: {
      treegrid: [CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
        expanding(args) {
          console.log(this.$refs.treegrid.getSelectedRecords())
        },
        // async getMore() {
        //   console.log("sadasd")
        //   for(var i=0;i<this.data.length;i++) {
        //     var test = []
        //     await api.get(`${apiUrl}`+`super/group/subgroup/getall/`+`${this.data[i]._id}`).then((response)=> {
        //       console.log(response.data[0]);
        //       test = response.data[0]
        //     });
        //     console.log(test);
        //     // this.data[i].subgroups.push(test)
        //     // console.log(this.data[i].subgroups)
        //   }
        // },
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
                this.$router.push(`/usertype/per/`+`${data[0].parentItem.user_type}/`+`${data[0].user_type}`)
            }
       },

       Add(args) {
           let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            console.log(data);
            if(data[0].user_type == "SuperAdmin" || 
                        data[0].user_type == "Staff" || 
                        data[0].user_type == "Vendor" ||
                        data[0].user_type == "Student" || 
                        data[0].user_type == "Guest") {
            }
       },
       failure: function(args) {
        debugger;
      },
      clickHandler(args){
        if(this.$refs.treegrid.getSelectedRecords().length<=0){
                    if (args.item.text == 'Add') {
                      alert("please select a user type before adding");
                      asd = asd;
                    }        
                }
                if(this.$refs.treegrid.getSelectedRecords().length>0){
                    if (args.item.text == 'Delete') {
                      let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
                      if(data[0].user_type == "SuperAdmin" || 
                        data[0].user_type == "Staff" || 
                        data[0].user_type == "Vendor" ||
                        data[0].user_type == "Student" || 
                        data[0].user_type == "Guest") {
                          alert('Cannot Delete User Types');
                           asd = asd;
                        }
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