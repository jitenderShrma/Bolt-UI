<template>
  <div class="animated slideInLeft" style="animation-duration:100ms">
  <b-row class="py-2 px-2">
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalapproved}}</h4>
                    <p v-text="$ml.get('totalapproved')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalpaid}}</h4>
                    <p v-text="$ml.get('totalpaid')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalunpaid}}</h4>
                    <p v-text="$ml.get('totalbalance')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
              <b-col>
                <b-card no-body class="bg-primary">
                  <b-card-body class="pb-0">
                    <h4 class="mb-0">{{totalpo}}</h4>
                    <p v-text="$ml.get('totalnopo')"></p>
                  </b-card-body>
                  <!-- <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/> -->
                </b-card>
              </b-col>
            </b-row>
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowReordering='true' :allowResizing='true'  id='overviewgrid' :recordDoubleClick="beginEdit" :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="vendortransactions"  :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='amount' headerText='Amount' width="auto" :filter='filter' ></e-column>
                    <e-column field='category' headerText='Category' width="auto" :filter='filter'></e-column>
                    <e-column field='po_raised' :template="buttonLM" headerText='Purchase Order' width="auto"  :filter='filter'></e-column>     
                    <e-column field='createdAt' headerText='Date' width="auto" :template="dateTemplate"  :filter='filter'></e-column>
                    <e-column field='status' headerText='Status' width="auto" :template="statusTemplate"  :filter='filter'></e-column>
                </e-columns>
                </ejs-grid>
                <b-modal size="sm" :title="$ml.get('uploadpo')" class="modal-primary" v-model="uploadModal" @ok="uploadModal = false">
            </b-modal>
              </div>
              
</template>
<script>
  import apiUrl from '@/apiUrl'
  import axios from 'axios'
  import moment from 'moment'
  import Vue from 'vue'
  import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
  import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '../../shared/classes'
  import toggleClasses from '../../shared/toggle-classes'
  import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
  import AsideToggler from '../../shared/AsideToggler'
  import { Switch as cSwitch } from '@coreui/vue'
  import DefaultToggler from '../../shared/AsideTogglerClose'
  Vue.use(GridPlugin);
  var api = axios.create({
  withCredentials :true
})
  export default {
    name:"vendorDetail",
    components :{
      GridPlugin, AsideToggler, AppHeader, DefaultToggler, AppSidebar, AppAside, TheFooter, Breadcrumb, SidebarForm, SidebarFooter, SidebarToggler, SidebarHeader, SidebarNav, cSwitch, SidebarMinimizer
    },
    provide: {
            grid: [PdfExport,ExcelExport,Edit,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder,]
        },
    data: function() {
      return {
        dateTemplate: function () {
          return {
            template : Vue.component('dateTemplate', {
              template : `<div>{{data.createdAt | moment("MMM Do YY, h:mm a") }}</div>`,
              data:function () {
                return {
                  data:{}
                }
              }
            })
          }
        },
        statusTemplate: function () {
              return {
                  template: Vue.component('statusTemplate', {
                      template: `<b-badge id="label" :variant="data.status">{{data.status}}</b-badge>`,
                      data: function() {
                        return {
                          data:{}
                        }
                      }
                    })
                }
              },
                    
        filterOptions: {
                    type: 'Menu'
                },
                vendortransactions:[],
                vendor:{},
                data:[],
                filter: {
                    type: 'CheckBox'
                },
                rowHeight:30,
           height : window.innerHeight - 270,
                totalapproved:0,
      totalpaid:0,
      pos:[],
      uploadModal:false,
      totalunpaid:0,
      totalpo:0,
        toolbar: [
        'CsvExport',
        'Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],

            buttonLM: function () {
              return {
                  template: Vue.component('buttonLM', {
                      template: `<div v-if="data.po_raised">{{data.po_raised}}</div>`,
                      components:{
                        AsideToggler,
                        AppHeader,
                        AppSidebar,
                        AppAside,
                        TheFooter,
                        Breadcrumb,
                        SidebarForm,
                        SidebarFooter,
                        SidebarToggler,
                        SidebarHeader,
                        SidebarNav,
                        SidebarMinimizer
                      },
                  data: function() {
                          return {
                              data: {},
                          }
                      },
                  methods: {
                    gotoPage() {
                      console.log("aside on")
                    }
                  }
                })
              }
          },
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      if(this.$route.params.id) {
      api.get(`${apiUrl}vendor/vendor/get/${this.$route.params.id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}transaction/trans/vendordetail/${this.$route.params.id}`).then((res) => {
          this.vendortransactions = res.data
          this.paidtransactions = []
          this.unpaidtransactions = []
          this.totalapproved = 0 
          this.pos=[]
          for(var i=0;i<this.vendortransactions.length;i++) {
            this.totalapproved = this.totalapproved + parseInt(this.vendortransactions[i].amount)
            if(this.vendortransactions[i].po_raised) {
              if(this.checkExist(this.vendortransactions[i].po_raised,i)) {
               this.pos.push(this.vendortransactions[i].po_raised)
              }
            }
            if(this.vendortransactions[i].status == "PAID") {
              this.paidtransactions.push(this.vendortransactions[i])
            }
            else {
              this.vendortransactions[i].status = "UNPAID"
              this.unpaidtransactions.push(this.vendortransactions[i])
            }
          }
          this.totalpaid = 0
          for(var j=0;j<this.paidtransactions.length;j++) {
            this.totalpaid = this.totalpaid + parseInt(this.paidtransactions[j].amount)
          }
          this.totalunpaid = 0
          for(var k=0;k<this.unpaidtransactions.length;k++) {
            this.totalunpaid = this.totalunpaid + parseInt(this.unpaidtransactions[k].amount)
          }
          this.totalpo = this.pos.length
          this.totalpaid = this.convertAmount(this.totalpaid)
          this.totalunpaid = this.convertAmount(this.totalunpaid)
          this.totalapproved = this.convertAmount(this.totalapproved)
          console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
        })
      })
    }
    },
    methods:{
      beginEdit(args){
        this.uploadModal = true
      },
      convertAmount(amount) {
        var x=amount;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res
      },
      checkExist(args,lim) {
        for(var i=0;i<lim;i++) {
          if(args == this.vendortransactions[i].po_raised) {
            return false;
          }
        }
        return true
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
    }
  };
</script>
<style>
#label {
  font-weight:lighter;
    font-size: 12px;
}
.badge-PAID {
  background: lightgreen;
}
.badge-UNPAID {
  background: yellow;
}
</style>