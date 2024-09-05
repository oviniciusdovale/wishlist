<template>
  <div class="products-page container">
    <Breadcrumb />
    <h1 class="page-title">Lista de Produtos</h1>
    <div v-if="loading">Carregando produtos...</div>
    <div v-if="error">{{ error }}</div>
    <ProductList
      v-if="!loading && !error"
      :products="products"
      :wishlist="wishlist"
      @toggle-wishlist="toggleWishlist"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'ProductsPage',
  components: {
    ProductList,
    Breadcrumb,
  },
  data() {
    return {
      products: [] as any[],
      wishlist: [] as string[],
      loading: false,
      error: '',
    };
  },
  mounted() {
    this.loadProducts();
    this.loadWishlist();
  },
  methods: {
    async loadProducts() {
      this.loading = true;
      this.error = '';
      try {
        const response = await axios.get(
          'https://wishlist-back.onrender.com/products',
        );
        console.log('response', response);
        this.products = response.data;
      } catch (err) {
        this.error = 'Erro ao carregar produtos. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
      }
    },
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
