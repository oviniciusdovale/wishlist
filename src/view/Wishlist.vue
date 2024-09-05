<template>
  <div class="wishlist-page container">
    <Breadcrumb current="Wishlist" />
    <h1 class="page-title">Minha Wishlist</h1>
    <div v-if="wishlistProducts.length > 0">
      <ProductList :products="wishlistProducts" :showWishlistIcon="false" />
    </div>
    <div v-else>
      <p>Sua wishlist está vazia.</p>
    </div>
  </div>
</template>

<script lang="ts">
import ProductList from '@/components/ProductList.vue';
import productsData from '../data/productsMock.json';
import { Product } from '../types/product';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'Wishlist',
  components: {
    ProductList,
    Breadcrumb,
  },
  data() {
    return {
      products: productsData.products as Product[],
      wishlist: [] as string[],
    };
  },
  computed: {
    wishlistProducts(): Product[] {
      return this.products.filter((product) =>
        this.wishlist.includes(product.code),
      );
    },
  },
  mounted() {
    this.loadWishlist();
  },
  methods: {
    loadWishlist() {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        this.wishlist = JSON.parse(savedWishlist);
      }
    },
  },
};
</script>

<style scoped>
.wishlist-page {
  padding: 16px;
  text-align: center;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
