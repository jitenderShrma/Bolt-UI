<template>
  <div class="animated slideInLeft" style="animation-duration:100ms">
	<b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <span v-text="$ml.get('approvalform')"></span>
          </div>
          <div v-if="!loader">
          <b-form action="UserList" v-on:keydown.enter.prevent="prevent" v-on:submit.prevent="sendData">
          <b-form-group
            :label="$ml.get('transactype')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-row>
            <b-col sm="4">
            <cool-select
                v-validate="'required'"
                v-model="input.approval_type"
                :items="types"
                name="ApprovalType"
                :placeholder="$ml.get('pholdapprovaltype')"
               >
              </cool-select>
              <span id="errors">{{ errors.first('ApprovalType') }}</span>
            </b-col>
          </b-row>
          </b-form-group>
          <div v-if="input.approval_type == 'Recurring'">
            <!-- <b-form-group
            :label="$ml.get('recurringrate')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                   <ejs-textbox type="number" v-model="input.recurring_rate" floatLabelType="Auto" :placeholder="$ml.get('pholdrecurringrate')"></ejs-textbox>
                </b-form-group>
                
                </b-col>
              </b-row>
            </b-form-group> -->
            <b-form-group
            :label="$ml.get('recurringperiod')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
            <b-form-group>
                   <ejs-textbox @change="validateMonth" type="number" v-model="input.recurring_period" floatLabelType="Auto" :placeholder="$ml.get('pholdrecurringperiod')"></ejs-textbox>
                </b-form-group>
              </b-col>
              <b-col sm="4" class="py-4 px-0">
                <span>month</span><span v-if="input.recurring_period > 1">s</span> 
              </b-col>
            </b-row>
          </b-form-group>
          </div>
          <b-form-group
              :label="$ml.get('month')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="4">
              <cool-select
                v-validate="'required'"
                name="Month"
                v-model="input.month"
                :items="month"
                item-text="name"
                item-value="value"
                :placeholder="$ml.get('pholdmonth')"
               >
              </cool-select>
              <span id="errors">{{ errors.first('Month') }}</span>
            </b-col>
          </b-row>
            </b-form-group>
          <b-form-group
              :label="$ml.get('department')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                    <treeselect :default-expand-level="10" :placeholder="$ml.get('pholddept')" v-model="input.department" :multiple="false" :options="department" />
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              :label="$ml.get('head')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
                <b-col sm="4">
                  <treeselect :default-expand-level="10" required :placeholder="$ml.get('pholdhead')" v-model="input.budget_head" :multiple="false" :options="head" />
                </b-col>
              </b-row>
            </b-form-group>
            
            <b-form-group
              :label="$ml.get('approvalamount')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-row>
              <b-col sm="2">
              <ejs-textbox type="number" @change="validateAmount" floatLabelType="Auto" v-model="input.amount"  :placeholder="$ml.get('pholdapprovalamount')" :required="validate"></ejs-textbox>
            </b-col>
            <b-col sm="2">
              <br>
              <i class="fa fa-rupee font-2xl"></i>
              &nbsp;
              &nbsp;
              &nbsp;
            </b-col>
          </b-row>
            </b-form-group>
          <b-form-group
            :label="$ml.get('reqforquote')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                  <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="input.request_for_quote" @change="changeVerified" :uncheckedValue="false" :checkedValue="true"/>
                </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
            :label="$ml.get('description')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true"
            >
            <b-row>
              <b-col sm="4">
              <b-form-group>
                   <ejs-textbox v-model="input.description" :multiline="true" floatLabelType="Auto" :placeholder="$ml.get('placeholderdescription')"></ejs-textbox>
                </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
            :label="$ml.get('labels')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
              <b-row>
                <b-col sm="4">
                    <!-- <div v-for="(run,i) in input.labels" :key="i">
                      <b-row>
                      <b-col>
                      <b-badge style="font-weight:400;margin:5px;font-size:15px;" :variant="input.labels[i].color">{{input.labels[i].label_name}}</b-badge>
                    </b-col>
                    <b-col>
                      <b-btn v-on:click="editLabeladd(input.labels[i])" size="sm" variant="primary" v-text="$ml.get('edit')"></b-btn>
                    </b-col>
                    <b-col>
                      <b-btn v-on:click="delLabeladd(`${input.labels[i]._id}`,`${input._id}`,`${i}`)" size="sm" variant="danger"><i class="fa fa-trash-o"></i></b-btn>
                    </b-col>
                  </b-row>
                    </div> --><!-- 
                    <b-form v-on:submit.prevent = "selectLabeladd(`${input._id}`)"> -->
                     <!--  <label v-text="$ml.get('labels')"></label> -->
                      <treeselect @change="selectLabeladd(`${input._id}`)" :placeholder="$ml.get('pholdlabel')" v-model="input.labels" :multiple="true" :options="labels" >
                        <div slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
                          <b-badge style="font-weight:lighter" :variant="node.raw.color">{{node.raw.label}}</b-badge>
                        </div>
                        <div slot="value-label" slot-scope="{ node }"><b-badge style="font-weight:lighter" :variant="node.raw.color">{{node.raw.label}}</b-badge></div>
                      </treeselect>
                      <!-- <cool-select menuItemsMaxHeight="100px" :items="labels" item-text="label_name" item-value="_id" v-model="selectedLabel">
                        <div slot="item" slot-scope = "{item :label}">
                          <b-badge style="font-weight:100;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="selection" slot-scope = "{item :label}">
                          <b-badge style="font-weight:100;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="after-items-fixed">
                          <b-btn block @click="addModal = true" variant="primary" v-text="$ml.get('label')"></b-btn>
                        </div>
                      </cool-select> --><!-- 
                      <br>
                        <div slot="footer">
                          <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('add')"><i class="fa fa-dot-circle-o"></i></b-button>
                        </div>
                    </b-form> -->
                  </b-col>
                </b-row>
                  </b-form-group>
           <div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
          </div>
          </b-form>
          <b-modal size="sm" :title="$ml.get('label')" class="modal-primary" v-model="addModal" @ok="addModal = false" hide-footer>
              <b-form v-on:submit.prevent="addLabel(`${editinput._id}`)">
              <div class="content-wrapper textbox-default">
              <div class="row">
              <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                      <ejs-textbox v-model="formdata.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
              </div>
              </div>
              </div>
              <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </div>
                </b-form>
            </b-modal>
            <b-modal size="sm" :title="$ml.get('editlabel')" class="modal-primary" v-model="editlabelmodal" @ok="editlabelmodal = false" hide-footer>
              <b-form v-on:submit.prevent="editdeptLabel(`${editinput._id}`)">
              <div class="content-wrapper textbox-default">
              <div class="row">
              <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                      <ejs-textbox v-model="editlabel.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
              </div>
              </div>
              <br>
              <div class="row">
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <p>Label Color</p>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                          <ejs-colorpicker :modeSwitcher="false" :value="editlabel.color" mode="Palette" :columns="squarePalettesColn" :presetColors="circlePaletteColors" :change="onChange" id="color-picker"></ejs-colorpicker>
                  </div>
              </div>
              <br>
              <div class="multiline_wrapper">
                  <ejs-textbox v-model="editlabel.description" ref="textareaObj" id="default" :multiline="true" floatLabelType="Auto" placeholder="Description" required></ejs-textbox>
              </div>
              </div>
              <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </div>
                </b-form>
            </b-modal>
        </div>
          <div v-else>
            <div class="justify-content-center">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          </div>
          </div>
        </b-card>
        </b-col>
    </b-row>
  </div>
</template>
<script>
  import apiUrl from '@/apiUrl';
  import axios from 'axios';
  import Vue from 'vue';
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { CoolSelect } from 'vue-cool-select'
  import { Switch as cSwitch } from '@coreui/vue'
  import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
  import VueNotifications from 'vue-notifications'
  import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

  const toastTypes = {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
  }

  miniToastr.init({types: toastTypes})

  function toast ({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
  }

  const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
  }

  Vue.use(VueNotifications, options)
  Vue.use(TextBoxPlugin);
  
	export default {
		name : 'AddApproval',
		components : {
      CoolSelect,
      cSwitch,
      Treeselect
		},
		data: function() {
			return {
          verified:false,
  				input:{
  					department:null,
            approval_type:"",
            recurring_rate:"",
            budget_head:null,
            month:"",
            amount:"",
            request_for_quote:"",
            description:"",
            labels:[]
  				},
          addModal:false,
          validate:true,
  				types:[
            "One Time","Recurring"
  				],
  				category:[
  					"Purchase Order","Bill","Invoice","Reimburstement"
  				],
          month:[ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"}
          ],
          labels:[],
          editlabelmodal:false,
          editlabel:{},
          formdata: {
                  label_name : "",
                  color : "2196f3",
                  context : "Approval",
                  description : ""
                },
          editinput:{
          },
          editmodal:false,
          selectedLabel:null,
            module:null,
            isRoot:false,
            squarePalettesColn: 7,
        circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
          department:[
          ],
          or_head:[],
          dept:[],
          approvals :[
          ],
          head:[],
          loader:false
			}
		},
		async mounted() {
      axios.get(`${apiUrl}`+`label/label/find/by/Approval`,{withCredentials:true}).then((res) => {
        this.labels = this.convertDataLabel(res.data)
        console.log(this.labels)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
       //Set months
      var rest_months = this.month.slice(0,new Date().getMonth())
      var select_month = this.month.splice(new Date().getMonth(),12)
      for(var i=0;i<rest_months.length;i++) {
                rest_months[i].name = `${rest_months[i].name} - ${new Date().getFullYear()+1}`
              }
              for(var i=0;i<select_month.length;i++) {
                select_month[i].name = `${select_month[i].name} - ${new Date().getFullYear()}`
              }
              this.month = select_month.concat(rest_months)
      // Department Tree
      axios.get(`${apiUrl}`+`dropdown/department/get/all`,{withCredentials:true}).then((res) => {
        this.dept = JSON.parse(JSON.stringify(res.data))
        this.department = this.list_to_tree_dept(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
      // Head Tree
      axios.get(`${apiUrl}`+`head/head/get`,{withCredentials:true}).then((res) => {
        console.log(res.data);
        this.or_head = JSON.parse(JSON.stringify(res.data))
        this.head = this.list_to_tree_head(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      }
      })
		},
    watch : {
      // Change Heads Based on Department
      'input.department' : function() {
        if(this.input.department == null || this.input.department == "") {
          axios.get(`${apiUrl}dropdown/head/no/dept`,{withCredentials:true}).then((res) => {
            this.or_head = JSON.parse(JSON.stringify(res.data))
            this.head = this.list_to_tree_head(res.data)
          })
        }
        else {
          axios.get(`${apiUrl}dropdown/head/find/${this.input.department}`,{withCredentials:true}).then((res) => {
            this.or_head = JSON.parse(JSON.stringify(res.data))
            this.head = this.list_to_tree_head(res.data)
          })
        }
      }
    },
		methods : {
      editLabeladd(args) {
      this.editlabelmodal = true
      this.editlabel._id = args._id
      this.editlabel.label_name = args.label_name
      this.editlabel.description =args.description
      this.editlabel.color =`#`+`${args.color}`
    },
    delLabeladd(args,id,label) {
      console.log(this.input.labels.splice(label,1))
    },
    selectLabeladd(args) {
        if(this.selectedLabel != null) {
        var label;
        axios.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`,{withCredentials:true}).then((res) => {
          label = res.data
          this.input.labels.push(label);
          console.log(this.input.labels)
        })
      }
      },
      addLabel (args) {
      this.addModal =false
              axios.post(`${apiUrl}`+`label/label/create`,this.formdata,{withCredentials:true}).then((label)=>{
                var id = {
                  labels :  label.data._id
                }
                  axios.get(`${apiUrl}`+`label/label/find/by/Approval`,{withCredentials:true}).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.editinput.labels)
              })
      },
      onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
        this.editlabel.color = args.currentValue.hex.slice(1);
      }, 
      list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined  && this.checkExistDept(node.parent_department)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_department]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDept(roots)
          return roots
      },
      convertDataDept(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDept(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].department_name;
        delete roots[i]._id;
        delete roots[i].department_name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
      convertDataLabel(roots) {
        for(var i=0;i<roots.length;i++) {
          roots[i].id = roots[i]._id;
          roots[i].label = roots[i].label_name;
          roots[i].raw = roots[i].color;
        delete roots[i]._id;
        delete roots[i].label_name;
        }
        return roots
      },
      checkExistDept(node) {
        for (var i=0; i < this.dept.length; i++) {
            if (this.dept[i]._id == node)
                return true;
        }
        return false;
      },
      checkExistHead(node) {
        for (var i=0; i < this.or_head.length; i++) {
            if (this.or_head[i]._id == node)
                return true;
        }
        return false;
      },
      list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined && this.checkExistHead(node.parent_head)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_head]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataHead(roots)
          return roots
      },
      convertDataHead(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataHead(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].name;
        delete roots[i]._id;
        delete roots[i].name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
        sendData() {
          this.$validator.validate().then(valid => {
            if (!valid) {

            }
            else{
              parseInt(this.input.recurring_period)
              console.log(this.input)
              axios.post(`${apiUrl}`+`approvals/preApp/create`,this.input,{withCredentials:true}).then((res) => { 
                if(res.data.message) {
                  toast({
                    type: VueNotifications.types.error,
                    title: 'Error',
                    message: 'Transaction Amount Error'
                    })
                 }
                 else{ 
                 this.loader = true
                 setTimeout(function(){window.location.href = ('#/finance/approval/view/all')},2000)
                }
              })
            }
          });
          },
        validateAmount(args) {
          if(args.value>this.boundaryAmount || args.value<0) {
            this.input.amount = this.boundaryAmount
          }
          if(args.value==0) {
            this.input.amount = 1;
          }
        },
        changeFields(args) {
          console.log(args.itemData)
          if(this.input.month!=null) {
            this.boundaryAmount = args.itemData.amount_left[this.input.month]
          }
        },
        prevent(args) {
          this.changeFields(args)
        },
        changeVerified(args) {
          if(!args) {
            this.verified = false
          }
        },
        validateMonth(args) {
          if(args.value>12) {
            this.input.recurring_period = 12
          }
          if(args.value<=0) {
            this.input.recurring_period= 1
          }
        }
      
    }
	};
</script>
<style>
#errors {
  color:red;
}
  .e-ddl .e-dropdownbase .e-fixed-head {
  visibility: hidden;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 50px #7ac142;
  }
}
.badge-f44336 {
    background-color:#f44336;
    color:white;
  }
  .badge-e91e63{
    background-color:#e91e63;
    color:white;
  }
  .badge-9c27b0{
    background-color:#9c27b0;
    color:white;
  }
  .badge-673ab7{
    background-color:#673ab7;
    color:white;
  }
  .badge-2196f3{
    background-color:#2196f3;
    color:white;
  }
  .badge-03a9f4{
    background-color:#03a9f4;
    color:white;
  }
  .badge-00bcd4{
    background-color:#00bcd4;
    color:white;
  }
  .badge-009688{
    background-color:#009688;
    color:white;
  }
  .badge-8bc34a{
    background-color:#8bc34a;
    color:white;
  }
  .badge-cddc39{
    background-color:#cddc39;
    color:black;
  }
  .badge-ffeb3b{
    background-color:#ffeb3b;
    color:black;
  }
  .badge-ffc107{
    background-color:#ffc107;
    color:black;
  }
</style>