<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-language fa-lg "></i>
      <b-badge pill variant="info"></b-badge>
    </template>
    <template slot="dropdown">
      <div class="dropdown-menu-lg">
        <b-dropdown-item v-for="lang in $ml.list"
          :key="lang">
          <div class="message">
            <div class="text-truncate font-weight-bold" @click="$ml.change(lang)" v-text="lang"></div>
          </div>
        </b-dropdown-item>
      </div>
    </template>
  </AppHeaderDropdown>

</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdown',
  components: {
    AppHeaderDropdown
  },
  data : function() {
    return {
    }
  }
};
</script>

