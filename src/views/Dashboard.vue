<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">
    <div id="Dashboard">
    	<b-row>
    		<b-col>
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
          text: "This Month's Budget"
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
		    {
		        name: 'Transactions',
		        data: [],
		        size: '80%',
		        innerSize: '80%',
		    }
        ]
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
      	// this.chartOptions.series[2].data = this.getTransactionData(response.data)
      });
  },
  methods: {
  	toggle(args) {
  		if(args.target.text == "This Month") {
  			this.option = "Month"
  		}
  		else {
  			this.option = "Year"
  		}
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
		console.log(data)
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
		console.log(data)
		return data;
	},
	getApprovedDataMonth(new_data) {
		var data = []
		var d = new Date().getMonth()
		var i=0;
		for(i=0;i<new_data.length;i++) {
			data[i] = {name:new_data[i].name,y:new_data[i].permissible_values[d] - new_data[i].amount_left[d]}
	}
		console.log(data)
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