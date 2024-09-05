<template>
  <div class="products-page container">
    <Breadcrumb />
    <h1 class="page-title">Lista de Produtos</h1>
    <div v-if="loading">
      <div class="products-grid">
        <SkeletonLoader v-for="n in 4" :key="n" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <ProductList
      v-if="!loading && !error"
      :products="products"
      :wishlist="wishlist"
      @toggle-wishlist="handleToggleWishlist"
    />
  </div>
</template>

<script lang="ts">
import { fetchProducts } from '../services/productService';
import { getWishlist, toggleWishlist } from '../services/wishlistService';
import ProductList from '@/components/ProductList.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
  name: 'ProductsPage',
  components: {
    ProductList,
    Breadcrumb,
    SkeletonLoader,
  },
  data() {
    return {
      products: [] as any[],
      wishlist: [] as string[],
      loading: true,
      error: '',
    };
  },
  async mounted() {
    this.loadProducts();
    this.loadWishlist();
  },
  methods: {
    async loadProducts() {
      this.loading = true;
      this.error = '';
      try {
        this.products = await fetchProducts();
      } catch (err) {
        this.error = 'Erro ao carregar produtos. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
      }
    },
    loadWishlist() {
      this.wishlist = getWishlist();
    },
    handleToggleWishlist(productCode: string) {
      this.wishlist = toggleWishlist(this.wishlist, productCode);
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

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
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
