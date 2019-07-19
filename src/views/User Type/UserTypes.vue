<template>
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
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            childMapping='sub_groups' :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionBegin="actionBegin"
            :enableCollapseAll="false"
            :autoFitColumns="true"
            :allowSorting='true' :editSettings='editSettings' :allowTextWrap='true'  :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' >
                <e-columns>
                    <!-- <e-column type='checkbox' :width="30" :allowFiltering='false' :allowSorting='false'  ></e-column> -->
                    <!-- <e-column :visible=false field='_id'  headerText='Context'></e-column> -->
                    
                    <e-column field='user_type' headerText='User Groups' ></e-column>
                    <e-column field='labels.label_name' :allowEditing="false" headerText='Label' ></e-column>
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
                    <ejs-colorpicker value="#000" :change="onChange" id="color-picker"></ejs-colorpicker>
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
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { ToolbarPlugin,ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
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
        TreeGridPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder, ITreeData,Resize, Page
    },
    data : function() {
        return {
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
             editSettings: { allowDeleting: true,mode: 'Dialog', allowEditing: true,allowAdding: true, newRowPosition: 'Child' },
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
                      template: `<div ><b-badge v-for="label in data.labels" id="label" v-b-tooltip.hover :title="label.description" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
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
     api.get(`${apiUrl}`+`my/path/get`)
    .then((response) => {
      this.data = response.data
      console.log(this.data)
      })
    this.$refs.dialogObj.hide();

    },
    watch : {
      'label' : function() {
        api.get(`${apiUrl}`+`my/path/get`)
        .then((response) => {
          this.data = response.data
          console.log(this.data)
          })
      }
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
        console.log(this.formdata)
        if(val[0].user_type == "SuperAdmin" || 
            val[0].user_type == "Staff" || 
            val[0].user_type == "Vendor" ||
            val[0].user_type == "Student" || 
            val[0].user_type == "Guest") {
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) => {
                console.log(response.data);
                var id = {
                  labels :  response.data._id
                }
                api.put(`${apiUrl}`+`usertype/label/push/`+`${val[0].user_type}`,id).then((response) => {
                  console.log(response.data)
                  this.label++;
                });
              });
            }
            else {
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) => {
                console.log(response.data);
                var id = {
                  labels :  response.data._id
                }
                api.put(`${apiUrl}`+`super/group/subgroup/push/label/`+`${val[0]._id}`,id).then((response) => {
                  console.log(response.data)
                  this.label++;
                });
              });
            }
      },
      onChange(args) {
        this.formdata.color = args.currentValue.hex;
      },   
       actionBegin(args) {
        if(args.requestType==="save") {
          let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
          console.log(args.data);
          if(parent[0].user_type == "SuperAdmin" || 
               parent[0].user_type == "Staff" || 
               parent[0].user_type == "Vendor" ||
               parent[0].user_type == "Student" || 
               parent[0].user_type == "Guest") {
              api.post(`${apiUrl}`+`super/group/subgroup/add`,args.data).then((response) => {
                  console.log(response.data)
                  let id = {sub_groups:response.data._id};
                  console.log(id)
                  api.put(`${apiUrl}`+`/usertype/subgroup/push/one/`+`${parent[0].user_type[0]}`,id).then((res) => {
                    console.log(res.data);
                    this.$refs.treegrid.collapseAll()
                    this.$refs.treegrid.expandAll()
                  })
                });
            }
          api.post(`${apiUrl}`+`super/group/subgroup/add`,args.data).then((response) => {
            console.log(response.data)
            let id = {sub_groups:response.data._id};
            console.log(id)
            api.put(`${apiUrl}`+`super/group/subgroup/push/`+`${parent[0]._id}`,id).then((res) => {
              console.log(res.data);
              this.$refs.treegrid.collapseAll()
              this.$refs.treegrid.expandAll()
              this.LabelModal = false
            })
          });

        }
      },
      actionComplete: function(args) {
        if(args.requestType==="save") {
          console.log("savecomplete")
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
          if(this.$refs.treegrid.getSelectedRecords().length<=0) {
                  alert("please select a user type before adding");
                }
          else { 
              this.$refs.treegrid.addRecord()
            }
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
                    if(this.$refs.treegrid.getSelectedRecords().length>0) {
                      let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
                      if(data[0].user_type == "SuperAdmin" || 
                        data[0].user_type == "Staff" || 
                        data[0].user_type == "Vendor" ||
                        data[0].user_type == "Student" || 
                        data[0].user_type == "Guest") {
                          alert('Cannot Delete User Types');
                        }
                        else {
                          let deleterows = this.$refs.treegrid.ej2Instances.getSelectedRows();
                          console.log(deleterows[0])
                          let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
                          let id = parent[0].parentItem._id
                          let delElem = {
                            sub_groups : parent[0]._id
                          }
                          console.log(parent[0].parentItem.user);

                          if(parent[0].parentItem.user_type == "SuperAdmin" || 
                          parent[0].parentItem.user_type == "Staff" || 
                          parent[0].parentItem.user_type == "Vendor" ||
                          parent[0].parentItem.user_type == "Student" || 
                          parent[0].parentItem.user_type == "Guest") {
                            api.put(`${apiUrl}`+`usertype/subgroup/pop/one/`+`${parent[0].parentItem.user_type[0]}`,delElem).then((response) => {
                                console.log(response.data)
                                this.$refs.treegrid.collapseAll()
                                this.$refs.treegrid.expandAll()
                              })
                          }
                          else{
                          api.put(`${apiUrl}`+`super/group/subgroup/pop/`+`${id}`,delElem).then((response) => {
                            console.log(response.data)
                            this.$refs.treegrid.collapseAll()
                            this.$refs.treegrid.expandAll()
                          })
                        }
                      }
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