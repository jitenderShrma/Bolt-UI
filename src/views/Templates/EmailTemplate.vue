<template>
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
            <b-form-select id="basicSelect"
              :plain="true"
              class="connection"
              :options="contextlist"
              v-model="input.context"
              :aria-placeholder="$ml.get('pholdcontext')"
              value="User Added">
            </b-form-select>
          </b-form-group>
          <b-form-group
            :label="$ml.get('theme')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="basicSelect"
              :plain="true"
              class="connection"
              :options="themedata"
              :aria-placeholder="$ml.get('pholdtheme')"
              value="Basic">
            </b-form-select>
          </b-form-group>
          <b-form-group
            :label="$ml.get('cc')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName"  type="text" :placeholder="$ml.get('pholdcc')" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            
            :label="$ml.get('bcc')"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText"  type="text" :placeholder="$ml.get('pholdbcc')"></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$ml.get('subject')"
            label-for="basicPassword"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicPassword"  type="text" :placeholder="$ml.get('pholdsubject')" autocomplete=""></b-form-input>
          </b-form-group>
        <b-form-group
        id="emailtemplates"
            :description="$ml.get('desctemplate')"
            :label="$ml.get('template')"
            label-for="basicEmail"
            :label-cols="3"
            :horizontal="true">
                <div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="cui-bold"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="cui-italic"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="fa fa-strikethrough"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="fa fa-underline"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <i class="fa fa-code"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <i class="fa fa-paragraph"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
          type="button"

            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <i class="fa fa-list-ul"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <i class="fa fa-list-ol"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <i class="fa fa-quote-right"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <i class="fa fa-code"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <i class="fa fa-minus"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            @click="commands.undo"
          >
            <i class="fa fa-rotate-left"></i>
          </button>

          <button
          type="button"
            class="menubar__button"
            @click="commands.redo"
          >
            <i class="fa fa-rotate-right"></i>
          </button>

        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" />

    </div>
                </div>
        </b-form-group>
        <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>




          </div>
          </b-form>
        </b-card>
</template>
<script>
import Icon from '@/views/Icon'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'


export default {
    name : 'emailtemplate',
    components : {
        EditorMenuBar,
    EditorContent,
    Icon
    },
    data : function () {
        return  { 
          input :{
                body : "\r\n\t\"greeting\": \"\",\r\n\t\"name\": \"\",\r\n\t\"title\": \"\",\r\n\t\"intro\": [\"\",\"\",\"\"],\r\n\t\"action\": [\r\n\t\t{\r\n\t\t\t\"instructions\": \"\",\r\n\t\t\t\"button\": {\r\n\t\t\t\t\"color\": \"\",\r\n\t\t\t\t\"text\": \"\",\r\n\t\t\t\t\"link\": \"\"\r\n\t\t\t}\r\n\t\t},\t\r\n\t],\r\n\t\"outro\": [\"\",\"\",\"\"],\r\n\t\"table\": {\r\n\t\t\"data\": [\r\n\t\t\t{\t\t\r\n\t\t\t\t\"item\": \"\",\r\n\t\t\t\t\"description\": \"\",\r\n\t\t\t\t\"price\": \"\",\r\n\t\t\t}\t\t\t\r\n\t\t],\r\n\t\t\"column\" : {\r\n\t\t\t\"customWidth\": {\r\n\t\t\t\t\"item\": \"\",\r\n\t\t\t\t\"price\": \"\",\r\n\t\t\t},\r\n\t\t\t\"customAlign\": {\r\n\t\t\t\t\"price\": \"\"\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t},\r\n\t\"signature\": \"\"\r\n",
                context : "",
                cc : "",
                bcc : "",
                subject : "",
                html : ""
            },
            contextlist:  ['User Added'],
            themedata : ['Basic'],
            
            selectedMode: 'js',
            selectedTheme: 'material',
            editor: null,
            json: 'Update content to see changes',
      html: 'Update content to see changes'
            
        }
    },
    mounted () {
       this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
         
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.input.html = getHTML()
        },
      });
        // axios.get('',{withCredentials:true}).then((response) => {

        // });
        // axios.get('',{withCredentials:true}).then((response) => {

        // })
    },
    methods : {
        sendData () {
            axios.post(`${apiUrl}`+`/mail/template/add`,this.input,{withCredentials:true}).then((response) => {
              console.log(response.data);
            });
        }
        
    }

}
</script>

<style>
  .ProseMirror {
    min-height:40vh;
    border : 1px solid black
  }
  #emailtemplate {
    height:50vh
  }
</style>



