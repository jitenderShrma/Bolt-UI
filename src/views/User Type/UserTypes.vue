<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <div id="target" class="col-lg-12 control-section">
        <div >
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
              <e-item id="label" :text="$ml.get('label')"></e-item>
            </e-items>
          </ejs-toolbar>
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight' idMapping='_id' :treeColumnIndex='1' parentIdMapping='parent_group' :dataSource='data' 
            childMapping='sub_groups' :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionBegin="actionBegin"
            :actionComplete="actionComplete"
            :enableCollapseAll="false"
            :autoFitColumns="true"
            :allowSorting='true' :editSettings='editSettings' :allowTextWrap='true'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' >
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <!-- <e-column :visible=false field='_id'  headerText='Context'></e-column> -->
                    <e-column field='user_type' headerText='User Type' ></e-column>
                    <e-column field='user_group_name' headerText='User Groups' ></e-column>
                    <e-column field='labels' :template="labelTemplate" :allowEditing="false" headerText='Label' ></e-column>
                     <e-column headerText='Manage Permissions'  :commands='commands'></e-column>
                </e-columns>
            </ejs-treegrid>
            <ejs-dialog id='dialog' height="auto" header='Add A Label' showCloseIcon='true' :isModal='LabelModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
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
        </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { ToolbarPlugin} from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import { CheckBoxPlugin } from "@syncfusion/ej2-vue-buttons";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";

Vue.use(TextBoxPlugin);
Vue.use(CheckBoxPlugin);
Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);


Vue.use(DialogPlugin);
Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)

var api = axios.create({
  withCredentials :true
})
export default {
    name: "UserTypeList",
    components :  {
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder, Resize, Page
    },
    data : function() {
        return {
          squarePalettesColn: 7,
        circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
          formatSettings : {type:'json'},
                label : 0,
                formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "User Groups",
                  description : ""
                },
                LabelModal: false,
                animationSettings: { effect: 'Zoom' },
                commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                     appendExcelExportProperties : {
                multipleExport: { type: 'AppendToSheet', blankRows: 2 }
            },
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: { pageSize: 15},
             editSettings: { allowDeleting: true,mode: 'Dialog', allowEditing: true,allowAdding: true},
             rowHeight: 20,
              toolbar: [     
          'Add', 'Delete', 'Update', 'Cancel',
          'ExcelExport','PdfExport',
                { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
                { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
                { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
            ],
            selectionSettings : {type:"Single"},
            data: [],
            labelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div ><b-badge style="font-weight:100;margin:3px" v-for="label in data.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          
            
   };
  },
  async mounted() {
     api.get(`${apiUrl}`+`super/group/subgroup/getall`)
    .then((response) => {
      this.data = response.data
      console.log(this.data)
      })
    this.$refs.dialogObj.hide();

    },
  // computed : {
  //     async getData () {
  //     await api.get(`${apiUrl}`+`usertype/permission/view/all`).then((response)=>{
  //       console.log(response.data);
  //       this.data = response.data;
  //        api.get(`${apiUrl}`+`super/group/subgroup/getall/`).then((response)=> {
  //             console.log(response.data)
  //             this.subdata = response.data;
  //             for(var i=0;i<this.data.length;i++) { 
  //               for(var j=0;j<this.subdata.length;j++) {
  //                   if(this.data[i]._id == this.subdata[j].parent_group) {
  //                     this.data[i].sub_groups= this.subdata[j]
  //                   }
  //               }
  //             }
  //             console.log(this.data)
  //           });
  //     });
  //   }
  // },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
      addLabel (args) {
        this.$refs.dialogObj.hide();
        let val = this.$refs.treegrid.getSelectedRecords()
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) => {
                console.log(response.data);
                var id = {
                  labels :  response.data._id
                }
                api.put(`${apiUrl}`+`super/group/subgroup/push/label/`+`${val[0]._id}`,id).then((response) => {
                  this.$router.go(0)
                });
                this.formdata=null
              });
            
      },
      onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
      },   
       actionBegin(args) {
        console.log(args)
        if(args.requestType==="save" && args.action!="edit") {
          var selected = this.$refs.treegrid.ej2Instances.getSelectedRecords()
          if(selected.length>0) {
          args.data.labels = undefined
          args.data.parent_group = selected[0]._id
          api.post(`${apiUrl}`+`super/group/subgroup/add`,args.data).then((response) => {
            console.log(response.data)
            api.get(`${apiUrl}`+`super/group/subgroup/getall`)
            .then((response) => {
              this.data = response.data
              console.log(this.data)
              })
          });
        }
        else {
          args.data.labels = undefined
          args.data.parent_group = null
          api.post(`${apiUrl}`+`super/group/subgroup/add`,args.data).then((response) => {
            console.log(response.data)
            api.get(`${apiUrl}`+`super/group/subgroup/getall`)
            .then((response) => {
              this.data = response.data
              console.log(this.data)
              })
          });
        }

        }
      },
      actionComplete: function(args) {
        if(args.action=="edit") {
          var sendData = {
            user_type : args.data.user_type,
            user_group_name : args.data.user_group_name
          }
          api.put(`${apiUrl}`+`super/group/subgroup/edit/${args.data._id}`,sendData).then((res) => {
            api.get(`${apiUrl}`+`super/group/subgroup/getall`)
            .then((response) => {
              this.data = response.data
              console.log(this.data)
              })
          })
        }
      },
       onClick(args) {
          let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();

            console.log(args.currentValue)
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
          
                              this.$refs.treegrid.addRecord()
            
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
          let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
                    if(data.length>0) {
                      api.delete(`${apiUrl}`+`super/group/subgroup/delete/`+`${data[0]._id}`).then((res) => {
                        api.get(`${apiUrl}`+`super/group/subgroup/getall`)
                          .then((response) => {
                          this.data = response.data
                          console.log(this.data)
                          })
                      })
                    }
                    
                }

        if (args.item.id === 'exportPdf') {
            this.$refs.treegrid.pdfExport({hierarchyExportMode: 'All'});
        }
         if (args.item.id === 'exportExcel') {
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
#label {
  font-size:12px;
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

.badge-red {
  background-color: red;
  color:white;
}
.badge-#ff000 {
  background-color: red;
}

</style>