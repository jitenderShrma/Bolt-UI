<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
    <div id="Dashboard">
    	<b-row>
    		<b-col>
    			<b-card no-body style="height:76vh">
		    		<b-card-body>
			            <b-dropdown class="float-right" variant="info p-0" right no-caret>
			              <template slot="button-content">
			                <i class="icon-settings"></i>
			              </template>
			              <b-dropdown-item @click="toggle1">Total Budget</b-dropdown-item>
			              <b-dropdown-item @click="toggle1">Approved Budget</b-dropdown-item>
			              <b-dropdown-item @click="toggle1">Yearly Budget</b-dropdown-item>
			            </b-dropdown>
			            <div v-if="option1 == 'Total Budget'">
		    				<highcharts class="chart" :options="chartOptions1Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    			<div v-if="option1 == 'Approved Budget'">
		    				<highcharts class="chart" :options="chartOptions2Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    			<div v-if="option1 == 'Yearly Budget'">
		    				<highcharts class="chart" :options="chartOptions3Bar" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    		</b-card-body>
		    	</b-card>
    		</b-col>
    		<b-col>
		    	<b-card no-body style="height:76vh">
		    		<b-card-body>
			            <b-dropdown class="float-right" variant="info p-0" right no-caret>
			              <template slot="button-content">
			                <i class="icon-settings"></i>
			              </template>
			              <b-dropdown-item @click="toggle">This Month</b-dropdown-item>
			              <b-dropdown-item @click="toggle">This Year</b-dropdown-item>
			            </b-dropdown>
			            <div v-if="option == 'Month'">
		    				<highcharts class="chart" :options="chartOptions1" :updateArgs="updateArgs"></highcharts>
		    			</div>
		    			<div v-else>
		    				<highcharts class="chart" :options="chartOptions2" :updateArgs="updateArgs"></highcharts>
		    			</div>
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
  		option:"Month",
  		option1:"Total Budget",
  		updateArgs: [true, true, {duration: 1000}],
      chartOptions1: {
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
          text: `${this.getMonth()}'s Budget`
        },
        series: [
	        
	        {
		        name: 'Approved Budget',
		        data: [],
		        size: '60%',
		        dataLabels: {
		            distance: -10
		        }               
		    },
		    {
	          name:"Total Budget",
	          data: [],
	          size:'80%',
	          innerSize: '80%',
	          
	        }
        ]
    },
    chartOptions2: {
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
          text: "This Year's Budget"
        },
        series: [
	        
	        {
		        name: 'Approved Budget',
		        data: [],
		        size: '60%',       
		        dataLabels: {
		            distance: -30
		        }
		    },
		    {
	          name:"Total Budget",
	          data: [],
	          size:'80%',
	          innerSize: '80%',
	                
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
  mounted() {
  	api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
    	this.chartOptions1.series[1].data = this.getTotalDataMonth(response.data)
      	this.chartOptions1.series[0].data = this.getApprovedDataMonth(response.data)
      	this.chartOptions2.series[1].data = this.getTotalData(response.data)
      	this.chartOptions2.series[0].data = this.getApprovedData(response.data)
      	this.chartOptions1Bar.series = this.getMonthlyBar1(response.data);
      	this.chartOptions2Bar.series = this.getMonthlyBar2(response.data);
      	this.chartOptions3Bar.xAxis.categories = this.getYearlyBar1(response.data);
      	this.chartOptions3Bar.series = this.getYearlyBar2(response.data);      	// this.chartOptions.series[2].data = this.getTransactionData(response.data)
      });
  },
  methods: {
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
  		}
  		for(var i=0;i<new_data.length;i++) {
  			data[i] = new_data[i].name
  		}
  		console.log(data)
  		return data
  	},
  	getYearlyBar2(new_data) {
  		var data =[]
  		for(var i=0;i<12;i++) {
  			data[i] = {name:null,data:[]}
  		}
  		for(var i=0;i<12;i++) {
  			data[i].name = this.switchMonth(i)
  			for(var j=0;j<new_data.length;j++) {
	  			data[i].data.push(new_data[j].amount_left[i])
	  		}
  		}
  		return data
  	},
  	toggle(args) {
  		if(args.target.text == "This Month") {
  			this.option = "Month"
  		}
  		else {
  			this.option = "Year"
  		}
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
		var i=0;
		for(i=0;i<new_data.length;i++) {
			data[i] = {name:new_data[i].name,y:0}
			for(var j=0;j<12;j++) {
				data[i].y = data[i].y + (new_data[i].permissible_values[j] - new_data[i].amount_left[j])
			}
	}
		console.log(data)
		return data;
	},
	getTotalDataMonth(new_data) {
		var data = []
		var d = new Date().getMonth()
		for(var i=0;i<new_data.length;i++) {
			data[i] = {name:new_data[i].name,y:new_data[i].permissible_values[d]}
		}
		data[1].selected=true
		return data;
	},
	getApprovedDataMonth(new_data) {
		var data = []
		var d = new Date().getMonth()
		var i=0;
		for(i=0;i<new_data.length;i++) {
			data[i] = {name:new_data[i].name,y:new_data[i].permissible_values[d] - new_data[i].amount_left[d]}
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
</style>