<template>
  <footer>
    <div class="footer-container container">
      <div class="row align-items-center">

        <div class="col-md-8 col-sm-12 d-flex justify-content-around">
          <b-nav class="flex-sm-row">
            <li class="nav-item text-white py-2">
              <small>
                <span>Gillibus</span>
                <i class="fa fa-copyright" aria-hidden="true"></i>
                <span>{{(new Date().getFullYear())}}</span>
              </small>

            </li>
            <b-nav-item to="/privacy-policy">Privacy Policy</b-nav-item>
            <b-nav-item to="/about-us">About Us</b-nav-item>
            <b-nav-item to="/terms-conditions">Terms & Conditions</b-nav-item>
          </b-nav>
        </div>


        <div class="col col-sm-12 col-md">
          <ul class="list-inline text-primary text-center text-md-left mb-0">
            <li class="list-inline-item">
              <a class="btn-lg py-1" target="_blank" href="https://www.facebook.com/Gillibussf/">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a class="btn-lg py-1" target="_blank" href="https://www.instagram.com/gillibussf/">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a class="btn-lg py-1" target="_blank" href="https://twitter.com/GillibusSF">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { bNav, bNavItem } from 'bootstrap-vue/lib/components';

export default {
  name: 'customerFooter',

  components: {bNav, bNavItem },
}
</script>
<style lang="scss">
  @import '~styles/variables';
  footer {
    height: 100px;
    font-size: 14px;
  }

  .footer-container {
    height: 100%;

    .row {
      height: inherit;
    }

    a.nav-link:before {
      content: '|';
      font-size: 1rem;
      color: #fff;
      padding-right: 0.5rem;
    }

  }

  @media (min-width: map_get($grid-breakpoints, sm)) {
    footer {
      height:70px;
    }
  }

</style>
