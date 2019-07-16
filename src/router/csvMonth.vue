<template>
  <div class="home">
     <ejs-pivotview height="600" :dataSourceSettings="dataSourceSettings" :allowCalculatedField="allowCalculatedField"> </ejs-pivotview>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import {Page, TreeGridPlugin } from '@syncfusion/ej2-vue-treegrid';
import { PivotViewPlugin,CalculatedField } from "@syncfusion/ej2-vue-pivotview";
import { extend, enableRipple } from '@syncfusion/ej2-base';
import {
  DataManager,
  Query,
  ReturnOption,
  WebApiAdaptor
} from "@syncfusion/ej2-data";
enableRipple(false);

Vue.use(PivotViewPlugin);


Vue.use(TreeGridPlugin);

let remoteData = new DataManager({
  url: "http://127.0.0.1:3000/api/csv/read/M",
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

export default {
  name: 'home',
  components: {
    TreeGridPlugin,
    PivotViewPlugin
  },
  provide: {
      treegrid: [ Page,CalculatedField ]
    },
  data: function(){
        return {
          dataSourceSettings: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: 'Q1', caption: 'Quarter 1', type: 'CalculatedField' },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: 'Q2', caption: 'Quarter 2', type: 'CalculatedField' },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: 'Q3', caption: 'Quarter 3', type: 'CalculatedField' },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: 'Q4', caption: 'Quarter 4', type: 'CalculatedField' },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: remoteData,
        expandAll: true,
        rows: [{ name: "tree_id" }, { name: "name" }],
        showColumnGrandTotals:false,
        calculatedFieldSettings: [{
             name: 'Q1',
             formula: '"Sum(Jan)"+"Sum(Feb)"+"Sum(Mar)"'
          },
          {
             name: 'Q2',
             formula: '"Sum(Apr)"+"Sum(May)"+"Sum(Jun)"'
          },
          {
             name: 'Q3',
             formula: '"Sum(Jul)"+"Sum(Aug)"+"Sum(Sep)"'
          },
            {
             name: 'Q4',
             formula: '"Sum(Oct)"+"Sum(Nov)"+"Sum(Dec)"'
          },{
             name: 'Total',
             formula: '"Sum(Jan)"+"Sum(Feb)"+"Sum(Mar)"+"Sum(Apr)"+"Sum(May)"+"Sum(Jun)"+"Sum(Jul)"+"Sum(Aug)"+"Sum(Sep)"+"Sum(Oct)"+"Sum(Nov)"+"Sum(Dec)"'
          }]
      },
      allowCalculatedField:true,
          complete:false,
          upload:false,
          extensions : '.csv',
          path: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
          },
          dropElement: '.control-fluid',
          change: (args) => {
            this.$refs.uploadObj.autoUpload = args.checked;
            this.$refs.uploadObj.clearAll();
        },
        changed: (args) => {
            this.$refs.uploadObj.sequentialUpload = args.checked;
            this.$refs.uploadObj.clearAll();
        }
        }
    },
    mounted(){
      console.log(remoteData);
    }
};
</script>

<style>
@import '../styles/ejs-vue-base.css';
@import "../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../styles/ej2-vue-lists/styles/material.css";
@import "../styles/ej2-vue-navigations/styles/material.css";
@import "../styles/ej2-vue-popups/styles/material.css";
@import "../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../styles/ej2-vue-buttons/styles/material.css";
@import "../styles/ej2-vue-inputs/styles/material.css";
</style>
<style>

    @font-face {
font-family: 'e-grid-rowheight';
src:
url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
font-weight: normal;
font-style: normal;
}

    .e-small-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e707';
    }

   .e-medium-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e701';
    }

    .e-big-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e702';
    }
</style>