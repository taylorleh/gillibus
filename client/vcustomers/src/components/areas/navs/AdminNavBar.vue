<template>
  <b-navbar class="bg-faded mb-4" toggleable>
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-nav-text class="navbar-brand">Gillibus-Admin</b-nav-text>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <b-nav-item class="" exact to="/portal">
          <i class="fa fa-bar-chart" aria-hidden="true"></i> Overview
        </b-nav-item>
        <b-nav-item class="" to="/portal/buses">
          <i class="fa fa-map-marker" aria-hidden="true"></i> Buses
        </b-nav-item>
        <b-nav-item class="text-white" to="/portal/price-rules">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> Price Rules
        </b-nav-item>
        <b-nav-item class="" to="/portal/users">
          <i class="fa fa-user" aria-hidden="true"></i> Users
        </b-nav-item>
      </b-nav>

      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout
        </b-nav-item>

      </b-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {

  data() {
    return {
      isNavOpen: false
    }
  },

  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },

    navigateToRoute() {
      this.isNavOpen = false;
    },

    logout() {
      window.sessionStorage.removeItem('com.gillibus');
      window.location.href = '/admin';
    }
  }

}
</script>
<style lang="scss">
  /* default: #777
  * hover: #333
  * active: #555, bg: #e7e7e7
  * bg for nav: #f8f8f8
  */
  .logout {

    &:hover {
      cursor: pointer;
    }
  }
</style>

