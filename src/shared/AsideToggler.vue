<template>
  <button
    :display="display"
    :mobile="mobile"
    :class="classList"
    type="button"
    @click="asideToggle">
    <span class="icon-hourglass" />
  </button>
</template>

<script>
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from './classes'
import toggleClasses from './toggle-classes'

export default {
  name: 'AsideToggler',
  props: {
    defaultOpen: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: 'lg'
    },
    mobile: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    classList () {
      return [
        'navbar-toggler'
      ]
    }
  },
  mounted: function() {
    this.toggle(this.defaultOpen)
  },
  methods: {
    toggle (force) {
      const [display, mobile] = [this.display, this.mobile]
      let cssClass = asideMenuCssClasses[4]
      if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
        cssClass = `aside-menu-${display}-show`
      }
      toggleClasses(cssClass, asideMenuCssClasses, force)
    },
    asideToggle (e) {
      e.preventDefault()
      this.toggle(true)
    }
  }
}
</script>
