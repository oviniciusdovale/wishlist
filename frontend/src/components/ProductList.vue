<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.code"
      :product="product"
      :isWishlisted="wishlist && wishlist.includes(product.code)"
      :showWishlistIcon="showWishlistIcon"
      @toggle-wishlist="toggleWishlist"
      class="product-item"
    />
  </div>
</template>

<script lang="ts">
import ProductCard from './ProductCard.vue';
import { Product } from '../types/product';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
    showWishlistIcon: {
      type: Boolean,
      default: true,
    },
    wishlist: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    toggleWishlist(productCode: string) {
      this.$emit('toggle-wishlist', productCode);
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
}

.product-item {
  flex: 0 0 calc(25% - 16px);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .product-item {
    flex: 0 0 calc(50% - 16px);
  }
}

@media (max-width: 640px) {
  .product-item {
    flex: 0 0 100%;
  }
}
</style>
