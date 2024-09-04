<template>
  <div class="products-page">
    <h1 class="page-title">Lista de Produtos</h1>
    <ProductList :products="products" />
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
    };
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
