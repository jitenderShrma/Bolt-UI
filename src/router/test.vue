<template>
<div v-if="!upload">
  <b-card>
  <div id="modalTarget" class="control-section; position:relative" style="height:350px;">
        <ejs-uploader ref="uploadObj" id='defaultfileupload' :multiple = "false" :success="onUploadSuccess" :progress="onProgress" :failure="onUploadFailed"  :allowedExtensions="extensions" :asyncSettings="path" name="UploadFiles"></ejs-uploader>
    </div>
  </b-card>
</div>
<div v-else>
  <div class="control-section" style="overflow: auto">
    <b-progress :value="100" variant="danger" :animated="animate" class="mb-3"></b-progress>
</div>
</div>
</template>

<style>
.control-section {
        height: 100%;
        min-height: 200px;
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
enableRipple(false);

Vue.use(PivotViewPlugin);
Vue.use(UploaderPlugin);
Vue.use(CheckBoxPlugin);

export default {
  name:"test",
    data: function(){
        return {
          dataSource: {
            enableSorting: true,
            columns: [{ name: "Year" }, { name: "Quarter" }],
            values: [
              { name: "Sold", caption: "Units Sold" },
              { name: "Amount", caption: "Sold Amount" }
            ],
            data: [],
            rows: [{ name: "Country" }, { name: "Products" }],
            formatSettings: [{ name: "Amount", format: "C0" }],
            expandAll: false,
            filters: [],
          },
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
    methods:{
      onProgress(args) {
        let li = this.$refs.uploadObj;
        console.log(li)
            
            let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
            if (!isNaN(progressValue)) {
                li.getElementsByTagName('progress')[0].value = progressValue;
            }
      },
       onUploadSuccess: function (args) {
          var formData = new FormData();
          formData.append('csv',args.file.rawFile);
          console.log(formData);
          this.upload = true
          // axios.post(`${apiUrl}`+`csv/read`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
          //   console.log(res)
          // })
        },
        onUploadFailed: function (args) {
            console.log('Upload fails');
        },
        onFileRemove: function (args) {
            args.postRawFile = false;
        }
    }
};
</script>

  <style>
#pivotview {
  width: 100%;
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