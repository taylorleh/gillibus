<template>
  <b-navbar class="customer-nav" toggleable>
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-link exactActiveClass="hey" activeClass="hey" class="navbar-brand" to="/">
      <span class="font-primary h1">Gillibus</span>
    </b-link>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <b-nav-item class="h5" to="/routes">Routes</b-nav-item>
        <b-nav-item class="h5" to="/charter">Charter</b-nav-item>
        <b-nav-item class="h5" to="/pricing">Pricing</b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  data() {
    return {
      customerNavOpen: false
    }
  },

  methods: {
    toggleNav() {
      this.customerNavOpen = !this.customerNavOpen;
    },

    navigateToRoute() {
      this.customerNavOpen = false;
    }
  }
}
</script>
<style lang="scss">
@import "~styles/variables";
@import "~styles/utilities";

.navbar.customer-nav {
  background-color: $white;

  .navbar-brand {
    color: $brand-black;
    &:hover {
      color: $brand-black;
    }
    &:focus {
      color: $brand-black;
    }
  }

  @media (min-width: map_get($grid-breakpoints, sm)) {
  }

  @media (min-width: map_get($grid-breakpoints, md)) {
  }
}
</style>
