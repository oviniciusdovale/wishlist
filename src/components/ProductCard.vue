<template>
  <div class="product-card">
    <span v-if="showWishlistIcon" class="wishlist-icon" @click="toggleWishlist">
      <HeartIconOutline v-if="!isWishlisted" class="heart-icon" />
      <HeartIconSolid v-if="isWishlisted" class="heart-icon active" />
    </span>

    <img :src="product.image" :alt="product.name" class="product-image" />

    <h2 class="product-title">{{ product.name }}</h2>

    <div class="pricing">
      <div class="full-price">
        R$ {{ formatPrice(product.fullPriceInCents) }}
      </div>
      <div class="sale-price">
        R$ {{ formatPrice(product.salePriceInCents) }}
      </div>
    </div>

    <Rating :rating="product.rating" />
  </div>
</template>

<script lang="ts">
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';
import Rating from '@/components/Rating.vue';

export default {
  name: 'ProductCard',
  components: {
    Rating,
    HeartIconOutline,
    HeartIconSolid,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    showWishlistIcon: {
      type: Boolean,
      default: true,
    },
    isWishlisted: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    formatPrice(priceInCents: string): string {
      const price = Number(priceInCents) / 100;
      return price.toFixed(2).replace('.', ',');
    },
    toggleWishlist() {
      this.$emit('toggle-wishlist', this.product.code);
    },
  },
};
</script>

<style scoped>
.product-card {
  color: #333;
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  position: relative;
  width: 200px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.heart-icon {
  width: 24px;
  height: 24px;
  color: gray;
}

.heart-icon.active {
  color: red;
}

.product-title {
  font-size: 1.25em;
  line-height: 1.1;

  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pricing {
  margin: 8px 0;
}

.full-price {
  text-decoration: line-through;
  color: #777;
  font-size: 1.2em;
}

.sale-price {
  font-weight: bold;
  font-size: 1.71rem;
}
</style>
