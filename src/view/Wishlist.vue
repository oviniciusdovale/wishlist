<template>
  <div class="wishlist-page container">
    <Breadcrumb current="Wishlist" />
    <h1 class="page-title">Minha Wishlist</h1>

    <!-- Mostrar o Skeleton enquanto carrega -->
    <div v-if="loading">
      <div class="products-grid">
        <SkeletonLoader v-for="n in 4" :key="n" />
      </div>
    </div>

    <!-- Mostrar a lista de produtos da wishlist -->
    <div v-if="!loading && wishlistProducts.length > 0">
      <ProductList :products="wishlistProducts" :showWishlistIcon="false" />
    </div>

    <!-- Mensagem de Wishlist vazia -->
    <div v-if="!loading && wishlistProducts.length === 0">
      <p>Sua wishlist está vazia.</p>
    </div>

    <!-- Mostrar mensagem de erro se houver algum problema -->
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import ProductList from '@/components/ProductList.vue';
import { getWishlist } from '../services/wishlistService';
import { fetchProducts } from '../services/productService';
import { Product } from '../types/product';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
  name: 'Wishlist',
  components: {
    ProductList,
    Breadcrumb,
    SkeletonLoader,
  },
  data() {
    return {
      products: [] as Product[],
      wishlist: [] as string[],
      loading: false,
      error: '',
    };
  },
  computed: {
    wishlistProducts(): Product[] {
      return this.products.filter((product) =>
        this.wishlist.includes(product.code),
      );
    },
  },
  async mounted() {
    await this.loadWishlist();
    await this.loadProducts();
  },
  methods: {
    async loadWishlist() {
      this.wishlist = getWishlist();
    },
    async loadProducts() {
      this.loading = true;
      this.error = '';
      try {
        const fetchedProducts = await fetchProducts();
        this.products = fetchedProducts;
      } catch (err) {
        this.error = 'Erro ao carregar produtos. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
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

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
