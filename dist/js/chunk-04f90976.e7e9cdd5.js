(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04f90976"],{"5b84":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{className:"animated"}},[n("router-link",{attrs:{to:{name:"Add Company"}}},[n("b-btn",{attrs:{variant:"primary"},domProps:{textContent:t._s(t.$ml.get("addcompany"))}})],1),n("br"),n("br"),n("router-link",{attrs:{to:{name:"Add User"}}},[n("b-btn",{attrs:{variant:"primary"},domProps:{textContent:t._s(t.$ml.get("adduser"))}})],1),n("br"),n("br"),n("router-link",{attrs:{to:{name:"User List"}}},[n("b-btn",{attrs:{variant:"primary"},domProps:{textContent:t._s(t.$ml.get("getallusers"))}})],1)],1)},r=[],o=(n("96cf"),n("3b8d")),s=n("a026"),i=n("9ebe"),c=n("e19c");s["default"].use(i["ClientTable"]);var l={name:"CompanyList",components:{ClientTable:i["ClientTable"],Event:i["Event"]},data:function(){return{columns:["company_name","company_type"],data:[],options:{headings:{siteid:"Site Name",Owner:"Owner",Group_Chat_Allowed:"Group Chat Allowed",url:"URL",_id:"URI"},sortable:["company_name","company_type"],filterable:["company_name","company_type"],sortIcon:{base:"fa",up:"fa-sort-asc",down:"fa-sort-desc",is:"fa-sort"},pagination:{chunk:5,edge:!1,nav:"scroll"}},useVuex:!1,theme:"bootstrap4",template:"default"}},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:axios({method:"GET",url:"".concat(c["a"])+"company/list",headers:{withCredentials:"true"}}).then(function(t){e.data=t.data},function(t){console.error(t)});case 1:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}(),methods:{onRowClick:function(t){window.location.href="#/company/".concat(t.row._id)}}},u=l,m=n("2877"),p=Object(m["a"])(u,a,r,!1,null,null,null);e["default"]=p.exports},e19c:function(t,e,n){"use strict";var a="http://127.0.0.1:3000/api/";e["a"]=a}}]);
//# sourceMappingURL=chunk-04f90976.e7e9cdd5.js.map