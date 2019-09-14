<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
    <div id="Dashboard">
      <b-row v-if="isPermitted">
        <b-col sm="6" style="padding-right:3px; padding-left:0px">
          <b-card no-body style="height:80vh">
            <b-card-body>
                  <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                    <template slot="button-content">
                      <i class="icon-settings" style="color:black"></i>
                    </template>
                    <b-dropdown-item @click="toggle1">Budget By Heads</b-dropdown-item>
                    <b-dropdown-item @click="toggle1">Budget by Departments</b-dropdown-item>
                  </b-dropdown>
              <div v-if="option1 == 'Budget By Heads'">
                <highcharts class="chart3" :options="chartOptions3Bar" :updateArgs="updateArgs"></highcharts>
              </div>
              <div v-else @click="openModal">
                <highcharts class="chart"  :options="chartOptionsStacked" :updateArgs="updateArgs"></highcharts>
                <div>
                  <!-- <b-row>
                  <b-col v-for="(run,i) in dept" :key="i">
                    <span @click="openModal(`${dept[i]._id}`)">{{dept[i].department_name}}</span>
                  </b-col>
                </b-row> -->
                <!-- <hr> -->
                <b-row class="justify-content-center">
                    TOTAL : {{summary_total()}}
                </b-row>
                <b-row class="justify-content-center">
                    COMMITTED : {{summary_committed()}}
                </b-row>
                <b-row class="justify-content-center">
                    REMAINING : {{summary_remaining()}}
                </b-row>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="6" style="padding-right:3px; padding-left:0px">
          <b-card no-body style="height:80vh">
            <b-card-body @click="openPie">
                  <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                    <template slot="button-content">
                      <i class="icon-settings" style="color:black"></i>
                    </template>
                    <b-dropdown-item @click="toggle">Total Budget</b-dropdown-item>
                    <b-dropdown-item @click="toggle">Committed Budget</b-dropdown-item>
                    <b-dropdown-item @click="toggle">Remaining Budget</b-dropdown-item>
                  </b-dropdown>
                <highcharts class="chart" :options="chartOptions1" :updateArgs="updateArgs"></highcharts>
              <b-card-footer footer-bg-variant="transparent" footer-border-variant="none" style="padding:0px;border-top:0px">
                <b-row class="justify-content-center">
                <b-button-group>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths" autofocus>Yearly</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jan</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Feb</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Mar</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Apr</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">May</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jun</b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jul</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Aug</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Sept</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Oct</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Nov</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Dec</b-button>
                      </b-button-group>
                      </b-row>
              </b-card-footer>
            </b-card-body>
          </b-card>
        </b-col>
    </b-row>
    </div>
    <b-modal size="xl" class="modal-primary" v-model="chartModal" @ok="exitModal" hide-footer>
      <template slot="modal-title">
        
      </template>
      <b-dropdown class="float-right" variant="transparent p-0" right no-caret>

        <template slot="button-content">
          <i class="icon-settings" style="color:black"></i>
        </template>
        <b-dropdown-item @click="toggle3">Budget By Heads</b-dropdown-item>
        <b-dropdown-item @click="toggle3">Budget by Departments</b-dropdown-item>
      </b-dropdown>
      <div v-if="option3=='Budget By Heads'">
        <highcharts class="chart4" :options="chartOptions3childBar" :updateArgs="updateArgs"></highcharts>
      </div>
      <div v-else>
        <b-button v-if="departmentLog.length>1" @click="goBack" class="bg-transparent" style="float:left;border:0"><i class="icon-arrow-left-circle font-2xl"></i></b-button>
        <div @click="changeModal">
        <highcharts class="chart2"  :options="chartOptionsStackedchild" :updateArgs="updateArgs"></highcharts>
      
                <div>
                  <!-- <b-row>
                  <b-col v-for="(run,i) in child_dept" :key="i">
                    <span @click="openModal(`${child_dept[i]._id}`)">{{child_dept[i].department_name}}</span>
                  </b-col>
                </b-row>
                <hr> -->
                <b-row class="justify-content-center">
                    TOTAL : {{summary_total_child()}}
                </b-row>
                <b-row class="justify-content-center">
                    COMMITTED : {{summary_committed_child()}}
                </b-row>
                <b-row class="justify-content-center">
                    REMAINING : {{summary_remaining_child()}}
                </b-row>
                </div> 
              </div>
              </div>
    </b-modal>
    <b-modal size="xl" class="modal-primary" v-model="pieModal" @ok="pieModal = false" hide-footer>
      <b-card no-body>
        <template slot="modal-title">
        
      </template>
            <b-card-body>
                  <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                    <template slot="button-content">
                      <i class="icon-settings" style="color:black"></i>
                    </template>
                    <b-dropdown-item @click="toggle">Total Budget</b-dropdown-item>
                    <b-dropdown-item @click="toggle">Committed Budget</b-dropdown-item>
                    <b-dropdown-item @click="toggle">Remaining Budget</b-dropdown-item>
                  </b-dropdown>
                <highcharts class="chart2" :options="chartOptions1" :updateArgs="updateArgs"></highcharts>
              <b-card-footer footer-bg-variant="transparent" footer-border-variant="none" style="padding:0px;border-top:0px">
                <b-row class="justify-content-center">
                <b-button-group>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths" autofocus>Yearly</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jan</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Feb</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Mar</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Apr</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">May</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jun</b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Jul</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Aug</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Sept</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Oct</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Nov</b-button>
                        <b-button id="legend" size="sm" variant="transparent" @click="toggleMonths">Dec</b-button>
                      </b-button-group>
                      </b-row>
              </b-card-footer>
            </b-card-body>
          </b-card>
    </b-modal>
  </div>
  
</template>

<script>
import Vue from 'vue'
import {Chart} from 'highcharts-vue'
import axios from 'axios'
import apiUrl from '@/apiUrl' 
import VueNotifications from 'vue-notifications'
  import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

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

  Vue.use(VueNotifications, options)
  var api = axios.create({
    withCredentials:true
  })

export default {
  name: 'Dashboard',
  components: {
    highcharts:Chart
  },
  data: function() {
    return {
      child_dept:[],
      departmentLog:[],
      chartModal:false,
      summary_remaining: function() {
        return this.chartOptionsStacked.series[2].data.reduce((a,b) => a+b,0)
      },
      summary_committed: function() {
        return this.chartOptionsStacked.series[1].data.reduce((a,b) => a+b,0)
      },
      summary_total: function() {
        if(this.chartOptionsStacked.series[0].data.length > 0) {
          return this.chartOptionsStacked.series[0].data.reduce((a,b) => a+b,0)
        }
        else {
          return this.chartOptionsStacked.series[0].data[0]
        }
      },
      summary_remaining_child: function() {
        if(this.chartOptionsStackedchild.series[2].data.length > 0) {
          return this.chartOptionsStackedchild.series[2].data.reduce((a,b) => a+b,0)
        }
        else {
          return this.chartOptionsStackedchild.series[2].data[0]
        }
      },
      summary_committed_child: function() {
        if(this.chartOptionsStackedchild.series[1].data.length > 0) {
          return this.chartOptionsStackedchild.series[1].data.reduce((a,b) => a+b,0)
        }
        else {
          return this.chartOptionsStackedchild.series[1].data[0]
        }
      },
      summary_total_child: function() {
        if(this.chartOptionsStackedchild.series[0].data.length > 0) {
          return this.chartOptionsStackedchild.series[0].data.reduce((a,b) => a+b,0)
        }
        else {
          return this.chartOptionsStackedchild.series[0].data[0]
        }
      },
      budgetdata : [],
      isPermitted:false,
      selectMonth : "Yearly",
      dept:[],
      option:"Total Budget",
      option1:"Budget By Departments",
      option3:"Budget By Departments",
      updateArgs: [true, true, {duration: 1000}],
      chartOptions1: {
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
        chart: {
          type: 'pie',
        },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              center: ['50%', '50%'],
              dataLabels:{
                enabled:false,
              }
          }
      },
        title: {
          text: ``
        },
        series: [
          {
            name: '',
            data: []
        },
    ]
    },
    chartOptionsStacked: {
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>',
            shared: true
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Department Budget'
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage'
            }
        },
        series: [{data:[]},{data:[]},{data:[]}]
    },
    tree_dept:[],
    chartOptionsStackedchild: {
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>',
            shared: true
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Department Budget'
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage'
            }
        },
        series: [{data:[]},{data:[]},{data:[]}]
    },
    chartOptions1Bar: {
        chart: {
          type: 'column',
        },
        xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    title:{
      text:'Total Budget'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ( in Rupees )'
        },
    },
    series: []
    },
    pieModal :false,
    chartOptions2Bar: {
        chart: {
          type: 'column',
        },
        xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    title:{
      text:'Approved Budget'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ( in Rupees )'
        },
    },
    series: []
    },
    child_flag:false,
    child_tree_dept:[],
    chartOptions3Bar: {
        chart: {
          type: 'column',
          width:15000
        },
        xAxis: {
        categories: [],
        crosshair: true
    },
    isPermittedDEpt:false,
    title:{
      text:'Yearly Budget (Heads)'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ( in Rupees )'
        },
    },
    plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
    series: []
    },
    chartOptions3childBar: {
        chart: {
          type: 'column',
          width:10000
        },
        xAxis: {
        categories: [],
        crosshair: true
    },
    isPermittedDEpt:false,
    title:{
      text:'Yearly Budget (Heads)'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ( in Rupees )'
        },
    },
    plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
    series: []
    }
    }
  },
  watch:{
    'chartModal' : function() {
      if(this.chartModal) {
        this.child_flag = true
      }
      else{
        this.exitModal()
        this.child_flag=false
      }
    },
    'pieModal' : function() {
      if(!this.pieModal) {
        this.chartOptions1.plotOptions.pie.dataLabels.enabled = false
      }
    },
    'option' : function(){
      if(this.option =="Total Budget") {
        this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.percentage:.1f}%) </b>'
        this.chartOptions1.series[0].name = "Total Budget"
        this.chartOptions1.title.text = "Year's Budget - Total"
        this.chartOptions1.series[0].data = this.getTotalData(this.budgetdata)
      }
      if(this.option == "Committed Budget") {
        this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.more:.1f}%) </b>'
        this.chartOptions1.series[0].name = "Committed Budget"
        this.chartOptions1.title.text = "Year's Budget - Committed"
        this.chartOptions1.series[0].data = this.getApprovedData(this.budgetdata)
      }
      if(this.option == "Remaining Budget") {
        this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.more:.1f}%) </b>'
        this.chartOptions1.series[0].name = "Remaining Budget"
        this.chartOptions1.title.text = "Year's Budget - Remaining"
        this.chartOptions1.series[0].data = this.getLeftData(this.budgetdata)
      }
    },
    'selectMonth' : function() {
      if(this.selectMonth == "Yearly") {
        
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = "Year's Budget - Total"
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalData(this.budgetdata)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = "Year's Budget - Committed"
          this.chartOptions1.series[0].name = "Committed Budget"

          this.chartOptions1.series[0].data = this.getApprovedData(this.budgetdata)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = "Year's Budget - Remaining"
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftData(this.budgetdata)
        }
      }
      if(this.selectMonth == "Jan") {
        
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,0)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,0)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,0)
        }
      }
      if(this.selectMonth == "Feb") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,1)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,1)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,1)
        }
      }
      if(this.selectMonth == "Mar") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,2)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,2)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,2)
        }
      }
      if(this.selectMonth == "Apr") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,3)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,3)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,3)
        }
      }
      if(this.selectMonth == "May") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,4)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,4)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,4)
        }
      }
      if(this.selectMonth == "Jun") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,5)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,5)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,5)
        }
      }
      if(this.selectMonth == "Jul") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,6)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,6)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,6)
        }
      }
      if(this.selectMonth == "Aug") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,7)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,7)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,7)
        }
      }
      if(this.selectMonth == "Sept") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,8)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,8)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,8)
        }
      }
      if(this.selectMonth == "Oct") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,9)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,9)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,9)
        }
      }
      if(this.selectMonth == "Nov") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,10)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,10)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,10)
        }
      }
      if(this.selectMonth == "Dec") {
        if(this.option == "Total Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Total`
          this.chartOptions1.series[0].name = "Total Budget"
          this.chartOptions1.series[0].data = this.getTotalDataMonth(this.budgetdata,11)
        }
        if(this.option == "Committed Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Committed`
          this.chartOptions1.series[0].name = "Committed Budget"
          this.chartOptions1.series[0].data = this.getApprovedDataMonth(this.budgetdata,11)
        }
        if(this.option == "Remaining Budget") {
          this.chartOptions1.title.text = `${this.selectMonth}'s Budget - Remaining`
          this.chartOptions1.series[0].name = "Remaining Budget"
          this.chartOptions1.series[0].data = this.getLeftDataMonth(this.budgetdata,11)
        }
      }
    }
  },
  mounted() {
    var Session = JSON.parse(localStorage.session_key)
    console.log(Session)
    if(Session.user) {
    for(var i=0;i<Session.permission.length;i++) {
      if(Session.permission[i].text=="Head" && (Session.additional_permissions[i].read_all || Session.additional_permissions[i].read_own)) {
        this.isPermitted = true
      }
      if(Session.permission[i].text=="Department" && (Session.additional_permissions[i].read_all || Session.additional_permissions[i].read_own)) {
        this.isPermittedDept = true
      }
    }
    if(this.isPermitted) {
      api.get(`${apiUrl}dropdown/head/find/${Session.user.user_type.department}`).then((response) => {
        this.budgetdata = JSON.parse(JSON.stringify(response.data))
        // this.chartOptions1.series[0].data = this.getLeftDataMonth(response.data)
        this.chartOptions1.title.text = "Year's Budget - Total"
        this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.percentage:.1f}%) </b>'
        this.chartOptions1.series[0].name = "Total Budget"
        this.chartOptions1.series[0].data = this.getTotalData(response.data)
        this.chartOptions1Bar.series = this.getMonthlyBar1(response.data);
        this.chartOptions2Bar.series = this.getMonthlyBar2(response.data);
        this.chartOptions3Bar.xAxis.categories = this.getYearlyBar1(response.data);
        this.chartOptions3Bar.series = this.getYearlyBar2(response.data);       // this.chartOptions.series[2].data = this.getTransactionData(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    }
    if(this.isPermittedDept) {
    api.get(`${apiUrl}department/dept/get`).then((res) => {
      this.dept = JSON.parse(JSON.stringify(res.data))
      console.log(this.dept)
      this.tree_dept = this.list_to_tree_dept(res.data)
      this.chartOptionsStacked.xAxis.categories = this.getDeptList(this.tree_dept)
      this.chartOptionsStacked.series = [{name:"Total",data:this.tree_dept.total_data},{name:"Committed",data:this.tree_dept.committed_data},{name:"Remaining",data:this.tree_dept.remaining_data}]
    }).catch((err)=> {
      if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    }
  }else{
    this.isPermitted = true
    api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
      this.budgetdata = JSON.parse(JSON.stringify(response.data))
      // this.chartOptions1.series[0].data = this.getLeftDataMonth(response.data)
      this.chartOptions1.title.text = "Year's Budget - Total"
      this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.percentage:.1f}%) </b>'
      this.chartOptions1.series[0].name = "Total Budget"
      this.chartOptions1.series[0].data = this.getTotalData(response.data)
        this.chartOptions1Bar.series = this.getMonthlyBar1(response.data);
        this.chartOptions2Bar.series = this.getMonthlyBar2(response.data);
        this.chartOptions3Bar.xAxis.categories = this.getYearlyBar1(response.data);
        this.chartOptions3Bar.series = this.getYearlyBar2(response.data);       // this.chartOptions.series[2].data = this.getTransactionData(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
    api.get(`${apiUrl}department/dept/get`).then((res) => {
      this.dept = JSON.parse(JSON.stringify(res.data))
      this.tree_dept = this.list_to_tree_dept(res.data)
      this.chartOptionsStacked.xAxis.categories = this.getDeptList(this.tree_dept)
      this.chartOptionsStacked.series = [{name:"Total",data:this.tree_dept.total_data},{name:"Committed",data:this.tree_dept.committed_data},{name:"Remaining",data:this.tree_dept.remaining_data}]
    }).catch((err)=> {
      if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
  }
    // api.get(`${apiUrl}`+`head/head/get`)
   //  .then((response) => {
   //   this.budgetdata = JSON.parse(JSON.stringify(response.data))
   //   // this.chartOptions1.series[0].data = this.getLeftDataMonth(response.data)
   //   this.chartOptions1.title.text = "Year's Budget - Total"
   //   this.chartOptions1.tooltip.pointFormat = '{series.name}: <b>{point.y} ({point.percentage:.1f}%) </b>'
   //   this.chartOptions1.series[0].name = "Total Budget"
   //   this.chartOptions1.series[0].data = this.getTotalData(response.data)
   //     this.chartOptions1Bar.series = this.getMonthlyBar1(response.data);
   //     this.chartOptions2Bar.series = this.getMonthlyBar2(response.data);
   //     this.chartOptions3Bar.xAxis.categories = this.getYearlyBar1(response.data);
   //     this.chartOptions3Bar.series = this.getYearlyBar2(response.data);       // this.chartOptions.series[2].data = this.getTransactionData(response.data)
   //    });
  },
  methods: {
    child_list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.child_checkExist(node.parent_department)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_department]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.getHeadBudget(roots)
          return roots
      },
      child_checkExist(node) {
            for (var i=0; i < this.child_dept.length; i++) {
              if (this.child_dept[i]._id == node)
                  return true;
          }
        
        return false;
      },
    list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.checkExist(node.parent_department)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  console.log(node)
                  list[map[node.parent_department]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.getHeadBudget(roots)
          return roots
      },
      getHeadBudget(roots) {
        roots.total_data = []
        roots.committed_data = []
        roots.remaining_data = []
        for(var i=0;i<roots.length;i++) {
            api.get(`${apiUrl}dropdown/head/only/${roots[i]._id}`).then((res) => {
              console.log(res.data)
            var total = 0
            var committed = 0
            var remaining = 0
            for(var j=0;j<res.data.length;j++) {
              total = total + res.data[j].permissible_values.reduce((a,b) => a+b,0)
              committed = committed + res.data[j].permissible_values.reduce((a,b) => a+b,0) - res.data[j].amount_left.reduce((a,b) => a+b,0)
              remaining = remaining + res.data[j].amount_left.reduce((a,b) => a+b,0)
            }
            roots.total_data.push(total)
            roots.committed_data.push(committed)
            roots.remaining_data.push(remaining)
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        }
        return roots
      },
      checkExist(node) {
            for (var i=0; i < this.dept.length; i++) {
              if (this.dept[i]._id == node)
                  return true;
          }
        return false;
      },
    openPie(args) {
      if(args.chartX) {
        this.chartOptions1.plotOptions.pie.dataLabels.enabled = true
        this.pieModal = true
      }
    },
    openModal(args) {
      if(args.point.category) {
        var val = args.point.category.split('<span style="display:none">').pop()
        var id = val.split('</span>')
        api.get(`${apiUrl}department/dept/child/${id[0]}`).then((res) => {
          if(res.data.length > 0) {
            this.departmentLog.push(`${id[0]}`)
            this.chartModal = true
            this.child_dept = JSON.parse(JSON.stringify(res.data))
            this.child_tree_dept = this.child_list_to_tree_dept(res.data)
            this.chartOptionsStackedchild.xAxis.categories = this.getDeptList(res.data)
            this.chartOptionsStackedchild.series = [{name:"Total",data:this.child_tree_dept.total_data},{name:"Committed",data:this.child_tree_dept.committed_data},{name:"Remaining",data:this.child_tree_dept.remaining_data}]
            api.get(`${apiUrl}dropdown/head/only/${id[0]}`).then((response) => {
              this.chartOptions3childBar.xAxis.categories = this.getYearlyBar1(response.data);
              this.chartOptions3childBar.series = this.getYearlyBar2(response.data);
            })
          }
          else {
            this.option1="Budget By Heads"
            toast({
              type: VueNotifications.types.info,
              title: 'No Sub-Departments',
              message:'Switching to Budget By Heads'
            })
          }
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      }
      // api.get(`${apiUrl}department/dept/child/${args}`).then((res) => {
      //   if(res.data.length > 0) {
      //     this.child_dept = JSON.parse(JSON.stringify(res.data))
      //     this.chartOptionsStackedchild.xAxis.categories = this.getDeptList(res.data)
      //     this.chartOptionsStackedchild.series = this.getDeptHeadData(res.data)
      //     this.chartModal=true
      //   }
      //   else {
      //     toast({
      //       type: VueNotifications.types.info,
      //       title: 'No Sub-Departments'
      //     })
      //   }
      // })
    }, 
    changeModal(args) {
      if(args.point) {
        if(args.point.category) {
        var val = args.point.category.split('<span style="display:none">').pop()
        var id = val.split('</span>')
        api.get(`${apiUrl}department/dept/child/${id[0]}`).then((res) => {
          if(res.data.length > 0) {
            this.departmentLog.push(`${id[0]}`)
            console.log(this.departmentLog)
            this.child_dept = JSON.parse(JSON.stringify(res.data))
            this.child_tree_dept = this.child_list_to_tree_dept(res.data)
            this.chartOptionsStackedchild.xAxis.categories = this.getDeptList(res.data)
            this.chartOptionsStackedchild.series = [{name:"Total",data:this.child_tree_dept.total_data},{name:"Committed",data:this.child_tree_dept.committed_data},{name:"Remaining",data:this.child_tree_dept.remaining_data}]
            api.get(`${apiUrl}dropdown/head/only/${id[0]}`).then((response) => {
              this.chartOptions3childBar.xAxis.categories = this.getYearlyBar1(response.data);
              this.chartOptions3childBar.series = this.getYearlyBar2(response.data);
            })
          }
          else {
            this.option3="Budget By Heads"
            toast({
              type: VueNotifications.types.info,
              title: 'No Sub-Departments',
              message:'Switching to Budget By Heads'
            })
          }
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      }
    }
    else{
      this.option3="Budget By Heads"
      toast({
              type: VueNotifications.types.info,
              title: 'No Sub-Departments',
              message:'Switching to Budget By Heads'
      })
    }     
    }, 
    exitModal() {
      this.chartModal = false
      this.departmentLog = []
      this.option3 = "Budget by Departments"
      console.log("ADD")
    },
    getDeptList(nodes) {
      var data = []
      for(var i=0;i<nodes.length;i++) {
        data.push(`<span>${nodes[i].department_name}</span><span style="display:none">${nodes[i]._id}</span>`);
      }
      return data
    },
    getDeptHeadData(nodes) {
      var data = []
      var total_data = []
      var committed_data = []
      var remaining_data = []
      for(var i=0;i<nodes.length;i++) {
        api.get(`${apiUrl}dropdown/head/only/${nodes[i]._id}`).then((res) => {
          var total = 0
          var committed = 0
          var remaining = 0
          for(var j=0;j<res.data.length;j++) {
            total = total + res.data[j].permissible_values.reduce((a,b) => a+b,0)
            committed = committed + res.data[j].permissible_values.reduce((a,b) => a+b,0) - res.data[j].amount_left.reduce((a,b) => a+b,0)
            remaining = remaining + res.data[j].amount_left.reduce((a,b) => a+b,0)
          }
          total_data.push(total)
          committed_data.push(committed)
          remaining_data.push(remaining)
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      }
      data.push({
        name:"Total",
        data:total_data
      })
      data.push({
        name:"Committed",
        data:committed_data
      })
      data.push({
        name:"Remaining",
        data:remaining_data
      })
      return data
    },
    toggleMonths(args) {
      this.selectMonth = args.target.textContent
    },
    getMonth() {
    var month="";
    var d = new Date().getMonth()
    switch(d) {
      case 0: month = "January"
              break;
      case 1: month = "February"
              break;
      case 2: month = "March"
              break;
      case 3: month = "April"
              break;
      case 4: month = "May"
              break;
     case 5: month = "June"
              break;        
      case 6: month = "July"
              break;
      case 7: month = "August"
              break;
      case 8: month = "September"
              break;
      case 9: month = "October"
              break;        
      case 10: month = "November"
              break;        
      case 11: month = "December"
              break;
     }
     return month
    },
    switchMonth(d) {
      var month=""
      switch(d) {
      case 0: month = "January"
              break;
      case 1: month = "February"
              break;
      case 2: month = "March"
              break;
      case 3: month = "April"
              break;
      case 4: month = "May"
              break;
     case 5: month = "June"
              break;        
      case 6: month = "July"
              break;
      case 7: month = "August"
              break;
      case 8: month = "September"
              break;
      case 9: month = "October"
              break;        
      case 10: month = "November"
              break;        
      case 11: month = "December"
              break;
     }
     return month
    },
    getMonthlyBar1(new_data) {
      var data =[]
      for(var i=0;i<new_data.length;i++) {
        data[i] = {name:null,data:null}
      }
      for(var i=0;i<new_data.length;i++) {
        data[i].name = new_data[i].name
        data[i].data = new_data[i].permissible_values
      }
      return data
    },
    goBack() {
     var departmentLog = JSON.parse(JSON.stringify(this.departmentLog))
     departmentLog.pop()
     var previousdept = departmentLog.pop()
     console.log(previousdept)
     api.get(`${apiUrl}department/dept/child/${previousdept}`).then((res) => {
          if(res.data.length > 0) {
            this.departmentLog.pop()
            this.chartModal = true
            this.child_dept = JSON.parse(JSON.stringify(res.data))
            this.child_tree_dept = this.child_list_to_tree_dept(res.data)
            this.chartOptionsStackedchild.xAxis.categories = this.getDeptList(res.data)
            this.chartOptionsStackedchild.series = [{name:"Total",data:this.child_tree_dept.total_data},{name:"Committed",data:this.child_tree_dept.committed_data},{name:"Remaining",data:this.child_tree_dept.remaining_data}]
            api.get(`${apiUrl}dropdown/head/only/${previousdept}`).then((response) => {
              this.chartOptions3childBar.xAxis.categories = this.getYearlyBar1(response.data);
              this.chartOptions3childBar.series = this.getYearlyBar2(response.data);
            })
          }
          else {
            this.option3="Budget By Heads"
            toast({
              type: VueNotifications.types.info,
              title: 'No Sub-Departments',
              message:'Switching to Budget By Heads'
            })
          }
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    },
    getMonthlyBar2(new_data) {
      var data =[]
      for(var i=0;i<new_data.length;i++) {
        data[i] = {name:null,data:null}
      }
      for(var i=0;i<new_data.length;i++) {
        data[i].name = new_data[i].name
        data[i].data = new_data[i].amount_left
      }
      return data
    },
    getYearlyBar1(new_data) {
      var data =[]
      for(var i=0;i<new_data.length;i++) {
        data.push("")
        new_data[i].total = 0
      }
      for(var i=0;i<new_data.length;i++) {
        for(var j=0;j<12;j++) {
          new_data[i].total = new_data[i].total + new_data[i].permissible_values[j]
        }
      }
      new_data.sort(function(a, b){
        return a.total-b.total
    })
    new_data.reverse()
      for(var i=0;i<new_data.length;i++) {
          data[i] = new_data[i].name
        }
      return data
    },
    getYearlyBar2(new_data) {
      var data =[]
      var total = 0
      for(var i=0;i<4;i++) {
        data[i] = {name:null,data:[]}
      }
      for(var i=0;i<new_data.length;i++) {
        new_data[i].total = 0
      }
      for(var i=0;i<new_data.length;i++) {
        for(var j=0;j<12;j++) {
          new_data[i].total = new_data[i].total + new_data[i].permissible_values[j]
        }
      }
      new_data.sort(function(a, b){
        return a.total-b.total
    })
    new_data.reverse()
      for(var i=0;i<4;i++) {
        if(i ==0) {
          data[i].name = "Total"
          for(var j=0;j<new_data.length;j++) {
            total = 0
            for(var k=0;k<12;k++) {
              total = total + new_data[j].permissible_values[k]
            }
            data[i].data.push(total)
          }
        }
        if(i ==1) {
          data[i].name = "Committed"
          for(var j=0;j<new_data.length;j++) {
            total = 0
            for(var k=0;k<12;k++) {
              total = total + (new_data[j].permissible_values[k]-new_data[j].amount_left[k])
            }
            data[i].data.push(total)
          }
        }
        if(i ==2) {
          data[i].name = "Remaining"
          for(var j=0;j<new_data.length;j++) {
            total = 0
            for(var k=0;k<12;k++) {
              total = total + new_data[j].amount_left[k]
            }
            data[i].data.push(total)
          }
        }
        if(i ==3) {
          data[i].name = "Carry Over"
          for(var j=0;j<new_data.length;j++) {
            total = 0
            for(var k=0;k<12;k++) {
              total = total + new_data[j].carry_over_amount[k]
            }
            data[i].data.push(total)
          }
        }
      }
      return data
    },
    toggle(args) {
      this.option = args.target.text
      this.selectMonth = "Yearly"
    },
    toggle1(args) {
      this.option1 = args.target.text
      console.log(args.target.text)
    },
    toggle3(args) {
      this.option3 = args.target.text
      console.log(args.target.text)
    },
    getTotalData(new_data) {
    var data = []
    for(var i=0;i<new_data.length;i++) {
      data[i] = {name:new_data[i].name,y:0}
      for(var j=0;j<12;j++) {
        data[i].y = data[i].y + new_data[i].permissible_values[j]
      }
    }
    data[0].selected=true
    return data;
  },
  getApprovedData(new_data) {
    var data = []
    var total = []
    var i=0;
    for(i=0;i<new_data.length;i++) {
      total.push(0)
      data[i] = {name:new_data[i].name,y:0,more:0}
      for(var j=0;j<12;j++) {
        data[i].y = data[i].y + (new_data[i].permissible_values[j] - new_data[i].amount_left[j])
        total[i] = total[i] + new_data[i].permissible_values[j]
      }
      data[i].more = data[i].y/total[i]*100
  }
    return data;
  },
  getLeftData(new_data) {
    var data = []
    var total = []
    var i=0;
    for(i=0;i<new_data.length;i++) {
      total.push(0)
      data[i] = {name:new_data[i].name,y:0,more:0}
      for(var j=0;j<12;j++) {
        data[i].y = data[i].y + (new_data[i].amount_left[j])
        total[i] = total[i] + new_data[i].permissible_values[j]
      }
      data[i].more = data[i].y/total[i]*100
  }
  
    return data;
  },
  getLeftDataMonth(new_data,d) {
    var data = []
    var i=0;
    for(i=0;i<new_data.length;i++) {
      data[i]={name:new_data[i].name,y:new_data[i].amount_left[d],more:new_data[i].amount_left[d]/new_data[i].permissible_values[d]*100}
    }
    return data;
  },
  getTotalDataMonth(new_data,d) {
    var data = []
    for(var i=0;i<new_data.length;i++) {
      data[i] = {name:new_data[i].name,y:new_data[i].permissible_values[d]}
    }
    data[0].selected=true
    return data;
  },
  getApprovedDataMonth(new_data,d) {
    var data = []
    var total = 0
    var i=0;
    for(i=0;i<new_data.length;i++) {
      data[i] = {name:new_data[i].name,y:new_data[i].permissible_values[d] - new_data[i].amount_left[d],more:(new_data[i].permissible_values[d] - new_data[i].amount_left[d])/new_data[i].permissible_values[d]*100}
  }
    return data;
  },
  getTransactionData(new_data) {
    var data = []
    for(var i=0;i<new_data.length;i++) {
      api.get(`${apiUrl}transaction/trans/find/by/${new_data[i]._id}`).then((res) => {
        data[i] = {y:res.data.amount}
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
    }
  }
  }
};
</script>
<style>
#legend {
  color:grey;
  font-size:14px
}
#legend:focus {
  outline: 0;
    -webkit-box-shadow: 0 0 0 0 rgba(32, 168, 216, 0.25);
    box-shadow: 0 0 0 0 rgba(32, 168, 216, 0.25);
}
#legend:focus {
  font-weight: bold;
  color:black;
}
.chart {
  max-width:550px;
}
.chart3 {
  max-width:550px;
  overflow-x: scroll !important;
}
.chart4 {
  max-width:100%;
  overflow-x: scroll !important;
}
.chart2 {
  max-width:100%;
}
.highcharts-container {
    overflow-x: inherit !important;
    overflow-y: hidden !important;
    width: auto !important;
}
</style>