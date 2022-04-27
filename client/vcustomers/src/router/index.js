/**
 * Created by taylor on 6/21/17.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);





import CustomerHome from 'components/home/HomeView.vue';
import CustomerCharter from 'components/charter/Charter.vue';
import AdminLogin from 'components/adminLogin/AdminLogin.vue';
import PrivacyPolicy from 'components/legal/PrivacyPolicy.vue';
import AboutUs from 'components/legal/AboutUs.vue';
import TermsConditions from 'components/legal/TermsConditions.vue';
import AdminOverview from 'components/admin/AdminOverview.vue';

import CharterCheckout from 'components/charterCheckout/CharterCheckout.vue';
import DetailsStep from 'components/charterCheckout/DetailsStep.vue';
import PaymentStep from 'components/charterCheckout/PaymentStep.vue';
import ReviewStep from 'components/charterCheckout/ReviewStep.vue';


import AdminUsers from 'components/admin/users/AdminUsers.vue';
import AdminBuses from 'components/admin/buses/Buses.vue';
import AdminPriceRules from 'components/admin/priceRules/AdminPriceRules.vue';

//
// export const routes = [
//   { path: '/portal/overview', component: AdminOverview },
//   { path: '/portal/users', component: AdminUsers },
//   { path: '/portal/buses', component: AdminBuses }
// ];
const AdminRoutes = [
  { path: '/portal', name: 'adminHome', component: AdminOverview },
  { path: '/portal/users', name: 'adminUsers', component: AdminUsers },
  { path: '/portal/buses', name: 'adminBuses', component: AdminBuses },
  { path: '/portal/price-rules', name: 'adminPriceRules', component: AdminPriceRules }
];

// const AdminChildRoutes = [
//   // ADMIN
//   {path: '/portal', redirect: '/portal/overview'},
//   {
//     name: 'adminOverview',
//     component: AdminOverview,
//     path: '/portal/overview'
//   },
//   { path: '/portal/users', component: AdminUsers },
//   { path: '/portal/buses', component: AdminBuses }
// ];

const routes = [
  { name: 'home', path: '/', component: CustomerHome },
  { name: 'admin', path: '/admin', component: AdminLogin },
  { name: 'charter', path: '/charter', component: CustomerCharter },
  { name: 'privacy', path: '/privacy-policy', component: PrivacyPolicy },
  { name: 'about', path: '/about-us', component: AboutUs },
  { name: 'terms', path: '/terms-conditions', component: TermsConditions },
  {
    // name: 'checkout',
    path: '/checkout',
    component: CharterCheckout,
    props: true,
    name: 'checkout',
    redirect: '/checkout/details',
    children: [
      { component: DetailsStep, path: 'details'},
      { name: 'payment', component: PaymentStep, path: 'payment'},
      { name: 'review', component: ReviewStep, path: 'review'}
    ]
    // beforeEnter: (to, from, next) => {
    //   if (!to.params.date) {
    //     next(from.path);
    //   }
    //   next();
    // }
  },


].concat(AdminRoutes);


export default new Router({
  routes,
  mode: 'history'
})

