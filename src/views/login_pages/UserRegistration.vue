<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="user_name" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email" />
                </b-input-group>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="phone" class="form-control" placeholder="Phone" autocomplete="phone" />
                </b-input-group>
                <b-row>
                    <b-col lg="1">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  </b-col>
                      <b-col lg="10">
                  <cool-select style="height:28px !important;" v-model="selected" :items="items" placeholder="User Type"
                    /></b-col >
                </b-row>
                <br>
                <b-row>
                    <b-col lg="1">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  </b-col>
                      <b-col lg="10">
                  <cool-select style="height:28px !important;" v-model="selected" :items="items" placeholder="Multi Category"
                    /></b-col >
                </b-row>
                <br>
                

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="new-password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Repeat password" autocomplete="new-password" />
                </b-input-group>

                <b-button variant="success" block>Create Account</b-button>
              </b-form>
            </b-card-body>
            
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
export default {
  name: 'Register',
  components: {
      CoolSelect
  },
  data () {
    return {
      items:['SuperAdmin','Staff','Guest','Student','Guardian'],
      selected: null
    }
  },
  method : {
    //   async onSearch(search) {
    //   const lettersLimit = 2;

    //   this.noData = false;
    //   if (search.length < lettersLimit) {
    //     this.items = [];
    //     this.loading = false;
    //     return;
    //   }
    //   this.loading = true;

    //   clearTimeout(this.timeoutId);
    //   this.timeoutId = setTimeout(async () => {
    //     const response = await fetch(
    //       `https://selacious-cloud-siteapi.herokuapp.com/users`
    //     );

    //     this.items = await response.json();
    //     this.loading = false;

    //     if (!this.items.length) this.noData = true;

    //     console.log(this.items);
    //   }, 500);
    // }
  }
}
</script>
