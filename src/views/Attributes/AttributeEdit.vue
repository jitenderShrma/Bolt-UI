<template>
<b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong v-text="$ml.get('updatedelete')"></strong> <span v-text="$ml.get('attribute')"></span>
          </div>
    <b-form v-on:submit.prevent="addAttribute">
              <b-form-group
            
            :label="$ml.get('fieldtype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <cool-select
                v-model="attribute.field_type"
                :items="field_types"
                :placeholder="$ml.get('fieldtype')"
               >
              </cool-select>
          </b-form-group>
          <b-form-group
            
            :label="$ml.get('context')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <cool-select
                v-model="attribute.context"
                :items="context_type"
                :placeholder="$ml.get('context')"
               >
              </cool-select>
          </b-form-group>
          <b-form-group
              
              :label="$ml.get('fieldname')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
                <b-form-input v-model="attribute.field_name" type="text" id="city" :placeholder="$ml.get('placeholderfieldname')"></b-form-input>
            </b-form-group>
            <b-form-group
              
              :label="$ml.get('description')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
                <b-form-input v-model="attribute.description" type="text" id="city" :placeholder="$ml.get('placeholderdescription')"></b-form-input>
            </b-form-group>
             <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
            </b-form>
            </b-card>
      </b-col>
</b-row>
</template>
<script>
import axios from 'axios'
import ml from '@/ml'
import apiUrl from '@/apiUrl'
import {CoolSelect} from 'vue-cool-select'
var link = window.location.href
  var key = link.split("attr/",24).pop()
  console.log(key)
export default {
    name : 'AttributeEdit',
    components : {
        CoolSelect,
    },
    data : function() {
        return {
        attribute : {
        context : "",
        field_name : "",
        field_type : "",
        description : ""
      },
      addattr : [
        
      ],
      field_types : ['Text','Email','Phone','TexArea'],
      context_type : ['Company','User']
        }
    },
    methods : {
    async addAttribute() {
      console.log(this.attribute);
      axios.put(`${apiUrl}`+`super/attrib/update/`+`${key}`,this.attribute,{withCredentials : true}).then((response) => {
        console.log(response);
      })
    },
}
}
</script>
