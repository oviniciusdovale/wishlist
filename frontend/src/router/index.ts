import { createRouter, createWebHistory } from 'vue-router';
import ProductPage from '../view/ProductsPage.vue';
import Wishlist from '../view/Wishlist.vue';

const routes = [
  {
    path: '/',
    name: 'ProductPage',
    component: ProductPage,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
