(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4e4f"],{"91bc":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"animated slideInLeft",staticStyle:{"animation-duration":"100ms"}},["smtp"==t.key?s("div",[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("strong",{domProps:{textContent:t._s(t.key)}}),t._v(" "),s("span",{domProps:{textContent:t._s(t.$ml.get("settings"))}})]),s("b-form",{on:{submit:function(e){return e.preventDefault(),t.sendData(t.key)}}},[s("b-form-group",{attrs:{label:t.$ml.get("useremail"),"label-for":"basicEmail","label-cols":3,horizontal:!0}},[s("b-form-input",{attrs:{id:"basicEmail",type:"email",placeholder:t.$ml.get("useremail"),autocomplete:"email"},model:{value:t.smtp.user_email,callback:function(e){t.$set(t.smtp,"user_email",e)},expression:"smtp.user_email"}})],1),s("b-form-group",{attrs:{label:t.$ml.get("password"),"label-for":"basicPassword","label-cols":3,horizontal:!0}},[s("b-form-input",{attrs:{id:"basicText",type:"password",placeholder:t.$ml.get("password")},model:{value:t.smtp.user_password,callback:function(e){t.$set(t.smtp,"user_password",e)},expression:"smtp.user_password"}})],1),s("b-form-group",{attrs:{description:t.$ml.get("pholdconnection"),label:t.$ml.get("connection"),"label-for":"basicSelect","label-cols":3,horizontal:!0}},[s("b-form-select",{staticClass:"connection",attrs:{id:"basicSelect",plain:!0,options:["Please select","Secured","Normal"],value:"Please select"},model:{value:t.smtp.connection,callback:function(e){t.$set(t.smtp,"connection",e)},expression:"smtp.connection"}})],1),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("b-button",{attrs:{type:"submit",size:"sm",variant:"primary"},domProps:{textContent:t._s(t.$ml.get("submit"))}},[s("i",{staticClass:"fa fa-dot-circle-o"})]),s("router-link",{attrs:{to:{path:"/sites"}}},[s("b-button",{attrs:{type:"reset",size:"sm",variant:"danger"},domProps:{textContent:t._s(t.$ml.get("reset"))}},[s("i",{staticClass:"fa fa-ban"})])],1)],1)],1)],1)],1):t._e(),"sms"==t.key?s("div",[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("strong",{domProps:{textContent:t._s(t.key)}}),t._v(" "),s("span",{domProps:{textContent:t._s(t.$ml.get("settings"))}})]),s("b-form",{on:{submit:function(e){return e.preventDefault(),t.sendData(t.key)}}},[s("b-form-group",{attrs:{label:t.$ml.get("sendername"),"label-for":"basicEmail","label-cols":3,horizontal:!0}},[s("b-form-input",{attrs:{id:"basicEmail",type:"text",maxlength:"6",placeholder:t.$ml.get("pholdsendername"),autocomplete:"email"},model:{value:t.sms.sender_name,callback:function(e){t.$set(t.sms,"sender_name",e)},expression:"sms.sender_name"}})],1),s("b-form-group",{attrs:{label:t.$ml.get("authkey"),"label-for":"basicName","label-cols":3,horizontal:!0}},[s("b-form-input",{attrs:{id:"basicName",type:"password",autocomplete:"password",placeholder:t.$ml.get("pholdauthkey"),name:"fullname"},nativeOn:{keyup:function(e){return t.allLetter(e)}},model:{value:t.sms.api_key,callback:function(e){t.$set(t.sms,"api_key",e)},expression:"sms.api_key"}})],1),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("b-button",{attrs:{type:"submit",size:"sm",variant:"primary"},domProps:{textContent:t._s(t.$ml.get("submit"))}},[s("i",{staticClass:"fa fa-dot-circle-o"})]),s("router-link",{attrs:{to:{path:"/sites"}}},[s("b-button",{attrs:{type:"reset",size:"sm",variant:"danger"},domProps:{textContent:t._s(t.$ml.get("reset"))}},[s("i",{staticClass:"fa fa-ban"})])],1)],1)],1)],1)],1):t._e(),"sendgrid"==t.key?s("div",[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("strong",{domProps:{textContent:t._s(t.key)}}),t._v(" "),s("span",{domProps:{textContent:t._s(t.$ml.get("settings"))}})]),s("b-form",{on:{submit:function(e){return e.preventDefault(),t.sendData(t.key)}}},[s("b-form-group",{attrs:{label:t.$ml.get("authkey"),"label-for":"basicName","label-cols":3,horizontal:!0}},[s("b-form-input",{attrs:{id:"basicName",type:"password",autocomplete:"name",placeholder:t.$ml.get("pholdauthkey"),name:"fullname"},nativeOn:{keyup:function(e){return t.allLetter(e)}},model:{value:t.sendgrid.api_key,callback:function(e){t.$set(t.sendgrid,"api_key",e)},expression:"sendgrid.api_key"}})],1),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("b-button",{attrs:{type:"submit",size:"sm",variant:"primary"},domProps:{textContent:t._s(t.$ml.get("submit"))}},[s("i",{staticClass:"fa fa-dot-circle-o"})]),s("router-link",{attrs:{to:{path:"/sites"}}},[s("b-button",{attrs:{type:"reset",size:"sm",variant:"danger"},domProps:{textContent:t._s(t.$ml.get("reset"))}},[s("i",{staticClass:"fa fa-ban"})])],1)],1)],1)],1)],1):t._e()])},o=[],n=(s("b54a"),s("28a5"),s("bc3a")),r=s.n(n),l=s("e19c"),i={name:"SettingEdit",components:{},data:function(){return{link:"",key:"",smtp:{user_email:"",user_password:"",connection:""},sms:{sender_name:"",api_key:""},sendgrid:{api_key:""}}},mounted:function(){var t=this;this.link=window.location.href,this.key=this.link.split("settings/",24).pop(),console.log(this.key),r.a.get("".concat(l["a"])+"super/settings/"+"".concat(this.key,"/")+"view",{withCredentials:!0}).then(function(e){console.log(e.data),"smtp"==t.key&&(t.smtp=e.data),"sms"==t.key&&(t.sms=e.data),"sendgrid"==t.key&&(t.sendgrid=e.data)})},methods:{sendData:function(t){"smtp"==t&&r.a.put("".concat(l["a"])+"super/settings/"+"".concat(t,"/")+"update",this.smtp,{withCredentials:!0}).then(function(t){console.log(t.data)}),"sms"==t&&r.a.put("".concat(l["a"])+"super/settings/"+"".concat(t,"/")+"update",this.sms,{withCredentials:!0}).then(function(t){console.log(t.data)}),"sendgrid"==t&&r.a.put("".concat(l["a"])+"super/settings/"+"".concat(t,"/")+"update",this.sendgrid,{withCredentials:!0}).then(function(t){console.log(t.data)})}}},m=i,c=s("2877"),d=Object(c["a"])(m,a,o,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0e4e4f.1ac2ee82.js.map