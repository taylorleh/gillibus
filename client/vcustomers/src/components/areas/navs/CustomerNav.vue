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
  @import "~style/variables";
  @import "~style/utilities";

  .navbar.customer-nav {
    /*font-family: bebas-neue;*/
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

    .nav-item {
/*
      .nav-link {
        color: $link-blue;
        font-family: $nav-font;

        &:hover {
          color: $link-blue-hover;
        }
        &.active {
          color: $link-blue-active;
          font-weight: bold;
        }
      }
*/

    }
  /*}*/

/*  .navbar.top-nav {
    height: 80px;
    z-index: 1000;*/

/*
    .navbar-header {
      text-align: center;
      button.navbar-toggle {
        float: left;
        padding: 1.6rem 1.12rem;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 1.3rem;
        margin: 0;
      }
      .navbar-brand {
        float: none;
      }
    }
*/

/*
    ul.navbar-nav {
      background-color: #f8f8f8;
      height: 100vh;
      text-align: center;
      margin-top: 0;
      padding: 0 3.2em;

      & > li {
        border-bottom: 1px solid blue;
      }

      li.dropdown {
        z-index: 100;
        //border-bottom: 1px solid blue;
      }

      a {
        line-height: 78px;
        padding-top: 0;
        padding-bottom: 0;
        color: $link-blue;
        font-family: $nav-font;
        font-size: 18px;
      }
    }
*/

    /*.navbar-brand {
      font-family: bebas-neue;
      font-weight: normal;
      font-size: 3em;
      color: $brand-black;
      line-height: 80px;
      height: 80px;
      padding-top: 0;
    }*/

    @media (min-width: map_get($grid-breakpoints, sm)) {
/*
      ul.navbar-nav {
        height: inherit;
        & > li {
          border-bottom: none;
        }
      }
*/

/*
      li {
        background-color: inherit;
      }
*/
    }

    @media (min-width: map_get($grid-breakpoints, md)) {}

  }
</style>
