import AdminOverview from './components/AdminOverview.vue';
import AdminUsers from './components/AdminUsers.vue';
import AdminBuses from './components/buses/Buses.vue';


export const routes = [
  { path: '/portal/overview', component: AdminOverview },
  { path: '/portal/users', component: AdminUsers },
  { path: '/portal/buses', component: AdminBuses }
];
