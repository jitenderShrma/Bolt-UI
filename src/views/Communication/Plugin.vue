<template>
<div class="animated fadeIn">
    <b-row>
    <b-col sm="4" v-for="(run,i) in data" :key="i">
    <b-card no-body style="padding:0 !important" :class="data[i].plugin_color">
      <b-card-header>
        <h5 v-text="data[i].plugin_name"></h5>
        <b-dropdown class="float-right" variant="transparent" style="margin:-20px;" right>
              <template slot="button-content">
                <i class="icon-settings" ></i>
              </template>
              <b-dropdown-item @click="install"><span v-text="$ml.get('install')"></span></b-dropdown-item>
            </b-dropdown>
      </b-card-header>
      <b-card-body style="padding:1.25rem">
          <center><i :class="data[i].icon_class"></i>
        <p v-text="data[i].plugin_description">
        </p></center>
      </b-card-body>
    </b-card>
    </b-col>
    </b-row>
    <b-modal :title="$ml.get('customattributes')" class="modal-primary" v-model="primaryModal" @ok="primaryModal = false" hide-footer>
        <div ref="load"  class="load">
            <pre ref="term"  class="term">bolt@console:~$ </pre>
        </div>        
    </b-modal>
    </div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
export default {
    name: 'Plugin',
    data : function () {
        return {
            data : [

            ],
            primaryModal : false
        }
    },
    async mounted() {
        this.textarea = this.$refs.term;
        this.load = this.$refs.load;
    axios.get(`${apiUrl}`+`super/plugin/see`,{ withCredentials:true })
    .then(
      response => {this.data = response.data
      console.log(this.data)
      })      
    },
    methods : {
        install() {
            this.primaryModal = true; 
            }
    }
}
</script>
<style>
 pre {
  padding: 0;
  margin: 0;
}

.load {
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  background: black;
}

.term {
  font-family: monospace;
  color:  #00FF00;
  opacity: 0.8;
  font-size: 2em;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;
  padding-left: 20px;
}

.term:after {
  content: "_";
  opacity: 1;
  animation: cursor 1s infinite;
}

@keyframes cursor {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
