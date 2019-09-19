<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
     <div class="col-lg-15 control-section">
        <div class="content-wrapper">
            <div v-if="loading" id="loader">
          <div class="sk-fading-circle">
              <div class="sk-circle1 sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
        </div>
             <div class="control-section">
            <ejs-grid ref='overviewgrid' :allowReordering='true' :rowHeight='rowHeight' :allowResizing='true'  :showColumnChooser='true'  id='overviewgrid'  :allowPaging='true' :pageSettings='pageSettings' :dataSource="datasrc"  :allowFiltering='true' :filterSettings='filterOptions' :allowSelection='true' :allowSorting='true' :dataBound="dataBound"
                :height="height" :enableHover='false' :toolbar="toolbar" :toolbarClick="clickHandler">
                <e-columns>
                    <e-column type='checkbox' :allowFiltering='false' :allowSorting='false'  ></e-column>
                    <e-column field='context'  headerText='Context' :filter='filter' :isPrimaryKey='true'></e-column>
                    <e-column field='plugin' headerText='Plugin'  :filter='filter' ></e-column>
                    <e-column field='to' headerText='Recipient' :filter='filter'  ></e-column>
                    <e-column field='from' headerText='Sender' :filter='filter'></e-column>
                    <e-column field='status' headerText='Status' :template="statusTemplate" :filter='filter'></e-column>
                    <e-column field='created_date' headerText='Created Date'  :filter='filter' ></e-column>
                    <e-column field='sent_date' headerText='Sent Date'  :filter='filter' ></e-column>
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
import Vue from 'vue'
import { Browser } from '@syncfusion/ej2-base';
import { ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import VueNotifications from 'vue-notifications'
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import miniToastr from 'mini-toastr' 
import {
  PivotViewPlugin,
  GroupingBar,
  FieldList
} from "@syncfusion/ej2-vue-pivotview";
import { ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
    import { DropDownList, DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
    
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

export default {
    name: 'CommunicationLog',
    components: {
      GridPlugin, Filter, Selection, Sort, VirtualScroll,
        Toolbar, Page,ColumnChooser,Resize,ColumnMenu,DatePickerPlugin,
        NumericTextBoxPlugin,
        PivotViewPlugin,
  GroupingBar,
  FieldList
    },
     provide: {
            grid: [FieldList,Reorder,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser]
        },
    data: function () {
      return {
        loading:false,
           newRowPositionDataSource: [{ value: 'Top', text: 'Top' }, { value: 'Bottom', text: 'Bottom' }],
            fields: { text: 'text', value: 'value' },
            dropdownValue: 'Top',
            datasrc: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true},
            editparams: { params: { popupHeight: '300px' }},
           rowHeight: 40,
           height : window.innerHeight*0.695,
          toolbar: [
          "Search",'ColumnChooser',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
          pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4 },
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
                            template: `<div id="status" :class="{'statustemp': true, 'e-activecolor': data.status == 'Success', 'e-inactivecolor': data.status == pending}">\
             <span :class="{'statustxt': true, 'e-activecolor': data.status == success, 'e-inactivecolor': data.status == pending}">{{data.status}}</span></div>`,
                            data: function () { return { data: {}, success: 'Success', pending: 'Pending' }; }
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
                selectionSettings: { persistSelection: true, type: 'Multiple' }
            };
        },
  methods: {
    dataBound() {
        this.loading =false
    },
            actionComplete: function(args) {
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
            
        },
        async mounted () { 
                axios.get(`${apiUrl}`+`comms/logs/find`,{withCredentials:true}).then((response) => {
                    this.loading =true
                    console.log(response.data)
                    this.datasrc = response.data;
                }).catch((err)=> {
                    if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
            
        },
        computed: {
            
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
</style>
<style src="spinkit/scss/spinkit.scss" lang="scss" />

<style scoped>
#loader{
    height: 0;
    position: absolute;
    left: 15%;
    top: -9%;
}
      .sk-fading-circle {
    margin: 20px auto;
    width: 20px;
    height: 20px;
    position: relative;
    z-index:1001;
}
  .sk-three-bounce {
    height: 20px;
  }
</style>