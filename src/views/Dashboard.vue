<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
    <div id="Dashboard">
    	<b-row>
    		<b-col sm="6" style="padding-right:3px; padding-left:0px">
    			<b-card no-body style="height:80vh">
		    		<b-card-body>
			            <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
			              <template slot="button-content">
			                <i class="icon-settings" style="color:black"></i>
			              </template><!-- 
			              <b-dropdown-item @click="toggle1">Total Budget</b-dropdown-item>
			              <b-dropdown-item @click="toggle1">Approved Budget</b-dropdown-item> -->
			              <b-dropdown-item @click="toggle1">Yearly Budget</b-dropdown-item>
			            </b-dropdown>
			            <div v-if="option1 == 'Total Budget'">
		    				<highcharts class="chart" :options="chartOptions1Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    			<div v-if="option1 == 'Approved Budget'">
		    				<highcharts class="chart" :options="chartOptions2Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    			<div v-if="option1 == 'Yearly Budget'">
		    				<highcharts class="chart"  :options="chartOptions3Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    		</b-card-body>
		    	</b-card>
    		</b-col>
    		<b-col sm="6" style="padding-right:3px; padding-left:0px">
		    	<b-card no-body style="height:80vh">
		    		<b-card-body>
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
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import axios from 'axios'
import apiUrl from '@/apiUrl' 
var api = axios.create({
	withCredentials:true
})

export default {
  name: 'dashboard',
  components: {
  	highcharts:Chart
  },
  data: function() {
  	return {
  		budgetdata : [],
  		selectMonth : "Yearly",
  		option:"Total Budget",
  		option1:"Yearly Budget",
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
	            center: ['50%', '50%']
	        }
	    },
        dataLabels:[{
          align:"center",
        }],
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
    chartOptions3Bar: {
        chart: {
          type: 'column',
        },
        xAxis: {
        categories: [],
        crosshair: true
    },
    title:{
    	text:'Yearly Budget'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount ( in Rupees )'
        },
    },
    series: []
    }
  	}
  },
  watch:{
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
  		console.log(this.option)
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
      	this.chartOptions3Bar.series = this.getYearlyBar2(response.data);      	// this.chartOptions.series[2].data = this.getTransactionData(response.data)
      });
  },
  methods: {
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
  	 console.log(month)
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
  		console.log(data)
  		return data
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
  		console.log(data)
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
		if(new_data.length>5) {
			for(var i=0;i<5;i++) {
	  			data[i] = new_data[i].name
	  		}
		}
		else {
			for(var i=0;i<new_data.length;i++) {
	  			data[i] = new_data[i].name
	  		}
		}
  		return data
  	},
  	getYearlyBar2(new_data) {
  		var data =[]
  		var total = 0
  		for(var i=0;i<3;i++) {
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
  		for(var i=0;i<3;i++) {
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
  		}
  		return data
  	},
  	toggle(args) {
  		this.option = args.target.text
  		this.selectMonth = "Yearly"
  	},
  	toggle1(args) {
  		this.option1 = args.target.text
  	},
  	getTotalData(new_data) {
		var data = []
		for(var i=0;i<new_data.length;i++) {
			data[i] = {name:new_data[i].name,y:0}
			for(var j=0;j<12;j++) {
				data[i].y = data[i].y + new_data[i].permissible_values[j]
			}
		}
		data[1].selected=true
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
	console.log(data)
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
		data[1].selected=true
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
</style>