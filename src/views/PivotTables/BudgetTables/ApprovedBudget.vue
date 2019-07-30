<template>
  <div>
  <div class="control-section">
    <div class="content-wrapper">
    <ejs-toolbar :clicked="addEditHandler">
      <e-items>
               <e-item  id="upload" :text="$ml.get('upload')"></e-item>
      </e-items>
    </ejs-toolbar>
    <b-card>
      <!-- ../ -->
      <b-col sm="4" style="float:right">
    <ejs-dropdownlist v-model="selected" :value="selected" :enablePersistence="true" :dataSource='options' :placeholder="$ml.get('pholdpivotdataview')"></ejs-dropdownlist>
      </b-col>
    </b-card>

    <div v-if="selected=='Month'">
      <div v-if="selected3=='Total Budget'">
        <div v-if="selected2 == 'Jan'">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings1" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
        <div v-if="selected2 == 'Feb' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings3" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Mar' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings4" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Apr' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings5" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
      <div v-if="selected2 == 'May' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings6" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
      <div v-if="selected2 == 'Jun' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings7" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
        <div v-if="selected2 == 'Jul' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings8" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
        <div v-if="selected2 == 'Aug' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings9" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Sep' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings10" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Oct' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings11" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Nov' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings12" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Dec' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings13" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
          </div>
          <div v-else>
             <div v-if="selected2 == 'Jan' ">
            <ejs-pivotview :height="height" :dataSource="dataSourceSettings14" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
          </div>
            <div v-if="selected2 == 'Feb' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings16" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Mar' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings17" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Apr' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings18" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
      <div v-if="selected2 == 'May' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings19" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
      <div v-if="selected2 == 'Jun' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings20" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
        <div v-if="selected2 == 'Jul' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings21" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
        <div v-if="selected2 == 'Aug' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings22" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Sep' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings23" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Oct' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings24" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Nov' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings25" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
       <div v-if="selected2 == 'Dec' ">
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings26" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
      </div>
          </div>
        </div>
    <div v-else>
      <div v-if="selected3 == 'Total Budget'">
      <ejs-pivotview :height="height" :dataSource="dataSourceSettings2" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
    </div>
    <div v-else>
      <ejs-pivotview :height="height" :dataSource="dataSourceSettings15" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
    </div>
    </div>
  </div>
  <b-modal :title="$ml.get('upload')" size="sm" class="modal-primary" v-model="browseModal" @ok="browseModal = false" hide-footer>
    <div id="modalTarget" class="control-section; position:relative" style="height:300px;">
        <ejs-uploader ref="uploadObj" id='defaultfileupload' :multiple = "false" :success="onUploadSuccess" :progress="onProgress" :failure="onUploadFailed"  :allowedExtensions="extensions" :asyncSettings="path" name="UploadFiles"></ejs-uploader>
      </div>
    
  </b-modal>
  </div>
</div>
</template>

<style>
.control-section {
        height: 100%;
        min-height: 100%;
    }
.e-grid .e-movablecontent {
    overflow: scroll;
}
.e-pivotview .e-grid {
    border-color: #e0e0e0;
    height: 70vh;
}
</style>
<script>
import Vue from "vue";
import apiUrl from '@/apiUrl'
import axios from 'axios'
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
import { CheckBoxPlugin } from "@syncfusion/ej2-vue-buttons";
import { PivotViewPlugin, IDataSet } from "@syncfusion/ej2-vue-pivotview";
import { extend, enableRipple } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import {
  DataManager,
  Query,
  ReturnOption,
  WebApiAdaptor
} from "@syncfusion/ej2-data";
enableRipple(false);
Vue.use(MultiSelectPlugin);

  Vue.use(DropDownListPlugin);
Vue.use(PivotViewPlugin);
Vue.use(UploaderPlugin);
Vue.use(CheckBoxPlugin);
    Vue.use(ToolbarPlugin);

var api = axios.create({
  withCredentials :true
})
var company = JSON.parse(sessionStorage['vue-session-key']).company
console.log(company)
let remoteData = new DataManager({
  url: `${apiUrl}`+`csv/read/M/${company}`,
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});
let secondData = new DataManager({
  url: `${apiUrl}`+`csv/read/M/amount/left/${company}`,
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});
export default {
  name:"test",
  components: {
      PivotViewPlugin,UploaderPlugin,CheckBoxPlugin
  },
  
    data: function(){
        return {
          dataSourceSettings1: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
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
      dataSourceSettings2: {
        columns: [{ name: "Year" }],
        values: [
          { name: 'Q1', caption: 'Quarter 1', type: 'CalculatedField' },
          { name: 'Q2', caption: 'Quarter 2', type: 'CalculatedField' },
          { name: 'Q3', caption: 'Quarter 3', type: 'CalculatedField' },
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
       dataSourceSettings3: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan "+`${new Date().getFullYear()+1}` },
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
      dataSourceSettings4: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
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
      dataSourceSettings5: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
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
      dataSourceSettings6: {
        columns: [{ name: "Year" }],
        values: [
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
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
      dataSourceSettings7: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
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
      dataSourceSettings8: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
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
      },dataSourceSettings9: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
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
      dataSourceSettings10: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
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
      dataSourceSettings11: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
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
        dataSourceSettings12: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
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
        dataSourceSettings13: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
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
       dataSourceSettings16: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan "+`${new Date().getFullYear()+1}` },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings17: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings18: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings19: {
        columns: [{ name: "Year" }],
        values: [
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings20: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings21: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      },dataSourceSettings22: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings23: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings24: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
        dataSourceSettings25: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
        dataSourceSettings26: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Dec", caption: "Dec" },
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings14: {
        columns: [{ name: "Year" }],
        values: [
          { name: "Jan", caption: "Jan" },
          { name: "Feb", caption: "Feb" },
          { name: "Mar", caption: "Mar" },
          { name: "Apr", caption: "Apr" },
          { name: "May", caption: "May" },
          { name: "Jun", caption: "Jun" },
          { name: "Jul", caption: "Jul" },
          { name: "Aug", caption: "Aug" },
          { name: "Sep", caption: "Sep" },
          { name: "Oct", caption: "Oct" },
          { name: "Nov", caption: "Nov" },
          { name: "Dec", caption: "Dec" },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      dataSourceSettings15: {
        columns: [{ name: "Year" }],
        values: [
          { name: 'Q1', caption: 'Quarter 1', type: 'CalculatedField' },
          { name: 'Q2', caption: 'Quarter 2', type: 'CalculatedField' },
          { name: 'Q3', caption: 'Quarter 3', type: 'CalculatedField' },
          { name: 'Q4', caption: 'Quarter 4', type: 'CalculatedField' },
          { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        dataSource: secondData,
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
      browseModal:false,
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
        },
        selected:"Month",
        options:["Month","Quarter"],
        options3:["Total Budget","Approved Budget"],
        selected3 : "Approved Budget",
        selected2:"Apr",
        options2:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        height: 530
        }
    },
    methods:{
      changeView() {
        if(this.selected3 == 'Approved Budget') {
          this.selected = 'Quarter'
        }
        if(this.selected3 == 'Total Budget') {
          this.selected = 'Quarter'
        }
      },
      async load(args){
        if(this.selected3 == "Total Budget") {
        await api.get(`${apiUrl}`+`csv/read/M/${company}`).then((res)=>{
        args.dataSource.data = res.data;
        api.get(`${apiUrl}`+`/super/settings/budget/budSet/get`).then((resp)=>{
          if(resp.data.fin_year_start_month == "Jan"){
            this.selected2 = "Jan";
          }else if(resp.data.fin_year_start_month == "Feb"){
            this.selected2 = "Feb";
          }else if(resp.data.fin_year_start_month == "Mar"){
            this.selected2 = "Mar";
          }else if(resp.data.fin_year_start_month == "Apr"){
            this.selected2 = "Apr";
          }else if(resp.data.fin_year_start_month == "May"){
            this.selected2 = "May";
          }else if(resp.data.fin_year_start_month == "Jun"){
            this.selected2 = "Jun";
          }else if(resp.data.fin_year_start_month == "Jul"){
            this.selected2 = "Jul";
          }else if(resp.data.fin_year_start_month == "Aug"){
            this.selected2 = "Aug";
          }else if(resp.data.fin_year_start_month == "Sep"){
            this.selected2 = "Sep";
          }else if(resp.data.fin_year_start_month == "Oct"){
            this.selected2 = "Oct";
          }else if(resp.data.fin_year_start_month == "Nov"){
            this.selected2 = "Nov";
          }else if(resp.data.fin_year_start_month == "Dec"){
            this.selected2 = "Dec";
          }else{
            this.selected2 = "Jan";
          }
        
      });
        args.dataSource.data = res.data
        args.dataSource.data = res.data
        console.log(res.data);
      });
      }
      else{
        await api.get(`${apiUrl}`+`csv/read/M/amount/left/${company}`).then((res)=>{
        args.dataSource.data = res.data;
        api.get(`${apiUrl}`+`/super/settings/budget/budSet/get`).then((resp)=>{
          if(resp.data.fin_year_start_month == "Jan"){
            this.selected2 = "Jan";
          }else if(resp.data.fin_year_start_month == "Feb"){
            this.selected2 = "Feb";
          }else if(resp.data.fin_year_start_month == "Mar"){
            this.selected2 = "Mar";
          }else if(resp.data.fin_year_start_month == "Apr"){
            this.selected2 = "Apr";
          }else if(resp.data.fin_year_start_month == "May"){
            this.selected2 = "May";
          }else if(resp.data.fin_year_start_month == "Jun"){
            this.selected2 = "Jun";
          }else if(resp.data.fin_year_start_month == "Jul"){
            this.selected2 = "Jul";
          }else if(resp.data.fin_year_start_month == "Aug"){
            this.selected2 = "Aug";
          }else if(resp.data.fin_year_start_month == "Sep"){
            this.selected2 = "Sep";
          }else if(resp.data.fin_year_start_month == "Oct"){
            this.selected2 = "Oct";
          }else if(resp.data.fin_year_start_month == "Nov"){
            this.selected2 = "Nov";
          }else if(resp.data.fin_year_start_month == "Dec"){
            this.selected2 = "Dec";
          }else{
            this.selected2 = "Jan";
          }
        
      });
        console.log(res.data);
      });
      }
      },
      onProgress(args) {
      },
       onUploadSuccess: function (args) {
          var formData = new FormData();
          formData.append('csv',args.file.rawFile);
          formData.append('import_setting',"M");
          formData.append('year',"2019")
          console.log(formData);
          this.upload = true
          console.log("req called");
          api.post(`${apiUrl}`+`csv/read/`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            console.log(res);
          	console.log("res")
          	// this.dataSourceSettings.dataSource = res.data[0];
          })
          this.browseModal = false
          this.$router.go()
          // axios.post(`${apiUrl}`+`csv/read`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
          //   this.dataSourceSettings.dataSource = res.data
          // })
        },
        onUploadFailed: function (args) {
            console.log('Upload fails');
        },
        onFileRemove: function (args) {
            args.postRawFile = false;
        },
        addEditHandler(args) {
          if(args.item.id=="upload") {
            this.browseModal = true
          }
        }
    }
};
</script>

<style>
#pivotview {
  width: 100%;
  height:100vh;
}
</style>

<style>
@import '../../../styles/ejs-vue-base.css';
@import "../../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../../styles/ej2-vue-lists/styles/material.css";
@import "../../../styles/ej2-vue-navigations/styles/material.css";
@import "../../../styles/ej2-vue-popups/styles/material.css";
@import "../../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../../styles/ej2-vue-buttons/styles/material.css";
@import "../../../styles/ej2-vue-inputs/styles/material.css";
</style>