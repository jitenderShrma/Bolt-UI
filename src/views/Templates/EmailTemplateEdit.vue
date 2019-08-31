<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

          <b-row>
            <b-col sm="7">
        <b-card>
          <div slot="header">
            <strong v-text="$ml.get('email')"></strong>&nbsp;<span v-text="$ml.get('template')"></span>
          </div>
          <b-form v-on:submit.prevent="sendData">
            <b-form-group
            :label="$ml.get('context')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            
              <cool-select
                v-model="input.context"
                :items="contextlist"
                item-text="context_name"
                item-value="_id"
                :value="contextlist[0]"
                :placeholder="$ml.get('pholdcontext')"
               >
              </cool-select>
            
          </b-form-group>
          
          <b-form-group
            :label="$ml.get('cc')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.cc"  type="text" :placeholder="$ml.get('pholdcc')" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            
            :label="$ml.get('bcc')"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="input.bcc" type="text" :placeholder="$ml.get('pholdbcc')"></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$ml.get('subject')"
            label-for="basicPassword"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicPassword" v-model="input.subject"  type="text" :placeholder="$ml.get('pholdsubject')" autocomplete=""></b-form-input>
          </b-form-group>
        <b-form-group
        id="emailtemplates"
            :description="$ml.get('desctemplate')"
            :label="$ml.get('template')"
            label-for="basicEmail"
            :label-cols="3"
            :horizontal="true">
                <ejs-richtexteditor ref="defaultRTE" :height="400"  :quickToolbarSettings="quickToolbarSettings" :toolbarSettings="toolbarSettings">
        
                </ejs-richtexteditor>
        </b-form-group>
        <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
          </b-card>
        </b-col>
            <b-col sm="5">
              
              <b-card>
                <b-card-body style="padding : 0 1.25rem 0 1.25rem !important;">
                  <v-client-table :columns="columns" :data="data"  :options="options" :theme="theme" id="dataTable"></v-client-table>
                </b-card-body>
      
              </b-card>
            </b-col>
            </b-row>
          
</div>
</template>
<script>
import axios from 'axios'
import apiUrl from '@/apiUrl'
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2'
import { RichTextEditorPlugin, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table } from "@syncfusion/ej2-vue-richtexteditor";
import {CoolSelect} from 'vue-cool-select'

  Vue.use(ClientTable)
 Vue.use(RichTextEditorPlugin);

export default {
    name : 'emailtemplate',
    components : {
        RichTextEditorPlugin, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, CoolSelect,ClientTable
    },
    provide: {
            richtexteditor:[Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table]
        },
    data : function () {
        return  { 
          columns: ['name','description'],
        data: [],
        options: {
          headings: {
            name : "Short Code Name",
            description : "Description"
          },
          listColumns : {},
          sortable: ['name','description'],
          filterable: ['name','description'],
          sortIcon: { base:'fa', up:'fa-sort-asc', down:'fa-sort-desc', is:'fa-sort' },
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        useVuex: false,
        theme: 'bootstrap4',
        template: 'default',
          tabIndex: [0, 0],
          tabs: [
            "E-Mail Template",
            "Key Codes"
          ],
          input: {
                context : "",
                cc : "",
                bcc : "",
                subject : "",
                html : ""
            },
            contextlist : [],
            quickToolbarSettings: {
            image: [
                'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
                'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
            ]
        },
         toolbarSettings: {
                items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|',
                'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
            },
            
        }
    },
    async mounted () {
        axios.get(`${apiUrl}`+`context/context/find`,{withCredentials:true}).then((response) => {
            this.contextlist = response.data;
            this.input.context = this.contextlist[0]._id;
            console.log(response.data)
            axios.get(`${apiUrl}`+`context/find/one/`+`${this.input.context}`,{withCredentials:true}).then((response) => {
              this.data = response.data.short_codes
            })
        }).catch((err)=> {
          if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
        // axios.get('',{withCredentials:true}).then((response) => {
        
        // });
        // axios.get('',{withCredentials:true}).then((response) => {

        // })
    },
    // async updated() {
    //   this.$nextTick(function () {
    //     axios.get(`${apiUrl}`+`context/find/one/`+`${this.input.context}`,{withCredentials:true}).then((response) => {
    //           this.data = response.data.short_codes
    //         })
    //   })
    // },
    watch : {
      'input.context': function() { 
        axios.get(`${apiUrl}`+`context/find/one/`+`${this.input.context}`,{withCredentials:true}).then((response) => {
              this.data = response.data.short_codes
            }).catch((err)=> {
              if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      }
    },
    methods : {
        sendData () {
            this.input.html = this.$refs.defaultRTE.getHtml()
            console.log(this.input.html);
            axios.post(`${apiUrl}`+`/mail/template/add`,this.input,{withCredentials:true}).then((response) => {
              console.log(response.data);
            }).catch((err)=> {
              if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      });
        },
        
    }

};
</script>
<style>
@import '../../styles/ejs-vue-base.css';
@import "../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../styles/ej2-vue-lists/styles/material.css";
@import "../../styles/ej2-vue-navigations/styles/material.css";
@import "../../styles/ej2-vue-popups/styles/material.css";
@import "../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../styles/ej2-vue-buttons/styles/material.css";
@import "../../styles/ej2-vue-inputs/styles/material.css";
</style>