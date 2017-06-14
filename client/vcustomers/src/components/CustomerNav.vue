<template>
  <nav class="top-nav navbar navbar-default front-nav">
    <div class="container-fluid">
      <div class="navbar-header">
        <button @click="toggleNav" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">Gillibus</router-link>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" :class="{'in': customerNavOpen}">
        <ul class="nav navbar-nav">
          <router-link @click.native="navigateToRoute" to="/routes" activeClass="active" tag="li"><a>Routes</a></router-link>
          <router-link @click.native="navigateToRoute" to="/charter" activeClass="active" tag="li"><a>Charter</a></router-link>
          <router-link @click.native="navigateToRoute" to="/pricing" activeClass="active" tag="li"><a>Pricing</a></router-link>
        </ul>
      </div>
    </div>
  </nav>
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
<style lang="less">
@import "../less/variables";

.navbar.top-nav {
  height: 80px;
  z-index: 1000;

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


  ul.navbar-nav {
    background-color: #f8f8f8;
    height: 100vh;
    text-align: center;
    margin-top: 0;
    padding: 0 3.2em;

    &>li {
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
      color: @link-blue;
      font-family: @nav-font;
      font-size: 18px;
    }
  }




  .navbar-brand {
    font-family: bebas-neue;
    font-weight: normal;
    font-size: 3em;
    color: @brand-black;
    line-height: 80px;
    height: 80px;
    padding-top: 0px;
  }

  @media (min-width: @screen-sm) {
    ul.navbar-nav {
      height: inherit;
      &>li {
        border-bottom: none;
      }
    }

    li {
      background-color: inherit;
    }
  }

  @media (min-width: @screen-md) {}

}

</style>
