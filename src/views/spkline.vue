<template>
     <ejs-chart style='display:block' height="100" align='center' :theme='theme' id='chartcontainer' :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
            :chartArea='chartArea' :tooltip='tooltip'>
            <e-series-collection>
                <e-series :dataSource='seriesData' type='StackingBar100' xName='x' yName='y' name='Apple' > </e-series>
                <e-series :dataSource='seriesData' type='StackingBar100' xName='x' yName='y1' name='Orange' > </e-series>
                <e-series :dataSource='seriesData' type='StackingBar100' xName='x' yName='y2' name='Wastage' > </e-series>
               
            </e-series-collection>
        </ejs-chart>
</template>
 
<script>
import Vue from "vue";
import { Browser } from '@syncfusion/ej2-base';
import { ChartPlugin, StackingBarSeries, Legend, Category, Tooltip, Theme} from "@syncfusion/ej2-vue-charts";
Vue.use(ChartPlugin);

let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

export default {
  data: function() {
    return {
         theme: theme,
      seriesData: [
               { x: 'Jan', y: 6, y1: 6, y2: 1 }, { x: 'Feb', y: 8, y1: 8, y2: 1.5 },
               { x: 'Mar', y: 12, y1: 11, y2: 2 }, { x: 'Apr', y: 15, y1: 16, y2: 2.5 },
               { x: 'May', y: 20, y1: 21, y2: 3 }, { x: 'Jun', y: 24, y1: 25, y2: 3.5 }

           ],

      //Initializing Primary X Axis
          primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
        },

      //Initializing Primary Y Axis
       primaryYAxis:
        {
            edgeLabelPlacement: 'Shift'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
         
     tooltip: {
            enable: true,
            format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
        },

      width : Browser.isDevice ? '100%' : '60%',
      title: "Sales Comparison"
    };
  },
  provide: {
    chart: [StackingBarSeries, Legend, Category, Tooltip]
  },
  methods: {
  
  },
};
</script>