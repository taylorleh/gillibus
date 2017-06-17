import CustomerHome from './components/home/HomeView.vue';
import CustomerCharter from './components/charter/Charter.vue';
import AdminLogin from './components/adminLogin/AdminLogin.vue';
import CharterCheckout from './components/charterCheckout/CharterCheckout.vue';
import AdminOverview from './components/admin/AdminOverview.vue';


import AdminUsers from './components/admin/users/AdminUsers.vue';
import AdminBuses from './components/admin/buses/Buses.vue';

//
// export const routes = [
//   { path: '/portal/overview', component: AdminOverview },
//   { path: '/portal/users', component: AdminUsers },
//   { path: '/portal/buses', component: AdminBuses }
// ];
const AdminRoutes = [
  { path: '/portal', name: 'adminHome', component: AdminOverview },
  { path: '/portal/users', name: 'adminUsers', component: AdminUsers },
  { path: '/portal/buses', name: 'adminBuses', component: AdminBuses }
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


export const routes = [
  { name: 'home', path: '/', component: CustomerHome },
  { name: 'admin', path: '/admin', component: AdminLogin },
  { name: 'charter', path: '/charter', component: CustomerCharter },
  {
    name: 'checkout',
    path: '/checkout',
    component: CharterCheckout,
    props: true,
    beforeEnter: (to, from, next) => {
      if (!to.params.date) {
        next(from.path);
      }
      next();
    }
  },


].concat(AdminRoutes);
