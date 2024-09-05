<template>
  <div class="products-page">
    <h1 class="page-title">Lista de Produtos</h1>
    <ProductList
      :products="products"
      :wishlist="wishlist"
      @toggle-wishlist="toggleWishlist"
    />
  </div>
</template>

<script lang="ts">
import ProductList from '@/components/ProductList.vue';
import productsData from '../data/productsMock.json';

export default {
  name: 'ProductsPage',
  components: {
    ProductList,
  },
  data() {
    return {
      products: productsData.products,
      wishlist: [] as string[],
    };
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
    saveWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },
    toggleWishlist(productCode: string) {
      const index = this.wishlist.indexOf(productCode);
      if (index === -1) {
        this.wishlist.push(productCode);
      } else {
        this.wishlist.splice(index, 1);
      }
      this.saveWishlist();
    },
  },
};
</script>

<style scoped>
.products-page {
  padding: 16px;
  text-align: center;
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
