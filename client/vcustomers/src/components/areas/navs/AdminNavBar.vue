<template>
  <nav class="navbar navbar-default">

    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button @click="toggleNav" type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">
          Gilli - Admin
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" :class="{'in': isNavOpen }">
        <ul class="nav navbar-nav">
            <router-link @click.native="navigateToRoute" to="/portal" activeClass="active" tag="li" exact>
              <a>
                <span class="glyphicon glyphicon-stats" aria-hidden="true"></span>
                Overview
              </a>
            </router-link>
            <router-link @click.native="navigateToRoute" to="/portal/buses" activeClass="active" tag="li">
              <a>
                <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                Buses
              </a>
            </router-link>
          <router-link @click.native="navigateToRoute" to="/portal/price-rules" activeClass="active" tag="li">
            <a>
              <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
              Price Rules
            </a>
          </router-link>
            <router-link @click.native="navigateToRoute" to="/portal/users" activeClass="active" tag="li">
              <a>
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                Users
              </a>
            </router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a class="logout" @click="logout">
              <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
  .logout {

    &:hover {
      cursor: pointer;
     }
  }
</style>

