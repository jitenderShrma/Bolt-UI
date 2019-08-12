<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

 <div id="target" className="animated fadeIn">
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <ejs-toolbar id="toolbargrid" :clicked="addEditHandler">
                <e-items >
                 <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate"></e-item>
                 <e-item align="right" id="edit" :text="$ml.get('edit')" :template="editTemplate"></e-item>
                 <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
                </e-items>
                </ejs-toolbar>
             <div class="control-section">
                
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowResizing='true'  id='overviewgrid' :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='context' headerText='Context'  :filter='filter' ></e-column>
                    <e-column field='label_name' :template="labelTemplate" headerText='Name'  :filter='filter' ></e-column>     
                    <e-column field='color' :visible="false" headerText='Name'  :filter='filter' ></e-column>
                    <e-column field='description' :visible="false" headerText='Name'  :filter='filter' ></e-column> 
                </e-columns>
                </ejs-grid>
                <ejs-dialog id='dialog' height="auto" header='Label' showCloseIcon='true' :isModal='LabelAddModal' :animationSettings='animationSettings' width='285px' ref='dialogObj'
            target='#target' >
            <b-form v-on:submit.prevent="addLabel">
        <div class="content-wrapper textbox-default">
        <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <ejs-textbox v-model="formdata1.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <ejs-textbox v-model="formdata1.context" floatLabelType="Auto" placeholder="Context" required></ejs-textbox>
        </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <p>Label Color</p>
            </div>
            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <ejs-colorpicker :value="formdata1.color" :change="onChange" id="color-picker"></ejs-colorpicker>
            </div>
        </div>
        <br>
        <div class="multiline_wrapper">
            <ejs-textbox v-model="formdata1.description" ref="textareaObj" id="default" :multiline="true" floatLabelType="Auto" placeholder="Description" required></ejs-textbox>
        </div>
        </div>
        <div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
        </ejs-dialog>
        <ejs-dialog id='dialog' height="auto" header='Label' showCloseIcon='true' :isModal='LabelEditModal' :animationSettings='animationSettings' width='285px' ref='dialogObj1'
            target='#target' >
            <b-form v-on:submit.prevent="editLabel">
        <div class="content-wrapper textbox-default">
        <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <ejs-textbox v-model="formdata.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                <ejs-textbox v-model="formdata.context" floatLabelType="Auto" placeholder="Context" required></ejs-textbox>
        </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
              <p>Label Color</p>
            </div>
            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <ejs-colorpicker :value="formdata.color" :change="onChange" id="color-picker"></ejs-colorpicker>
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
        <ejs-dialog :buttons='alertDlgButtons' ref="alertDialog" v-bind:visible="false" :header='alertHeader' :animationSettings='animationSettings' :content='alertContent' :showCloseIcon='showCloseIcon' :target='target'
            :width='alertWidth'>
        </ejs-dialog>
  </div>
 </div>
</div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import { Browser } from '@syncfusion/ej2-base';
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import VueNotifications from 'vue-notifications'
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";

import miniToastr from 'mini-toastr' 
Vue.use(ColorPickerPlugin);

import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    
    Vue.use(PivotViewPlugin);
    Vue.use(GridPlugin);
    Vue.use(ToolbarPlugin);
Vue.use(TextBoxPlugin);

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


var api = axios.create({
  withCredentials:true
})
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
    name: 'LabelList',
    components: {
      ToolbarPlugin,
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
        GroupingBar,
        FieldList,
        Edit
    },
     provide: {
            grid: [PdfExport,ExcelExport,Edit,FieldList,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser]
        },
    data: function () {
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
                editTemplate: function () {
              return {
                  template: Vue.component("editTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-edit"></i>&nbsp<span id="hide" v-text="$ml.get('edit')"></span></b-badge>`,
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
                      template: `<div><b-badge style="font-weight:100;margin:3px" id="label" :variant="data.color">{{data.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
            fields: { text: 'text', value: 'value' },
            dropdownValue: 'Top',
            datasrc: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true,mode:'Dialog'},
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
           searchTemplate: function () {
              return {
                  template: Vue.component("searchTemplate", {
                      template: `<div class="e-input-group e-search" role="search"><input id="overviewgrid_searchbar" class="e-input" name="input" type="search" v-on:keydown.enter="searchValues" v-model="data.search" placeholder="Search"><span id="overviewgrid_searchbutton" class="e-input-group-icon e-search-icon e-icons" tabindex="-1" title="Search" aria-label="search"></span></div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      },
                      methods:{
                        searchValues(args) {
                          
                        }
                      }
                })
              }
          },
           monthTemplate: function () {
              return {
                  template: Vue.component("monthTemplate", {
                      template: `<div>{{month}}</div>`,
                      data() {
                        return {
                          data: {
                          },
                          month:null,
                        };
                      },
                      mounted() {
                        switch(this.data.month) {
                          case "0": this.month = "January"
                                  break;
                          case "1": this.month = "February"
                                  break;
                          case "2": this.month = "March"
                                  break;
                          case "3": this.month = "April"
                                  break;
                          case "4": this.month = "May"
                                  break;
                          case "5": this.month = "June"
                                  break;        
                          case "6": this.month = "July"
                                  break;
                          case "7": this.month = "August"
                                  break;
                          case "8": this.month = "September"
                                  break;
                          case "9": this.month = "October"
                                  break;        
                          case "10": this.month = "November"
                                  break;        
                          case "11": this.month = "December"
                                  break;
                        }
                      }
                    })
              }
          },
          label:0,
           height : window.innerHeight*0.695,
          toolbar: [
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
        ddData: [{ value: 1000, text: '1,000 Rows and 11 Columns' }, { value: 10000, text: '10,000 Rows and 11 Columns' }],
                ddValue: 1000,
                stTime: null,
                loadTime: null,
                dReady: false,
                showCloseIcon: false,
                isDataChanged: true,
                fields: { text: 'text', value: 'value' },
                
                filterOptions: {
                    type: 'Menu'
                },
                filter: {
                    type: 'CheckBox'
                },
                formdata1: {
                  label_name : "",
                  color : "#fff",
                  context : "",
                  description : ""
                },
                formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "",
                  description : ""
                },
                LabelEditModal: "",
                LabelAddModal:"",
                animationSettings: { effect: 'Zoom' },
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { persistSelection: true, type: 'Multiple' }
            };
        },
        watch : {
      'label' : function() {
        api.get(`${apiUrl}`+`label/label/get/all`).then((response) => {
                    this.datasrc = response.data;
                })
      }
    },
  methods: {
            addLabel(args) {
              axios.post(`${apiUrl}`+`label/label/create`,this.formdata1,{withCredentials:true}).then((res) => {
                this.label++
              });
              this.$refs.dialogObj.hide()
            },
            editLabel(args) {
              var id = this.$refs.overviewgrid.getSelectedRecords()
              axios.put(`${apiUrl}`+`label/label/edit/`+`${id[0]._id}`,this.formdata,{withCredentials:true}).then((res) => {
                this.label++
              });
              this.$refs.dialogObj1.hide()
            },
            onChange(args) {
              this.formdata.color = args.currentValue.hex;
            }, 
            load: function() {
                let proxy = this;
                this.$refs.overviewgrid.$el.ej2_instances[0].on('data-ready', function () {
                    proxy.dReady =  true;
                 })
                this.$refs.overviewgrid.$el.addEventListener('DOMSubtreeModified', function () {
                    if (proxy.dReady && proxy.stTime && proxy.isDataChanged) {
                        let e = performance.now() - proxy.stTime;
                        proxy.loadTime = "Load Time: <b>" + e.toFixed(0) + "</b><b>ms</b>";
                        proxy.stTime = null;
                        proxy.dReady = false;
                        proxy.isDataChanged = false;
                        proxy.$refs.msgelement.classList.remove('e-hide');
                    }
                })
            },
            searchValues(args) {
              console.log("ASdasd")
            },
            clickHandler (args) {
                    if(this.$refs.overviewgrid.getSelectedRecords().length>0){
                    let withHeader = false;
                    if (args.item.id === 'copyHeader') {
                        withHeader = true;
                    }
                    this.$refs.overviewgrid.copy(withHeader);
                } else if(args.item.id === 'copyHeader' || args.item.id === 'copy'){
                    this.$refs.alertDialog.show();
                }
                 if (args.item.id === 'small') {
                    this.rowHeight = 20;
                }
                if (args.item.id === 'medium') {
                    this.rowHeight = 40;
                }
                if (args.item.id === 'big') {
                    this.rowHeight = 60;
                }
                if (args.item.text === 'CSV Export') {
                    this.$refs.overviewgrid.csvExport()
                }
                if (args.item.text === 'PDF Export') {
                    this.$refs.overviewgrid.pdfExport()
                }
            },
            addEditHandler(args) {
              console.log(args)
                if(args.item.id == "add") {
                    this.$refs.dialogObj.show();
                }
                
                if(args.item.id == "delete") {
                    var selected = this.$refs.overviewgrid.getSelectedRecords()
                    if(selected.length>0) {
                        axios.delete(`${apiUrl}`+`label/label/delete/`+`${selected[0]._id}`,{withCredentials:true}).then((response) => {
                            this.label++;
                    })
                    }
                }
                if(args.item.id == 'edit') {
                  var id = this.$refs.overviewgrid.getSelectedRecords() 
                  if(this.$refs.overviewgrid.getSelectedRecords().length>0) {
                    this.$refs.dialogObj1.show();
                    axios.get(`${apiUrl}`+`label/label/get/one/`+`${id[0]._id}`,{withCredentials:true}).then((res) => {
                        this.formdata = res.data
                    });
                  }
                  else { 
                    alert("Please select a record to label it");
                  }
                }
                if (args.item.id === 'excelexport') {
                    this.$refs.overviewgrid.excelExport()
                }
                if (args.item.id === 'pdfexport') {
                    this.$refs.overviewgrid.pdfExport()
                }
                 if (args.item.id === 'small') {
                    this.rowHeight = 20;
                }
                if (args.item.id === 'medium') {
                    this.rowHeight = 40;
                }
                if (args.item.id === 'big') {
                    this.rowHeight = 60;
                }
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
            
        },
        async mounted () { 
          this.$refs.dialogObj.hide()
          this.$refs.dialogObj1.hide()
                api.get(`${apiUrl}`+`label/label/get/all`).then((response) => {
                    this.datasrc = response.data;
                    console.log(response.data)
                })
            
        }
};
</script>


<style>

.container-fluid {
    width: 100%;
    padding-right: 0px !important;
    padding-left: 0px !important;
    margin-right: 0;
    margin-left: 0;
}
.breadcrumb { 
    margin-bottom: 0;
}


#label {
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