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
      <b-col sm="4" style="float:right">
    <ejs-dropdownlist v-model="selected" :dataSource='options' :placeholder="$ml.get('pholdpivotdataview')"></ejs-dropdownlist>
      </b-col>
    </b-card>

    <div v-if="selected=='Month'">
      
        <ejs-pivotview :height="height" :dataSource="dataSourceSettings1" :allowCalculatedField="allowCalculatedField" :load="load"> </ejs-pivotview>
          </div>
    <div v-else>
      <ejs-pivotview :height="height" :dataSource="dataSourceSettings2" :allowCalculatedField="allowCalculatedField"> </ejs-pivotview>
    </div>
  </div>
  <b-modal :title="$ml.get('upload')" size="sm" class="modal-primary" v-model="browseModal" @ok="browseModal = false" hide-footer>
    <div id="modalTarget" class="control-section; position:relative" style="height:100px;">
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
        height: 530
        }
    },
    methods:{
      async load(args){
        await api.get(`${apiUrl}`+`csv/read/M/${company}`).then((res)=>{
        args.dataSource.data = res.data
        args.dataSource.data = res.data
        console.log(res.data);
      });
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
@import '../styles/ejs-vue-base.css';
@import "../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../styles/ej2-vue-lists/styles/material.css";
@import "../styles/ej2-vue-navigations/styles/material.css";
@import "../styles/ej2-vue-popups/styles/material.css";
@import "../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../styles/ej2-vue-buttons/styles/material.css";
@import "../styles/ej2-vue-inputs/styles/material.css";
</style>