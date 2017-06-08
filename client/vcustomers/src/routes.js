import CustomerHome from './components/home/HomeView.vue';
import CustomerCharter from './components/charter/Charter.vue';
import AdminLogin from './components/adminLogin/AdminLogin.vue';
import CharterCheckout from './components/charterCheckout/CharterCheckout.vue';


export const routes = [
  { name: 'home', path: '/', component: CustomerHome },
  { name:'admin', path: '/admin', component:AdminLogin },
  { name:'charter', path: '/charter', component:CustomerCharter },
  {
    name: 'checkout',
    path: '/checkout',
    component: CharterCheckout,
    props: true,
    beforeEnter: (to, from, next) => {
      if(!to.params.date) {
        next(from.path);
      }
      next();
    }
  }
];
