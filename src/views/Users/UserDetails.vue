<template>
  <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong v-text="$ml.get('updatedelete')"></strong>&nbsp;<span v-text="$ml.get('user')"></span>
          </div>
          <b-form action="UserList" v-on:submit.prevent="updateData">
          <b-form-group
            :label="$ml.get('username')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.user_name" type="text" autocomplete="user_name" :placeholder="$ml.get('placeholderusername')" ></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$ml.get('password')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.password" type="password" autocomplete="user_name" :placeholder="$ml.get('password')" ></b-form-input>
          </b-form-group>
          <b-form-group
              
              :label="$ml.get('usertype')"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <cool-select
                v-model="input.user_type"
                :items="items"
                :placeholder="$ml.get('placeholderusertype')"
               >
              </cool-select>
            </b-form-group>
          <b-form-group
            
            :label="$ml.get('address')"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-group>
            <label for="street" v-text="$ml.get('addressline1')"></label>
            <b-form-input v-model="addresslist.compAdd" type="text" id="street" :placeholder="$ml.get('placeholderaddressline1')"></b-form-input>
          </b-form-group>
            <b-row>
            <b-col sm="6">
            <b-form-group>
            <label for="street" v-text="$ml.get('email')"></label>
            <b-form-input v-model="addresslist.email" type="email" id="street" :placeholder="$ml.get('placeholderemail')" required></b-form-input>
          </b-form-group>
          </b-col>
          <b-col sm="6">
              <b-form-group>
            <label for="street" v-text="$ml.get('phone')"></label>
            <b-form-input v-model="addresslist.phone" type="number" id="street" :placeholder="$ml.get('placeholderphone')"></b-form-input>
          </b-form-group>
          </b-col>
          </b-row>
          <b-row>
            <b-col sm="8">
              <b-form-group>
                <label for="city" v-text="$ml.get('state')"></label>
                <b-form-input  v-model="addresslist.state" type="text" id="city" :placeholder="$ml.get('placeholderstate')"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="postal-code" v-text="$ml.get('postalcode')"></label>
                <b-form-input v-model="addresslist.zip" type="text" id="postal-code" :placeholder="$ml.get('placeholderpostalcode')"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <label for="country" v-text="$ml.get('country')"></label>
            <cool-select
                v-model="addresslist.country"
                :items="countrylist"
                item-text="name"
                item-value="name"
                :placeholder="$ml.get('placeholdercompany')"
                required>
              </cool-select>
          </b-form-group>
          </b-form-group>
          <div v-if="addattr.lengath!=0">
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
          <b-button type="button" variant="primary" @click="primaryModal = true" style="float:right" class="mr-1" v-text="$ml.get('customattributes')"></b-button>
          
          <!-- <b-form-group
            description="Add new Attributes"
            label="Additional Attributes"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.add_attributes" type="text" autocomplete="type" placeholder="Add Attributes" required ></b-form-input>
          </b-form-group>
          <b-button class="float-right" type="button" @click="addcontact()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> + Add Contact</b-button> -->

           <div slot="footer">
              <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              <router-link :to="{ path: '/sites',}">
              <b-button v-on:click="delData()" size="sm" variant="danger" v-text="$ml.get('reset')"><i class="fa fa-ban"></i></b-button>
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
</template>

<script>
import axios from 'axios';
import ml from '@/ml';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr
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
var link = window.location.href
  var key = link.split("details/",24).pop()
  console.log(key)

export default {
  name: 'User Details',
  components : {
    CoolSelect
  },
  data: function () {
    return {
        items : ['Super Admin','Student','Staff','Vendor','Guardian','Guest'],
      selected: 'Month',
      posts: [],
      resp: [],
      errors: [],
      primaryModal : false,
      attribute : {
        context : "",
        field_name : "",
        field_type : "",
        description : ""
      },
      addattr : [
        
      ],
      field_types : ['Text','Email','Phone','TexArea'],
      input : {
            user_name : "",
            password : "",
            user_type : "",
            address : [this.addresslist],
            
        },
        
         addresslist : {
        compAdd : "",
        country : "",
        state : "",
        zip : "",
        phone : "",
        email : ""
      },
      
      countrylist : 
                        [ 
                        {"name": "Afghanistan", "code": "AF"}, 
                        {"name": "land Islands", "code": "AX"}, 
                        {"name": "Albania", "code": "AL"}, 
                        {"name": "Algeria", "code": "DZ"}, 
                        {"name": "American Samoa", "code": "AS"}, 
                        {"name": "AndorrA", "code": "AD"}, 
                        {"name": "Angola", "code": "AO"}, 
                        {"name": "Anguilla", "code": "AI"}, 
                        {"name": "Antarctica", "code": "AQ"}, 
                        {"name": "Antigua and Barbuda", "code": "AG"}, 
                        {"name": "Argentina", "code": "AR"}, 
                        {"name": "Armenia", "code": "AM"}, 
                        {"name": "Aruba", "code": "AW"}, 
                        {"name": "Australia", "code": "AU"}, 
                        {"name": "Austria", "code": "AT"}, 
                        {"name": "Azerbaijan", "code": "AZ"}, 
                        {"name": "Bahamas", "code": "BS"}, 
                        {"name": "Bahrain", "code": "BH"}, 
                        {"name": "Bangladesh", "code": "BD"}, 
                        {"name": "Barbados", "code": "BB"}, 
                        {"name": "Belarus", "code": "BY"}, 
                        {"name": "Belgium", "code": "BE"}, 
                        {"name": "Belize", "code": "BZ"}, 
                        {"name": "Benin", "code": "BJ"}, 
                        {"name": "Bermuda", "code": "BM"}, 
                        {"name": "Bhutan", "code": "BT"}, 
                        {"name": "Bolivia", "code": "BO"}, 
                        {"name": "Bosnia and Herzegovina", "code": "BA"}, 
                        {"name": "Botswana", "code": "BW"}, 
                        {"name": "Bouvet Island", "code": "BV"}, 
                        {"name": "Brazil", "code": "BR"}, 
                        {"name": "British Indian Ocean Territory", "code": "IO"}, 
                        {"name": "Brunei Darussalam", "code": "BN"}, 
                        {"name": "Bulgaria", "code": "BG"}, 
                        {"name": "Burkina Faso", "code": "BF"}, 
                        {"name": "Burundi", "code": "BI"}, 
                        {"name": "Cambodia", "code": "KH"}, 
                        {"name": "Cameroon", "code": "CM"}, 
                        {"name": "Canada", "code": "CA"}, 
                        {"name": "Cape Verde", "code": "CV"}, 
                        {"name": "Cayman Islands", "code": "KY"}, 
                        {"name": "Central African Republic", "code": "CF"}, 
                        {"name": "Chad", "code": "TD"}, 
                        {"name": "Chile", "code": "CL"}, 
                        {"name": "China", "code": "CN"}, 
                        {"name": "Christmas Island", "code": "CX"}, 
                        {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
                        {"name": "Colombia", "code": "CO"}, 
                        {"name": "Comoros", "code": "KM"}, 
                        {"name": "Congo", "code": "CG"}, 
                        {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
                        {"name": "Cook Islands", "code": "CK"}, 
                        {"name": "Costa Rica", "code": "CR"}, 
                        {"name": "Cote D\"Ivoire", "code": "CI"}, 
                        {"name": "Croatia", "code": "HR"}, 
                        {"name": "Cuba", "code": "CU"}, 
                        {"name": "Cyprus", "code": "CY"}, 
                        {"name": "Czech Republic", "code": "CZ"}, 
                        {"name": "Denmark", "code": "DK"}, 
                        {"name": "Djibouti", "code": "DJ"}, 
                        {"name": "Dominica", "code": "DM"}, 
                        {"name": "Dominican Republic", "code": "DO"}, 
                        {"name": "Ecuador", "code": "EC"}, 
                        {"name": "Egypt", "code": "EG"}, 
                        {"name": "El Salvador", "code": "SV"}, 
                        {"name": "Equatorial Guinea", "code": "GQ"}, 
                        {"name": "Eritrea", "code": "ER"}, 
                        {"name": "Estonia", "code": "EE"}, 
                        {"name": "Ethiopia", "code": "ET"}, 
                        {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
                        {"name": "Faroe Islands", "code": "FO"}, 
                        {"name": "Fiji", "code": "FJ"}, 
                        {"name": "Finland", "code": "FI"}, 
                        {"name": "France", "code": "FR"}, 
                        {"name": "French Guiana", "code": "GF"}, 
                        {"name": "French Polynesia", "code": "PF"}, 
                        {"name": "French Southern Territories", "code": "TF"}, 
                        {"name": "Gabon", "code": "GA"}, 
                        {"name": "Gambia", "code": "GM"}, 
                        {"name": "Georgia", "code": "GE"}, 
                        {"name": "Germany", "code": "DE"}, 
                        {"name": "Ghana", "code": "GH"}, 
                        {"name": "Gibraltar", "code": "GI"}, 
                        {"name": "Greece", "code": "GR"}, 
                        {"name": "Greenland", "code": "GL"}, 
                        {"name": "Grenada", "code": "GD"}, 
                        {"name": "Guadeloupe", "code": "GP"}, 
                        {"name": "Guam", "code": "GU"}, 
                        {"name": "Guatemala", "code": "GT"}, 
                        {"name": "Guernsey", "code": "GG"}, 
                        {"name": "Guinea", "code": "GN"}, 
                        {"name": "Guinea-Bissau", "code": "GW"}, 
                        {"name": "Guyana", "code": "GY"}, 
                        {"name": "Haiti", "code": "HT"}, 
                        {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
                        {"name": "Holy See (Vatican City State)", "code": "VA"}, 
                        {"name": "Honduras", "code": "HN"}, 
                        {"name": "Hong Kong", "code": "HK"}, 
                        {"name": "Hungary", "code": "HU"}, 
                        {"name": "Iceland", "code": "IS"}, 
                        {"name": "India", "code": "IN"}, 
                        {"name": "Indonesia", "code": "ID"}, 
                        {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
                        {"name": "Iraq", "code": "IQ"}, 
                        {"name": "Ireland", "code": "IE"}, 
                        {"name": "Isle of Man", "code": "IM"}, 
                        {"name": "Israel", "code": "IL"}, 
                        {"name": "Italy", "code": "IT"}, 
                        {"name": "Jamaica", "code": "JM"}, 
                        {"name": "Japan", "code": "JP"}, 
                        {"name": "Jersey", "code": "JE"}, 
                        {"name": "Jordan", "code": "JO"}, 
                        {"name": "Kazakhstan", "code": "KZ"}, 
                        {"name": "Kenya", "code": "KE"}, 
                        {"name": "Kiribati", "code": "KI"}, 
                        {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
                        {"name": "Korea, Republic of", "code": "KR"}, 
                        {"name": "Kuwait", "code": "KW"}, 
                        {"name": "Kyrgyzstan", "code": "KG"}, 
                        {"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
                        {"name": "Latvia", "code": "LV"}, 
                        {"name": "Lebanon", "code": "LB"}, 
                        {"name": "Lesotho", "code": "LS"}, 
                        {"name": "Liberia", "code": "LR"}, 
                        {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
                        {"name": "Liechtenstein", "code": "LI"}, 
                        {"name": "Lithuania", "code": "LT"}, 
                        {"name": "Luxembourg", "code": "LU"}, 
                        {"name": "Macao", "code": "MO"}, 
                        {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
                        {"name": "Madagascar", "code": "MG"}, 
                        {"name": "Malawi", "code": "MW"}, 
                        {"name": "Malaysia", "code": "MY"}, 
                        {"name": "Maldives", "code": "MV"}, 
                        {"name": "Mali", "code": "ML"}, 
                        {"name": "Malta", "code": "MT"}, 
                        {"name": "Marshall Islands", "code": "MH"}, 
                        {"name": "Martinique", "code": "MQ"}, 
                        {"name": "Mauritania", "code": "MR"}, 
                        {"name": "Mauritius", "code": "MU"}, 
                        {"name": "Mayotte", "code": "YT"}, 
                        {"name": "Mexico", "code": "MX"}, 
                        {"name": "Micronesia, Federated States of", "code": "FM"}, 
                        {"name": "Moldova, Republic of", "code": "MD"}, 
                        {"name": "Monaco", "code": "MC"}, 
                        {"name": "Mongolia", "code": "MN"}, 
                        {"name": "Montenegro", "code": "ME"},
                        {"name": "Montserrat", "code": "MS"},
                        {"name": "Morocco", "code": "MA"}, 
                        {"name": "Mozambique", "code": "MZ"}, 
                        {"name": "Myanmar", "code": "MM"}, 
                        {"name": "Namibia", "code": "NA"}, 
                        {"name": "Nauru", "code": "NR"}, 
                        {"name": "Nepal", "code": "NP"}, 
                        {"name": "Netherlands", "code": "NL"}, 
                        {"name": "Netherlands Antilles", "code": "AN"}, 
                        {"name": "New Caledonia", "code": "NC"}, 
                        {"name": "New Zealand", "code": "NZ"}, 
                        {"name": "Nicaragua", "code": "NI"}, 
                        {"name": "Niger", "code": "NE"}, 
                        {"name": "Nigeria", "code": "NG"}, 
                        {"name": "Niue", "code": "NU"}, 
                        {"name": "Norfolk Island", "code": "NF"}, 
                        {"name": "Northern Mariana Islands", "code": "MP"}, 
                        {"name": "Norway", "code": "NO"}, 
                        {"name": "Oman", "code": "OM"}, 
                        {"name": "Pakistan", "code": "PK"}, 
                        {"name": "Palau", "code": "PW"}, 
                        {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
                        {"name": "Panama", "code": "PA"}, 
                        {"name": "Papua New Guinea", "code": "PG"}, 
                        {"name": "Paraguay", "code": "PY"}, 
                        {"name": "Peru", "code": "PE"}, 
                        {"name": "Philippines", "code": "PH"}, 
                        {"name": "Pitcairn", "code": "PN"}, 
                        {"name": "Poland", "code": "PL"}, 
                        {"name": "Portugal", "code": "PT"}, 
                        {"name": "Puerto Rico", "code": "PR"}, 
                        {"name": "Qatar", "code": "QA"}, 
                        {"name": "Reunion", "code": "RE"}, 
                        {"name": "Romania", "code": "RO"}, 
                        {"name": "Russian Federation", "code": "RU"}, 
                        {"name": "RWANDA", "code": "RW"}, 
                        {"name": "Saint Helena", "code": "SH"}, 
                        {"name": "Saint Kitts and Nevis", "code": "KN"}, 
                        {"name": "Saint Lucia", "code": "LC"}, 
                        {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
                        {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
                        {"name": "Samoa", "code": "WS"}, 
                        {"name": "San Marino", "code": "SM"}, 
                        {"name": "Sao Tome and Principe", "code": "ST"}, 
                        {"name": "Saudi Arabia", "code": "SA"}, 
                        {"name": "Senegal", "code": "SN"}, 
                        {"name": "Serbia", "code": "RS"}, 
                        {"name": "Seychelles", "code": "SC"}, 
                        {"name": "Sierra Leone", "code": "SL"}, 
                        {"name": "Singapore", "code": "SG"}, 
                        {"name": "Slovakia", "code": "SK"}, 
                        {"name": "Slovenia", "code": "SI"}, 
                        {"name": "Solomon Islands", "code": "SB"}, 
                        {"name": "Somalia", "code": "SO"}, 
                        {"name": "South Africa", "code": "ZA"}, 
                        {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
                        {"name": "Spain", "code": "ES"}, 
                        {"name": "Sri Lanka", "code": "LK"}, 
                        {"name": "Sudan", "code": "SD"}, 
                        {"name": "Suriname", "code": "SR"}, 
                        {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
                        {"name": "Swaziland", "code": "SZ"}, 
                        {"name": "Sweden", "code": "SE"}, 
                        {"name": "Switzerland", "code": "CH"}, 
                        {"name": "Syrian Arab Republic", "code": "SY"}, 
                        {"name": "Taiwan, Province of China", "code": "TW"}, 
                        {"name": "Tajikistan", "code": "TJ"}, 
                        {"name": "Tanzania, United Republic of", "code": "TZ"}, 
                        {"name": "Thailand", "code": "TH"}, 
                        {"name": "Timor-Leste", "code": "TL"}, 
                        {"name": "Togo", "code": "TG"}, 
                        {"name": "Tokelau", "code": "TK"}, 
                        {"name": "Tonga", "code": "TO"}, 
                        {"name": "Trinidad and Tobago", "code": "TT"}, 
                        {"name": "Tunisia", "code": "TN"}, 
                        {"name": "Turkey", "code": "TR"}, 
                        {"name": "Turkmenistan", "code": "TM"}, 
                        {"name": "Turks and Caicos Islands", "code": "TC"}, 
                        {"name": "Tuvalu", "code": "TV"}, 
                        {"name": "Uganda", "code": "UG"}, 
                        {"name": "Ukraine", "code": "UA"}, 
                        {"name": "United Arab Emirates", "code": "AE"}, 
                        {"name": "United Kingdom", "code": "GB"}, 
                        {"name": "United States", "code": "US"}, 
                        {"name": "United States Minor Outlying Islands", "code": "UM"}, 
                        {"name": "Uruguay", "code": "UY"}, 
                        {"name": "Uzbekistan", "code": "UZ"}, 
                        {"name": "Vanuatu", "code": "VU"}, 
                        {"name": "Venezuela", "code": "VE"}, 
                        {"name": "Viet Nam", "code": "VN"}, 
                        {"name": "Virgin Islands, British", "code": "VG"}, 
                        {"name": "Virgin Islands, U.S.", "code": "VI"}, 
                        {"name": "Wallis and Futuna", "code": "WF"}, 
                        {"name": "Western Sahara", "code": "EH"}, 
                        {"name": "Yemen", "code": "YE"}, 
                        {"name": "Zambia", "code": "ZM"}, 
                        {"name": "Zimbabwe", "code": "ZW"} 
                        ],
      
      
    }
  },
  async mounted() {
    axios.get(`http://127.0.0.1:3000/api/super/attrib/view/`,{ withCredentials:true })
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
  methods : {
    async addAttribute() {
      this.primaryModal = false
      this.attribute.context = "User";
      console.log(this.attribute);
      axios.post('http://127.0.0.1:3000/api/super/attrib/add',this.attribute,{withCredentials : true}).then((response) => {
        console.log(response);
      })
    },
    async updateData() {
              this.input.address = [this.addresslist];
            console.log(this.input);
            axios.put(`http://127.0.0.1:3000/api/user/details/${key}`,this.input, {withCredentials : true}).then((response) =>{
              console.log(this.input);
              console.log(response);

            //   if(response.data.limit == "exceeded") {
            //     toast({
            //         type: VueNotifications.types.warn,
            //         title: 'Limit Exceeded',
            //         message: 'Please Upgrade your License.'
            //         })
            //   }
            //   else if(response.data.auth == false) {
            //     toast({
            //         type: VueNotifications.types.error,
            //         title: 'User Unauthenticated',
            //         message: 'Please Login.'
            //         })
            //       console.log(response)
            //   }
            //   else {
            //     this.$router.push("/user");
            //   }
            })
            .catch( function (error){
              console.log(error)
              toast({
                    type: VueNotifications.types.error,
                    title: 'Oops!',
                    message: 'Something went wrong.'
                    })
            });
      },
      async delData() {
                    axios.delete(`http://127.0.0.1:3000/api/user/details/${key}`,{withCredentials : true} ).then(result => {
                        
                        
                            toast({
                        type: VueNotifications.types.success,
                        title: 'Done!',
                        message: 'Company Successfully Deleted'
                        })
                        console.log(result);
                    }, error => {
                        toast({
                        type: VueNotifications.types.error,
                        title: 'Oops!',
                        message: 'Something Went Wrong.'
                        })
                    });
        },
  }
  
}

</script>

<style>
  b-card {
    margin:0px !important;
    padding:1.25rem !important;
  }
  .card-body {
    padding: 1.25rem !important;
  }
</style>
