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
            <ejs-grid ref='overviewgrid' :rowHeight='rowHeight' :allowReordering='true' :allowResizing='true'  id='overviewgrid' :enableVirtualization="true" :allowPdfExport="true" :allowExcelExport="true" :dataSource="vendortransactions"  :allowFiltering='true' :filterSettings='filterOptions' :toolbar="toolbar" :allowSelection='true' :allowSorting='true' :toolbarClick="clickHandler"
                :height="height" :enableHover='false'>
                <e-columns>
                    <e-column field='amount' headerText='Amount' :filter='filter' ></e-column>
                    <e-column field='category' headerText='Category' :filter='filter'></e-column>
                    <e-column field='po_raised' headerText='Purchase Order'  :filter='filter'></e-column>     
                    <e-column field='createdAt' headerText='Date' :template="dateTemplate"  :filter='filter'></e-column>
                    <e-column field='status' headerText='Status' :template="statusTemplate"  :filter='filter'></e-column>
                </e-columns>
                </ejs-grid>
              </div>
</template>
<script>
  import apiUrl from '@/apiUrl'
  import axios from 'axios'
  import moment from 'moment'
  import Vue from 'vue'
  import {PdfExport,ExcelExport, Edit, ColumnMenu, Toolbar, Resize, ColumnChooser, Page, GridPlugin, VirtualScroll, Sort, Filter, Selection, GridComponent,Reorder } from "@syncfusion/ej2-vue-grids";
  Vue.use(GridPlugin);
  var api = axios.create({
  withCredentials :true
})
  export default {
    name:"Test",
    props:['vendor_id'],
    components :{
      GridPlugin,
    },
    provide: {
            grid: [PdfExport,ExcelExport,Edit,ColumnMenu,Resize, Filter, Selection, Sort, VirtualScroll,Toolbar, Page,ColumnChooser,Reorder]
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
      totalunpaid:0,
      totalpo:0,
        toolbar: ['Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
      }
    },
    mounted() {
      console.log(this.vendor_id)
      if(this.vendor_id) {
      api.get(`${apiUrl}vendor/vendor/get/${this.vendor_id}`).then((res) => {
        this.vendor = res.data
        api.get(`${apiUrl}transaction/trans/vendordetail/${this.vendor_id}`).then((res) => {
          this.vendortransactions = res.data
          this.paidtransactions = []
          this.unpaidtransactions = []
          this.totalapproved = 0 
          for(var i=0;i<this.vendortransactions.length;i++) {
            this.totalapproved = this.vendortransactions[i].amount
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
          this.totalpo = this.paidtransactions.length
          console.log(this.unpaidtransactions,this.paidtransactions,this.totalpaid,this.totalunpaid)
        })
      })
    }
    },
    methods:{
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