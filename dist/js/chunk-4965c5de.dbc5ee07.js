(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4965c5de"],{6041:function(e,t,n){"use strict";var a=n("6611"),i=n.n(a);i.a},6611:function(e,t,n){},e9c0:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{className:"animated fadeIn"}},[n("b-card",[n("b-card-header",[n("span",{domProps:{textContent:e._s(e.$ml.get("customattributes"))}})]),n("b-card-body",[n("v-client-table",{attrs:{columns:e.columns,data:e.data,options:e.options,theme:e.theme,id:"dataTable"},on:{"row-click":e.onRowClick},scopedSlots:e._u([{key:"_id",fn:function(e){return n("router-link",{staticClass:"icon-eye",attrs:{target:"_blank",to:"user/drtails/"+e.row._id}})}}])})],1)],1)],1)},i=[],o=(n("96cf"),n("3b8d")),r=n("a026"),c=n("9ebe"),s=n("bc3a"),l=n.n(s),d=n("e19c");r["default"].use(c["ClientTable"]);var u={name:"DataTable",components:{ClientTable:c["ClientTable"],Event:c["Event"]},data:function(){return{columns:["context","field_name","field_type","description"],data:[],options:{headings:{context:"Context",field_name:"Field Name",feild_type:"Field Type",description:"Description"},sortable:["context","field_name","field_type","description"],filterable:["context","field_name","field_type","description"],sortIcon:{base:"fa",up:"fa-sort-asc",down:"fa-sort-desc",is:"fa-sort"},pagination:{chunk:5,edge:!1,nav:"scroll"}},useVuex:!1,theme:"bootstrap4",template:"default"}},mounted:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:l.a.get("".concat(d["a"])+"super/attrib/view/",{withCredentials:!0}).then(function(e){t.data=e.data});case 1:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),methods:{onRowClick:function(e){window.location.href="#/attribute/details/".concat(e.row._id)}}},f=u,p=(n("6041"),n("2877")),b=Object(p["a"])(f,a,i,!1,null,null,null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-4965c5de.dbc5ee07.js.map