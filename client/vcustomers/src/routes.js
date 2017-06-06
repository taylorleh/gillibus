import CustomerHome from './components/home/HomeView.vue';
import CustomerCharter from './components/charter/Charter.vue';
import AdminLogin from './components/adminLogin/AdminLogin.vue';


export const routes = [
  { name: 'home', path: '/', component: CustomerHome },
  { name:'charter', path: '/charter', component:CustomerCharter },
  { name:'admin', path: '/admin', component:AdminLogin }
];
