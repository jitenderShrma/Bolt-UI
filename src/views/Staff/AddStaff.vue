<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong v-text="$ml.get('add')"></strong>&nbsp;<span v-text="$ml.get('staff')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="sendData">
            <b-tabs @input="checkTab">
              <b-tab :title="$ml.get('staffdetails')">
          <b-form-group
            :label="$ml.get('useraccountdetails')"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="User Name" v-model="input.user_name" floatLabelType="Auto" :placeholder="$ml.get('username')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <label v-text="$ml.get('department')"></label>
            <treeselect :placeholder="$ml.get('pholddept')" v-model="staff.department" :multiple="false" :options="department" />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <span style="color:red;float:right;height:20px;font-size:20px">*</span>
            <ejs-textbox required name="Password" v-validate="'required'" type="password" v-model="input.password" floatLabelType="Auto" :placeholder="$ml.get('password')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <span style="color:red;float:right;height:5px;font-size:20px;">*</span>
            <label v-text="$ml.get('designation')"></label>
              <treeselect required :placeholder="$ml.get('pholddesig')" v-model="staff.designation" @select="setUserGroup" :multiple="false" :options="designation" />
          </b-col>
        </b-row>
          </b-form-group>
          <b-form-group
            :label="$ml.get('personaldetails')"
            :label-cols="3"
            :horizontal="true">
            <b-row>
              <b-col sm="6">
                <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="Name" v-model="input.name" floatLabelType="Auto" :placeholder="$ml.get('pholdname')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required type="number" v-model="addresslist.phone" floatLabelType="Auto" :placeholder="$ml.get('phone')"></ejs-textbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <span style="color:red;float:right;height:2px;font-size:20px">*</span>
            <ejs-textbox required name="Email" type="email" v-model="input.email" floatLabelType="Auto" :placeholder="$ml.get('email')"></ejs-textbox>
          </b-col>
          
        </b-row>
        <b-btn style="float:right;" size="sm" href="#" v-b-toggle.personaldetails variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
        <b-collapse id="personaldetails" accordion="my-accordion">
        
        <b-row>
          <b-col sm="6">
            <ejs-textbox v-model="input.mothers_name" floatLabelType="Auto" :placeholder="$ml.get('fathersname')"></ejs-textbox>
          </b-col>
          <b-col sm="6">
            <ejs-textbox v-model="input.fathers_name" floatLabelType="Auto" :placeholder="$ml.get('mothersname')"></ejs-textbox>
          </b-col>
        </b-row>
        <b-row>
              <b-col sm="4">
                <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="input.blood_group" :allowFiltering="true" :dataSource='bloodgroup' popupHeight='300' :placeholder="$ml.get('bloodgroup')"></ejs-dropdownlist>
              </b-col>
              <b-col sm="4">
                <br>
                <b-button type="button" size="sm" variant="primary" @click="idmodal = true"  class="mr-1" v-text="$ml.get('addidentifications')"></b-button>
              </b-col>
              <b-col v-if="input.identification.length!=0" sm="2">
                <br>
                <div v-for="(run,index) in input.identification" :key="index">
                <div class="e-input-group">
                    <input class="e-input" type="text" :value="input.identification[index].id_type" readonly="">
                </div>
              </div>
              </b-col>
              <b-col v-if="input.identification.length!=0" sm="2">
                <br>
                <b-button type="button" size="sm" variant="danger" @click="deleteId"  class="mr-1"><i class="fa fa-trash-o"></i></b-button>
              </b-col>
            </b-row>
          </b-collapse> 
      </b-form-group>
        <b-form-group
              :label="$ml.get('educationqual')"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
                <b-row>
                  <b-col sm="3">
                    <label v-text="$ml.get('undergraduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="UG"  :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="UG">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[0].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col  sm="3">
                    <label v-text="$ml.get('graduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="G" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="G">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[1].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col sm="3">
                    <label v-text="$ml.get('postgraduate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="PG" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div v-if="PG">
                       <div class="multiline_wrapper">
                      <ejs-textbox :multiline="true" v-model="staff.education[2].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                  <b-col  sm="3">
                    <label v-text="$ml.get('doctorate')"></label>
                    <br>
                    <c-switch class="mx-1" color="primary" unchecked name="switch1" v-model="Doctrate" :uncheckedValue="false" :checkedValue="true"/>
                    <br>
                    <div class="multiline" v-if="Doctrate">
                       <div class="multiline_wrapper">
                      <ejs-textbox id="default" :multiline="true" v-model="staff.education[3].description" floatLabelType="Auto" :placeholder="$ml.get('description')"></ejs-textbox>
                    </div>
                    </div>
                  </b-col>
                </b-row>
              </b-form-group>
                  
          <b-row class="justify-content-center">
          <b-btn size="md" href="#" v-b-toggle.expand variant="primary"><i class="cui-chevron-bottom"></i>&nbsp;<span v-text="$ml.get('more')"></span></b-btn>
        </b-row>
          <b-collapse id="expand">
          <b-btn style="float:right" size="sm" href="#" v-b-toggle.address variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
          <b-form-group
            :label="$ml.get('address')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-collapse id="address" accordion="my-accordion">
            <ejs-textbox v-model="addresslist.compAdd" floatLabelType="Auto" :placeholder="$ml.get('addressline1')"></ejs-textbox>
            <b-row>
            <b-col sm="4">
            <ejs-textbox v-model="addresslist.state" floatLabelType="Auto" :placeholder="$ml.get('state')"></ejs-textbox>
          </b-col>
          <b-col sm="4">
            <ejs-textbox v-model="addresslist.zip" floatLabelType="Auto" :placeholder="$ml.get('postalcode')"></ejs-textbox>
          </b-col>
          <b-col sm="4">
            <ejs-dropdownlist :showClearButton="true" floatLabelType="Auto" v-model="addresslist.country" :allowFiltering="true" :fields="country_fields" :dataSource='countrylist' popupHeight='200' :placeholder="$ml.get('country')"></ejs-dropdownlist>
          </b-col>
          </b-row>
          </b-collapse>
          </b-form-group>
          <b-btn style="float:right" size="sm" href="#" v-b-toggle.bankdetails variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
          <b-form-group
            :label="$ml.get('bankaccountdetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-collapse id="bankdetails" accordion="my-accordion">
            <b-row>
              <b-col sm="6">
                <ejs-textbox v-model="input.account_holder_name" floatLabelType="Auto" :placeholder="$ml.get('accountholdername')"></ejs-textbox>
              </b-col>
              <b-col sm="6">
                <ejs-textbox type="number" v-model="input.account_number" floatLabelType="Auto" :placeholder="$ml.get('accountno')"></ejs-textbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <ejs-textbox v-model="input.bank_name" floatLabelType="Auto" :placeholder="$ml.get('bankname')"></ejs-textbox>
              </b-col>
              <b-col sm="4">
                <ejs-textbox v-model="input.branch" floatLabelType="Auto" :placeholder="$ml.get('branch')"></ejs-textbox>
              </b-col>
              <b-col sm="4">
                <ejs-textbox v-model="input.ifsc_code" floatLabelType="Auto" :placeholder="$ml.get('ifsc')"></ejs-textbox>
              </b-col>
            </b-row>
          </b-collapse>
          </b-form-group>
          <b-btn style="float:right" size="sm" href="#" v-b-toggle.pandetails variant="primary"><i class="cui-chevron-bottom"></i></b-btn>
          <b-form-group
            :label="$ml.get('pandetails')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-collapse id="pandetails" accordion="my-accordion">
              <b-row>
              <b-col sm="6">
                <ejs-textbox v-model="input.pan_number" floatLabelType="Auto" :placeholder="$ml.get('panno')"></ejs-textbox>
              </b-col>
              <b-col sm="6">
                <label v-text="$ml.get('pancopy')"></label>
                <b-form-file v-model="input.pan_upload" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
              </b-col>
            </b-row>
          </b-collapse>
            </b-form-group>
          </b-collapse>
          <div v-if="addattr.length!=0">
          <b-form-group
            :label="$ml.get('customattributes')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <div v-for="(run, index) in addattr" :key="index">
              <b-row v-if="addattr[index].field_type == 'Text' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="text" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'Email' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="email" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'Phone' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input type="phone" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
              <b-row v-if="addattr[index].field_type == 'TexArea' ">
                <label v-text="addattr[index].field_name"></label>
                <b-form-input :textarea="true" id="city" :placeholder="addattr[index].description"></b-form-input>
              </b-row>
            </div>
          </b-form-group>
          </div>
        </b-tab>
        <b-tooltip target="warning" title="Override Designation Permission"></b-tooltip>
          <b-tab :title="$ml.get('permissions')" id="warning">
        <div class="col-lg-15 control-section">
                  <div class="content-wrapper">
                       <div class="control-section">
                      <b-row>
                          <b-col style="padding-right:0px;padding-left:25px;">
                            <span v-text="$ml.get('modulename')"></span>
                          </b-col>
                          <b-col style="padding-right:0px;padding-left:25px;">
                            <span v-text="$ml.get('readown')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="readOwn" @change="setAllReadOwn" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('editown')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="editOwn" @change="setAllEditOwn" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('deleteown')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="deleteOwn" @change="setAllDeleteOwn" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px;">
                            <span v-text="$ml.get('readall')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="readAll"  @change="setAllReadAll" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('create')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="addAll" @change="setAllAdd" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('editall')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="editAll" @change="setAllEdit" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <span v-text="$ml.get('deleteall')"></span>
                            <br>
                            <span style="margin-bottom:10px;"></span>
                            <c-switch id="padded" size="sm" class="mx-1" color="primary" name="switch1" v-model="deleteAll" @change="setAllDelete" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col>
                            <span v-text="$ml.get('others')"></span>
                          </b-col>
                        </b-row>
                        <hr>
                        <div v-for="(run,i) in datasrc" :key="i">
                          <b-row style="margin:10px;">
                          <b-col style="padding-right:0px">
                            <span>{{datasrc[i].text}}</span>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_own" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_own" @change="setReadOwn(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].edit_own" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].edit_own" @change="setEditOwn(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].delete_own" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].delete_own" @change="setDeleteOwn(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_all" :uncheckedValue="false" :checkedValue="true" disabled/>
                          </div>
                          <div v-else>
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="additionalpermission[i].read_all" @change="setReadAll(`${i}`)" :uncheckedValue="false" :checkedValue="true"/>
                          </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].write" :uncheckedValue="false" :checkedValue="true"/>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].edit" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].edit" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                          </b-col>
                          <b-col style="padding-right:0px">
                            <div v-if="datasrc[i].module_name == 'importTrans'">
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].delete" :uncheckedValue="false" :checkedValue="true" disabled/>
                            </div>
                            <div v-else>
                              <c-switch size="sm" class="mx-1" color="primary" name="switch1" v-model="datasrc[i].delete" :uncheckedValue="false" :checkedValue="true"/>
                            </div>
                            
                          </b-col>
                          <b-col style="padding-right:0px;">
                            <b-tooltip target="exButton1" title="Additional Permissions Available!"></b-tooltip>
                            <div v-if="i==7">
                            <b-btn id="exButton1" variant="primary" size="sm" @click="toggle(`${i}`)"><i class="fa fa-plus-square"></i></b-btn>
                          </div>
                          <div v-else>
                            <b-btn id="exButton2" variant="primary" size="sm" @click="toggle(`${i}`)" disabled><i class="fa fa-plus-square"></i></b-btn>
                          </div>
                          </b-col>
                        </b-row>
                        </div>
                  </div>
              </div>
          </div>
      </b-tab>
    </b-tabs>
          <b-button type="button" variant="primary" @click="primaryModal = true" style="float:right" class="mr-1" v-text="$ml.get('customattributes')"></b-button>
           <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button type="reset" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
              </router-link>
          </div>
          </b-form>
          <b-modal :title="$ml.get('customattributes')" class="modal-primary" v-model="primaryModal" @ok="primaryModal = false" hide-footer>
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
          <input v-model="attribute.context" value="User" hidden>
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
          </b-modal>
        </b-card>
        </b-col>
    </b-row>
    <b-modal :title="$ml.get('addidentifications')" size="sm" class="modal-primary" v-model="idmodal" @ok="idmodal = false" hide-footer>
      <b-form v-on:submit.prevent="addId">
      <b-form-group>
        <ejs-dropdownlist :showClearButton="true" v-model="identification.id_type" :allowFiltering="true" :dataSource='idtype' popupHeight='200' :placeholder="$ml.get('idtype')"></ejs-dropdownlist>
        <div v-if="identification.id_type=='Others'">
          <ejs-textbox v-model="identification.type" floatLabelType="Auto" :placeholder="$ml.get('idtype')"></ejs-textbox>
        </div>
        <br>
        <ejs-textbox v-model="identification.id_number" floatLabelType="Auto" :placeholder="$ml.get('idnumber')"></ejs-textbox>
        <br>
        <br>
       <label v-text="$ml.get('idcopy')"></label>
        <b-form-file v-model="identification.upload" accept="image/*" :placeholder="$ml.get('dropfile')" id="fileInput" ></b-form-file>
      </b-form-group>
      <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('add')"><i class="fa fa-dot-circle-o"></i></b-button>
    </b-form>
    </b-modal>
    <b-modal size="md" :title="module+' Permissions'" class="modal-primary" v-model="permissionmodal" @ok="permissionmodal = false" hide-footer>
              <div v-if="module =='Company'">
                
              </div>
              <div v-if="module =='User'">
                
              </div>
              <div v-if="module =='User Group'">
                
              </div>
              <div v-if="module =='Department'">
                
              </div>
              <div v-if="module =='Designation'">
                
              </div>

              <div v-if="module =='Head'">
                
              </div>
              <div v-if="module =='Label'">
                
              </div>
              <div v-if="module =='Approval'">
                
                <label v-text="$ml.get('bydept')"></label>
                <br>
                <c-switch class="mx-1" @change="setDept" color="primary" name="switch1" v-model="by_dept" :uncheckedValue="false" :checkedValue="true"/>
                <br>
                <label v-text="$ml.get('byhead')"></label>
                <br>
                <c-switch class="mx-1" @change="setHead" color="primary" name="switch1" v-model="by_heads" :uncheckedValue="false" :checkedValue="true"/>
                <br>
                <div v-if="by_heads">
                <label v-text="$ml.get('heads')"></label>
                <treeselect :default-expand-level="10" :flat="true" :placeholder="$ml.get('pholdheads')" v-model="approval_permissions.by_heads.allowed_heads" :multiple="true" :options="heads" />
              </div>
              </div>
              <div v-if="module =='Budget Settings'">
              </div>
              <div v-if="module =='Staff'">
                
                
              </div>
            </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import ml from '@/ml';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import countries from '@/resources/countries'
import apiUrl from '@/apiUrl'
  import { Switch as cSwitch } from '@coreui/vue'
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import Vue from 'vue'
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
import { CoolSelect } from 'vue-cool-select'

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
//  VueNotifications.setPluginOptions(options)

Vue.use(VueNotifications, options)
Vue.use(TextBoxPlugin);
Vue.use(DropDownListPlugin);

var api = axios.create({
  withCredentials:true
})

var groupVue1 = Vue.component("groupTemplate1", {
    template: `<strong>{{val1}}</strong>`,
    data() {
      return {
        data: {

        },
        val1:""
      };
    },
    mounted() {
      axios.get(`${apiUrl}`+`department/dept/get/`+`${this.data.parent_department}`,{withCredentials:true}).then((res) => {
        console.log(res.data)
        this.val1 = res.data.department_name
      });
    }
  });
  var groupVue2 = Vue.component("groupTemplate2", {
    template: `<strong>{{val2}}</strong>`,
    data() {
      return {
        data: {

        },
        val2:""
      };
    },
    async mounted() {
      axios.get(`${apiUrl}`+`designation/desig/get/one/`+`${this.data.parent_designation_id}`,{withCredentials:true}).then((res) => {
        this.val2 = res.data.name
      });
    
    }
  });

export default {
  name: 'Add User',
  components : {
    CoolSelect,
      cSwitch,
      Treeselect,
  },
  data: function () {
    return {
      identification:{

      },
      groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
          idmodal:true,
          groupTemplate2: function () {
              return {
                  template: groupVue2
              }
          },
          user_groups:[],
          staff:{
            education:[
            {},{},{},{}
            ]
          },
      items : ['Admin','Student','Staff','Vendor','Guardian','Guest'],
      selected: 'Month',
      posts: [],
      primaryModal : false,
      resp: [],
      attribute : {
        context : "",
        field_name : "",
        field_type : "",
        description : ""
      },
      isVendor:false,
      addattr : [
        
      ],
      data :[],
      field_types : ['Text','Email','Phone','TexArea'],
      input : {
            user_name : "",
            password : "",
            onType : "Staff",
            user_type:"",
            address : [this.addresslist],
            identification:[]
        },
        idmodal:false,
        taxx : {
            tax_id : "",
            tax_tag : "",
        },
         addresslist : {
        compAdd : "",
        country : "",
        state : "",
        zip : "",
        phone : "",
        email : ""
      },
      module :"",
      permissionmodal:false,
      addAll:false,
          readAll:false,
          editOwn:false,
          deleteOwn:false,
          editAll:false,
          deleteAll:false,
          readOwn:false,
          by_dept:true,
          by_heads:false,
          approval_permissions:{
            by_department:{
              status:true
            },
            by_heads:{
              status:false,
              allowed_heads:null
            },

          },
          permission_override:0,
      datasrc:[
              {module_name:"company",text:"Company",read:true,write:false,edit:false,delete:false},{module_name:"subuser",text:"User",read:true,write:false,edit:false,delete:false},
              {module_name:"subgroup",text:"User Group",read:true,write:false,edit:false,delete:false},{module_name:"dept",text:"Department",read:true,write:false,edit:false,delete:false},
              {module_name:"desig",text:"Designation",read:true,write:false,edit:false,delete:false},{module_name:"head",text:"Head",read:true,write:false,edit:false,delete:false},
              {module_name:"label",text:"Label",read:true,write:false,edit:false,delete:false},{module_name:"preApp",text:"Approval",read:true,write:true,edit:false,delete:false},
              {module_name:"budSet",text:"Budget Settings",read:true,write:false,edit:false,delete:false},
              {module_name:"staff",text:"Staff",read:true,write:false,edit:false,delete:false},
              {module_name:"trans",text:"Transaction",read:true,write:true,edit:false,delete:false},
              {module_name:"importTrans",text:"Transaction Upload",write:false},
              {module_name:"budtrans",text:"Budget Transfer",read:true,write:false,edit:false,delete:false},
              {module_name:"paymentorder",text:"Purchase Order",read:true,write:false,edit:false,delete:false}
              ],
              additionalpermission:[
              {module_name:"company",text:"Company",read_own:true,read_all:false},{module_name:"subuser",text:"User",read_own:true,read_all:false},{module_name:"subgroup",text:"User Group",read_own:false,read_all:false},
              {module_name:"dept",text:"Department",read_own:false,read_all:false},
              {module_name:"desig",text:"Designation",read_own:false,read_all:false},{module_name:"head",text:"Head",read_own:false,read_all:false},
              {module_name:"label",text:"Label",read_own:false,read_all:false},{module_name:"preApp",text:"Approval",read_own:true,read_all:false},
              {module_name:"budSet",text:"Budget Settings",read_own:false,read_all:false},
              {module_name:"staff",text:"Staff",read_own:false,read_all:false},
              {module_name:"trans",text:'Transcation',read_own:true,read_all:false},
              {module_name:"importTrans",text:"Transaction Upload",read_own:false,read_all:false},
              {module_name:"budtrans",text:"Budget Transfer",read_own:false,read_all:false},
              {module_name:"paymentorder",text:"Payment Order",read_own:false,read_all:false}
              ],
              heads:[],
      idtype:['Aadhar Card','Passport','Voter ID','Driving Licence','Others'],
      vendor : {
        vendor_company:"",
        pan:"",
        gst:"",
        turnover:"",
        kcp_name : "",
        kcp_phone : "",
        acc_no : "",
        acc_name:"",
        ifsc : "",
        bank_name:"",
        pan_copy: null,
        gst_certi:null,
        address:this.addresslist
      },
      isAdmin:false,
      isStudent:false,
      isStaff:false,
      isGuardian:false,
      isGuest:false,
      countrylist : countries,
      designation:null,
      department:null,
      G:false,
      UG:false,
      PG:false,
      Doctrate:false,
      dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
      desig_fields:{groupBy:'parent_designation_id',text:"name",value:"_id"},
      bloodgroup:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
      country_fields:{text:"name",value:"name"}
    }
  },
  async mounted() {
    api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
      this.heads = this.list_to_tree_head(response.data)
      });
    this.isStaff = true
    axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.department = this.list_to_tree_dept(res.data)
      })
      axios.get(`${apiUrl}`+`designation/desig/get/all`,{withCredentials:true}).then((res) => {
        this.designation = this.list_to_tree_desig(res.data)
      })
    axios.get(`${apiUrl}`+`super/attrib/view/`,{ withCredentials:true })
    .then(
      response => {
        this.data = response.data
        for(var i=0;i<this.data.length;i++) {
          if(this.data[i].context == "User") {
            this.addattr.push(this.data[i]);
          }
        }
        console.log(this.addattr)
      })
  },
  watch : {
    'by_dept' : function(){
      if(this.by_dept) {
        this.by_heads = false
      }
    },
    'by_heads' : function(){
      if(this.by_heads) {
        this.by_dept = false
      }
    },
    'staff.department' : function(){
      if(this.staff.department == null || this.staff.department == "") {
        axios.get(`${apiUrl}dropdown/designation/no/dept`,{withCredentials:true}).then((res) => {
          this.designation = this.list_to_tree_desig(res.data)
        })
      }
      else {
        axios.get(`${apiUrl}dropdown/designation/find/${this.staff.department}`,{withCredentials:true}).then((res) => {
          this.designation = this.list_to_tree_desig(res.data)
        })
      }
    }
  },
  methods : {
    checkTab(args) {
      this.permission_override = args
    },
    setAllDelete(args) {
      if(args) {
          this.deleteOwn = false
        }
        for(var i=0;i<this.datasrc.length;i++) {
          if(args) {
            this.additionalpermission[i].delete_own = false
          }
          if(i==11) {
            this.datasrc[i].delete = false
          }
          else {
          this.datasrc[i].delete = args
          }
        }
      },
      setAllEdit(args) {
        if(args) {
          this.editOwn = false
        }
        for(var i=0;i<this.datasrc.length;i++) {
          if(args) {
            this.additionalpermission[i].edit_own = false
          }
          if(i==11) {
            this.datasrc[i].edit = false
          }
          else{
            this.datasrc[i].edit = args
          }
        }
      },
      setAllDeleteOwn(args) {
        if(args) {
          this.deleteAll = false
        }
        for(var i=0;i<this.additionalpermission.length;i++) {
          if(args) {
            this.datasrc[i].delete = false
          }
          if(i==11) {
            this.additionalpermission[i].delete_own = false
          }
          else {
          this.additionalpermission[i].delete_own = args
          }
        }
      },
      setAllEditOwn(args) {
        if(args) {
          this.editAll = false
        }
        for(var i=0;i<this.additionalpermission.length;i++) {
          if(args) {
            this.datasrc[i].edit = false
          }
          if(i==11) {
            this.additionalpermission[i].edit_own = false
          }
          else{
            this.additionalpermission[i].edit_own = args
          }
        }
      },
      setAllAdd(args) {
        for(var i=0;i<this.datasrc.length;i++) {
          if(i==7|| i==10) {
            this.datasrc[i].write = true
          }
          else {
          this.datasrc[i].write = args

          }
        }
      },
      setAllReadAll(args) {
        if(args) {
          this.readOwn = false
        }
        for(var i=0;i<this.additionalpermission.length;i++) {
          if(args) {
            this.additionalpermission[i].read_own = false
          }
          if(!args) {
            this.additionalpermission[0].read_own = true
            this.additionalpermission[1].read_own = true
            this.additionalpermission[7].read_own = true
            this.additionalpermission[10].read_own = true
          }
          if(i==11) {
            this.additionalpermission[i].read_own = false
          }
          else{this.additionalpermission[i].read_all = args}
        }
      },
      setAllReadOwn(args) {
        if(args) {
          this.readAll = false
        }
        for(var i=0;i<this.additionalpermission.length;i++) {
          if(args) {
            this.additionalpermission[i].read_all = false
          }
          if(i==11) {
            this.additionalpermission[i].read_all = false
          }
          else{
            if(i==0 ||i==1 ||i==7 ||i==10) {
            this.additionalpermission[i].read_own = true
          }
          else{
            this.additionalpermission[i].read_own = args
          }}
          }
        
      },
      list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined ) {
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
      toggle(i) {
      this.module = this.datasrc[i].text
      this.permissionmodal = true
    },
    setReadAll(args) {
      if(this.additionalpermission[args].read_all) {
        this.additionalpermission[args].read_own = false
        this.datasrc[args].read = true
      }
    },
    setReadOwn(args) {
      if(this.additionalpermission[args].read_own) {
        this.additionalpermission[args].read_all = false
        this.datasrc[args].read = true
      }
    },
    setDept(args) {
      this.approval_permissions.by_department.status = args
      this.approval_permissions.by_heads.status = !args
    },
    setHead(args) {
      this.approval_permissions.by_heads.status = args
      this.approval_permissions.by_department.status = !args
    },
    list_to_tree_desig(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_designation_id != undefined ) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_designation_id]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDesig(roots)
          return roots
      },
      list_to_tree_dept(list) {
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
      convertDataDesig(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDesig(roots[i].children);
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
    deleteId() {
      this.input.identification.pop()
    },
    addId() {
      if(this.id_type == "Others") {
        this.identification.id_type = this.identification.type
      }
      this.input.identification.push(this.identification);
        this.identification = {}
        this.idmodal = false
    },
    async addAttribute() {
      this.primaryModal = false
      this.attribute.context = "User";
      console.log(this.attribute);
      axios.post(`${apiUrl}`+`super/attrib/add`,this.attribute,{withCredentials : true}).then((response) => {
        console.log(response);
      })
    },
    setUserGroup(args) {
      api.get(`${apiUrl}`+`super/group/subgroup/find/by/${args.id}`).then((res) => {
        console.log(res.data)
        this.input.user_group = res.data._id
      })
    },
    click() {
      console.log("click")
    },
    sendData(args) {
      this.$validator.validate().then(valid => {
            if (!valid) {
              console.log(this.$validator)
            } 
     else {
      if(this.input.onType=="Vendor") {
        this.vendor.address = this.addresslist;
        this.input.address = [this.addresslist];
        var vfd = new FormData();
        vfd.append('vendor_company',this.vendor.vendor_company);
        vfd.append('address',this.vendor.address);
        vfd.append('pan',this.vendor.pan)
        vfd.append('gst',this.vendor.gst)
        vfd.append('turnover',this.vendor.turnover)
        vfd.append('kcp_name',this.vendor.kcp_name)
        vfd.append('kcp_phone',this.vendor.kcp_phone)
        vfd.append('acc_no',this.vendor.acc_no)
        vfd.append('ifsc',this.vendor.ifsc)
        vfd.append('bank_name',this.vendor.bank_name)
        console.log(this.vendor.pan_copy,this.vendor.gst_certi);
        vfd.append('pan_copy',this.vendor.pan_copy)
        vfd.append('gst_certi',this.vendor.gst_certi)
        axios.post(`${apiUrl}`+`vendor/create`,vfd,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then((response)=> {
          console.log(response);
          this.input.user_type=response.data._id
          axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
              console.log(response);
              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/staff/list");
              }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
        })
      }
      if(this.input.onType=="Staff") {
        this.input.address = [this.addresslist];
        if(this.permission_override== 1) {
          this.input.user_permissions=this.datasrc
          this.input.approval_permissions=this.approval_permissions
          this.input.additional_permissions = this.additionalpermission
        }
        axios.post(`${apiUrl}`+`staff/staff/create`,this.staff,{withCredentials:true}).then((response)=> {
          this.input.user_type = response.data._id
          axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
            console.log(response.data)
            var update = {
              user : response.data._id
            }
              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                axios.put(`${apiUrl}`+`staff/staff/update/one/${this.input.user_type}`,update,{withCredentials : true}).then((res) => {
                    console.log(update)
                    console.log(res.data)
                  })
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/staff");
              }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
        })
      }
      else{
              this.input.address = [this.addresslist];
              this.input.onType = null;
              this.input.user_type = null;
            axios.post(`${apiUrl}`+`user/subuser/add`,this.input, {withCredentials : true}).then((response) =>{
              console.log(response);

              if(response.data.limit == "exceeded") {
                toast({
                    type: VueNotifications.types.warn,
                    title: 'Limit Exceeded',
                    message: 'Please Upgrade your License.'
                    })
              }
              else if(response.data.auth == false) {
                toast({
                    type: VueNotifications.types.error,
                    title: 'User Unauthenticated',
                    message: 'Please Login.'
                    })
                  console.log(response)
              }
              else {
                toast({
                    type: VueNotifications.types.success,
                    title: 'Success',
                    message: 'User Created Successfully'
                    })
                this.$router.push("/user");
              }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
      }
      }
          })
      
      

  }
  }
};
</script>
<style>
#errors {
  color:red;
}
.btn:focus, .btn.focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
    box-shadow: 0 0 0 0rem rgba(32, 168, 216, 0.25);
}
@import '../../styles/ejs-vue-base.css';
@import "../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../styles/ej2-vue-lists/styles/material.css";
@import "../../styles/ej2-vue-navigations/styles/material.css";
@import "../../styles/ej2-vue-popups/styles/material.css";
@import "../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../styles/ej2-vue-buttons/styles/material.css";
@import "../../styles/ej2-vue-inputs/styles/material.css";
</style>
