<template>
	<div class="justify-content-center">
		<b-col>
			<treeselect v-model="value" @select="select" :multiple="false" :options="data" />
		</b-col>
	</div>
</template>
<script>
import apiUrl from '@/apiUrl'
import axios from 'axios'
import Vue from 'vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	export default {
		components : {
			Treeselect
		},
		data : function () {
			return {
				value:null,
				id:null,
				data:[{
				}]
			};
		},
		mounted() {
			axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
				this.data = this.list_to_tree(res.data)
			});
		},
		methods : {
			list_to_tree(list) {
		      var map = {}, node, roots = [], i;
		      for (i = 0; i < list.length; i += 1) {
		          map[list[i]._id] = i; // initialize the map
		          list[i].children = []; // initialize the children
		      }
		      for (i = 0; i < list.length; i += 1) {
		          node = list[i];
		          if (node.parent_department != undefined ) {
		              // if you have dangling branches check that map[node.parentId] exists
		              list[map[node.parent_department]].children.push(node);
		          } else {
		              roots.push(node);
		          }
		      }
		      this.convertData(roots)
		      return roots
		  },
		  convertData(roots) {
		  	for(var i=0;i<roots.length;i++) {
		      	if(roots[i].children.length !=0) {
		      		this.convertData(roots[i].children);
		      	}
		      	roots[i].id = roots[i]._id;
			    roots[i].label = roots[i].department_name;
				delete roots[i]._id;
				delete roots[i].department_name;
		      }
		  },
		  select(args) {
		  	console.log(args.id)
		  },
		}
	};
</script>