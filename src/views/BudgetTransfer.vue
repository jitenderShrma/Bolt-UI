<template>
	<div class="animated slideInLeft" style="animation-duration:100ms">
		<b-row>
      <b-col md="12">
        <b-card style="height:76vh" class="justify-content-center">
          <div slot="header">
            <span v-text="$ml.get('approvalform')"></span>
          </div>
		<b-form v-on:submit.prevent="transferBudget">
			<b-row>
				<b-col sm="4">
					<b-form-group
		              :label="$ml.get('month')">
		              <span style="color:red;float:right;height:2px;font-size:20px">*</span>
		              <cool-select
		              	v-validate="'required'"
		              	name="Month"
		                v-model="input.month"
		                :items="months"
		                item-text="name"
		                item-value="value"
		                :placeholder="$ml.get('pholdmonth')"
		               >
		              </cool-select>
		              <span id="errors">{{ errors.first('Month') }}</span>
		          </b-form-group>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col>
					<label v-text="$ml.get('sourcehead')"></label>
					<span style="color:red;float:right;height:2px;font-size:20px">*</span>
					<treeselect @select="head1update" required :default-expand-level="10" :placeholder="$ml.get('pholdsourcehead')" v-model="input.source_head" :multiple="false" :options="heads1" />
					<span v-if="head1">Total : {{head1.total}} Remaining : {{head1.remaining}}</span>
				</b-col>
				<i class="fa fa-angle-double-right font-3xl" style="margin-top:30px;"></i>
				<b-col>
					<label v-text="$ml.get('desthead')"></label>
					<span style="color:red;float:right;height:2px;font-size:20px">*</span>
					<treeselect @select="head2update" required :default-expand-level="10" :placeholder="$ml.get('pholddesthead')" v-model="input.destination_head" :multiple="false" :options="heads2" />
					<span v-if="head2">Total : {{head2.total}} Remaining : {{head2.remaining}}</span>
				</b-col>
			</b-row>
			<br>
			<b-row>
				<b-col sm="4">
					<span style="color:red;float:right;height:2px;font-size:20px">*</span>
					<ejs-textbox @change="validateAmount" required type="number" v-model="input.amount" floatLabelType="Auto" :placeholder="$ml.get('amount')"></ejs-textbox>
				</b-col>
			</b-row>
			<div slot="footer">
              <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
	        </div>
		</b-form>
	</b-card>
	</b-col>
	</b-row>
	</div>
</template>
<script>
	import Vue from 'vue' 
	import { CoolSelect } from 'vue-cool-select'
	import Treeselect from '@riophae/vue-treeselect'
	import { DropDownList, DropDownListPlugin} from '@syncfusion/ej2-vue-dropdowns';
	import axios from 'axios'
	import apiUrl from '@/apiUrl'
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
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
	//  VueNotifications.setPluginOptions(options)

	Vue.use(VueNotifications, options)
	Vue.use(TextBoxPlugin)
	Vue.use(DropDownListPlugin)
	var api = axios.create({
		withCredentials:true
	});
	export default {
		components :{
			Treeselect,
			CoolSelect
		},
		data: function() {
			return {
				head1:{},
				head2:{},
				heads1:[],
				heads2:[],
				input:{},
				months:[ {name:"January",value:"0"},{name:"February",value:"1"},{name:"March",value:"2"},{name:"April",value:"3"},{name:"May",value:"4"},{name:"June",value:"5"},{name:"July",value:"6"},{name:"August",value:"7"},{name:"September",value:"8"},{name:"October",value:"9"},{name:"November",value:"10"},{name:"December",value:"11"},

          		],
          		or_head:[],
          		month_fields:{text:"name",value:"text"}
			}
		},
		mounted() {
			this.months.splice(0,new Date().getMonth())
			api.get(`${apiUrl}`+`head/head/get`)
		    .then((response) => {
		    	this.or_head = JSON.parse(JSON.stringify(response.data))
		      this.heads1 = this.list_to_tree_head(response.data)
		      this.heads2 = JSON.parse(JSON.stringify(this.heads1))
		      }).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      });
		},
		methods:{
			head1update(args,args2) {
				// console.log(args)
				// if(this.input.month) {
				// 	this.head1={}
				// 	for(var i=0;i<this.heads1.length;i++) {
				// 		if(args == this.heads1[i].id) {
				// 			this.head1.total = this.heads1[i].permissible_values[this.input.month]
				// 			this.head1.remaining = this.heads1[i].amount_left[this.input.month]
				// 			break;
				// 		}
				// 	}
							this.head1.total = args.permissible_values[this.input.month]
							this.head1.remaining = args.amount_left[this.input.month]
					// api.get(`${apiUrl}head/head/view/one/${this.input.source_head}`).then((resp) => {
					// 	this.head1.total = resp.data.permissible_values[this.input.month]
					// 	this.head1.remaining = resp.data.amount_left[this.input.month]
					// })
				// }
			},
			validateAmount(args) {
				if(args.value <=0) {
					this.input.amount = 1
				}
				if(args.value >this.head1.remaining) {
					this.input.amount = this.head1.remaining
				}

			},
			head2update(args,args2) {
				// if(this.input.month) {
				// 	for(var i=0;i<this.heads2.length;i++) {
				// 		if(args == this.heads2[i].id) {
				// 			this.head2.total = this.heads2[i].permissible_values[this.input.month]
				// 			this.head2.remaining = this.heads2[i].amount_left[this.input.month]
				// 			break;
				// 		}
				// 	}
				// }
				this.head2.total = args.permissible_values[this.input.month]
				this.head2.remaining = args.amount_left[this.input.month]
			},
			transferBudget() {
				this.$validator.validate().then(valid => {
		            
						api.post(`${apiUrl}transfer/budtrans/budget/monthly`,this.input).then((res)=> {
							console.log(res)
								toast({
									type: VueNotifications.types.success,
				                    title: 'Request Sent',
				                    message: 'Request for Budget Transfer is Sent'
								})
								this.input = {}
						}).catch((err)=> {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
      })
				
				})
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
		}
	};
</script>
<style>
	#errors {
  color:red;
}
</style>