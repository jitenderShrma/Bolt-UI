<template>
 <div className="animated fadeIn">
    
     <!-- <b-card no-body style="padding:0.5rem; margin:0px;">
         <b-row>
             <b-col sm="5">
                 <router-link :to="{ name: 'E-Mail Template Add' }">
                    <h3><b-badge variant="primary" v-text="$ml.get('addtemplate')"></b-badge></h3>
                </router-link>
             </b-col>
            <b-col sm="5">
                
                <h3 @click="editPage"><b-badge variant="primary" v-text="$ml.get('edittemplate')"></b-badge></h3>
                
            </b-col>
         </b-row>
     </b-card> -->
     
  
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
             <div class="control-section">
            <ejs-grid ref='overviewgrid' :editSettings='editSettings' :rowHeight='rowHeight' :allowResizing='true'   id='overviewgrid'  :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions'  :allowSorting='true' :allowSelection="true" :selectionSettings="selectionSettings"
                :height="height" :actionBegin='actionBegin' :enableHover='true' :toolbar="toolbar" :toolbarClick="clickHandler" :load='load'>
                <e-columns>
                    <e-column width="80"  isPrimaryKey='true' type='checkbox' :allowFiltering='false' :allowSorting='false'  ></e-column>
                    
                    <e-column field='module_name'  headerText='Module Name' :filter='filter' :isPrimaryKey='true'></e-column>
                    <e-column editType= 'booleanedit' :displayAsCheckBox='true' field='edit' headerText='Edit'  :filter='filter' ></e-column>
                    <e-column editType= 'booleanedit' :displayAsCheckBox='true' field='delete' headerText='Delete'  :filter='filter' ></e-column>
                    <e-column editType= 'booleanedit' :displayAsCheckBox='true' field='read' headerText='Read'  :filter='filter' ></e-column>
                    <e-column editType= 'booleanedit' :displayAsCheckBox='true' field='write' headerText='Add'  :filter='filter' ></e-column>
                    
                </e-columns>
                </ejs-grid>
                 </div>
        </div>
        <ejs-dialog :buttons='alertDlgButtons' ref="alertDialog" v-bind:visible="false" :header='alertHeader' :animationSettings='animationSettings' :content='alertContent' :showCloseIcon='showCloseIcon' :target='target'
            :width='alertWidth'>
        </ejs-dialog>
         
  </div>
  
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
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList,
  IDataSet
} from "@syncfusion/ej2-vue-pivotview";
import { Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent } from "@syncfusion/ej2-vue-grids";
import { DropDownList, DropDownListPlugin,ChangeEventArgs } from '@syncfusion/ej2-vue-dropdowns';
    Vue.use(ToolbarPlugin);
        
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

export default {
    name: 'Permission List',
    components: {
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
     provide: {
            grid: [Edit,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page]
        },
    data: function () {
      return {
           newRowPositionDataSource: [{ value: 'Top', text: 'Top' }, { value: 'Bottom', text: 'Bottom' }],
            fields: { text: 'text', value: 'value' },
            dropdownValue: 'Top',
            datasrc: [],
            data:{},
            link :"",
            key : "",
            height : window.innerHeight*0.65,
            editSettings: {allowSelection:true, allowEditing: true, allowAdding: true, allowDeleting: true },
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
          toolbar: [
          "Search",
          'Edit',
          'Update','Cancel',
            { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }],
          pageSettings: { pageSizes: [12,50,100,200], pageCount: 4 },
        ddData: [{ value: 1000, text: '1,000 Rows and 11 Columns' }, { value: 10000, text: '10,000 Rows and 11 Columns' }],
                ddValue: 1000,
                stTime: null,
                loadTime: null,
                dReady: false,
                showCloseIcon: false,
                isDataChanged: true,
                fields: { text: 'text', value: 'value' },
                empTemplate: function () {
                    return {
                        template: Vue.component('empTemplate', {
                            template: `<div>
                            <div class="empimg">
                                <span :class="{'e-userimg': true, 'sf-icon-Male': data.EmployeeImg == usermale, 'sf-icon-FeMale': data.EmployeeImg == userfemale}"></span>
                                </span>
                            </div>
                            <span id="Emptext">{{data.Employees}}</span>                            
                        </div>`,
                            data: function () { return { data: {}, usermale: 'usermale', userfemale: 'userfemale' }; }
                        })
                    }
                },
                coltemplate: function () {
                    return {
                        template: Vue.component('coltemplate', {
                            template: '<div><img src="src/grid/images/Map.png" class="e-image" :alt="data.Location"/>  <span id="locationtext">{{data.Location}}</span></div>',
                            data: function () { return { data: {} }; }
                        })
                    }
                },

                statusTemplate: function () {
                    return {
                        template: Vue.component('statusTemplate', {
                            template: `<div id="status" :class="{'statustemp': true, 'e-activecolor': data.Status == active, 'e-inactivecolor': data.Status == inactive}">\
             <span :class="{'statustxt': true, 'e-activecolor': data.Status == active, 'e-inactivecolor': data.Status == inactive}">{{data.Status}}</span></div>`,
                            data: function () { return { data: {}, active: 'Active', inactive: 'Inactive' }; }
                        })
                    }
                },
                trustTemplate: function () {
                    return {
                        template: Vue.component('trustTemplate', {
                            template: '<div><img style="width: 31px; height: 24px" :src="image" :alt="data.Trustworthiness" /><span id="Trusttext">{{data.Trustworthiness}}</span></div>',
                            data: function () { return { data: {}, Perfect: 'Perfect', Sufficient: 'Sufficient', Insufficient: 'Insufficient' }; },
                            computed: {
                                image: function () {
                                    return 'src/grid/images/' + this.data.Trustworthiness + '.png';
                                }
                            }
                        })
                    }
                },
                ratingTemplate: function () {
                    return {
                        template: Vue.component('ratingTemplate', {
                            template: '<div id="status" class="rating">\
                        <span v-for="i in item" :class="{checked: i <= data.Rating, star: true}"></span>\
                      </div>',
                            data: function () { return { data: {}, item: [1, 2, 3, 4, 5] }; }
                        })
                    }
                },

                progessTemplate: function () {
                    return {
                        template: Vue.component('progessTemplate', {
                            template: `<div id="myProgress" class="pbar">
                          <div id="myBar" :class="{'bar': true, 'progressdisable': data.Status == inactive}" :style="{'width': width}">
                            <div id="label" class="barlabel" v-html=width ></div>
                          </div>
                        </div>`,
                            data: function () { return { data: {}, inactive: 'Inactive' }; },
                            computed: {
                                width: function () {
                                    if (this.data.Software <= 20) {
                                        this.data.Software += 20;
                                    }
                                    return this.data.Software + '%';
                                }
                            }
                        })
                    }
                },
                filterOptions: {
                    type: 'Menu'
                },
                filter: {
                    type: 'CheckBox'
                },
                target: '.control-section',
                 alertHeader: 'Copy with Header',
                alertContent: 'Atleast one row should be selected to copy with header',
                alertWidth: '300px',
                animationSettings: { effect: 'None' },
                alertDlgButtons: [{ click: this.alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true } }],
                selectionSettings: { type: 'Multiple' }
            };
        },
  methods: {
            addEditHandler(args)  {
                const val = this.$refs.overviewgrid.getSelectedRows()
                const value = this.$refs.overviewgrid.getSelectedRecords()
                if(args.item.id==="add")  {
                    this.$router.push(`email/add`)
                }
                if(val.length == 1 && args.item.id === 'edit') {
                    console.log(this.$refs.overviewgrid.getSelectedRows());
                    this.$router.push(`email/edit/`+`${value[0]._id}`);
                }
                if(val.length == 0 && args.item.id==="edit")  {
                    alert()
                }
                if(val.length >1 && args.item.id==="edit") {
                    alert()
                }
            },
            actionComplete: function(args) {
                console.log("ASdas")
                if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
                    if (Browser.isDevice) {
                        args.dialog.height = window.innerHeight - 90 + 'px';
                        args.dialog.dataBind();
                    }
                }
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
            },
            alertDlgBtnClick() {
                    this.$refs.alertDialog.hide();
                },
                actionBegin: function (args) {
                if (args.requestType === 'save') {
                    let datasend = {
                        permissions : []
                    }
                    datasend.permissions = this.datasrc
                    axios.put(`${apiUrl}`+`/usertype/permission/update/one/${this.key}`,datasend,{withCredentials:true}).then((response) => {
                        console.log(response)
                })
                    if (this.$refs.overviewgrid.ej2Instances.pageSettings.currentPage !== 1 && this.$refs.grid.ej2Instances.editSettings.newRowPosition === 'Top') {
                        args.index = (this.$refs.overviewgrid.ej2Instances.pageSettings.currentPage * this.$refs.grid.ej2Instances.pageSettings.pageSize) - this.$refs.grid.ej2Instances.pageSettings.pageSize;
                    } else if (this.$refs.overviewgrid.ej2Instances.editSettings.newRowPosition === 'Bottom') {
                        args.index = (this.$refs.overviewgrid.ej2Instances.pageSettings.currentPage * this.$refs.grid.ej2Instances.pageSettings.pageSize) - 1;
                    }
                }
            }
            
        },
        async mounted () { 
                this.link = window.location.href;
                this.key = this.link.split('per/').pop()
                console.log(this.key)
                axios.get(`${apiUrl}`+`/usertype/permission/view/one/${this.key}`,{withCredentials:true}).then((response) => {
                    this.datasrc = response.data.permissions;
                console.log(this.datasrc)
                })
            
        },
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
</style>
